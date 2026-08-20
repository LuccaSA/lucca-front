# callout — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-feedback-callout-angular-ai--docs)

## Angular

## Callout Angular

### Ai action

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

### Ai event

```js
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutActionsComponent, CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
<lu-callout AI iconAlt="Assistant IA" icon="weatherStars">
	<p>Fixer des objectifs SMART</p>
	<lu-callout-actions inline>
		<button luButton="outlined">Reformuler les objectifs</button>
	</lu-callout-actions>
</lu-callout>
```

### Ai suggestion

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
		<div class="suggestion-callout-text">
			<p>Optimiser l’utilisation des composants de formulaire selon les besoins</p>
		</div>
		<lu-callout-actions inline>
			<button luButton="outlined" class="suggestion-callout-accept">
				<lu-icon icon="signConfirm" alt="Accepter" />
			</button>
			<button luButton="outlined" class="suggestion-callout-reject"><lu-icon icon="signClose" alt="Refuser" /></button>
		</lu-callout-actions>
	</lu-callout>
</div>
```

### Ai

```js
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutActionsComponent, CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
<lu-callout AI iconAlt="Assistant IA" icon="weatherStars">
	<p>Des champs ont été pré-remplis après analyse.</p>
</lu-callout>
```

### Basic

```js
import { CalloutComponent } from "@lucca-front/ng/callout";
import { CalloutActionsComponent } from '@lucca-front/ng/callout'; /* [v20.3] Si <lu-callout-action> est utilisé */
```

```html
<lu-callout>
	<p>Feedback description</p>
</lu-callout>
```

## HTML/CSS

## Callout HTML

### Actions

### Sans icône

### Description

### AI `v20.3`

### Actions

### Actions inline

### Supprimable

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/callout';
```

```html
<div class="callout">
	<div class="callout-content">
		<div class="callout-content-description">
			<p>Feedback description</p>
			<div class="callout-content-description-actions">
				<button class="button mod-outlined" type="button">Button</button>
				<button class="button mod-ghost" type="button">Button</button>
			</div>
		</div>
	</div>
</div>
```

### ActionsInline

### Sans icône

### Description

### AI `v20.3`

### Actions

### Actions inline

### Supprimable

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/callout';
```

```html
<div class="callout">
	<div class="callout-content">
		<div class="callout-content-description">
			<p>Feedback description</p>
			<div class="callout-content-description-actions mod-inline">
				<button class="button mod-outlined" type="button">Button</button>
				<button class="button mod-ghost" type="button">Button</button>
			</div>
		</div>
	</div>
</div>
```

### Basic

### Sans icône

### Description

### AI `v20.3`

### Actions

### Actions inline

### Supprimable

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/callout';
```

```html
<div class="callout">
	<div class="callout-content">
		<div class="callout-content-description">
			<p>Feedback description</p>
		</div>
	</div>
</div>
```

### Ia

### Sans icône

### Description

### AI `v20.3`

### Actions

### Actions inline

### Supprimable

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/callout';
```

```html
<div class="callout mod-AI">
	<div class="callout-icon">
		<span aria-hidden="true" class="lucca-icon icon-weatherStars"></span>
	</div>
	<div class="callout-content">
		<div class="callout-content-description">
			<p>Feedback description</p>
		</div>
	</div>
</div>
```

### Icons

### Sans icône

### Description

### AI `v20.3`

### Actions

### Actions inline

### Supprimable

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/callout';
```

```html
<div class="callout">
	<div class="callout-icon">
		<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
	</div>
	<div class="callout-content">
		<div class="callout-content-description">
			<p>Feedback description</p>
		</div>
	</div>
</div>
```

### Killable

### Sans icône

### Description

### AI `v20.3`

### Actions

### Actions inline

### Supprimable

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/callout';
```

```html
<div class="callout">
	<div class="callout-content">
		<div class="callout-content-description">
			<p>Feedback description</p>
		</div>
	</div>
	<button type="button" class="callout-kill"></button>
</div>
```

### Title

### Sans icône

### Description

### AI `v20.3`

### Actions

### Actions inline

### Supprimable

```css
@forward '@lucca-front/scss/src/components/callout';
@forward '@lucca-front/scss/src/components/callout';
```

```html
<div class="callout">
	<div class="callout-content">
		<p class="callout-content-title">Dépense non prise en charge</p>
		<div class="callout-content-description">
			<p>Vous l’avez déclarée comme usage personnel le 29 août 2023.</p>
		</div>
	</div>
</div>
```
