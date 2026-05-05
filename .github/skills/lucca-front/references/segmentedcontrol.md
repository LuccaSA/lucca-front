# SegmentedControl

## Quand utiliser ce composant
- Lorsque vous avez besoin de créer un groupe de boutons permettant à l'utilisateur de choisir une option parmi plusieurs.
- Pour afficher des onglets de navigation dans une interface utilisateur.
- Lorsqu'il est nécessaire de contrôler l'affichage d'un contenu en fonction de l'onglet sélectionné.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-segmentedcontrol-angular-tabs--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-segmentedcontrol-angular-tabs--basic)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-segmentedcontrol-angular-basic--basic)

## Composant Figma
[Voir sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21275-81302) - Le composant pr-SegmentedControl présente différentes tailles et configurations d'onglets permettant une sélection visuelle intuitive.

## Import

```typescript
import { SegmentedControlComponent, SegmentedControlTabsComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
// ou
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-segmented-control>
  <lu-segmented-control-tabs>
    <button type="button">Onglet 1</button>
    <button type="button">Onglet 2</button>
  </lu-segmented-control-tabs>
</lu-segmented-control>
```

## Directive / Composant : `lu-segmented-control` ou `<lu-segmented-control>`

Composant principal pour créer un ensemble de contrôles segmentés. Applicable sur des éléments de type boutons ou onglets.

### Inputs

### `small`
Type: `boolean` — Default: `false`

Modifie la taille du composant pour un affichage compact.

```html
<lu-segmented-control [small]="true">...</lu-segmented-control>
```

### `withNumericBadge`
Type: `boolean` — Default: `false`

Présente un exemple avec un Numeric Badge pour indiquer des notifications ou un compteur.

```html
<lu-segmented-control [withNumericBadge]="true">...</lu-segmented-control>
```

### `vertical`
Type: `boolean` — Default: `false`

Affiche le composant en vue verticale plutôt qu'horizontale.

```html
<lu-segmented-control [vertical]="true">...</lu-segmented-control>
```

## Patterns courants

### Segmented control simple
```html
<lu-segmented-control>
  <lu-segmented-control-tabs>
    <button type="button">Onglet 1</button>
    <button type="button">Onglet 2</button>
  </lu-segmented-control-tabs>
</lu-segmented-control>
```

## Accessibilité
Assurez-vous que chaque onglet a un label accessible pour que les technologies d'assistance puissent en faire la lecture. Les boutons doivent être navigables au clavier.

## Guidelines Prisme
- Utilisez des variantes de taille appropriées selon l'espace disponible.
- Ne surchargez pas le composant avec trop d'onglets, limitez-vous à un nombre raisonnable (maximum 5).
- Assurez-vous que l'état sélectionné est clairement visible pour l'utilisateur.