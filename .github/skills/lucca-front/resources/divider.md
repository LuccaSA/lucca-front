# pr-Divider

## Quand utiliser ce composant
- Pour séparer visuellement des sections dans un formulaire ou une page.
- Pour fournir une séparation entre des éléments de liste ou des éléments d'interface où un espace visuel est nécessaire.
- Pour créer des groupes d'éléments lorsque l'espace est réduit, tout en maintenant une lisibilité optimale.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-listing-html-css-divider--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-divider-angular--basic)

## Composant Figma
[Accéder au Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3130-2035) — le composant pr-Divider a trois variantes : Horizontal, Horizontal - Content, et Vertical, permettant de s'adapter à différents styles de mise en page.

## Import

```typescript
import { DividerComponent } from '@lucca-front/ng/divider';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-divider></lu-divider>
```

## Directive / Composant : `lu-divider`

Utilisé pour créer des diviseurs verticaux ou horizontaux entre des éléments dans l'interface utilisateur.

### Valeurs

| Valeur      | Description                          |
|-------------|--------------------------------------|
| `""` (vide) | Variante par défaut                   |
| `"horizontal"`   | Séparateur horizontal              |
| `"vertical"` | Séparateur vertical                  |

```html
<lu-divider vertical></lu-divider>
<lu-divider style="horizontal"></lu-divider>
```

## Inputs

### `size`
Type: `'S' | 'M' | ''` — Default: `''`

Permet de définir la taille du diviseur.

```html
<lu-divider [size]="'M'"></lu-divider>
```

### `content`
Type: `string` — Default: `''`

Texte à afficher dans le diviseur.

```html
<lu-divider [content]="'Texte de séparation'"></lu-divider>
```

### `separatorRole`
Type: `boolean` — Default: `false`

Permet de restituer le Divider comme un séparateur natif (hr). Son éventuel contenu textuel ne sera alors plus affiché.

```html
<lu-divider [separatorRole]="true"></lu-divider>
```

### `vertical`
Type: `boolean` — Default: `false`

Détermine si le diviseur est vertical.

```html
<lu-divider [vertical]="true"></lu-divider>
```

### `icon`
Type: `boolean` — Default: `false`

Permet d'afficher une icône dans le diviseur.

```html
<lu-divider [icon]="true"></lu-divider>
```

### `button`
Type: `boolean` — Default: `false`

Permet d'afficher un bouton dans le diviseur plutôt que du texte.

```html
<lu-divider [button]="true" [content]="'Cliquez ici'"></lu-divider>
```

## Patterns courants

### Divider avec icône
```html
<!-- Affiche un diviseur avec une icône à gauche -->
<lu-divider [icon]="true"><lu-icon icon="heart"></lu-icon></lu-divider>
```

## Accessibilité
Veillez à utiliser l'attribut `separatorRole` pour indiquer aux technologies d'assistance que le composant doit être interprété comme un séparateur.

## Guidelines Prisme
- Assurez-vous que l'utilisation du composant est cohérente avec les styles de séparation de l'interface utilisateur.
- Évitez d'encombrer la mise en page avec trop de diviseurs pour maintenir la clarté visuelle.