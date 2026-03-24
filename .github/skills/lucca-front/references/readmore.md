# pr-ReadMore

## Quand utiliser ce composant
1. Pour afficher un texte long de manière compacte, en permettant à l'utilisateur de développer ou réduire le contenu.
2. Lorsqu'il est nécessaire de restreindre le contenu visible à quelques lignes tout en offrant la possibilité d'en lire plus.
3. Pour améliorer la lisibilité en ne montrant qu'un extrait d'une information plus vaste dans une interface.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-readmore-angular-ai--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-readmore-angular-ai--basic)

## Composant Figma
[Consulter le design sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=27984-193) - Composant pr-ReadMore avec 6 variantes disponibles, adaptées à différents scénarios d'utilisation.

## Import

```typescript
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
```

## Usage de base

```html
<lu-read-more textFlow lineClamp="2">
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
</lu-read-more>
```

## Directive / Composant : `lu-read-more`

Sélecteur du composant pr-ReadMore. Permet d'afficher un texte développable.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"sunken"` | Surface enfoncée |
| `"raised"` | Surface surélevée |

```html
<lu-read-more surface="raised" lineClamp="3">...</lu-read-more>
```

## Inputs

### `lineClamp`
Type: `number` — Default: `2`

Modifie le nombre de lignes affichées à l'état replié.

```html
<lu-read-more [lineClamp]="3">...</lu-read-more>
```

### `surface`
Type: `'default' | 'sunken' | 'raised'` — Default: `'default'`

Modifie la couleur de fond sous le bouton "Lire plus / moins".

```html
<lu-read-more surface="sunken">...</lu-read-more>
```

### `textFlow`
Type: `boolean` — Default: `true`

Applique les espacements du composant Text flow.

```html
<lu-read-more [textFlow]="false">...</lu-read-more>
```

### `openOnly`
Type: `boolean` — Default: `false`

Empêche la fermeture du composant en masquant le bouton "Lire moins".

```html
<lu-read-more [openOnly]="true">...</lu-read-more>
```

### `innerContent`
Type: `string` — Default: `''`

Permet de passer le contenu via un innerHTML.

```html
<lu-read-more [innerContent]="contentVariable">...</lu-read-more>
```

## Patterns courants

### Affichage de texte repliable
```html
<lu-read-more lineClamp="2" surface="default">
	<p>Voici un extrait de texte qui peut être développé...</p>
</lu-read-more>
```

## Accessibilité
Assurez-vous que les fonctionnalités de développement et de réduction du contenu sont accessibles via la navigation au clavier et clairement indiquées par des étiquettes.

## Guidelines Prisme
- Évitez de surcharger l'utilisateur avec trop d'informations. Utiliser le composant pour améliorer la lisibilité et ne présenter que les informations essentielles.
- Ne pas utiliser le composant pour des informations critiques qui doivent toujours être visibles.