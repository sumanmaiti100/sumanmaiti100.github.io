# Suman Maiti — Academic Website

Source for <https://sumanmaiti100.github.io/>. Plain HTML, CSS and JavaScript, served by GitHub Pages from `main`. No build step.

```
index.html     All content
style.css      Design tokens (light/dark), layout, components
script.js      Theme toggle, mobile menu, publication filter, BibTeX, video player
assets/images  profile-720.webp/.jpg (site photo), og-image.jpg (link previews)
assets/docs    resume.pdf (linked as "CV")
```

## Common edits

**Add a paper.** Copy an `<li class="pub">` block in `#publications` into the right list (Peer-Reviewed, Under Review, In Preparation, Preprints). Set `data-type` (`conference`, `journal` or `other`) for the filter, and `data-bib-type`, `data-bib-key`, `data-bib-year`, `data-bib-venue` for the BibTeX button. The tag on the left is C (conference), J (journal) or P (preprint / in preparation).

**News.** Add an `<li>` at the top of `.news`.

**Research.** Edit the three numbered directions in `#research`; the bracketed references link to paper ids (`#pub-…`).

**CV / photo.** Replace `assets/docs/resume.pdf` or `assets/images/profile-720.*` (square, ~720 px).

The theme follows the visitor's system setting; the toggle choice is remembered.
