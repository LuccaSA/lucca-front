# main-layout

## Import

```typescript
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
```

## Basic Usage

```html
<lu-main-layout footerSticky> <ng-container mainLayoutHeader> <lu-container> <div class="fakeContent">header</div> </lu-container> </ng-container> <lu-main-layout-block> <lu-container> <div class="fakeContent">content</div> </lu-container> </lu-main-layout-block> <ng-container mainLayoutFooter> <lu-container> <div class="fakeContent">footer</div> </lu-container> </ng-container> </lu-main-layout>
```

## API Reference

### MainLayoutBlockComponent (component)

**Selector:** `lu-main-layout-block`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `overflow` | `overflow` | `boolean` | `false` | — | `booleanAttribute` | — |

### MainLayoutComponent (component)

**Selector:** `lu-main-layout`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `headerSticky` | `headerSticky` | `boolean` | `false` | — | `booleanAttribute` | Conserve le header visible en haut du layout. |
| `footerSticky` | `footerSticky` | `boolean` | `false` | — | `booleanAttribute` | Conserve le footer visible en bas du layout. |

## Related files

- 📝 [Code & implementation](./main-layout.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.0/storybook/?path=/docs/documentation-structure-main-layout-angular-basic--docs)
- 📋 [Changelog](../main-layout.changelog.md)
