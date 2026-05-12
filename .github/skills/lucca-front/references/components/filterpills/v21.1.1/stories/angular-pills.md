# filterpills — Pills _(Angular)_

```js
import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
```

```html
<lu-filter-pill label="Inclure les collaborateurs partis">
	<lu-checkbox-input [ngModel]="false"></lu-checkbox-input>
</lu-filter-pill>
<lu-filter-pill label="Legumes" name="legume">
	<lu-multi-select
		[ngModel]="[]"
		${…}
		[options]="legumes | filterLegumes: clue"
		[totalCount]="legumes.length"
		(clueChange)="clue = $event"
		filterPillLabelPlural="légumes"
	/>
</lu-filter-pill>
<lu-filter-pill label="Legume" name="department">
	<lu-simple-select [ngModel]="null" ${…} [options]="legumes | filterLegumes: clue" />
</lu-filter-pill>
<lu-filter-pill label="Départements" name="departments">
	<lu-multi-select [ngModel]="[]" ${…}filterPillLabelPlural="départements" departments />
</lu-filter-pill>
<lu-filter-pill label="Tree simple">
	<lu-simple-select [ngModel]="null" ${…}[treeSelect]="groupingFn" [options]="legumes" />
</lu-filter-pill>
<lu-filter-pill label="Tree multi">
	<lu-multi-select
		[ngModel]="[]"
		${…}filterPillLabelPlural="légumes"
		[treeSelect]="groupingFn"
		[options]="legumes"
	/>
</lu-filter-pill>
<lu-filter-pill label="Date de début">
	<lu-date-input [ngModel]="null" ${…} />
</lu-filter-pill>
<lu-filter-pill label="Période">
	<lu-date-range-input [ngModel]="null" ${…}[(ngModel)]="dateRange" />
</lu-filter-pill>
```
