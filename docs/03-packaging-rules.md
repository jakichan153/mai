# パッケージ規約（タイトル・サムネ・概要欄）
管理: 白鳥 圭（packager） / 皐月 澪（art-director）

> パッケージは中身より先に決める。**箱が売れなければ中身は聴かれない。**

---

## 1. タイトル規約

### 1.1 固定構文
```
[感情フック]。[シーンキーワード]洋楽プレイリスト｜[用途1]・[用途2]用BGM【SERIES #NN】
```

### 1.2 絶対ルール
| # | ルール | 根拠 |
|---|---|---|
| T1 | **「洋楽プレイリスト」は必ず入れる** | 1〜3本目で機能、外した4本目で再生が1/10以下に落ちた |
| T2 | **用途語を2つ以上入れる**（作業/勉強/ドライブ/通学/リラックス/睡眠/おうち時間） | 検索意図の複数取り |
| T3 | **先頭に日本語の感情フック** | 「朝がちょっと好きになる。」型。無機質な競合との差別化 |
| T4 | **末尾に【SERIES #NN】** | シリーズ番号＝継続の可視化＝登録理由 |
| T5 | 全角40文字以内（スマホ表示の切れ位置） | モバイル流入が主 |
| T6 | 実在アーティスト名・曲名は書かない | オリジナル曲。誤認を招く表記は収益化リスク |

### 1.3 シリーズ別テンプレ
| シリーズ | タイトル例 |
|---|---|
| AFTERNOON | `午後がはかどる。心地よい洋楽プレイリスト｜作業・勉強用BGM【AFTERNOON #05】` |
| NIGHT DRIVE | `夜の高速に溶ける洋楽プレイリスト｜ドライブ・作業用BGM【NIGHT DRIVE #03】` |
| MORNING | `朝がちょっと好きになる。爽やかな洋楽プレイリスト｜通学・勉強用BGM【MORNING #04】` |
| MIDNIGHT | `眠れない夜のための洋楽プレイリスト｜リラックス・睡眠用BGM【MIDNIGHT #02】` |

---

## 2. サムネ規約

### 2.1 不変の要素（ブランド資産・変更禁止）

**【2026-09-20 実物確認により全面改訂】**

| # | 資産 | 内容 |
|---|---|---|
| **B1** | **水彩イラストのアートスタイル** | 繊細な線画＋淡い彩色、日本のアニメ美術寄り。**最大の資産**。競合（写真素材・汎用lofiアニメループ）との決定的な差別化点。**写真系・3D系のプロンプトは使用禁止** |
| **B2** | 「PLAYLIST」が車窓越しの風景に溶けるコンセプト | 文字が風景と重なる表現。ただし制作方式は §2.1.6 のとおり変更する |
| **B3** | 電車という舞台 | AFTERNOON・MORNINGの基本舞台（MORNINGは駅のホームへ分化） |

- 1280×720 / 横位置
- **左上の「Ai」ウォーターマークは必ず除去する**（トリミングまたは被せる）

### 2.1.6 文字の制作方式【重要】

**AI生成画像に文字を描かせない。** 文字はCanvaのテキストレイヤーで乗せる。

理由: AI生成の文字は毎回崩れ、位置・書体・サイズを4本で揃えられない。揃わない要素はブランド資産として機能しない。またシリーズ名の追加もできない。

```
① 水彩イラストを「文字なし」で生成
   → プロンプト末尾に必ず  no text, no lettering, no watermark  を入れる
② Canvaで「PLAYLIST」をテキストレイヤー化
   → 青紫系・不透明度65〜75%で水彩に溶け込ませる
   → 位置・書体・サイズを4本で完全固定
③ 直下にシリーズ名を同じ処理で追加
```

### 2.1.5 CTR改善指針【第1期の最優先施策 / 2026-09-20 実測に基づく】

現状CTR: 動画1 = 3.8%（ベースライン） / 動画4 = 1.8%（推薦打ち切りライン割れ）
**目標: 5.5〜6.0%**

既存4本の共通の弱点と、その修正方針:

| # | 現状の問題 | 修正 |
|---|---|---|
| C1 | **人物が小さい引きの構図**（4本すべて） | 人物を**バストアップ〜膝上**まで寄せる。スマホの親指サイズで「誰が何をしているか」が一瞬で分かること |
| C2 | **コントラストが低く全体に淡い**（特に午後・朝） | 明暗差を強める。主役に光を当て、背景を落とす |
| C3 | **「PLAYLIST」だけでは動画間の区別がつかない** | 「PLAYLIST」帯は維持し、**シリーズ名（AFTERNOON等）を追加**。継続視聴者の再訪トリガーになる |
| C4 | **要素が多すぎる**（動画4: 人物2人＋小物＋室内情報） | 主役以外を削る。**被写体1・行為1・情景1**まで削ぎ落とす |

**検証方法**
- Studioに「サムネイルテスト（Test & Compare）」があれば使用する
- 使えない場合: 公開後72時間のCTRを記録 → サムネ差し替え → さらに72時間のCTRを記録して比較
- 結果は `docs/02-analytics-ledger.md` §5 のA/Bテスト記録に必ず残す

**判断ライン**
| CTR | 意味 |
|---|---|
| < 2.0% | 推薦打ち切り。即差し替え |
| 3.5〜4.5% | 現ベースライン。改善余地大 |
| > 5.5% | 推薦が拡大する水準。その構図を全シリーズへ横展開 |

