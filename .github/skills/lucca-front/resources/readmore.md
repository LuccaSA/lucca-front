# pr-ReadMore

## Quand utiliser ce composant
- Lorsque vous devez afficher du texte long qui peut être tronqué pour améliorer la lisibilité.
- Pour des fonctionnalités de lecture condensée où l'utilisateur peut voir plus de contenu sur demande.
- Lors de l'affichage de résumés d'articles, d'actualités ou de tout autre contenu qui nécessite une interaction pour lire la suite.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-readmore-angular-ai--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-readmore-angular-ai--basic)

## Composant Figma
[Design dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=27984-193). Variantes disponibles: 
- Taille M, Surface Sunken
- Taille M, Surface Raised
- Taille S, Surface Default
- Taille S, Surface Sunken
- Taille M, Surface Default
- Taille S, Surface Raised

## Import

```typescript
import { ReadMoreComponent } from '@lucca-front/ng/texts';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-read-more texte="Votre texte ici" [ouvert]="false"></lu-read-more>
```

## Directive / Composant : `lu-read-more`

Composant permettant d'afficher un texte qui peut être étendu ou réduit. Applicable sur les éléments HTML contenant du texte.

### Inputs

#### `texte`
Type: `string` — Default: `''`

Texte à afficher dans le composant.

```html
<lu-read-more [texte]="value"></lu-read-more>
```

#### `ouvert`
Type: `boolean` — Default: `false`

Détermine si le texte est affiché en entier ou non.

```html
<lu-read-more [ouvert]="true"></lu-read-more>
```

## Patterns courants

### Affichage d'un texte étendu
```html
<lu-read-more texte="Text long ici..." [ouvert]="true"></lu-read-more>
```

## Accessibilité
Veillez à fournir un texte alternatif descriptif suffisamment long pour être compris dans tous les contextes, et utilisez des éléments interactifs de manière appropriée pour le contrôle de l'accessibilité.

## Guidelines Prisme
- Ne pas utiliser le composant pour des listes d'éléments à dérouler.
- Toujours fournir un texte alternatif sensé dans l'input `texte`.