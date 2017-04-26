## Create the component in /src

```
$ ng g module lol -a=src
installing module
  create src\app\lol\lol.module.ts
$ ng g component lol -a=src --export=true
installing component
  create src\app\lol\lol.component.scss
  create src\app\lol\lol.component.html
  create src\app\lol\lol.component.spec.ts
  create src\app\lol\lol.component.ts
  update src\app\lol\lol.module.ts
```

> - `-a=src` tells ng-cli to use application src, so it will generate everything in `/src/app/...`. by default it will use the demo application so you have to specify if you want to create something in `/src`
> - always generate the module first, that way you have a module for our new component
> - `--export=true` tells ng-cli to make the declaring module (here `LuLolModule`) to also export the component
don't forget to update the generated classes to add the prefix `Lu`: `LolModule` -> `LuLolModule`. it wll prevent conflicts for applications using the lib

### Necessary exports

`lol.module.ts` will be the entry point for imports and exports of your new component, so add this line

```ts
@NgModule({...})
export class LuLolModule { }
export { LuLolComponent } from './lol.component'; //this line
```

you need to add your module to the [LuRootModule](https://github.com/LuccaSA/lucca-front/blob/master/packages/ng/src/app/lu-root.module.ts) and make it export the `LuLolModule`

```ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuLolModule } from './lol/lol.module'; // add here

@NgModule({
	imports: [
		CommonModule,
		LuLolModule, // and here
	],
	export: [
		LuLolModule, //and here
	],
})
export class LuRootModule { }
```

also you need to export the `LuLolModule` and `LuLolComponent` in the file `/src/index.ts` because its the entry point for the publish library

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
$ ng g component lol -a=demo -is --spec=false --export=true
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
	],
	exports: [
		DemoLolComponent, // dont forget to export the component or you wont be able to use it
	],
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

### Add the auto generated documentation

the `SharedModule` contains components to display documentation and code snippets, so in your `DemoLolModule` import it

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoLolComponent } from './lol.component';
import { LuLolModule } from '../../../src';
import { BasicComponent } from './basic/basic.component';
import { SharedModule } from '../shared'; // here

@NgModule({
	imports: [
		CommonModule,
		LuLolModule,
		SharedModule, //here
	],
	declarations: [
		DemoLolComponent,
		BasicComponent,
	],

})
export class DemoLolModule { }
```

after that display the documentation with the component `DemoApiDocs` that i nabbed from ng-bootstrap, in lol.component.html use this

```html
<demo-api-docs directive="LuLolComponent"></demo-api-docs>
```

### Create your first code snippet

Each code snippet is a component, so you can use `ng g component`

```
$ ng g component lol/basic -is --spec=false --export=true
  create demo\app\lol\basic\basic.component.html
  create demo\app\lol\basic\basic.component.ts
  update demo\app\lol\lol.module.ts
```

> - the component has been added to `DemoLolModule`'s declarations but not exports, don't forget to fix that
> - you can change the selector in basic.component.ts so that there is no conflict with an other basic example of a component

add the snippets in your `DemoLolComponent` using prismjs

```ts
import { Component, OnInit } from '@angular/core';

declare var require: any; // don't forget this line

@Component({
	selector: 'demo-lol',
	templateUrl: './lol.component.html',
	styles: []
})
export class DemoLolComponent implements OnInit {

	constructor() { }

	snippets = { // here
		basic: {
			code: require('!!prismjs-loader?lang=typescript!./basic/basic.component'),
			markup: require('!!prismjs-loader?lang=markup!./basic/basic.component.html')
		},
	}
	ngOnInit() {
	}
}
```

this will parse the files with the right synthax so the `ExampleBoxComponent` that i pinched from ng-bootstrap can display them, add the right html and voila

```html
<demo-api-docs directive="LuLolComponent"></demo-api-docs>

<demo-example-box [snippets]="snippets" demo="basic">
	<demo-lol-basic></demo-lol-basic>
</demo-example-box>
```

You can now start working on your code snippet or add any other code snippet the same way you added _basic_

```html
<demo-api-docs directive="LuLolComponent"></demo-api-docs>

<demo-example-box [snippets]="snippets" demo="basic">
	<demo-lol-basic></demo-lol-basic>
</demo-example-box>
<demo-example-box [snippets]="snippets" demo="advanced">
	<demo-lol-advanced></demo-lol-advanced>
</demo-example-box>
<demo-example-box [snippets]="snippets" demo="debug">
	<demo-lol-debug></demo-lol-debug>
</demo-example-box>
```