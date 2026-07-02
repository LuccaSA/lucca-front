# checkbox — Filter pill _(Angular)_

```js
import { FormsModule } from '@angular/forms';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
```

```html
<lu-filter-pill label="Inclure les collaborateurs partis" name="includeFormerEmployees">
	<lu-checkbox-input [(ngModel)]="checkboxValue" />
</lu-filter-pill>

<pr-story-model-display>{{ checkboxValue }}</pr-story-model-display>
```
