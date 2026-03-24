# FancyBox

## Quand utiliser ce composant
- Pour afficher des images, vidéos ou autres contenus multimédias de manière esthétique dans des fenêtres modales.
- Lorsqu'il est nécessaire de garder l'interface utilisateur propre tout en fournissant des informations supplémentaires sur le contenu.
- Lorsque les utilisateurs ont besoin d'une interaction améliorée avec le contenu sans quitter la page actuelle.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-fancybox-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-fancybox-angular-basic--basic)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=25658-1087) - Composant pr-FancyBox avec 4 variantes : Size=M, Responsive=True ; Size=S, Responsive=True ; Size=M, Responsive=False ; Size=S, Responsive=False.

## Import

```typescript
import { FancyBoxComponent } from '@lucca-front/ng/structure';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-fancy-box>...</lu-fancy-box>
```

## Composant : `lu-fancy-box`

Composant pour afficher des contenus multimédias dans une boîte modale.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définit la taille de la FancyBox.

```html
<lu-fancy-box [size]="'S'">...</lu-fancy-box>
```

### `responsive`
Type: `boolean` — Default: `true`

Détermine si la FancyBox doit être responsive.

```html
<lu-fancy-box [responsive]="false">...</lu-fancy-box>
```

## Patterns courants

### Affichage d'une image
```html
<lu-fancy-box [size]="'M'" [responsive]="true">
  <img src="image.jpg" alt="Description de l'image">
</lu-fancy-box>
```

## Accessibilité
Assurez-vous que les contenus multimédias inclus dans la FancyBox ont des balises alt descriptives pour l'accessibilité.

## Guidelines Prisme
- Utilisez le composant pour des contenus multimédias uniquement.
- Ne surchargez pas la FancyBox avec trop d'éléments pour éviter la distraction de l'utilisateur.
- Testez toujours les interactions sur différentes tailles d'écran pour garantir la réactivité.