# pr-InlineMessage

## Quand utiliser ce composant
- Pour afficher des messages d'erreur critiques dans un formulaire.
- Pour fournir un retour d'information positif lors de la soumission d'un formulaire.
- Pour avertir l'utilisateur d'un problème ou d'une information importante liée à un champ de formulaire.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-inlinemessage-angular-basic--docs)

## Composant Figma
[Lien Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5743-32740) – Le composant pr-InlineMessage est présenté dans plusieurs variantes selon le type (Critical, Default, Success, Warning) et la taille (S, M). 

## Import

```typescript
import { InlineMessageComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-inline-message>Votre message ici</lu-inline-message>
```

## Directive / Composant : `lu-inline-message`

Affiche un message contextuel en ligne. Applicable sur tous les éléments qui nécessitent un retour d'information à l'utilisateur.

### Valeurs

| Valeur       | Description                    |
|--------------|--------------------------------|
| `""` (vide)  | Variante par défaut            |
| `"Critical"` | Message d'erreur critique      |
| `"Default"`  | Message d'information standard  |
| `"Success"`  | Message de succès              |
| `"Warning"`  | Message d'avertissement        |

```html
<lu-inline-message type="Critical">Attention, une erreur est survenue!</lu-inline-message>
```

## Inputs

### `type`
Type: `'Critical' | 'Default' | 'Success' | 'Warning'` — Default: `'Default'`

Définit le type du message à afficher.

```html
<lu-inline-message [type]="'Success'">Soumission réussie!</lu-inline-message>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définit la taille du message.

```html
<lu-inline-message [size]="'S'">Message de petite taille</lu-inline-message>
```

## Patterns courants

### Message d'erreur
```html
<!-- Afficher un message d'erreur critique -->
<lu-inline-message type="Critical">Veillez à corriger les erreurs signalées.</lu-inline-message>
```

## Accessibilité
Veillez à ce que chaque message soit descriptif afin qu'il soit compréhensible pour les utilisateurs utilisant des lecteurs d'écran.

## Guidelines Prisme
- Toujours fournir des messages clairs et utiles.
- Ne pas utiliser les messages d'alerte pour des informations non critiques.
- Eviter la surcharge d'information pour ne pas distraire l'utilisateur.