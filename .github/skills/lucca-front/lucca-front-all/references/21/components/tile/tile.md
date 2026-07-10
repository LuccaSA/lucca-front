# tile

## Import

```typescript
import { LuUserTileComponent } from '@lucca-front/ng/user';
```

## API Reference

### LuUserTileComponent (component)

**Selector:** `lu-user-tile`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `user` | `user` | `LuUserTileUserInput` | — | — | — | — |
| `displayFormat` | `displayFormat` | `LuDisplayFormat` | — | — | — | — |
| `role` | `role` | `string` | — | — | — | Rôle de l’utilisateur affiché sous son nom. |
| `size` | `size` | `'L' \| 'M' \| 'S' \| 'XS'` | — | — | — | Taille du composant. |

### Modules dépréciés

- ⚠️ `LuUserTileModule` — use `LuUserTileComponent` instead
- ⚠️ `LuUserModule` — use `LuUserDisplayPipe, LuUserPictureComponent, LuUserTileComponent` instead

## Related files

- 📝 [Code & implementation](./tile.component.md)

- 🎯 [Figma design tokens](./tile.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-users-tile-angular-basic--docs)
- 📋 [Changelog](./tile.changelog.md)
