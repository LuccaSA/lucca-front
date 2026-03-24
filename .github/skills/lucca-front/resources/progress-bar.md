# ProgressBar

## Quand utiliser ce composant
- Lorsque vous souhaitez fournir un retour visuel sur le statut d'une tâche ou d'une opération en cours.
- Pour indiquer aux utilisateurs que quelque chose est en cours de traitement, comme un chargement de données.
- Dans les formulaires où des opérations longues doivent être signalées visuellement pour améliorer l'expérience utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-progress-bar-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-progress-bar-angular-basic--basic)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=16861-21024) — La barre de progression illustre le statut d'une tâche. Variantes disponibles : State=Success, State=Error, State=Default.

## Import

```typescript
import { ProgressBarComponent } from '@lucca-front/ng/progress-bar';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-progress-bar></lu-progress-bar>
```

## Directive / Composant : `lu-progress-bar`

Composant pour afficher une barre de progression. Applicable sur tous les éléments HTML.

### Valeurs

| Valeur   | Description                        |
|----------|------------------------------------|
| `""`     | Variante par défaut                |
| `"success"` | Indique un état réussi            |
| `"error"`   | Indique un état d'erreur         |

```html
<lu-progress-bar state="success"></lu-progress-bar>
```

## Inputs

### `state`
Type: `'default' | 'success' | 'error'` — Default: `'default'`

Définit l'état visuel de la barre de progression.

```html
<lu-progress-bar [state]="'success'"></lu-progress-bar>
```

## Patterns courants

### Barre de progression par défaut
```html
<!-- Utilisation d'une barre de progression standard -->
<lu-progress-bar state="default"></lu-progress-bar>
```

### Barre de progression en succès
```html
<!-- Utilisation d'une barre de progression pour un état réussi -->
<lu-progress-bar state="success"></lu-progress-bar>
```

### Barre de progression en erreur
```html
<!-- Utilisation d'une barre de progression pour un état d'erreur -->
<lu-progress-bar state="error"></lu-progress-bar>
```

## Accessibilité
Assurez-vous que l'état de la barre de progression est annoncé aux lecteurs d'écran afin que les utilisateurs malvoyants puissent comprendre l'état des opérations.

## Guidelines Prisme
- Toujours utiliser des couleurs conformes à la charte graphique pour les états de succès et d'erreur.
- Ne pas utiliser de texte sur la barre de progression à moins que cela ne soit nécessaire pour l’accessibilité.
- Évitez d'utiliser la barre de progression pour des opérations trop courtes, cela pourrait induire en erreur les utilisateurs.