# empty-state — State page onboarding _(Angular)_

```js
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStatePageComponent, EmptyStatePageIllustration } from '@lucca-front/ng/empty-state';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { TagComponent } from '@lucca-front/ng/tag';
```

```html
<lu-empty-state-page
	heading="${…}"
	[slotTop]="slotTop"
	[illustration]="illustration"
	[description]="description"
	hx="${…}"
>
	<button luButton type="button">Créer une campagne</button>
</lu-empty-state-page>

<ng-template #slotTop><lu-tag label="Inclus dans votre abonnement" /></ng-template>
<ng-template #description>
	<lu-listing orderedFancy>
		<lu-listing-item>Les responsables proposent les augmentations.</lu-listing-item>
		<lu-listing-item>Les augmentations sont commentées, révisées.</lu-listing-item>
		<lu-listing-item>Vous contrôlez, validez ces augmentations et décidez de leur mise en œuvre.</lu-listing-item>
	</lu-listing>
</ng-template>
<ng-template #illustration>
	<lu-empty-state-page-illustration${…}${…} />
</ng-template>
```
