# pr-Comment

## Quand utiliser ce composant
- Pour afficher une discussion ou un chat entre plusieurs utilisateurs.
- Pour afficher des commentaires sur des articles ou des publications.
- Pour visualiser des réponses d'un assistant virtuel ou d'une IA.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-comment-angular-ai--docs)
- [Chat](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-comment-angular-ai--chat)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-comment-angular-basic--basic)
- [Chat](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-comment-angular-chat--chat)

## Composant Figma
[Vue Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=18702-2534) - Composant pr-Comment avec plusieurs variantes disponibles, y compris alignement à gauche/droite et différentes tailles.

## Import

```typescript
import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
```

## Usage de base

```html
<lu-comment>
    <ng-template #avatarTpl>
        <lu-user-picture [user]="{firstName: 'Marie', lastName: 'Bragoulet'}" />
    </ng-template>
    <lu-comment [date]="date" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit." />
</lu-comment>
```

## Directive / Composant : `lu-comment` ou `<lu-comment>`

Le sélecteur pour le composant principal, utilisé pour afficher un commentaire.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-comment [date]="date" content="Votre commentaire ici" />
```

## Inputs

### `noAvatar`
Type: `boolean` — Default: `false`

Masque l'avatar.

```html
<lu-comment-block [noAvatar]="true">...</lu-comment-block>
```

### `compact`
Type: `boolean` — Default: `false`

N'affiche l'auteur que sur le premier commentaire.

```html
<lu-comment-block [compact]="true">...</lu-comment-block>
```

### `small`
Type: `boolean` — Default: `false`

Modifie la taille du composant.

```html
<lu-comment-block [small]="true">...</lu-comment-block>
```

### `date`
Type: `Date` — Default: `new Date()`

Modifie la date du commentaire.

```html
<lu-comment [date]="new Date()"></lu-comment>
```

### `datePipeFormat`
Type: `'mediumDate' | 'YYYY'` — Default: `mediumDate`

Modifie le format de date affiché, via Angular DatePipe.

```html
<lu-comment [datePipeFormat]="'YYYY'">...</lu-comment>
```

### `firstName`
Type: `string` — Default: `''`

Modifie le prénom de l'auteur.

```html
<lu-comment-block [firstName]="'Marie'">...</lu-comment-block>
```

### `lastName`
Type: `string` — Default: `''`

Modifie le nom de l'auteur.

```html
<lu-comment-block [lastName]="'Bragoulet'">...</lu-comment-block>
```

## Patterns courants

### Affichage de commentaires avec avatars et date
```html
<lu-comment-chat>
    <lu-comment-block authorName="Marie">
        <ng-template #avatarTpl>
            <lu-user-picture [user]="{firstName: 'Marie', lastName: 'Bragoulet'}" />
        </ng-template>
        <lu-comment [date]="date" content="Commentaire ici." />
    </lu-comment-block>
</lu-comment-chat>
```

## Accessibilité
Assurez-vous que tous les commentaires incluent des informations significatives pour les utilisateurs d'assistants vocaux.

## Guidelines Prisme
- Utiliser des tailles de texte cohérentes pour une meilleure lisibilité.
- Ne pas utiliser des alias d'utilisateur non désirés dans les commentaires.