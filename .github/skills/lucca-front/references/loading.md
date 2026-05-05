# Loading

## Quand utiliser ce composant
- Lorsqu'une action est en cours et qu'il est nécessaire d'informer l'utilisateur que le contenu se charge.
- Pour remplacer le contenu d'une zone de l'application en attendant qu'une requête soit terminée.
- Pour signaler des opérations asynchrones dans des formulaires ou des listes où le temps de réponse peut varier.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-listbox-option-html-css-loading--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-loading-angular-basic--basic)

## Composant Figma
[Visuel du composant pr-Loading](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=10583-34479) - Composant de chargement avec plusieurs variantes disponibles selon la palette (Product, Neutral) et la taille (S, XS, M).

## Import

```typescript
import { LoadingComponent } from '@lucca-front/ng/loading';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-loading></lu-loading>
```

## Directive / Composant : `lu-loading`

Composant utilisé pour indiquer un état de chargement. Applicable sur aucun élément HTML spécifique car il est utilisé comme un élément auto-contenu.

### Valeurs (si directive avec valeurs)

Aucune valeur spécifique à fournir pour ce composant.

## Inputs

### Non applicable

Aucun input spécifique n'est défini pour ce composant.

## Patterns courants

### Exemple de chargement
```html
<!-- Indiquer que le chargement est en cours -->
<lu-loading></lu-loading>
```

## Accessibilité
Prévoir un label accessible pour le loader si utilisé avec d'autres éléments interactifs pour indiquer l'état de chargement dans l'interface utilisateur.

## Guidelines Prisme
- Ne pas masquer le contenu utilisateur sans indication visuelle (par ex. loader).
- Toujours afficher un loader lorsque l'attente est requise pour éviter la confusion chez l'utilisateur.