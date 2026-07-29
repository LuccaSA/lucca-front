# skiplinks

## Import

```typescript
import { SkipLinkDirective, LuSkipLinksComponent } from '@lucca-front/ng/a11y';
```

## API Reference

### SkipLinkDirective (directive)

**Selector:** `[luSkipLinkTarget]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `luSkipLinkLabel` | `luSkipLinkLabel` | `string` | — | ✅ | — | — |
| `luSkipLinkTarget` | `luSkipLinkTarget` | `string` | `''` | — | — | — |

### LuSkipLinksComponent (component)

**Selector:** `lu-skip-links`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_SKIP_LINKS_TRANSLATIONS` | `LuTranslation<ILuSkipLinksLabel>` | — |

### Services

#### SkipLinksService

- `register(link: LuSkipLink)`
- `unregister(link: LuSkipLink)`

## Related files

- 📝 [Code & implementation](./skiplinks.component.md)
- 🎨 [Design guidelines](./skiplinks.design.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-navigation-skiplinks-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

+ directive `SkipLinkDirective` ([luSkipLinkTarget])
+ service `SkipLinksService` (2 méthode·s)

### 21.1.0

+ `intl` : unknown

### 21.0.0

Composant introduit (`LuSkipLinksComponent`).
