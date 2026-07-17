# avatar — Basic _(Angular)_

```js
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDisplayInitials, LuUserPictureComponent, USER_PICTURE_SIZE } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
import { finn, georges, jake } from '../../user.mocks';
```

```html
<button class="userPopover_trigger" type="button" [luUserPopover]="user">
	<lu-user-picture
		[user]="user"
		[displayFormat]="displayFormat"
		data-testid="lu-user-picture"
		[class.mod-placeholder]="placeholder"
	/>
</button>
```
