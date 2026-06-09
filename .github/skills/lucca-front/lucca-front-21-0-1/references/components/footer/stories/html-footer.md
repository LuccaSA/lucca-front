# footer — Footer _(HTML/CSS)_

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
