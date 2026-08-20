# SCSS Package

## Available SCSS components

Below is the current list of all available components. Import only the ones you need:

**Important:** You don't need to import all components. Only import the ones you actually use in your project to reduce bundle size and compilation time.

```
// Layout & Structure
@forward '@lucca-front/scss/src/components/appLayout';
@forward '@lucca-front/scss/src/components/container';
@forward '@lucca-front/scss/src/components/contentSection';
@forward '@lucca-front/scss/src/components/footer';
@forward '@lucca-front/scss/src/components/grid';
@forward '@lucca-front/scss/src/components/header';
@forward '@lucca-front/scss/src/components/layout';
@forward '@lucca-front/scss/src/components/main';
@forward '@lucca-front/scss/src/components/mainLayout';
@forward '@lucca-front/scss/src/components/pageHeader';
@forward '@lucca-front/scss/src/components/section';

// Navigation
@forward '@lucca-front/scss/src/components/breadcrumbs';
@forward '@lucca-front/scss/src/components/horizontalNavigation';
@forward '@lucca-front/scss/src/components/mobileHeader';
@forward '@lucca-front/scss/src/components/mobileNavigation';
@forward '@lucca-front/scss/src/components/navside';
@forward '@lucca-front/scss/src/components/skipLinks';
@forward '@lucca-front/scss/src/components/tableOfContent';
@forward '@lucca-front/scss/src/components/verticalNavigation';

// Forms & Inputs
@forward '@lucca-front/scss/src/components/checkbox';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/dateField';
@forward '@lucca-front/scss/src/components/dateRangeField';
@forward '@lucca-front/scss/src/components/field';
@forward '@lucca-front/scss/src/components/fieldset';
@forward '@lucca-front/scss/src/components/form';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/inputFramed';
@forward '@lucca-front/scss/src/components/multiSelect';
@forward '@lucca-front/scss/src/components/phoneNumber';
@forward '@lucca-front/scss/src/components/presentation';
@forward '@lucca-front/scss/src/components/radio';
@forward '@lucca-front/scss/src/components/radioButtons';
@forward '@lucca-front/scss/src/components/radioField';
@forward '@lucca-front/scss/src/components/richText';
@forward '@lucca-front/scss/src/components/simpleSelect';
@forward '@lucca-front/scss/src/components/switch';
@forward '@lucca-front/scss/src/components/switchField';
@forward '@lucca-front/scss/src/components/textField';
@forward '@lucca-front/scss/src/components/textfields';
@forward '@lucca-front/scss/src/components/timepicker';
@forward '@lucca-front/scss/src/components/timepickerDeprecated';

// Buttons & Actions
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/buttonGroup';
@forward '@lucca-front/scss/src/components/clear';
@forward '@lucca-front/scss/src/components/link';
@forward '@lucca-front/scss/src/components/segmentedControl';

// Display & Content
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/box';
@forward '@lucca-front/scss/src/components/bubbleIcon';
@forward '@lucca-front/scss/src/components/bubbleIllustration';
@forward '@lucca-front/scss/src/components/calendar';
@forward '@lucca-front/scss/src/components/card';
@forward '@lucca-front/scss/src/components/chip';
@forward '@lucca-front/scss/src/components/code';
@forward '@lucca-front/scss/src/components/color';
@forward '@lucca-front/scss/src/components/comment';
@forward '@lucca-front/scss/src/components/emptyState';
@forward '@lucca-front/scss/src/components/fancyBox';
@forward '@lucca-front/scss/src/components/gauge';
@forward '@lucca-front/scss/src/components/highlightData';
@forward '@lucca-front/scss/src/components/label';
@forward '@lucca-front/scss/src/components/list';
@forward '@lucca-front/scss/src/components/listing';
@forward '@lucca-front/scss/src/components/newBadge';
@forward '@lucca-front/scss/src/components/notchBox';
@forward '@lucca-front/scss/src/components/numericBadge';
@forward '@lucca-front/scss/src/components/progress';
@forward '@lucca-front/scss/src/components/readMore';
@forward '@lucca-front/scss/src/components/resourceCard';
@forward '@lucca-front/scss/src/components/scrollBox';
@forward '@lucca-front/scss/src/components/skeleton';
@forward '@lucca-front/scss/src/components/softwareIcon';
@forward '@lucca-front/scss/src/components/sortableList';
@forward '@lucca-front/scss/src/components/statusBadge';
@forward '@lucca-front/scss/src/components/tag';
@forward '@lucca-front/scss/src/components/textFlow';
@forward '@lucca-front/scss/src/components/timeline';
@forward '@lucca-front/scss/src/components/title';
@forward '@lucca-front/scss/src/components/titleSection';
@forward '@lucca-front/scss/src/components/userTile';

// Tables
@forward '@lucca-front/scss/src/components/dataTable';
@forward '@lucca-front/scss/src/components/dataTableSticked';
@forward '@lucca-front/scss/src/components/indexTable';
@forward '@lucca-front/scss/src/components/table';
@forward '@lucca-front/scss/src/components/tableFixed';
@forward '@lucca-front/scss/src/components/tableFixedDeprecated';
@forward '@lucca-front/scss/src/components/tableSortable';
@forward '@lucca-front/scss/src/components/tableSticked';
@forward '@lucca-front/scss/src/components/tableStickedDeprecated';

// Overlays & Feedback
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/calloutAccordion';
@forward '@lucca-front/scss/src/components/calloutDisclosure';
@forward '@lucca-front/scss/src/components/calloutFeedbackList';
@forward '@lucca-front/scss/src/components/calloutPopover';
@forward '@lucca-front/scss/src/components/collapse';
@forward '@lucca-front/scss/src/components/dialog';
@forward '@lucca-front/scss/src/components/dropdown';
@forward '@lucca-front/scss/src/components/errorPage';
@forward '@lucca-front/scss/src/components/inlineMessage';
@forward '@lucca-front/scss/src/components/loading';
@forward '@lucca-front/scss/src/components/mobilePush';
@forward '@lucca-front/scss/src/components/plgPush';
@forward '@lucca-front/scss/src/components/popover';
@forward '@lucca-front/scss/src/components/toast';
@forward '@lucca-front/scss/src/components/tooltip';

// Files
@forward '@lucca-front/scss/src/components/file';
@forward '@lucca-front/scss/src/components/fileEntry';
@forward '@lucca-front/scss/src/components/fileToolbar';
@forward '@lucca-front/scss/src/components/fileUpload';

// Filters & Search
@forward '@lucca-front/scss/src/components/filterBar';
@forward '@lucca-front/scss/src/components/filterBarDeprecated';
@forward '@lucca-front/scss/src/components/filterPill';
@forward '@lucca-front/scss/src/components/filters';
@forward '@lucca-front/scss/src/components/listboxOption';
@forward '@lucca-front/scss/src/components/suggestion';

// Pagination & Dividers
@forward '@lucca-front/scss/src/components/divider';
@forward '@lucca-front/scss/src/components/pagination';

// User Components
@forward '@lucca-front/scss/src/components/userPopover';
```



