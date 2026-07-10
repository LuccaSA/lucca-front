# resource-card — Basis _(Angular)_

```js
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { RESOURCE_CARD_SIZE, ResourceCardButtonComponent, ResourceCardComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
```

```html
<lu-resource-card>
	<a href="#" luResourceCardAction luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor</a>
</lu-resource-card>
```
