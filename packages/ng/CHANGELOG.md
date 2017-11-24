# Changelog

## In Dev
### New features
- `LFAnimationFactory` generates simple Angular animations. Three major types are available: `fade`, `scale`, `slide`.

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
