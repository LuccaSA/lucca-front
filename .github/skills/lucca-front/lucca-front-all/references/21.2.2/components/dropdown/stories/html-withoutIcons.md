# dropdown — WithoutIcons _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/dropdown';
@forward '@lucca-front/scss/src/components/divider';
```

```html
<div class="dropdown">
	<ul class="dropdown-list">
		<li class="dropdown-list-option">
			<button type="button" class="dropdown-list-option-action">Prévisualiser</button>
		</li>
		<li class="dropdown-list-option" aria-hidden="true">
			<div class="divider dropdown-list-option-divider"></div>
		</li>
		<li class="dropdown-list-option">
			<button type="button" class="dropdown-list-option-action">Modifier</button>
		</li>
		<li class="dropdown-list-option">
			<button type="button" class="dropdown-list-option-action">Copier</button>
		</li>
		<li class="dropdown-list-option" aria-hidden="true">
			<div class="divider dropdown-list-option-divider"></div>
		</li>
		<li class="dropdown-list-option">
			Groupe
			<ul class="dropdown-list">
				<li class="dropdown-list-option">
					<button type="button" class="dropdown-list-option-action" disabled="disabled">Archiver</button>
				</li>
				<li class="dropdown-list-option">
					<button type="button" class="dropdown-list-option-action mod-critical">Supprimer</button>
				</li>
			</ul>
		</li>
	</ul>
</div>
```
