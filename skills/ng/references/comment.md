# Comment

Components for typography and textual content.

**Storybook:** `Documentation/Texts/Comment/Angular/AI`

### Imports

```typescript
import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';
```

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'S' | 'M'` | `-` | Which size should the block comment be? Defaults or small |

### Examples

```html
<lu-comment-chat>
<lu-comment-block compact [avatar]=
```
### CSS Classes

| Class | Type |
|-------|------|
| `.comment` | Base |
| `.comment-infos` | Base |
| `.avatar` | Base |
| `.mod-chatAnswer` | Modifier |
| `.mod-noAvatar` | Modifier |
| `.mod-S` | Modifier |
| `.mod-compact` | Modifier |

### When to use

- Text formatting
- Labels
- Badges
- Tags

### When not to use

- Interactive actions
- Forms

### Accessibility

- Use logical heading hierarchy
- Ensure sufficient text contrast
- Avoid text in images
