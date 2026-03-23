# pr-Fieldset

## Quand utiliser ce composant
- Pour structurer visuellement des groupes de champs dans un formulaire.
- Lorsque vous avez besoin d'une section dépliable pour économiser de l'espace sur l'interface utilisateur.
- Lorsqu'un titre clair et des sous-titres sont nécessaires pour clarifier la fonction des champs regroupés.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fieldset-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fieldset-angular-basic--basic)

## Composant Figma
[pr-Fieldset sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=30625-11186) - Composant de conteneur pour des éléments de formulaire avec des variantes disponibles.

## Import

```typescript
import { FieldsetComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-fieldset heading="Titre du Fieldset">...</lu-fieldset>
```

## Directive / Composant : `luFieldset` ou `<lu-fieldset>`

Composant utilisé pour créer un ensemble de champs dans un formulaire.

### Valeurs

| Valeur              | Description                           |
|---------------------|---------------------------------------|
| `""` (vide)         | Variante par défaut                   |
| `"S"`               | Petite taille du fieldset             |

```html
<lu-fieldset size="S">...</lu-fieldset>
```

## Inputs

### `heading`
Type: `string` — Default: `''`

Titre du fieldset.

```html
<lu-fieldset [heading]="'Titre'">...</lu-fieldset>
```

### `helper`
Type: `string` — Default: `''`

Ajoute un sous-titre au fieldset.

```html
<lu-fieldset [helper]="'Sous-titre'">...</lu-fieldset>
```

### `size`
Type: `'' | 'S'` — Default: `''`

Modifie la taille du fieldset.

```html
<lu-fieldset [size]="'S'">...</lu-fieldset>
```

### `horizontal`
Type: `boolean` — Default: `false`

Place le titre du fieldset à gauche des champs.

```html
<lu-fieldset [horizontal]="true">...</lu-fieldset>
```

### `expandable`
Type: `boolean` — Default: `false`

Permet au fieldset de se replier.

```html
<lu-fieldset [expandable]="true">...</lu-fieldset>
```

### `expanded`
Type: `boolean` — Default: `false`

Affiche le fieldset en vue dépliée.

```html
<lu-fieldset [expandable]="true" [expanded]="true">...</lu-fieldset>
```

### `withAction`
Type: `boolean` — Default: `false`

Ajoute un bouton d'action à droite du titre.

```html
<lu-fieldset [withAction]="true">...</lu-fieldset>
```

### `presentation`
Type: `boolean` — Default: `false`

Transforme le champ de formulaire en donnée textuelle non éditable.

```html
<lu-fieldset [presentation]="true">...</lu-fieldset>
```

## Patterns courants

### Fieldset simple
```html
<lu-fieldset heading="Informations utilisateur" helper="Veuillez remplir les détails ci-dessous">...</lu-fieldset>
```

## Accessibilité
Assurez-vous que chaque fieldset a une étiquette accessible (using `heading`) pour aider les utilisateurs à comprendre le contenu regroupé.

## Guidelines Prisme
- Utiliser le fieldset pour grouper des éléments de formulaire connexes.
- Éviter d'utiliser des fieldsets pour un groupe d'éléments non liés afin de ne pas créer de confusion.
- Fournir des titres clairs et concis pour chaque fieldset afin d'améliorer la compréhension de l'utilisateur.