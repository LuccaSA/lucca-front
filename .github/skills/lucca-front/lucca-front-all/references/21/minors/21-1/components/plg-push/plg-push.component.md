# plg-push — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-feedback-plg-push-angular-basic--docs)

## Angular

Component selector : `lu-plg-push`

### Push basic

```js
import { IconComponent } from '@lucca-front/ng/icon';
import { PLGPushComponent } from '@lucca-front/ng/plg-push';
```

```html
<lu-plg-push>
	Bénéficiez de toutes les options liées au télétravail avec Timmi Office.
	<a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer">
		<span class="link-text">Demander un essai gratuit</span>
		<!-- no text node here -->
		<span class="link-icon">
			<lu-icon class="pr-u-displayContents" icon="arrowExternal" alt="Ouvrir dans une nouvelle fenêtre" />
		</span>
	</a>
</lu-plg-push>
```

## HTML/CSS

### Push basic

```css
@forward '@lucca-front/scss/src/components/plg-push';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/link';
```

```html
<div class="plgPush">
	<div class="plgPush-icons">
		<span aria-hidden="true" class="plgPush-icons-front lucca-icon icon-transportRocket mod-S"></span>
		<img class="plgPush-icons-back" alt="" src="https://cdn.lucca.fr/lucca-front/assets/plg-push/shape.svg" />
	</div>
	<div class="plgPush-content">
		<div class="plgPush-content-description">
			Bénéficiez de toutes les options liées au télétravail avec Timmi Office.
			<a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer">
				<span class="link-text">Demander un essai gratuit</span>
				<!-- no text node here -->
				<span class="link-icon"><span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span></span>
				<span class="pr-u-mask">Ouvrir dans une nouvelle fenêtre</span>
			</a>
		</div>
	</div>
	<button type="button" class="plgPush-close button mod-onlyIcon mod-S mod-ghost">
		<span aria-hidden="true" class="lucca-icon icon-signClose"></span>
		<span class="pr-u-mask">Fermer</span>
	</button>
</div>
```

### Push title

```css
@forward '@lucca-front/scss/src/components/plg-push';
@forward '@lucca-front/scss/src/components/link';
```

```html
<div class="plgPush">
	<div class="plgPush-icons">
		<span aria-hidden="true" class="plgPush-icons-front lucca-icon icon-transportRocket mod-S"></span>
		<img class="plgPush-icons-back" alt="" src="https://cdn.lucca.fr/lucca-front/assets/plg-push/shape.svg" />
	</div>
	<div class="plgPush-content">
		<div class="plgPush-content-title">Connaissez-vous Timmi Office ?</div>
		<div class="plgPush-content-description">
			Activez toutes les options liées aux télétravail.
			<a class="link mod-icon" href="#" target="_blank" rel="noopener noreferrer">
				<span class="link-text">Demander un essai gratuit</span>
				<!-- no text node here -->
				<span class="link-icon"><span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span></span>
				<span class="pr-u-mask">Ouvrir dans une nouvelle fenêtre</span>
			</a>
		</div>
	</div>
</div>
```
