# box — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-structure-box-angular-basic--docs)

## Angular

Mots-clés : boîte, conteneur, encadré

Component selector : `lu-box`

### Basic

```js
import { BoxComponent } from '@lucca-front/ng/box';
```

## HTML/CSS

Classe CSS : `.box`

### Arrow

```css
@forward '@lucca-front/scss/src/components/box';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/radioField';
```

```html
<fieldset class="form-fieldset mod-inline">
	<legend class="formLabel pr-u-mask">
		Label
		<sup class="formLabel-required" aria-hidden="true">*</sup>
	</legend>
	<div class="form-field mod-withArrow">
		<label class="formLabel" for="IDradioA">Label A</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioA" name="radioName2" checked />
			<span class="radioField-icon" aria-hidden="true">
				<span class="radioField-icon-check"></span>
			</span>
		</span>
		<div class="form-field-arrow mod-neutral"></div>
	</div>
	<div class="form-field mod-withArrow">
		<label class="formLabel" for="IDradioB">Label B</label>
		<span class="radioField">
			<input type="radio" class="radioField-input" id="IDradioB" name="radioName2" />
			<span class="radioField-icon" aria-hidden="true">
				<span class="radioField-icon-check"></span>
			</span>
		</span>
		<div class="form-field-arrow mod-neutral"></div>
	</div>
</fieldset>
<div class="box mod-withArrow mod-neutral">
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam illo nostrum tenetur expedita. Accusantium cumque nisi
	excepturi eius corporis, iusto quaerat temporibus dolorum necessitatibus laboriosam quidem quibusdam quae aperiam!
	Vitae!
</div>
```

### Basic

```css
@forward '@lucca-front/scss/src/components/box';
```

```html
<div class="box">
	Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot
	cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread
	pastry.
</div>
```

### Killable

```css
@forward '@lucca-front/scss/src/components/box';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="box">
	<div class="box-close">
		<button type="button" class="button mod-onlyIcon mod-ghost">
			<span aria-hidden="true" class="lucca-icon icon-signClose"></span>
			<span class="pr-u-mask">Close</span>
		</button>
	</div>
	Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot
	cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread
	pastry.
</div>
```

### Toggle

```css
@forward '@lucca-front/scss/src/components/box';
@forward '@lucca-front/scss/src/components/switch';
```

```html
<div class="switch">
	<input class="switch-input" type="checkbox" id="boxSwitch" checked disabled />
	<label class="switch-label" for="boxSwitch">Switch</label>
</div>
<div class="box mod-toggle">
	Jujubes toppin gvueoat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot
	cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread
	pastry.
</div>
```
