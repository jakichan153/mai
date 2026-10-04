# 隠り世の音 Vol.4 — 秋雨の峠 / Autumn Rain on the Mountain Pass

制作指示書。上から順にやれば1本できます。
曲が出来たら `npm run check` → `npm run reorder` → `npm run audio` の順です。

---

## なぜこのテーマにしたか（リン・戦略）

Vol.1〜3 はすべて季節ものでした。ここで**通年もの**を1本挟みます。

| | Vol.1 | Vol.2 | Vol.3 | **Vol.4** |
|---|---|---|---|---|
| 情景 | 雨の古寺・紫陽花 | 古寺の秋・紅葉 | 月夜のすすき野 | **秋雨の峠** |
| 時間帯 | 昼 | 昼 | 夜 | **昼〜夕（雨）** |
| 色 | 青緑 | 朱・橙 | 藍・銀 | **灰緑・石・朱のアクセント** |
| 検索の寿命 | 通年（雨） | 旬2か月 | 旬2か月 | **通年（雨）** |

`rain` は作業用BGMで最も検索される語のひとつで、**旬が来ないので一年中働きます。**
作業用BGMは1本が何年も回るストック型なので、季節ものだけで作ると
資産が毎年2か月しか稼いでくれません。

Vol.1 も雨ですが、紫陽花の青緑（梅雨）と峠の灰緑（秋雨）は一覧で別物に見えます。
むしろ**「雨」で2本持つこと自体が狙い**です。1本が検索で当たれば、
同じチャンネルのもう1本も関連に出ます。

---

## 1. 曲（アヤ・構成 ＋ カノン・音響）

**22曲ぶんのプロンプトです（実際に採用したのは20曲。下の「確定した曲順」を参照）。** Suno にそのまま貼れる英語プロンプトです。
曲名は Suno のタイトル欄にこの英語を入れてください（ダウンロードしたファイル名が
そのまま曲順に使えます）。

### Suno 側の共通設定（カノン）

**Exclude Styles 欄に毎回これを入れてください。**

```
vocals, singing, choir, chanting, spoken word, electronic drums, EDM,
synth lead, heavy percussion, orchestral crescendo, distortion, applause, audience
```

**雨の音は Suno に任せます。あとから足さないでください。**
Suno の雨の上にこちらで雨を重ねると、ザーという帯だけが二重になって濁ります。
ある曲だけ雨がうるさいと感じたら、**その曲は作り直す**のが正解です
（音が混ざったファイルしかないので、あとから雨だけ下げられません）。

---

### 入り（峠の麓・雨が降り始める）4曲

**1曲目は最重要です。** Vol.1 で一番静かな曲を頭に置いた結果、
最初の1分で75%が離脱しました。「静かだが、最初の10秒で世界が立ち上がる曲」にします。
プロンプトに**冒頭2秒の指定**を入れてあります。ここは必ず検品してください。

```
01 Rain on the Pass
Japanese traditional instrumental, solo koto opening with a clear descending phrase
within the first 2 seconds, then soft shakuhachi, gentle rain on cedar leaves,
62 BPM, calm and spacious, cinematic ambient, no vocals
```

```
02 First Drops on Cedar
Japanese ambient instrumental, light rain beginning on a cedar forest, sparse koto
plucks, low bamboo flute drone, 60 BPM, quiet and misty, no vocals
```

```
03 Stone Steps in Mist
Japanese traditional ambient, shakuhachi long tones over wet stone steps, faint rain,
soft low strings, 58 BPM, solemn and still, no vocals
```

```
04 Climbing the Wet Road
Japanese traditional instrumental, steady walking pulse on soft taiko, koto ostinato,
shinobue melody, light rain, 70 BPM, forward-moving but calm, no vocals
```

### 深まり（峠道・杉林・霧・祠）11曲

集中を支える区間です。起伏を抑え、印象的すぎる曲は置きません。
ただし 11 のジャズだけは一度だけ頂点を作る役です（Vol.3 の神楽と同じ位置づけ）。

