# A2L Course

Shameen's own HVAC education site. Shameen is an HVAC service tech with about 20 years in the field, a journeyman license, EPA 608 Universal, and an ESCO proctor. This site starts with A2L refrigerants and will grow into a training platform for techs, trade programs and community colleges.

Shameen is learning to build with Claude. Explain each step in plain words, keep messages short (Shameen reads on a phone), and say what you changed and how to see it.

## What's here

- `index.html`: "A2L Refrigerants Explained for Techs", the public guide page, written in Shameen's voice. It has a meta description and FAQ schema so search engines and AI answers can find it.
- `quiz/index.html`: A2L practice exam with Practice and Exam modes, an optional timer, explanations, a score by topic, and retrying missed questions.
- `quiz/questions.js`: the question bank. `T` holds the topics; `Q` holds the questions (`t` topic, `q` question, `o` 4 options, `a` index of the right option, `e` explanation, `f:1` to show a CHECK flag).

The site is plain HTML, CSS and JavaScript with no build step. Keep it that way until there's a real need, such as logins.

## Rules

- **Keep out:** anything from Shameen's employer, including customer, building and site names, unit tags, serial numbers, work orders, coworker names, and company forms or photos.
- **No copied course material:** don't copy ESCO or any other publisher's questions, text, or manufacturer manual pages. Write original questions in plain words, and link to sources instead of copying them.
- **Facts:** use public sources (EPA, ASHRAE 15/15.2/34, UL 60335-2-40/-2-89, DOT CFR 49). Mark anything not yet confirmed with `f:1` or a CHECK note, and tell Shameen. Rules change, so put a date on rule claims.
- **Voice:** first person, plain, short sentences, the way a tech explains it on the job. Wrong answer choices should reflect real mistakes techs make, with a reason why someone would pick them.
- **Phone first:** every page has to work at 400px wide, in light and dark mode.

## Roadmap

1. Put the site live on Shameen's own domain (GitHub Pages or Netlify).
2. Add lesson pages from Shameen's study notes (sent after each study session), with field stories.
3. Add spaced repetition, so missed questions come back days later.
4. Later: student logins and an instructor dashboard with class scores by topic, for schools and programs.
5. Later: more courses (master's exam prep, LG VRF, AAON), plus Spanish versions.
