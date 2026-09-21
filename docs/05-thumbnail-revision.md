# 既存4本サムネイル改訂案

> ## ⚠ 重要な訂正（2026-09-20 / 音城 蓮）
> 初版はサムネ実物を未確認のまま作成しており、前提が3点誤っていた。**初版の §2 の画像生成プロンプト・§5 の手順④・C2（コントラスト）は無効。**
>
> | 誤った前提 | 実際 |
> |---|---|
> | 「PLAYLIST」はテキストレイヤー | **水彩で窓に描き込まれた絵の一部**。テキストボックスは存在せず、複製・移動できない |
> | ビジュアルは写真（cinematic photo） | **水彩イラスト**（繊細な線画＋淡い彩色、日本のアニメ美術寄り）。写真プロンプトは資産を破壊する |
> | コントラストを上げれば改善 | 水彩はにじみと淡さが持ち味。**全体コントラストを上げると濁る**。上げるべきは「主役と背景の明度差」だけ |
>
> **確定したブランド資産（今後も維持する3点）**
> 1. 水彩イラストのアートスタイル ← **最大の資産。競合の写真・汎用lofiアニメとの決定的な差別化点**
> 2. 「PLAYLIST」が車窓越しの風景に溶けているコンセプト
> 3. 電車という舞台
>
> 有効な改訂方針は §1.5 を参照。
>
> ## ⚠ 追加訂正（2026-09-21）: NIGHT DRIVE #01 の診断を撤回
> 下記 §1 の「NIGHT DRIVE #01 は実質的なお手本構図。改訂はシリーズ名追加のみ」という診断は、
> **CTR未計測の状態での視覚的判断であり、実測により誤りと確定したため撤回する。**
>
> 実測: NIGHT DRIVE #01 は **imp 16,000（全4本で最多）/ CTR 2.6%**。
> 最も多くの配信機会を得ながら最も無駄にした動画であり、CTR6.0%到達時の増分クリックは **+544 と4本中最大**。
> **「触るな」から「第2優先で改訂」へ変更。** 根拠と優先順位は `docs/02-analytics-ledger.md` を参照。

---

## 1.5 実物確認後の再診断【こちらが最新】

### 最大の問題: 視覚的な主従が逆転している

AFTERNOON #01 の実物では、**「PLAYLIST」の文字が画面の上半分を占める主役**になっており、**人物は画面幅の約15%の脇役**に置かれている。

サムネイルでクリックを生むのは「人物・表情・情景」であり、「PLAYLIST」という単語ではない。
スマホの一覧表示（実表示サイズ 約168×94px）では、この構図は「青い四角＋大きな文字＋小さな染み」にしか見えない。**CTR 3.8% の天井の正体はこれ。**

### 改訂方針: 主従を入れ替える

| 要素 | 現状 | 改訂後 |
|---|---|---|
| 人物の占有幅 | 約15% | **30〜35%**（膝上〜上半身。バストアップまで寄せると「1人きりの広い座席」の情緒が消えるため、中間を取る） |
| 「PLAYLIST」 | 画面上半分を占有 | **縮小**し、窓の上部に収める。世界観は残しつつ主役の座を人物に渡す |
| アートスタイル | 水彩イラスト | **変更しない**（最大の資産） |
| 舞台 | 電車内 | 変更しない |

### 制作方式の変更: 文字は「描かせない」で「乗せる」

**AI生成画像に文字を描かせることをやめる。**

理由:
1. AI画像生成の文字は毎回崩れる。4本で位置・書体・サイズを揃えられない＝**ブランド資産として機能しない**
2. シリーズ名（AFTERNOON等）を追加できない
3. 位置が固定できないため、規約 §4 の「Y座標完全固定」が守れない

**新方式**
```
① 水彩イラストを「文字なし」で生成（プロンプトに no text, no lettering を明記）
② Canvaで「PLAYLIST」をテキストレイヤーとして追加
   → 青紫系の色・不透明度65〜75%で、水彩に溶け込ませる
   → 位置・書体・サイズを4本で完全固定 ＝ ここで初めて本物のブランド資産になる
③ その直下にシリーズ名を同じ処理で追加
④ 左上の「Ai」ウォーターマークをトリミングまたは被せて除去
```
これにより「窓に文字が溶けている」という現行のコンセプトを保ったまま、再現性と拡張性を獲得する。

---

## 1. 各動画の診断（初版 / §1.5 の訂正を優先すること）

