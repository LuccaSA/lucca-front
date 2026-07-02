# tile — Tile _(Angular)_

```js
import { bob } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuUserTileComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/user-popover';
```

```html
<div class="pr-u-displayFlex pr-u-gap300">
	<button [luUserPopover]="bob" type="button" class="userPopover_trigger">
		<lu-user-tile [user]="bob" />
	</button>
	<lu-user-tile [user]="bob" displayFormat="LF" role="Administrateur" />
	<lu-user-tile [user]="bob" size="L" />
</div>
```
