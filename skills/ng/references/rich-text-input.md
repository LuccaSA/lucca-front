# Rich Text Input

Rich text editor input based on Lexical.

**Storybook:** [Documentation/Forms/Fields/Rich Text/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Rich Text Field - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=6946-36398)  
**Node ID:** `6946-36398`

## Import

```typescript
import { RichTextInputComponent } from '@lucca-front/ng/forms';
```

## Basic Usage

```html
<lu-form-field label="Description">
  <lu-rich-text-input [(ngModel)]="description" />
</lu-form-field>
```

## Inputs

### `placeholder`
Type: `string`

```html
<lu-rich-text-input [(ngModel)]="content" placeholder="Type your content..." />
```

### `disableSpellcheck`
Type: `boolean` (default: `false`)

```html
<lu-rich-text-input [(ngModel)]="content" disableSpellcheck />
```

### `autoResize`
Type: `boolean` (default: `false`)

```html
<lu-rich-text-input [(ngModel)]="content" autoResize />
```

### `hideToolbar`
Type: `boolean` (default: `false`)

```html
<lu-rich-text-input [(ngModel)]="content" hideToolbar />
```

## Docs Highlights

### Peer Dependencies

```sh
npm i lexical @lexical/history @lexical/link @lexical/text @lexical/rich-text @lexical/selection @lexical/utils
```

Optional format deps:

```sh
npm i @lexical/html
npm i @lexical/markdown
npm i @lexical/plain-text
```

### Formatters

Use one formatter directive or provider:

```html
<lu-rich-text-input luWithHtmlFormatter></lu-rich-text-input>
<lu-rich-text-input luWithMarkdownFormatter></lu-rich-text-input>
<lu-rich-text-input luWithPlainTextTagsFormatter></lu-rich-text-input>
```

```typescript
import { provideLuRichTextMarkdownFormatter } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
provideLuRichTextMarkdownFormatter();
```

### Toolbar

Use the default toolbar:

```html
<lu-rich-text-input luWithMarkdownFormatter [(ngModel)]="value">
  <lu-rich-text-input-toolbar />
</lu-rich-text-input>
```

Or create a custom toolbar with plugin components.

## Common Patterns

### Comment Editor
```html
<lu-form-field label="Comment">
  <lu-rich-text-input [(ngModel)]="comment" placeholder="Write a comment..." />
</lu-form-field>
```

### Description Field
```html
<lu-form-field label="Job Description" [counter]="1000">
  <lu-rich-text-input [(ngModel)]="description" />
</lu-form-field>
```

### Read-only Presentation
```html
<lu-form-field label="Summary" presentation>
  <lu-rich-text-input [ngModel]="summary" />
</lu-form-field>
```

## Accessibility

- Toolbar buttons are keyboard accessible
- Content area is focusable and announced
- Use placeholder for guidance
