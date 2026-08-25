// 書き出す前に、曲の並びと合計時間を確認する。
//   使い方: npm run check
// 実際のエンコードは行わないので数秒で終わる。
// 「焼き上がってから尺が違うと気づく」のを防ぐためのもの。
const fs = require("node:fs");
const path = require("node:path");

const { collectTracks, getDuration, formatTimestamp } = require("./src/playlist");

const resolve = (relativePath) => path.resolve(__dirname, relativePath);

// 秒 -> "2:31"（1曲の長さ表示用）
function formatLength(seconds) {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
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

  // 狙いの尺と比べる
  const targetSeconds = (config.targetMinutes || 60) * 60;
  const diff = Math.round(total - targetSeconds);
  const sign = diff >= 0 ? "+" : "-";
  console.log(`狙い: ${formatTimestamp(targetSeconds)}（差 ${sign}${formatLength(Math.abs(diff))}）`);

  // 5分以上ずれていたら曲数を調整したほうがよい
  if (Math.abs(diff) > 300) {
    const average = sumOfDurations / tracks.length;
    const ideal = Math.round((targetSeconds - crossfade) / (average - crossfade));
    console.log(`\nずれが大きいです。この平均の長さなら ${ideal} 曲がちょうど良い計算です。`);
  } else {
    console.log("\n狙い通りです。このまま npm run build で書き出せます。");
  }
}

main().catch((error) => {
  console.error(`\nエラー: ${error.message}`);
  process.exit(1);
});
