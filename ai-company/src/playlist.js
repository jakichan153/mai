// assets/music の曲を集めて、収録順と「概要欄に貼るタイムスタンプ」を作る。
const fs = require("node:fs");
const path = require("node:path");
const { ffprobe } = require("./ffmpeg");

const AUDIO_EXT = new Set([".mp3", ".wav", ".m4a", ".flac", ".ogg"]);

// 1曲の長さ（秒）を取得する
async function getDuration(file) {
  const out = await ffprobe([
    "-v", "error",
    "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1",
    file,
  ]);
  const seconds = Number.parseFloat(out.trim());
  if (!Number.isFinite(seconds)) throw new Error(`長さを取得できませんでした: ${file}`);
  return seconds;
}

// ファイル名の先頭に付けた通し番号を落とすための判定。
// 落とすのは次の2つの形だけにして、曲名そのものを削らないようにする。
//   「A01 曲名」… 英字1文字＋数字＋空白（区間を表す記号として使う形）
//   「01 - 曲名」… 数字＋記号（-, _, .）
// 「24 Hours of Rain」のように数字で始まる曲名は、記号が続かないので落とさない。
const TRACK_NUMBER = /^(?:[A-Za-z]\d+\s+|\d+\s*[-_.]\s*)/;

// ファイル名から曲名を作る
function titleFromFilename(file) {
  return path.basename(file, path.extname(file)).replace(TRACK_NUMBER, "").trim();
}

// 秒 -> "H:MM:SS"（YouTube の章立てが認識する形式）
function formatTimestamp(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// フォルダから曲を集める。shuffle=false ならファイル名順。
function collectTracks(dir, { shuffle = false } = {}) {
  if (!fs.existsSync(dir)) throw new Error(`フォルダがありません: ${dir}`);

  const files = fs.readdirSync(dir)
    // macOS が作る隠しファイル（.DS_Store や ._曲名.mp3）を除く。
    // ._ で始まるものは拡張子が .mp3 なので、弾かないと曲として拾ってしまう。
    .filter((name) => !name.startsWith("."))
    .filter((name) => AUDIO_EXT.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "ja"))
    .map((name) => path.join(dir, name));

  if (files.length === 0) throw new Error(`音声ファイルが見つかりません: ${dir}`);

  if (shuffle) {
    // Fisher-Yates シャッフル
    for (let i = files.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [files[i], files[j]] = [files[j], files[i]];
    }
  }
  return files;
}

// 曲ごとの開始位置を計算する。
// クロスフェードで前後が d 秒重なるので、i 曲目の開始は「前曲までの合計 - i*d」になる。
async function buildPlaylist(files, crossfadeSeconds) {
  const tracks = [];
  let sumOfDurations = 0;

  for (const [index, file] of files.entries()) {
    const duration = await getDuration(file);
    tracks.push({
      file,
      title: titleFromFilename(file),
      duration,
      startsAt: sumOfDurations - index * crossfadeSeconds,
    });
    sumOfDurations += duration;
  }

  const totalDuration = sumOfDurations - (files.length - 1) * crossfadeSeconds;
  return { tracks, totalDuration };
}

// 概要欄にそのまま貼れるトラックリストを作る
function renderTracklist({ tracks, totalDuration }) {
  const lines = tracks.map((t) => `${formatTimestamp(t.startsAt)} ${t.title}`);
  return [
    `-- トラックリスト（全 ${tracks.length} 曲 / ${formatTimestamp(totalDuration)}）--`,
    "",
    ...lines,
    "",
  ].join("\n");
}

module.exports = { collectTracks, buildPlaylist, renderTracklist, formatTimestamp, getDuration, titleFromFilename };
