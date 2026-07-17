# richtextinput

## Import

```typescript
import { ClearFormatComponent, HeadingsComponent, LinkComponent, ListStyleToolbarComponent, RichTextPluginTagComponent, TextStyleComponent, TextStyleToolbarComponent, RichTextInputToolbarComponent, RichTextInputComponent } from '@lucca-front/ng/forms/rich-text-input';
```

## API Reference

### ClearFormatComponent (component)

**Selector:** `lu-rich-text-plugin-clear-format`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### HeadingsComponent (component)

**Selector:** `lu-rich-text-plugin-headings`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `maxHeadingLevel` | `maxHeadingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `6` | — | — | — |
| `intl` | `intl` | `unknown` | — | — | — | — |

### LinkComponent (component)

**Selector:** `lu-rich-text-plugin-link`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### ListStyleToolbarComponent (component)

**Selector:** `lu-rich-text-toolbar-list-style`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### RichTextPluginTagComponent (component)

**Selector:** `lu-rich-text-plugin-tag`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `tags` | `tags` | `Tag[]` | — | ✅ | — | — |

### TextStyleComponent (component)

**Selector:** `lu-rich-text-plugin-text-style`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `format` | `format` | `TextFormatType` | — | ✅ | — | — |
| `icon` | `icon` | `LuccaIcon` | — | ✅ | — | — |
| `tooltip` | `tooltip` | `string` | — | ✅ | — | — |

### TextStyleToolbarComponent (component)

**Selector:** `lu-rich-text-toolbar-text-style`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### RichTextInputToolbarComponent (component)

**Selector:** `lu-rich-text-input-toolbar`

### RichTextInputComponent (component)

**Selector:** `lu-rich-text-input`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `placeholder` | `placeholder` | `string` | `''` | — | — | Applique un placeholder au champ. |
| `disableSpellcheck` | `disableSpellcheck` | `boolean` | `false` | — | `booleanAttribute` | Désactive le correcteur d'orthographe. |
| `autoResize` | `autoResize` | `boolean` | `false` | — | `booleanAttribute` | Active / désactive l'autoresize du champ. |
| `hideToolbar` | `hideToolbar` | `boolean` | `false` | — | `booleanAttribute` | Masque les options de mise en forme. |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 569 available values

## Related files

- 📝 [Code & implementation](./richtextinput.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./richtextinput.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.0/storybook/?path=/docs/documentation-forms-fields-richtextinput-angular--docs)
- 📋 [Changelog](./richtextinput.changelog.md)
