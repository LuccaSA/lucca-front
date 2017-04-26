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

### Necessary exports

`lol.module.ts` will be the entry point for imports and exports of your new component, so add this line

```ts
@NgModule({...})
export class LuLolModule { }
export { LuLolComponent } from './lol.component';
```

you need to add your module to the [LuRootModule](https://github.com/LuccaSA/lucca-front/blob/master/packages/ng/src/app/lu-root.module.ts)

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

also you need to export the `LuLolModule` and `LuLlComponent` in the file `/src/index.ts` because its the entry point for the publish library

```ts
export * from './app/lol/lol.module';
// or specifically
// export { LuLolModule, LuLolComponent } from './app/lol/lol.module';
export { LuRootModule } from './app/lu-root.module';
```

### inline documentation

there's a script that i copied from [ng-bootstrap](https://ng-bootstrap.github.io) to generate documentation from the code. It can parse inline documentation so it would be highly appreciated if you document your component's input and putput

```ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/**
 * a short documentation of the component
 */
@Component({
	selector: 'lu-lol', // the selector will be extracted by the documentation script
	templateUrl: './lol.component.html',
	styleUrls: ['./lol.component.scss']
})
export class LuLolComponent implements OnInit {
	/**
	 * a short documentation of the input
	 * the type of the input will be inferred with its default value
	 */
	@Input() myInput = 4;

	/**
	 * a short documentation of the output
	 */
	@Output() myOutput = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

}
```

```ts
const API_DOCS = {
  "LuLolComponent": {
    "fileName": "src/app/lol/lol.component.ts",
    "className": "LuLolComponent",
    "description": "a short documentation of the component",
    "selector": "lu-lol",
    "inputs": [
      {
        "name": "myInput",
        "defaultValue": "4",
        "type": "number",
        "description": "a short documentation of the input\nthe type of the input will be inferred with its default value"
      }
    ],
    "outputs": [
      {
        "name": "myOutput",
        "description": "a short documentation of the output"
      }
    ],
    "properties": [],
    "methods": []
  },
```

## Create the doc component in the demo

If you want a web page to work and develop your component, the demo app is there for you. It's organized around a router with a route per component (DIP), and for each route, the documentation associated with the component and a series of code snippets to serve as examples.

It is recommended you work inside one of the code snippet that will become an example afterwards, that way you start writing documentation while working and debugging your code.

### Add a route for your component

first create the component that will be instanciated on that route.

```
$ ng g module lol -a=demo
  create demo\app\lol\lol.module.ts
$ ng g component lol -a=demo -is --spec=false
  create demo\app\lol\lol.component.html
  create demo\app\lol\lol.component.ts
  update demo\app\lol\lol.module.ts
```

> - that will create a `LolModule` and `LolComponent`, you can rename them `DemoLolModule` and `DemoLolComponent` but its not mandatory, they will not be published in the npm package
> - `-is` (for Inline Style) is an option of ng generate to include the style in the ts file, here you wont be needing any style for this component
> - `-spec=false` is also an option of ng generate to tell it to not generate a .spec file, we dont really need it

then import the `LuLolModule` in your `DemoLolModule`

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoLolComponent } from './lol.component';
import { LuLolModule } from '../../../src';

@NgModule({
	imports: [
		CommonModule,
		LuLolModule,
	],
	declarations: [
		DemoLolComponent,
	]
})
export class DemoLolModule { }
```

then and import the `DemoLolModule` in the app module

```ts
import { DemoLolModule } from './lol/lol.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		DemoLolModule,
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
```

then add the route (DIP) cf issue #17

### Create your first code snippet

Each code snippet is a component, so you can use `ng g component`

```
$ ng g component lol/basic -is --spec=false
  create demo\app\lol\basic\basic.component.html
  create demo\app\lol\basic\basic.component.ts
  update demo\app\lol\lol.module.ts
```


# Versionning

the versionning strategy for all packages under `@lucca-front` follows the same rules as the ones under `@angular`. Every package will have the same version to avoid having `/scss` version 2.1 depending on `/icons` 1.3 but `/ng` depends on `/scss` 1.4 in its version `2.2`.

so to avoid unnecessary complexity, all sub-packages will change version at the same time: 

> `/ng#1.3.0` depends on `/scss#1.3.0` which depends on `/icons#1.3.0`