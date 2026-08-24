// 作業用BGM動画を1本組み立てる。
//   使い方: npm run build
//   設定は config.json をいじるだけでよい。
const fs = require("node:fs");
const path = require("node:path");

const { collectTracks, buildPlaylist, renderTracklist, formatTimestamp } = require("./src/playlist");
const { buildAudio } = require("./src/audio");
const { buildLoop, muxWithAudio } = require("./src/video");

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function log(step, message) {
  console.log(`[${step}] ${message}`);
}

// 背景フォルダから画像を1枚選ぶ
function pickBackground(dir) {
  if (!fs.existsSync(dir)) throw new Error(`背景フォルダがありません: ${dir}`);
  const images = fs.readdirSync(dir)
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .sort();
  if (images.length === 0) throw new Error(`背景画像が見つかりません: ${dir}（Canva で作った画像を置いてください）`);
  return path.join(dir, images[0]);
}

// out/20260824-1430/ のような作業フォルダを作る（1日に複数本作っても上書きされない）
function createOutputDir(baseDir) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
  const dir = path.join(baseDir, stamp);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

async function main() {
  const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
  const started = Date.now();

  // --- 1. 曲を集めて並び順と長さを確定する ---
  const files = collectTracks(config.musicDir, { shuffle: config.shuffle });
  log("1/4", `曲を ${files.length} 本みつけました`);

  // クロスフェードが一番短い曲より長いと破綻するので、安全な値に丸める
  const playlistProbe = await buildPlaylist(files, 0);
  const shortest = Math.min(...playlistProbe.tracks.map((t) => t.duration));
  const crossfade = Math.min(config.crossfadeSeconds, Math.floor(shortest / 2));
  if (crossfade < config.crossfadeSeconds) {
    log("1/4", `一番短い曲が ${shortest.toFixed(1)} 秒なので、クロスフェードを ${crossfade} 秒に縮めました`);
  }

  const playlist = await buildPlaylist(files, crossfade);
  log("1/4", `合計 ${formatTimestamp(playlist.totalDuration)}`);

  const outputDir = createOutputDir(config.outputDir);
  const audioFile = path.join(outputDir, "audio.m4a");
  const loopFile = path.join(outputDir, "loop.mp4");
  const videoFile = path.join(outputDir, "video.mp4");

  // --- 2. 曲を繋いで1本の音声にする ---
  log("2/4", "曲をクロスフェードで繋いでいます…");
  await buildAudio(playlist.tracks, audioFile, {
    crossfadeSeconds: crossfade,
    loudnessNormalize: config.loudnessNormalize,
  });

  // --- 3. 背景のズームループを作る ---
  const background = pickBackground(config.backgroundDir);
  log("3/4", `背景に ${path.basename(background)} を使います`);
  await buildLoop(background, loopFile, config.video);

  // --- 4. ループを繰り返して音声と合成する ---
  log("4/4", "動画を書き出しています…");
  await muxWithAudio(loopFile, audioFile, videoFile);

  // 概要欄にそのまま貼れるトラックリストを保存
  const tracklist = renderTracklist(playlist);
  fs.writeFileSync(path.join(outputDir, "tracklist.txt"), tracklist, "utf8");

  // 中間ファイルは残しておくと再利用できるが、消したい場合はここで unlink する
  const elapsed = Math.round((Date.now() - started) / 1000);
  console.log(`\n完成しました（${elapsed} 秒）`);
  console.log(`  動画        : ${videoFile}`);
  console.log(`  概要欄用    : ${path.join(outputDir, "tracklist.txt")}`);
  console.log(`\n${tracklist}`);
}

main().catch((error) => {
  console.error(`\nエラー: ${error.message}`);
  process.exit(1);
});
