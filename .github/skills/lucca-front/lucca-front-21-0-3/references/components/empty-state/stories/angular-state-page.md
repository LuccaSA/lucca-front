# empty-state — State page _(Angular)_

```js
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStatePageComponent } from '@lucca-front/ng/empty-state';
```

```html
<lu-empty-state-page
	heading="Empty state page"
	slotTop=""
	description="Description can be a string or a ng-template"
	topRightBackground="https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg"
	topRightForeground="https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg"
	bottomLeftBackground="https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg"
	bottomLeftForeground="https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg"
	hx="1"
>
	<button luButton type="button" palette="product">Button</button>
	<button luButton="outlined" type="button">Button</button>
</lu-empty-state-page>
```
