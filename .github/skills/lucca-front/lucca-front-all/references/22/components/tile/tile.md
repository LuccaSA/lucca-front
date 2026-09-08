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
| `displayFormat` | `displayFormat` | `LuDisplayFormat` | `this.#defaultFormat` | — | — | — |
| `role` | `role` | `string` | — | — | — | Rôle de l’utilisateur affiché sous son nom. |
| `size` | `size` | `'L' \| 'M' \| 'S' \| 'XS'` | — | — | — | Taille du composant. |







### Modules dépréciés

- ⚠️ `LuUserTileModule` — use `LuUserTileComponent` instead
- ⚠️ `LuUserModule` — use `LuUserDisplayPipe, LuUserPictureComponent, LuUserTileComponent` instead


## Related files

- 📝 [Code & implementation](./tile.component.md)


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-users-tile-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`LuUserTileComponent`).

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `USER_TILE_SIZE` constant and `UserTileSize` type are now publicly exported and used to type the `size` input.

#### 20.3.4

##### Added

- Alternative text on the picture displayed by the tile.

#### 20.1.3

##### Added

- `size` input.

#### 20.1.0

##### Changed

- Bottom slot markup renamed from `user-tile-footnote` to `userTile-content-slotBottom`.

#### 19.2.1

##### Fixed

- Height computation when `role` is empty.

#### 19.0.0

##### Deprecated

- `LuUserTileModule` — import the standalone `LuUserTileComponent` instead.

#### 18.2.0

##### Changed

- Component styles moved to the SCSS package.

#### 18.1.1

##### Added

- `LU_DEFAULT_DISPLAY_POLICY` is taken into account to compute the picture initials.
