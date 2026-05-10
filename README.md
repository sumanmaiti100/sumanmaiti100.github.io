# Suman Maiti — Academic Portfolio Website

A clean, professional academic portfolio website built with HTML, CSS, and JavaScript. Fully responsive, supports dark/light mode, and ready to deploy on GitHub Pages.

---

## File Structure

```
/
├── index.html              ← Main website file
├── style.css               ← All styles (theming, layout, components)
├── script.js               ← Dark mode, navigation, animations, pub filter
├── README.md               ← This file
└── assets/
    ├── images/
    │   └── profile.png     ← Your profile picture (already placed)
    ├── docs/
    │   └── resume.pdf      ← Your CV/resume PDF (already placed)
    └── screenshots/
        └── (optional — publication screenshots or other images)
```

---

## Replacing or Updating Your Files

### Profile Picture
- Place your photo at `assets/images/profile.png` (or `.jpg`).
- If using `.jpg`, update the `src` attribute in `index.html` (search for `profile.png`).
- Recommended: square image, at least 400×400 px.

### Resume / CV
- Place your PDF at `assets/docs/resume.pdf`.
- The "Download CV" button and contact card will automatically point to this file.

---

## Deploying on GitHub Pages

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in.
2. Click **New repository**.
3. Name it `<your-github-username>.github.io` (e.g., `sumanmaiti100.github.io`) for a user/organization site.
   - Alternatively, name it anything (e.g., `portfolio`) for a project site.
4. Set visibility to **Public**.
5. Do **not** initialise with a README (you already have one).
6. Click **Create repository**.

### Step 2 — Push your files

Run these commands in the `SUMAN WEBSITE` directory (requires [Git](https://git-scm.com)):

```bash
git init
git add .
git commit -m "Initial commit: academic portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repository, go to **Settings → Pages**.
2. Under **Source**, select **Deploy from a branch**.
3. Choose branch: `main`, folder: `/ (root)`.
4. Click **Save**.
5. GitHub will provide a URL such as `https://<username>.github.io/<repo>/`.
   - For a user site (`<username>.github.io`), the URL is `https://<username>.github.io`.

It typically takes 1–3 minutes for the site to go live after the first push.

---

## Updating Content

### Publications
In `index.html`, each publication is a `<div class="pub-card" data-type="...">` block.
- `data-type` values: `journal`, `conference`, `preprint`
- Copy an existing block and edit title, authors, venue, year badge, and links.
- The filter buttons work automatically based on `data-type`.

### Teaching Assistant Entries
Each entry is a `<div class="timeline-item reveal">` inside the `<section id="teaching">` block.
- Copy an existing item, change the `.semester-badge` text, course title, instructor, and period.

### Awards
Each award is an `<div class="award-card reveal">` inside `<section id="awards">`.
- Three icon-wrap colour classes available: `grant`, `award`, `talk`.

### Research Interests Cards
Inside `<section id="research">`, each card is a `<div class="research-card reveal">`.
- Change the Font Awesome icon class, heading, and description paragraph.

### Education
The education timeline is inside `<section id="about">`.
- Update the placeholder `[Your Undergraduate Institution]` and year range in the second `.timeline-item`.

### Contact & Social Links
Search `index.html` for `suman.kgp1999@gmail.com`, `sumanmaiti100`, and the LinkedIn URL to update them.

---

## Dark / Light Mode

- Toggle button is in the top-right of the navigation bar (moon/sun icon).
- The selected theme persists across page refreshes via `localStorage`.
- Default is **light mode**.

---

## Adding Google Scholar

To add a Google Scholar link to the hero buttons, find the `.hero-actions` block in `index.html` and add:

```html
<a href="https://scholar.google.com/citations?user=YOUR_ID" class="btn btn-icon"
   target="_blank" rel="noopener" aria-label="Google Scholar">
    <i class="fas fa-graduation-cap" aria-hidden="true"></i>
</a>
```

Replace `YOUR_ID` with your Google Scholar profile ID (found in your Scholar profile URL).

---

## Adding DOI / ACM DL / IEEE Links to Publications

For papers where a DOI is now available, find the matching `.pub-links-row` in `index.html` and add:

```html
<a href="https://doi.org/10.XXXX/XXXXXX" class="pub-link" target="_blank" rel="noopener">
    <i class="fas fa-external-link-alt" aria-hidden="true"></i> DOI
</a>
```

---

## Fonts & Icons (CDN Dependencies)

The site loads two external resources:
- **Inter** font via Google Fonts
- **Font Awesome 6.5** icons via cdnjs

These require an internet connection. For fully offline use, download and self-host both resources and update the `<link>` tags in `index.html`.
