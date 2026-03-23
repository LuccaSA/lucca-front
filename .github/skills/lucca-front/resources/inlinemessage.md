# pr-InlineMessage

## Quand utiliser ce composant
- Pour afficher des messages d'information, d'erreur ou de succès directement sous un champ de formulaire.
- Lorsqu'un retour immédiat est nécessaire pour l'utilisateur suite à une action, comme un enregistrement ou une validation de saisie.
- Pour signaler des avertissements ou erreurs à l'utilisateur sans interrompre le flux de la page.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-inlinemessage-angular-basic--docs)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5743-32740) + Variantes disponibles : Size=M, Type=Critical, Size=S, Type=Critical, Size=S, Type=Default, Size=S, Type=Warning, Size=M, Type=Default, Size=M, Type=Success, Size=S, Type=Success, Size=M, Type=Warning.

## Import

```typescript
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-inline-message>Message d'information</lu-inline-message>
```

## Directive / Composant : `luInlineMessage` ou `<lu-inline-message>`

Affiche un message d'information, d'avertissement, d'erreur ou de succès. Applicable sur les éléments de type bloc.

### Valeurs

| Valeur   | Description                              |
|----------|------------------------------------------|
| `""`     | Variante par défaut                      |
| `"critical"` | Correspond à un message d'erreur    |
| `"default"` | Correspond à un message standard     |
| `"warning"`  | Correspond à un message d'avertissement |
| `"success"`  | Correspond à un message de succès   |

```html
<lu-inline-message state="success">Message de succès</lu-inline-message>
```

## Inputs

### `state`
Type: `'success' | 'warning' | 'error' | 'default'` — Default: `'default'`

Modifie l'état de l'inline message.

```html
<lu-inline-message [state]="'warning'">Message d'avertissement</lu-inline-message>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du composant.

```html
<lu-inline-message [size]="'S'">Message de petite taille</lu-inline-message>
```

### `label`
Type: `string`

Modifie le texte affiché par le composant. (PortalContent)

```html
<lu-inline-message [label]="'Ceci est un message'"></lu-inline-message>
```

## Patterns courants

### Message d'erreur
```html
<lu-inline-message state="error" label="Champ requis."></lu-inline-message>
```

### Message de succès
```html
<lu-inline-message state="success" label="Enregistrement réussi!"></lu-inline-message>
```

## Accessibilité
Assurez-vous que les messages soient clairs et concis, et qu'ils soient visibles et auditifs pour les lecteurs d'écran.

## Guidelines Prisme
- Ne pas utiliser les messages pour transmettre des informations non essentielles.
- S'assurer que l'état des messages est toujours accessible (couleurs et contrastes appropriés).