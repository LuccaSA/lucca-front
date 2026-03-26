# ProgressBar

## Quand utiliser ce composant
- Pour indiquer le chargement d'une opération en cours, permettant à l'utilisateur de visualiser la progression.
- Pour afficher des erreurs de manière visuelle lorsque le chargement échoue, en utilisant l'état d'erreur.
- Pour représenter des étapes de progression dans un processus multi-étapes sous forme de barre.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-progress-bar-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-progress-bar-angular-basic--basic)

## Composant Figma
[Visuel pr-ProgressBar dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=16861-21024) — Composant de barre de progression avec les variantes disponibles pour les états de succès, d'erreur et par défaut.

## Import

```typescript
import { ProgressBarComponent } from '@lucca-front/ng/progress-bar';
```

## Usage de base

```html
<!-- Utilisation minimale -->
<lu-progress-bar></lu-progress-bar>
```

## Directive / Composant : `lu-progress-bar`

Composant permettant d'afficher une barre de progression, applicable sur les éléments HTML appropriés.

### Inputs

### `state`
Type: `'default' | 'success' | 'error'` — Default: `'default'`

Définit l'état de la barre de progression.

```html
<lu-progress-bar [state]="'success'"></lu-progress-bar>
```

### `indeterminate`
Type: `boolean` — Default: `false`

Affiche un état de chargement sans information de progression.

```html
<lu-progress-bar [indeterminate]="true"></lu-progress-bar>
```

### `value`
Type: `number` — Default: `0`

Pourcentage de progression à afficher dans la barre.

```html
<lu-progress-bar [value]="50"></lu-progress-bar>
```

## Accessibilité
Le composant doit avoir des indications visuelles claires pour les utilisateurs, surtout en cas d'erreur. Il est recommandé d'utiliser des éléments `aria` pour fournir des informations supplémentaires sur le statut de chargement.

## Guidelines Prisme
- Utiliser les couleurs et designs prédéfinis pour assurer la cohérence avec le thème de Lucca.
- Ne pas utiliser de barres de progression trop petites pour assurer leur visibilité.
- Éviter d'utiliser l'état indéterminé sans contexte explicite, pour ne pas désorienter l'utilisateur.