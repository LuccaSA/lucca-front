# horizontalnavigation — Navigation basic _(Angular)_

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
