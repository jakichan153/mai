// 背景フォルダから「今回使う1枚」を選ぶ。
//
// 横（16:9）と縦（9:16）の2枚を同じフォルダに置くようになったため、
// 名前順で最初の1枚を取る作りでは、サムネイルに縦画像が使われたり、
// ショートに横画像が使われたりする。向きで選び分ける。
//
// 同じ向きが複数あるときは、いちばん新しいものを使う。
// 前の巻の画像が残っていても、今回入れたものが選ばれる。
// ただし黙って選ばず、候補を全部表示して、どれを使ったか言う。
const fs = require("node:fs");
const path = require("node:path");

const { ffprobe } = require("./ffmpeg");

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".webm", ".m4v"]);

const LABEL = { landscape: "横", portrait: "縦", square: "正方形" };

function orientationOf(width, height) {
  if (width > height) return "landscape";
  if (height > width) return "portrait";
  return "square";
}

// フォルダの中身を、向き・寸法つきの一覧にする
async function listBackgrounds(dir, { includeVideo = false } = {}) {
  if (!fs.existsSync(dir)) return [];

  const allowed = new Set(IMAGE_EXT);
  if (includeVideo) for (const ext of VIDEO_EXT) allowed.add(ext);

  const names = fs.readdirSync(dir)
    .filter((name) => !name.startsWith("."))
    .filter((name) => allowed.has(path.extname(name).toLowerCase()));

  const entries = [];
  for (const name of names) {
    const file = path.join(dir, name);
    const out = await ffprobe([
      "-v", "error", "-select_streams", "v:0",
      "-show_entries", "stream=width,height",
      "-of", "csv=p=0", file,
    ]);
    // 「1672,941」や「1672,941,」のように末尾にカンマが付くことがある
    const [width, height] = out.trim().split(",").map(Number);
    entries.push({
      file,
      name,
      width,
      height,
      orientation: orientationOf(width, height),
      modifiedAt: fs.statSync(file).mtimeMs,
    });
  }
  return entries;
}

const newestFirst = (a, b) => b.modifiedAt - a.modifiedAt;

// 指定した向きの背景を1つ選ぶ。
// fallback: true なら、その向きが無いときは別の向きで代用する（ショート用）。
async function pickBackground(dir, { orientation, includeVideo = false, fallback = false } = {}) {
  const entries = await listBackgrounds(dir, { includeVideo });
  if (entries.length === 0) throw new Error(`背景が見つかりません: ${dir}`);

  const wanted = LABEL[orientation] || orientation;
  let matching = entries.filter((e) => e.orientation === orientation).sort(newestFirst);

  if (matching.length === 0) {
    if (!fallback) {
      const found = entries.map((e) => `  ${e.name}（${LABEL[e.orientation]} ${e.width}×${e.height}）`);
      throw new Error(`${wanted}向きの背景がありません。入っているのは:\n${found.join("\n")}`);
    }
    matching = entries.slice().sort(newestFirst);
    console.log(`${wanted}向きの背景がないので、${LABEL[matching[0].orientation]}向きの画像で代用します（切り取られます）。`);
  }

  const chosen = matching[0];
  if (matching.length > 1) {
    console.log(`${wanted}向きの背景が ${matching.length} 枚あります。いちばん新しいものを使います:`);
    for (const e of matching) console.log(`  ${e === chosen ? "→" : " "} ${e.name}（${e.width}×${e.height}）`);
  }
  return chosen.file;
}

module.exports = { listBackgrounds, pickBackground, orientationOf, LABEL, IMAGE_EXT, VIDEO_EXT };
