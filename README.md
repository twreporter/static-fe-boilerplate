
# TWReporter Frontend Boilerplate for Generating Static File

## Contains

- [x] [Webpack](https://webpack.github.io)
- [x] [React](https://facebook.github.io/react/)
- [x] [Babel](https://babeljs.io/)
- [x] [styled-components](https://github.com/styled-components/styled-components.git)
- [x] Generate static File
- [x] Import Image

## Setup the example starter

Copy the example project:

```
cp example [your-project-directory]
```

Then add the `config.json` in your project directory:

```
cd [your-project-directory]
cp config.example.json config.json
yarn # or `npm i`
```

## Dev

```
npm run dev
```

## Build

Build the distribution files (`/dist/index.html` and `/dist/main-xxxxx.js`):

```
npm run build
```

## Deploy to Google Cloud Storage with npm scripts

### Intro

There are 3 kinds of status for the files: `STAGING`, `PRODUCTION`, and `ARCHIVE`

`STAGING` files will be placed in `your-project-name-staging` on GCS. The postfix `staging` can be set in `config.json`. You can set the `cache-control` value in the `config.json` .

`PRODUCTION` files or `ARCHIVE` files will be in the same path `your-project-name-prod`. The postfix `staging` can be set in `config.json`. They are only different on the `cache-control`. You can set the `cache-control` value in the `config.json` also.


We set the `dist` and `static` with separated configs and commands to publish because of the different update frequency of them.

### Setup authentication

See: https://cloud.google.com/docs/authentication/getting-started

### Publish local files to Staging

Deploy the files in `/dist`:

```
npm run stage:dist
```

Or deploy the files in `/static`:

```
npm run stage:static
```

### Deploy files to Production:

Deploy the files in `/dist`:

```
npm run deploy:dist
```

Or deploy the files in `/static`:

```
npm run deploy:static
```

### Archive the files on GCP

Since the files in `PRODUCTION` might change on demand in a period after they are released. We cannot set the `cache-control` too long in `PRODUCTION`.

If we are sure that the files won't change anymore, or the change will be minor, we can set the `cache-control` of the files on GCP longer. (like one month)

```
npm run archive:static
``

```
npm run archive:dist
``

### Rollback to previous version on GCP

```
npm run rollback:static [version]
```

```
npm run rollback:dist [version]
```

## License

MIT