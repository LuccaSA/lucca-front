# Inline Message

Component for displaying contextual messages within forms or content.

**Storybook:** [Documentation/Feedback/InlineMessage/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Inline Message - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=5743-32741)  
**Node ID:** `5743-32741`

## Import

```typescript
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
```

## Basic Usage

```html
<lu-inline-message state="warning">Please review your input.</lu-inline-message>
```

## Inputs

### `state`
Type: `'default' | 'success' | 'warning' | 'error'`

```html
<lu-inline-message state="success">Valid email address.</lu-inline-message>
<lu-inline-message state="warning">Password is weak.</lu-inline-message>
<lu-inline-message state="error">This field is required.</lu-inline-message>
```

## With Form Field

Usually used automatically via `inlineMessage` and `errorInlineMessage` inputs on `lu-form-field`:

```html
<lu-form-field 
  label="Email" 
  inlineMessage="We'll never share your email"
  errorInlineMessage="Please enter a valid email">
  <lu-text-input [(ngModel)]="email" required email />
</lu-form-field>
```

## Standalone Usage

```html
<lu-inline-message state="warning">
  <lu-icon icon="signWarning" alt="" />
  Your session will expire in 5 minutes.
</lu-inline-message>
```
