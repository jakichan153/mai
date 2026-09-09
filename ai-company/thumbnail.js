// 背景画像から YouTube のサムネイルを作る。
//   使い方: npm run thumbnail
// YouTube の条件は「1280×720 以上・16:9・2MB以内」。
// 2MB を超えるとアップロードを弾かれるので、収まるまで画質を落として作り直す。
const fs = require("node:fs");
const path = require("node:path");

const { ffmpeg } = require("./src/ffmpeg");

const resolve = (relativePath) => path.resolve(__dirname, relativePath);
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const MAX_BYTES = 2 * 1024 * 1024;

function pickBackground(dir) {
  if (!fs.existsSync(dir)) throw new Error(`背景フォルダがありません: ${dir}`);
  const images = fs.readdirSync(dir)
    .filter((name) => !name.startsWith("."))
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .sort();
  if (images.length === 0) throw new Error(`背景画像が見つかりません: ${dir}`);
  return path.join(dir, images[0]);
}

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
  const source = pickBackground(resolve(config.backgroundDir));
  const outputDir = createOutputDir(resolve(config.outputDir));
  const outputFile = path.join(outputDir, "thumbnail.jpg");

  console.log(`元にする画像: ${path.basename(source)}`);

  // 16:9 に足りない部分は切り落とす（引き伸ばして歪ませない）
  const filter = "scale=1280:720:force_original_aspect_ratio=increase:flags=lanczos,crop=1280:720";

  // 画質2が最高。2MBに収まるまで少しずつ落とす
  for (const quality of [2, 4, 6, 8]) {
    await ffmpeg(["-i", source, "-vf", filter, "-q:v", String(quality), outputFile]);
    const size = fs.statSync(outputFile).size;
    const mb = (size / 1024 / 1024).toFixed(2);
    if (size <= MAX_BYTES) {
      console.log(`\n完成しました  1280 × 720 / ${mb} MB（画質 ${quality}）`);
      console.log(`  ${outputFile}`);
      return;
    }
    console.log(`  画質 ${quality} では ${mb} MB。2MB を超えるので落とします`);
  }
  throw new Error("2MB に収まりませんでした。元の画像を小さくしてください");
}

main().catch((error) => {
  console.error(`\nエラー: ${error.message}`);
  process.exit(1);
});
