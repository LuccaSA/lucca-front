# pr-Clear

## Quand utiliser ce composant
- Pour offrir une action claire et rapide, telle que l'annulation d'une opération.
- Lorsqu'une approche minimaliste est nécessaire pour le design d'une interface utilisateur.
- Pour des boutons où la clarté visual est primordiale, comme dans des formulaires ou des dialogues.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-clear-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-clear-angular-basic--template)

## Composant Figma
[pr-Clear sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5657-31695) - Composant de type bouton avec plusieurs variantes disponibles en fonction de la taille, de la palette de couleurs et de l'état. 

## Import

```typescript
import { ClearComponent } from '@lucca-front/ng/clear';
```

## Usage de base

```html
<!-- Usage minimal -->
<button lu-clear type="button">Effacer</button>
```

## Directive / Composant : `lu-clear` ou `<lu-clear>`

Composant utilisé pour représenter un bouton clair. Applicable sur les éléments HTML `<button>`.

### Valeurs

| Valeur       | Description                                                  |
|--------------|-------------------------------------------------------------|
| `""` (vide)  | Variante par défaut                                         |
| `"outlined"` | Variante avec une bordure claire                           |

```html
<button lu-clear="outlined" type="button">Effacer</button>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définit la taille du bouton.

```html
<button lu-clear [size]="'S'" type="button">Effacer</button>
```

### `palette`
Type: `'Neutral' | 'Product'` — Default: `'Neutral'`

Définit la palette de couleur du bouton.

```html
<button lu-clear [palette]="'Product'" type="button">Effacer</button>
```

### `invert`
Type: `boolean` — Default: `false`

Indique si le bouton doit être inversé.

```html
<button lu-clear [invert]="true" type="button">Effacer</button>
```

### `state`
Type: `'Default' | 'Hover' | 'Focus' | 'Active' | 'Disabled'` — Default: `'Default'`

Définit l'état du bouton.

```html
<button lu-clear [state]="'Hover'" type="button">Effacer</button>
```

## Patterns courants

### Bouton effacer avec état désactivé
```html
<!-- Bouton désactivé pour prévenir l'action -->
<button lu-clear [state]="'Disabled'" type="button" disabled>Effacer</button>
```

## Accessibilité
Assurez-vous d'utiliser un texte de bouton clair. Gérez les états visuels pour indiquer l'interaction. Utilisez des attributs ARIA si nécessaire.

## Guidelines Prisme
- Utilisez le composant pour des actions claires uniquement.
- Évitez d'utiliser le bouton pr-Clear pour des actions critiques qui nécessitent une confirmation.
- Privilégiez l'utilisation de variantes pour indiquer clairement l'état visuel.