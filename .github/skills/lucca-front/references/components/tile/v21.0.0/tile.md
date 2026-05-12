# tile

## Import

```typescript
import { LuUserTileComponent, LuUserSelectInputComponent, LuUserMeOptionDirective, LuUserPagedSearcherComponent, LuUserHomonymsComponent } from '@lucca-front/ng/user';
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

- 📝 [Code & implementation](./tile.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../tile.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-users-tile-angular-format--docs)
- 📋 [Changelog](../tile.changelog.md)
