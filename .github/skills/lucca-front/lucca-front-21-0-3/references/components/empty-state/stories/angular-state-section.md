# empty-state — State section _(Angular)_

```js
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { PaletteArgType } from '../../../../helpers/common-arg-types';
```

```html
<lu-empty-state-section
	hx="3"
	icon="https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconRocket.svg"
	heading="Empty state section"
	description="Description can be a string or a ng-template"
	palette="none"
>
	<button luButton type="button" palette="product">Button</button>
	<button luButton="outlined" type="button">Button</button>
</lu-empty-state-section>
```
