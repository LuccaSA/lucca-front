# pr-DropdownMenu

## Quand utiliser ce composant
- Pour afficher un menu d'actions liées à un élément de contenu.
- Pour constituer une liste d'options contextuelles à choisir lors d'une interaction utilisateur.
- Pour gérer des éléments d'interface plus complexes comme des groupes d'actions qui nécessitent une séparation visuelle.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-index-table-html-css-actions-dropdown--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-overlays-dropdown-angular-basic--basic)
- [Component](https://lucca-front.lucca.io/storybook/?path=/story/documentation-overlays-dropdown-angular-component--component)
- [Directive](https://lucca-front.lucca.io/storybook/?path=/story/documentation-overlays-dropdown-angular-directive-legacy--directive)
- [Directive](https://lucca-front.lucca.io/storybook/?path=/story/documentation-overlays-dropdown-angular-directive--directive)

## Composant Figma
[Pr-DropdownMenu sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=26837-32810) - Ce composant représente un menu déroulant avec des actions listées et peut contenir des éléments comme des diviseurs pour séparer visuellement les groupes. Variante disponible : pr-DropdownMenu.

## Import

```typescript
import { DropdownMenuComponent } from '@lucca-front/ng/dropdown';
// ou
import { LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
```

## Usage de base

```html
<!-- Usage minimal -->
<button luDropdown>Options</button>
<lu-dropdown-menu>
  <lu-dropdown-item>Action 1</lu-dropdown-item>
  <lu-dropdown-divider></lu-dropdown-divider>
  <lu-dropdown-item>Action 2</lu-dropdown-item>
</lu-dropdown-menu>
```

## Directive / Composant : `lu-dropdown` ou `[luDropdown]`

Utilisé pour activer le menu déroulant sur un élément, généralement un bouton.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<button luDropdown>Options</button>
```

## Inputs

### `luDropdown`
Type: `boolean` — Default: `false`

Active ou désactive le composant Dropdown.

```html
<button [luDropdown]="true">Options</button>
```

## Patterns courants

### Dropdown avec actions
```html
<button luDropdown>Actions</button>
<lu-dropdown-menu>
  <lu-dropdown-item>Modifier</lu-dropdown-item>
  <lu-dropdown-item>Supprimer</lu-dropdown-item>
</lu-dropdown-menu>
```

## Accessibilité
Assurez-vous que le menu déroulant puisse être navigué au clavier et que les éléments soient clairement labellisés pour les lecteurs d'écran.

## Guidelines Prisme
- Utilisez les icônes appropriées pour chaque action.
- Évitez l'encombrement visuel en limitant le nombre d'options présentées dans le dropdown.
- Assurez-vous que les options sont suffisamment distinctes et faciles à sélectionner pour l'utilisateur.