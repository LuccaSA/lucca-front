# Textarea Input

Multi-line text input component.

**Storybook:** [Documentation/Forms/Fields/Textarea/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { TextareaInputComponent } from '@lucca-front/ng/forms';
```

## Basic Usage

```html
<lu-form-field label="Description">
  <lu-textarea-input [(ngModel)]="description" />
</lu-form-field>
```

## Inputs

### `rows`
Type: `number` (default: `3`)

Number of visible text rows.

```html
<lu-textarea-input [(ngModel)]="description" [rows]="5" />
```

### `placeholder`
Type: `string`

Placeholder text when empty.

```html
<lu-textarea-input [(ngModel)]="notes" placeholder="Enter your notes..." />
```

### `autoResize`
Type: `boolean` (default: `false`)

Automatically grows the textarea as content increases.

```html
<lu-textarea-input [(ngModel)]="content" autoResize />
```

### `autoResizeScrollIntoView`
Type: `boolean` (default: `false`)

When `autoResize` is true, scrolls the textarea into view as it grows.

```html
<lu-textarea-input [(ngModel)]="content" autoResize autoResizeScrollIntoView />
```

### `disableSpellcheck`
Type: `boolean` (default: `false`)

Disables browser spellcheck.

```html
<lu-textarea-input [(ngModel)]="code" disableSpellcheck />
```

## Common Patterns

### Description Field
```html
<lu-form-field label="Description" [counter]="500">
  <lu-textarea-input [(ngModel)]="description" [rows]="4" placeholder="Describe your project..." />
</lu-form-field>
```

### Notes/Comments
```html
<lu-form-field label="Notes" inlineMessage="Optional">
  <lu-textarea-input [(ngModel)]="notes" [rows]="3" />
</lu-form-field>
```

### Auto-Resize Message
```html
<lu-form-field label="Message">
  <lu-textarea-input [(ngModel)]="message" autoResize [rows]="2" />
</lu-form-field>
```

### Code Input
```html
<lu-form-field label="JSON Configuration">
  <lu-textarea-input [(ngModel)]="jsonConfig" [rows]="10" disableSpellcheck />
</lu-form-field>
```

### With Character Counter
```html
<lu-form-field label="Bio" [counter]="200" errorInlineMessage="Maximum 200 characters">
  <lu-textarea-input [(ngModel)]="bio" [rows]="4" />
</lu-form-field>
```

### With Reactive Forms
```html
<lu-form-field label="Feedback" [counter]="1000">
  <lu-textarea-input [formControl]="feedbackControl" [rows]="5" />
</lu-form-field>
```

```typescript
feedbackControl = new FormControl('', [Validators.required, Validators.maxLength(1000)]);
```

## Accessibility

- Always use with `<lu-form-field>` for label association
- Use `[counter]` on form-field to communicate max length
- Supports standard keyboard navigation

