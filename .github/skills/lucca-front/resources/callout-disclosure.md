# pr-CalloutDisclosure

## Quand utiliser ce composant
- Pour afficher des informations importantes ou des avertissements dans un format visuel attrayant.
- Lorsqu'il est nécessaire de donner des retours d'informations accompagnés d'actions (comme des boutons).
- Pour améliorer l'expérience utilisateur en attirant l'attention sur des éléments critiques ou des suggestions.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-callout-disclosure-angular--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-disclosure-angular--template)

## Composant Figma
[pr-CalloutDisclosure Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=14686-65156) - Composant visuel destiné à informer et interagir avec l'utilisateur. Variantes disponibles : différentes tailles (S, M), palettes de couleurs (Neutral, Success, Product, Critical, Warning) et états d'affichage (Openned, Focus, Hover, Default).

## Import

```typescript
import { CalloutDisclosureComponent } from '@lucca-front/ng/callout';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-callout-disclosure>...</lu-callout-disclosure>
```

## Directive / Composant : `lu-callout-disclosure` ou `<lu-callout-disclosure>`

Directive utilisée pour créer un callout avec une partie qui peut être révélée ou cachée.

### Valeurs

| Valeur        | Description                          |
|---------------|--------------------------------------|
| `""` (vide)   | Variante par défaut                  |
| `"success"`   | Palette de couleur pour succès       |
| `"warning"`   | Palette de couleur pour avertissement|
| `"error"`     | Palette de couleur pour erreur       |

```html
<lu-callout-disclosure palette="success">...</lu-callout-disclosure>
```

## Inputs

### `icon`
Type: `null | 'signInfo' | 'signSuccess' | 'signWarning' | 'signError' | 'signHelp'` — Default: `null`

Ajoute une icône au callout.

```html
<lu-callout-disclosure [icon]="'signInfo'">...</lu-callout-disclosure>
```

### `state`
Type: `null | 'success' | 'warning' | 'error'` — Default: `null`

État du callout.

```html
<lu-callout-disclosure [state]="'success'">...</lu-callout-disclosure>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du callout.

```html
<lu-callout-disclosure [size]="'S'">...</lu-callout-disclosure>
```

## Patterns courants

### Callout avec liste de feedback
```html
<lu-callout-disclosure>
    <ul lu-callout-feedback-list palette="neutral">
        <li lu-callout-feedback-item>
            <lu-feedback-item-description>
                Feedback description.
            </lu-feedback-item-description>
            <button lu-feedback-item-action luButton="outlined">Click me !</button>
            <button lu-feedback-item-action luButton="ghost">Click me but inverted !</button>
        </li>
    </ul>
</lu-callout-disclosure>
```

## Accessibilité
Assurez-vous que les callouts sont accessibles via un clavier et qu'ils ont des rôles ARIA appropriés pour les lecteurs d'écran.

## Guidelines Prisme
- Utilisez le composant pour fournir des feedbacks clairs.
- N'utilisez pas plus d'une icône à la fois.
- Assurez-vous que les états de focus sont visibles pour les utilisateurs utilisant le clavier.