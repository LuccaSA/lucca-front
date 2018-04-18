[![Build Status](https://travis-ci.org/LuccaSA/lucca-front.svg?branch=master)](https://travis-ci.org/LuccaSA/lucca-front)
# lucca-front

A modular framework for developing web application by [lucca](http://www.lucca.fr).
Uses sub-packages architecture with unified versioning, a la [angular](https://github.com/angular/angular).

## Contains

 - a set of icons
 - a scss framework
 - a library of usefull angular components

## How to install

### Add Lucca Front to your npm package

```
npm install @lucca-front/icon --save
npm install @lucca-front/scss --save
npm install @lucca-front/ng --save
```

### Import scss and NG style

Import Lucca Front in src/style.scss (or your main scss file):

```
@import "~@lucca-front/scss/src/main.overridable.scss";
```

In angular-cli.json, add this to your stylePreprocessorOptions includePaths:

```
"apps": [
	...
	"styles": [
		"styles.scss"		
	],
	"stylePreprocessorOptions": {
		"includePaths": [
			"path_to_node_modules/@lucca-front/scss/src/overrides",
			"path_to_node_modules/@lucca-front/ng/src/style/overrides" // if you use the ng package
		]
	},
	...
],
```

### Import fonts

If you are using our default font (Source Sans Pro), don't forget to add your fonts in your `<header>`:

```
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600,700" rel="stylesheet">
```

## Theming
### Setup

You can override many variables to tailor Lucca-Front style to your needs.
To do so, you must create a folder and reference it in your angular-cli.json as a stylePreprocessorOptions includePaths
```
"apps": [
	...
	"stylePreprocessorOptions": {
		"includePaths": [
			"path_to_node_modules/@lucca-front/scss/src/overrides",
			"path to your override folder"
		]
	},
	...
],
```

In your override folder, you can create different files for different needs :
* [breakpoints.override.scss](https://github.com/LuccaSA/lucca-front/blob/master/packages/scss/src/theming/_breakpoints.scss)

   Contains a map of breakpoints values.
* [commons.override.scss](https://github.com/LuccaSA/lucca-front/blob/master/packages/scss/src/theming/_commons.scss)

   Contains a map of the most common values such as border-radius, font-family, and so on.
* [components.override.scss](https://github.com/LuccaSA/lucca-front/blob/master/packages/scss/src/theming/_components.scss)

   Can either have directly components maps such as the [button map](https://github.com/LuccaSA/lucca-front/blob/master/packages/scss/src/theming/components/_button.theme.scss).
	 Or it can just be a file importing every component theme override you have
* [icons.override.scss](https://github.com/LuccaSA/lucca-front/blob/master/packages/scss/src/theming/_icons.scss)

   Contains a map of with the prefix (class) used for the icons and the path to the icon file (without its extension).
* [palette.override.scss](https://github.com/LuccaSA/lucca-front/blob/master/packages/scss/src/theming/_palettes.scss)

   Contains a map of the color themes (palette) used in the framework. Palette must have a `color` key but can be extended to as many keys as you need.

You only have to write down the variables you wish to modify or add. More details on each variable are available in the [SCSS demo](https://latest-lucca-front-luccasa.surge.sh/).

### Palettes

You can set a custom palette in palettes.override.scss. Your palette will be accessible in some components with `palette-*` classes.

```
$palettes: (
	"primary": (
		"color": #FFCC00,
		"text": #666666,
	),
	"secondary": (
		"color": #FF6600,
		"text": #FFFFFF,
	),
	"success": (
		"color": #9ACD32,
		"text": #FFFFFF,
	),
	"warning": (
		"color": #FF9900,
		"text": #FFFFFF,
	),
	"error": (
		"color": #FF3300,
		"text": #FFFFFF,
	),
);

$colors: (
	text: (
		"default": #666666,
		"light": #999999,
		"placeholder": #CCCCCC,
	),
);
$theme: _set($theme, "palettes", $palettes);
$theme: _set($theme, "colors", $colors);
```

You can also call your palette colors in your own components:

```
@import "~@lucca-front/scss/src/theming.overridable";
_color("primary")
_color("primary", "text")
_color("text.default")
```

### Breakpoints

You can set up custom breakpoints values in breakpoints.override.scss

```
$breakpoints: (
	"xs": (
		"breakAt": 0,
		"spacing": 0,
	),
	"sm": (
		"breakAt": 576px,
		"spacing": 20px,
	),
	"md": (
		"breakAt": 768px,
		"spacing": 30px,
	),
	"lg": (
		"breakAt": 992px,
		"spacing": 40px,
	),
	"xl": (
		"breakAt": 1200px,
		"spacing": 60px,
	),
	"xxl": (
		"breakAt": 1350px,
		"spacing": 60px,
	),
	"xxxl": (
		"breakAt": 1500px,
		"spacing": 60px,
	)
);
$theme: _set($theme, "breakpoints", $breakpoints);
```
