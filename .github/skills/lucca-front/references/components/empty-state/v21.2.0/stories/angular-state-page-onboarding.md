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
	class="palette-pagga"
	heading="Augmentez vos collaborateurs en 3 étapes"
	[slotTop]="slotTop"
	[illustration]="illustration"
	[description]="description"
	hx="1"
>
	<button luButton type="button">Créer une campagne</button>
</lu-empty-state-page>

<ng-template #slotTop><lu-tag label="Inclus dans votre abonnement" /></ng-template>
<ng-template #description>
	<lu-listing ordered fancy>
		<lu-listing-item>Les responsables proposent les augmentations.</lu-listing-item>
		<lu-listing-item>Les augmentations sont commentées, révisées.</lu-listing-item>
		<lu-listing-item>Vous contrôlez, validez ces augmentations et décidez de leur mise en œuvre.</lu-listing-item>
	</lu-listing>
</ng-template>
<ng-template #illustration>
	<lu-empty-state-page-illustration
		src="https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/pagga/mealvoucher-icecream.svg"
	/>
</ng-template>
```