### 2.2 シリーズ別ビジュアル（Inauthentic Content 対策として明確に差別化）
| シリーズ | 舞台 | 人物 | 色温度 |
|---|---|---|---|
| AFTERNOON | 電車内・窓際の光 | 1人・座っている | 明るい / 自然光 |
| NIGHT DRIVE | 車内・都市夜景・ネオン | 1人・運転席 | 青紫 / ネオン |
| MORNING | 駅のホーム・朝の車内 | 1人・読書や外を見る | 淡い水色 / 逆光 |
| MIDNIGHT | 室内・窓辺・間接照明 | 1人 or 無人 | 暖色低照度 |

### 2.3 ルール
| # | ルール |
|---|---|
| A1 | 人物は原則**1人**。4本目（2人・室内）は系統外れで失速した |
| A2 | **視線は必ず画面外**（没入感。こちらを見ない） |
| A3 | 文字は「PLAYLIST」+ シリーズ名のみ。**説明文を入れない** |
| A4 | スマホの親指サイズで判別できるか毎回確認 |
| A5 | 生成プロンプトは §4 の台帳に必ず記録（再現性の担保） |

---

## 3. 概要欄テンプレ

```
[① 毎回書き下ろすコンセプト文 2〜3行。テンプレのコピペ禁止]
例）平日の午後3時、集中力が切れかける時間に。手を止めずにいられる音だけを14曲선んで並べました。

━━━━━━━━━━━━━━━
▸ Tracklist
00:00 Track Name 1
03:12 Track Name 2
...
━━━━━━━━━━━━━━━

▸ このチャンネルについて
時間帯とシーンに合わせた洋楽風プレイリストを週3回お届けしています。
・AFTERNOON … 午後の作業・勉強に
・NIGHT DRIVE … 夜のドライブに
・MORNING … 朝の通学・通勤に
・MIDNIGHT … 眠れない夜に

▸ 楽曲について
このチャンネルの楽曲はすべて、AI作曲ツールを用いて制作したオリジナル楽曲です。
既存アーティストの楽曲は使用していません。

#洋楽 #作業用BGM #勉強用BGM #playlist #lofi
```

> **①のコンセプト文は毎回必ず書き換える。** これが「人が運営している」最大の証拠であり、収益化審査での防御線（`00-strategy.md` §4 D3）。

---

## 4. プロンプト台帳

### 4.1 Suno（作曲）
| シリーズ | ベースプロンプト | 備考 |
|---|---|---|
| AFTERNOON | `warm indie pop, soft female english vocals, mellow electric guitar, relaxed mid-tempo, 85bpm, lo-fi texture` | 要調整 |
| NIGHT DRIVE | `city pop / synthwave, male english vocals, analog synth pads, 100bpm, night drive mood` | 要調整 |
| MORNING | `bright acoustic pop, airy english vocals, clean guitar, 95bpm, fresh morning air` | 要調整 |
| MIDNIGHT | `ambient lofi, whispered english vocals, rhodes piano, 70bpm, late night intimacy` | 要調整 |

### 4.2 Kling（ループ映像）
| シリーズ | プロンプト | 生成日 |
|---|---|---|
| AFTERNOON | `Seamless 8-second loop, woman sitting by a train window in warm afternoon light, subtle breathing motion, hair gently moving, sunlight flickering softly through passing scenery outside the window, no camera movement, cinematic warm tone, loopable` | 未生成（`docs/05-thumbnail-revision.md` §6 案） |
| NIGHT DRIVE | `Seamless 8-second loop, man driving at night, city neon lights softly flickering and streaking past the windshield, subtle hand movement on the steering wheel, no camera movement, moody blue and magenta tone, loopable` | 未生成（`docs/05-thumbnail-revision.md` §6 案） |
| MORNING | `Seamless 8-second loop, man standing on a train station platform at sunrise, soft morning breeze moving his hair and coat slightly, faint light rays shifting, no camera movement, pale blue backlit tone, loopable` | 未生成（`docs/05-thumbnail-revision.md` §6 案） |
| MIDNIGHT | `Seamless 8-second loop, woman standing by a window at night holding a warm mug, gentle steam rising, faint city lights twinkling outside, no camera movement, warm low-light tone, loopable` | 未生成（`docs/05-thumbnail-revision.md` §6 案） |

### 4.3 Canva（サムネ背景）
| シリーズ | 構図メモ | ファイル |
|---|---|---|
| AFTERNOON | バストアップ・電車窓際・斜め45度・暖色ハイコントラスト（推奨A案、`docs/05-thumbnail-revision.md` §2.1） | 未生成（差し替え後に `assets/thumbnails/afternoon_01_v2.png` へ格納予定） |
| NIGHT DRIVE | 現行踏襲＋わずかに寄り・シリーズ名追加のみ（推奨A案、`docs/05-thumbnail-revision.md` §2.2） | 未生成（差し替え後に `assets/thumbnails/nightdrive_01_v2.png` へ格納予定） |
| MORNING | 舞台を駅のホームへ変更・逆光リムライト＋表情視認（推奨B案、`docs/05-thumbnail-revision.md` §2.3） | 未生成（差し替え後に `assets/thumbnails/morning_01_v2.png` へ格納予定） |
| MIDNIGHT | 1人に削減・窓辺でマグカップ・要素最小化（推奨A案、`docs/05-thumbnail-revision.md` §2.4） | 未生成（差し替え後に `assets/thumbnails/midnight_01_v2.png` へ格納予定） |
