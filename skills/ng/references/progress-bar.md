# Progress Bar

Linear progress indicator.

**Storybook:** [Documentation/Loaders/ProgressBar/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Progress Bar - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=16861-21023)  
**Node ID:** `16861-21023`

## Import

```typescript
import { ProgressBarComponent } from '@lucca-front/ng/progress-bar';
```

## Basic Usage

```html
<lu-progress-bar [value]="75" />
```

## Inputs

### `value`
Type: `number` (0-100) - Progress percentage.

### `indeterminate`
Type: `boolean` (default: `false`) - Shows indeterminate/infinite loading.

```html
<lu-progress-bar indeterminate />
```

### `palette`
Type: `Palette` - Color palette.

```html
<lu-progress-bar [value]="progress" palette="success" />
```

## Common Patterns

### File Upload Progress
```html
<div class="upload">
  <span>{{ file.name }}</span>
  <lu-progress-bar [value]="file.progress" />
  <span>{{ file.progress }}%</span>
</div>
```

### Loading State
```html
@if (isLoading) {
  <lu-progress-bar indeterminate />
}
```

### Multi-step Process
```html
<lu-progress-bar [value]="(currentStep / totalSteps) * 100" />
<p>Step {{ currentStep }} of {{ totalSteps }}</p>
```

## Accessibility

- Progress announced to screen readers
- Use with descriptive text