| # | 動画 | 実測 | 該当する問題（C1〜C4） | 診断 |
|---|---|---|---|---|
| 1 | AFTERNOON #01 | 636回 / CTR **3.8%** | C1・C2・C3 | 人物が画面1/3の引き構図（C1）。日中の自然光だが全体に淡くコントラスト不足（C2）。「PLAYLIST」のみでシリーズ名がなく、MORNINGと視覚的に同一クラスタに見える（C3）。**現状唯一ブラウジングが健全に回っている動画であり、これが天井=3.8%止まりになっている。** |
| 2 | NIGHT DRIVE #01 | 311回 / CTR **未計測** | C3のみ（軽微） | 4本中もっとも人物に寄っており、コントラストも最強。C1・C2・C4はほぼクリアしている実質的な「お手本」構図。弱点はシリーズ名の欠如のみ。**CTRが未計測のため、優先度判断に使えるデータがない**ことそのものがリスク（下記§5-Bで計測を依頼）。 |
| 3 | MORNING #01 | 218回 / CTR **未計測** | C1・C2・C3（最重度） | 電車内・青いシート・窓外の街並みという**舞台構成がAFTERNOON #01とほぼ同一**。`docs/03-packaging-rules.md` §2.2はMORNINGを「駅のホーム・朝の車内」と定義しているが、現行サムネはこの定義を満たしておらず、事実上AFTERNOONの色違いになっている。ブラウジング配信で両者が同一視聴者層に競合表示された場合、**どちらか一方しかクリックされず、自チャンネル内で機会を奪い合っている可能性が高い**（共食い）。これは単独のCTR不振以上に構造的な問題。 |
| 4 | MIDNIGHT #01 | 26回 / CTR **1.8%**（打ち切りライン割れ） | C4が最重度、C1・C2も併発 | 人物2人（A1違反）＋ワイングラス・ソファ・ベッド・間接照明と要素が過多（C4）。主役が誰かも行為も一瞬で判別できない。全体暖色×低コントラストで主役に視線が集まらない（C1・C2相当）。他3本と舞台系統が完全に異なり単独チャンネルの体をなしていない。`docs/02-analytics-ledger.md`の判断基準表で「CTR<2.0%＝即差し替え」に該当する唯一の動画。 |

**結論（1〜2行）**: AFTERNOONは天井（3.8%）、MORNINGはAFTERNOONとの共食いで伸びを潰され、MIDNIGHTは規約違反（A1・C4）で配信を打ち切られている。NIGHT DRIVEは構図面では最も健全だがCTR実測がなく判断材料が欠けている。

---

## 2. 改訂案（各動画 A/B 2案 + 推奨）

### 2.1 AFTERNOON #01

**構図（A案）**
電車の窓際シート、女性1人をバストアップまで寄せる。体は斜め45度、視線は車窓の外（画面右外）へ。午後の陽光が斜めから顔の片側に強く当たり、反対側に陰影を作る（順光と逆光の中間、コントラスト強め）。背景の車内・街並みは大きくぼかし、光は黄金色〜琥珀色を強調。

```
Watercolor illustration in a delicate Japanese anime art style, a young woman
with long wavy brown hair wearing over-ear headphones, an oversized white
t-shirt and light blue wide-leg jeans, sitting alone on a dark blue train
bench seat, knee-up framing so she occupies the center third of the frame,
turned slightly to the side, looking out of the train window away from the
viewer, bright early-afternoon summer light, blurred Tokyo cityscape and
white clouds seen through the large window behind her, soft watercolor washes
with visible paper texture, delicate ink linework, muted blue and cream
palette, calm and quiet mood, no text, no lettering, no watermark, 16:9
```

**構図（B案）**
同じ電車内だが膝上構図まで少し引き、窓枠に肘をついて頬杖をつくポーズ。逆光気味にして輪郭に光のにじみ（レンズフレア）を効かせる、よりシネマティックな一枚。

```
A woman resting her chin on her hand by a train window, knee-up framing, backlit by warm afternoon sun creating a soft lens flare along her silhouette, looking away from camera toward the window, warm orange and amber tones, cinematic film look, soft glow, blurred urban background, 1280x720
```

**文字レイアウト**: 画面最上部15〜22%に「PLAYLIST」白抜き帯（黒半透明バー背景で視認性確保）。その直下に「AFTERNOON」を小さめ・暖色クリーム寄りの白でトラッキング広めに配置（詳細ルールは§4）。

**推奨: A案**。理由: バストアップで表情まで見える分、C1「誰が何をしているか一瞬で分かる」の達成度がB案より高い。B案の逆光シルエットは雰囲気は良いがMORNING改訂案（§2.3）と光の効かせ方が似てしまい、シリーズ間の差別化が弱まる。

---

### 2.2 NIGHT DRIVE #01

