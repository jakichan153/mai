# AFTERNOON #02 — 制作指示書（統合版）
編成: 音城 蓮 / 2026-09-21
**公開予定: 2026-09-24 17:05 以降**（AFTERNOON #01 のCTR計測完了後。計測期間中の公開は #01 のインプレッションを奪い検証を濁すため厳禁）

各担当の詳細は以下。本書はオーナーがそのまま使える形にまとめたもの。
- `afternoon-02-package.md`（白鳥 圭 / タイトル・概要欄・タグ・固定コメント）
- `afternoon-02-thumbnail.md`（皐月 澪 / サムネ・ループ映像）
- `afternoon-02-music.md`（鷺沢 奏 / 選曲・Sunoプロンプト・整音手順）

---

## 1. タイトル（確定）
```
午後がはかどる。集中できる洋楽プレイリスト｜作業・勉強用BGM【AFTERNOON #02】
```
全角38文字。規約T1〜T6遵守。#01「午後に聴きたい」と語彙重複なし。

## 2. 規格
| 項目 | 値 |
|---|---|
| 尺 | **49:55**（15曲 / 標準規格48〜55分の中心） |
| ラウドネス | 全曲 -16 LUFS |
| 曲間 | クロスフェード2〜3秒 |
| 解像度 | 1920×1080 / 30fps |

## 3. Sunoベースプロンプト（AFTERNOONシリーズ共通・今後固定）
```
warm indie pop, breathy soft female english vocals, mellow clean electric guitar with light chorus, warm rhodes electric piano, brushed soft drum kit, relaxed mid-tempo groove, 72-88bpm, warm analog lo-fi texture, subtle tape saturation, faint vinyl crackle, intimate close-mic vocal tone, smooth even dynamics, cozy sunlit afternoon mood, unhurried pacing
```
**Exclude styles**
```
shouting, belting, distorted vocals, harsh cymbals, loud chorus drops, sudden tempo change, aggressive drums, EDM build-up, screaming, heavy distortion
```
曲ごとの差分プロンプト15曲分は `afternoon-02-music.md` の楽曲リスト表を参照。

## 4. サムネイル生成プロンプト（A案・推奨）
```
Watercolor illustration in a delicate Japanese anime art style, a young woman
with long wavy brown hair wearing over-ear headphones, a light cream cardigan
over a white t-shirt, sitting alone on a dark navy blue train bench seat,
positioned slightly right of center so she occupies about 30% of the frame
width, knee-up framing with legs crossed, resting her cheek gently on her
hand with her elbow propped against the window frame, eyes closed in a calm
peaceful expression, late-afternoon golden light streaming low through the
large train window casting long soft shadows, blurred Tokyo cityscape
rooftops and soft clouds visible through the window behind her, the upper
left area of the frame kept open with soft sky for text overlay, soft
watercolor washes with visible paper texture, delicate ink linework, warm
amber and muted navy palette, calm dreamy mood, no text, no lettering,
no watermark, 16:9
```
文字は **Canvaのテキストレイヤー**で乗せる（AIに描かせない）。
`Playlist` の直下に `Afternoon`、細セリフ体・タイトルケース・**濃紺〜青紫 `#3A3A6E`**、画面左上・#01と同じY座標。

## 5. Klingループ映像プロンプト（1本のみ）
`afternoon-02-thumbnail.md` の該当章を参照。

## 6. 概要欄（そのまま貼れる完成形）
```
午後3時、集中力がふっと途切れる時間に。予定を詰め込みすぎた日でも、手を止めずに続けられる曲だけを15曲選びました。イヤホン1つで、机の上の空気を少しだけ変えるための時間です。

━━━━━━━━━━━━━━━
▸ Tracklist
00:00 Golden Hour Window
03:25 Slow Train Afternoon
06:50 Paper and Sunlight
10:10 Quiet Static Hum
13:20 Half-Read Chapter
16:45 Faint Blue Curtains
20:05 Long Afternoon Stretch
23:20 Warm Tape Interlude
26:25 Second Cup
29:55 Notebook Margins
33:15 Drifting Dust Light
36:25 Low Hum of the Afternoon
39:50 Fading Platform Light
43:10 Almost Evening
46:25 Last Light, Quiet Train
━━━━━━━━━━━━━━━

▸ このチャンネルについて
時間帯とシーンに合わせた洋楽風プレイリストをお届けしています。
・AFTERNOON … 午後の作業・勉強に
・NIGHT DRIVE … 夜のドライブに
・MORNING … 朝の通学・通勤に
・MIDNIGHT … 眠れない夜に

▸ 楽曲について
このチャンネルの楽曲はすべて、AI作曲ツールを用いて制作したオリジナル楽曲です。
既存アーティストの楽曲は使用していません。

#洋楽 #作業用BGM #勉強用BGM #playlist #lofi
```
> タイムスタンプはSuno想定尺からの逆算値。**結合後の実測値に必ず差し替えること。**

## 7. タグ（14個）
```
洋楽プレイリスト / 作業用BGM / 勉強用BGM / 午後 BGM / 集中 BGM / 洋楽 chill / lofi / chill music / playlist / BGM 作業用 / study music / work music / relax BGM / カフェ BGM
```

## 8. 固定コメント（推奨）
```
今日の午後、何をしながら聴いていますか？
```

---

## 9. 公開前チェックリスト
- [ ] 尺が48〜55分に収まっているか
- [ ] 全曲 -16 LUFS に統一したか / 曲間に無音・音量差がないか（3か所ランダム再生で確認）
- [ ] ループ映像の継ぎ目が目立たないか
- [ ] サムネをスマホ実機の縮小サイズで確認したか（人物・文字が判別できるか）
- [ ] サムネに「Ai」透かしが残っていないか
- [ ] **概要欄のタイムスタンプを実測値に差し替えたか**
- [ ] 冒頭5秒に「#02 AFTERNOON」テロップを入れたか
- [ ] エンドスクリーン + 15分/30分地点の登録カードを設定したか
- [ ] 再生リスト `AFTERNOON` に追加したか
- [ ] 固定コメントを投稿したか
- [ ] **#01 の計測（9/24 17:05）が完了しているか** ← これ以前に公開しない
