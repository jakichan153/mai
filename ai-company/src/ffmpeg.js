// ffmpeg / ffprobe の実行をまとめたヘルパー。
// バイナリは npm パッケージに同梱されているので、PC への個別インストールは不要。
const { spawn } = require("node:child_process");

const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;

// コマンドを実行し、終了を待つ。失敗したらエラーにする。
// showProgress を true にすると ffmpeg の進捗表示をそのまま画面に流す。
function run(binary, args, { showProgress = false, captureStderr = false } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(binary, args, {
      stdio: showProgress ? ["ignore", "ignore", "inherit"] : ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (chunk) => (stdout += chunk));
    child.stderr?.on("data", (chunk) => (stderr += chunk));

    child.on("error", reject);
    child.on("close", (code) => {
      // ffmpeg の測定系フィルタは結果を stderr に出すため、必要なときはそちらを返す
      if (code === 0) return resolve(captureStderr ? stderr : stdout);
      // ffmpeg のエラーは stderr の末尾に出るので、そこだけ見せる
      reject(new Error(`${binary} が失敗しました (exit ${code})\n${stderr.slice(-2000)}`));
    });
  });
}

const ffmpeg = (args, options) => run(ffmpegPath, ["-hide_banner", "-y", ...args], options);
const ffprobe = (args) => run(ffprobePath, args);

module.exports = { ffmpeg, ffprobe };
