# DESIGN.md

How this site looks and feels. Read this before you build or change a page, so every page matches.

Last updated: 2026-11-02 (jobsite pieces added)

## The feel

A jobsite safety tag, not a tech startup. Bold, clear and plain. One red accent, like the red band on an A2L cylinder. Lots of white space and short lines. It has to be easy to read on a phone in a mechanical room, in bright sun, or at night.

What we avoid:
- Gradients, glows, stock photos and fake 3D.
- Purple-and-blue "AI" colors.
- Long walls of text. If a paragraph is over 4 lines on a phone, cut it or add a drawing.
- Real job photos from the employer (see CLAUDE.md "Keep out"). Draw it instead.

## Colors

Every page sets these on `:root` and swaps them for dark mode. Use the token, never a raw color.

| Token | Light | Dark | Use it for |
|---|---|---|---|
| `--bg` | `#f4f5f5` | `#15191b` | Page background |
| `--paper` | `#ffffff` | `#1c2225` | Cards and boxes |
| `--fg` | `#1d2326` | `#e6e9eb` | Main text |
| `--muted` | `#5b666c` | `#9ba6ac` | Small print, labels |
| `--line` | `#d6dbde` | `#323b40` | Borders, dividers |
| `--band` | `#c8322b` | `#e2564e` | The red accent: top band, buttons, links underline, CHECK tags, warnings |
| `--tint` | `#fbecea` | `#33201f` | Light red background for warnings and stories |
| `--good` | `#1f7a4a` | `#5fcf8f` | Right answers, "holding", OK |
| `--goodtint` | `#e3f3ea` | `#183026` | Light green background |
| `--amber` | `#9a5b00` | `#f0b45a` | Caution, "check this" (use sparingly) |

Dark mode pattern (copy it as is):

```css
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){ /* dark tokens */ color-scheme:dark}}
:root[data-theme="dark"]{ /* same dark tokens */ color-scheme:dark}
```

Red means "pay attention". Don't use it for decoration. Green means right or safe.

Note: the quiz page uses a slightly older set (`--card`, `--soft`, `--pick`, `--flame`, `--bad`). Bring it onto this set the next time the quiz gets a big change.

## Fonts

Loaded from Google Fonts in each page head.

| Token | Font | Use it for |
|---|---|---|
| `--display` | Barlow Condensed 600/700 | Headings, buttons, menu. Always UPPERCASE with a little letter spacing. |
| `--body` | IBM Plex Sans 400/600 | Everything you read. 17px, line height 1.6. |
| `--mono` | IBM Plex Mono 500 | Numbers, pressures, dates, the small "by" line, CHECK tags. |

Sizes:
- `h1`: `clamp(2.2rem, 8vw, 3.2rem)`, line height .98
- `h2`: 1.45rem, with a numbered red square (`<span class="n">1</span>`) in lessons
- Small print: .85 to .92rem in `--muted`

## Layout

