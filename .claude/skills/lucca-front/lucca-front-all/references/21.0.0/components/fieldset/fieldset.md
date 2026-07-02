# fieldset

## Import

```typescript
import { FieldsetComponent } from '@lucca-front/ng/forms';
```

## Basic Usage

```html
@let column= { colspanAtMediaMinXXS: 2 }; <lu-fieldset heading="Title"> <lu-grid mode="form"> <lu-grid-column colspan="4" [responsive]="column"> <lu-form-field label="Label"> <lu-text-input type="text" [(ngModel)]="example1" /> </lu-form-field> </lu-grid-column> <lu-grid-column colspan="4" [responsive]="column"> <lu-form-field label="Label"> <lu-text-input type="text" [(ngModel)]="example2" /> </lu-form-field> </lu-grid-column> </lu-grid>
</lu-fieldset>
```

## API Reference

### FieldsetComponent (component)

**Selector:** `lu-fieldset`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `heading` | `heading` | `PortalContent \| null` | `null` | — | — | Titre du fieldset. |
| `helper` | `helper` | `PortalContent \| null` | `null` | — | — | Ajoute un sous-titre au fieldset. |
| `action` | `action` | `PortalContent \| null` | `null` | — | — | — |
| `size` | `size` | `'S' \| null` | `null` | — | — | Modifie la taille du fieldset. |
| `horizontal` | `horizontal` | `boolean` | `false` | — | `booleanAttribute` | Place le titre du fieldset à gauche des champs. |
| `expandable` | `expandable` | `boolean` | `false` | — | `booleanAttribute` | Permet au fieldset de se replier. |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `expanded` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./fieldset.component.md)

- 🎯 [Figma design tokens](./fieldset.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-forms-fieldset-angular-basic--docs)
- 📋 [Changelog](./fieldset.changelog.md)
