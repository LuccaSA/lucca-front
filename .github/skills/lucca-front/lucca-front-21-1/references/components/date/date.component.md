# date — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-forms-filterspills-date-angular--docs)

## Angular

### Filter pill

```js
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
```

```html
<lu-filter-pill label="Date de début" name="startDate">
	<lu-date-input [(ngModel)]="example" clearable />
</lu-filter-pill>

<pr-story-model-display>{{ example }}</pr-story-model-display>

<hr class="divider pr-u-marginBlock400" />

<lu-filter-pill label="Période" name="periode">
	<lu-date-range-input [(ngModel)]="examplePeriod" clearable />
</lu-filter-pill>

<pr-story-model-display>{{ examplePeriod | json }}</pr-story-model-display>
```
