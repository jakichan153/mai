// ショート動画（縦1080×1920）を1本作る。
//   使い方: npm run short
// 設定は config.json の "short" を見る。素材は長尺と同じ assets/ を使う。
const fs = require("node:fs");
const path = require("node:path");

const { ffmpeg } = require("./src/ffmpeg");
const { collectTracks, getDuration, formatTimestamp } = require("./src/playlist");
const { measureLoudness, gainToTarget } = require("./src/loudness");
const { isVideo } = require("./src/video");

const resolve = (relativePath) => path.resolve(__dirname, relativePath);
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".mp4", ".mov", ".webm", ".m4v"]);

const W = 1080;
const H = 1920;

function pickBackground(dir) {
  const files = fs.readdirSync(dir)
    .filter((name) => !name.startsWith("."))
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .sort();
  if (files.length === 0) throw new Error(`背景が見つかりません: ${dir}`);
  return path.join(dir, files[0]);
}

function createOutputDir(baseDir) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
  const dir = path.join(baseDir, `${stamp}-short`);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

// 横長の画を縦にする2通り。
//   crop … 画面いっぱいに切り出す。迫力は出るが左右が大きく切れる
//   blur … 画を幅に合わせ、上下の余白を同じ画のぼかしで埋める。構図が丸ごと残る
function framingFilter(mode, cropX) {
  if (mode === "blur") {
    return [
      `[0:v]scale=${W}:-2,setsar=1[fit]`,
      `[0:v]scale=${W * 2}:${H * 2}:force_original_aspect_ratio=increase,crop=${W * 2}:${H * 2},` +
        `gblur=sigma=40,scale=${W}:${H},setsar=1[bg]`,
      `[bg][fit]overlay=(W-w)/2:(H-h)/2[v]`,
    ].join(";");
  }
  // 切り出す位置を 0（左端）〜1（右端）で選べるようにする
  const x = `(iw-${W})*${Math.min(Math.max(cropX, 0), 1)}`;
  return `[0:v]scale=-2:${H},crop=${W}:${H}:${x}:0,setsar=1[v]`;
}

async function main() {
  const config = JSON.parse(fs.readFileSync(resolve("config.json"), "utf8"));
  const s = config.short || {};
  const mode = s.mode === "blur" ? "blur" : "crop";
  const cropX = typeof s.cropX === "number" ? s.cropX : 0.5;
  const duration = s.durationSeconds || 45;
  const fade = s.fadeSeconds || 2;

  // 使う曲を決める。指定がなければ最初の1曲
  const tracks = collectTracks(resolve(config.musicDir), { shuffle: false });
  const track = s.track
    ? tracks.find((f) => path.basename(f) === s.track)
    : tracks[0];
  if (!track) throw new Error(`曲が見つかりません: ${s.track}`);

  const trackLength = await getDuration(track);
  // 切り出し位置が曲の長さを超えないようにする
  const start = Math.min(s.startSeconds || 0, Math.max(0, trackLength - duration));

  console.log(`曲   : ${path.basename(track)}`);
  console.log(`切出し: ${formatTimestamp(start)} から ${duration} 秒`);
  console.log(`画面 : ${mode === "blur" ? "ぼかし余白（構図を丸ごと残す）" : `切り出し（位置 ${cropX}）`}`);

  const background = pickBackground(resolve(config.backgroundDir));
  const outputDir = createOutputDir(resolve(config.outputDir));
  const outputFile = path.join(outputDir, "short.mp4");

  const gain = config.loudnessNormalize ? gainToTarget(await measureLoudness(track)) : 0;

  const videoInput = isVideo(background)
    ? ["-stream_loop", "-1", "-i", background]
    : ["-loop", "1", "-i", background];

  await ffmpeg([
    ...videoInput,
    "-ss", String(start), "-t", String(duration), "-i", track,
    "-filter_complex",
    `${framingFilter(mode, cropX)};` +
      `[1:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo` +
      (gain ? `,volume=${gain}dB` : "") +
      `,afade=t=in:st=0:d=${fade},afade=t=out:st=${duration - fade}:d=${fade}[a]`,
    "-map", "[v]", "-map", "[a]",
    "-t", String(duration),
    "-r", "30",
    "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "192k",
    "-movflags", "+faststart",
    outputFile,
  ], { showProgress: true });

  console.log(`\n完成しました  ${W} × ${H} / ${duration} 秒`);
  console.log(`  ${outputFile}`);
}

main().catch((error) => {
  console.error(`\nエラー: ${error.message}`);
  process.exit(1);
});
