# pr-FormField

## Quand utiliser ce composant
1. Pour créer des formulaires sans avoir à se soucier des détails de mise en forme.
2. Lorsque vous devez rapidement changer le type d'un champ dans un formulaire (texte, email, mot de passe, etc.).
3. Pour assurer une cohérence visuelle et fonctionnelle dans l'ensemble des champs de formulaire d'une application.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-form-field--docs)

## Composant Figma
[Design du pr-FormField](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28461-196506) — L'élément permet de formater de manière uniforme les champs de formulaires. Il n'a qu'une seule variante disponible, `pr-FormField`.

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
```

## Usage de base

```html
<lu-form-field>...</lu-form-field>
```

## Directive / Composant : `luFormField` ou `<lu-form-field>`

Directive permettant de formater les champs de formulaire. Applicable sur tout élément de formulaire.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-form-field ...>...</lu-form-field>
```

## Inputs

### `type`
Type: `'text' | 'email' | 'password' | 'number'` — Default: `'text'`

Définit le type du champ de formulaire.

```html
<lu-form-field [type]="typeValue">...</lu-form-field>
```

## Patterns courants

### Utilisation d'un champ de texte
```html
<lu-form-field [type]="'text'">Mon champ de texte</lu-form-field>
```

## Accessibilité
Assurez-vous que les champs sont correctement étiquetés pour donner aux utilisateurs de lecteurs d'écran des indications claires sur leur utilisation.

## Guidelines Prisme
- Utilisez pr-FormField pour tous les champs similaires afin de maintenir la cohérence.
- Ne mélangez pas plusieurs types de champs dans un même formulaire sans structuration adéquate.