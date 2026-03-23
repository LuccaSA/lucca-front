# pr-InputFramed

## Quand utiliser ce composant
- Lorsque vous avez besoin d'un champ de formulaire personnalisé avec un cadre pour améliorer l'interaction utilisateur.
- Pour des formulaires qui nécessitent à la fois des options de sélection (radio/checkbox) et un champ de texte standard.
- Lors de la création de formulaires nécessitant des sections d'information associées ou des illustrations contextuelles.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-input-framed-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-input-framed-angular-basic--basic)

## Composant Figma
[pr-InputFramed Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=29856-17751) - Ce composant présente un champ d'entrée avec un cadre, des variantes pour la taille et le type, et différentes dispositions pour l'affichage.

## Import

```typescript
import { InputFramedComponent } from '@lucca-front/ng/form-field';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-input-framed></lu-input-framed>
```

## Directive / Composant : `luInputFramed` ou `<lu-input-framed>`

Composant de champ d'entrée encadré, utilisable comme un champ de texte, radio ou checkbox.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante de taille M par défaut |
| `"L"` | Variante de taille L |

```html
<lu-input-framed size="L"></lu-input-framed>
```

## Inputs

### `size`
Type: `'' | 'L'` — Default: `''`

Définit la taille du champ.

```html
<lu-input-framed [size]="'L'"></lu-input-framed>
```

### `panel`
Type: `boolean` — Default: `false`

Ajoute une section visible lorsque le champ est sélectionné.

```html
<lu-input-framed [panel]="true"></lu-input-framed>
```

### `illustration`
Type: `boolean` — Default: `false`

Slot dédié à l'ajout d'illustrations.

```html
<lu-input-framed [illustration]="true"></lu-input-framed>
```

### `info`
Type: `boolean` — Default: `false`

Ajoute une section informative toujours visible sous le champ.

```html
<lu-input-framed [info]="true"></lu-input-framed>
```

### `tag`
Type: `boolean` — Default: `false`

Ajoute un tag après le label du champ.

```html
<lu-input-framed [tag]="true"></lu-input-framed>
```

### `checkbox`
Type: `boolean` — Default: `false`

Passe le composant au format checkbox.

```html
<lu-input-framed [checkbox]="true"></lu-input-framed>
```

### `center`
Type: `boolean` — Default: `false`

Aligne le champ et son illustration verticalement lorsque le label est trop court.

```html
<lu-input-framed [center]="true"></lu-input-framed>
```

### `inlineMessage`
Type: `string` — Default: `''`

Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.

```html
<lu-input-framed [inlineMessage]="'Ceci est une aide.'"></lu-input-framed>
```

## Patterns courants

### Input avec illustration
```html
<lu-input-framed [illustration]="true" [panel]="true">...</lu-input-framed>
```

## Accessibilité
Assurez-vous que tous les champs sont correctement étiquetés et que les descriptions inline sont utiles pour les utilisateurs d'assistants vocaux.

## Guidelines Prisme
- Utiliser des tailles cohérentes pour assurer une bonne lisibilité.
- Ne pas abuser des illustrations pour rester simple et efficace.
- Les messages inline doivent être clairs et concis pour éviter toute confusion.