```
05 Cedar Corridor
Japanese ambient instrumental, deep cedar forest, long shakuhachi phrases, sustained
low strings, continuous soft rain, 56 BPM, vast and sheltered, no vocals
```

```
06 Small Shrine Under Rain
Japanese traditional instrumental, small mountain shrine, koto and quiet suzu bells,
distant rain on a wooden roof, 60 BPM, sacred and hushed, no vocals
```

```
07 Mountain Mist Breathing
Japanese ambient instrumental, slow breathing pads, shakuhachi breath tones, thick
mist, almost no rhythm, 52 BPM, weightless, no vocals
```

```
08 Biwa in the Rain
Japanese traditional instrumental, solo biwa with wide space between the notes, soft
rain, low drone, 54 BPM, austere and old, no vocals
```

```
09 Rain Through Bamboo
Japanese ambient instrumental, rain striking bamboo, koto arpeggios, shinobue
countermelody, bamboo percussion, 68 BPM, bright within the grey, no vocals
```

```
10 Stone Jizo at the Bend
Japanese traditional instrumental, quiet koto melody, a single struck bowl gong,
steady rain, 58 BPM, tender and lonely, no vocals
```

```
11 Autumn Rain Jazz
Japanese jazz instrumental, brushed drums, upright bass, soft piano, muted trumpet,
koto accents, rain on a window, 76 BPM, smoky and warm, lo-fi jazz ballad, no vocals
```

```
12 Red Maple Wet with Rain
Japanese traditional instrumental, warm koto and shinobue duet, gentle rain, soft
strings, 66 BPM, autumn colour, bittersweet, no vocals
```

```
13 Shakuhachi in the Fog
Japanese traditional ambient, solo shakuhachi, very sparse koto, distant rain, deep
reverb, 50 BPM, meditative, no vocals
```

```
14 The Rain Grows Heavy
Japanese ambient instrumental, heavier rain and distant low thunder, slow taiko
heartbeat, sustained strings, 60 BPM, enveloping but not threatening, no vocals
```

```
15 Shelter Under the Eaves
Japanese traditional instrumental, rain dripping from the eaves, intimate close-miked
koto, soft shakuhachi, 56 BPM, safe and quiet, no vocals
```

### ほどき（峠を越える・雨が上がる・谷の灯り）7曲

**ここで雨を少しずつ抜いていきます。** 雨のある曲と無い曲をつなぐと、
ザーという音がふっと消えて継ぎ目が目立ちます。
そのため**雨を切るのは後半だけ**にして、18→22 で段々に薄くします。

```
16 The Pass at Last
Japanese traditional instrumental, a rising shinobue melody reaching a summit, soft
taiko, koto, thinning rain, 72 BPM, quietly triumphant, restrained, no vocals
```

```
17 Rain Thinning
Japanese ambient instrumental, rain fading to scattered drops, koto harmonics, warm
low strings, 58 BPM, relieved, no vocals
```

```
18 Break in the Clouds
Japanese traditional instrumental, shakuhachi and koto opening into light, soft
swelling strings, no rain, 62 BPM, hopeful and clear, no vocals
```

```
19 Koto After the Rain
Japanese traditional instrumental, solo koto with a memorable gentle melody, faint
dripping water, soft room reverb, 64 BPM, clean and beautiful, no vocals
```

```
20 Lights in the Valley
Japanese ambient instrumental, distant village lights at dusk, warm shinobue, soft
koto, crickets, 56 BPM, arriving home, no vocals
```

```
21 Dripping Eaves
Japanese ambient instrumental, slow water drops, very sparse koto, deep quiet pad,
50 BPM, almost still, no vocals
```

```
22 Clear Sky Over the Ridge
Japanese traditional ambient, a long shakuhachi farewell over a single sustained
chord, no rain, 48 BPM, calm ending, fades gently, no vocals
```

### 検品のしかた

- **1曲目だけは必ず聴いてください。** 10秒以内に琴が鳴っていなければ作り直し
- 他の曲は「突発的に大きい音がないか」だけ確認すれば十分です
  （音量そろえはパイプラインが自動でやります）
