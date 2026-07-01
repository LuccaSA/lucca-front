# activity-feed — Basic _(Angular)_

```js
import { finn } from '@/stories/users/user.mocks';
import { LOCALE_ID } from '@angular/core';
import { ActivityFeedComponent, ActivityFeedStepComponent, ActivityFeedUpdateComponent } from '@lucca-front/ng/activity-feed';
import { CommentComponent } from '@lucca-front/ng/comment';
import { FileEntryComponent } from '@lucca-front/ng/file-upload';
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { ButtonComponent } from '@lucca/prisme/button';
```

```html
<lu-activity-feed>
	<lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor." />
	<lu-activity-feed-step [user]="user" [date]="date" label="Lorem ipsum dolor." />
</lu-activity-feed>
```
