# Timelines

Timeline component for displaying sequences of events (horizontal and vertical).

**Storybook:** [Documentation/Listings/Timelines/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Timeline Vertical - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=3746-26392)  
**Node ID:** `3746-26392`

**Component:** [Timeline Horizontal - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=6238-37988)  
**Node ID:** `6238-37988`

## Import

```typescript
import { TimelinesComponent } from '@lucca-front/ng/timelines';
```

## Basic Usage

```html
<lu-timelines>
  <lu-timeline-item>
    <span class="timeline-title">Created</span>
    <span class="timeline-date">2024-01-15</span>
    <p>Order created by user.</p>
  </lu-timeline-item>
  <lu-timeline-item>
    <span class="timeline-title">Approved</span>
    <span class="timeline-date">2024-01-16</span>
    <p>Manager approved the request.</p>
  </lu-timeline-item>
</lu-timelines>
```

## Common Patterns

### Vertical Timeline
```html
<lu-timelines orientation="vertical">
  <!-- timeline items -->
</lu-timelines>
```

### Horizontal Timeline
```html
<lu-timelines orientation="horizontal">
  <!-- timeline items -->
</lu-timelines>
```

## Accessibility

- Ensure chronological order in DOM
- Use clear labels for each event

