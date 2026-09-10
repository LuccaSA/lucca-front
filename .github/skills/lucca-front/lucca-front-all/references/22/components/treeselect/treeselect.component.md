# treeselect — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-treeselect--docs)

## Angular

### Select

```js
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FilterBarComponent, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
```

```html
<lu-form-field label="Basic tree multi-select">
	<lu-multi-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Multi-select tree" clearable />
</lu-form-field>
<br />
```

```html
<lu-form-field label="Basic tree multi-select">
	<lu-multi-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Multi-select tree" />
</lu-form-field>
<br />
<lu-form-field label="Basic tree simple-select">
	<lu-simple-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Simple-select tree" />
</lu-form-field>
<br />
<lu-divider />
<lu-form-field label="Department multi-select">
	<lu-multi-select departments placeholder="Multi-select tree" />
</lu-form-field>
<br />
<lu-form-field label="Department simple-select">
	<lu-simple-select departments placeholder="Simple-select tree" />
</lu-form-field>
<br />
<lu-divider />
<lu-filter-bar>
	<lu-filter-pill label="Légumes">
		<lu-multi-select filterPillLabelPlural="légumes" [treeSelect]="groupingFn" [options]="allLegumes" />
	</lu-filter-pill>
	<lu-filter-pill label="Départements">
		<lu-multi-select departments filterPillLabelPlural="départements" />
	</lu-filter-pill>
	<lu-filter-pill label="Légume">
		<lu-simple-select [treeSelect]="groupingFn" [options]="allLegumes" />
	</lu-filter-pill>
	<lu-filter-pill label="Département">
		<lu-simple-select departments />
	</lu-filter-pill>
</lu-filter-bar>
```
