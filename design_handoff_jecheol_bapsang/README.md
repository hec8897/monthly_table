# Handoff: 제철밥상 (Seasonal Table) — Mobile App MVP

## Overview
An iOS/Android app that shows **8 seasonal ingredients for the selected month**. Tapping an ingredient goes straight to recipe videos made with it (YouTube Shorts / long-form). Core value: answer "what should I buy and cook right now?" within **2–3 taps**.
- Target users: people in their 20s–40s living alone, newlyweds, beginner cooks
- Portrait only, base frame **390 × 844** (iPhone 14/15 class)
- UI language: Korean

## About the Design Files
The HTML files in this bundle are **design references** (prototypes that show intended structure and behavior), not production code. Recreate them in the target codebase's environment (React Native / Flutter / SwiftUI + Compose, etc.) using its existing patterns and libraries. If no environment exists yet, React Native (Expo) or Flutter is a reasonable choice.

## Fidelity
**Low-fidelity (wireframe).** Layout, flow, hierarchy and states are final. Colors, type and icons must follow the **Wanted Design System (Montage)**.
- Figma: https://www.figma.com/community/file/1355516515676178246/wanted-design-system
- Docs: https://montage.wanted.co.kr
- The token values in the wireframes are approximations of Wanted Foundation. **Official file values take precedence.**
- In the wireframes, icons are text glyphs (‹ ♡ ♥ ✕ ▾) and squares, and images are striped placeholders. Replace them with the Wanted icon set and real images.

**Final flow to implement = Section 2 (2a–2h)** in `제철밥상 Wireframes.dc.html`. Section 1 (1a–1m) is reference material: early explorations, alternatives, and state screens.

---

## Information Architecture
Bottom tabs (2): **Home / 저장함 (Saved)**
```
Home (2a) ──tap ingredient──▶ Ingredient detail (2b) ──Shorts──▶ Shorts player (2d, fullscreen)
  │                              ├─Long-form──▶ Long-form player (2c, bottom sheet)
  │                              ├─Shorts "See all"──▶ 2f
  │                              └─Long-form "See all"──▶ 2g
  └─"10월의 제철 ▾"──▶ Month picker sheet (2h)
Saved (2e) ──Shorts item──▶ 2d / Long-form item──▶ 2c
```
The tab bar is shown only on the two tab roots (Home, Saved). It is hidden on pushed screens (detail, See all) and players.

---

## Screens

Common rules
- Status bar 47px; bottom tab bar 84px (49 + 34 safe area). Respect the home indicator safe area.
- Horizontal screen padding **20px**. Spacing in **multiples of 4**.
- Top navigation bar 52px: 3-column grid `52px / 1fr / 52px`. Back button 44×44 on the left, centered title Headline 17/600.
- All touch targets **at least 44×44**.

### 2a. Home — one-column list
- **Purpose**: see this month's 8 ingredients at a glance and pick one (tap 1)
- **Header** (padding 16 20 0, gap 4)
  - Month label `10월의 제철 ▾`: Label 1 14/600/20, Primary Normal. **Tap → 2h.** The month follows the current/selected month.
  - Title `지금 가장 맛있는 재료`: Title 3 24/700/32, letter-spacing −0.6px
  - Gap from header to list: 16
- **Ingredient rows** × 8 (vertical, row padding 6px 0, gap 14, align center)
  - Thumbnail 64×64, radius 12, light fill (Fill Normal) background + ingredient image
  - Name: 17/600/24, Label Normal
  - Description: Label 1 14/500/20, Label Alternative, **1-line ellipsis**
  - Right chevron › in Label Assistive
  - Pressed: background shifts one step (Fill Normal). **No size change.**
  - All 8 rows must fit on one screen without scrolling (at 390×844)
- When viewing another month, show an "이번 달로" (back to this month) text button next to the month label

Sample data (October):
| Name | Description |
|---|---|
| 전어 | 고소한 기름이 오르는 가을 생선 |
| 대하 | 쫄깃하고 달큰한 가을 새우 |
| 감 | 달콤함이 절정인 가을 과일 |
| 배 | 시원하고 아삭한 수분 가득 |
| 단호박 | 포슬포슬 달콤한 가을 채소 |
| 고구마 | 구워도 쪄도 맛있는 간식 |
| 표고버섯 | 향이 진한 가을 버섯 |
| 무 | 단맛이 오른 가을 무 |

