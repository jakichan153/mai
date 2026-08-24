// 背景画像から「ゆっくり呼吸するようにズームする映像」を作り、音声と合成する。
//
// 速度の工夫:
//   1時間ぶんをまるごとエンコードすると数十分かかる。そこで
//   「60秒でぴったり一周する継ぎ目のないループ」を1本だけ作り、
//   それを無変換(-c:v copy)で繰り返して音声の長さに合わせる。
//   結果、1時間の動画でも数十秒で焼き上がる。
const { ffmpeg } = require("./ffmpeg");

// 継ぎ目のないズームループを作る。
// ズーム倍率を cos カーブで 1 → 1+amount → 1 と戻すので、先頭と末尾が一致して繋ぎ目が見えない。
async function buildLoop(imageFile, loopFile, { width, height, fps, loopSeconds, zoomAmount }) {
  const frames = loopSeconds * fps;

  // 先に大きめに拡大しておくと、ズーム時のカクつき(ジッター)が目立ちにくい
  const sourceWidth = width * 2;
  const sourceHeight = height * 2;

  const zoomExpr = `1+${zoomAmount}*(1-cos(2*PI*on/${frames}))/2`;

  const filter = [
    `scale=${sourceWidth}:${sourceHeight}:force_original_aspect_ratio=increase`,
    `crop=${sourceWidth}:${sourceHeight}`,
    `zoompan=z='${zoomExpr}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${width}x${height}:fps=${fps}`,
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
