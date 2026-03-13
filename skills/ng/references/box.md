# Box

Container component for grouping content with consistent styling.

**Storybook:** [Documentation/Structure/Box/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { BoxComponent } from '@lucca-front/ng/box';
```

## Basic Usage

```html
<lu-box>
  <h2>Section Title</h2>
  <p>Content goes here...</p>
</lu-box>
```

## Inputs

### `heading`
Type: `string`

Box title displayed in the header.

```html
<lu-box heading="User Information">
  <p>Details...</p>
</lu-box>
```

### `collapsible`
Type: `boolean` (default: `false`)

Makes the box collapsible.

```html
<lu-box heading="Advanced Options" collapsible>
  <p>Hidden by default...</p>
</lu-box>
```

### `collapsed`
Type: `boolean` (default: `false`)

Initial collapsed state. Supports two-way binding.

```html
<lu-box heading="Details" collapsible [(collapsed)]="isCollapsed">
  <p>Content...</p>
</lu-box>
```

### `palette`
Type: `Palette`

Color palette for the box.

```html
<lu-box heading="Warning" palette="warning">
  <p>Important notice...</p>
</lu-box>
```

## Content Projection

### Header Actions
```html
<lu-box heading="Users">
  <button luButton="ghost" slot="actions">
    <lu-icon icon="plusSign" alt="Add" />
  </button>
  <p>Content...</p>
</lu-box>
```

## Common Patterns

### Settings Section
```html
<lu-box heading="Notification Settings" collapsible>
  <lu-form-field label="Email notifications">
    <lu-switch-input [(ngModel)]="emailNotifications" />
  </lu-form-field>
  <lu-form-field label="SMS notifications">
    <lu-switch-input [(ngModel)]="smsNotifications" />
  </lu-form-field>
</lu-box>
```

### Dashboard Card
```html
<lu-box heading="Recent Activity">
  <button luButton="ghost" slot="actions" (click)="viewAll()">View All</button>
  <ul>
    @for (activity of recentActivities; track activity.id) {
      <li>{{ activity.description }}</li>
    }
  </ul>
</lu-box>
```

### Form Section
```html
<lu-box heading="Personal Information">
  <lu-form-field label="First Name">
    <lu-text-input [(ngModel)]="firstName" />
  </lu-form-field>
  <lu-form-field label="Last Name">
    <lu-text-input [(ngModel)]="lastName" />
  </lu-form-field>
</lu-box>
```
