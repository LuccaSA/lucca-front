# pr-Toast

## Quand utiliser ce composant
- Pour afficher des notifications d'erreur à l'utilisateur.
- Pour fournir des messages d'information ou de succès suite à des actions effectuées.
- Pour alerter sur des avertissements nécessitant l'attention de l'utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-overlays-toasts--docs)

## Composant Figma
[Accéder à la maquette Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3101-1158) - Composant pr-Toast avec 4 variantes disponibles : Error, Warning, Success, Informative.

## Import

```typescript
import { PrToastComponent } from '@lucca-front/ng/toasts';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-toast>Message de notification</lu-toast>
```

## Directive / Composant : `luToast` ou `<lu-toast>`

Le sélecteur `luToast` est utilisé pour afficher des messages de notification sur l'interface. Applicable sur tous les éléments HTML du type notification.

### Valeurs

| Valeur         | Description                              |
|----------------|------------------------------------------|
| `""` (vide)    | Variante par défaut                      |
| `"error"`      | Notification d'erreur                   |
| `"warning"`    | Notification d'avertissement             |
| `"success"`    | Notification de succès                   |
| `"informative"`| Notification informative                 |

```html
<lu-toast feedback="error">Erreur : quelque chose s'est mal passé.</lu-toast>
```

## Inputs

### `feedback`
Type: `'error' | 'warning' | 'success' | 'informative'` — Default: `'informative'`

Indique le type de feedback à afficher.

```html
<lu-toast [feedback]="'success'">Opération réussie !</lu-toast>
```

## Patterns courants

### Notification d'erreur
```html
<lu-toast feedback="error">Erreur : veuillez réessayer.</lu-toast>
```

### Notification de succès
```html
<lu-toast feedback="success">Votre action a été effectuée avec succès.</lu-toast>
```

## Accessibilité
Utilisez des messages clairs et concis dans le toast pour assurer que tous les utilisateurs comprennent le retour d'information.

## Guidelines Prisme
- Évitez d'utiliser le même toast pour des notifications de types différents.
- Ne pas rendre le toast trop intrusif ; préférez une durée de visibilité appropriée.
- Ne pas utiliser de jargon technique dans le message du toast afin de garantir une compréhension immédiate par tous les utilisateurs.