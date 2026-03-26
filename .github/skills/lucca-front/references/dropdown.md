# Dropdown Menu

## Quand utiliser ce composant
- Pour permettre à l'utilisateur de choisir parmi une liste d'actions rapidement à partir d'un bouton.
- Pour afficher des options contextuelles liées à l'élément sur lequel l'utilisateur interagit.
- Pour organiser des actions de manière compacte, sans surcharger l'interface utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-index-table-html-css-actions-dropdown--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-overlays-dropdown-angular-basic--basic)
- [Component](https://lucca-front.lucca.io/storybook/?path=/story/documentation-overlays-dropdown-angular-component--component)
- [Directive](https://lucca-front.lucca.io/storybook/?path=/story/documentation-overlays-dropdown-angular-directive-legacy--directive)
- [Directive](https://lucca-front.lucca.io/storybook/?path=/story/documentation-overlays-dropdown-angular-directive--directive)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=26837-32810) — Le Dropdown présente un design épuré permettant d'afficher des options. Variantes : pr-DropdownMenu.

## Import

```typescript
import { LuDropdownModule } from '@lucca-front/ng/dropdown';
```

## Usage de base

```html
<!-- Usage minimal -->
<button type="button" luButton [luDropdown]="dropdown">Dropdown</button>

<lu-dropdown #dropdown>
	<li class="dropdown-list-option" lu-dropdown-item>
		<lu-icon icon="eye" />
		Prévisualiser
	</li>
	<li class="dropdown-list-option" lu-dropdown-item>
		<a routerLink="." fragment="link2" class="dropdown-list-option-action">
			<lu-icon icon="officePen" />
			Éditer
		</a>
	</li>
	<li class="dropdown-list-option" lu-dropdown-item>
		<button type="button" class="dropdown-list-option-action mod-critical">
			<lu-icon icon="trashDelete" />
			Supprimer
		</button>
	</li>
</lu-dropdown>
```

## Directive / Composant : `[luDropdown]` ou `lu-dropdown-action`, `lu-dropdown-divider`, `lu-dropdown-group`, `lu-dropdown-item`, `lu-dropdown-menu`

Le sélecteur `[luDropdown]` est utilisé pour activer le Dropdown sur un élément déclencheur. Applicable principalement sur les boutons et éléments qui nécessitent des options contextuelles.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

## Inputs

### `luDropdown`
Type: `LuDropdown` — Default: `undefined`

Définit l'instance de Dropdown à afficher lorsque l'élément déclencheur est activé.

```html
<button type="button" luButton [luDropdown]="dropdown">Dropdown</button>
```

## Patterns courants

### Dropdown Basique
```html
<!-- Un Dropdown simple avec des actions -->
<button type="button" luButton [luDropdown]="dropdown">Dropdown</button>

<lu-dropdown #dropdown>
	<li class="dropdown-list-option" lu-dropdown-item>
		<lu-icon icon="eye" />
		Prévisualiser
	</li>
	<li class="dropdown-list-option" lu-dropdown-item>
		<a routerLink="." fragment="link2" class="dropdown-list-option-action">
			<lu-icon icon="officePen" />
			Éditer
		</a>
	</li>
	<li class="dropdown-list-option" lu-dropdown-item>
		<button type="button" class="dropdown-list-option-action mod-critical">
			<lu-icon icon="trashDelete" />
			Supprimer
		</button>
	</li>
</lu-dropdown>
```

## Accessibilité
Assurez-vous que le Dropdown est accessible via le clavier et qu'il est compatible avec les lecteurs d'écran. L'élément déclencheur doit avoir un label accessible et les éléments du Dropdown doivent être navigables.

## Guidelines Prisme
- Favoriser l'utilisation de Dropdown pour des actions contextuelles.
- Évitez de surcharger le Dropdown avec trop d'options pour maintenir la clarté.
- S'assurer que chaque action soit claire et identifiable pour l'utilisateur.