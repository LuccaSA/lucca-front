# toasts — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-overlays-toasts--docs)

## Angular

Les toasts servent à afficher une information ou un callback dans un coin de l'application.

### Toasts

```js
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { defaultToastDuration, LuToastInput, LuToastsComponent, LuToastsService, LuToastType } from '@lucca-front/ng/toast';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
```

```html
<section class="contentSection" style="min-block-size: 20rem">
	<lu-toasts [sources]="[toastError$]" [bottom]="isBottom" />

	<div class="pr-u-displayFlex pr-u-gap100 pr-u-marginBlockEnd200">
		<button type="button" class="button mod-S" (click)="createToast('Info')">Toast</button>
		<button type="button" class="button mod-S mod-outlined palette-success" (click)="createToast('Success')">
			Toast success
		</button>
		<button type="button" class="button mod-S mod-outlined palette-warning" (click)="createToast('Warning')">
			Toast warning
		</button>
		<button type="button" class="button mod-S mod-outlined palette-error" (click)="notifyError()">Toast error</button>
	</div>

	<div class="pr-u-displayFlex pr-u-gap100 pr-u-marginBlockEnd200">
		<button type="button" class="button mod-S mod-outlined" (click)="createToast('Info', null)">
			Toast sans auto kill
		</button>
		<button type="button" class="button mod-S mod-outlined" (click)="createToast('Info', 2000)">Toast 2000ms</button>
		<button type="button" class="button mod-S mod-outlined" (click)="createToastWithTemplate('Info', toastMessage)">
			Toast avec template
		</button>
	</div>

	<ng-template #toastMessage>
		<button type="button" class="button mod-outlined" (click)="onClickButtonInsideToast()">Toast avec button</button>
	</ng-template>

	<label class="switch">
		<input class="switch-input" type="checkbox" name="switchList1" [(ngModel)]="isBottom" #ctrl="ngModel" />
		<span class="switch-label">Positionnement bas</span>
	</label>
</section>
```
