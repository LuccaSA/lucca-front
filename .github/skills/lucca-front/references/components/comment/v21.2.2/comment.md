# comment

## Import

```typescript
import { CommentBlockComponent, CommentComponent } from '@lucca-front/ng/comment';
```

## Basic Usage

```html
<lu-comment-block authorName=" "> <ng-template #avatarTpl> <lu-user-picture [user]="{firstName: 'Marie', lastName: 'Bragoulet'}" /> </ng-template> <lu-comment [date]="date" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?" /> <lu-comment [date]="date" content="Lorem ipsum dolor sit amet." /> <lu-comment [date]="date" content />
</lu-comment-block>
```

## API Reference

### CommentBlockComponent (component)

**Selector:** `lu-comment-block`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `compact` | `compact` | `boolean` | `false` | — | `booleanAttribute` | N’affiche l’auteur que sur le premier commentaire de |
| `small` | `small` | `boolean` | `false` | — | `booleanAttribute` | Modifie la taille du composant. |
| `chatAnswer` | `chatAnswer` | `boolean` | `false` | — | `booleanAttribute` | — |
| `authorName` | `authorName` | `PortalContent` | — | — | — | — |
| `size` | `size` | `'S' \| 'M'` | — | — | — | — |

### CommentComponent (component)

**Selector:** `lu-comment`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `content` | `content` | `PortalContent` | — | ✅ | — | — |
| `date` | `date` | `Date` | — | — | — | Modifie la date du commentaire. |
| `datePipeFormat` | `datePipeFormat` | `string \| undefined` | `undefined` | — | — | [v20.3] Modifie le format de date affiché, via Angular DatePipe. Exemples : 'mediumDate', 'YYYY', etc. |
| `noInfos` | `noInfos` | `boolean` | `false` | — | `booleanAttribute` | — |

## Related files

- 📝 [Code & implementation](./comment.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../comment.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.2/storybook/?path=/docs/documentation-texts-comment-angular-ai--docs)
- 📋 [Changelog](../comment.changelog.md)
