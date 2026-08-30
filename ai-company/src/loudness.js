// 曲ごとの音量（ラウドネス）を測る。
//
// なぜ必要か:
//   繋いだ後に全体をまとめて調整すると、曲どうしの音量差はそのまま残る。
//   曲Aが小さく曲Bが大きいと、聴いている人が途中で音量をいじることになる。
//   そこで「曲ごとに測って、揃うだけの音量を足す」方式にする。
//   音量を足すだけなので、曲の強弱（ダイナミクス）は損なわれない。
const { ffmpeg } = require("./ffmpeg");

// 配信で一般的な基準値
const TARGET_LUFS = -14;

// 1曲の統合ラウドネス（LUFS）を測る
async function measureLoudness(file) {
  // ebur128 は測定結果を stderr に出すので、run のエラーメッセージ経由では取れない。
  // 出力先を null にして測定だけ行う。
  const output = await ffmpeg(["-i", file, "-af", "ebur128", "-f", "null", "-"], { captureStderr: true });

  // 末尾の Summary にある "I:  -14.2 LUFS" を読む
  const matches = [...output.matchAll(/I:\s*(-?\d+(?:\.\d+)?)\s*LUFS/g)];
  if (matches.length === 0) throw new Error(`音量を測定できませんでした: ${file}`);
  return Number.parseFloat(matches[matches.length - 1][1]);
}

// 基準値に揃えるために足す音量（dB）を求める
function gainToTarget(measuredLufs) {
  return Math.round((TARGET_LUFS - measuredLufs) * 10) / 10;
}

module.exports = { measureLoudness, gainToTarget, TARGET_LUFS };
