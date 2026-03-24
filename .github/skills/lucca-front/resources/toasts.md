# pr-Toast

## Quand utiliser ce composant
- Pour afficher des messages d'alerte temporaires aux utilisateurs, comme des succès d'action ou des erreurs.
- Lorsqu'une interaction avec l'application nécessite une confirmation visuelle (par exemple, enregistrement réussit).
- Pour informer l'utilisateur de changements importants ou d'alertes qui nécessitent son attention.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-overlays-toasts--docs)

## Composant Figma
[Vue Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3101-1158) - Ce composant présente différentes variantes visuelles pour les notifications de feedback. Variantes disponibles : Feedback=Error, Feedback=Warning, Feedback=Success, Feedback=Informative.

## Import

```typescript
import { ToastComponent } from '@lucca-front/ng/overlays';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-toast feedback="Success">Votre action a été effectuée avec succès!</lu-toast>
```

## Directive / Composant : `luToast` ou `<lu-toast>`

Permet d'afficher un toast de notification. Applicable sur les balises HTML `<lu-toast>` spécifiquement.

### Valeurs

| Valeur        | Description                      |
|---------------|----------------------------------|
| `"Error"`     | Affiche un message d'erreur.    |
| `"Warning"`   | Affiche un message d'avertissement. |
| `"Success"`   | Affiche un message de succès.    |
| `"Informative"`| Affiche un message informatif.    |

```html
<lu-toast feedback="Error">Une erreur s'est produite!</lu-toast>
```

## Inputs

### `feedback`
Type: `'Error' | 'Warning' | 'Success' | 'Informative'` — Default: `'Informative'`

Définit le type de feedback à afficher dans le toast.

```html
<lu-toast [feedback]="value">Message de feedback</lu-toast>
```

## Patterns courants

### Notification de succès
```html
<lu-toast feedback="Success">Votre action a été effectuée avec succès!</lu-toast>
```

## Accessibilité
Assurez-vous que le contenu du toast est suffisamment contrasté avec son arrière-plan et qu'il est de courte durée pour ne pas distraire les utilisateurs.

## Guidelines Prisme
Respecter les consignes d'utilisation des notifications conformément aux directives de Prisme, éviter d'encombrer l'interface avec trop de toasts simultanément.