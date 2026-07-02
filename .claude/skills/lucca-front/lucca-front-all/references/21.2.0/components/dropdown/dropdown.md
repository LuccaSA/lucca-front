# dropdown

## Import

```typescript
import { DropdownActionComponent, DropdownDividerComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownItemDirective, LuDropdownPanelComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
```

## API Reference

### DropdownActionComponent (component)

**Selector:** `[lu-dropdown-action]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | — |
| `critical` | `critical` | `boolean` | `false` | — | `booleanAttribute` | — |

### DropdownDividerComponent (component)

**Selector:** `lu-dropdown-divider`

### DropdownGroupComponent (component)

**Selector:** `lu-dropdown-group`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string \| null` | `null` | — | — | — |

### DropdownItemComponent (component)

**Selector:** `lu-dropdown-item`

### DropdownMenuComponent (component)

**Selector:** `lu-dropdown-menu`

### LuDropdownItemDirective (directive)

**Selector:** `[luDropdownItem]`

**exportAs:** `LuDropdownItem`

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `onSelect` | `onSelect` | `boolean` |

### LuDropdownPanelComponent (component)

**Selector:** `lu-dropdown`

**exportAs:** `LuDropdownPanel`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `inputPanelClasses` | `panel-classes` | `string` | — | — | — | — |
| `inputContentClasses` | `content-classes` | `string` | — | — | — | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `close` | `close` | `void` |
| `open` | `open` | `void` |
| `hovered` | `hovered` | `boolean` |

### LuDropdownTriggerDirective (directive)

**Selector:** `[luDropdown]`

**exportAs:** `LuDropdownTrigger`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `inputPanel` | `luDropdown` | `TemplateRef<unknown> \| Type<unknown> \| ALuPopoverPanel` | — | — | — | — |

## Related files

- 📝 [Code & implementation](./dropdown.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./dropdown.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.0/storybook/?path=/docs/documentation-overlays-dropdown-angular-basic--docs)
- 📋 [Changelog](./dropdown.changelog.md)