## Marking something as deprecated

Deprecation metadata for this package lives in **one** place: the registry module
`src/commons/deprecated.scss`. Its mixins record what is deprecated while emitting
**zero CSS**, so the shipped stylesheet is unaffected. A build step reads the registry
out to a committed JSON manifest (`css-api/deprecations.json`) that powers the Storybook
"Deprecations" page and downstream tooling (VS Code IntelliSense, stylelint, codemods).

Register a deprecation at the declaration site, colocated with the thing it documents:

```scss
@use '@lucca-front/scss/src/commons/deprecated';

// A utility/component class (bare name, no dot)
@include deprecated.class('pr-u-textLeft', $replacement: 'pr-u-textAlignStart', $scope: 'commons/utils');

// A CSS custom property (with leading dashes)
@include deprecated.cssVariable('--commons-font-family', $replacement: '--pr-t-font-family', $scope: 'commons/vars');

// A compound/legacy selector (full selector, with dots)
@include deprecated.selector('.box.mod-grey', $replacement: '.box.mod-neutral', $scope: 'component:box');

// A Sass API surface (variable, mixin, config flag)
@include deprecated.sassApi('config.$borderRadius', $replacement: 'config.$borderRadiusVars', $scope: 'commons/config');
```

For loop-generated names, register inside the loop using the same interpolation that
builds the emitted name, so the recorded name is exact by construction. Use `$note`
instead of `$replacement` when there is no one-to-one modern equivalent. `$scope` must be
`commons/<file>` or `component:<name>`.

Rule of thumb: **a deprecation is not a deprecation until it is registered.** Plain
`// deprecated` comments are invisible to tooling.

### Regenerating the manifest

```
npm run scss:deprecations          # rewrite css-api/deprecations.json from the sources
npm run scss:deprecations -- --check   # CI: fail if the committed manifest is stale
```

The manifest is committed so Storybook and typecheck work from a clean checkout; CI runs
`--check` to catch drift.

### Auditing size impact

Registry calls must never change compiled output. To prove a change is size-neutral:

```
npm run scss:audit                 # compare bundle + every module vs the rc merge-base
npm run scss:audit -- --base <ref> # compare against a specific commit
```

It writes `scss-size-audit.md` with per-module before/after compressed + gzip sizes, a
sha256 byte-identity summary, and the before/after deprecation inventory.
