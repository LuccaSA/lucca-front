# button — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-actions-button-angular-ai--docs)

## Angular

Component selector : `luButton`

### Ai

```js
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
<button type="button" luButton="AI">
	<lu-icon icon="officePenStar" alt="Assistant IA" />
	Reformuler
</button>
```

### Basic

La directive `luButton` peut être utilisée sur un élément `<button>`, tout comme sur un élément `<a>` si le style du bouton nécessite d'être appliqué sur ce dernier.

```js
import { ButtonComponent } from "@lucca-front/ng/button";
```

```html
<button type="button" luButton>Button</button>
```

### Counter

```js
import { ButtonComponent } from "@lucca-front/ng/button";
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```

```html
<button type="button" luButton>
	Button
	<lu-numeric-badge disableTooltip [value]="9999" />
</button>
```

### Icon

```js
import { ButtonComponent } from "@lucca-front/ng/button";
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
<button type="button" luButton>
	<lu-icon icon="signInfo" alt="Alt text" />
	Button
</button>
```

## HTML/CSS

### Attributs 

Le `type` est obligatoire (`button`, `submit` ou `reset`)

### Navigation clavier

*Entrée* / *espace* (au focus) : Déclenche l'action liée.

### Block

```css
@forward '@lucca-front/scss/src/components/button';
```

```html
<button type="button" class="button mod-block">Button</button>
```

### Counter

```css
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/numericBadge';
```

```html
<button type="button" class="button">
	Button
	<span class="numericBadge">7</span>
</button>
<button type="button" class="button palette-warning">
	Button
	<span class="numericBadge">7</span>
</button>
<button type="button" class="button palette-mint">
	Button
	<span class="numericBadge">7</span>
</button>
```

### Disabled

```css
@forward '@lucca-front/scss/src/components/button';
```

```html
<button type="button" class="button" disabled>Button</button>
```

### Disclosure

```css
@forward '@lucca-front/scss/src/components/button';
```

```html
<button type="button" class="button mod-disclosure">
	Button
	<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom"></span>
</button>
```

### Group

```css
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/buttonGroup'; // Import suppémentaire
```

```html
<ul class="button-group">
	<li class="button-group-item"><button type="button" class="button">Bouton</button></li>
	<li class="button-group-item"><button type="button" class="button">Bouton</button></li>
	<li class="button-group-item"><button type="button" class="button">Bouton</button></li>
	<li class="button-group-item">
		<button type="button" class="button mod-more">
			<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
			<span class="pr-u-mask">Plus d'actions</span>
		</button>
	</li>
</ul>
```

### Only icon

```css
@forward '@lucca-front/scss/src/components/button';
```

```html
<button type="button" class="button mod-outlined mod-onlyIcon">
	<span aria-hidden="true" class="lucca-icon icon-heart"></span>
	<span class="pr-u-mask">Liker</span>
</button>
<button type="button" class="button mod-ghost mod-onlyIcon">
	<span aria-hidden="true" class="lucca-icon icon-heart"></span>
	<span class="pr-u-mask">Liker</span>
</button>
<button type="button" class="button mod-outlined mod-onlyIcon mod-critical">
	<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
	<span class="pr-u-mask">Supprimer</span>
</button>
<button type="button" class="button mod-ghost mod-onlyIcon mod-critical">
	<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
	<span class="pr-u-mask">Supprimer</span>
</button>
```

### Palette

```css
@forward '@lucca-front/scss/src/components/button';
```

```html
<button type="button" class="button palette-success">Button</button>
<button type="button" class="button palette-warning">Button</button>
<button type="button" class="button palette-error">Button</button>
```

### Size

```css
@forward '@lucca-front/scss/src/components/button';
```

```html
<button type="button" class="button">Button</button>
<button type="button" class="button mod-S">Button</button>
<button type="button" class="button mod-XS">Button</button>
```

### States

```css
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="pr-u-displayFlex pr-u-gap100 pr-u-alignItemsCenter">
	<button type="button" class="button is-loading">Button</button>
	<button type="button" class="button is-success">Button</button>
	<button type="button" class="button is-error">Button</button>
</div>
```

### Style

```css
@forward '@lucca-front/scss/src/components/button';
```

```html
<button type="button" class="button">Button</button>
<button type="button" class="button mod-outlined">Button</button>
<button type="button" class="button mod-ghost">Button</button>
<!-- 20.3 -->
<button type="button" class="button mod-AI">Button</button>
```

### With arrow

```css
@forward '@lucca-front/scss/src/components/button';
```

```html
<button aria-expanded="false" type="button" class="button mod-disclosure">
	Button
	<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom"></span>
</button>
```

### With icon

```css
@forward '@lucca-front/scss/src/components/button';
```

```html
<button type="button" class="button mod-withIcon">
	<span aria-hidden="true" class="lucca-icon icon-heart"></span>
	Button
</button>
```
