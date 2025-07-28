# Woodland Maps

A real-time navigation application for Woodland Lakes private recreational community in Sullivan, MO

## Development

Install dependencies and run the development server:

```bash
yarn install
yarn dev
```

## Deployment

This project is configured to deploy a static export to **GitHub Pages** using
the included `Deploy Next.js site to Pages` workflow. A `CNAME` file is present
so that the site is served from <https://map.wlstewards.org>.

GitHub Actions will automatically build and deploy the site whenever changes are
pushed to the `main` branch.
