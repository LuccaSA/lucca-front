# dropdown

## Import

```typescript
import { DropdownActionComponent, DropdownGroupComponent, LuDropdownItemDirective, LuDropdownPanelComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
```

## API Reference

### DropdownActionComponent (component)

**Selector:** `[lu-dropdown-action]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | — |
| `critical` | `critical` | `boolean` | `false` | — | `booleanAttribute` | — |

### DropdownGroupComponent (component)

**Selector:** `lu-dropdown-group`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string \| null` | `null` | — | — | — |

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

### LuDropdownTriggerDirective (directive)

**Selector:** `[luDropdown]`

**exportAs:** `LuDropdownTrigger`

## Related files

- 📝 [Code & implementation](./dropdown.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../dropdown.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.2/storybook/?path=/docs/documentation-overlays-dropdown-angular-basic--docs)
- 📋 [Changelog](../dropdown.changelog.md)
