# markdown

## Import

```typescript
import { MarkdownComponent } from '@lucca-front/ng/markdown';
```

## Basic Usage

```html
<lu-markdown [content]="content" headingLevel="1" />
```

## API Reference

### MarkdownComponent (component)

**Selector:** `lu-markdown`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `content` | `content` | `string` | — | ✅ | — | Source markdown à afficher. |
| `headingLevel` | `headingLevel` | `number` | `1` | — | `numberAttribute` | Niveau sémantique du titre de premier niveau (`# Titre`), les suivants étant imbriqués à partir de celui-ci. |

## Related files

- 📝 [Code & implementation](./markdown.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-texts-markdown-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.1.0

Composant introduit (`MarkdownComponent`).
