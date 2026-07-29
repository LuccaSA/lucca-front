# departmentselect — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-forms-departmentselect--docs)

## HTML/CSS

### Select

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
