# Sai Holiday — Premium Travel Website
**Live Site:** https://privacychamber.github.io/SaiHoliday/

## Tech Stack
- **Frontend:** Next.js 14 (App Router, TypeScript, static export)
- **Hosting:** GitHub Pages (automated via GitHub Actions)
- **Backend (upcoming):** PHP + MySQL on Namecheap

## Development
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Generates /out for static export
```

## Deployment
Push to `main` branch → GitHub Actions builds & deploys automatically.

## Project Structure
```
src/
  app/             # Next.js App Router pages
  components/      # Page sections (Hero, Packages, Experiences…)
.github/workflows/ # CI/CD for GitHub Pages
```
