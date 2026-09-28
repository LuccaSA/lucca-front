# button

## Import

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
```

## Basic Usage

```html
<button type="button" luButton
>Button</button>
```

## API Reference

### ButtonComponent (component)

**Selectors:** `button[luButton]`, `a[luButton]`, `span[luButton]`, `button[prButton]`, `a[prButton]`, `span[prButton]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `size` | `size` | `'M' \| 'S' \| 'XS'` | — | — | — | Modifie la taille du composant. |
| `block` | `block` | `boolean` | `false` | — | `booleanAttribute` | Applique display: block. |
| `critical` | `critical` | `boolean` | `false` | — | `booleanAttribute` | [v20.2] Marque une action aux conséquences importantes ou irréversibles au survol et focus. Seulement compatible avec ou… |
| `delete` | `delete` | `boolean` | `false` | — | `booleanAttribute` | ⚠️ **Déprécié** : use `critical` input instead [Deprecated] Remplacé par critical. |
| `disclosure` | `disclosure` | `boolean` | `false` | — | `booleanAttribute` | Indique le présence d'un menu. |
| `palette` | `palette` | `'success' \| 'warning' \| 'error' \| 'product' \| 'neutral' \| 'none' \| 'primary' \| 'grey' \| 'brand'` | `'none'` | — | — | Applique une palette de couleurs au bouton. |
| `state` | `state` | `'default' \| 'loading' \| 'error' \| 'success'` | `'default'` | — | — | Modifie l'état du bouton. |
| `luButton` | `luButton` | `'' \| 'outlined' \| 'AI' \| 'AI-invert' \| 'ghost' \| 'ghost-invert' \| 'text' \| 'text-invert'` | `''` | — | — | Modifie la hierarchie ou le style du bouton.[v20.3] AI |
| `prButton` | `prButton` | `'' \| 'outlined' \| 'AI' \| 'ghost' \| 'ghost-invert' \| 'text' \| 'text-invert'` | `''` | — | — | — |

## Related files

- 📝 [Code & implementation](./button.component.md)
- 🎨 [Design guidelines](./button.design.md)
- 🎯 [Figma design tokens](./button.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-actions-button-angular-ai--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.1.4`. Les versions sans changement d'API sont omises.

### 21.1.1

~ `palette` : 'success' | 'warning' | 'error' | 'product' | 'neutral' | 'none' | 'primary' | 'grey' → 'success' | 'warning' | 'error' | 'product' | 'neutral' | 'none' | 'primary' | 'grey' | 'brand'

### 21.1.0

+ selector `button[prButton]`
+ selector `a[prButton]`
+ selector `span[prButton]`
+ `prButton` : '' | 'outlined' | 'AI' | 'ghost' | 'ghost-invert' | 'text' | 'text-invert'
~ `palette` : Palette → 'success' | 'warning' | 'error' | 'product' | 'neutral' | 'none' | 'primary' | 'grey'

### 21.0.4

+ selector `span[luButton]`

### 21.0.3

~ `delete` : devient déprécié (use `critical` input instead)

### 21.0.0

Composant introduit (`ButtonComponent`).
