# resource-card — Dnd _(Angular)_

```js
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { ResourceCardButtonComponent, ResourceCardComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
```

```html
<lu-resource-card-wrapper cdkDropList draggable${…}>${…}</lu-resource-card-wrapper>
```
