# Toasts

Notification service for displaying temporary messages.

**Storybook:** [Documentation/Overlays/Toasts/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { LuToastsService, LuToastsComponent } from '@lucca-front/ng/toast';
```

## Setup

Add the toasts container to your app root component:

```html
<!-- app.component.html -->
<router-outlet />
<lu-toasts />
```

## Basic Usage

```typescript
import { LuToastsService } from '@lucca-front/ng/toast';

@Component({...})
export class MyComponent {
  private toasts = inject(LuToastsService);

  showSuccess() {
    this.toasts.addToast({
      message: 'Operation completed successfully!',
      type: 'Success'
    });
  }
}
```

## Toast Options

### `message` (required)
Type: `PortalContent` (string, supports HTML)

The toast message content.

```typescript
this.toasts.addToast({ message: 'Simple message' });
this.toasts.addToast({ message: '<strong>Bold</strong> message' });
```

### `type`
Type: `'Info' | 'Error' | 'Success' | 'Warning'`

```typescript
this.toasts.addToast({ message: 'Info', type: 'Info' });
this.toasts.addToast({ message: 'Success!', type: 'Success' });
this.toasts.addToast({ message: 'Warning!', type: 'Warning' });
this.toasts.addToast({ message: 'Error', type: 'Error' });
```

### `title`
Type: `string`

Optional bold title above the message.

```typescript
this.toasts.addToast({
  title: 'Success',
  message: 'Changes saved.',
  type: 'Success'
});
```

### `duration`
Type: `number | null` (default: `5000`)

Duration in ms. Set `null` for manual dismiss only.

```typescript
this.toasts.addToast({ message: 'Quick', duration: 3000 });
this.toasts.addToast({ message: 'Persistent', duration: null });
```

## Service Methods

- `addToast(input): LuToast` - Adds a toast
- `removeToast(toast): void` - Removes a toast

## Common Patterns

### Success after Save
```typescript
this.toasts.addToast({
  title: 'Saved',
  message: 'Your changes have been saved.',
  type: 'Success'
});
```

### Error Handler
```typescript
this.toasts.addToast({
  title: 'Error',
  message: error.message,
  type: 'Error',
  duration: null
});
```
