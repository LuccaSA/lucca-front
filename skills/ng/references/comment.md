# Comment

Comment component for displaying threaded or standalone comments.

**Storybook:** [Documentation/Texts/Comment/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Comment - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=18702-2533)  
**Node ID:** `18702-2533`

## Import

```typescript
import { CommentComponent } from '@lucca-front/ng/comment';
```

## Basic Usage

```html
<lu-comment-block>
  <lu-comment [content]="comment" [date]="commentDate"></lu-comment>
</lu-comment-block>
```

## Inputs

### `content`
Type: `string`

### `date`
Type: `Date`

### `datePipeFormat`
Type: `string`

## Common Patterns

### Comment List
```html
<lu-comment-block>
  @for (item of comments; track item.id) {
    <lu-comment [content]="item.content" [date]="item.date"></lu-comment>
  }
</lu-comment-block>
```

## Accessibility

- Comments use list semantics in blocks
- Dates are formatted for readability

