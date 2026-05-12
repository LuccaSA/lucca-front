# empty-state — State section _(Angular)_

```js
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { PaletteArgType } from '../../../../helpers/common-arg-types';
```

```html
<lu-empty-state-section
	illustration="${…}"
	hx="${…}"
	heading="${…}"
	description="${…}"
	${…}${…}${…}
>
	<button luButton type="button" palette="product">Button</button>
	<button luButton="outlined" type="button">Button</button>
</lu-empty-state-section>
```
