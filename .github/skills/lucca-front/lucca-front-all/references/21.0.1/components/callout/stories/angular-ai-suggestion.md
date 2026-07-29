# callout — Ai suggestion _(Angular)_

```js
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutActionsComponent, CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
<div class="suggestion">
	<lu-form-field label="Intitulé" class="suggestion-form-field">
		<lu-text-input required type="text" [(ngModel)]="example" />
	</lu-form-field>
	<lu-callout AI iconAlt="Assistant IA" icon="weatherStars" class="suggestion-callout">
		<div class="suggestion-callout-text">Optimiser l’utilisation des composants de formulaire selon les besoins</div>
		<lu-callout-actions inline>
			<button luButton="outlined" class="suggestion-callout-accept">
				<lu-icon icon="signConfirm" alt="Accepter" />
			</button>
			<button luButton="outlined" class="suggestion-callout-reject"><lu-icon icon="signClose" alt="Refuser" /></button>
		</lu-callout-actions>
	</lu-callout>
</div>
```
