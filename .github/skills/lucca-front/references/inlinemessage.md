# pr-InlineMessage

## Quand utiliser ce composant
- Pour afficher des messages d'information, de succès, d'avertissement ou d'erreur dans un formulaire.
- Pour fournir un retour visuel en temps réel lors de la saisie d'informations par l'utilisateur.
- Pour améliorer l'interface utilisateur en indiquant clairement l'état des formulaires ou des actions.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-inlinemessage-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-inlinemessage-angular-basic--template)

## Composant Figma
[Lien Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5743-32740) - Composant de message en ligne avec différentes tailles et types disponibles pour s'adapter à divers contextes.

## Import

```typescript
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-inline-message>Votre message ici</lu-inline-message>
```

## Directive / Composant : `lu-inline-message`

Ce sélecteur est utilisé pour afficher un message d'état clairement visible dans les formulaires, applicable sur les éléments HTML permettant de contenir du texte.

### Valeurs (si directive avec valeurs)

| Valeur       | Description                          |
|--------------|--------------------------------------|
| `""` (vide)  | Variante par défaut                  |
| `"Critical"` | Affichage pour des messages d'erreur |
| `"Default"`  | Affichage standard des messages      |
| `"Warning"`  | Affichage pour des messages d'avertissement |
| `"Success"`  | Affichage pour des messages de succès |

```html
<lu-inline-message type="Critical">Erreur lors de la soumission</lu-inline-message>
```

## Inputs

### `state`
Type: `'Critical' | 'Default' | 'Warning' | 'Success'` — Default: `'Default'`

Modifie l'état de l'inline message pour indiquer le type de message à afficher.

```html
<lu-inline-message [state]="'Warning'">Attention : Vérifiez les champs requis.</lu-inline-message>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du composant.

```html
<lu-inline-message [size]="'S'">Message de taille petite</lu-inline-message>
```

### `label`
Type: `string`

Modifie le texte affiché par le composant.

```html
<lu-inline-message [label]="'Information importante'"></lu-inline-message>
```

## Patterns courants

### Message d'erreur
```html
<!-- Message d'erreur lors de la soumission formulaires -->
<lu-inline-message state="Critical" label="Erreur : Champ requis." size="M"></lu-inline-message>
```

## Accessibilité
Assurez-vous que les messages inline sont accompagnés d'attributs ARIA appropriés pour faciliter la compréhension par les lecteurs d'écran.

## Guidelines Prisme
- Utilisez des messages d'état pour fournir des retours clairs à l'utilisateur.
- Évitez d'utiliser trop de messages simultanément pour ne pas surcharger visuellement l'utilisateur.
- Assurez-vous que les messages critiques sont facilement remarquables.