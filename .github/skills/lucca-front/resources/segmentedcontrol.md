# Pr-SegmentedControl

## Quand utiliser ce composant
- Lorsque vous souhaitez offrir une navigation par onglets où une seule option peut être sélectionnée à la fois.
- Pour représenter des actions ou des catégories distinctes où l'utilisateur doit effectuer un choix.
- Lorsqu'il est important d'afficher des options rapidement accessibles pour une meilleure expérience utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-segmentedcontrol-angular-tabs--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-segmentedcontrol-angular-tabs--basic)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-segmentedcontrol-angular-basic--basic)

## Composant Figma
[Consulter le composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21275-81302) - Composant sous forme de bouton segmenté avec variants pour différentes tailles et sélections d’éléments.

## Import

```typescript
import { SegmentedControlComponent } from '@lucca-front/ng/navigation';
import { SegmentedControlTabsComponent } from '@lucca-front/ng/navigation';
import { SegmentedControlTabsPanelComponent } from '@lucca-front/ng/navigation';
import { SegmentedControlFilterComponent } from '@lucca-front/ng/navigation';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-segmented-control [size]="'M'" [selectedItem]="1">
  <lu-segmented-control-tabs>
    <lu-segmented-control-tabs-panel label="Option 1"></lu-segmented-control-tabs-panel>
    <lu-segmented-control-tabs-panel label="Option 2"></lu-segmented-control-tabs-panel>
    <lu-segmented-control-tabs-panel label="Option 3"></lu-segmented-control-tabs-panel>
  </lu-segmented-control-tabs>
</lu-segmented-control>
```

## Directive / Composant : `lu-segmented-control` ou `<lu-segmented-control>`

Composant principal pour le contrôle segmenté, applicable sur les éléments de type bouton.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut, taille M, 3 éléments |
| `"S"` | Taille petite |
| `"M"` | Taille moyenne |

```html
<lu-segmented-control [size]="'S'" [selectedItem]="0">...</lu-segmented-control>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Détermine la taille du composant, soit petit (S) soit moyen (M).

```html
<lu-segmented-control [size]="'M'">...</lu-segmented-control>
```

### `selectedItem`
Type: `number` — Default: `0`

Indique l'index de l'élément sélectionné actuellement.

```html
<lu-segmented-control [selectedItem]="1">...</lu-segmented-control>
```

## Patterns courants

### Contrôle segmenté avec 5 options
```html
<!-- Exemple de contrôle avec 5 éléments -->
<lu-segmented-control [size]="'M'" [selectedItem]="2">
  <lu-segmented-control-tabs>
    <lu-segmented-control-tabs-panel label="Option 1"></lu-segmented-control-tabs-panel>
    <lu-segmented-control-tabs-panel label="Option 2"></lu-segmented-control-tabs-panel>
    <lu-segmented-control-tabs-panel label="Option 3"></lu-segmented-control-tabs-panel>
    <lu-segmented-control-tabs-panel label="Option 4"></lu-segmented-control-tabs-panel>
    <lu-segmented-control-tabs-panel label="Option 5"></lu-segmented-control-tabs-panel>
  </lu-segmented-control-tabs>
</lu-segmented-control>
```

## Accessibilité
Le composant doit être navigable au clavier. Chaque option doit avoir une étiquette accessible pour garantir une compréhension claire par les lecteurs d'écran.

## Guidelines Prisme
- Favoriser l'utilisation de la variante la plus adaptée en fonction de l'espace disponible.
- Ne pas utiliser le contrôle segmenté pour des options qui ne sont pas mutuellement exclusives.