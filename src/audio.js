// 複数の曲を「クロスフェードで繋いだ1本の音声」にまとめる。
const { ffmpeg } = require("./ffmpeg");

// 全入力の形式を揃えるフィルタ。これが無いとサンプリングレート違いで acrossfade が失敗する。
const NORMALIZE = "aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo";
// loudnorm は内部で高いサンプリングレートに上げてしまうので、最後に 48kHz へ戻す
const LOUDNORM = "loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000";

function buildFilter(trackCount, crossfadeSeconds, loudnessNormalize) {
  const steps = [];

  // まず各入力を同じ形式に揃える
  for (let i = 0; i < trackCount; i++) {
    steps.push(`[${i}:a]${NORMALIZE}[s${i}]`);
  }

  // 前から順に acrossfade で繋いでいく
  let current = "[s0]";
  for (let i = 1; i < trackCount; i++) {
    const label = `[a${i}]`;
    steps.push(`${current}[s${i}]acrossfade=d=${crossfadeSeconds}:c1=tri:c2=tri${label}`);
    current = label;
  }

  // 音量を配信向けに揃える（曲ごとの音量差をならす）
  if (loudnessNormalize) {
    steps.push(`${current}${LOUDNORM}[out]`);
    current = "[out]";
  }

  return { filter: steps.join(";"), outputLabel: current };
}

async function buildAudio(tracks, outputFile, { crossfadeSeconds, loudnessNormalize }) {
  const inputs = tracks.flatMap((t) => ["-i", t.file]);

  // 1曲だけならクロスフェードは不要
  if (tracks.length === 1) {
    const filter = ["-af", loudnessNormalize ? `${NORMALIZE},${LOUDNORM}` : NORMALIZE];
    await ffmpeg([...inputs, ...filter, "-c:a", "aac", "-b:a", "256k", outputFile], { showProgress: true });
    return;
  }

  const { filter, outputLabel } = buildFilter(tracks.length, crossfadeSeconds, loudnessNormalize);

  await ffmpeg([
    ...inputs,
    "-filter_complex", filter,
    "-map", outputLabel,
    "-c:a", "aac",
    "-b:a", "256k",
    outputFile,
  ], { showProgress: true });
}

module.exports = { buildAudio };
