# skiplinks

## Import

```typescript
import { SkipLinkDirective, LuSkipLinksComponent } from '@lucca-front/ng/a11y';
```

## Basic Usage

```html
<lu-skip-links /> <lu-app-layout> <ng-container appLayoutBanner> <div id="lucca-banner-solutions-container" tabindex="-1"> <a href="#">banner</a> </div> </ng-container> <ng-container appLayoutNavSide> <div id="navSide" tabindex="-1"> <a href="#">navside</a> <a href="#">navside</a> <a href="#">navside</a> <a href="#">navside</a> <a href="#">navside</a> </div> </ng-container> <lu-main-layout> <lu-main-layout-block> <lu-container> <div class="fakeContent"><a href="#">content</a></div> </lu-container> </lu-main-layout-block> <lu-main-layout-block> <lu-container> <div class="fakeContent"><a href="#">content</a></div> </lu-container> </lu-main-layout-block> <lu-main-layout-block> <lu-container> <div class="fakeContent"><a href="#">content</a></div> </lu-container> </lu-main-layout-block> <lu-main-layout-block> <lu-container> <div luSkipLinkTarget luSkipLinkLabel="Go to custom skip link target" class="fakeContent"><a href="#">custom skip link target</a></div> </lu-container> </lu-main-layout-block> <lu-main-layout-block> <lu-container> <div class="fakeContent"><a href="#">content</a></div> </lu-container> </lu-main-layout-block> </lu-main-layout> </lu-app-layout>
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

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `[luSkipLinkTarget]` directive with the `luSkipLinkTarget` and `luSkipLinkLabel` inputs, to append skip links to the ones already declared on the component.

#### 18.2.0

##### Changed

- Translations are now managed in Lokalise.
