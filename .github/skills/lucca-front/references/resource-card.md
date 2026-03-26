# ResourceCard

## Quand utiliser ce composant
- Pour afficher des informations clés sur une ressource de manière compacte et attrayante.
- En tant qu’élément d’interface utilisateur interactif qui peut inclure des boutons d'action, des badges de statut et des balises.
- Dans des listes ou des tableaux où les utilisateurs peuvent faire glisser et déposer des éléments, facilitant ainsi la réorganisation des ressources.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-resource-card-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-resource-card-angular-basic--basic)
- [Drag and Drop](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-resource-card-angular-drag-and-drop--basic)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=33040-8381) + Description visuelle : La carte présente un design moderne et épuré, avec plusieurs variantes selon les états (Hover, Disabled, etc.), tailles (S, M) et mises en page (Stacked, Grid).

## Import

```typescript
import { ResourceCardComponent, ResourceCardButtonComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { LinkComponent } from '@lucca-front/ng/link';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
```

## Usage de base

```html
<lu-resource-card>
  <button luResourceCardAction>Action</button>
  <a luResourceCardAction>Lien</a>
</lu-resource-card>
```

## Directive / Composant : `lu-resource-card` ou `<lu-resource-card>`

Composant principal pour visualiser une ressource. Applicable uniquement sur un élément `<lu-resource-card>`.

### Valeurs (si directive avec valeurs)

Aucune valeur spécifique n'est fournie pour cette directive.

## Inputs

### Aucun
Aucun input n'est spécifié pour ce composant.

## Patterns courants

### Affichage d'une carte de ressource
```html
<lu-resource-card>
  <span>Nom de la ressource</span>
  <button luResourceCardAction>Modifier</button>
  <a luLink href="#">Détails</a>
  <lu-status-badge>Statut</lu-status-badge>
  <lu-tag>Tag</lu-tag>
</lu-resource-card>
```

## Accessibilité
S'assurer que tous les éléments interactifs (boutons, liens) sont accessibles via le clavier et que des descriptions appropriées sont fournies pour les utilisateurs d'assistance.

## Guidelines Prisme
- Favoriser la cohérence visuelle et fonctionnelle à travers l'utilisation des tailles et des états définis.
- Éviter d'encombrer la carte avec trop d'éléments interactifs.
- Utiliser des badges et des balises de manière appropriée pour indiquer des informations supplémentaires sur les ressources.