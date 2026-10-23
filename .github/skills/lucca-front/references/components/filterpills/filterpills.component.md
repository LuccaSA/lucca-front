# filterpills — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-filterspills-filterpills-angular--docs)

## Angular

🧩 Les FilterPills sont conçus pour être utilisés au sein d'une FilterBar. Cette dernière couvre notamment les besoins d'ajout de filtre et de recherche.

Component selector : `lu-filter-pill`

### Pills

```js
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent, luFilterPillsTranslations } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
```

```html
<lu-filter-pill label="Inclure les collaborateurs partis">
	<lu-checkbox-input [ngModel]="false"></lu-checkbox-input>
</lu-filter-pill>
<lu-filter-pill label="Légume (multi)" name="legume">
	<lu-multi-select
		[ngModel]="[]"
		[options]="legumes | filterLegumes: clue"
		[totalCount]="legumes.length"
		(clueChange)="clue = $event"
		[filterPillLabelPluralFn]="legumesPluralFn"
	/>
</lu-filter-pill>
<lu-filter-pill label="Legume (simple)" name="department">
	<lu-simple-select [ngModel]="null" [options]="legumes | filterLegumes: clue" />
</lu-filter-pill>
<lu-filter-pill label="Départements" name="departments">
	<lu-multi-select [ngModel]="[]" [filterPillLabelPluralFn]="departmentsPluralFn" departments />
</lu-filter-pill>
<lu-filter-pill label="Tree (simple)">
	<lu-simple-select [ngModel]="null" [treeSelect]="groupingFn" [options]="legumes" />
</lu-filter-pill>
<lu-filter-pill label="Tree (multi)">
	<lu-multi-select
		[ngModel]="[]"
		[filterPillLabelPluralFn]="treeLegumesPluralFn"
		[treeSelect]="groupingFn"
		[options]="legumes"
	/>
</lu-filter-pill>
<lu-filter-pill label="Date de début">
	<lu-date-input [ngModel]="null" />
</lu-filter-pill>
<lu-filter-pill label="Période">
	<lu-date-range-input [ngModel]="null" [(ngModel)]="dateRange" />
</lu-filter-pill>
```
