# color-picker — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-fields-color-picker-angular--docs)

## Angular

Component selector : `lu-color-input`

### Configuration des couleurs

Les couleurs disponibles dans le color picker sont à renseigner dans `colors` via un tableau d'objets : 

```ts
[
	{ name: 'Kiwi', index: 0, background: 'var(--palettes-kiwi-500)' },
	{ name: 'Citron', index: 1, background: 'var(--palettes-lime-500)' },
	{ name: 'Concombre', index: 2, background: 'var(--palettes-cucumber-500)' },
	{ name: 'Menthe', index: 3, background: 'var(--palettes-mint-500)' },
	{ name: 'Glacier', index: 4, background: 'var(--palettes-glacier-500)' },
	{ name: 'Lagon', index: 5, background: 'var(--palettes-lagoon-500)' },
	{ name: 'Myrtille', index: 6, background: 'var(--palettes-blueberry-500)' },
	{ name: 'Lavande', index: 7, background: 'var(--palettes-lavender-500)' },
	{ name: 'Raisin', index: 8, background: 'var(--palettes-grape-500)' },
	{ name: 'Pastèque', index: 9, background: 'var(--palettes-watermelon-500)' },
	{ name: 'Citrouille', index: 10, background: 'var(--palettes-pumpkin-500)' },
	{ name: 'Ananas', index: 11, background: 'var(--palettes-pineapple-500)' },
];
```

```ts
[
	{ name: 'Temps et activités', index: 0, background: 'var(--palettes-timmi-700)' },
	{ name: 'Dépenses professionnelles', index: 1, background: 'var(--palettes-cleemy-700)' },
	{ name: 'Talent', index: 2, background: 'var(--palettes-poplee-700)' },
];
```

```ts
[
	{ name: 'Myrtille 50', index: 0, background: 'var(--palettes-blueberry-50)', borderColor: 'var(--palettes-blueberry-500)' },
	{ name: 'Concombre 50', index: 1, background: 'var(--palettes-cucumber-50)', borderColor: 'var(--palettes-cucumber-500)' },
	{ name: 'Glacier 50', index: 2, background: 'var(--palettes-glacier-50)', borderColor: 'var(--palettes-glacier-500)' },
];
```

### Input field

```js
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FORM_FIELD_SIZE, FORM_FIELD_WIDTH, FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent, luColorTranslations } from '@lucca-front/ng/forms';
import { INLINE_MESSAGE_STATE } from '@lucca-front/ng/inline-message';
```

```html
<lu-form-field>
	<lu-color-input [(ngModel)]="model.example" [colors]="colors" clearable />
</lu-form-field>
<pr-story-model-display>{{ model.example | json }}</pr-story-model-display>
```
