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

// Import SCSS components
@forward '@lucca-front/scss/src/components/actionIcon';
@forward '@lucca-front/scss/src/components/box';
@forward '@lucca-front/scss/src/components/breadcrumbs';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/buttonGroup';
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/card';
@forward '@lucca-front/scss/src/components/checkbox';
@forward '@lucca-front/scss/src/components/chip';
@forward '@lucca-front/scss/src/components/clear';
@forward '@lucca-front/scss/src/components/code';
@forward '@lucca-front/scss/src/components/collapse';
@forward '@lucca-front/scss/src/components/container';
@forward '@lucca-front/scss/src/components/contentSection';
@forward '@lucca-front/scss/src/components/divider';
@forward '@lucca-front/scss/src/components/emptyState';
@forward '@lucca-front/scss/src/components/errorPage';
@forward '@lucca-front/scss/src/components/field';
@forward '@lucca-front/scss/src/components/file';
@forward '@lucca-front/scss/src/components/filters';
@forward '@lucca-front/scss/src/components/form';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/gauge';
@forward '@lucca-front/scss/src/components/grid';
@forward '@lucca-front/scss/src/components/grid';
@forward '@lucca-front/scss/src/components/header';
@forward '@lucca-front/scss/src/components/label';
@forward '@lucca-front/scss/src/components/layout';
@forward '@lucca-front/scss/src/components/link';
@forward '@lucca-front/scss/src/components/list';
@forward '@lucca-front/scss/src/components/loading';
@forward '@lucca-front/scss/src/components/main';
@forward '@lucca-front/scss/src/components/menu';
@forward '@lucca-front/scss/src/components/navSide';
@forward '@lucca-front/scss/src/components/notchBox';
@forward '@lucca-front/scss/src/components/pageHeader';
@forward '@lucca-front/scss/src/components/pagination';
@forward '@lucca-front/scss/src/components/progress';
@forward '@lucca-front/scss/src/components/radio';
@forward '@lucca-front/scss/src/components/radioButtons';
@forward '@lucca-front/scss/src/components/section';
@forward '@lucca-front/scss/src/components/sortableList';
@forward '@lucca-front/scss/src/components/statusBadge';
@forward '@lucca-front/scss/src/components/switch';
@forward '@lucca-front/scss/src/components/table';
@forward '@lucca-front/scss/src/components/tableFixed';
@forward '@lucca-front/scss/src/components/tableOfContent';
@forward '@lucca-front/scss/src/components/tableSorted';
@forward '@lucca-front/scss/src/components/tableSticked';
@forward '@lucca-front/scss/src/components/tag';
@forward '@lucca-front/scss/src/components/textfield';
@forward '@lucca-front/scss/src/components/timeline';
@forward '@lucca-front/scss/src/components/timepicker';
@forward '@lucca-front/scss/src/components/title';
@forward '@lucca-front/scss/src/components/titleSection';
@forward '@lucca-front/scss/src/components/toast';
@forward '@lucca-front/scss/src/components/verticalNavigation';
```

Then comment unused components to reduce LF’s distribution size and compilation time.

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
