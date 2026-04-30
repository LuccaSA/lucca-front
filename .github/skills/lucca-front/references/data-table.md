# Composant Data Table

## Quand utiliser ce composant
- Afficher et consulter des données sous forme tabulaire organisées en lignes et colonnes.
- Permettre à l'utilisateur de trier des données dans un tableau par l'entête des colonnes.
- Offrir des interactions avancées sur des données tabulaires : sélection de lignes, réorganisation de colonnes, etc.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-data-table-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-basic--basic)
- [Draggable](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-draggable--basic)
- [Avec données injectées](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-inject--basic)
- [Gestion des débordements](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-overflow--basic)
- [Responsive](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-responsive--basic)

## Composant Figma
[Consulter les maquettes sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=23373-9022)  
Le tableau de données existe sous forme neutre avec des variantes avancées telles que les états de sélection.

## Import

```typescript
import { DataTableComponent } from '@lucca-front/ng/listings';
import { DataTableBodyComponent } from '@lucca-front/ng/listings';
import { DataTableHeadComponent } from '@lucca-front/ng/listings';
import { DataTableFootComponent } from '@lucca-front/ng/listings';
import { DataTableRowComponent } from '@lucca-front/ng/listings';
import { DataTableRowCellComponent } from '@lucca-front/ng/listings';
import { DataTableRowCellHeaderComponent } from '@lucca-front/ng/listings';
```

## Usage de base

```html
<lu-data-table>
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>En-tête 1</th>
			<th luDataTableCell>En-tête 2</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<td luDataTableCell>Donnée 1.1</td>
			<td luDataTableCell>Donnée 1.2</td>
		</tr>
		<tr luDataTableRow>
			<td luDataTableCell>Donnée 2.1</td>
			<td luDataTableCell>Donnée 2.2</td>
		</tr>
	</tbody>
</lu-data-table>
```

## Directive / Composant : `lu-data-table`

Le composant principal permettant le rendu de données dans une structure tabulaire.

### Inputs

#### `sort`
Type : `boolean` — Default : `false`  
Définit l'état de tri d'une cellule d'en-tête. Active un comportement de tri au clic.

```html
<th luDataTableCell [sort]="true">Colonne triable</th>
```

#### `align`
Type : `'start' | 'center' | 'end'` — Default : `'start'`  
Aligne le contenu des cellules horizontalement.

```html
<td luDataTableCell align="center">Donnée centrée</td>
```

#### `verticalAlign`
Type : `'top' | 'middle' | 'bottom'` — Default : `'top'`  
Aligne le contenu des cellules verticalement.

```html
<td luDataTableCell verticalAlign="middle">Donnée centrée verticalement</td>
```

#### `inlineSize`
Type : `number` — Default : undefined  
Définit la largeur en pixels d'une colonne. Fonctionne uniquement lorsque `layoutFixed` est activé.

```html
<th luDataTableCell [inlineSize]="200">Colonne largeur fixe</th>
```

#### `selected`
Type : `boolean` — Default : `false`  
Définit si une ligne est sélectionnée.

```html
<tr luDataTableRow [selected]="true">...</tr>
```

#### `selectedLabel`
Type : `string` — Default : undefined  
Texte alternatif affiché lors de la sélection d'une ligne.

#### `selectedLabelHead`
Type : `string` — Default : undefined  
Texte alternatif affiché lors de la sélection de toutes les lignes.

#### `selectable`
Type : `boolean` — Default : `false`  
Permet de rendre les lignes sélectionnables (via des cases à cocher).

```html
<lu-data-table [selectable]="true">
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>...</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<td luDataTableCell>...</td>
		</tr>
	</tbody>
</lu-data-table>
```

#### `drop`
Type : `EventEmitter<CdkDragDrop<any>>` — Default : undefined  
Événement émis lorsqu'un élément est déplacé et déposé dans le tableau.

```html
<lu-data-table [cdkDropListDropped]="onDrop($event)">
	<tr luDataTableRow cdkDrag>...</tr>
</lu-data-table>
```

## Patterns courants

### Tableau triable
```html
<lu-data-table>
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell sort>Donnée</th>
			<th luDataTableCell sort>Donnée</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<td luDataTableCell>1</td>
			<td luDataTableCell>A</td>
		</tr>
		<tr luDataTableRow>
			<td luDataTableCell>2</td>
			<td luDataTableCell>B</td>
		</tr>
	</tbody>
</lu-data-table>
```

### Tableau avec glisser-déposer
```html
<lu-data-table cdkDropList (cdkDropListDropped)="onDrop($event)">
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>Données</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow cdkDrag>
			<td luDataTableCell>Row 1</td>
		</tr>
		<tr luDataTableRow cdkDrag>
			<td luDataTableCell>Row 2</td>
		</tr>
	</tbody>
</lu-data-table>
```

## Accessibilité
- Assurez-vous d'utiliser des balises `<th>` avec `scope="col"` ou `scope="row"` selon leur fonction pour une bonne compatibilité avec les lecteurs d'écran.
- Utilisez les attributs `aria-selected` pour signaler l'état de sélection des lignes, si applicable.
- Pour les tables complexes, spécifiez les relations entre les cellules et les en-têtes avec les attributs `headers`.

## Guidelines Prisme
[Aperçu des bonnes pratiques sur Zeroheight](https://prisme.lucca.io/94310e217/v/latest/p/68bde1)