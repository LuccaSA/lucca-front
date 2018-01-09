# Changelog

## In Dev
### New features
- `lu-user-picture` has size mod classes
- `lu-user-tile` has size mod classes, a `mod-nameOnly` and a `mod-vertical`
- New theming system
### Fixes
### Breaking changes
- The new theming system requires a new includePaths in your style preprocessors: `~@lucca-front/ng/src/style/overrides`
### Updated dependencies
### Updated devDependencies
- `ng-formly` fix display of error messages

### New featues
- `Select` Add the new select of lucca-front

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
