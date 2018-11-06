# Caretaker

All slides data is placed in `src/data/slides.js`
All metadata constants are placed in `src/constants/metadata.js`

## Install

```bash
cd {project-folder-name}

# install packages:
yarn

# setup fede
fede build-config

# then edit the `fede-config.json`
```

## Dev

```bash
npm run dev
```

## Staging

```bash
# build
BASE_URL="https://storage.googleapis.com/twreporter-infographics/staging-{project-folder-name}-gcs/" npm run build

# deploy all files to staging
fede deploy
# update dist folder to staging
fede deploy dist
```

See more about [fede](https://www.npmjs.com/package/@twreporter/static-fe-deployer)

## Production

```bash
# build
npm run build

# deploy all files to production
fede deploy --production
# update dist folder to production
fede deploy dist --production
```

See more about [fede](https://www.npmjs.com/package/@twreporter/static-fe-deployer)