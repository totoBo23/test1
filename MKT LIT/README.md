# Check Your Rent Website (Static)

This is a simple static website you can upload to almost any hosting service.

## Project structure

- `index.html` -> homepage (Innsbruck-focused landing page + calculator)
- `impressum.html` -> legal notice / provider information page
- `datenschutz.html` -> privacy policy page
- `assets/css/style.css` -> all styling
- `assets/js/config.js` -> local configuration (Google Maps API key)
- `assets/js/main.js` -> language switch + calculator logic
- `assets/images/` -> images/logo placeholders
- `BRAND_STYLE.md` -> reusable brand style standard (tone, fonts, colors, component rules)

## How to upload

1. Zip the full folder.
2. Upload all files preserving folder structure.
3. Ensure `index.html` is in the root.

## What already works

- German and English language switch
- Simplified calculator (4 steps)
- Innsbruck/Tirol-first messaging and defaults
- Trust and security section (document handling + process transparency)
- Richtwert logic by Austrian state
- Overpayment and 36-month potential win estimate
- Result shown before contact capture
- Conditional lead capture (shown only for qualified results)
- Optional contract upload field (frontend only)
- Footer legal links and company credibility placeholders
- Mobile-friendly layout

## Important note

This project is currently frontend only.

The lead form and file upload are not sent anywhere yet.
To make this production-ready, next step is connecting the form to a backend/CRM.

## Quick content updates

- Text and section labels: edit `assets/js/main.js` in `translations.de` and `translations.en`
- Colors and typography: edit CSS variables at top of `assets/css/style.css`
- Add logo/images: place files in `assets/images/` and reference them in `index.html`
- Hero photo: place your Innsbruck image at `assets/images/innsbruck-hero.jpg`
- Replace legal placeholders in `impressum.html` and `datenschutz.html` before going live

## Google Maps setup (Address autocomplete)

1. Set your key in `assets/js/config.js` under `googleMapsApiKey`.
2. In Google Cloud Console, restrict the key by HTTP referrer (your domain).
3. Enable APIs: `Maps JavaScript API` and `Places API`.
