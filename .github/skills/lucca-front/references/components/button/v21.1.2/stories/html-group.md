# button — Group _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/buttonGroup'; // Import suppémentaire
```

```html
<ul class="button-group ${…} ${…}">
	<li class="button-group-item"><button type="button" class="button ${…} ${…}">Bouton</button></li>
	<li class="button-group-item"><button type="button" class="button ${…} ${…}">Bouton</button></li>
	<li class="button-group-item"><button type="button" class="button ${…} ${…}">Bouton</button></li>
	<li class="button-group-item">
		<button type="button" class="button ${…} ${…} mod-more">
			<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true"></span>
			<span class="pr-u-mask">Plus d'actions</span>
		</button>
	</li>
</ul>
```
