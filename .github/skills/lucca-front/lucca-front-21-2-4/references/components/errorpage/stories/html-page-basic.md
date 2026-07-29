# errorpage — Page basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/error-page';
@forward '@lucca-front/scss/src/components/textFlow';
```

```html
<div class="errorPage">
	<section class="errorPage-section">
		<div class="errorPage-section-info">
			<h1 class="errorPage-section-info-title">Erreur 403</h1>
			<div class="textFlow">
				<p>Vous n’êtes pas autorisé à consulter cette page ou cette ressource.</p>
				<p><a href="#">Revenir à la page précédente</a></p>
			</div>
		</div>
		<img
			src="https://cdn.lucca.fr/errors/svg/403-lucca.svg"
			width="600"
			height="400"
			alt=""
			class="errorPage-section-image"
		/>
	</section>
</div>
```
