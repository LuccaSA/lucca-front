# button

## Import

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
```

## Basic Usage

```html
<button type="button" prButton
>Button</button>
```

## API Reference

### ButtonComponent (component)

**Selectors:** `button[prButton]`, `a[prButton]`, `span[prButton]`, `button[luButton]`, `a[luButton]`, `span[luButton]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `size` | `size` | `'M' \| 'S' \| 'XS'` | — | — | — | Modifie la taille du composant. |
| `block` | `block` | `boolean` | `false` | — | `booleanAttribute` | Applique display: block. |
| `critical` | `critical` | `boolean` | `false` | — | `booleanAttribute` | [v20.2] Marque une action aux conséquences importantes ou irréversibles au survol et focus. Seulement compatible avec ou… |
| `delete` | `delete` | `boolean` | `false` | — | `booleanAttribute` | [Deprecated] Remplacé par critical. |
| `disclosure` | `disclosure` | `boolean` | `false` | — | `booleanAttribute` | Indique le présence d'un menu. |
| `palette` | `palette` | `'success' \| 'warning' \| 'error' \| 'product' \| 'neutral' \| 'none' \| 'primary' \| 'grey'` | `'none'` | — | — | Applique une palette de couleurs au bouton. |
| `state` | `state` | `'default' \| 'loading' \| 'error' \| 'success'` | `'default'` | — | — | Modifie l'état du bouton. |
| `luButton` | `luButton` | `'' \| 'outlined' \| 'AI' \| 'AI-invert' \| 'ghost' \| 'ghost-invert' \| 'text' \| 'text-invert'` | `''` | — | — | Modifie la hierarchie ou le style du bouton.[v20.3] AI |
| `prButton` | `prButton` | `'' \| 'outlined' \| 'AI' \| 'ghost' \| 'ghost-invert' \| 'text' \| 'text-invert'` | `''` | — | — | — |

## Related files

- 📝 [Code & implementation](./button.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./button.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.0/storybook/?path=/docs/documentation-actions-button-angular-ai--docs)
- 📋 [Changelog](./button.changelog.md)
