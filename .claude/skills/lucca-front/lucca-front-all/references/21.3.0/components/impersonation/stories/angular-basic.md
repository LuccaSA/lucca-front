# impersonation — Basic _(Angular)_

```js
import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { ImpersonationComponent } from '@lucca-front/ng/impersonation';
import { createTestStory, generateInputs } from '../../../../helpers/stories';
import { waitForAngular } from '../../../../helpers/test';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
```

```html
<lu-impersonation [(selectedUser)]="example" (clear)="example = me" />

<pr-story-model-display>{{ example | json }}</pr-story-model-display>
```
