# 作業用BGM動画 生成パイプライン

Suno で作った曲をフォルダに放り込んで `npm run build` を叩くと、
**クロスフェードで繋がった長尺BGM動画**と**概要欄に貼るタイムスタンプ**が出てきます。

このパイプラインはリポジトリの `ai-company/` 配下にあります。

## 準備（最初の1回だけ）

```bash
cd ai-company
npm install
```

ffmpeg は npm パッケージに同梱されているので、**別途インストールする必要はありません。**
必要なのは Node.js だけです（v18 以上）。

## 使い方

1. `ai-company/assets/music/` に Suno の曲を置く（mp3 / wav / m4a / flac / ogg）
2. `ai-company/assets/background/` に Canva で作った背景画像を置く（png / jpg）
3. **曲順を確定する**（任意）

`order.txt` に並べたい順で曲名を書き、実行します。

```bash
npm run reorder
```

ファイル名が `01 - 曲名.mp3` の形に振り直されます。行頭に `#` を付けた曲は使われず、
`assets/music/_unused/` に移動します（**消えません**）。
名前の打ち間違いや重複があった場合は、**何も変更せずに**中断します。

4. **書き出す前に確認する**（数秒で終わります）

```bash
npm run check
```

曲数・各曲の長さ・合計時間・概要欄の位置が一覧で出ます。読めないファイルがあればここで分かります。
狙いの尺（`config.json` の `targetMinutes`）とずれていたら、ちょうど良い曲数も教えてくれます。

5. 書き出す

```bash
npm run build
```

リポジトリのルートからでも実行できます（パスは自動で解決されます）。

```bash
node ai-company/build.js
```

`ai-company/out/20260824-1430/` のような日時フォルダに、こう出てきます。

| ファイル | 中身 |
|---|---|
| `video.mp4` | アップロードする動画本体 |
| `tracklist.txt` | 概要欄にそのまま貼れるタイムスタンプ |
| `audio.m4a` | 繋いだ音声（作り直すとき再利用できる） |
| `loop.mp4` | 背景のズームループ（同上） |

## 設定

いじるのは `ai-company/config.json` だけです。

| 項目 | 意味 |
|---|---|
| `targetMinutes` | 狙う尺（分）。`npm run check` がこれと比べて過不足を教えてくれる |
| `shuffle` | `true` にすると曲順をランダムにする。ファイル名順でよければ `false` |
| `crossfadeSeconds` | 曲の重なり秒数。長いほど繋ぎ目が滑らかになる |
| `loudnessNormalize` | **曲ごとに音量を測って -14 LUFS に揃える。** 基本は `true` のまま |
| `video.loopSeconds` | 背景ループの長さ。長いほど繰り返し感が減るが、書き出しも遅くなる |
| `video.zoomAmount` | ズームの強さ。`0.08` = 8%。作業用BGMなので控えめが良い |

## 仕組み（なぜ速いのか）

1時間の映像をまるごとエンコードすると数十分かかります。
このパイプラインは **60秒の「継ぎ目のないループ」を1本だけ作り、それを無変換で繰り返して**
音声の長さに合わせています。そのため動画が何時間になっても書き出し時間はほぼ一定です。

ループの継ぎ目が見えないのは、ズーム倍率を cos カーブで
`1 → 1.08 → 1` と往復させ、先頭と末尾の絵を一致させているためです。

## ファイル構成

```
ai-company/
  order.txt         曲順の指定
  reorder.js        order.txt どおりにファイル名を振り直す
  check.js          書き出す前の確認（曲数・尺・読めないファイル）
  build.js          実行の入口。1〜4 の手順をこの順に呼ぶだけ
  config.json       設定
  src/ffmpeg.js     ffmpeg / ffprobe を動かすヘルパー
  src/playlist.js   曲を集める・長さを測る・タイムスタンプを計算する
  src/loudness.js   曲ごとの音量を測る
  src/audio.js      音量を揃えてからクロスフェードで繋ぐ
  src/video.js      ズームループを作る・音声と合成する
  assets/music/     Suno の曲を置く場所
  assets/background/ 背景画像を置く場所
  out/              書き出し先
```
