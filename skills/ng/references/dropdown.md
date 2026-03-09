# Dropdown

Dropdown menu component for contextual actions and options.

**Storybook:** [Documentation/Overlays/Dropdown/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { 
  LuDropdownTriggerDirective,
  LuDropdownMenuComponent,
  LuDropdownItemComponent,
  LuDropdownDividerComponent 
} from '@lucca-front/ng/dropdown';
```

## Basic Usage

```html
<button luButton [luDropdown]="dropdownMenu">
  Actions
  <lu-icon icon="arrowChevronBottom" alt="" />
</button>

<ng-template #dropdownMenu>
  <lu-dropdown-menu>
    <lu-dropdown-item (click)="edit()">Edit</lu-dropdown-item>
    <lu-dropdown-item (click)="duplicate()">Duplicate</lu-dropdown-item>
    <lu-dropdown-divider />
    <lu-dropdown-item (click)="delete()">Delete</lu-dropdown-item>
  </lu-dropdown-menu>
</ng-template>
```

## Directive: `luDropdown`

### Inputs

#### `luDropdown` (required)
Type: `TemplateRef` - Reference to the dropdown menu template.

#### `luDropdownPosition`
Type: `'above' | 'below' | 'before' | 'after'` (default: `'below'`)

#### `luDropdownDisabled`
Type: `boolean` - Disables the dropdown.

### Outputs

- `luDropdownOnOpen` - Emitted when dropdown opens
- `luDropdownOnClose` - Emitted when dropdown closes

## Components

- `<lu-dropdown-menu>` - Container for items
- `<lu-dropdown-item>` - Menu item (clickable)
- `<lu-dropdown-divider>` - Visual separator
- `<lu-dropdown-group label="...">` - Groups items with label

## Common Patterns

### Actions Menu
```html
<button luButton="ghost" [luDropdown]="menu">
  <lu-icon icon="more" alt="Actions" />
</button>

<ng-template #menu>
  <lu-dropdown-menu>
    <lu-dropdown-item (click)="edit()">
      <lu-icon icon="pencil" alt="" /> Edit
    </lu-dropdown-item>
    <lu-dropdown-divider />
    <lu-dropdown-item (click)="delete()">
      <lu-icon icon="trash" alt="" /> Delete
    </lu-dropdown-item>
  </lu-dropdown-menu>
</ng-template>
```

### With Disclosure Button
```html
<button luButton disclosure [luDropdown]="menu">Options</button>
```

## Accessibility

- Opens on click or Enter/Space
- Arrow keys navigate items
- Escape closes dropdown
