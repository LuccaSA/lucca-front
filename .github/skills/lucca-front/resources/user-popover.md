# pr-UserPopover

## Quand utiliser ce composant
- Pour afficher des informations détaillées sur un collaborateur au survol de la souris.
- Lorsque vous souhaitez permettre un accès rapide à la fiche collaborateur d’un utilisateur.
- Pour offrir des redirections vers des ressources connexes comme Timmi Absences ou Timmi Office.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-index-table-html-css-actions-user-popover--docs)

## Composant Figma
[pr-UserPopover Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=18202-1181) - Ce composant affiche un popover avec des informations sur un collaborateur, incluant son poste, département, lieu de travail et ses absences. 

## Import

```typescript
import { PrUserPopoverComponent } from '@lucca-front/ng/pr-user-popover';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-user-popover></lu-user-popover>
```

## Directive / Composant : `lu-user-popover` ou `<lu-user-popover>`

Affiche un popover contenant des informations sur un collaborateur. Applicable sur les éléments HTML intégrés.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

## Inputs

### `collaborateur`
Type: `Collaborateur` — Default: `null`

Objet représentant le collaborateur pour lequel le popover affichera les informations.

```html
<lu-user-popover [collaborateur]="collaborateur"></lu-user-popover>
```

## Patterns courants

### Affichage d'un popover pour un collaborateur
```html
<!-- Affichage des informations d'un collaborateur -->
<lu-user-popover [collaborateur]="{ ... }"></lu-user-popover>
```

## Accessibilité
Veillez à ce que le popover soit correctement accessible via les assistances techniques en incluant des attributs ARIA appropriés pour décrire le contenu affiché.

## Guidelines Prisme
- Respectez la hiérarchie d'information pour faciliter la compréhension.
- Évitez de surcharger le popover avec trop d'informations.