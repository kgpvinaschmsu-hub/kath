# Kath — High-Fidelity Portfolio

A warm, editorial portfolio based on the supplied six-panel sketch. The site includes a responsive home page, about section, filterable projects, project detail drawer, process section, contact form, and footer.

Each of the six portfolio concepts now includes a responsive interactive demo built with semantic HTML, CSS, and vanilla JavaScript. Open any project card and choose **Open coded demo** to try it.

## Preview locally

Open `index.html` directly or serve this folder with VS Code Live Server. No build step or package install is required.

## Add your real details

At the top of `script.js`, update `SITE_CONFIG` with:

- your email address
- GitHub profile URL
- LinkedIn profile URL
- Instagram profile URL

Links without a URL are intentionally disabled. Replace the sample project objects in the `projects` array with your own project titles, descriptions, features, and categories.

Kath's warm-background profile portrait is stored at `assets/kath-profile.png` and is used in the hero section. The original generated desk photograph remains available at `assets/creative-desk.png` for future sections.

## Contact form

The form opens the visitor's email application with a structured inquiry addressed to Kath. It does not store personal data through a backend. LinkedIn remains available as a secondary contact option.

## Main files

- `index.html` — semantic page structure and content
- `styles.css` — warm visual system, responsive layout, and motion
- `script.js` — filters, project drawer, navigation, contact email, and configuration
- `demos/` — shared source code and interactive experiences for all six projects
- `assets/kath-profile.png` — warm-background hero portrait
- `assets/creative-desk.png` — generated editorial desk image available for reuse
