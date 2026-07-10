# departmentselect — Select _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/department';
```

```html
<label class="textfield mod-inline">
	<lu-department-select
		class="textfield-input"
		[appInstanceId]="appInstanceId()"
		[operations]="operations()"
		[filters]="filters()"
		[uniqueOperation]="uniqueOperation()"
		placeholder="Select a departement"
		data-testid="lu-select"
	/>
	<div class="textfield-label">Departement</div>
</label>

<label class="textfield mod-inline">
	<lu-department-select
		class="textfield-input"
		[appInstanceId]="appInstanceId()"
		[operations]="operations()"
		[filters]="filters()"
		[uniqueOperation]="uniqueOperation()"
		placeholder="Select a departement"
		multiple="true"
		data-testid="lu-select"
	/>
	<div class="textfield-label">Departement multiple</div>
</label>
```
