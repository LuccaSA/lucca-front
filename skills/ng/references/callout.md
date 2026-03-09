# Callout

Alert and notification component to communicate important information to users.

**Storybook:** [Documentation/Feedback/Callout/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { 
  CalloutComponent, 
  CalloutActionsComponent,
  CalloutFeedbackListComponent,
  CalloutFeedbackItemComponent 
} from '@lucca-front/ng/callout';
```

## Basic Usage

```html
<lu-callout>
  This is an informational message.
</lu-callout>
```

## Inputs

### `state`
Type: `'success' | 'warning' | 'error' | 'info' | null`

Sets the callout state. Automatically applies the appropriate icon and palette.

```html
<lu-callout state="success">Operation completed successfully!</lu-callout>
<lu-callout state="warning">Please review your changes.</lu-callout>
<lu-callout state="error">An error occurred.</lu-callout>
<lu-callout state="info">Here's some useful information.</lu-callout>
```

### `palette`
Type: `'none' | 'product' | 'neutral' | 'success' | 'warning' | 'critical'`

Applies a color palette. Overrides `state` palette if both are set.

```html
<lu-callout palette="product">Product-themed callout</lu-callout>
<lu-callout palette="neutral">Neutral callout</lu-callout>
```

### `icon`
Type: `LuccaIcon | null`

Custom icon to display. Overrides the default icon from `state`.

```html
<lu-callout icon="heart">Custom icon callout</lu-callout>
<lu-callout state="success" icon="thumbUp">Success with custom icon</lu-callout>
```

### `iconAlt`
Type: `string | null`

Alt text for the icon (accessibility).

```html
<lu-callout state="warning" iconAlt="Warning">Important notice</lu-callout>
```

### `heading`
Type: `PortalContent` (string or TemplateRef)

Title/heading for the callout.

```html
<lu-callout state="error" heading="Error">
  Something went wrong. Please try again.
</lu-callout>
```

### `size`
Type: `'M' | 'S'` (default: `'M'`)

Changes the callout size.

```html
<lu-callout state="info" size="S">Small callout</lu-callout>
```

### `removable`
Type: `boolean` (default: `false`)

Shows a close/remove button.

```html
<lu-callout state="info" removable (removedChange)="onDismiss()">
  Dismissible notification
</lu-callout>
```

### `removed`
Type: `boolean` (default: `false`)

Controls visibility. Supports two-way binding.

```html
<lu-callout state="success" removable [(removed)]="isDismissed">
  This can be dismissed
</lu-callout>
```

### `AI`
Type: `boolean` (default: `false`)

Applies AI styling to the callout.

```html
<lu-callout AI>
  AI-generated content suggestion
</lu-callout>
```

## Outputs

### `removedChange`
Type: `EventEmitter<boolean>`

Emitted when the callout is dismissed (when `removable` is true).

```html
<lu-callout removable (removedChange)="handleDismiss($event)">
  Notification
</lu-callout>
```

## Callout with Actions

Use `<lu-callout-actions>` for action buttons inside the callout.

```html
<lu-callout state="warning" heading="Unsaved Changes">
  You have unsaved changes. Do you want to save them?
  
  <lu-callout-actions>
    <button luButton="outlined" (click)="discard()">Discard</button>
    <button luButton (click)="save()">Save</button>
  </lu-callout-actions>
</lu-callout>
```

### Inline Actions

```html
<lu-callout state="info">
  New version available!
  
  <lu-callout-actions inline>
    <button luButton="text" (click)="update()">Update Now</button>
  </lu-callout-actions>
</lu-callout>
```

## Feedback List

For displaying multiple feedback items (validation errors, etc.).

```html
<lu-callout state="error" heading="Form Errors">
  <lu-callout-feedback-list>
    <lu-callout-feedback-item>Email is required</lu-callout-feedback-item>
    <lu-callout-feedback-item>Password must be at least 8 characters</lu-callout-feedback-item>
    <lu-callout-feedback-item>Please accept the terms</lu-callout-feedback-item>
  </lu-callout-feedback-list>
</lu-callout>
```

## AI Callout with Suggestions

```html
<lu-callout AI iconAlt="AI suggestion">
  <div class="suggestion-text">
    <p>Consider rephrasing this sentence for clarity.</p>
  </div>
  
  <lu-callout-actions inline>
    <button luButton="outlined" (click)="accept()">
      <lu-icon icon="signConfirm" alt="Accept" />
    </button>
    <button luButton="outlined" (click)="reject()">
      <lu-icon icon="signClose" alt="Reject" />
    </button>
  </lu-callout-actions>
</lu-callout>
```

## Common Patterns

### Success Notification
```html
<lu-callout state="success" removable [(removed)]="hideSuccess">
  Your changes have been saved successfully.
</lu-callout>
```

### Error with Details
```html
<lu-callout state="error" heading="Upload Failed">
  The following files could not be uploaded:
  <lu-callout-feedback-list>
    @for (error of uploadErrors; track error) {
      <lu-callout-feedback-item>{{ error }}</lu-callout-feedback-item>
    }
  </lu-callout-feedback-list>
</lu-callout>
```

### Warning with Action
```html
<lu-callout state="warning" heading="Session Expiring">
  Your session will expire in 5 minutes.
  
  <lu-callout-actions>
    <button luButton (click)="extendSession()">Stay Logged In</button>
  </lu-callout-actions>
</lu-callout>
```

### Info Banner
```html
<lu-callout state="info" size="S">
  <lu-icon icon="infoCircle" alt="" /> 
  Tip: You can use keyboard shortcuts for faster navigation.
</lu-callout>
```

## Accessibility

- Use `iconAlt` to provide meaningful alt text for the icon
- Callouts with `state="error"` should use `role="alert"` for important errors
- Removable callouts are keyboard accessible (Enter/Space to dismiss)
- Heading provides semantic structure for screen readers
