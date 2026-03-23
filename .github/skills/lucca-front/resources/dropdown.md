# Dropdown

## Quand utiliser ce composant
- Pour afficher des options d'actions contextuelles liées à un élément.
- Lorsqu'il est nécessaire d'afficher des informations supplémentaires sans encombrer l'interface.
- Pour regrouper plusieurs actions sous un même élément interactif.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-index-table-html-css-actions-dropdown--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-overlays-dropdown-angular-basic--basic)
- [Component](https://lucca-front.lucca.io/storybook/?path=/story/documentation-overlays-dropdown-angular-component--component)
- [Directive Legacy](https://lucca-front.lucca.io/storybook/?path=/story/documentation-overlays-dropdown-angular-directive-legacy--directive)
- [Directive](https://lucca-front.lucca.io/storybook/?path=/story/documentation-overlays-dropdown-angular-directive--directive)

## Composant Figma
[Pr-DropdownMenu Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=26837-32810) - Le Dropdown est présenté avec différentes variantes, permettant d'afficher des listes d'options de manières variées.

## Import

```typescript
import { LuDropdownModule } from '@lucca-front/ng/dropdown';
```

## Usage de base

```html
<!-- Utilisation minimale -->
<button type="button" class="button" [luDropdown]="dropdown">Open dropdown</button>
<lu-dropdown #dropdown>
    <li class="dropdown-list-option">
        <span class="dropdown-list-option-action is-disabled" luDropdownItem>
            <span aria-hidden="true" class="lucca-icon icon-eye"></span>
            Prévisualiser
        </span>
    </li>
    <li class="dropdown-list-option">
        <a routerLink="." fragment="link2" class="dropdown-list-option-action" luDropdownItem>
            <span aria-hidden="true" class="lucca-icon icon-officePen"></span>
            Éditer
        </a>
    </li>
    <li class="dropdown-list-option">
        <button type="button" class="dropdown-list-option-action mod-critical" luDropdownItem>
            <span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
            Supprimer
        </button>
    </li>
</lu-dropdown>
```

## Directive / Composant : `luDropdown` ou `<lu-dropdown>`

Directive appliquée à un bouton pour activer le menu déroulant. Peut être utilisée sur un bouton ou un autre élément cliquable.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<button type="button" [luDropdown]="dropdown">...</button>
```

## Inputs

### Aucun
Aucun input principal n'est spécifié pour ce composant.

## Patterns courants

### Dropdown avec options
```html
<lu-dropdown #dropdown>
    <li class="dropdown-list-option">
        <span class="dropdown-list-option-action" luDropdownItem>Option 1</span>
    </li>
    <li class="dropdown-list-option">
        <span class="dropdown-list-option-action" luDropdownItem>Option 2</span>
    </li>
</lu-dropdown>
```

## Accessibilité
S'assurer que les éléments de la liste soient accessibles via le clavier et que les éléments désactivés soient clairement indiqués. Utiliser des aria-labels ou des descriptions pour améliorer l'accessibilité.

## Guidelines Prisme
- Avant de dévoiler des actions, s'assurer que le contexte de l'utilisateur est clair.
- Éviter d'encombrer le dropdown avec trop d'options. Prioriser la clarté et la simplicité.
- Toujours inclure une action "Annuler" ou "Fermer" si le dropdown déclenche des changements d'état significatifs.