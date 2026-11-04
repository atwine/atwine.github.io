# atwine.github.io

Research website of Mugume Twinamatsiko Atwine: projects, publications and CV.

Live at <https://atwine.github.io>. GitHub Pages publishes this repository's `main` branch as it is, with no build step. Everything committed here is public, so personal or draft files belong somewhere else.

## Files

- `index.html`: homepage
- `cv/index.html`: online CV
- `cv/Mugume-Twinamatsiko-Atwine-CV.pdf`: PDF version of the CV, generated from the online CV
- `styles.css`: styles for both pages, including the print layout used for the PDF
- `main.js`: copyright year and the "Copy" email button
- `images/`: portrait and partner logos
- `fonts/`: Newsreader and Instrument Sans, hosted here so the pages load no third-party files. Both fonts use the SIL Open Font License 1.1; the licence texts sit next to the font files.
- `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`: the browser tab and home-screen icon

The homepage's `<script type="application/ld+json">` block tells search engines and AI assistants who the site is about, and lists the papers that belong to that person. When you add a paper to the homepage, add it to that block too, and update `dateModified` in both pages' blocks. The CV page's block only points to the same person.

## Preview locally

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Then open <http://127.0.0.1:8000>.

## Update the CV PDF

After editing `cv/index.html` or `styles.css`, regenerate the PDF with Chrome while the local preview is running. The fresh profile (`mktemp -d`) stops Chrome from reusing an old copy of the stylesheet, and Chrome needs the full output path. Run it from the repository folder in Git Bash:

```bash
"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 --user-data-dir="$(mktemp -d)" --print-to-pdf="$(cygpath -w "$PWD")\\cv\\Mugume-Twinamatsiko-Atwine-CV.pdf" http://127.0.0.1:8000/cv/
```

Check that the PDF is still three pages; if a section spills onto a fourth, tighten the `@media print` spacing in `styles.css`.
