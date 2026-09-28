# link

## Import

```typescript
import { LinkComponent, LuRouterLink } from '@lucca-front/ng/link';
```

## API Reference

### LinkComponent (component)

**Selectors:** `a[luLink]`, `button[luLink]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `luHref` | `href` | `string` | `''` | — | — | Adresse de la page cible. A n'utiliser qu'en lien externe ou non connu par le routeur. |
| `routerLinkCommands` | `luLink` | `LuRouterLink['routerLink'] \| null` | `null` | — | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | Désactive le lien. |
| `decorationHover` | `decorationHover` | `boolean` | `false` | — | `booleanAttribute` | Souligne le lien seulement au survol. |
| `external` | `external` | `boolean` | `false` | — | `booleanAttribute` | Précise que le lien va s'ouvrir dans un nouvel onglet. |

### LuRouterLink (directive)

**Selector:** `[luRouterLink]`

## Related files

- 📝 [Code & implementation](./link.component.md)
- 🎨 [Design guidelines](./link.design.md)
- 🎯 [Figma design tokens](./link.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-actions-link-angular-test--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.1.4`. Les versions sans changement d'API sont omises.

### 21.1.0

`LinkComponent` :
  + `intl` : unknown

### 21.0.0

Composant introduit (`LinkComponent`, `LuRouterLink`).
