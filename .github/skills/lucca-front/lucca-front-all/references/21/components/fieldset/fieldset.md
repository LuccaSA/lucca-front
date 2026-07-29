# fieldset

## Import

```typescript
import { FieldsetComponent } from '@lucca-front/ng/forms';
```

## Basic Usage

```html
<form luForm> <lu-fieldset heading="Title"> <lu-grid mode="form"> <lu-grid-column colspan="2"> <lu-form-field label="Label"> <lu-text-input type="text" ngModel [ngModelOptions]="{ standalone: true }" /> </lu-form-field> </lu-grid-column> <lu-grid-column colspan="2"> <lu-form-field label="Label"> <lu-text-input type="text" ngModel [ngModelOptions]="{ standalone: true }" /> </lu-form-field> </lu-grid-column> </lu-grid> </lu-fieldset>
</form>
```

## API Reference

### FieldsetComponent (component)

**Selector:** `lu-fieldset`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `heading` | `heading` | `PortalContent \| null` | `null` | — | — | Titre du fieldset. [PortalContent] |
| `helper` | `helper` | `PortalContent \| null` | `null` | — | — | Ajoute un sous-titre au fieldset. [PortalContent] |
| `action` | `action` | `PortalContent \| null` | `null` | — | — | — |
| `size` | `size` | `FieldsetSize \| null` | `null` | — | — | Modifie la taille du fieldset. |
| `horizontal` | `horizontal` | `boolean` | `false` | — | `booleanAttribute` | Place le titre du fieldset à gauche des champs. |
| `expandable` | `expandable` | `boolean` | `false` | — | `booleanAttribute` | Permet au fieldset de se replier. |
| `hiddenLegend` | `hiddenLegend` | `boolean` | `false` | — | `booleanAttribute` | Masque la légende en la conservant dans le DOM pour les lecteurs d’écrans. |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `expanded` | `unknown` | — | — |

## Related files

- 📝 [Code & implementation](./fieldset.component.md)

- 🎯 [Figma design tokens](./fieldset.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-fieldset-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

+ `hiddenLegend` : boolean
~ `size` : 'S' | null → FieldsetSize | null

### 21.0.0

Composant introduit (`FieldsetComponent`).
