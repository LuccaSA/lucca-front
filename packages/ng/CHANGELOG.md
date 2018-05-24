# Changelog

## In Dev
### New features
- `lu-select` - add multiple values support
### Fixes
### Breaking changes
### Updated dependencies
### Updated devDependencies

## 0.7.0
- `animations` - add in/out timing and triggerName parameters to LuXAnimationFactory
- `animations` - remove generic LuAnimationFactory
### New features
-✨ The package is now compatible with ChangeDetectionStrategy.OnPush

## 0.6.1
### New features
-✨ `formly` - use lu-select instead of mat-select
-✨ `formly` - add type user that uses lu-user-select
### Fixes
- fixed root index.ts file
- `select` - rerender after feeder initialization
### Breaking changes
- rem old component that arent in any module cuz it breaks aot build otherwise
- `daterange`removed code cuz it was commented anyway but sometimes broke aot build

## 0.6.0
### New features
- `lu-api-select` Add Component for Api Select
- `lu-rdd-select` Add Component for Api RDD Select
- `ISelectScrollable`: Interface to manipulate Infinite scroll select
- `ISelectApiFeeder`: Interface to manipulate select calling an API
- `ASelectRDDApiFeeder`: Abstract implementation of ISelectApiFeeder dedicate to RDD Apis call
### Breaking changes
- `user-select` becomes `lu-user-select`
- `lu-api-picker`: remove the component, you should use the `lu-api-select` or `lu-rdd-select` instead

## 0.5.0
### New features
- `lu-user-picture` now has a displayFormat attribute. Default to "FL"
- `user-select`: Add component for user select
- `user-select-picker`: Add a picker that implements IOptionFeeder for the user select
- `IOptionFeeder`: Add a method `textValue` to let developer set how to display the value at first (when no options are loads)
### Fixes
- `style` - ng-invalid is now apply to `.textfield-input` instead of just `input`
### Breaking changes
- `lu-select`: remove `mod` attribute, you should specify the mod of select only through the parent with class `mod-*`

## 0.4.1
### Updated peerDependencies
- `@lucca-front\icons` - update to version 0.4.1
- `@lucca-front\scss` - update to version 0.4.1

## 0.4.0
### New features
- `lu-select-searcher` : Add a component for searching in a select
- `IOptionFeeder` : An interface to implement to enable component that will manage options for a select
- `ASelectOptionFeeder` : An abstract implementation of `IOptionFeeder`
- `lu-popover` : can now accept a `scroll-strategy` set by default to `reposition`

### Breaking changes
- `lu-select-picker` : `luOptions$` is not accessible anymore, it was replace by `luSelectOptions()` method which gives you the list of options

## v0.3.2
### Tooling
🔨 travis calls script travis from root package, it is then dispatched to lf packages via lerna (for now only ng package is tested)
🔨 ng - travis script does this
 * builds the demo in aot
 * run tests for /src
 * builds the demo in JIT, no minification/cachebusting for easier reverse engineering
### Breaking changes
- Animations :
 💥 renammed LfAnimationFactory to LuAnimationFactory for consistency
### Fixes
🐛 user-tile - use the display pipe the right way, is compatible aot

## v0.3.1
### New features
- `lu-user-tile` now support a `displayFormat` attribute
### Breaking changes
- Animations :
 💥 renamed LFAnimationFactory to LfAnimationFactory for consistency 's sake
 💥 changed LfAnimationFactory signature to be aot compatible (see after break)
- Popover :
 💥 couldn't keep using popover.template.ts file cuz -aot, as a result had to create a popover.component.html. As a result people using customPopoverTemplate (api-picker or select-picker) can still use it but it wont work in aot. so you have to create the html file and have the whole template in it - see this commit
### Fixes
mini refacto of animations file names
use factory to provide animation so it supports aot
fix selects module to avoid declaring components twice
fixed the demo in aot
rem demo/formly/debug
fixed aot issues in select due to protected/private properties being used in html template

## v0.3.0
### Fixes
- `lu-select` options are not selectable if options comes asynchronously