- 22曲そろわなくても構いません。18曲あれば1本になります

---

## 2. 画（ソラ・映像）

**画像は ChatGPT で作ってください。** Canva の画像生成は使いません。
Canva は文字入れ・明るさ調整・切り抜きの仕上げだけに使います。

### 配色（Canva で調整するときの目安）

| 役 | HEX |
|---|---|
| 空・霧 | `#aab6b0` |
| 杉の影 | `#2b3a33` |
| 濡れた石畳 | `#4a4f49` |
| 紅葉の朱（アクセント・画面の15%まで） | `#b4442e` |
| 旅人の蓑・藍 | `#23324a` |
| 霧越しの拡散光 | `#e3e8e2` |

**朱を入れすぎないでください。** Vol.2 が朱・橙の画なので、
朱が主役になると一覧で Vol.2 と見分けがつきません。朱は数本の枝だけです。

### 横型（動画の背景用・16:9）

ChatGPT に貼る文です。**スタイルは「写真」を選んでください。** ここが一番効きます。

```
photorealistic, autumn mountain pass in Japan during steady rain, a narrow
stone-paved path climbing between tall cedar trees, wet moss on the stones,
thick mist filling the valley behind, a few bright red maple branches on the left,
a lone traveler in a straw hat and dark indigo straw rain cape, seen from behind,
small in the frame, walking up the path, back to the camera, face not visible,
soft diffused grey-green daylight, cinematic lighting, shot on 35mm film,
16:9 horizontal, highly detailed
```

- **4〜6枚出させてください。** 写真調は細部の崩れがそのまま嘘に見えます
- 拡大して確認するところ: **石段の直線が歪んでいないか／旅人の脚が2本か／笠の形**
- 解像度は **2560×1440 以上**（ズームで拡大されるため大きめに）
- 旅人は**画面の端に置かない**（端4%はズームで切れます）

### 縦型（ショート用・9:16）

**横型を切るのではなく、最初から縦で作ってください。**
Vol.3 のショートは横型を切って使ったため、2倍に引き伸ばす形になりました。

```
photorealistic, vertical composition, autumn mountain pass in Japan during steady
rain, a narrow stone-paved path climbing steeply between tall cedar trees,
wet mossy stones in the foreground, thick mist high above filling the ridge,
a few bright red maple branches, a lone traveler in a straw hat and dark indigo
straw rain cape, seen from behind, small in the frame, walking up the path,
back to the camera, face not visible, soft diffused grey-green daylight,
cinematic lighting, shot on 35mm film, 9:16 vertical, highly detailed
```

縦は**上下に長い**ので、道が奥へ登っていく構図が一番はまります。

### 背景を動かす場合（Kling など・任意）

Vol.3 は生成がうまくいかず、結局 Canva の風エフェクトで解決しました。
**今回も Canva の雨エフェクトで十分です**（雨は風より素材が豊富で、
生成より確実で速いです）。それでも試すならこの順で書きます。

```
Heavy rain falls continuously and clearly through the cedar forest, streaking
diagonally across the frame. Mist drifts slowly up the valley. Water runs down
the wet stone path. The traveler walks slowly up the path, back to the camera.
```

ネガティブプロンプト:
```
camera movement, zoom, pan, the person turning around, face visible,
fast motion, flickering, morphing, extra limbs, text, watermark
```

---

## 3. サムネイル（ゲン・サムネ）

3案出します。**ただし最終判断は画が来てから**です。
幅350px（一覧で実際に表示される大きさ）に縮めて、読めるものを選びます。

| 案 | 文字 | 位置 | 狙い |
|---|---|---|---|
| **A** | `Autumn Rain` / `on the Mountain Pass` 2行 | **左下** | 杉の影で暗い場所に白文字。この画では一番読める見込み |
| B | `Rain on the Pass` 1行・大きめ | 左上 | Vol.3 と同じ位置で揃える。ただし上は霧で明るいので白は埋もれる恐れ |
| C | `Autumn Rain` 1語だけ・特大 | 中央下 | 350pxでも確実に読める。情報は減るが視認性は最強 |

