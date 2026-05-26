# VerticalNavigation

## Quand utiliser ce composant
- Pour créer une navigation latérale qui organise les sections d'une application.
- Lorsque vous avez besoin de regrouper des éléments de navigation sous des titres clairs.
- Pour une interface utilisateur où la navigation doit être accessible et claire, même sans icônes.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-verticalnavigation-angular-disabled--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-verticalnavigation-angular-disabled--basic)
- [Iconless](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-verticalnavigation-angular-iconless--basic)
- [Avec groupes](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-verticalnavigation-angular-basic--basic)

## Composant Figma
[Composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=13580-1866) - La Vertical navigation permet de naviguer entre différentes sections d’une interface. Variantes disponibles : pr-VerticalNavigation.

## Import

```typescript
import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
```

## Usage de base

```html
<lu-vertical-navigation heading="Section">
	<lu-vertical-navigation-item>
		<a luVerticalNavigationLink href="#">Item 1</a>
	</lu-vertical-navigation-item>
	<lu-vertical-navigation-group label="Group" icon="star">
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 2</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 3</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
</lu-vertical-navigation>
```

## Directive / Composant : `lu-vertical-navigation` ou `<lu-vertical-navigation>`
Composant principal pour afficher la navigation verticale. Utilisable sur n'importe quel élément container.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"disabled"` | Désactive le composant. |
| `"iconless"` | Présente le composant sans icônes. |

## Inputs

### `heading`
Type: `string` — Default: `''`

Titre de la section.

```html
<lu-vertical-navigation [heading]="'Titre de section'">...</lu-vertical-navigation>
```

### `disabled`
Type: `boolean` — Default: `false`

Désactive le composant.

```html
<lu-vertical-navigation [disabled]="true">...</lu-vertical-navigation>
```

### `iconless`
Type: `boolean` — Default: `false`

Présente le composant sans icônes.

```html
<lu-vertical-navigation [iconless]="true">...</lu-vertical-navigation>
```

## Patterns courants

### Navigation avec groupe
```html
<lu-vertical-navigation heading="Section">
	<lu-vertical-navigation-group label="Group">
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 1</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
</lu-vertical-navigation>
```

## Accessibilité
Assurez-vous que les éléments de navigation utilisent des liens accessibles et fournissent un titre descriptive pour chaque groupe.

## Guidelines Prisme
Respecter les directives de Prisme pour la création d'une interface utilisateur cohérente et intuitive, incluant les dos & don'ts provenant des guides de style de Zeroheight.