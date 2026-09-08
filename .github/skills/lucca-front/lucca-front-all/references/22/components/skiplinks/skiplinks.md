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


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-navigation-skiplinks-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`SkipLinkDirective`, `LuSkipLinksComponent`).