**第一候補はA。** Vol.3 で分かったのは「明るい側に白文字を置くと消える」ことで、
この画は**上が明るい霧・下が暗い杉**なので、Vol.3 とは逆に下が正解になります。

画をもらったら `npm run thumbnail` で3案作って、縮小比較してから決めましょう。

---

## 4. タイトルと概要欄（リン・戦略）

### タイトル3案

```
A  Japanese Rain Ambience — Autumn Rain on a Mountain Pass | Koto & Shakuhachi BGM for Study, 1 Hour
B  Rain on a Japanese Mountain Pass — Autumn Rain Ambience | Koto & Shakuhachi BGM for Study, 1 Hour
C  Autumn Rain Ambience — Japanese Mountain Pass | Koto, Shakuhachi & Rain Sounds for Study, 1 Hour
```

**推すのはA。** 理由は2つです。

1. `Japanese ○○ Ambience —` という頭を Vol.3 から揃えると、
   一覧でシリーズだと分かります（Vol.3 は `Japanese Night Ambience —`）
2. それでも `Rain` が3語目に来るので、検索語の front-load もできています

C の `Rain Sounds` は検索数が桁違いに大きい語ですが、
**大手が独占していて登録者0のチャンネルでは出てきません。**
Vol.3 で長尾の語に振ったのと同じ判断で、`Koto & Shakuhachi` 側を残します。

### 概要欄

```
Autumn rain on a mountain pass. The traveler climbs the old stone road through
the cedars, with mist in the valley below and red maple wet against the grey.
One hour of original Japanese ambient music for study, work, reading and sleep.

Played on koto, shakuhachi, shinobue and biwa, with the sound of rain.
All music is original and composed for this channel.

秋雨の峠。杉林の古い石畳を、旅人が霧の谷を背にして登っていきます。
作業・勉強・読書・就寝のための、1時間のオリジナル和風アンビエント。

琴・尺八・篠笛・琵琶と、雨の音で。すべてこのチャンネルのための書き下ろしです。

── Tracklist ──
0:00:00 Rain on the Pass
0:02:34 First Drops on Cedar
0:06:00 Stone Steps in Mist
0:09:09 Climbing the Wet Road
0:12:08 Cedar Corridor
0:15:37 Small Shrine Under Rain
0:21:27 Mountain Mist Breathing
0:25:03 Biwa in the Rain
0:28:18 Rain Through Bamboo
0:31:37 Stone Jizo at the Bend
0:34:52 Red Maple Wet with Rain
0:38:31 Shakuhachi in the Fog
0:41:07 The Rain Grows Heavy
0:44:52 Shelter Under the Eaves
0:48:10 The Pass at Last
0:51:29 Rain Thinning
0:54:57 Break in the Clouds
0:58:20 Koto After the Rain
1:01:19 Lights in the Valley
1:04:45 Clear Sky Over the Ridge

── Playlist ──
隠り世の音 / Hidden Japan
（再生リストのURL）

#japanesemusic #studymusic #rainsounds #ambient #bgm
```

---

## 5. ショート動画（タク・編集）

長尺の配信が止まっているので、**ショートで入り口を別に作ります。**

### 使う曲

**`06 - Small Shrine Under Rain` に決定。** 舞さんが実際に聴いて「とても印象的」と
判断した曲です。番号は 01〜10 の範囲なので繰り上げの影響を受けません。

ショートは最初の1〜2秒で勝負が決まります。`startSeconds` は
**鈴（すず）か琴が鳴っている場所**に合わせること。無音や雨だけの場所から始めてはいけない。

### 設定（`config.json` の `short`）

```json
"short": {
  "track": "06 - Small Shrine Under Rain.mp3",
  "startSeconds": 30,
  "durationSeconds": 45,
  "mode": "crop",
  "cropX": 0.5,
  "fadeSeconds": 2
}
```

