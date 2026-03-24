# pr-SoftwareIcon

## Quand utiliser ce composant
- Pour afficher une icône spécifique à un logiciel dans une liste ou un tableau.
- Lors de l'illustration de fonctionnalités liées à des logiciels dans une interface utilisateur.
- Lorsque vous souhaitez mettre en avant des outils ou applications au sein d'un produit SaaS.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-software-icon-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-software-icon-angular-basic--basic)

## Composant Figma
[pr-SoftwareIcon sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=27992-3088) - Ce composant présente 49 variantes d'icônes représentant différents logiciels, certaines avec une option de couleur. Les variantes incluent des logiciels comme "Payroll Assistant", "Analytics" et "Timesheet".

## Import

```typescript
import { SoftwareIconComponent } from '@lucca-front/ng/component-library';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-software-icon product="CB - Payroll Assistant" [color]="true"></lu-software-icon>
```

## Directive / Composant : `lu-software-icon`

Composant pour afficher une icône de logiciel. Applicable sur des éléments générant un visuel directement.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut, produit non spécifié |
| `"EA - Shared documents"` | Icône pour le produit "Shared documents" avec option de couleur |
| `"CB - Payroll Assistant"` | Icône pour le produit "Payroll Assistant" avec option de couleur |
| ... | D'autres variantes disponibles selon la documentation |

```html
<lu-software-icon product="EA - Analytics" [color]="true"></lu-software-icon>
```

## Inputs

### `product`
Type: `string` — Default: `""`

Identifiant du produit pour lequel afficher l'icône.

```html
<lu-software-icon [product]="'TA - Timesheet'"></lu-software-icon>
```

### `color`
Type: `boolean` — Default: `false`

Indique si l'icône doit être affichée en couleur ou en version monochrome.

```html
<lu-software-icon [product]="'TM - Training'" [color]="true"></lu-software-icon>
```

## Patterns courants

### Afficher une icône colorée
```html
<!-- Utilisation d'une icône en couleur pour un logiciel spécifique -->
<lu-software-icon product="EA - Faces" [color]="true"></lu-software-icon>
```

## Accessibilité
Veillez à utiliser des attributs `aria-label` appropriés pour décrire l'icône pour les utilisateurs d'assistants de navigation.

## Guidelines Prisme
- Ne pas utiliser d'icônes qui ne correspondent pas à des logiciels spécifiques.
- Suivez le schéma de couleurs défini pour garantir la cohérence visuelle.