# AFTERNOON #02

## 楽曲構成
管理: 鷺沢 奏（music-curator） / 2026-09-21

> 前提: `docs/02-analytics-ledger.md` の平均視聴率・平均視聴時間は AFTERNOON #01 分も含めまだ「?」（未実測）。
> したがって「冒頭3曲全差し替え」「尺40分台への短縮」の閾値ルールは**発動条件を満たしていない**。
> 本設計は標準規格（尺48〜55分・14〜16曲・-16 LUFS統一）どおりの通常設計とする。実測が揃い次第、本章をアップデートする。

---

### ■ シリーズ: AFTERNOON（#02）

### ■ Sunoベースプロンプト（確定版・英語）

`docs/03-packaging-rules.md` §4.1 の暫定案を叩き台に、以下を確定版とする。**AFTERNOONシリーズ共通で以後固定**（#03以降もこれを土台にする）。

**Style（本体）:**
```
warm indie pop, breathy soft female english vocals, mellow clean electric guitar with light chorus,
warm rhodes electric piano, brushed soft drum kit, relaxed mid-tempo groove, 72-88bpm,
warm analog lo-fi texture, subtle tape saturation, faint vinyl crackle, intimate close-mic vocal tone,
smooth even dynamics, cozy sunlit afternoon mood, unhurried pacing
```

**Exclude style（Sunoの除外指定欄があれば併用）:**
```
shouting, belting, distorted vocals, harsh cymbals, loud chorus drops, sudden tempo change,
aggressive drums, EDM build-up, screaming, heavy distortion
```

暫定案からの変更点と理由:
| 変更 | 理由 |
|---|---|
| `85bpm` 固定 → `72-88bpm` の幅指定 | 曲順で「つかみ→背景→余韻」に沿ってテンポを緩やかに落とす設計にするため。隣接曲の差は±10bpm以内を厳守（後述の楽曲リストで検証済み） |
| `rhodes electric piano` `brushed soft drum kit` を明記 | ギター1本に依存すると曲間の差が付けにくい。鍵盤とドラムの質感を先に固定し、差分プロンプトで楽器の比率だけ動かせるようにする |
| `tape saturation` `faint vinyl crackle` を追加 | 作業用BGMとして耳に刺さらない帯域に寄せる。-16 LUFS統一時に高域が刺さると体感音量が揃わないため、ミックスの温度感を先に丸めておく |
| `smooth even dynamics` を追加 | Suno側で自然にダイナミクスレンジを抑えさせ、後工程の-16 LUFS正規化を楽にする（急激な音圧の山があるとラウドネス正規化後に「うるさい部分」が残る） |
| Exclude style欄を新設 | 「聴かせる曲」が中盤に紛れ込む最大要因はサビの盛り上がり・シャウト系ボーカル。生成段階で弾く |

> `docs/03-packaging-rules.md` §4.1 のAFTERNOON行「要調整」を本確定版で更新済み（後述）。

---

### ■ 楽曲リスト（15曲）

生成方針: SOP工程②に従い **21〜22曲生成 → 採用15曲（約7割）**。下記は採用後の確定リスト。差分は楽器と情景のみで、ベースプロンプトの世界観（電車・午後の陽光）は崩さない。3曲のみ意図的にインストゥルメンタル（ボーカル無し）にして、中盤の「背景」に徹させつつシリーズ内の反復感を薄める。

