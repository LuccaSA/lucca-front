# BubbleIllustration

## Quand utiliser ce composant
- Pour illustrer un état de succès, d'erreur ou d'avertissement avec une visualisation graphique engageante.
- Pour ajouter une interaction visuelle à une action, comme un ajout ou une notification.
- Pour enrichir une interface avec des illustrations dans des cas où il n'y a pas de données à afficher.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-bubble-illustration-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-bubble-illustration-angular-basic--basic)

## Composant Figma
[Consulter le design sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34491-10009) - Le composant présente différentes variantes d'illustrations pour divers états, incluant des icônes appropriées selon le contexte.

## Import

```typescript
import { BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-bubble-illustration></lu-bubble-illustration>
```

## Composant : `lu-bubble-illustration`

Représente une bulle d'illustration pour afficher des informations graphiques. Applicable sur n'importe quel élément bloc.

### Inputs

### `size`
Type: `'small' | 'medium' | 'large'` — Default: `'medium'`

Détermine la taille de l'illustration affichée.

```html
<lu-bubble-illustration [size]="'large'"></lu-bubble-illustration>
```

### `action`
Type: `boolean` — Default: `false`

Ajoute une icône d'action (+) à l'illustration pour permettre une interaction visuelle.

```html
<lu-bubble-illustration [action]="true"></lu-bubble-illustration>
```

## Patterns courants

### Bulle d'illustration de succès
```html
<lu-bubble-illustration [size]="'medium'" [action]="true" type="Success - Thumb up"></lu-bubble-illustration>
```

## Accessibilité
Assurez-vous que les illustrations ont un texte alternatif approprié pour une meilleure expérience utilisateur sur les lecteurs d'écran.

## Guidelines Prisme
1. Ne pas utiliser d'illustrations trop chargées qui peuvent distraire l'utilisateur.
2. Privilégier des couleurs qui respectent l'accessibilité pour les utilisateurs avec des déficiences visuelles.