現状すでにC1・C2をクリアしているため、**大幅な構図変更はしない**（勝っている要素を壊さないリスク管理を優先）。改訂の主眼はC3（シリーズ名の追加）のみ。

**構図（A案・現状踏襲+微調整）**
運転席の男性を横顔で捉える現行構図を維持しつつ、フレーミングをもう一段階だけ顔に寄せる。フロントガラス越しのネオン夜景はそのまま、青紫〜マゼンタのコントラストも維持。

```
A man in the driver's seat of a car at night, close side profile shot, city neon lights blurred through the windshield in blue and magenta tones, high contrast, looking forward through the windshield away from camera, moody cinematic night drive atmosphere, 1280x720
```

**構図（B案・角度変更で鮮度を出す）**
側面プロフィールから、後部座席寄りのやや斜め後ろのアングルに変更。ネオンの彩度をさらに強め、青とマゼンタの分離をはっきりさせる。

```
A man driving a car at night, three-quarter rear angle from the back seat, vivid neon city lights in blue and magenta reflecting on the windshield and dashboard, strong color contrast, cinematic night drive mood, driver looking forward away from camera, 1280x720
```

**文字レイアウト**: 「PLAYLIST」帯は他3本と同じ上部15〜22%位置。「NIGHT DRIVE」はネオンを想起させる青〜マゼンタのアクセントカラーで帯直下に配置。

**推奨: A案**。理由: 現状のCTRが未計測=何が効いているか検証できていない状態でB案（角度変更）を採用すると、変数が増えて後の分析が難しくなる。今回はシリーズ名追加とわずかな寄りのみに留め、次回計測後に角度変更を試す。

---

### 2.3 MORNING #01

**最重要修正**: 舞台をAFTERNOONと同じ「電車内」から、規約定義どおり「駅のホーム」へ移す。これがAFTERNOONとの共食い解消の核。

**構図（A案）**
駅のホームに立つ男性の半身〜バストアップ。電車を待つ姿勢で、体はやや斜め、視線は電車が来る方向（画面外）。朝の低い太陽が逆光気味に差し込み、輪郭が淡く光る。色は水色〜白の淡いトーン。

```
A young man standing on a train station platform in the early morning, bust-up to half-body shot, soft backlight from low morning sun creating a gentle rim light on his silhouette, looking off toward the direction of an arriving train, pale blue and white color palette, soft hazy morning atmosphere, blurred platform and sky in background, 1280x720
```

**構図（B案）**
ホームのベンチに座る、または柱にもたれる姿勢でバストアップに寄せる。本を持つ・スマホを見るなど「行為」を1つ加える。逆光のリムライトは活かしつつ、顔にも最低限の光を当てて表情が読み取れるようにする。

```
A young man leaning against a pillar on a train station platform in the early morning, bust-up shot, backlit rim light from soft morning sun with just enough fill light to see his expression, holding a book, looking away from camera toward the horizon, pale sky blue and soft white tones, gentle morning haze, 1280x720
```

**文字レイアウト**: 「PLAYLIST」帯は共通位置。「MORNING」は帯直下に淡い水色でライトウェイトのトラッキング広めの文字。

**推奨: B案**。理由: A案の完全逆光シルエットは雰囲気は出るが、C1が求める「誰が何をしているか一瞬で分かる」という情報量が不足する（顔が見えない）。B案は逆光の質感を残しつつ表情も読めるため、AFTERNOONとの差別化（舞台・光の向き）と視認性を両立できる。

---

### 2.4 MIDNIGHT #01

**最重要修正**: 人物を2人→1人に削減（A1準拠）、小物・情報量を「被写体1・行為1・情景1」まで削る（C4修正）。

**構図（A案）**
女性1人が室内の窓際に立ち、マグカップを片手に外の夜景を眺めている。上半身〜バストアップ。光源は暖色の間接照明のみ、窓の外はうっすら光る夜景シルエット程度に留める。背景のベッド・ソファは完全にフレーム外に排除。

```
A woman standing by a window at night, holding a warm mug, bust-up shot, soft warm indirect lamp light on her face and shoulders, city night lights faintly glowing outside the window, looking out toward the window away from camera, low warm-toned lighting, minimal cozy interior, cinematic and calm mood, single subject only, 1280x720
```

**構図（B案）**
ソファに座り毛布にくるまってスマートフォンか本を眺める女性1人。バストアップ〜膝上、窓からの月明かりと室内スタンドライトの暖色をミックス。背景はソファの質感のみ残し、テーブルやグラス類は排除。

