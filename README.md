
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

```bash
cp example [your-project-directory]
```

## Dev

```bash
npm run dev
```

## Build

If you want to build the `<base>` element in HTML file, you must give the environment variable `BASE_URL`:

```bash
BASE_URL="https://your-host/your-path-1/your-path2/" npm run build
```

The `<base>` element is useful if you only redirect the root `index.html` or you want to put your static files and javascript bundles to different location.

See: [`<base>`: The Document Base URL element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base)

## Deploy to Google Cloud Storage with npm scripts

Use [static-fe-deployer](https://github.com/twreporter/static-fe-deployer) to deploy the project.

## License

MIT
