# Form Field

Wrapper component that provides label, validation messages, and accessibility for form inputs.

**Storybook:** [Documentation/Forms/Form Field/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Form Field - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=28461-196506)  
**Node ID:** `28461-196506`

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
```

## Basic Usage

```html
<lu-form-field label="Email">
  <lu-text-input [(ngModel)]="email" />
</lu-form-field>
```

## Inputs

### `label` (required)
Type: `PortalContent` (string or TemplateRef)

The label text for the form field.

```html
<lu-form-field label="First Name">
  <lu-text-input [(ngModel)]="firstName" />
</lu-form-field>

<!-- With template for complex label -->
<lu-form-field [label]="labelTpl">
  <lu-text-input [(ngModel)]="value" />
</lu-form-field>
<ng-template #labelTpl>
  Name <span class="required">*</span>
</ng-template>
```

### `hiddenLabel`
Type: `boolean` (default: `false`)

Hides the label visually while keeping it accessible for screen readers.

```html
<lu-form-field label="Search" hiddenLabel>
  <lu-text-input [(ngModel)]="query" placeholder="Search..." />
</lu-form-field>
```

### `tooltip`
Type: `string | SafeHtml | null`

Shows a tooltip icon (?) next to the label with additional information.

```html
<lu-form-field label="API Key" tooltip="Your unique API key from the dashboard">
  <lu-text-input [(ngModel)]="apiKey" />
</lu-form-field>
```

### `size`
Type: `'S' | 'M' | null` (default: `null`)

Changes the form field size.

```html
<lu-form-field label="Name" size="S">
  <lu-text-input [(ngModel)]="name" />
</lu-form-field>
```

### `width`
Type: `20 | 30 | 40 | 50 | 60`

Sets the width of the form field as a percentage.

```html
<lu-form-field label="Zip Code" [width]="20">
  <lu-text-input [(ngModel)]="zipCode" />
</lu-form-field>
```

### `inlineMessage`
Type: `PortalContent | null`

Helper text displayed below the input.

```html
<lu-form-field label="Password" inlineMessage="Must be at least 8 characters">
  <lu-text-input type="password" [(ngModel)]="password" />
</lu-form-field>
```

### `errorInlineMessage`
Type: `PortalContent | null`

Error message displayed when the field is invalid.

```html
<lu-form-field 
  label="Email" 
  inlineMessage="We'll never share your email"
  errorInlineMessage="Please enter a valid email address">
  <lu-text-input [(ngModel)]="email" required email />
</lu-form-field>
```

### `inlineMessageState`
Type: `'default' | 'success' | 'warning' | 'error' | null`

State of the inline message (ignored if form is invalid).

```html
<lu-form-field label="Username" inlineMessage="Username available!" inlineMessageState="success">
  <lu-text-input [(ngModel)]="username" />
</lu-form-field>
```

### `counter`
Type: `number` (default: `0`)

Maximum character count. Shows a counter below the input. `0` means no counter.

```html
<lu-form-field label="Bio" [counter]="200">
  <lu-textarea-input [(ngModel)]="bio" />
</lu-form-field>
```

### `presentation`
Type: `boolean` (default: `false`)

Transforms the field into read-only presentation mode (text instead of input).

```html
<lu-form-field label="Name" presentation>
  <lu-text-input [ngModel]="user.name" />
</lu-form-field>
```

### `inline`
Type: `boolean` (default: `false`)

Displays the label and input on the same line.

```html
<lu-form-field label="Active" inline>
  <lu-checkbox-input [(ngModel)]="isActive" />
</lu-form-field>
```

### `AI`
Type: `boolean` (default: `false`)

Adds AI indicator styling to the field.

```html
<lu-form-field label="Generated Text" AI iconAItooltip="AI-generated content">
  <lu-text-input [(ngModel)]="generatedText" />
</lu-form-field>
```

### `tag`
Type: `string | null`

Adds a tag/badge next to the label (e.g., "Beta", "New").

```html
<lu-form-field label="Feature" tag="Beta">
  <lu-text-input [(ngModel)]="feature" />
</lu-form-field>
```

## Common Input Components

### Text Input
```html
<lu-form-field label="Name">
  <lu-text-input [(ngModel)]="name" placeholder="Enter name" />
</lu-form-field>
```

### Textarea
```html
<lu-form-field label="Description" [counter]="500">
  <lu-textarea-input [(ngModel)]="description" [rows]="4" />
</lu-form-field>
```

### Number Input
```html
<lu-form-field label="Quantity">
  <lu-number-input [(ngModel)]="quantity" [min]="0" [max]="100" />
</lu-form-field>
```

### Checkbox
```html
<lu-form-field label="Accept Terms">
  <lu-checkbox-input [(ngModel)]="accepted" />
</lu-form-field>
```

### Select
```html
<lu-form-field label="Country">
  <lu-simple-select [(ngModel)]="country" [options]="countries" />
</lu-form-field>
```

### Date
```html
<lu-form-field label="Birth Date">
  <lu-date-input [(ngModel)]="birthDate" />
</lu-form-field>
```

## Validation

Form field automatically displays validation errors from Angular forms.

```html
<lu-form-field 
  label="Email" 
  errorInlineMessage="Please enter a valid email">
  <lu-text-input 
    [(ngModel)]="email" 
    required 
    email 
    #emailModel="ngModel" />
</lu-form-field>
```

With Reactive Forms:
```html
<lu-form-field 
  label="Email" 
  [errorInlineMessage]="getEmailError()">
  <lu-text-input [formControl]="emailControl" />
</lu-form-field>
```

## Common Patterns

### Required Field
```html
<lu-form-field label="Name">
  <lu-text-input [(ngModel)]="name" required />
</lu-form-field>
<!-- Asterisk (*) is automatically added when required -->
```

### Field with All Features
```html
<lu-form-field 
  label="Description"
  tooltip="Describe your project in detail"
  inlineMessage="Be as specific as possible"
  errorInlineMessage="Description is required"
  [counter]="1000"
  size="M">
  <lu-textarea-input [(ngModel)]="description" required [rows]="5" />
</lu-form-field>
```

### Horizontal Form Layout
```html
<div class="form-horizontal">
  <lu-form-field label="First Name" inline>
    <lu-text-input [(ngModel)]="firstName" />
  </lu-form-field>
  <lu-form-field label="Last Name" inline>
    <lu-text-input [(ngModel)]="lastName" />
  </lu-form-field>
</div>
```

## Accessibility

- Label is automatically associated with input via `aria-labelledby`
- Error messages are announced via `aria-describedby`
- Required fields are indicated with `aria-required`
- Hidden labels remain accessible to screen readers

