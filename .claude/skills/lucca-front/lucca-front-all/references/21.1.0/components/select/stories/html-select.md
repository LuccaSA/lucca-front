# select — Select _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/select';
```

```html
<div class="pr-u-displayFlex">
	<label class="textfield pr-u-marginInlineEnd200">
		<lu-select class="textfield-input" placeholder="Select an item">
			<ng-container *luDisplayer="let value">{{ value }}</ng-container>
			<lu-option-picker>
				<lu-option [value]="1">1</lu-option>
				<lu-option [value]="2">2</lu-option>
				<lu-option [value]="3">3</lu-option>
			</lu-option-picker>
		</lu-select>
		<span class="textfield-label">Select</span>
	</label>
	<label class="textfield pr-u-marginInlineEnd200">
		<lu-select class="textfield-input" placeholder="Select an item" [multiple]="true">
			<ng-container *luDisplayer="let value">{{ value }}</ng-container>
			<lu-option-picker>
				<lu-option [value]="1">1</lu-option>
				<lu-option [value]="2">2</lu-option>
				<lu-option [value]="3">3</lu-option>
			</lu-option-picker>
		</lu-select>
		<span class="textfield-label">Multiple Select</span>
	</label>
	<label class="textfield pr-u-marginInlineEnd200">
		<lu-select [(ngModel)]="item" class="textfield-input">
			<ng-container *luDisplayer="let value">{{ value.name }}</ng-container>
			<lu-option-picker>
				<lu-option [value]="green">{{ green.name }}</lu-option>
				<lu-option [value]="red">{{ red.name }}</lu-option>
				<lu-option [value]="yellow" [disabled]="true">{{ yellow.name }}</lu-option>
				<lu-option [value]="blue" [disabled]="true">{{ blue.name }}</lu-option>
				<lu-option [value]="purple">{{ purple.name }}</lu-option>
				<lu-option [value]="orange">{{ orange.name }}</lu-option>
				<lu-option [value]="cyan" [disabled]="true">{{ cyan.name }}</lu-option>
				<lu-option [value]="grey">{{ grey.name }}</lu-option>
			</lu-option-picker>
		</lu-select>
		<span class="textfield-label">Disabled options</span>
	</label>
	<label class="textfield">
		<lu-select [(ngModel)]="item" class="textfield-input" [disabled]="true">
			<ng-container *luDisplayer="let value">{{ value.name }}</ng-container>
			<lu-option-picker>
				<lu-option [value]="green">{{ green.name }}</lu-option>
				<lu-option [value]="red">{{ red.name }}</lu-option>
				<lu-option [value]="yellow">{{ yellow.name }}</lu-option>
				<lu-option [value]="blue">{{ blue.name }}</lu-option>
			</lu-option-picker>
		</lu-select>
		<span class="textfield-label">Disabled field</span>
	</label>
</div>
```
