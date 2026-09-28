# footer — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-structure-cards-footer--docs)

## Angular

### Basic

```js
import { ButtonComponent } from '@lucca-front/ng/button';
import { FooterComponent } from '@lucca-front/ng/footer';
```

```html
<lu-footer narrowAtMediaMax="XXS">
	<ng-container footerContent>Content</ng-container>
	<button type="button" luButton>Button</button>
	<button type="button" luButton="outlined">Button</button>
</lu-footer>
```

## HTML/CSS

### Footer

```css
@forward '@lucca-front/scss/src/components/footer';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/card';
```

```html
<div class="card">
	<div class="card-content">
		<h3 class="card-title">Titre de la carte</h3>
		<p>Contenu de la carte</p>
	</div>
	<footer class="card-footer">
		<div class="card-footer-right">
			<button type="button" class="button palette-product">Confirmer</button>
			<button type="button" class="button mod-ghost">Annuler</button>
		</div>
	</footer>
</div>
```

### Basic

```css
@forward '@lucca-front/scss/src/components/footer';
@forward '@lucca-front/scss/src/components/button';
```

```html
<footer class="footer">
	<div class="footer-content">Content</div>
	<div class="footer-actions">
		<button type="button" class="button">Button</button>
		<button type="button" class="button mod-outlined">Button</button>
	</div>
</footer>
```
