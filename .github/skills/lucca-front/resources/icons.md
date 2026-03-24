# pr-Icon

## Quand utiliser ce composant
- Pour afficher des icônes dans des listes ou tableaux.
- Lorsqu'un élément graphique est nécessaire pour améliorer l'interface utilisateur.
- Quand une présentation visuelle cohérente est requise à travers l'application.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-listing-html-css-icons--docs)

## Composant Figma
[Voir le composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34358-50637) - Ce composant représente différentes tailles d'icônes adaptées aux contextes variés. Variantes disponibles: Size=S, Size=XS, Size=XXS, Size=XXL, Size=L, Size=XL, Size=M.

## Import

```typescript
import { IconComponent } from '@lucca-front/ng/icons';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-icon size="M"></lu-icon>
```

## Directive / Composant : `lu-icon` ou `<lu-icon>`

Composant utilisé pour afficher une icône. Applicable sur les éléments HTML qui nécessitent une représentation d'icône.

### Valeurs (si directive avec valeurs)

| Valeur | Description         |
|--------|---------------------|
| `""` (vide) | Variante par défaut |
| `"XS"`  | Petite icône         |
| `"S"`   | Icône standard       |
| `"M"`   | Icône moyenne        |
| `"L"`   | Grande icône         |
| `"XL"`  | Très grande icône    |
| `"XXL"` | Icône extra large    |

```html
<lu-icon size="S"></lu-icon>
```

## Inputs

### `size`
Type: `'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'` — Default: `'M'`

Définit la taille de l'icône pour l'affichage.

```html
<lu-icon [size]="'L'"></lu-icon>
```

## Patterns courants

### Icône dans un bouton
```html
<!-- Utilisation d'une icône dans un bouton -->
<button type="button">
  <lu-icon size="S"></lu-icon>
  Action
</button>
```

## Accessibilité
Assurez-vous que chaque icône a un équivalent textuel accessible pour les utilisateurs de lecteurs d'écran.

## Guidelines Prisme
- Privilégier l'utilisation d'icônes qui respectent l'identité visuelle de Lucca.
- Ne pas surcharger l'interface avec trop d'icônes.
- Utiliser des tailles d'icônes appropriées pour chaque contexte.