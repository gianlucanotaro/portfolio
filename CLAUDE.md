# CLAUDE.md

Static personal site served by GitHub Pages from `master`; no build step. See
`README.md` for the layout. Every visible text exists twice, `lang="en"` and
`lang="de"`, and both must say the same thing.

## Skills

| Situation | Skill |
|---|---|
| Adding or changing any text | `i18n-localization`: check that every EN block has a DE twin (it can't run its locale-file scripts here; use it as a review checklist) |
| Design or layout changes | `a11y-audit` (contrast, heading order, both languages) |
| "Why isn't the site found on Google", meta tags, sitemap | `seo-audit` |
| Before you commit | `karpathy-coder`: keep it plain HTML/CSS/JS, no framework or build step |
| Previewing | `run` (`python3 -m http.server`) |

- Pushing to `master` publishes. Open a PR and let the user merge.
- The public CV PDF never contains a phone number.
