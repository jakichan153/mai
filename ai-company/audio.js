// 音声だけを書き出す。映像は作らない。
//   使い方: npm run audio
// Canva など別のソフトで動画を組み立てたいときに使う。
// 曲の連結・音量そろえ・タイムスタンプは build と同じ処理なので、結果も同じになる。
const fs = require("node:fs");
const path = require("node:path");

const { collectTracks, buildPlaylist, renderTracklist, formatTimestamp } = require("./src/playlist");
const { buildAudio } = require("./src/audio");
const { measureLoudness, gainToTarget } = require("./src/loudness");

const resolve = (relativePath) => path.resolve(__dirname, relativePath);

function createOutputDir(baseDir) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
  const dir = path.join(baseDir, stamp);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

async function main() {
  const config = JSON.parse(fs.readFileSync(resolve("config.json"), "utf8"));

  const files = collectTracks(resolve(config.musicDir), { shuffle: config.shuffle });
  console.log(`[1/2] 曲を ${files.length} 本みつけました`);

  // クロスフェードが一番短い曲より長いと破綻するので、安全な値に丸める
  const probe = await buildPlaylist(files, 0);
  const shortest = Math.min(...probe.tracks.map((t) => t.duration));
  const crossfade = Math.min(config.crossfadeSeconds, Math.floor(shortest / 2));

  const playlist = await buildPlaylist(files, crossfade);

  if (config.loudnessNormalize) {
    console.log("[2/2] 曲ごとの音量を測っています…");
    for (const track of playlist.tracks) {
      track.gainDb = gainToTarget(await measureLoudness(track.file));
    }
  }

  const outputDir = createOutputDir(resolve(config.outputDir));
  // Canva など別のソフトに渡すため、どこでも読める MP3 で出す
  const audioFile = path.join(outputDir, "audio.mp3");

  console.log("[2/2] 曲を繋いでいます…");
  await buildAudio(playlist.tracks, audioFile, {
    crossfadeSeconds: crossfade,
    loudnessNormalize: config.loudnessNormalize,
  });

  const tracklist = renderTracklist(playlist);
  fs.writeFileSync(path.join(outputDir, "tracklist.txt"), tracklist, "utf8");

  console.log(`\n完成しました（${formatTimestamp(playlist.totalDuration)}）`);
  console.log(`  音声      : ${audioFile}`);
  console.log(`  概要欄用  : ${path.join(outputDir, "tracklist.txt")}`);
  console.log(`\n${tracklist}`);
}

main().catch((error) => {
  console.error(`\nエラー: ${error.message}`);
  process.exit(1);
});
