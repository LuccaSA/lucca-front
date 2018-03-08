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

### Create override files

It will allow you to customize scss & ng components.
Create an override folder (for exemple src/scss/overrides/) and add these empty files in in

```
breakpoints.override.scss
commons.override.scss
components.override.scss
icons.override.scss
palettes.override.scss
sizes.override.scss
```

Paste this in icons.override.scss (will be improved later)

```
$icons: (
	"prefix": "icon",
	"font-path": "//cdn.lucca.fr/lucca-front/icons/latest/font/lucca-icons",
);
$theme: _set($theme, "icons", $icons);
```

### Import scss and overrides

Import Lucca Front in src/style.scss

```
@import "~@lucca-front/scss/src/main.overridable.scss";
```

In angular-cli.json, edit your style path and add the path of your overrides folder

```
"apps": [
	...
	"styles": [
		"styles.scss"		
	],
  	"stylePreprocessorOptions": {
        	"includePaths": ["scss/overrides"]
     	},
	...
],
```

### Import fonts

Don't forget to add your fonts in src/index.html

```
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600,700" rel="stylesheet">
```

## Theming
### Palettes

You can set up a custom palette in palettes.override.scss Your palette will be accessible on some components with `palette-*` classes:

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
