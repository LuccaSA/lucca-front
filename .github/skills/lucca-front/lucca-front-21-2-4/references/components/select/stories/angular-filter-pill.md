# select — Filter pill _(Angular)_

```js
import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectUsersDirective, provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
```

```html
<lu-filter-pill label="Légume" name="legume">
	<lu-simple-select [(ngModel)]="example" [options]="legumes | filterLegumes: clue" (clueChange)="clue = $event" />
</lu-filter-pill>

<pr-story-model-display>{{ example | json }}</pr-story-model-display>

<hr class="divider pr-u-marginBlock400" />

<lu-filter-pill label="Légume" name="legume">
	<lu-multi-select
		[(ngModel)]="examples"
		[options]="legumes | filterLegumes: clue"
		(clueChange)="clue = $event"
		filterPillLabelPlural="légumes"
	/>
</lu-filter-pill>

<pr-story-model-display>{{ examples | json }}</pr-story-model-display>

<hr class="divider pr-u-marginBlock400" />

<lu-filter-pill label="Utilisateur" name="user">
	<lu-simple-select [(ngModel)]="user" users enableFormerEmployees />
</lu-filter-pill>

<pr-story-model-display>{{ user | json }}</pr-story-model-display>
```
