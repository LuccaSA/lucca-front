# pr-Clear

## Quand utiliser ce composant
- Lorsque vous souhaitez créer un bouton clair pour des actions visibles sur des fonds foncés ou clairs.
- Pour des interactions utilisateur où une indication visuelle est nécessaire (ex: focus, hover).
- Quand vous avez besoin de plusieurs états et tailles pour répondre à différents contextes (ex: taille S ou M).

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-clear-angular-basic--docs) | [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-clear-angular-basic--template)

## Composant Figma
[Composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5657-31695) - Ce composant présente des variantes adaptées aux besoins d'accessibilité, avec des couleurs et tailles modulables.

## Import

```typescript
import { ClearComponent } from '@lucca-front/ng/clear';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-clear>Texte du bouton</lu-clear>
```

## Directive / Composant : `lu-clear`

Sélecteur spécifiant le composant Clear. Applicable sur les éléments HTML pour représenter un bouton clair.

### Valeurs

| Valeur     | Description                             |
|------------|-----------------------------------------|
| `""` (vide)| Variante par défaut                     |
| `"inverted"` | Modifie les couleurs pour un fond foncé|

```html
<lu-clear [palette]="'neutral'" [inverted]="true">Texte du bouton</lu-clear>
```

## Inputs

### `disabled`
Type: `boolean` — Default: `false`

Désactive le bouton.

```html
<lu-clear [disabled]="true">Texte désactivé</lu-clear>
```

### `palette`
Type: `'neutral' | 'product'` — Default: `'neutral'`

Applique une palette de couleurs au bouton.

```html
<lu-clear [palette]="'product'">Texte produit</lu-clear>
```

### `inverted`
Type: `boolean` — Default: `false`

Modifie les couleurs du bouton pour un usage sur fond foncé.

```html
<lu-clear [inverted]="true">Texte inversé</lu-clear>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du bouton.

```html
<lu-clear [size]="'S'">Texte petit</lu-clear>
```

### `alt`
Type: `string` — Default: `''`

Information restituée par le lecteur d'écran.

```html
<lu-clear [alt]="'Description accessible'">Texte du bouton</lu-clear>
```

### `hidden`
Type: `boolean` — Default: `false`

Masque le bouton.

```html
<lu-clear [hidden]="true">Texte masqué</lu-clear>
```

## Patterns courants

### Bouton clair standard
```html
<lu-clear palette="neutral">Texte du bouton</lu-clear>
```

## Accessibilité
Assurez-vous que le texte dans le bouton est descriptif pour aider les utilisateurs de lecteurs d'écran.

## Guidelines Prisme
- Utilisez des couleurs contrastées pour assurer la lisibilité.
- Évitez d'utiliser des couleurs identiques pour les états actifs et inactifs.
- Assurez-vous que les boutons désactivés ne sont pas interactifs.