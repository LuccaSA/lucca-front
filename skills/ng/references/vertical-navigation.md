# Vertical Navigation

Sidebar navigation component with links and groups.

**Storybook:** [Documentation/Navigation/VerticalNavigation/Angular](https://storybook.lucca-front.com)

## Figma Design

**Component:** [Vertical Navigation - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=13580-1866)  
**Node ID:** `13580-1866`

## Import

```typescript
import { 
  VerticalNavigationComponent,
  VerticalNavigationLinkComponent,
  VerticalNavigationGroupComponent 
} from '@lucca-front/ng/vertical-navigation';
```

## Basic Usage

```html
<lu-vertical-navigation heading="Menu">
  <lu-vertical-navigation-link icon="home" routerLink="/home">
    Home
  </lu-vertical-navigation-link>
  <lu-vertical-navigation-link icon="users" routerLink="/users">
    Users
  </lu-vertical-navigation-link>
  <lu-vertical-navigation-link icon="settings" routerLink="/settings">
    Settings
  </lu-vertical-navigation-link>
</lu-vertical-navigation>
```

## Navigation Component Inputs

### `heading` (required)
Type: `PortalContent` - Navigation heading/title.

```html
<lu-vertical-navigation heading="Main Menu">
  ...
</lu-vertical-navigation>
```

### `level`
Type: `number` (default: `3`) - Heading level for accessibility.

```html
<lu-vertical-navigation heading="Main Menu" [level]="2">
  ...
</lu-vertical-navigation>
```

## Link Component

### Inputs

#### `icon`
Type: `LuccaIcon` - Icon displayed before the link text.

#### `routerLink`
Angular router link directive.

#### `routerLinkActive`
CSS class applied when link is active.

```html
<lu-vertical-navigation-link 
  icon="dashboard" 
  routerLink="/dashboard"
  routerLinkActive="is-active">
  Dashboard
</lu-vertical-navigation-link>
```

## Group Component

For collapsible navigation groups with sub-links.

### Inputs

#### `heading`
Type: `string` - Group title.

#### `icon`
Type: `LuccaIcon` - Icon for the group.

```html
<lu-vertical-navigation-group heading="Admin" icon="shield">
  <lu-vertical-navigation-link routerLink="/admin/users">
    Users Management
  </lu-vertical-navigation-link>
  <lu-vertical-navigation-link routerLink="/admin/roles">
    Roles & Permissions
  </lu-vertical-navigation-link>
</lu-vertical-navigation-group>
```

## Common Patterns

### Complete Sidebar Navigation
```html
<lu-vertical-navigation heading="Application">
  <!-- Dashboard Link -->
  <lu-vertical-navigation-link 
    icon="home" 
    routerLink="/" 
    routerLinkActive="is-active"
    [routerLinkActiveOptions]="{exact: true}">
    Dashboard
  </lu-vertical-navigation-link>
  
  <!-- HR Group -->
  <lu-vertical-navigation-group heading="Human Resources" icon="users">
    <lu-vertical-navigation-link routerLink="/employees" routerLinkActive="is-active">
      Employees
    </lu-vertical-navigation-link>
    <lu-vertical-navigation-link routerLink="/absences" routerLinkActive="is-active">
      Absences
    </lu-vertical-navigation-link>
    <lu-vertical-navigation-link routerLink="/timesheets" routerLinkActive="is-active">
      Timesheets
    </lu-vertical-navigation-link>
  </lu-vertical-navigation-group>
  
  <!-- Finance Group -->
  <lu-vertical-navigation-group heading="Finance" icon="coins">
    <lu-vertical-navigation-link routerLink="/expenses" routerLinkActive="is-active">
      Expenses
    </lu-vertical-navigation-link>
    <lu-vertical-navigation-link routerLink="/invoices" routerLinkActive="is-active">
      Invoices
    </lu-vertical-navigation-link>
    <lu-vertical-navigation-link routerLink="/budgets" routerLinkActive="is-active">
      Budgets
    </lu-vertical-navigation-link>
  </lu-vertical-navigation-group>
  
  <!-- Settings Link -->
  <lu-vertical-navigation-link 
    icon="settings" 
    routerLink="/settings"
    routerLinkActive="is-active">
    Settings
  </lu-vertical-navigation-link>
</lu-vertical-navigation>
```

### With Badge Notifications
```html
<lu-vertical-navigation heading="Menu">
  <lu-vertical-navigation-link icon="bell" routerLink="/notifications" routerLinkActive="is-active">
    Notifications
    <lu-numeric-badge [value]="unreadCount" />
  </lu-vertical-navigation-link>
  
  <lu-vertical-navigation-link icon="messages" routerLink="/messages" routerLinkActive="is-active">
    Messages
    <lu-numeric-badge [value]="newMessages" palette="product" />
  </lu-vertical-navigation-link>
</lu-vertical-navigation>
```

### Without Icons
```html
<lu-vertical-navigation heading="Documentation">
  <lu-vertical-navigation-link routerLink="/getting-started" routerLinkActive="is-active">
    Getting Started
  </lu-vertical-navigation-link>
  <lu-vertical-navigation-link routerLink="/components" routerLinkActive="is-active">
    Components
  </lu-vertical-navigation-link>
  <lu-vertical-navigation-link routerLink="/patterns" routerLinkActive="is-active">
    Patterns
  </lu-vertical-navigation-link>
</lu-vertical-navigation>
```

### Nested Groups (if supported)
```html
<lu-vertical-navigation heading="Admin">
  <lu-vertical-navigation-group heading="User Management" icon="users">
    <lu-vertical-navigation-link routerLink="/admin/users/list">
      All Users
    </lu-vertical-navigation-link>
    <lu-vertical-navigation-link routerLink="/admin/users/roles">
      Roles
    </lu-vertical-navigation-link>
    <lu-vertical-navigation-link routerLink="/admin/users/permissions">
      Permissions
    </lu-vertical-navigation-link>
  </lu-vertical-navigation-group>
</lu-vertical-navigation>
```

## Layout Integration

### With App Layout
```html
<lu-app-layout>
  <lu-vertical-navigation heading="App Name" slot="sidebar">
    <!-- navigation links -->
  </lu-vertical-navigation>
  
  <main slot="content">
    <router-outlet />
  </main>
</lu-app-layout>
```

## Accessibility

- Uses semantic `<nav>` element with proper ARIA attributes
- Heading level configurable for proper document outline
- Active links are announced to screen readers via `aria-current="page"`
- Keyboard navigation fully supported (Tab, Arrow keys, Enter)
- Collapsible groups use proper ARIA expanded states
- Icons are decorative (text provides context)

## Styling Notes

- Automatically detects if navigation is iconless and adjusts layout
- Active state styling applied via `routerLinkActive`
- Groups can be collapsed/expanded (usually persisted in local storage)