| # | 曲名(英) | 差分プロンプト | 想定尺 | 役割 |
|---|---|---|---|---|
| 1 | Golden Hour Window | 88bpm, bright melodic guitar hook, light shaker percussion, sun-drenched train window scene, uplifting but relaxed, clearest vocal hook of the set | 3:25 | つかみ |
| 2 | Slow Train Afternoon | 86bpm, warm rhodes chords under guitar, soft harmonized backing vocals, scenery of passing suburban rooftops, medium-bright energy | 3:25 | つかみ |
| 3 | Paper and Sunlight | 84bpm, muted guitar strums, soft brushed drums, gentle bassline, notebook pages fluttering by an open window, mood eases toward background | 3:20 | つかみ（背景への橋渡し） |
| 4 | Quiet Static Hum | 80bpm, instrumental only / no vocals, soft rhodes lead, minimal guitar, warm tape hiss, deliberately unobtrusive | 3:10 | 背景 |
| 5 | Half-Read Chapter | 82bpm, vocals low in the mix, gentle fingerpicked guitar, library corner with dust in the light, understated melody | 3:25 | 背景 |
| 6 | Faint Blue Curtains | 82bpm, warm electric piano pad, breathy vocals, subtle brushed percussion, curtains swaying by a desk, minimal dynamic range | 3:20 | 背景 |
| 7 | Long Afternoon Stretch | 80bpm, sparse guitar comping, soft wordless humming instead of lyrics, quiet café table, steady unchanging groove | 3:15 | 背景 |
| 8 | Warm Tape Interlude | 78bpm, instrumental only / no vocals, rhodes + light vinyl crackle, ambient guitar swells, dust motes in afternoon light | 3:05 | 背景 |
| 9 | Second Cup | 80bpm, gentle vocals, warm clean guitar arpeggio, soft brushed drums, coffee cup cooling by the window, calm and steady | 3:30 | 背景 |
| 10 | Notebook Margins | 80bpm, soft vocals, mellow guitar chords, subtle rhodes, handwriting in notebook margins, unobtrusive backdrop mood | 3:20 | 背景 |
| 11 | Drifting Dust Light | 78bpm, instrumental only / no vocals, slow guitar melody, warm pad textures, dust particles drifting in a sunbeam, spacious and minimal | 3:10 | 背景 |
| 12 | Low Hum of the Afternoon | 78bpm, soft vocals with gentle reverb, sparse guitar, subtle rhodes, train slowing at a quiet station, tempo eases downward | 3:25 | 背景（余韻への橋渡し） |
| 13 | Fading Platform Light | 76bpm, soft vocals, mellow guitar with light delay, gentle fade-in/fade-out dynamics, platform lights dimming as afternoon turns to dusk | 3:20 | 余韻 |
| 14 | Almost Evening | 74bpm, sparse instrumentation, quiet vocals, slow guitar fingerpicking, warm rhodes pad sustain, orange light fading behind rooftops | 3:15 | 余韻 |
| 15 | Last Light, Quiet Train | 72bpm, instrumental outro with soft wordless vocal hum at the very end, slow fingerpicked guitar solo, gentle fade to silence, empty train carriage at dusk — a clear sense of ending | 3:30 | 余韻・締め |

隣接曲のテンポ差はすべて±10bpm以内（最大差4bpm、多くは0〜2bpm）。88→72bpmまで全編を通して緩やかに下降させ、ボーカル質感（すべて同一の女性ボーカル、または無音ボーカルのインスト）が急変しないよう統一。

---

### ■ 曲順の意図（3行）

1. 冒頭3曲（#1〜#3）に生成候補中もっとも完成度の高い曲を配置し、フックの強さを段階的に落として「つかみ→背景」へ滑らかに移行させる。長尺BGMの離脱は冒頭3分に集中するため、ここで妥協しない。
2. 中盤（#4〜#12）は意図的に起伏を作らない。3曲をインストゥルメンタルにして「聴かせる曲」が紛れ込むリスクを構造的に排除し、テンポも80bpm前後でほぼ横ばいに保つ＝作業の邪魔をしない。
3. 終盤（#13〜#15）でテンポを76→72bpmまで下げ、#15を明確な「終わる曲」（フェードアウト＋余韻の残るギターソロ）にして次の動画（次エピソード or 関連動画）への送り出しを作る。

---

### ■ 整音指示

全曲共通ゴール: **-16 LUFS 統一 / クロスフェード2〜3秒 / 無音ゼロ**。PC作業日（SOP §3の「月＝作曲デー」「火木土＝音声結合日」）にバッチでまとめて行う想定。

#### A. Audacity版（PCが使える日・推奨）

