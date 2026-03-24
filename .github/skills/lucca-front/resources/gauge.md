# pr-Gauge

## Quand utiliser ce composant
- Pour afficher un indicateur de performance ou de statut avec des visuels intuitifs.
- Dans des tableaux de bord pour représenter des métriques de façon visuelle.
- Lors de la présentation de données dans des applications où l'espace est limité, mais des informations doivent être perçues rapidement.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-gauge-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-gauge-angular-basic--basic)

## Composant Figma
[Vue du composant pr-Gauge sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=31115-14785) — Ce composant est disponible en plusieurs variantes : différentes palettes (Product, Success, Error, Warning, Neutral) et deux modes d'épaisseur (Thin et non-Thin), ainsi que des options circulaires.

## Import

```typescript
import { GaugeComponent } from '@lucca-front/ng/loading';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-gauge></lu-gauge>
```

## Directive / Composant : `lu-gauge` ou `<lu-gauge>`

Composant pour afficher une jauge. Applicable sur les éléments HTML comme `<lu-gauge>`.

### Valeurs

| Valeur           | Description                           |
|------------------|---------------------------------------|
| `""` (vide)      | Variante par défaut                   |
| `"success"`      | Palettes de succès                   |
| `"error"`        | Palettes d'erreur                    |
| `"warning"`      | Palettes d'avertissement              |
| `"neutral"`      | Palettes neutres                      |
| `"product"`      | Palettes de produit                   |
| `"thin"`         | Mode d'affichage fin                  |
| `"circular"`     | Jauge en mode circulaire              |

```html
<lu-gauge palette="success" thin="true" circular="false"></lu-gauge>
```

## Inputs

### `palette`
Type: `'product' | 'success' | 'error' | 'warning' | 'neutral'` — Default: `'product'`

Palette des couleurs pour la jauge.

```html
<lu-gauge [palette]="'success'"></lu-gauge>
```

### `thin`
Type: `boolean` — Default: `false`

Indique si la jauge doit être affichée en mode épais ou fin.

```html
<lu-gauge [thin]="true"></lu-gauge>
```

### `circular`
Type: `boolean` — Default: `false`

Indique si la jauge doit être affichée en mode circulaire.

```html
<lu-gauge [circular]="true"></lu-gauge>
```

## Patterns courants

### Jauge de succès
```html
<lu-gauge palette="success" thin="false" circular="true"></lu-gauge>
```

## Accessibilité
Veillez à fournir une alternative textuelle lorsque cela est possible pour aider les utilisateurs de lecteurs d'écran à comprendre ce que représente la jauge.

## Guidelines Prisme
- Utiliser des palettes de couleurs cohérentes et accessibles pour assurer une lisibilité adéquate.
- Évitez d'utiliser des couleurs uniquement pour transmettre des informations critiques; combinez-les avec des icônes ou des textes descriptifs.