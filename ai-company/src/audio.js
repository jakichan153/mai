// 複数の曲を「音量を揃えたうえでクロスフェードで繋いだ1本の音声」にまとめる。
const { ffmpeg } = require("./ffmpeg");

// 全入力の形式を揃えるフィルタ。これが無いとサンプリングレート違いで acrossfade が失敗する。
const NORMALIZE = "aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo";

// 音量を足した結果、まれに波形が振り切れることがある。その保険。
// level=disabled にしないと勝手に全体音量を上げ直してしまうので必ず付ける。
const LIMITER = "alimiter=limit=0.891:level=disabled";

// 1曲ぶんの前処理。gainDb が指定されていれば、その分だけ音量を足して基準に揃える。
function prepareTrack(index, gainDb) {
  const steps = [NORMALIZE];
  if (typeof gainDb === "number" && gainDb !== 0) steps.push(`volume=${gainDb}dB`);
  return `[${index}:a]${steps.join(",")}[s${index}]`;
}

function buildFilter(tracks, crossfadeSeconds, matchLoudness) {
  const steps = tracks.map((track, index) => prepareTrack(index, matchLoudness ? track.gainDb : 0));

  // 前から順に acrossfade で繋いでいく
  let current = "[s0]";
  for (let i = 1; i < tracks.length; i++) {
    const label = `[a${i}]`;
    steps.push(`${current}[s${i}]acrossfade=d=${crossfadeSeconds}:c1=tri:c2=tri${label}`);
    current = label;
  }

  steps.push(`${current}${LIMITER}[out]`);
  return steps.join(";");
}

// 出力の形式は拡張子で決める。.mp3 なら MP3、それ以外は AAC。
// MP3 はどのソフトでも読めるので、Canva など別のソフトに渡すときに使う。
function encoderFor(outputFile) {
  return outputFile.toLowerCase().endsWith(".mp3")
    ? ["-c:a", "libmp3lame", "-b:a", "256k"]
    : ["-c:a", "aac", "-b:a", "256k"];
}

async function buildAudio(tracks, outputFile, { crossfadeSeconds, loudnessNormalize }) {
  const inputs = tracks.flatMap((t) => ["-i", t.file]);
  const encoder = encoderFor(outputFile);

  // 1曲だけならクロスフェードは不要
  if (tracks.length === 1) {
    const gain = loudnessNormalize && tracks[0].gainDb ? `,volume=${tracks[0].gainDb}dB` : "";
    await ffmpeg([
      ...inputs, "-af", `${NORMALIZE}${gain},${LIMITER}`,
      ...encoder, outputFile,
    ], { showProgress: true });
    return;
  }

  await ffmpeg([
    ...inputs,
    "-filter_complex", buildFilter(tracks, crossfadeSeconds, loudnessNormalize),
    "-map", "[out]",
    ...encoder,
    outputFile,
  ], { showProgress: true });
}

module.exports = { buildAudio };
