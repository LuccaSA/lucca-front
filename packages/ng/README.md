# tl;dr

This is the part of the framework dedicated to [angular](https://angular.io/). It contains a set of tools and components to help develop an agular web application like

 - some usefull components (DIP)
 - a scss plugin to map angular standard classes (`ng-valid`, `ng-empty`) to `@lucca-front/sccs` style
 - a scss plugin for styling classic third party library like [ng-material](https://material.angular.io/components) or [ng-bootstrap](https://ng-bootstrap.github.io) (DIP)

see demo (DIP) for more details on what is available

# Install and use

```
npm install @lucca-front/ng --save
```

## Use components

Each component will have its own module to facilitate dependency injection. So if you want a specific component just do that

```ts
import { NgModule } from '@angular/core';
import { LuLolModule } from '@lucca-front/ng';
@NgModule({
  imports: [
    LuLolModule,
  ],
  providers: [],
})
export class MyModule { }
```

If you dont want to pick'n'mix and just import everything from lucca-front/ng, do that

```ts
import { NgModule } from '@angular/core';
import { LuRootModule } from '@lucca-front/ng';
@NgModule({
  imports: [
    LuRootModule,
  ],
  providers: [],
})
export class MyModule { }
```

## Use scss plugins

DIP

# Contribute

the code is split between 2 folders:

 - `/src`: that's the source code, the code that will be published
 - `/demo`: the code used for the demo web app and also serve as development environment

both are angular-cli applications.

You can find a step by step procedure to add a component to the lib and its page on the demo, themn start the development of said component in the file [step-by-step.md](https://github.com/LuccaSA/lucca-front/blob/master/packages/ng/step-by-step.md)

See golden rules for contributing in the [CONTRIBUTING.md](https://github.com/LuccaSA/lucca-front/blob/master/packages/ng/CONTRIBUTING.md)

# Versionning

the versionning strategy for all packages under `@lucca-front` follows the same rules as the ones under `@angular`. Every package will have the same version to avoid having `/scss` version 2.1 depending on `/icons` 1.3 but `/ng` depends on `/scss` 1.4 in its version `2.2`.

so to avoid unnecessary complexity, all sub-packages will change version at the same time: 

> `/ng#1.3.0` depends on `/scss#1.3.0` which depends on `/icons#1.3.0`