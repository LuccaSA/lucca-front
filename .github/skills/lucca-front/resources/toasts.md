# pr-Toast

## Quand utiliser ce composant
- Lorsqu'un retour utilisateur instantané est nécessaire après une action, comme la validation d'un formulaire.
- Pour afficher des notifications contextuelles sans intercepter le flux de l'utilisateur.
- Pour fournir des mises à jour sur l'état d'un processus, comme l'envoi d'un message ou le chargement de données.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-overlays-toasts--docs)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3101-1158) - Ce composant présente des notifications temporaires avec différentes variantes : Feedback=Error, Feedback=Warning, Feedback=Success, Feedback=Informative.

## Import

```typescript
import { ToastComponent } from '@lucca-front/ng/overlays';
// ou
import { ToastDirective } from '@lucca-front/ng/overlays';
```

## Usage de base

```html
<!-- Usage minimal -->
<button type="button" luToast feedback="success">Notification de succès</button>
```

## Directive / Composant : `luToast` ou `<lu-toast>`

Directive pour afficher des notifications. Applicable sur les éléments HTML tels que `<button>`, `<div>`, etc.

### Valeurs

| Valeur      | Description               |
|-------------|---------------------------|
| `""` (vide) | Variante par défaut       |
| `"error"`   | Notification d'erreur     |
| `"warning"` | Notification d'avertissement|
| `"success"` | Notification de succès     |
| `"informative"` | Notification informative  |

```html
<button type="button" luToast="error">Notification d'erreur</button>
```

## Inputs

### `feedback`
Type: `'error' | 'warning' | 'success' | 'informative'` — Default: `''`

Spécifie le type de feedback à afficher dans la notification.

```html
<button type="button" luToast [feedback]="'warning'">Avertissement</button>
```

## Patterns courants

### Notification d'erreur
```html
<!-- Affiche une notification d'erreur -->
<button type="button" luToast feedback="error">Erreur détectée</button>
```

## Accessibilité
Assurez-vous que les notifications soient annoncées correctement par les lecteurs d'écran. Utilisez des attributs ARIA pour décrire le type de notification et son importance.

## Guidelines Prisme
Consultez le guide de style Prisme pour les bonnes pratiques sur l'utilisation des notifications et des toasts.