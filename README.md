# lucca-front

A modular framework for developing web applications by [lucca](http://www.lucca.fr).
Uses sub-packages architecture with unified versioning, à la [angular](https://github.com/angular/angular).

## Contains 3 packages

 - a set of icons
 - a scss framework
 - a library of useful angular components

Angular package depends on SCSS one which depends itself on Icons.

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
@forward '@lucca-front/icons/src/main’;
@forward '@lucca-front/scss/src/main’;
@forward '@lucca-front/ng/src/main’;

// Import SCSS components
@forward '@lucca-front/scss/src/components/actionIcon';
@forward '@lucca-front/scss/src/components/box';
@forward '@lucca-front/scss/src/components/breadcrumb';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/buttonGroup';
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/card';
@forward '@lucca-front/scss/src/components/checkbox';
@forward '@lucca-front/scss/src/components/chip';
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
@forward '@lucca-front/scss/src/components/gauge';
@forward '@lucca-front/scss/src/components/grid';
@forward '@lucca-front/scss/src/components/header';
@forward '@lucca-front/scss/src/components/keyframe';
@forward '@lucca-front/scss/src/components/label';
@forward '@lucca-front/scss/src/components/layout';
@forward '@lucca-front/scss/src/components/link';
@forward '@lucca-front/scss/src/components/list';
@forward '@lucca-front/scss/src/components/loading';
@forward '@lucca-front/scss/src/components/main';
@forward '@lucca-front/scss/src/components/menu';
@forward '@lucca-front/scss/src/components/navSide';
@forward '@lucca-front/scss/src/components/pageHeader';
@forward '@lucca-front/scss/src/components/pagination';
@forward '@lucca-front/scss/src/components/progress';
@forward '@lucca-front/scss/src/components/radio';
@forward '@lucca-front/scss/src/components/radioButtons';
@forward '@lucca-front/scss/src/components/section';
@forward '@lucca-front/scss/src/components/switch';
@forward '@lucca-front/scss/src/components/table';
@forward '@lucca-front/scss/src/components/tableFixed';
@forward '@lucca-front/scss/src/components/tableOfContent';
@forward '@lucca-front/scss/src/components/tableSorted';
@forward '@lucca-front/scss/src/components/tableSticked';
@forward '@lucca-front/scss/src/components/tag';
@forward '@lucca-front/scss/src/components/textfield';
@forward '@lucca-front/scss/src/components/timeline';
@forward '@lucca-front/scss/src/components/title';
@forward '@lucca-front/scss/src/components/titleSection';
@forward '@lucca-front/scss/src/components/toast';
@forward '@lucca-front/scss/src/components/util';
```
Then comment unused components to reduce LF’s dist size.

To import all components, simply add the 3 following lines (not recommended as it will increase files weight):

```
// Import styles
@forward '@lucca-front/icons/src/main’;
@forward '@lucca-front/scss/src/main.dist’;
@forward '@lucca-front/ng/src/main’;
```

For custom imports, check our advanced usage documentation. (+lien)

In angular.json, we suggest to add a couple of entries to your paths

add this to your stylePreprocessorOptions includePaths:

```
"architects": {
  "build": {
    "stylePreprocessorOptions": {
      “includePaths": [
        "src/scss",
        "node_modules",
      ]
    },
  },
},
```

## Contribution
### Golden rules

Use english
Don't forget to append the changelog of the corresponding sub-package (automatique now?)
If you're fixing an issue, reference it in your pr and in the changelog like this :
Fixed issues
- [issue #193](https://github.com/LuccaSA/lucca-front/issues/193) - short summary of the issue


### Storybook
To work on Lucca Front, we use Storybook to display components.
(volta ?)
→ npm start