- One column, max 680px wide, centered. Side padding 16px (plus the phone's safe area).
- `article` is a flex column with 16px gap. Don't add margins between sections; the gap does it.
- Every page starts with the red `.band` bar, then a small mono `.by` line, then the `h1`.
- Must work at 400px wide with no sideways scroll. Two-column grids are fine at 400px; three only for short numbers.
- Tap targets at least 44px tall.
- Corners: 6px on boxes, 8px on buttons and inputs, 10px on big cards.

## Pieces we reuse

| Piece | What it looks like | Where |
|---|---|---|
| `.band` | 10px red bar at the top | Every page |
| `.site-nav` | Sticky menu, uppercase, red underline on the current page | `assets/nav.css`, every page |
| `.box` | White card, thin border | Lessons, tools |
| `.story` | Red left border, italic. A field story in my voice. | Lessons |
| `.check` | Small red mono tag "CHECK" for facts not yet confirmed | Anywhere. Also list it in CHECKS.md. |
| `.why` | Small muted text under an answer | Quiz, lessons |
| `.steps` | Numbered cards in a 2-column grid | Lessons |
| Tool tiles | 2-column grid of cards with an emoji, title, one line | Home page "Free tools" |
| Verdict box | Green (good), red (bad) or amber (warn) block with a big uppercase word | Nitrogen log |

## Jobsite pieces (home page, 2026-11-02)

These make the site feel like a tech built it, not a template. Reuse them; don't add generic cards.

| Piece | What it is |
|---|---|
| `.scene` | Dark pegboard wall and diamond-plate floor with drawn tools you tap (gauge set, tank on a scale, N2 cylinder). Needles sweep in, the scale LCD counts up. Always dark, in both modes. |
| `.panel` | Instrument panel: green LCD readouts for numbers (IBM Plex Mono, `#7cfc9a` on `#0c1a11`) |
| `.hazard` | Yellow and black hazard tape. Only as the edge under a scene, once per page. |
| Hang tags | Cards with a red edge and a punched hole, tilted a hair. Use for short "why" points. |
| Line icons | Small drawn icons in the red accent (gauge, clipboard, cylinder, scale). No emoji for tools. |
| Lesson header `.lhero` | Pegboard banner with title, LCD "01/05 lesson" and "08 min", a drawing of the lesson's tool, hazard tape along the bottom. Shared in `assets/jobsite.css`. |
| Reading gauge | Small pressure gauge, bottom right. Needle climbs as you read; tap it to jump to the quiz. Added by `assets/jobsite.js` on any page with an `a.go` link. |
| LCD section numbers | `h2 .n` shows as a green LCD readout |
| Work ticket | Warm-up box: dark header strip, "Not scored", torn-edge bottom |
| Pegboard board | Course map: lessons hang as tags on hooks. Live = red edge; coming soon = gray. |
| LCD meter | Cheat sheet "Numbers to know": each number on a green LCD in a dark panel. CHECK tags turn yellow there. |
| Status lights | Glowing LEDs (green on, red off, amber open) for what equipment does, like the RDS trip |
| Safety tags | Do / Don't as green SAFETY FIRST and red DANGER tags with a punched hole |
| Timeline | Dates on a red line with LCD date chips |
| Cylinder chips | Refrigerant names as little cylinders; red top = flammable |

## Video hero (home page, 2026-11-03)

The home page headline sits on a short looping video (`.vhero`), the one exception to "no stock photos". Rules for it:

- Made-up AI scene only (Higgsfield), never a real job. No words, numbers or screens in the shot: AI scrambles them.
- Current clip: A2L vapor creeping low along a dark mechanical room floor, a gloved tech with a leak probe, amber light.
- Files in `assets/video/`: `hero.webm` and `hero.mp4` (muted, about 4 s seamless loop, 960 wide, under 200 KB each) and `hero-poster.jpg`.
- Always dark in both modes, with a dark fade so the white headline pops.
- Plays only on screen. Reduced motion or data saver shows the still poster instead.

## Drawings

- Inline SVG, drawn for this site. No copied manufacturer art.
- Use theme classes so they flip in dark mode: `svg text{fill:var(--fg)}`, `.mut`, `.red`, `.ok`, `.amb`, `.body`.
- Made-up values only (model, serial, charge). Label them as examples.
- Things you can tap are `<g role="button" tabindex="0">` with a keyboard handler.
- Give every drawing an `aria-label` or a caption that says what it shows.

## Motion and 3D (updated 2026-11-02)

Shameen wants the site to feel alive. Every page loads `assets/motion.css` and `assets/motion.js`.

- Cards flip up into place in 3D as you scroll (only things below the first screen).
- Cards tilt toward the mouse on a computer, and press in when you tap them on a phone.
- Red buttons are chunky and push down when tapped.
- The home scene moves in layers (wall vs tools) with the mouse or phone tilt. The gauges wobble and the N2 tank puffs.
- Lesson header drawings sway like they hang on a hook. LCDs flicker on. Hazard tape crawls.
- Keep it quick (under 0.8s) and never block reading. The quiz page skips the scroll reveal (`data-no-reveal` on body).
- Scroll: a thin green-to-red pressure bar along the top fills as you read. Headings slide in and their LCD number pops. Line drawings draw themselves when they come into view. The lesson header wall drifts slower than the page. On the home page, the gauge needles move as you scroll (low side pulls down, high side climbs).
- All of it turns off with `prefers-reduced-motion`.

## Writing

- First person, my voice: "I check the nameplate first."
- Short sentences. One idea per paragraph.
- Name the real mistake techs make, and why.
- Put a date on any rule.

## Lesson page order

1. Warm-up: 3 quick guesses, not scored
2. Field story
3. Short sections, each with a drawing or a game
4. Explain it back in your own words
5. Lesson quiz link: `quiz/?topics=...`

## Before you publish

- [ ] Check it at 400px wide, in light and dark mode
- [ ] No sideways scroll, no console errors
- [ ] Every `hidden` element really hides (add `[hidden]{display:none}` if a class sets `display`)
- [ ] All links work
- [ ] New unconfirmed facts are tagged CHECK and listed in CHECKS.md
- [ ] Nothing from the employer
