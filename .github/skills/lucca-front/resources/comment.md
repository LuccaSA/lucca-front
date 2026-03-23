# pr-Comment

## Quand utiliser ce composant
- Pour afficher des commentaires avec un style bien défini dans des applications de discussion ou de feedback.
- Lorsqu'il est nécessaire de présenter des contenus générés par des utilisateurs ou par un système (comme un assistant IA).
- Pour structurer des éléments de discussion dans un format conversationnel avec différents types d'utilisateurs.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-comment-angular-ai--docs)
- [Chat](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-comment-angular-ai--chat)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-comment-angular-basic--basic)
- [Chat](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-comment-angular-chat--chat)

## Composant Figma
[pr-Comment sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=18702-2534) - Composant pour l'affichage de commentaires avec différentes variantes de taille et d'alignement.

## Import

```typescript
import { CommentComponent, CommentBlockComponent, CommentChatComponent } from '@lucca-front/ng/comment';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-comment>Contenu du commentaire</lu-comment>
```

## Directive / Composant : `lu-comment` ou `<lu-comment>`

Le sélecteur pour le composant de commentaire. Applicable sur le contenu HTML pour afficher des commentaires.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"compact"` | Affiche le commentaire en mode compact |
| `"small"` | Affiche le commentaire dans une taille réduite |

```html
<lu-comment compact>Contenu du commentaire</lu-comment>
```

## Inputs

### `date`
Type: `Date` — Default: `new Date()`

La date à laquelle le commentaire a été posté.

```html
<lu-comment [date]="date">Contenu du commentaire</lu-comment>
```

### `content`
Type: `string`

Le texte du commentaire.

```html
<lu-comment content="Ceci est un commentaire.">...</lu-comment>
```

## Patterns courants

### Chat
```html
<!-- Affichage de commentaires dans un chat -->
<lu-comment-chat>
    <lu-comment-block authorName="Utilisateur">
        <lu-comment content="Bonjour ! Je suis là pour aider." />
    </lu-comment-block>
</lu-comment-chat>
```

## Accessibilité
Assurez-vous que chaque commentaire est accompagné d'un auteur et d'une date pour permettre une meilleure compréhension du contexte.

## Guidelines Prisme
- Utiliser les tailles et alignements appropriés pour améliorer la lisibilité.
- Éviter de surcharger les commentaires avec trop de texte.
- Favoriser un style cohérent à travers les différents états et types de commentaires.