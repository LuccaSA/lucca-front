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
- 🎨 [Design guidelines](./design/_index.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-navigation-skiplinks-basic--docs)
- 📋 [Changelog](./skiplinks.changelog.md)
