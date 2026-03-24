# FormField

## Quand utiliser ce composant
- Lorsque vous devez créer des formulaires dynamiques avec des champs variables.
- Pour uniformiser l'apparence et le comportement des champs de saisie au sein d'une application.
- Lorsque vous avez besoin d'un champ de formulaire qui peut évoluer d'un type à un autre (par exemple : texte, nombre, email).

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-form-field--docs)

## Composant Figma
[FormField sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28461-196506) - Ce composant est conçu pour être flexible avec plusieurs variantes disponibles.

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
```

## Usage de base

```html
<!-- Usage minimal -->
<li pr-form-field>...</li>
```

## Directive / Composant : `pr-form-field` ou `<pr-form-field>`

Le sélecteur `pr-form-field` est utilisé pour appliquer les styles et fonctionnalités spécifiques aux champs de formulaire. Applicable sur tous les éléments HTML pouvant contenir des entrées utilisateur.

## Inputs

### `type`
Type: `'text' | 'number' | 'email'` — Default: `'text'`

Permet de définir le type de champ de formulaire souhaité.

```html
<pr-form-field [type]="inputType">...</pr-form-field>
```

## Patterns courants

### Champ de texte simple
```html
<!-- Champ de texte simple à usage général -->
<pr-form-field type="text">...</pr-form-field>
```

## Accessibilité
Assurez-vous que tous les champs de formulaire incluent des étiquettes accessibles (via la propriété `label`) pour un support optimal des technologies d'assistance.

## Guidelines Prisme
- Toujours utiliser les composants de formulaire fournis par Lucca pour garder une cohérence au niveau du design.
- Ne pas modifier directement les styles des champs sans justification, utiliser plutôt les variantes disponibles.