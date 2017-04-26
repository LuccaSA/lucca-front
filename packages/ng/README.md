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

## Use component

Each component will have its own module to facilitate dependency injection. So if you want a specific component just do that

```ts
import { NgModule } from '@angular/core';
import { LuBogusModule } from '@lucca-front/ng';
@NgModule({
  imports: [
    LuBogusModule,
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

Here is a step by step procedure if you want to add a component to the framework

## Create the component in /src

```
$ ng g module lol -a=src
installing module
  create src\app\lol\lol.module.ts
$ ng g component lol -a=src
installing component
  create src\app\lol\lol.component.scss
  create src\app\lol\lol.component.html
  create src\app\lol\lol.component.spec.ts
  create src\app\lol\lol.component.ts
  update src\app\lol\lol.module.ts
```

`-a=src` tells ng-cli to use application src, so it will generate everything in `/src/app/...`. by default it will use the demo application so you have to specify if you want to create something in `/src`

always generate the module first, that way you have a module for our new component

don't forget to update the generated classes to add the prefix `Lu`: `LolModule` -> `LuLolModule`. it wll prevent conflicts for applications using the lib

then add your module to the [LuRootModule](https://github.com/LuccaSA/lucca-front/blob/master/packages/ng/src/app/lu-root.module.ts)

```ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuLolModule } from './lol/lol.module'; // add here

@NgModule({
	imports: [
		CommonModule,
		LuLolModule, // and here
	],
})
export class LuRootModule { }

```

## Create 

start dev server by launching `npm start` and go to http://localhost:4200.



# Versionning

the versionning strategy for all packages under `@lucca-front` follows the same rules as the ones under `@angular`. Every package will have the same version to avoid having `/scss` version 2.1 depending on `/icons` 1.3 but `/ng` depends on `/scss` 1.4 in its version `2.2`.

so to avoid unnecessary complexity, all sub-packages will change version at the same time: 

> `/ng#1.3.0` depends on `/scss#1.3.0` which depends on `/icons#1.3.0`