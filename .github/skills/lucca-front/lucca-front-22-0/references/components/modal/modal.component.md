# modal — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-overlays-modal--docs)

## Angular

🚧 Modal utilise aujourd'hui le nouveau service Dialog par défaut. Il est prévu de la conserver en tant qu'outil permettant de créer rapidement une fenêtre de dialogue et sera ainsi renommée dans le futur.

### Modal

```js
import { ChangeDetectionStrategy, Component, inject, input, Type } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { ILuModalContent, LU_MODAL_DATA, LuModal, LuModalConfig, LuModalModule } from '@lucca-front/ng/modal';
import { LuToastsModule, LuToastsService } from '@lucca-front/ng/toast';
import { map, shareReplay, timer } from 'rxjs';
import { ILuModalContent } from '@lucca-front/ng/modal';
import { ILuModalContent, LU_MODAL_DATA } from '@lucca-front/ng/modal';
```

```html
<p>General Kenobi</p>
```

```html
<p>{{ message }}</p>
```

```html
<lu-toasts [sources]="[]" />
<button type="button" luButton (click)="openModal()">Open</button>
```

```html
<p>{{ data.message }}</p>
```