### 2b. Ingredient detail — section layout (tap 2 goes straight to playback)
- Entry: slides in from the right. Nav title = ingredient name.
- **Compact hero** (padding 0 20, gap 16, align center)
  - Image 96×96 radius 12
  - Name: Title 3 24/700/32
  - Description: 14/400/20, Label Alternative
  - Season chip `9월 ~ 11월 제철`: padding 4 8, radius 8, Primary bg (Blue 95 #EAF2FE) + Primary Normal text, Caption 12/600
- Gap between sections: 24
- **Shorts section**
  - Header row: `쇼츠` Heading 2 20/600/28 + right `전체보기` (See all) Label 1 14/500, Label Alternative → **2f**
  - Horizontal scroll carousel: cards 132px wide, **9:16**, radius 12, gap 12, left/right inset 20
  - Card: bottom gradient (transparent → black 60%) over the image, title in white 13/600/18, **2-line ellipsis**
  - Top-right heart button 44×44 (white outline glyph)
  - Tap card → **2d**
- **Long-form section** (padding 0 20)
  - Header row: `롱폼` + `전체보기` → **2g**
  - Rows: thumbnail 144px wide 16:9 radius 10 + right column (title 15/600/21 2-line ellipsis, channel name Caption 1 12/500/16 Label Alternative) + heart 44×44
  - Duration badge at bottom-right of thumbnail: semi-transparent black (60%) bg, white 11/500, padding 1 5, radius 4
  - Tap row → **2c**

### 2c. Long-form player — bottom sheet
- Slides up from the bottom, **250ms ease-out**. The page behind (2b) is dimmed (Dimmer, roughly black 52%).
- Sheet top offset 56px, top radius 16. Grabber 36×5, centered in a 28px-high area.
- **16:9 YouTube embed player** (full width)
- Info area padding 20, gap 16
  - Title: Headline 1 18/600/26, letter-spacing −0.2
  - Channel name: Caption 1 12/500/16, Label Alternative
  - Action row (gap 8):
    - Save button: height 40, padding 0 14, radius 10, 1px Line Normal border. Heart + `저장됨` (saved) 14/600. When saved, the heart is filled Negative red.
    - Text button `YouTube에서 열기 ↗` (open in YouTube): Primary Normal 14/600. Opens the YouTube app or the browser.
- Close: drag the grabber down / tap the dimmed area. Closing returns to 2b with its scroll position kept.

### 2d. Shorts player — fullscreen
- Opens as a fullscreen sheet from the bottom. Black background, 9:16 YouTube Shorts embed.
- Top-left close ✕ 44×44 (white)
- Bottom overlay: gradient (transparent → black 70%), padding 80 20 42
  - Title 16/600/24 white, 2-line ellipsis
  - Channel 12/500/16, white at 80% opacity
  - Right column: heart button 44×44 circle (white 16% bg) + `저장` (save) caption 12/500
- Gestures: swipe down / ✕ → back to 2b. Swipe up → next short for the same ingredient (proposal).
- On save, the heart does a short scale bounce (the only allowed exception to the no-size-change rule)

### 2e. Saved
- Header: `저장한 레시피` (saved recipes) Title 3 + count `4개` Caption 1 12/500, Label Alternative (baseline-aligned, gap 8)
- **Filter chips** `전체 | 쇼츠 | 롱폼` (All / Shorts / Long-form): single select, height 36, padding 0 14, radius 18, gap 8
  - Selected: Primary Normal bg + white 14/600
  - Unselected: 1px Line Normal border + Label Neutral 14/500
- List (most recently saved first), row padding 10 0, gap 14
  - Thumbnail 96×96 radius 12, square crop. Bottom-left type badge (`쇼츠`/`롱폼`): black 60% bg, white 11/500, padding 2 6, radius 4
  - Title 16/600/22, 2-line ellipsis
  - Meta row (gap 6): ingredient tag chip (e.g. `전어`: Fill Normal bg, 12/500, padding 2 8, radius 6) + channel name Caption 1 Label Alternative
  - Right: filled heart (Negative red), 44×44
- Tap item → shorts open 2d, long-form opens 2c
- **Heart tap = unsave** → remove the item from the list immediately + toast (see 1k)
- **Empty state** (see 1g): filter chips hidden. 120px illustration + `아직 저장한 레시피가 없어요` (no saved recipes yet) 18/600 + `마음에 드는 영상에 하트를 눌러 모아보세요` (tap the heart on videos you like to collect them) 14/400 Label Alternative + Primary button `제철 재료 보러 가기` (browse seasonal ingredients; height 48, radius 12, 16/600) → switches to the Home tab

### 2f. Shorts — See all
- Nav title `{재료} 쇼츠` (e.g. 전어 쇼츠). Below: video count `영상 6개` (6 videos) Caption 1, Label Alternative.
- **Two-column 9:16 grid**, gap 12. Use `repeat(2, minmax(0,1fr))` so long titles don't break the column widths.
- Card: radius 12, bottom gradient + white title 14/600/20 (2 lines), top-right heart 44×44
- Tap → 2d

### 2g. Long-form — See all
- Nav title `{재료} 롱폼` (e.g. 전어 롱폼). Count `영상 5개` (5 videos).
- **One-column 16:9** cards, gap 24 between cards
  - Thumbnail radius 12, duration badge at bottom-right (12/500, padding 2 6, radius 4)
  - Below (gap 12): title 16/600/24 2-line ellipsis + channel name Caption 1 + right heart 44×44
- Tap → 2c

### 2h. Month picker — bottom sheet
- Trigger: tap the Home month label `10월의 제철 ▾`
- Sheet: top radius 16, padding 0 20 42 (includes the safe area), gap 20, grabber 36×5
- Title `어느 달의 제철을 볼까요?` (which month's seasonal ingredients?) Heading 2 20/600/28. Subtext `달마다 제철 재료 8가지를 보여드려요` (8 seasonal ingredients for each month) 14/400 Label Alternative.
- **4×3 grid of months 1–12**, gap 8, cells 52px tall, radius 12
  - Default: Fill Alternative bg (very light), 15/500, Label Neutral
  - Selected: Primary bg (Blue 95) + inset 1.5px Primary Normal line + Primary text 15/600
  - The current month shows an extra `이번 달` (this month) caption 10/500 inside its cell
- Tapping a month closes the sheet immediately. The Home list is replaced with a **150ms fade**. The month label updates (e.g. `7월의 제철 ▾`).

---

## State screens (Section 1 references)
| State | Reference | Details |
|---|---|---|
| Home loading | 1h | Header shows immediately. Only the list area is skeletons (8 rows), Fill Normal |
| Home error | 1i | Circular "!" icon 48 + `재료를 불러오지 못했어요` (couldn't load ingredients) 18/600 + `네트워크 연결을 확인하고 다시 시도해 주세요` (check your connection and try again) 14/400 + **Secondary (outline)** button `다시 시도` (try again), height 40 radius 10 |
| Detail empty | 1j | Per section/tab: `아직 준비된 영상이 없어요` (no videos yet) 16/600 + helper text. If one side is empty, hide that section in 2b |
| Detail loading | — | Same layout as 2b, as skeletons |
| Saved empty | 1g | See 2e |
| Unsave toast | 1k | Floats 16px above the tab bar (bottom 100). Height 52, radius 12, dark bg (Inverse Background ~ #171719 at 90%). `저장이 해제됐어요` (removed from saved) 14/500 white + `실행 취소` (undo) action 14/600 (Inverse Primary). Shown for 4s. Undo restores the item to its original position |

---

## Interactions & Motion
- Motion follows Wanted rules: **150–300ms, ease-out**
- Home → detail / See all: slide in from the right (~250ms)
- Players: bottom sheet slides up (~250ms). Shorts is fullscreen.
- Tab switch and month change: content fade 150ms
- Pressed state: **background shifts one step with no size change** (Primary: Normal → Strong #005EEB → Heavy #0054D1)
- Heart save: short scale bounce (1 → 1.2 → 1, ~200ms) + filled red. Unsave: fill → outline.
- Long Korean titles: 2-line ellipsis (`-webkit-line-clamp: 2` or the platform equivalent)

## State Management
```
selectedMonth: 1–12            // default = current month
ingredients[selectedMonth]: Ingredient[8]
ingredientDetail[id]: { shorts: Video[], longs: Video[] }
savedVideos: SavedVideo[]       // most recently saved first, stored locally (AsyncStorage etc.) — no login
savedFilter: 'all' | 'shorts' | 'long'
player: { open: boolean, video: Video | null }
toast: { visible, lastRemoved: { video, index } | null }   // for undo
loading / error per request
```
Data types
```
Ingredient { id, name, desc, seasonStart, seasonEnd, imageUrl }
Video { id, youtubeId, type: 'shorts'|'long', title, channel, duration?, thumbnailUrl, ingredientId }
SavedVideo = Video & { ingredientName, savedAt }
```
- Data source: monthly ingredients can be static JSON. Videos can be a curated list or the YouTube Data API (search by ingredient name + "레시피", plus a Shorts filter).
- Playback: YouTube IFrame embed (in-app WebView or `react-native-youtube-iframe` etc.)

## Design Tokens (Wanted Foundation, Light theme)
Use **semantic tokens only**. Never hard-code hex values in code. The values below are what the wireframes used — check the official file.

Colors
| Semantic | Approx. value | Usage |
|---|---|---|
| Primary Normal | #0066FF (Blue 50) | Active tab, selected chip, CTA, month label |
| Primary Strong | #005EEB (Blue 45) | Pressed |
| Primary Heavy | #0054D1 (Blue 40) | Pressed (strong) |
| Primary bg (Blue 95) | #EAF2FE | Season chip, selected month, active tab icon bg |
| Background Normal | #FFFFFF | Screen background |
| Fill Normal / Alternative | ≈ #F4F4F5 / #F7F7F8 | Image areas, skeletons, tag chips, month cells |
| Label Normal | #171719 | Titles |
| Label Neutral | rgba(46,47,51,.88) | Unselected chips |
| Label Alternative | rgba(55,56,60,.61) | Helper text, channel names |
| Label Assistive | rgba(55,56,60,.28) | Chevrons, outline hearts |
| Line Normal | rgba(112,115,124,.22) | Outline buttons, chip borders |
| Line Alternative | rgba(112,115,124,.16) | Tab bar top line |
| Status Negative | #FF4242 | Filled saved heart |
| Inverse Background / Primary | dark gray / light blue | Toast |
| Dimmer | black ~52% | Behind sheets |

Typography (Pretendard JP; optionally Wanted Sans for large brand titles only)
| Token | Size/Weight/Line height | Usage |
|---|---|---|
| Title 3 | 24/700/32, tracking −0.6 | Screen titles, ingredient name (detail) |
| Heading 2 | 20/600/28 | Section headers, sheet title |
| Headline 1 | 18/600/26 | Player title, empty-state title |
| Headline 2 | 17/600/24 | Nav title, ingredient name in home list |
| Body 1 | 16/400·600/24 | Body text, video titles |
| Label 1 | 14/500·600/20 | Helper text, chips, buttons |
| Caption 1 | 12/500/16 | Channel name, duration, counts |
| Caption 2 | 11/500/14 | Tab label, type badge |
Rule: tighten letter-spacing on large text, loosen it on small text.

Radius: cards/inputs/large buttons **12**, small buttons **8–10**, sheets 16 (top), pill chips 18 (height/2), badges 4–6
Shadow: 1px inner line + a very light shadow at most (e.g. segmented knob `0 1px 2px rgba(0,0,0,.08)`, toast `0 4px 12px rgba(0,0,0,.12)`). No heavy outlines or shadows.
Spacing: 4px base — 4 / 8 / 12 / 16 / 20 / 24. Screen padding 20, card gap 12.

## Components
Reuse from Wanted: Button (Primary / Secondary-outline / Text), Chip (filter, tag), Bottom Navigation, Top Navigation, Bottom Sheet, Toast, Skeleton, Empty State, Icon
New (built with Wanted tokens):
- **IngredientRow** — variants: default / pressed / skeleton
- **ShortsCard** — sizes: carousel (132w) / grid (1/2 column) × heart: off / on
- **LongCard** — variants: row (144w thumbnail, inside 2b) / full (16:9 full width, in 2g) × heart: off / on
- **SavedItem** — type: shorts / long, with a type badge
- **HeartButton** — off (outline, Label Assistive) / on (filled Negative) / on-dark (white outline, over images) — 44×44
- **MonthGrid** — cell: default / selected / current (with the "이번 달" caption)
- **SeasonChip** — Primary bg + Primary text

## Assets
- Ingredient images: not yet provided. Photos or flat illustrations. Seasonality comes through the images; the UI chrome stays neutral.
- Video thumbnails: YouTube thumbnails (`i.ytimg.com/vi/{id}/hqdefault.jpg`, etc.)
- Icons: Wanted icon set (back, heart / heart-fill, close, chevron-right, chevron-down, home, bookmark/saved, external-link, alert)
- Empty-state illustration: not yet provided
- App icon: out of scope for this handoff (still to be designed)

## Out of Scope
Login/sign-up, fridge ingredient management, search, dark mode, notification settings

## Files
- `제철밥상 Wireframes.dc.html` — all wireframes. Open it in a browser and pan/zoom.
  - Section 2 (2a–2h): **final flow**
  - Section 1 (1a–1m): early flow, state screens (1g 1h 1i 1j 1k), alternatives
- `support.js` — runtime for the HTML above (only needed for viewing)
