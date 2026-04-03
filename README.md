# Lucca Front

Lucca Front is a modular framework for developing web applications by [lucca](http://www.lucca.fr).
It uses sub-packages architecture with unified versioning, à la [angular](https://github.com/angular/angular).

## Lucca Front contains 4 packages

- a set of icons [@lucca-front/icons](packages/icons/README.md)
- a SCSS framework [@lucca-front/scss](packages/scss/README.md)
- a library of useful angular components [@lucca-front/ng](packages/ng/)
- a library of useful angular components [@lucca-front/prisme](packages/prisme/)

Angular package depends on the SCSS one which depends itself on Icons.

## How to install

### Add Lucca Front to your npm package

```
npm install @lucca-front/icons --save
npm install @lucca-front/scss --save
npm install @lucca-front/ng --save
npm install @lucca-front/prisme --save
```

### Import packages styles

In your file styles.scss, add imports files and components you want to import to your project.

#### Basic setup

```
// Import core styles (required)
@forward '@lucca-front/icons/src/main';
@forward '@lucca-front/scss/src/main';
@forward '@lucca-front/ng/src/main';
```

#### Available SCSS components

For the complete list of available SCSS components organized by category, see the [SCSS package documentation](packages/scss/README.md).

#### Import all components (not recommended)

To import all components at once:

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

## Translations

### How it work

Translations are hosted by Lokalise on `Lucca.Front` project and must be imported by launching the command at project root: `npm run i18n:update`.
[Full translations documentation](https://www.notion.so/Lucca-Front-Traductions-Lokalise-173d278ab26e801b8462f90e1a93dd50)

### Overrides

Many Lucca Front components support translation overrides through the `[intl]` input. This allows you to customize specific translations without modifying the default translation files.

Components use the `intlInputOptions()` function to create an `intl` input that:
1. Automatically loads translations based on the current locale (`LOCALE_ID`)
2. Accepts an object with partial translations to override specific keys
3. Merges your custom translations with the default ones

#### Example with Pagination Component

**Override multiple keys**:
```html
<lu-pagination 
  [from]="0" 
  [to]="10" 
  [itemsCount]="1000" 
  [intl]="{
    results: 'Page {{from}}-{{to}} / {{itemsCount}}',
    previous: 'Prev',
    next: 'Next',
    results: 'Showing {{from}} to {{to}} of {{itemsCount}} items'
  }" 
/>
```

## License
The source code of this project is distributed under the Apache 2.0 license (see the LICENSE file). 

Please note:
Assets (including but not limited to images, audio files, fonts, icons, trademarks, logos, brand names and other media files) included in this repository are NOT covered by this license. They remain the property of their respective owners and their use is subject to specific restrictions. Please respect these conditions.
