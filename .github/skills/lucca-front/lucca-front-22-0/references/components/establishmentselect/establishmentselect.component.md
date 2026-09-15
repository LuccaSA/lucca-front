# establishmentselect — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-establishmentselect--docs)

## Angular

### Select

```js
import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuEstablishmentSelectInputComponent } from '@lucca-front/ng/establishment';
```

```html
<label class="textfield mod-inline pr-u-marginInlineEnd200">
	<lu-establishment-select class="textfield-input" placeholder="Select an establishment" data-testid="lu-select" />
	<span class="textfield-label">Establishment Select</span>
</label>
<label class="textfield mod-inline">
	<lu-establishment-select
		class="textfield-input"
		placeholder="Select an establishment"
		[multiple]="multiple()"
		data-testid="lu-select-multiple"
	/>
	<span class="textfield-label">Establishment Multiple Select</span>
</label>
```
