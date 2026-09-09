# comment

## Import

```typescript
import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
```

## Basic Usage

```html
<lu-comment-block [avatar]="avatarTpl" authorName="Marie Bragoulet"> <ng-template #avatarTpl> <lu-user-picture [user]="{firstName: 'Marie', lastName: 'Bragoulet'}" /> </ng-template> <lu-comment [date]="date" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?" /> <lu-comment [date]="date" content="Lorem ipsum dolor sit amet." /> <lu-comment [date]="date" content="<h3>Lorem, ipsum.</h3> <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. <strong>Facilis voluptates ex</strong> qui iste libero suscipit cum earum harum animi praesentium, quidem non incidunt vel illum sunt nihil reprehenderit a itaque. </p> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque numquam itaque at facilis iusto inventore.</p>" />
</lu-comment-block>
```

## API Reference

### CommentBlockComponent (component)

**Selector:** `lu-comment-block`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `compact` | `compact` | `boolean` | `false` | — | `luBooleanAttribute` | N’affiche l’auteur que sur le premier commentaire de |
| `small` | `small` | `boolean` | `false` | — | `luBooleanAttribute` | Modifie la taille du composant. |
| `chatAnswer` | `chatAnswer` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `authorName` | `authorName` | `PortalContent` | — | — | — | — |
| `avatar` | `avatar` | `TemplateRef<unknown>` | — | — | — | — |
| `size` | `size` | `'S' \| 'M'` | — | — | — | — |

### CommentChatComponent (component)

**Selector:** `lu-comment-chat`

### CommentComponent (component)

**Selector:** `lu-comment`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `content` | `content` | `PortalContent` | — | ✅ | — | — |
| `date` | `date` | `Date` | — | — | — | Modifie la date du commentaire. |
| `datePipeFormat` | `datePipeFormat` | `string \| undefined` | `undefined` | — | — | [v20.3] Modifie le format de date affiché, via Angular DatePipe. Exemples : 'mediumDate', 'YYYY', etc. |
| `noInfos` | `noInfos` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `plainText` | `plainText` | `boolean` | `false` | — | `luBooleanAttribute` | — |

## Related files

- 📝 [Code & implementation](./comment.component.md)
- 🎨 [Design guidelines](./comment.design.md)
- 🎯 [Figma design tokens](./comment.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-texts-comment-angular-ai--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`CommentBlockComponent`, `CommentChatComponent`, `CommentComponent`).
