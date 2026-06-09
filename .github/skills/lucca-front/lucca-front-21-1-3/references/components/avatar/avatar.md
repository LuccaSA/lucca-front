# avatar

## Import

```typescript
import { LuUserTileComponent, LuUserSelectInputComponent, LuUserMeOptionDirective, LuUserPagedSearcherComponent, LuUserHomonymsComponent } from '@lucca-front/ng/user';
```

## Basic Usage

```html
<button class="userPopover_trigger" type="button" [luUserPopover]="user"> <lu-user-picture [user]="user" [displayFormat]="displayFormat" data-testid="lu-user-picture" [class.mod-placeholder]="placeholder" />
</button>
```

## API Reference

### LuUserTileComponent (component)

**Selector:** `lu-user-tile`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `user` | `user` | `LuUserTileUserInput` | — | — | — | — |
| `displayFormat` | `displayFormat` | `LuDisplayFormat` | — | — | — | — |
| `role` | `role` | `string` | — | — | — | — |
| `size` | `size` | `'L' \| 'M' \| 'S' \| 'XS'` | — | — | — | — |

### LuUserSelectInputComponent (component)

**Selector:** `lu-user-select`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `override` | `placeholder` | `unknown` | — | — | — | — |
| `fields` | `fields` | `string` | — | — | — | — |
| `filters` | `filters` | `string[]` | — | — | — | — |
| `orderBy` | `orderBy` | `string` | — | — | — | — |
| `appInstanceId` | `appInstanceId` | `number \| string` | — | — | — | — |
| `operations` | `operations` | `number[]` | — | — | — | — |
| `enableFormerEmployees` | `enableFormerEmployees` | `boolean` | `false` | — | — | — |
| `disablePrincipal` | `disablePrincipal` | `boolean` | `false` | — | — | — |

### LuUserMeOptionDirective (directive)

**Selector:** `[luUserMeOption]`

### LuUserPagedSearcherComponent (component)

**Selector:** `lu-user-paged-searcher`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `enableFormerEmployees` | `enableFormerEmployees` | `boolean` | `false` | — | — | — |

### LuUserHomonymsComponent (component)

**Selector:** `lu-user-homonyms`

## Related files

- 📝 [Code & implementation](./avatar.component.md)

- 🎯 [Figma design tokens](./avatar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.3/storybook/?path=/docs/documentation-users-avatar-angular-basic--docs)
- 📋 [Changelog](./avatar.changelog.md)
