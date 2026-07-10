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
| `luHref` | `href` | `string` | `''` | — | — | Adresse de la page cible. À n’utiliser qu’en lien externe ou non connu par le routeur. |
| `routerLinkCommands` | `luLink` | `LuRouterLink['routerLink'] \| null` | `null` | — | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | Désactive le lien. |
| `decorationHover` | `decorationHover` | `boolean` | `false` | — | `booleanAttribute` | Souligne le lien seulement au survol. |
| `external` | `external` | `boolean` | `false` | — | `booleanAttribute` | — |
| `hiddenIcon` | `hiddenIcon` | `boolean` | `false` | — | `booleanAttribute` | — |

### LuRouterLink (directive)

**Selector:** `[luRouterLink]`

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_LINK_INSTANCE` | `boolean` | — |

## Related files

- 📝 [Code & implementation](./link.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./link.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-actions-link-angular-test--docs)
- 📋 [Changelog](./link.changelog.md)