- `startSeconds` は**旋律が出ている場所**にします。30秒で鳴っていなければ数字をずらしてください
- 縦画像を9:16で作ってもらうので `cropX` は 0.5（中央）でよく、切れません
- ショートは自動でループするので、前後2秒のフェードは入れたままにします

`npm run short` で書き出します。

### ショートのタイトル

```
Rain on a Japanese mountain pass 🍁 #shorts #japanesemusic #studymusic #rainsounds
```

本編へのリンクを概要欄の1行目に置いてください。

---

## 進め方（セン・統括）

| 順 | やること | 担当 |
|---|---|---|
| 1 | ~~Suno で曲を作る~~ **完了（20曲）** | 舞さん |
| 2 | ~~ChatGPT で画を作る~~ **横型は完了** | 舞さん |
| 3 | `assets/music/` に入れて `npm run check` | 舞さん |
| 4 | 曲順の確定（`order.txt` は先に書いてあります） | チーム |
| 5 | `npm run reorder` → `npm run audio` | 舞さん |
| 6 | サムネ3案を比較して決定 | チーム＋舞さん |
| 7 | Canva で動画化・文字入れ | 舞さん |
| 8 | `npm run short` でショートの音声＋縦動画 | 舞さん |
| 9 | 公開 → `videos.md` に記録 | チーム |

**1本3時間以内で終わらせます。** 詰まったら曲数を18に落として先に出しましょう。
いま一番効くのは完成度ではなく本数です。

---

## 確定した曲順（20曲）

元の **11 Autumn Rain Jazz** と **21 Dripping Eaves** は作っていないため欠番。
`order.txt` はこの形に更新済みで、`npm run reorder` で番号が 01〜20 に繰り上がります。

| 新 | 曲名 | 元 | 章 |
|---|---|---|---|
| 01 | Rain on the Pass | 01 | 入り |
| 02 | First Drops on Cedar | 02 | 入り |
| 03 | Stone Steps in Mist | 03 | 入り |
| 04 | Climbing the Wet Road | 04 | 入り |
| 05 | Cedar Corridor | 05 | 深まり |
| 06 | Small Shrine Under Rain | 06 | 深まり |
| 07 | Mountain Mist Breathing | 07 | 深まり |
| 08 | Biwa in the Rain | 08 | 深まり |
| 09 | Rain Through Bamboo | 09 | 深まり |
| 10 | Stone Jizo at the Bend | 10 | 深まり |
| — | ~~Autumn Rain Jazz~~ | 11 | **欠番** |
| 11 | Red Maple Wet with Rain | 12 | 深まり |
| 12 | Shakuhachi in the Fog | 13 | 深まり |
| 13 | The Rain Grows Heavy | 14 | 深まり |
| 14 | Shelter Under the Eaves | 15 | 深まり |
| 15 | The Pass at Last | 16 | ほどき |
| 16 | Rain Thinning | 17 | ほどき |
| 17 | Break in the Clouds | 18 | ほどき |
| 18 | Koto After the Rain | 19 | ほどき |
| 19 | Lights in the Valley | 20 | ほどき |
| — | ~~Dripping Eaves~~ | 21 | **欠番** |
| 20 | Clear Sky Over the Ridge | 22 | ほどき |

### 2曲抜けたことの影響（アヤ・構成）

- **ジャズ（元11）が抜けて、深まりに山がなくなった。** 作業用BGMとしては
  むしろ正しい形（中盤は起伏を抑えるのが原則）なので、**そのまま進めます**。
  変化が欲しければ 09 Rain Through Bamboo が中盤の明るい側に立っています
- **Dripping Eaves（元21）が抜けて、終盤の「ほぼ無音」が1曲なくなった。**
  19 Lights in the Valley → 20 Clear Sky Over the Ridge で十分に落ちます
- **雨を切る位置は変わりません。** 17 Break in the Clouds 以降が雨なしなので、
  ザーという音が途中で消える段差は起きません
