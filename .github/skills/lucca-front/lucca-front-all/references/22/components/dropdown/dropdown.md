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
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `critical` | `critical` | `boolean` | `false` | — | `luBooleanAttribute` | — |



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


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-overlays-dropdown-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`DropdownActionComponent`, `DropdownDividerComponent`, `DropdownGroupComponent`, `DropdownItemComponent`, `DropdownMenuComponent`, `LuDropdownItemDirective`, `LuDropdownPanelComponent`, `LuDropdownTriggerDirective`).
