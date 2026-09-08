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
| `horizontal` | `horizontal` | `boolean` | `false` | — | `luBooleanAttribute` | Place le titre du fieldset à gauche des champs. |
| `expandable` | `expandable` | `boolean` | `false` | — | `luBooleanAttribute` | Permet au fieldset de se replier. |
| `hiddenLegend` | `hiddenLegend` | `boolean` | `false` | — | `luBooleanAttribute` | Masque la légende en la conservant dans le DOM pour les lecteurs d’écrans. |


#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `expanded` | `unknown` | — | — |







## Related files

- 📝 [Code & implementation](./fieldset.component.md)


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-fieldset-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`FieldsetComponent`).

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `hiddenLegend` input to visually hide the fieldset legend while keeping it accessible.

##### Changed

- Default content max inline size is now `50rem` and inherits from the surrounding form (`--components-form-maxWidth`) instead of being fixed at `40rem`, with adjusted icon positioning.

##### Fixed

- Removed a spacing conflict in the fieldset modifiers.

#### 21.2.3

##### Fixed

- Expandable header toggle now renders as a ghost button for a consistent UI.

#### 21.2.2

##### Fixed

- Corrected the expandable chevron icon positioning.

#### 21.1.0

##### Fixed

- Improved accessibility of the header action and its responsive layout.

#### 21.0.3

##### Fixed

- Legend is now hidden when the heading is empty.

#### 21.0.0

##### Added

- `action` input to display a portal-based action in the fieldset header.

#### 20.1.0

##### Added

- `lu-fieldset` component (Angular wrapper) exposing the `heading`, `helper`, `size`, `horizontal` and `expandable` inputs and the `expanded` model.

#### 19.1.0

##### Changed

- Updated the icon used by the expandable variant.

#### 18.2.4

##### Added

- `mod-S` modifier providing a small-size variant for the fieldset.
