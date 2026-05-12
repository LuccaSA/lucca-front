# empty-state — State page _(Angular)_

```js
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStatePageComponent } from '@lucca-front/ng/empty-state';
```

```html
<lu-empty-state-page
	heading="${…}"
	slotTop="${…}"
	description="${…}"
	${…}
	${…}
	${…}
	${…}
	${…}
	hx="${…}"
>
	<button luButton type="button" palette="product">Button</button>
	<button luButton="outlined" type="button">Button</button>
</lu-empty-state-page>
```
