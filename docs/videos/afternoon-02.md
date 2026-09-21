# AFTERNOON #02

> 各章は担当エージェントが追記していく。既存の章は消さないこと。

## サムネイル
担当: 皐月 澪（art-director） / 2026-09-21

### 前提（参照）
- `docs/03-packaging-rules.md` §2.1（不変資産）・§2.1.5.5（文字スタイル正式仕様）・§2.1.6（文字の制作方式）
- `docs/05-thumbnail-revision.md` 冒頭の訂正2件（水彩イラストであること／文字はテキストレイヤーであること）
- AFTERNOON #01 改訂版（2026-09-21差し替え・検証中）を基準形として継承

### 設計課題
#01と**同一シリーズだと一目でわかる**（世界観・舞台・色・文字仕様の継承）ことと、**#01と並んだ時に別動画だとわかる**（構図・光・ポーズでの差別化）ことの両立。
→ 今回は「舞台・色温度・文字仕様は完全継承」「人物のポーズと光の時間経過（同じ午後の中でもやや傾いた光）だけを変える」方針で両立させる。#01は「まっすぐ外を見る」構図だったため、#02は「頬杖をついて目を閉じる」という明確に異なる行為1つに絞った。

---

### ■ サムネA案（推奨）

**構図（人物の位置・視線・背景・光源）**
電車内、#01と同じ濃紺のロングシート・大きな車窓。女性1人、画面幅の約30%を占有する膝上フレーミングで、画面中央よりやや右寄りに配置（左上のテキスト帯とかぶらないよう空間を確保）。肘を窓枠につき頬杖をつく姿勢、脚を組んで窓側に体を預けている。**目は閉じて音楽に浸っている表情**（視線が画面外を向く#01とは異なる行為でシリーズ内の差別化）。光は#01よりやや傾いた午後遅め（16時前後）の琥珀色の光で、影がわずかに長い。窓外には#01と同じくぼかした東京の街並みのシルエットと雲。ヘッドホンは装着状態がはっきり視認できる角度で維持。

**Canva/画像生成プロンプト（英語）**
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

**文字レイアウト**
- 表記: `Playlist` の直下に `Afternoon`（タイトルケース、全大文字にしない）
- 書体: 細めのセリフ体（4シリーズ共通・#01と同一書体を流用）
- 配置: 画面左上（人物・窓外の空が背景。#01と完全に同じY座標に固定）
- サイズ比: `Afternoon` は `Playlist` の35〜40%
- 色: 濃紺〜青紫（`#3A3A6E`目安）。背景は明るい空のため、明度差で視認性を確保（§2.1.5.5の「明度で背景に勝つ」鉄則）
- 字間: 標準よりやや広め
- 制作方式: AI生成画像には文字を描かせない。Canvaのテキストレイヤーとして乗せる（§2.1.6）

---

### ■ サムネB案

**構図（人物の位置・視線・背景・光源）**
同じ濃紺ロングシート・車窓。女性1人、画面幅約30%、膝上フレーミング、画面右寄り配置。ヘッドホンに軽く片手を添えてリズムを取る仕草、微かな微笑み、視線は窓の外（画面外）。膝の上に小さなキャンバストートバッグ（小物1点のみ追加）。光は#01と同じ真昼寄りの暖色だが、電車が並木沿いを通過している設定で座席と髪にまだらな木漏れ日が落ちる。窓外の街並みはわずかに流れるようなブラーで「走行中」を示唆。

**Canva/画像生成プロンプト（英語）**
```
Watercolor illustration in a delicate Japanese anime art style, a young woman
with long wavy brown hair wearing over-ear headphones, an oversized beige
knit sweater, sitting alone on a dark navy blue train bench seat, positioned
slightly right of center so she occupies about 30% of the frame width,
knee-up framing, lightly touching her headphone with one hand as if enjoying
the music, a gentle smile, looking out of the train window away from the
viewer, a small canvas tote bag resting on her lap, soft midday warm light
with dappled sunlight patterns like light through passing trees falling
across the seat and her hair, softly blurred Tokyo cityscape and a subtle
streaking motion outside the large window suggesting the train is moving,
the upper left area of the frame kept open with soft sky for text overlay,
soft watercolor washes with visible paper texture, delicate ink linework,
warm cream and muted navy palette, gentle joyful mood, no text, no lettering,
no watermark, 16:9
```

**文字レイアウト**
A案と同一（§2.1.5.5準拠・位置/書体/色/サイズ完全固定）。

---

### ■ 推奨: A案

理由:
1. **行為の差別化が一目でわかる**。#01は「まっすぐ外を見る」、#02は「頬杖をついて目を閉じる」。並べたときに別カットだと即座に判別でき、かつ同じ人物・同じ座席・同じ光の系統なので同一シリーズだとも即座にわかる。
2. B案の「木漏れ日」「走行中のブラー」「トートバッグ」は要素が3つ増える。C4（被写体1・行為1・情景1に絞る）に照らすとA案の方が要素が少なく、親指サイズでの視認性リスクが低い。
3. 水彩は全体コントラストを上げると濁る（§1.5既訂正済み事項）。A案の「長い影」は主役と背景の明度差だけを自然に作れる一方、B案の「まだら光」は水彩の淡さと相性が悪く、サムネサイズでノイズに見える懸念がある。

---

### ■ Klingループ映像プロンプト（英語 / 5〜10秒シームレスループ前提・1本のみ）

```
Seamless 8-second loop, woman resting her cheek on her hand by a train
window in late-afternoon golden light, eyes gently closed in a peaceful
expression, subtle breathing motion, hair softly swaying, warm amber
light flickering through passing scenery outside the window, no camera
movement, soft watercolor illustration style, cinematic warm tone, loopable
```

※Klingはクレジット制限のため1本のみ。A案（推奨）の構図・光をそのまま踏襲。

---

### ■ オーナー作業手順（Canva Pro・スマホ中心）

1. Canvaアプリで新規デザイン作成、サイズ1280×720を指定（3分）
2. 「Magic Media（AI画像生成）」を開き、A案の英語プロンプトを貼り付けて生成。3〜4パターン出して1枚選ぶ（10分）
3. AFTERNOON #01改訂版のファイルを複製し、「Playlist」「Afternoon」のテキストレイヤーだけをそのままコピー＆貼り付け（位置・書体・色・サイズは一切変更しない＝§2.1.5.5のY座標固定）（5分）
4. 背景画像を#02で生成したものに差し替え。テキストレイヤーは動かさない（3分）
5. 左上に生成ツールの「Ai」ウォーターマークが写り込んでいないか確認し、写り込んでいればトリミングまたはテキスト帯で覆って除去（3分）
6. 書き出して、スマホのホーム画面やYouTubeアプリのおすすめ欄と同じ縮小サイズで実機表示し、「Playlist」「Afternoon」の可読性と、人物のポーズ（頬杖・目を閉じている）が親指サイズで判別できるか確認（A4チェック）（3分）
7. 問題なければ1280×720 PNG/JPGで書き出し、`assets/thumbnails/afternoon_02.png` として保存し、YouTube Studioにアップロード（4分）

**所要時間合計: 約31分**

---

### ■ 台帳への追記内容（`docs/03-packaging-rules.md` §4.2・§4.3）
以下を該当セクションに追記済み（本作業と同時に反映）。

- §4.2（Kling）: AFTERNOON #02専用ループプロンプトの行を追加
- §4.3（Canva）: AFTERNOON #02の構図メモ行を追加（A案採用・本ファイルへのリンク）
