# tile — Tile _(Angular)_

```js
import { finn, jake, marceline } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuUser, LuUserTileComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
import { LuUserPopoverStore } from '@lucca-front/ng/user-popover/service/user-popover.store';
import { of } from 'rxjs';
```

```html
<lu-user-tile [user]="user" />
```
