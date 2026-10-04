// 書き出す前に、曲の並びと合計時間を確認する。
//   使い方: npm run check
// 実際のエンコードは行わないので数秒で終わる。
// 「焼き上がってから尺が違うと気づく」のを防ぐためのもの。
const fs = require("node:fs");
const path = require("node:path");

const { collectTracks, getDuration, formatTimestamp } = require("./src/playlist");
const { ffprobe } = require("./src/ffmpeg");

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const resolve = (relativePath) => path.resolve(__dirname, relativePath);

// 秒 -> "2:31"（1曲の長さ表示用）
function formatLength(seconds) {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// 背景画像の寸法を調べる。ファイルサイズでは判断できないため。
async function checkBackground(dir, video) {
  if (!fs.existsSync(dir)) return console.log("\n背景フォルダがありません。");

  const images = fs.readdirSync(dir)
    .filter((name) => !name.startsWith("."))
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()));

  if (images.length === 0) return console.log("\n背景画像がまだありません。");
  if (images.length > 1) {
    console.log(`\n背景画像が ${images.length} 枚あります。使われるのは名前順で最初の 1 枚だけです:`);
    for (const name of images) console.log(`  ${name}`);
  }

  const file = path.join(dir, images.sort()[0]);
  const out = await ffprobe([
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=width,height",
    "-of", "csv=p=0", file,
  ]);
  const [width, height] = out.trim().split(",").map(Number);

  console.log(`\n背景: ${path.basename(file)}  ${width} × ${height}`);

  // 必要な解像度はズームの有無で変わる。
  // ズームしない場合、映像はパイプラインで作らないので、
  // 判定はサムネイル（1280px）に足りるかどうかだけでよい。
  if (!video.zoomAmount) {
    if (width >= 1280) {
      console.log("  解像度: 十分です（ズームなしの設定。サムネイルに必要な1280pxを満たしています）");
    } else {
      console.log(`  解像度: サムネイルには足りません。幅1280px以上が必要です`);
    }
  } else if (width >= video.width * 1.3) {
    console.log("  解像度: 十分です");
  } else if (width >= video.width) {
    console.log("  解像度: 実用上問題ありません（拡大時にわずかに甘くなる程度）");
  } else {
    console.log(`  解像度: 足りません。ズームで拡大するとぼやけます`);
    console.log(`         幅 ${video.width}px 以上が必要です（${video.width * 2}px あると理想的）`);
  }

  // 16:9 から外れると上下または左右が切れる
  const ratio = width / height;
  const target = video.width / video.height;
  if (Math.abs(ratio - target) / target > 0.02) {
    console.log(`  縦横比: 16:9 ではありません（いまは ${ratio.toFixed(2)} : 1）。端が切れます`);
  } else {
    console.log("  縦横比: 16:9 です");
  }
}

async function main() {
  const config = JSON.parse(fs.readFileSync(resolve("config.json"), "utf8"));
  const files = collectTracks(resolve(config.musicDir), { shuffle: false });

  // 1曲ずつ長さを測る。読めないファイルがあっても止めずに最後まで調べる
  const tracks = [];
  const broken = [];
  for (const file of files) {
    try {
      tracks.push({ file, duration: await getDuration(file) });
    } catch {
      broken.push(file);
    }
  }

  if (broken.length > 0) {
    console.log("読み込めなかったファイル:");
    for (const file of broken) console.log(`  x ${path.basename(file)}`);
    console.log("  → 壊れているか、対応していない形式です。取り除いてください。\n");
  }
  if (tracks.length === 0) {
    console.log("読める曲がありません。");
    return;
  }

  // クロスフェードは一番短い曲の半分を超えられない
  const shortest = Math.min(...tracks.map((t) => t.duration));
  const crossfade = Math.min(config.crossfadeSeconds, Math.floor(shortest / 2));

  console.log(`曲: ${tracks.length} 本 / クロスフェード ${crossfade} 秒\n`);
  console.log("  #  長さ   開始位置   曲名");

  let sumOfDurations = 0;
  tracks.forEach((track, index) => {
    const startsAt = sumOfDurations - index * crossfade;
    const title = path.basename(track.file, path.extname(track.file));
    console.log(
      `  ${String(index + 1).padStart(2)}  ${formatLength(track.duration).padStart(5)}` +
      `  ${formatTimestamp(startsAt).padStart(8)}   ${title}`
    );
    sumOfDurations += track.duration;
  });

  const total = sumOfDurations - (tracks.length - 1) * crossfade;
  console.log(`\n合計: ${formatTimestamp(total)}`);

  await checkBackground(resolve(config.backgroundDir), config.video);

  // 狙いの尺と比べる
  const targetSeconds = (config.targetMinutes || 60) * 60;
  const diff = Math.round(total - targetSeconds);
  const sign = diff >= 0 ? "+" : "-";
  console.log(`狙い: ${formatTimestamp(targetSeconds)}（差 ${sign}${formatLength(Math.abs(diff))}）`);

  // 10分以上ずれていたら曲数を調整したほうがよい。
  // これ未満のずれは実用上まったく問題にならないので警告しない。
  if (Math.abs(diff) > 600) {
    const average = sumOfDurations / tracks.length;
    const ideal = Math.round((targetSeconds - crossfade) / (average - crossfade));
    console.log(`\nずれが大きいです。この平均の長さなら ${ideal} 曲がちょうど良い計算です。`);
  } else {
    console.log("\n狙い通りです。このまま npm run audio で書き出せます。");
  }
}

main().catch((error) => {
  console.error(`\nエラー: ${error.message}`);
  process.exit(1);
});
