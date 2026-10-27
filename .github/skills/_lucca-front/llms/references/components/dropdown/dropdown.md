# dropdown

**Sommaire**

- Import
- API Reference
  - DropdownActionComponent (component)
  - DropdownDividerComponent (component)
  - DropdownGroupComponent (component)
  - DropdownItemComponent (component)
  - DropdownMenuComponent (component)
  - LuDropdownItemDirective (directive)
  - LuDropdownPanelComponent (component)
  - LuDropdownTriggerDirective (directive)
  - Modules dépréciés
- Related files
- Changelog
  - 22.0.0
  - Notes de release (ZeroHeight)

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
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive l’action : elle ne peut plus être déclenchée et ne ferme pas le dropdown. Utilisé dans le template de la story… |
| `critical` | `critical` | `boolean` | `false` | — | `luBooleanAttribute` | Applique un style critique à l’action (ex. suppression). Utilisé dans le template de la story. |

### DropdownDividerComponent (component)

**Selector:** `lu-dropdown-divider`

### DropdownGroupComponent (component)

**Selector:** `lu-dropdown-group`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string \| null` | `null` | — | — | Libellé du groupe d’actions. Utilisé dans le template de la story. |

### DropdownItemComponent (component)

**Selector:** `lu-dropdown-item`

### DropdownMenuComponent (component)

**Selector:** `lu-dropdown-menu`

### LuDropdownItemDirective (directive)

**Selector:** `[luDropdownItem]`

**exportAs:** `LuDropdownItem`

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `onSelectOutput` | `onSelectOutput` | `void` | — |

### LuDropdownPanelComponent (component)

**Selector:** `lu-dropdown`

> ⚠️ **Déprécié** : prefer the new menu approach: https://prisme.lucca.io/94310e217/p/557682-dropdown

**exportAs:** `LuDropdownPanel`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `inputPanelClasses` | `panel-classes` | `string` | — | — | — | — |
| `inputContentClasses` | `content-classes` | `string` | — | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `close` | `close` | `void` | — |
| `open` | `open` | `void` | — |
| `hovered` | `hovered` | `boolean` | — |

### LuDropdownTriggerDirective (directive)

**Selector:** `[luDropdown]`

**exportAs:** `LuDropdownTrigger`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `inputPanel` | `luDropdown` | `TemplateRef<unknown> \| Type<unknown> \| ALuPopoverPanel` | `undefined` | — | — | — |

### Modules dépréciés

- ⚠️ `LuDropdownModule` — use `LuDropdownTriggerDirective, LuDropdownPanelComponent, LuDropdownItemDirective` instead
- ⚠️ `LuDropdownItemModule` — use `LuDropdownItemDirective` instead
- ⚠️ `LuDropdownPanelModule` — use `LuDropdownPanelComponent` instead
- ⚠️ `LuDropdownTriggerModule` — use `LuDropdownTriggerDirective` instead

## Related files

- 📝 [Code & implementation](./dropdown.component.md)

- 🎯 [Figma design tokens](./dropdown.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-overlays-dropdown-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.0`. Les versions sans changement d'API sont omises.

### 22.0.0

`DropdownActionComponent` :
  ~ `disabled` : transform booleanAttribute → luBooleanAttribute
  ~ `critical` : transform booleanAttribute → luBooleanAttribute
`LuDropdownItemDirective` :
  + (output) `onSelectOutput` : void
  - (output) `onSelect`
`LuDropdownTriggerDirective` :
  ~ `luDropdown` : défaut ∅ → undefined

### Notes de release (ZeroHeight)

#### 21.0.4

##### Changed

- `disabled` now takes priority over `critical` on a dropdown item.

##### Fixed

- Opening position of the dropdown panel when the trigger is close to the viewport edge.

#### 21.0.0

##### Deprecated

- `LuDropdownModule` — import the standalone `LuDropdownTriggerDirective`, `LuDropdownPanelComponent` and `LuDropdownItemDirective` instead.

#### 20.3.2

##### Added

- `critical` input on the dropdown items, for destructive actions.

##### Fixed

- Color of the critical items.

#### 20.3.1

##### Fixed

- The panel closes when an item is clicked.
- SCSS import of the component.
- Close management of the legacy `lu-dropdown`.

#### 20.3.0

##### Added

- Reworked dropdown: `[luDropdown]` trigger directive with the `lu-dropdown-menu`, `lu-dropdown-item`, `lu-dropdown-group` and `lu-dropdown-divider` components, plus the `[luDropdownItem]` directive.

#### 19.3.0

##### Changed

- Dropdown UI updated.

#### 19.2.0

##### Added

- `dropdown` SCSS component, usable without Angular.