## v0.2.3
### Updated dependencies
- [rxjs](https://github.com/ReactiveX/rxjs) - update to version ^5.5.2

## v0.2.2
### New features
- `lu-user-picture` has size mod classes
- `lu-user-tile` has size mod classes, a `mod-nameOnly` and a `mod-vertical`
- New theming system
- `lu-select` new html select that will work with lucca styles
### Fixes
### Breaking changes
- The new theming system requires a new includePaths in your style preprocessors: `~@lucca-front/ng/src/style/overrides`
### Updated dependencies
### Updated devDependencies
- `ng-formly` fix display of error messages

### New featues
- `Select` Add the new select of lucca-front

### Updated devDependencies
- [karma-chrome-launcher](https://github.com/karma-runner/karma) - update to version ~2.2.0

## v0.1.6
### New features
- `LFAnimationFactory` generates simple Angular animations. Three major types are available: `fade`, `scale`, `slide`.
- `selectPicker`

### Fixes
- `ng-formly` forgot setvalue in formly autocomplete

## v0.1.5

This version offer new components and directives

### New features
- `luAppiPicker` directive and `lu-api-picker` component add

### Fixes
- Severals fix to components & css

### Updated dependencies
- [rxjs](https://github.com/ReactiveX/rxjs) - update to version 5.5.2
- [zone.js](https://github.com/angular/zone.js/) - retrograde to version 0.8.14

### Updated devDependencies
- [@types/jasmine](https://github.com/jasmine/jasmine) - update to version 2.5.53
- [codelyzer](https://github.com/mgechev/codelyzer) - update to version ~3.2.0
- [jasmine-core](https://github.com/jasmine/jasmine) - update to version ~2.6.2
- [jasmine-spec-reporter](https://github.com/jasmine/jasmine) - update to version ~4.1.0
- [karma](https://github.com/karma-runner/karma) - update to version ~1.7.0
- [karma-chrome-launcher](https://github.com/karma-runner/karma) - update to version ~2.1.1
- [karma-coverage-istanbul-reporter](https://github.com/karma-runner/karma) - update to version ^1.2.1
- [ts-node](https://github.com/TypeStrong/ts-node) - update to version ~3.2.0
- [tslint](https://github.com/palantir/tslint) - update to version ~0.7.0
- [typescript](https://github.com/Microsoft/TypeScript) - update to version ~2.4.2

## v0.1.2
This version is the first minor version of `@lucca-front/ng`. It brings this package up to speed with Angular 5 and Angular Material 5
### Breaking changes
- `lu-date-range-picker` component is being deactivited as it is going through a major rework
- `SharedModule` has been discontinued
	- `luTranslateService` is being reworked
	- `moment-date-adapter` has been replaced by [@angular/material-moment-adapter](https://github.com/angular/material2)
- `lol` example component has been removed

### New features
- `luPopover` and `luPopoverTrigger` components have been added

### Updated dependencies
- [@angular/animations](https://github.com/angular/angular) - update to version 5.0.0
- [@angular/common](https://github.com/angular/angular) - update to version 5.0.0
- [@angular/compiler](https://github.com/angular/angular) - update to version 5.0.0
- [@angular/core](https://github.com/angular/angular) - update to version 5.0.0
- [@angular/forms](https://github.com/angular/angular) - update to version 5.0.0
- [@angular/platform-browser](https://github.com/angular/angular) - update to version 5.0.0
- [@angular/platform-browser-dynamic](https://github.com/angular/angular) - update to version 5.0.0
- [@ngx-translate-core](https://github.com/ngx-translate/core) - update to version 8.0.0

### Updated devDependencies
- [@angular/cli](https://github.com/angular/angular-cli) - update to version 1.5.0
- [@angular/compiler-cli](https://github.com/angular/angular) - update to version ^5.0.0
- [@angular/router](https://github.com/angular/angular) - update to version ^5.0.0
- [typescript](https://github.com/Microsoft/TypeScript) - update to version ~2.4.0

These have been moved from dependencies to devDependencies
- [@angular/cdk](https://github.com/angular/material2) - update to version ^5.0.0-rc0
- [@angular/material](https://github.com/angular/material2) - update to version ^5.0.0-rc0
- [@angular/material-moment-adapter](https://github.com/angular/material2) - update to version ^5.0.0-rc0
- [@ngx-formly/core](https://github.com/formly-js/ng-formly) - update to version ^2.0.0-beta.3
- [moment](https://github.com/moment/moment) - update to version ^2.19.1

### Updated peerDependencies
- [@angular/cdk](https://github.com/angular/material2) - update to version ^5.0.0-rc0
- [@angular/material](https://github.com/angular/material2) - update to version ^5.0.0-rc0
- [@ngx-formly/core](https://github.com/formly-js/ng-formly) - update to version ^2.0.0-beta.3
- [moment](https://github.com/moment/moment) - update to version ^2.19.1
