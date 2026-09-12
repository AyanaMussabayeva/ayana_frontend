# Behavioral Latency: Standalone Project Page

Open `index.html` in a browser. No build, package installation, server, or
internet connection is needed to view the page and use its interactions.
Links to arXiv, GitHub, and the author's website require internet.

## Add to the Website

Copy this entire folder into the website's public/static directory, for example:

```text
public/publications/behavioral-latency/
  index.html
  styles.css
  script.js
  citation.bib
  assets/
  vendor/
```

Link the existing Publications entry to
`/publications/behavioral-latency/index.html`. All asset paths are relative;
keep the folder contents together. The website's publication listing links to
this page through the publication's `projectLink` field.

Serving the folder as static files is the simplest integration. If porting
the HTML into a React/Next.js route instead, preserve the asset paths, scope
the stylesheet, and port the DOM interactions to the framework.

The website integration uses same-origin links to `/research` and `/` and includes
a canonical URL and an absolute `og:image` for the public route on `ayana.best`.

## Provenance

- Seven original PNG figures copied unchanged from the arXiv source package.
- `assets/paper.pdf` copies `BehavioralLatency_arXiv_preview.pdf`.
- Results follow the accepted manuscript / arXiv v1, `2608.29428`.
- Architecture selector: Table 5, means and sample SDs over five seeds.
- Shift comparison: Table 7, seed means; full variability is in Table 9.
- The crop example is synthetic, not a model output or additional experiment.
  It illustrates two idealized coordinate behaviors, not causal identification.
- The BibTeX cites the arXiv record and notes journal acceptance. Update journal
  details when the final published citation is available.
- Lucide icons are vendored locally; their license is included in `vendor/`.

No analytics, cookies, web fonts, CDN dependencies, API calls, or remote scripts.
Figures retain their original numbering, even where the narrative introduces
them in a different order.

Core text, tables, figures, downloads, and expandable sections work without
JavaScript. Selectors, the schematic, copy button, reading indicator, and
figure dialog are progressive enhancements.
