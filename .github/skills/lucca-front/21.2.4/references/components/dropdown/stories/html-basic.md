# dropdown — Basic _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/dropdown';
@forward '@lucca-front/scss/src/components/divider';
```

```html
<div class="dropdown">
	<ul class="dropdown-list">
		<li class="dropdown-list-option">
			<button type="button" class="dropdown-list-option-action">
				<span class="lucca-icon icon-eye" aria-hidden="true"></span>
				Prévisualiser
			</button>
		</li>
		<li class="dropdown-list-option" aria-hidden="true">
			<div class="divider dropdown-list-option-divider"></div>
		</li>
		<li class="dropdown-list-option">
			<button type="button" class="dropdown-list-option-action">
				<span class="lucca-icon icon-officePen" aria-hidden="true"></span>
				Modifier
			</button>
		</li>
		<li class="dropdown-list-option">
			<button type="button" class="dropdown-list-option-action">
				<span class="lucca-icon icon-fileCopy" aria-hidden="true"></span>
				Copier
			</button>
		</li>
		<li class="dropdown-list-option" aria-hidden="true">
			<div class="divider dropdown-list-option-divider"></div>
		</li>
		<li class="dropdown-list-option">
			Groupe
			<ul class="dropdown-list">
				<li class="dropdown-list-option">
					<button type="button" class="dropdown-list-option-action" disabled="disabled">
						<span class="lucca-icon icon-boxArchive" aria-hidden="true"></span>
						Archiver
					</button>
				</li>
				<li class="dropdown-list-option">
					<button type="button" class="dropdown-list-option-action mod-critical">
						<span class="lucca-icon icon-trashDelete" aria-hidden="true"></span>
						Supprimer
					</button>
				</li>
			</ul>
		</li>
	</ul>
</div>
```
