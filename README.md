# Lucca Front

Lucca Front is a modular framework for developing web applications by [lucca](http://www.lucca.fr).
It uses sub-packages architecture with unified versioning, à la [angular](https://github.com/angular/angular).

## Lucca Front contains 3 packages

- a set of icons
- a SCSS framework
- a library of useful angular components

Angular package depends on the SCSS one which depends itself on Icons.

## How to install

### Add Lucca Front to your npm package

```
npm install @lucca-front/icons --save
npm install @lucca-front/scss --save
npm install @lucca-front/ng --save
```

### Import packages styles

In your file styles.scss, add imports files and components you want to import to your project:

```
// Import styles
@forward '@lucca-front/icons/src/main';
@forward '@lucca-front/scss/src/main';
@forward '@lucca-front/ng/src/main';

// Import SCSS components you use to reduce LF’s distribution size and compilation time.
@use '@lucca-front/scss/src/components/componentA';
@use '@lucca-front/scss/src/components/componentB';
@use '@lucca-front/scss/src/components/componentC';
```

To import all components, replace the previous code by the 3 following lines (not recommended):

```
// Import styles
@forward '@lucca-front/icons/src/main';
@forward '@lucca-front/scss/src/main-all';
@forward '@lucca-front/ng/src/main';
```

For custom imports, check our [advanced usage documentation](https://prisme.lucca.io/94310e217/p/950783-chargement-des-composants).

### Include paths

In angular.json, we suggest to add a couple of entries to your paths:

```
"architect": {
  "build": {
    "options": {
      "stylePreprocessorOptions": {
        "includePaths": [
          "src/scss",
          "node_modules"
        ]
      },
    },
  },
},
```

## How to update

In order to activate schematics when they are available, we recommend to update Lucca Front using this command line:

```
lucca angular update
```

To check available options:

```
lucca angular update --help
```

To update a specific version of Lucca Front (@ points either to a specific version or a npm release channel):

```
npx ng update @lucca-front/ng@16.5.0
```

For release:

```
npx ng update @lucca-front/ng@rc
```

If you want the latest version you can run this equivalent functions:

```
npx ng update @lucca-front/ng
```

or

```
npx ng update @lucca-front/ng@latest
```

## Storybook

In order to work on Lucca Front, we use Storybook to display components.

- Install [volta.sh](https://docs.volta.sh/guide/getting-started)
- Install node `volta install node@lts`
- Run storybook `npm start`

## TODO

- [ ] Gestion de l'espace
