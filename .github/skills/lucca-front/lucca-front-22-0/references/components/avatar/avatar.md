# avatar

## Import

```typescript
import { LuUserPictureComponent } from '@lucca-front/ng/user';
```

## Basic Usage

```html
<button class="userPopover_trigger" type="button" [luUserPopover]="user"> <lu-user-picture [user]="user" [displayFormat]="displayFormat" data-testid="lu-user-picture" [class.mod-placeholder]="placeholder" />
</button>
```

## API Reference

### LuUserPictureComponent (component)

**Selector:** `lu-user-picture`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `displayFormat` | `displayFormat` | `LuDisplayInitials` | `displayPictureFormatRecord[inject(LU_DEFAULT_DISPLAY_POLICY)]` | — | — | Format d’affichage des initiales. F pour prénom (firstname) L pour nom (lastname). |
| `user` | `user` | `LuUserPictureUserInput` | — | — | — | [Story] Affiche la photo de l’utilisateur ou ses initiales. |
| `AI` | `AI` | `boolean` | `false` | — | `luBooleanAttribute` | Avatar utilisé pour une réponse faite par IA. |
| `placeholder` | `placeholder` | `boolean` | `false` | — | `luBooleanAttribute` | Applique un placeholder d’avatar. |
| `softRounded` | `softRounded` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `size` | `size` | `'XS' \| 'S' \| 'M' \| 'L' \| 'XL' \| 'XXL' \| 'XXXL'` | `'M'` | — | — | — |
| `imageLoadingAttribute` | `imageLoadingAttribute` | `HTMLImageElement['loading']` | `'lazy'` | — | — | — |

### Modules dépréciés

- ⚠️ `LuUserPictureModule` — use `LuUserPictureComponent` instead
- ⚠️ `LuUserModule` — use `LuUserDisplayPipe, LuUserPictureComponent, LuUserTileComponent` instead

## Related files

- 📝 [Code & implementation](./avatar.component.md)

- 🎯 [Figma design tokens](./avatar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-users-avatar-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `AI` : transform booleanAttribute → luBooleanAttribute
~ `placeholder` : transform booleanAttribute → luBooleanAttribute
~ `softRounded` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `placeholder` input to render an empty picture, and `softRounded` input for a squared picture with rounded corners.
- `USER_PICTURE_SIZE` constant and `UserPictureSize` type are now publicly exported and used to type the `size` input.

#### 21.1.4

##### Fixed

- The picture falls back to `pictureHref` when loading `picture.href` fails.

#### 20.3.0

##### Added

- `AI` input to render the picture with the AI styling.

#### 19.0.0

##### Deprecated

- `LuUserPictureModule` — import the standalone `LuUserPictureComponent` instead.

#### 18.2.0

##### Changed

- Avatar styles moved to the SCSS package.

#### 18.1.1

##### Added

- `LU_DEFAULT_DISPLAY_POLICY` is taken into account to compute the initials.
