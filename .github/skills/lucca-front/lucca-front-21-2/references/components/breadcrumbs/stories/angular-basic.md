# breadcrumbs — Basic _(Angular)_

```js
import { BreadcrumbsComponent, BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
```

```html
<lu-breadcrumbs>
	<a *luBreadcrumbsLink routerLink="/" ariaCurrentWhenActive="page">You</a>
	<a *luBreadcrumbsLink ariaCurrentWhenActive="page" href="#2">are</a>
	<a *luBreadcrumbsLink aria-current="page">here</a>
</lu-breadcrumbs>
```
