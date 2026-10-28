# Circuit Atlas — E-Waste Coursework Portfolio

Circuit Atlas is a static React and Vite portfolio for **Shreyank Parab** (24102B0044, TE CMPN B), documenting work for E-Waste and Environmental Management.

The site organizes the included ISA, ESE, and extra course files into searchable entries. Visitors can preview supported files, download individual items, and package multi-file entries as ZIP archives.

## Run locally

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite. Create and preview a production build with:

```powershell
npm run build
npm run preview
```

## Update the portfolio

- Add or remove files under `public/assignments/ISA/`, `public/assignments/ESE/`, or `public/assignments/Extras/`.
- Keep the portfolio index in `src/data/assignments.ts` aligned with those files. Each path is built from its category folder and file name.
- Edit student and course information in `src/config.ts`.
- The color system and typography are configured in `tailwind.config.js` and `index.html`.

The portfolio is static and does not require a database or sign-in.
