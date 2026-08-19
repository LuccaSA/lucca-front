# segmentedcontrol — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-navigation-segmentedcontrol-angular-tabs--docs)

## Angular

Component selector : `lu-segmented-control`

### Control tabs

```js
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmentedControlTabs';
```

```html
<ng-template #label>Lorem</ng-template>
<lu-segmented-control-tabs>
	<lu-segmented-control-tabs-panel [label]="label" value="0">
		<div class="demo">Content Lorem</div>
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Ipsum" value="1">
		<div class="demo">Content Ipsum</div>
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Dolor sit amet" value="2">
		<div class="demo">Content Dolor sit amet</div>
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Consectetur adipisicing elit" value="3">
		<div class="demo">Content Consectetur adipisicing elit</div>
	</lu-segmented-control-tabs-panel>
</lu-segmented-control-tabs>
```

### Control

```js
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
```

```html
<ng-template #label>Lorem</ng-template>
<lu-segmented-control [(ngModel)]="sample">
	<lu-segmented-control-filter [label]="label" value="0" />
	<lu-segmented-control-filter label="Ipsum" value="1" />
	<lu-segmented-control-filter label="Dolor sit amet" value="2" />
	<lu-segmented-control-filter label="Consectetur adipisicing elit" value="3" />
</lu-segmented-control>
<pr-story-model-display>{{ sample }}</pr-story-model-display>
```

## HTML/CSS

Ce composant répond à deux *design pattern* : onglets et filtres.

### Onglets

Les onglets s’appliquent à des données différentes, dont une seule est affichée à la fois.

### Control filter

Les filtres s’appliquent à un même jeu de données. Ce sont des options de formulaire.

```css
@forward '@lucca-front/scss/src/components/segmented-control';
```

```html
<ul class="segmentedControl" role="presentation">
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab1" checked="checked" />
		<label for="tab1" class="segmentedControl-item-action">Lorem</label>
	</li>
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab2" />
		<label for="tab2" class="segmentedControl-item-action">Ipsum</label>
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

### Control tabs

```css
@forward '@lucca-front/scss/src/components/segmented-control';
```

```html
<ul class="segmentedControl" role="tablist">
	<li class="segmentedControl-item" role="presentation">
		<button
			class="segmentedControl-item-action"
			type="button"
			role="tab"
			id="tab1"
			aria-controls="panel1"
			[attr.aria-selected]="tabActive === 1"
			[attr.tabindex]="tabActive === 1 ? null : '-1'"
		>
			Lorem
		</button>
	</li>
	<li class="segmentedControl-item" role="presentation">
		<button
			class="segmentedControl-item-action"
			type="button"
			role="tab"
			id="tab2"
			aria-controls="panel2"
			[attr.aria-selected]="tabActive === 2"
			[attr.tabindex]="tabActive === 2 ? null : '-1'"
		>
			Ipsum
		</button>
	</li>
	<li class="segmentedControl-item" role="presentation">
		<button
			class="segmentedControl-item-action"
			type="button"
			role="tab"
			id="tab3"
			aria-controls="panel3"
			[attr.aria-selected]="tabActive === 3"
			[attr.tabindex]="tabActive === 3 ? null : '-1'"
		>
			Dolor sit amet
		</button>
	</li>
	<li class="segmentedControl-item" role="presentation">
		<button
			class="segmentedControl-item-action"
			type="button"
			role="tab"
			id="tab4"
			aria-controls="panel4"
			[attr.aria-selected]="tabActive === 4"
			[attr.tabindex]="tabActive === 4 ? null : '-1'"
		>
			Consectetur adipisicing elit
		</button>
	</li>
</ul>
<div class="pr-u-marginBlockStart200"></div>
<div
	class="segmentedControl_panel"
	[class.is-active]="tabActive === 1"
	role="tabpanel"
	id="panel1"
	aria-labelledby="tab1"
	tabindex="0"
>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, maxime animi perferendis explicabo est eaque ipsa rem,
	sit quasi sunt corporis iure distinctio. Deleniti deserunt aspernatur est placeat, assumenda provident.
</div>
<div
	class="segmentedControl_panel"
	[class.is-active]="tabActive === 2"
	role="tabpanel"
	id="panel2"
	aria-labelledby="tab2"
	tabindex="0"
>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, cumque ad inventore maiores possimus in commodi
	ea soluta maxime fugiat libero ducimus provident incidunt sit quod! Cum dolorem tempora sit?
</div>
<div
	class="segmentedControl_panel"
	[class.is-active]="tabActive === 3"
	role="tabpanel"
	id="panel3"
	aria-labelledby="tab3"
	tabindex="0"
>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita optio voluptates distinctio nam facere consequatur
	magni suscipit dolore earum molestiae esse placeat commodi, voluptas atque. Maxime, molestiae. Doloremque,
	reprehenderit numquam.
</div>
<div
	class="segmentedControl_panel"
	[class.is-active]="tabActive === 4"
	role="tabpanel"
	id="panel4"
	aria-labelledby="tab4"
	tabindex="0"
>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias amet placeat deserunt nisi. Vitae delectus animi a
	voluptate, nisi voluptatum perspiciatis? Quisquam quam, eius molestiae vitae nesciunt iste est non.
</div>
```
