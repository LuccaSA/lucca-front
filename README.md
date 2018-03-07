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
