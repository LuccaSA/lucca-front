# colorpicker — Colors _(HTML/CSS)_

```html
<lu-form-field [presentation]="presentation" label="Décoratives 500" [size]="size === '' ? null : size">
	<lu-color-input [colors]="colors" [(ngModel)]="selectedColor" [clearable]="clearable" [compact]="compact" />
</lu-form-field>
<pr-story-model-display>{{selectedColor | json}}</pr-story-model-display>
```

```html
<lu-form-field [presentation]="presentation" label="Décoratives 50" [size]="size === '' ? null : size">
	<lu-color-input [colors]="colors" [(ngModel)]="selectedColor" [clearable]="clearable" [compact]="compact" />
</lu-form-field>
```

```html
<lu-form-field [presentation]="presentation" label="Neutrales" [size]="size === '' ? null : size">
	<lu-color-input [colors]="colors" [(ngModel)]="selectedColor" [clearable]="clearable" [compact]="compact" />
</lu-form-field>
```

```html
<lu-form-field [presentation]="presentation" label="lucca" [size]="size">
	<lu-color-input [colors]="colors" [(ngModel)]="selectedColor" [clearable]="clearable" [compact]="compact" />
</lu-form-field>
```
