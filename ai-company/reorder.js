// order.txt に書いた順番どおりに、曲のファイル名を 01, 02, ... と振り直す。
//   使い方: npm run reorder
// 使わない曲は assets/music/_unused/ に移すだけで、消さない。
const fs = require("node:fs");
const path = require("node:path");

const { titleFromFilename } = require("./src/playlist");

const resolve = (relativePath) => path.resolve(__dirname, relativePath);
const AUDIO_EXT = new Set([".mp3", ".wav", ".m4a", ".flac", ".ogg"]);

function readOrderFile(file) {
  if (!fs.existsSync(file)) throw new Error(`${path.basename(file)} がありません`);
  return fs.readFileSync(file, "utf8")
    .split("\n")
    .map((line) => line.trim())
    // 空行と # で始まる行（コメント / 使わない曲）は無視する
    .filter((line) => line !== "" && !line.startsWith("#"));
}

function listAudioFiles(dir) {
  return fs.readdirSync(dir)
    .filter((name) => !name.startsWith("."))
    .filter((name) => AUDIO_EXT.has(path.extname(name).toLowerCase()));
}

function main() {
  const config = JSON.parse(fs.readFileSync(resolve("config.json"), "utf8"));
  const musicDir = resolve(config.musicDir);

  const wanted = readOrderFile(resolve("order.txt"));
  const files = listAudioFiles(musicDir);

  // 拡張子を除いたファイル名で照合する
  const byName = new Map(files.map((f) => [path.basename(f, path.extname(f)), f]));

  // 1つでも見つからなければ、何も変更せずに終わる
  const missing = wanted.filter((name) => !byName.has(name));
  if (missing.length > 0) {
    console.log("order.txt に書かれているのに、フォルダに無いファイル:");
    for (const name of missing) console.log(`  x ${name}`);
    console.log("\n名前が一致していません。1文字も変えずに書き写してください。");
    console.log("変更は何も行っていません。");
    process.exit(1);
  }

  // 重複した行があると番号が壊れるので弾く
  const duplicated = wanted.filter((name, i) => wanted.indexOf(name) !== i);
  if (duplicated.length > 0) {
    console.log("order.txt に同じ行が2回書かれています:");
    for (const name of new Set(duplicated)) console.log(`  x ${name}`);
    console.log("\n変更は何も行っていません。");
    process.exit(1);
  }

  // 一度すべて仮の名前にしてから本番の名前にする。
  // そうしないと「13→12」のように、既にある名前と衝突して上書きしてしまう。
  const plan = wanted.map((name, index) => {
    const current = byName.get(name);
    const number = String(index + 1).padStart(2, "0");
    return {
      current,
      temporary: `__tmp_${index}${path.extname(current)}`,
      final: `${number} - ${titleFromFilename(name)}${path.extname(current)}`,
    };
  });

  for (const step of plan) {
    fs.renameSync(path.join(musicDir, step.current), path.join(musicDir, step.temporary));
  }
  for (const step of plan) {
    fs.renameSync(path.join(musicDir, step.temporary), path.join(musicDir, step.final));
  }

  // order.txt に載っていない曲は消さず、_unused へ避ける
  const used = new Set(plan.map((s) => s.final));
  const leftovers = listAudioFiles(musicDir).filter((f) => !used.has(f));
  if (leftovers.length > 0) {
    const unusedDir = path.join(musicDir, "_unused");
    fs.mkdirSync(unusedDir, { recursive: true });
    for (const file of leftovers) {
      fs.renameSync(path.join(musicDir, file), path.join(unusedDir, file));
    }
  }

  console.log(`${plan.length} 曲を並び替えました。\n`);
  for (const step of plan) console.log(`  ${step.final}`);
  if (leftovers.length > 0) {
    console.log(`\n使わない ${leftovers.length} 曲は _unused/ に移しました（消していません）。`);
  }
  console.log("\n続けて npm run check で尺を確認してください。");
}

try {
  main();
} catch (error) {
  console.error(`\nエラー: ${error.message}`);
  process.exit(1);
}
