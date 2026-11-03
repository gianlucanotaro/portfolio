# Portfolio

Personal portfolio of Gianluca Notaro, served with GitHub Pages from the `master` branch.

Plain static files, no build step:

- `index.html`: all content, English and German side by side. Each text carries `lang="en"` or `lang="de"`; `style.css` hides the language that isn't selected.
- `script.js`: the EN/DE switch. The initial language comes from `?lang=`, then the saved choice, then the browser language.
- `cv/`: the CV as PDF. The public copy has no phone number.

Preview locally with any static server, e.g. `python3 -m http.server`.

The previous 2019–2020 version is archived in the private repo `portfolio-2020`.
