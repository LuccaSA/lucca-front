# departmentselect — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-departmentselect--docs)

## Angular

### Select

```js
import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';
```

```html
<label class="textfield mod-inline">
	<lu-department-select
		class="textfield-input"
		[appInstanceId]="appInstanceId()"
		[operations]="operations()"
		[filters]="filters()"
		[uniqueOperation]="uniqueOperation()"
		placeholder="Select a departement"
		data-testid="lu-select"
	/>
	<div class="textfield-label">Departement</div>
</label>

<label class="textfield mod-inline">
	<lu-department-select
		class="textfield-input"
		[appInstanceId]="appInstanceId()"
		[operations]="operations()"
		[filters]="filters()"
		[uniqueOperation]="uniqueOperation()"
		placeholder="Select a departement"
		multiple="true"
		data-testid="lu-select"
	/>
	<div class="textfield-label">Departement multiple</div>
</label>
```