```
A woman wrapped in a blanket sitting on a sofa late at night, bust-up to knee framing, warm lamp light mixed with soft moonlight from a window, looking away from camera toward the window, cozy minimal interior with no clutter, warm low-contrast color tones, calm intimate late-night mood, single subject only, 1280x720
```

**文字レイアウト**: 「PLAYLIST」帯は共通位置。「MIDNIGHT」は帯直下に暖色（アンバー〜ゴールド）、やや低めの明度でトラッキング広めに配置。

**推奨: A案**。理由: 「窓の外の夜景を1人で眺める」は被写体1・行為1・情景1に最も忠実に削ぎ落とせており、MIDNIGHTという時間帯の孤独感・没入感を最短で伝えられる。B案は「くつろぎ」の情報が加わる分、要素がわずかに増えてC4の再発リスクがある。

---

## 3. 最優先で差し替える1本の指名

### 結論: **AFTERNOON #01 を最初に差し替える**

理由:
1. **統計的に意味のあるCTR差分を72時間で読める唯一の動画。** AFTERNOONはインプレッション14,000・ブラウジング70%と、現在も実際に配信され続けている唯一の動画。差し替え後すぐに十分な新規インプレッションが発生し、72時間でCTRの変化を有意に検出できる。
2. MIDNIGHTはCTR1.8%で**すでに配信を打ち切られている**（累計インプレッション1,022）。ここを差し替えても72時間で新規インプレッションがほとんど発生せず、変化を測定できない可能性が高い。MIDNIGHTの差し替えは「検証」ではなく「即時の規約違反是正」として別枠で並行実施する（`docs/02-analytics-ledger.md` §4の「CTR<2.0%→即差し替え」ルールに基づく、測定とは独立した対応）。
3. NIGHT DRIVE・MORNINGはCTRが未計測でベースラインが存在せず、そもそも比較ができない。
4. AFTERNOONはチャンネル全体のCTRの天井（3.8%）を規定している動画でもある（`docs/00-strategy.md` §2.2）。ここで5.5%以上を出せれば、C1〜C3の修正パターン（寄り・コントラスト・シリーズ名帯）を**検証済みの「勝ち筋」としてMORNING・MIDNIGHT・NIGHT DRIVEへ横展開できる**。1本のテストが4本すべての改訂根拠になる。

**運用上の補足**: MIDNIGHTは統計検証の対象にはしないが、A1・C4の規約違反が明確なため、AFTERNOONの検証と同時並行で差し替えて構わない（「止めない」原則）。ただしCTRの前後比較は「参考値」に留め、公式な効果判定はAFTERNOONの72時間比較で行う。

---

## 4. シリーズ名の文字表示ルール（統一規則）

「PLAYLIST」帯は**位置・書体・太さを4シリーズで完全固定**し、シリーズ名だけをシリーズごとに変化させる。これにより「同じチャンネルの統一感」と「4つの別世界」を両立する。

| 項目 | PLAYLIST帯（固定） | シリーズ名（可変） |
|---|---|---|
| 位置 | 画面上端から**縦15〜22%**の帯。4本で完全に同じY座標（帯の位置がブレると統一資産として機能しない） | PLAYLIST帯の直下、**縦22〜32%**の位置に固定（顔・視線の妨げにならない範囲） |
| 書体ファミリー | 太字ゴシック系サンセリフ1書体に統一（Canvaの同一フォントを常に使用） | PLAYLISTと**同一フォントファミリー**（別書体にしない＝ブランドの一貫性） |
| サイズ比 | 基準100 | 基準の**35〜40%**の高さ |
| 色 | 常に白抜き＋縁取りまたは半透明黒帯で視認性確保（背景を問わず崩れない） | 白地に近いがシリーズごとに色温度を変える（下表） |
| トラッキング（字間） | 標準 | 標準よりやや広め（+5〜10%）でロゴ的に見せる |

**シリーズ別カラー（色温度で世界観を伝える）**
| シリーズ | シリーズ名の色 | 書体の太さ |
|---|---|---|
| AFTERNOON | 暖色寄りのオフホワイト（クリーム） | Regular |
| NIGHT DRIVE | 青〜マゼンタのアクセント（ネオン感） | Bold |
| MORNING | 淡いスカイブルー | Light |
| MIDNIGHT | 暖色アンバー〜ゴールド、やや低明度 | Regular |

書体ファミリー・位置・サイズ比という「構造」は完全固定、色と太さという「表情」だけが変わる。この規則によりA2（視線は画面外）・A3（文字はPLAYLIST+シリーズ名のみ）・A4（親指サイズで判別可能）を4シリーズ共通で満たせる。

---

## 5. オーナー作業の手順（Canva Pro / スマホ中心 / 1本あたり目安35分）

