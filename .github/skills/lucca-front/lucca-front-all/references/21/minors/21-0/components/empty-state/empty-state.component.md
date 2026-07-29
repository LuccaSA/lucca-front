# empty-state — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-feedback-empty-state-angular-page--docs)

## Angular

🔗 [Spécifique Lucca — Page — Liste des illustrations](https://www.notion.so/c12d6c3bf8dc4cc391ad1e5bc80655ab?v=ea7b24dd88d742ccbbb0d87424560c51)

Component selector : `lu-empty-state-page`

### State page

```js
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStatePageComponent } from '@lucca-front/ng/empty-state';
```

```html
<lu-empty-state-page
	heading="Empty state page"
	slotTop=""
	description="Description can be a string or a ng-template"
	topRightBackground="https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg"
	topRightForeground="https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg"
	bottomLeftBackground="https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg"
	bottomLeftForeground="https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg"
	hx="1"
>
	<button luButton type="button" palette="product">Button</button>
	<button luButton="outlined" type="button">Button</button>
</lu-empty-state-page>
```

### State section

```js
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { PaletteArgType } from '../../../../helpers/common-arg-types';
```

```html
<lu-empty-state-section
	hx="3"
	icon="https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconRocket.svg"
	heading="Empty state section"
	description="Description can be a string or a ng-template"
	palette="none"
>
	<button luButton type="button" palette="product">Button</button>
	<button luButton="outlined" type="button">Button</button>
</lu-empty-state-section>
```

## HTML/CSS

🔗 [Spécifique Lucca — Page — Liste des illustrations](https://www.notion.so/c12d6c3bf8dc4cc391ad1e5bc80655ab?v=ea7b24dd88d742ccbbb0d87424560c51)

Classe CSS : `.emptyState`

### State page

```css
@forward '@lucca-front/scss/src/components/empty-state';
@forward '@lucca-front/scss/src/components/button';
```

```html
<section class="emptyState mod-page" [style.--components-emptyState-background-color]="'var(--palettes-neutral-25)'">
	<div class="emptyState-container">
		<div class="emptyState-content">
			<div
				class="emptyState-content-icon"
				aria-hidden="true"
				[innerHtml]="'https://cdn.lucca.fr/lucca-front/assets/empty-states/message/medal-01.svg' | luSafeExternalSvg"
			></div>
			<div class="emptyState-content-text">
				<h1 class="emptyState-content-heading">Empty State</h1>
				<p class="emptyState-content-description">
					Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile
					diversitate flatus.
				</p>
				<div class="emptyState-actions">
					<button type="button" class="button">Button</button>
					<button type="button" class="button mod-outlined">Button</button>
				</div>
			</div>
		</div>
	</div>
</section>
```

### State section center

```css
@forward '@lucca-front/scss/src/components/empty-state';
@forward '@lucca-front/scss/src/components/button';
```

```html
<section class="emptyState mod-center">
	<div class="emptyState-container">
		<div class="emptyState-content">
			<div
				class="emptyState-content-icon"
				aria-hidden="true"
				[innerHtml]="'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCalendarAction.svg' | luSafeExternalSvg"
			></div>
			<div class="emptyState-content-text">
				<h3 class="emptyState-content-heading">Empty State</h3>
				<p class="emptyState-content-description">
					Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile
					diversitate flatus.
				</p>
				<div class="emptyState-actions">
					<button type="button" class="button">Button</button>
					<button type="button" class="button mod-outlined">Button</button>
				</div>
			</div>
		</div>
	</div>
</section>
```

### State section palette

```css
@forward '@lucca-front/scss/src/components/empty-state';
@forward '@lucca-front/scss/src/components/button';
```

```html
<section class="emptyState">
	<div class="emptyState-container">
		<div class="emptyState-content">
			<div
				class="emptyState-content-icon palette-success"
				aria-hidden="true"
				[innerHtml]="'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCalendarAction.svg' | luSafeExternalSvg"
			></div>
			<div class="emptyState-content-text">
				<h3 class="emptyState-content-heading">Empty State</h3>
				<p class="emptyState-content-description">
					Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile
					diversitate flatus.
				</p>
				<div class="emptyState-actions">
					<button type="button" class="button">Button</button>
					<button type="button" class="button mod-outlined">Button</button>
				</div>
			</div>
		</div>
	</div>
</section>
```

### State section

```css
@forward '@lucca-front/scss/src/components/empty-state';
@forward '@lucca-front/scss/src/components/button';
```

```html
<section class="emptyState">
	<div class="emptyState-container">
		<div class="emptyState-content">
			<div
				class="emptyState-content-icon"
				aria-hidden="true"
				[innerHtml]="'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconCalendarAction.svg' | luSafeExternalSvg"
			></div>
			<div class="emptyState-content-text">
				<h3 class="emptyState-content-heading">Empty State</h3>
				<p class="emptyState-content-description">
					Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile
					diversitate flatus.
				</p>
				<div class="emptyState-actions">
					<button type="button" class="button">Button</button>
					<button type="button" class="button mod-outlined">Button</button>
				</div>
			</div>
		</div>
	</div>
</section>
```
