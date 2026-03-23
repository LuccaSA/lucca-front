# pr-SegmentedControl

## Quand utiliser ce composant
1. Pour créer une interface utilisateur permettant aux utilisateurs de sélectionner un élément parmi plusieurs options de manière intuitive.
2. Lorsqu'il est nécessaire de présenter des options sous forme de boutons, facilitant l'accès rapide aux choix dans un espace réduit.
3. Pour des interactions où le changement de sélection doit déclencher automatiquement une mise à jour des contenus associés, comme des panels d'information.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-segmentedcontrol-angular-tabs--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-segmentedcontrol-angular-tabs--basic)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-segmentedcontrol-angular-basic--basic)

## Composant Figma
[Vue du composant pr-SegmentedControl sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21275-81302) - Le composant se présente comme un ensemble de boutons de sélection, avec différentes tailles et options de sélection disponibles. Variantes : tailles (S, M), nombre d'éléments (2 à 5), éléments sélectionnés (1er à 5ème).

## Import

```typescript
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
// ou
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmented-control-tabs';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-segmented-control>
    <lu-segmented-control-filter label="Option 1" value="0"></lu-segmented-control-filter>
    <lu-segmented-control-filter label="Option 2" value="1"></lu-segmented-control-filter>
</lu-segmented-control>
```

## Directive / Composant : `lu-segmented-control` ou `<lu-segmented-control>`

Ce sélecteur est utilisé pour créer un contrôle segmenté. Il est applicable sur les éléments HTML comme `<lu-segmented-control>` et permet de regrouper plusieurs options.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"small"` | Réduit la taille du contrôle segmenté |
| `"vertical"` | Affiche les options en vertical |

```html
<lu-segmented-control small vertical>
    <lu-segmented-control-filter label="Option" value="0"></lu-segmented-control-filter>
</lu-segmented-control>
```

## Inputs

### `small`
Type: `boolean` — Default: `false`

Modifie la taille du composant.

```html
<lu-segmented-control [small]="true">...</lu-segmented-control>
```

### `withNumericBadge`
Type: `boolean` — Default: `false`

Présente un exemple avec un badge numérique à côté de l'option.

```html
<lu-segmented-control [withNumericBadge]="true">...</lu-segmented-control>
```

### `vertical`
Type: `boolean` — Default: `false`

Affiche le composant en disposition verticale.

```html
<lu-segmented-control [vertical]="true">...</lu-segmented-control>
```

## Patterns courants

### Utilisation avec un Badge Numérique
```html
<ng-template #label>
    Option <lu-numeric-badge value="8"></lu-numeric-badge>
</ng-template>
<lu-segmented-control [(ngModel)]="sample">
    <lu-segmented-control-filter [label]="label" value="0" />
    <lu-segmented-control-filter label="Option 2" value="1" />
</lu-segmented-control>
```

## Accessibilité
Assurez-vous que chaque option du contrôle segmenté possède un label accessible, facilitant la navigation pour les utilisateurs de lecteurs d'écran.

## Guidelines Prisme
- Utiliser des labels clairs et concis pour chaque option du contrôle segmenté.
- Éviter de superposer des éléments ou d'utiliser des couleurs qui nuisent à la lisibilité.