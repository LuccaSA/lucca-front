# app-layout — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-structure-app-layout-angular-basic--docs)

## Angular

### Basic

```js
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
```

```html
<lu-app-layout>
	<ng-container appLayoutBanner>banner</ng-container>
	<ng-container appLayoutNavSide>navSide</ng-container>
	main
</lu-app-layout>
```


## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/appLayout';
```

```html
<div class="appLayout">
	<div class="appLayout-banner">banner</div>
	<div class="appLayout-navSide">navSide</div>
	<div class="appLayout-main">main</div>
</div>
```
