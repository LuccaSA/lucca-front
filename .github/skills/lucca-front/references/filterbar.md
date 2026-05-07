# FilterBar

## Quand utiliser ce composant
- Lorsqu'il est nécessaire de filtrer des listes ou des données en fonction de critères spécifiques.
- Pour afficher des options de filtrage de manière organisée et intuitive.
- Lors de l'utilisation de segments pour catégoriser des éléments, notamment dans des tableaux ou des listes complexes.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-filterspills-filterbar-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-filterspills-filterbar-angular--basic)

## Composant Figma
[pr-FilterBar (v19.2)](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=26824-221178) — Composant visuel facilite l'organisation des filtres. Variantes disponibles : Type=Full, Type=Views only, Type=Right-align views, Type=FilterPills only.

## Import

```typescript
import { FilterBarComponent } from '@lucca-front/ng/filter-pills';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-filter-bar>...</lu-filter-bar>
```

## Directive / Composant : `lu-filter-bar`

Composant principal pour créer des barres de filtrage. Applicable uniquement sur le contexte de filtre.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

## Inputs

### Aucune input spécifiée

## Patterns courants

### Utilisation du FilterBar avec des filtres
```html
<lu-filter-bar>
	<lu-segmented-control *luFilterPillAddonBefore [(ngModel)]="example">
		<lu-segmented-control-filter label="Tous" value="0" />
		<lu-segmented-control-filter label="En cours d’approbation" value="1" />
		<lu-segmented-control-filter label="Approuvés" value="2" />
		<lu-segmented-control-filter label="Clos" value="3" />
	</lu-segmented-control>
	<lu-filter-pill label="Inclure les collaborateurs partis" optional name="includeFormerEmployees">
		<lu-checkbox-input [ngModel]="false" />
	</lu-filter-pill>
	<lu-filter-pill label="Date de début" optional name="startingDate">
		<lu-date-input [(ngModel)]="example1" />
	</lu-filter-pill>
	<lu-filter-pill label="Période">
		<lu-date-range-input [(ngModel)]="examplePeriod" />
	</lu-filter-pill>
	<lu-filter-pill label="Multi ApiV4" optional name="multiv4">
		<lu-multi-select [ngModel]="[]" apiV4="/organization/structure/api/establishments" filterPillLabelPlural="établissements" />
	</lu-filter-pill>
	<lu-form-field label="Test" hiddenLabel>
		<lu-text-input [ngModel]="example2" [ngModelOptions]="{ standalone: true }" hasSearchIcon hasClearer />
	</lu-form-field>
	<button *luFilterPillAddonAfter type="submit" size="S" luButton="outlined">Exporter</button>
</lu-filter-bar>
```

## Accessibilité
Veiller à fournir des labels accessibles pour les inputs, notamment pour les éléments de type `lu-filter-pill` et les contrôles de filtre, afin d'assurer une navigation optimale pour les utilisateurs de lecteurs d'écran.

## Guidelines Prisme
Les guidelines de Zeroheight sont disponibles et doivent être suivies pour garantir la cohérence du design avec les principes de Lucca. Assurez-vous de consulter les directives spécifiques concernant l'utilisation des composants de formulaire.