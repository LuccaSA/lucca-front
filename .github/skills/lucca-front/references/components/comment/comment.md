# comment

**Sommaire**

- Import
- Basic Usage
- API Reference
  - CommentBlockComponent (component)
  - CommentChatComponent (component)
  - CommentComponent (component)
- Related files
- Changelog
  - 22.0.0
  - Notes de release (ZeroHeight)

## Import

```typescript
import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
```

## Basic Usage

```html
<lu-comment-block [avatar]="avatarTpl" > <ng-template #avatarTpl> <lu-user-picture [user]="{firstName: 'Marie', lastName: 'Bragoulet'}" /> </ng-template> <lu-comment [date]="date" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?" /> <lu-comment [date]="date" content="Lorem ipsum dolor sit amet." /> <lu-comment [date]="date" content="<h3>Lorem, ipsum.</h3> <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. <strong>Facilis voluptates ex</strong> qui iste libero suscipit cum earum harum animi praesentium, quidem non incidunt vel illum sunt nihil reprehenderit a itaque. </p> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque numquam itaque at facilis iusto inventore.</p>" />
</lu-comment-block>
```

## API Reference

### CommentBlockComponent (component)

**Selector:** `lu-comment-block`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `compact` | `compact` | `boolean` | `false` | — | `luBooleanAttribute` | N’affiche l’auteur que sur le premier commentaire de |
| `small` | `small` | `boolean` | `false` | — | `luBooleanAttribute` | Réduit la taille du texte de tous les commentaires du bloc. |
| `chatAnswer` | `chatAnswer` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `authorName` | `authorName` | `PortalContent` | — | — | — | Nom de l’auteur des commentaires. [PortalContent] |
| `avatar` | `avatar` | `TemplateRef<unknown>` | — | — | — | Template de l’avatar de l’auteur (généralement un lu-user-picture). Sans avatar, aucun n’est affiché. |
| `size` | `size` | `'S' \| 'M'` | — | — | — | — |

### CommentChatComponent (component)

**Selector:** `lu-comment-chat`

### CommentComponent (component)

**Selector:** `lu-comment`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `content` | `content` | `PortalContent` | — | ✅ | — | Contenu du commentaire : chaîne de caractères (le HTML est interprété), TemplateRef ou composant. Requis. |
| `date` | `date` | `Date` | — | — | — | Modifie la date du commentaire. |
| `datePipeFormat` | `datePipeFormat` | `string \| undefined` | `undefined` | — | — | [v20.3] Modifie le format de date affiché, via Angular DatePipe. Exemples : 'mediumDate', 'YYYY', etc. |
| `noInfos` | `noInfos` | `boolean` | `false` | — | `luBooleanAttribute` | Masque les informations du commentaire (avatar, auteur et date). |
| `plainText` | `plainText` | `boolean` | `false` | — | `luBooleanAttribute` | Conserve les retours à la ligne d’un contenu en texte brut. |

## Related files

- 📝 [Code & implementation](./comment.component.md)
- 🎨 [Design guidelines](./comment.design.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-texts-comment-angular-ai--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.0`. Les versions sans changement d'API sont omises.

### 22.0.0

`CommentBlockComponent` :
  ~ `compact` : transform booleanAttribute → luBooleanAttribute
  ~ `small` : transform booleanAttribute → luBooleanAttribute
  ~ `chatAnswer` : transform booleanAttribute → luBooleanAttribute
`CommentComponent` :
  ~ `noInfos` : transform booleanAttribute → luBooleanAttribute
  ~ `plainText` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 22.0.0

##### Added

- `plainText` input to preserve the line breaks of the comment content.

##### Fixed

- Separator before the date is no longer displayed when the author name is empty.

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
