# segmentedcontrol — Control filter _(HTML/CSS)_

Les filtres s’appliquent à un même jeu de données. Ce sont des options de formulaire.

```css
@forward '@lucca-front/scss/src/components/segmented-control';
```

```html
<ul class="segmentedControl${…}${…}" role="presentation">
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab1" checked="checked" />
		<label for="tab1" class="segmentedControl-item-action">Lorem</label>
	</li>
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab2" />
		<label for="tab2" class="segmentedControl-item-action">Ipsum${…}</label>
	</li>
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab3" />
		<label for="tab3" class="segmentedControl-item-action">Dolor sit amet</label>
	</li>
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab4" />
		<label for="tab4" class="segmentedControl-item-action">Consectetur adipisicing elit</label>
	</li>
</ul>
```
