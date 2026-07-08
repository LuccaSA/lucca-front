# treeselect — Select _(HTML/CSS)_

```css
@forward '@lucca-front/scss/src/components/tree-select';
```

```html
<lu-form-field label="Basic tree multi-select">
	<lu-multi-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Multi-select tree" clearable />
</lu-form-field>
<br />
```

```html
<lu-form-field label="Basic tree multi-select">
	<lu-multi-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Multi-select tree" />
</lu-form-field>
<br />
<lu-form-field label="Basic tree simple-select">
	<lu-simple-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Simple-select tree" />
</lu-form-field>
<br />
<lu-divider />
<lu-form-field label="Department multi-select">
	<lu-multi-select departments placeholder="Multi-select tree" />
</lu-form-field>
<br />
<lu-form-field label="Department simple-select">
	<lu-simple-select departments placeholder="Simple-select tree" />
</lu-form-field>
<br />
<lu-divider />
<lu-filter-bar>
	<lu-filter-pill label="Légumes">
		<lu-multi-select filterPillLabelPlural="légumes" [treeSelect]="groupingFn" [options]="allLegumes" />
	</lu-filter-pill>
	<lu-filter-pill label="Départements">
		<lu-multi-select departments filterPillLabelPlural="départements" />
	</lu-filter-pill>
	<lu-filter-pill label="Légume">
		<lu-simple-select [treeSelect]="groupingFn" [options]="allLegumes" />
	</lu-filter-pill>
	<lu-filter-pill label="Département">
		<lu-simple-select departments />
	</lu-filter-pill>
</lu-filter-bar>
```
