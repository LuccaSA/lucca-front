# callout — Ai action _(Angular)_

```js
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutActionsComponent, CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
<lu-callout AI iconAlt="Assistant IA" icon="weatherStars">
	<p>
		<strong>Achat détecté :</strong>
		la facture correspond à l’
		<a href="#">achat nº 832</a>
	</p>
	<lu-callout-actions>
		<button luButton="outlined">Associer</button>
		<button luButton="outlined">Refuser</button>
	</lu-callout-actions>
</lu-callout>
```
