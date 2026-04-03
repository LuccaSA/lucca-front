# pr-HighlightData

## Quand utiliser ce composant
1. Pour afficher des données clés sous forme de bulles d'information dans un tableau ou une liste.
2. Lorsqu'il est nécessaire de faire ressortir des données importantes avec des retours visuels en fonction de leur état.
3. Pour intégrer des bulles d'informations à côté d'autres composants, comme des boutons, pour contextualiser les actions.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-highlight-data-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-highlight-data-angular-basic--template)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28445-185189) - Composant pr-HighlightData avec 54 variantes disponibles, permettant une personnalisation par taille, thème, priorités de données et retour visuel.

## Import

```typescript
import { HighlightDataComponent } from '@lucca-front/ng/highlight-data';
import { LinkComponent } from '@lucca-front/ng/link';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-highlight-data palette="..." ...>...</lu-highlight-data>
```

## Directive / Composant : `lu-highlight-data`

Sélecteur permettant l'affichage des données sous forme de bulles. Applicable sur tout élément HTML.

### Valeurs (si directive avec valeurs)

Aucune valeur spécifique listée pour la directive.

## Inputs

### `palette`
Type: `string` — Default: `""`

La palette influençant également la couleur du SVG des bulles et donc l’URL associée, il est nécessaire de renseigner la gamme.

```html
<lu-highlight-data [palette]="'primary'">...</lu-highlight-data>
```

## Patterns courants

### Mise en avant des données
```html
<!-- Exemple de mise en avant de données critiques -->
<lu-highlight-data palette="warning">Données critiques ici</lu-highlight-data>
```

## Accessibilité
Assurez-vous que chaque bulle de données est contextualisée et que les couleurs utilisées respectent les contrastes pour une meilleure visibilité.

## Guidelines Prisme
- Utiliser des palettes de couleurs cohérentes pour les bulles.
- Évitez d’utiliser trop de feedbacks différents dans un même contexte, optez pour une hiérarchie claire des informations.
- Ne pas surcharger les données mises en avant pour maintenir la lisibilité.