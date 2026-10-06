# sidepanel — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-navigation-sidepanel--docs)

## Angular

### Navigation sidepanel

```js
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuModalContent } from '@lucca-front/ng/modal';
import { LuSidepanel, LuSidepanelModule } from '@lucca-front/ng/sidepanel';
import { ILuSidepanelContent, LuSidepanel, LuSidepanelModule } from '@lucca-front/ng/sidepanel';
```

```html
<p>General Kenobi</p>
```

```html
<h1>Sidepanels</h1>

<button type="button" class="button" (click)="openSidepanel()">Open sidepanel</button>
```

### Overlays sidepanel

```js
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuModalContent, LuModal, LuModalModule } from '@lucca-front/ng/modal';
import { LuSidepanel, LuSidepanelModule } from '@lucca-front/ng/sidepanel';
import { LuToastsModule, LuToastsService } from '@lucca-front/ng/toast';
import { map, shareReplay, timer } from 'rxjs';
import { LuSidepanelModule } from '@lucca-front/ng/sidepanel';
```

```html
<p>General Kenobi</p>
```

```html
<lu-toasts [sources]="[]" />
<div class="pr-u-marginBlockEnd200">
	<button type="button" class="button" (click)="openSidepanel()">Open</button>
	<button type="button" class="button" (click)="openDynamicContentSidepanel()">Open (Dynamic)</button>
	<button type="button" class="button" (click)="openUndismissableSidepanel()">Open (Backdrop event)</button>
</div>
<div>
	<button type="button" class="button mod-outlined" (click)="openLegacySidepanel()">Open (Legacy)</button>
	<button type="button" class="button mod-outlined" (click)="openLegacyDynamicContentSidepanel()">
		Open (Legacy & dynamic)
	</button>
</div>
```