### A. 今やること（1本あたりの作業チェックリスト）

以下は改訂対象1本ごとの手順です。まず**AFTERNOON #01（§3の最優先指名）から着手**してください。

- [ ] ① Canvaアプリで新規デザイン作成、サイズ1280×720を指定（3分）
- [ ] ② 「Magic Media（AI画像生成）」を開き、該当動画の**推奨プロンプト（英語・上記A案）**をそのまま貼り付けて生成。3〜4パターン出して1枚選ぶ（10分）
- [ ] ③ 生成した背景画像に「調整」パネルでコントラストを+10〜20、彩度を微調整（C2対策）（5分）
- [ ] ④ 既存動画のサムネからPLAYLIST帯のテキストボックスだけを複製し、新しい背景に重ねる（位置は動かさない＝§4のY座標を毎回固定）（5分）
- [ ] ⑤ PLAYLIST帯の直下にシリーズ名テキストを追加。§4の色・太さ表のとおりに設定（5分）
- [ ] ⑥ 一度書き出して、スマホのホーム画面またはYouTubeアプリのおすすめ欄と同じくらいの縮小サイズで実機表示し、親指サイズで「PLAYLIST」「シリーズ名」「誰が何をしているか」が判別できるか確認（A4チェック）（3分）
- [ ] ⑦ 問題なければ1280×720 PNG/JPGで書き出し、YouTube Studioでサムネイル差し替え（4分）

**所要時間合計: 約35分/本**

### B. 私に渡してほしい情報

1. **AFTERNOON #01の差し替え後72時間のCTR・インプレッション数**
   手順: YouTube Studio → 対象動画 → アナリティクス → リーチ → 「インプレッションのクリック率」を差し替え時刻から72時間後に記録し、報告してください。
2. **NIGHT DRIVE #01・MORNING #01のCTRとインプレッション数（未計測分）**
   手順: 同じくアナリティクス → リーチタブで確認できます。この2本はベースラインが無いため、差し替え前に一度記録をお願いします。

### C. 分析・解説

診断・改訂根拠は本ドキュメント§1〜§4に記載。本文としての結論は既に§1・§3に集約済みのため、ここでは重複記載しません。

---

## 6. Klingループ映像プロンプト（参考・各シリーズ1本まで）

D1（静止画禁止）に基づき、サムネと同じ構図・光をKlingの5〜10秒シームレスループで用意する。Standardプランのクレジット制限を踏まえ、**1動画につき1本のみ**生成する前提。

| シリーズ | Klingプロンプト（英語） |
|---|---|
| AFTERNOON | `Seamless 8-second loop, woman sitting by a train window in warm afternoon light, subtle breathing motion, hair gently moving, sunlight flickering softly through passing scenery outside the window, no camera movement, cinematic warm tone, loopable` |
| NIGHT DRIVE | `Seamless 8-second loop, man driving at night, city neon lights softly flickering and streaking past the windshield, subtle hand movement on the steering wheel, no camera movement, moody blue and magenta tone, loopable` |
| MORNING | `Seamless 8-second loop, man standing on a train station platform at sunrise, soft morning breeze moving his hair and coat slightly, faint light rays shifting, no camera movement, pale blue backlit tone, loopable` |
| MIDNIGHT | `Seamless 8-second loop, woman standing by a window at night holding a warm mug, gentle steam rising, faint city lights twinkling outside, no camera movement, warm low-light tone, loopable` |

---

## 7. `docs/03-packaging-rules.md` への追記内容

以下を該当ドキュメントの §4.3（Canvaプロンプト台帳）に追記済み（本作業と同時に反映）。

| シリーズ | 構図メモ | ファイル |
|---|---|---|
| AFTERNOON | バストアップ・電車窓際・斜め45度・暖色ハイコントラスト（推奨A案、`docs/05-thumbnail-revision.md` §2.1） | 未生成（差し替え後に `assets/thumbnails/afternoon_01_v2.png` へ格納予定） |
| NIGHT DRIVE | 現行踏襲＋わずかに寄り・シリーズ名追加のみ（推奨A案、§2.2） | 未生成（差し替え後に `assets/thumbnails/nightdrive_01_v2.png` へ格納予定） |
| MORNING | 舞台を駅のホームへ変更・逆光リムライト＋表情視認（推奨B案、§2.3） | 未生成（差し替え後に `assets/thumbnails/morning_01_v2.png` へ格納予定） |
| MIDNIGHT | 1人に削減・窓辺でマグカップ・要素最小化（推奨A案、§2.4） | 未生成（差し替え後に `assets/thumbnails/midnight_01_v2.png` へ格納予定） |
