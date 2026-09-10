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

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

`CommentBlockComponent` :
  ~ `compact` : transform booleanAttribute → luBooleanAttribute
  ~ `small` : transform booleanAttribute → luBooleanAttribute
  ~ `chatAnswer` : transform booleanAttribute → luBooleanAttribute
`CommentComponent` :
  ~ `noInfos` : transform booleanAttribute → luBooleanAttribute
  ~ `plainText` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Fixed

- `.comment-content-text` now wraps long unbreakable strings such as links using `overflow-wrap: anywhere`.

#### 21.2.0

##### Added

- `noInfos` input on `lu-comment` to hide the comment header (avatar, author name and date).
- `lu-comment` can now be used standalone, outside of a `lu-comment-block`.

##### Changed

- `content` input on `lu-comment` is now required and accepts a `PortalContent` (string, `TemplateRef` or component) instead of only a `string`.

#### 20.3.0

##### Added

- `datePipeFormat` input on `lu-comment` to force the date pipe to display the date with a specific format.

#### 20.1.0

##### Removed

- `.comment-content-textContainer` deprecated CSS class.

#### 18.3.1

##### Fixed

- `.comment-content-textContainerOptional` CSS class renamed from the misspelled `.comment-content-textContainerOptionnal`.

#### 18.3.0

##### Added

- `lu-comment`, `lu-comment-block` and `lu-comment-chat` Angular components wrapping the comment styles.

#### 18.1.5

##### Fixed

- `.comment-infos-content` spacing and small (`S`) size styling.

#### 18.1.0

##### Added

- `comment` SCSS component.