1. Sunoから書き出した15曲のwavを1つのプロジェクトフォルダに集める（ファイル名を `01_Golden Hour Window.wav` のように曲順番号つきにしておく＝結合順の事故防止）
2. Audacityで15トラックをこの順番で読み込む（ファイル→読み込み→オーディオ、を15回）
3. 各トラックを選択し、`エフェクト → ラウドネス正規化` を適用。ターゲットを **-16 LUFS** に設定し、15曲すべてに同じ値で実行（曲ごとに数値を変えない）
4. 波形を見て曲の先頭・末尾に不要な無音やクリックノイズがあれば軽くトリミング
5. 各曲の末尾と次曲の先頭を2〜3秒分重ねて配置し、重なり部分を選択して `エフェクト → フェードアウト`（前の曲側）と `エフェクト → フェードイン`（次の曲側）を適用してクロスフェードを作る。15曲分（14箇所の継ぎ目）繰り返す
6. 全トラックをミックスダウン（`トラック → ミックス → ミックスして作成`）して1本の音声にする
7. 書き出し前に `エフェクト → ラウドネス正規化` をもう一度、結合後の1本全体に軽くかけて全体のピークが揃っているか確認（曲ごとの正規化だけだとクロスフェード部分でわずかにズレることがある）
8. `ファイル → 書き出し → WAV(またはMP3)で書き出し` で1本のマスター音声として保存。このときの経過秒数（各曲の開始位置）を必ずメモする＝タイムスタンプの元データ
9. 書き出し後、ランダムに3か所（冒頭・中盤・終盤）を再生して曲間の音量差・無音がないか耳で最終確認（SOP §4 品質チェックリスト）

#### B. CapCut版（スマホ完結・PCが使えない週の代替）

CapCutにはAudacityのような数値でのLUFS正規化機能がない（バージョンによって「音量最適化」的な自動調整はあるが基準値が不明瞭）。**精度はAudacity版に劣る**前提で、以下の手順で近似する。

1. 15曲の音声ファイルをCapCutに素材として取り込む
2. オーディオトラックに曲順どおり配置する（動画トラックとは別レーンでOK）
3. 各クリップの波形をCapCutの表示で見比べ、明らかに音量の大小がある曲を探す（波形の振れ幅が他曲より明確に大きい/小さい曲）
4. 各クリップを選択 →「音量」で手動調整。基準は**#1（Golden Hour Window）の波形の振れ幅**を基準クリップとし、他14曲をそこに揃える形で±dBを耳と波形の両方で合わせる
5. CapCutに「オーディオ抽出→自動音量」系の機能がある場合は各クリップに適用し、そのうえで手順4の手動微調整を必ず重ねる（自動任せにしない）
6. 曲と曲の間を2〜3秒重ねて配置し、重なり部分でクリップ端の「フェードイン/フェードアウト」ハンドルをドラッグしてクロスフェードを作る。14箇所すべてに適用
7. 全体を再生し、3か所（冒頭・中盤・終盤）をイヤホンで聴き比べて「ここだけ急に大きい/小さい」がないか確認。あれば手順4に戻って再調整
8. 可能であれば無料のLUFSメーター系アプリ（スマホの音量測定アプリ等）でマスター書き出し後の音声を数か所計測し、-16 LUFS付近から大きく外れていないか簡易チェックする

**推奨: Audacity版を基本とする。** CapCut版は「数値で合わせる」ができず耳合わせに依存するため、曲間の音量差＝最大の離脱要因を潰しきれないリスクが残る。SOP §3の週次スケジュールどおり、音声結合はPCが使える日にまとめてAudacityで処理し、CapCutは映像・書き出し工程に専念させる運用を推奨する。

---

### ■ 想定トータル尺: **49分55秒**（標準規格48〜55分・目標50分前後の中心に一致）

---

### ■ 概要欄用タイムスタンプ表

```
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
```

> 上記はSuno想定尺（3:00〜3:30）からの逆算値。実際の書き出し尺と最大で数秒〜十数秒ずれる可能性があるため、Audacity/CapCutでの結合完了後に実測タイムスタンプへ差し替えること（SOP工程③「タイムスタンプをメモする」）。
