# userpopover — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-users-display-userpopover--docs)

## Angular

### Popover

```js
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuUserDisplayModule } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

```html
<button type="button" class="userPopover_trigger" [luUserPopover]="finn" translate="no">
	{{ finn | luUserDisplay: "lf" }}
</button>
```
