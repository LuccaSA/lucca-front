# Commentaire

## Quand utiliser ce composant
- Lorsque vous souhaitez afficher des commentaires dans une interface utilisateur.
- Pour créer des sections de discussion où les utilisateurs peuvent interagir.
- Dans les applications de collaboration pour permettre aux utilisateurs de poster des retours sous forme de commentaires.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-comment-angular-ai--docs)
- [Chat](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-comment-angular-chat--chat)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-comment-angular-basic--basic)
- [Chat](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-comment-angular-chat--chat)

## Composant Figma
[Vue de pr-Comment sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=18702-2534) - Ce composant présente des variantes pour l'alignement (gauche/droite) et la taille (S/M).

## Import

```typescript
import { CommentBlockComponent } from '@lucca-front/ng/comment';
// ou
import { CommentChatComponent } from '@lucca-front/ng/comment';
// ou
import { CommentComponent } from '@lucca-front/ng/comment';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-comment>Votre commentaire ici</lu-comment>
```

## Directive / Composant : `lu-comment` ou `<lu-comment>`

Affichez un commentaire. Applicable sur les éléments HTML qui affichent des textes ou des interactions utilisateurs.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"align='left'"` | Aligne le commentaire à gauche |
| `"align='right'"` | Aligne le commentaire à droite |
| `"size='s'"` | Taille petite |
| `"size='m'"` | Taille moyenne |

```html
<lu-comment align="left" size="s">Commentaire aligné à gauche et en taille petite</lu-comment>
```

## Inputs

### `align`
Type: `'left' | 'right'` — Default: `'left'`

Détermine l'alignement du commentaire.

```html
<lu-comment [align]="'right'">Commentaire aligné à droite</lu-comment>
```

### `size`
Type: `'s' | 'm'` — Default: `'m'`

Détermine la taille du commentaire.

```html
<lu-comment [size]="'s'">Commentaire en taille petite</lu-comment>
```

## Patterns courants

### Simple Commentaire
```html
<!-- Affichage d'un simple commentaire -->
<lu-comment>Ce commentaire est affiché par défaut.</lu-comment>
```

## Accessibilité
Assurez-vous que le texte des commentaires est lisible et que les utilisateurs peuvent naviguer facilement en utilisant des lecteurs d'écran.

## Guidelines Prisme
- Évitez d'utiliser des polices trop petites pour les commentaires.
- Utilisez des couleurs contrastées pour assurer la lisibilité.
- Ne surchargez pas les commentaires avec trop d'informations, gardez-les concis.