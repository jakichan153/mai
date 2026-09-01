// 背景画像から「ゆっくり呼吸するようにズームする映像」を作り、音声と合成する。
//
// 速度の工夫:
//   1時間ぶんをまるごとエンコードすると数十分かかる。そこで
//   「60秒でぴったり一周する継ぎ目のないループ」を1本だけ作り、
//   それを無変換(-c:v copy)で繰り返して音声の長さに合わせる。
//   結果、1時間の動画でも数十秒で焼き上がる。
const { ffmpeg } = require("./ffmpeg");

// 継ぎ目のないズームループを作る。
//
// なぜ perspective を使うのか:
//   よく使われる zoompan は、拡大位置を1ピクセル単位でしか動かせない。
//   60秒で8%というごく遅い動きだと「何十フレームも止まって、突然1ピクセル飛ぶ」
//   という動きになり、はっきりカクついて見える（実測で全フレームの53%が静止していた）。
//   perspective は小数の座標を扱えて補間もするため、1ピクセル未満の移動ができる。
//   同じ条件で静止フレームは1%まで下がる。
async function buildLoop(imageFile, loopFile, { width, height, fps, loopSeconds, zoomAmount }) {
  const frames = loopSeconds * fps;

  // zoomAmount が 0 なら動かさない。完全な静止画になるので、
  // カクつきは原理的に起こらず、書き出しも一瞬で終わる。
  if (!zoomAmount) {
    await ffmpeg([
      "-loop", "1", "-framerate", String(fps), "-i", imageFile, "-t", String(loopSeconds),
      "-vf", `scale=${width}:${height}:force_original_aspect_ratio=increase:flags=lanczos,crop=${width}:${height}`,
      "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p",
      "-g", String(fps), loopFile,
    ], { showProgress: true });
    return;
  }

  // 拡大しても粗が出ないよう、書き出しサイズより少し大きい段階で動かして最後に縮める
  const stageWidth = Math.round(width * 4 / 3 / 2) * 2;
  const stageHeight = Math.round(height * 4 / 3 / 2) * 2;

  // 倍率を cos カーブで 1 → 1+amount → 1 と往復させる。
  // 先頭と末尾が一致するので、繰り返しても継ぎ目が見えない。
  const zoom = `1+${zoomAmount}*(1-cos(2*PI*on/${frames}))/2`;
  // 元画像のどれだけ内側を切り出すか（左右・上下それぞれの割合）
  const inset = `(1-1/(${zoom}))/2`;

  // 切り出す四隅を指定する。中央を保ったまま内側に寄せると拡大になる。
  const corners = [
    `x0='W*${inset}'`, `y0='H*${inset}'`,
    `x1='W-W*${inset}'`, `y1='H*${inset}'`,
    `x2='W*${inset}'`, `y2='H-H*${inset}'`,
    `x3='W-W*${inset}'`, `y3='H-H*${inset}'`,
  ].join(":");

  const filter = [
    `scale=${stageWidth}:${stageHeight}:force_original_aspect_ratio=increase`,
    `crop=${stageWidth}:${stageHeight}`,
    `perspective=${corners}:interpolation=cubic:eval=frame`,
    `scale=${width}:${height}:flags=lanczos`,
  ].join(",");

  await ffmpeg([
    "-loop", "1",
    "-framerate", String(fps),
    "-i", imageFile,
    "-t", String(loopSeconds),
    "-vf", filter,
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "20",
    "-pix_fmt", "yuv420p",
    // ループの先頭が必ずキーフレームになるようにする（無変換で繰り返すために必要）
    "-g", String(fps),
    loopFile,
  ], { showProgress: true });
}

// ループ映像を音声の長さぶん繰り返して1本の動画にする。
// 映像は再エンコードしない(-c:v copy)ので一瞬で終わる。
async function muxWithAudio(loopFile, audioFile, outputFile) {
  await ffmpeg([
    "-stream_loop", "-1",
    "-i", loopFile,
    "-i", audioFile,
    "-map", "0:v:0",
    "-map", "1:a:0",
    "-c:v", "copy",
    "-c:a", "copy",
    // 音声が終わったところで動画も終わる
    "-shortest",
    // ブラウザで先頭から即再生できるようにする
    "-movflags", "+faststart",
    outputFile,
  ], { showProgress: true });
}

module.exports = { buildLoop, muxWithAudio };
