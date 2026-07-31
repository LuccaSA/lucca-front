# horizontalnavigation — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-navigation-horizontalnavigation-angular--docs)

## Angular

### Basic

```js
import { provideRouter } from '@angular/router';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```

```html
<lu-horizontal-navigation>
	<a
		*luHorizontalNavigationLink
		class="horizontalNavigation-list-item-action"
		routerLink="/"
		ariaCurrentWhenActive="page"
	>
		Page 1
	</a>
	<a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action" href="#2" aria-current="page">Page 2</a>
	<a *luHorizontalNavigationLink class="horizontalNavigation-list-item-action is-disabled">Page 3</a>
</lu-horizontal-navigation>
```

## HTML/CSS

### Accessibilité

* L’attribut `aria-current="page"` permet d’indiquer la page courante à la fois sémantiquement et visuellement.
* Si vous devez ajouter un titre sémantique HTML à votre menu d’onglets, préférez d'ajouter ce titre directement dans la section de chaque panneau en utilisant la class `pr-u-mask`. Ne mélangez pas la navigation et la sémantique de titres.

Ma navigation :

Dans le composant :

### Basic

```css
@forward '@lucca-front/scss/src/components/horizontal-navigation';
```

```html
<div class="horizontalNavigation">
	<ul class="horizontalNavigation-list">
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action" aria-current="page">Page 1</a>
		</li>
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action">Page 2</a>
		</li>
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action">Page 3</a>
		</li>
	</ul>
</div>
```
