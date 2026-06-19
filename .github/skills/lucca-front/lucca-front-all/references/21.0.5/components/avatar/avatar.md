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
| `displayFormat` | `displayFormat` | `LuDisplayInitials` | `displayPictureFormatRecord[inject(LU_DEFAULT_DISPLAY_POLICY)]` | — | — | — |
| `user` | `user` | `LuUserPictureUserInput` | — | — | — | — |
| `AI` | `AI` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'XS' \| 'S' \| 'M' \| 'L' \| 'XL' \| 'XXL' \| 'XXXL'` | `'M'` | — | — | — |
| `imageLoadingAttribute` | `imageLoadingAttribute` | `HTMLImageElement['loading']` | `'lazy'` | — | — | — |

## Related files

- 📝 [Code & implementation](./avatar.component.md)

- 🎯 [Figma design tokens](./avatar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-users-avatar-angular-basic--docs)
- 📋 [Changelog](./avatar.changelog.md)
