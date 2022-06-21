[![Build Status](https://travis-ci.org/LuccaSA/lucca-front.svg?branch=master)](https://travis-ci.org/LuccaSA/lucca-front)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=LuccaSA/lucca-front)](https://dependabot.com)

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
npm install @lucca-front/icons --save
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
* [palettes.override.scss](https://github.com/LuccaSA/lucca-front/blob/master/packages/scss/src/theming/_palettes.scss)

   Contains a map of the color themes (palette) used in the framework. Palette must have a `color` key but can be extended to as many keys as you need.
* [sizes.override.scss](https://github.com/LuccaSA/lucca-front/blob/master/packages/scss/src/theming/_sizes.scss)

  Contains a map of font sizes and spacings (padding & margin).

You only have to write down the variables you wish to modify or add. More details on each variable are available in the [SCSS demo](http://lucca-front.lucca.local/master/).

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
	xxxs: (
		"breakAt": 320px,
	),
	xxs: (
		"breakAt": 480px,
	),
	xs: (
		"breakAt": 640px,
	),
	s: (
		"breakAt": 800px,
	),
	m: (
		"breakAt": 1024px,
	),
	l: (
		"breakAt": 1280px,
	),
	xl: (
		"breakAt": 1366px,
	),
	xxl: (
		"breakAt": 1600px,
	),
	xxxl: (
		"breakAt": 1920px,
	)
);

$theme: _set($theme, "breakpoints", $breakpoints);
```
