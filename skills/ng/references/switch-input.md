# Switch Input

Toggle switch component for binary on/off states.

**Storybook:** [Documentation/Forms/Fields/Switch/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { SwitchInputComponent } from '@lucca-front/ng/forms';
```

## Basic Usage

```html
<lu-form-field label="Enable notifications">
  <lu-switch-input [(ngModel)]="enabled" />
</lu-form-field>
```

## When to Use

Use **Switch** instead of Checkbox when:
- The action takes effect immediately (no form submission)
- Represents an on/off or enable/disable state
- Similar to a physical toggle switch

Use **Checkbox** when:
- Part of a form that requires submission
- Multiple selections from a list
- Accepting terms/agreements

## Common Patterns

### Settings Toggle
```html
<lu-form-field label="Dark mode">
  <lu-switch-input [(ngModel)]="settings.darkMode" (ngModelChange)="applyTheme()" />
</lu-form-field>

<lu-form-field label="Email notifications">
  <lu-switch-input [(ngModel)]="settings.emailNotifications" />
</lu-form-field>
```

### Feature Toggle
```html
<lu-form-field label="Enable beta features" inlineMessage="Experimental features may be unstable">
  <lu-switch-input [(ngModel)]="betaEnabled" />
</lu-form-field>
```

### Status Toggle
```html
<lu-form-field label="Active">
  <lu-switch-input [(ngModel)]="user.isActive" (ngModelChange)="updateUserStatus()" />
</lu-form-field>
```

### With Reactive Forms
```html
<lu-form-field label="Public profile">
  <lu-switch-input [formControl]="publicProfileControl" />
</lu-form-field>
```

```typescript
publicProfileControl = new FormControl(false);
```

## Accessibility

- Always use with `<lu-form-field>` for proper label association
- Keyboard accessible with Space key
- Screen readers announce as "switch" role

