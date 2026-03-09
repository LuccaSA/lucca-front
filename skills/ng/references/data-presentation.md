# Data Presentation

Display-only component for presenting a label + value pair.

**Storybook:** [Documentation/Forms/Value Presentation/Data Presentation/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Data Presentation - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=34358-99807)  
**Node ID:** `34358-99807`

## Import

```typescript
import { DataPresentationComponent } from '@lucca-front/ng/form-field';
```

## Basic Usage

```html
<lu-data-presentation label="Department">
  {{ departmentName }}
</lu-data-presentation>
```

## Inputs

### `label` (required)
Type: `PortalContent`

### `noValue`
Type: `boolean` (default: `false`)

```html
<lu-data-presentation label="Manager" [noValue]="!manager">{{ manager }}</lu-data-presentation>
```

## Accessibility

- Uses semantic label/value layout
- Works well in read-only forms

