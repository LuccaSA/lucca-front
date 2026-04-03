# Form Field

## Quand utiliser ce composant

- Structurer et organiser un ensemble de champs dans un formulaire Angular.
- Appliquer un style cohérent à différents types de champs de saisie (text, select, checkbox, etc.).
- Faciliter la gestion des layouts de formulaire dans les interfaces utilisateur complexes.

## Stories Storybook

- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-form-field--docs)

## Composant Figma

- [Form Field sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28461-196506)  
  Le composant Form Field est destiné à unifier et enrichir l’apparence des champs dans les formulaires. Une seule variante disponible, à styliser en fonction des besoins (texte, menu déroulant, cases à cocher, etc.).

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/formulaire';
```

## Usage de base

```html
<!-- Exemple de champ texte -->
<pr-FormField>
  <label for="example">Label du champ</label>
  <input id="example" type="text" />
</pr-FormField>
```

## Composant : `<pr-FormField>`

Le composant `pr-FormField` sert de conteneur pour différents types de champs de formulaire. Il est généralement utilisé avec un `label` et un champ enfant (`<input>`, `<select>`, `<textarea>`, etc.).

### Exemple avec un champ de sélection

```html
<pr-FormField>
  <label for="selectExample">Choisissez une option</label>
  <select id="selectExample">
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
  </select>
</pr-FormField>
```

## Inputs

Aucun input spécifique enregistré pour ce composant.

## Patterns courants

### Champ de formulaire simple

```html
<!-- Champ texte standard avec label -->
<pr-FormField>
  <label for="basicInput" class="pr-label">Nom :</label>
  <input id="basicInput" type="text" class="pr-input" />
</pr-FormField>
```

### Ajout de messages ou descriptions d’aide

```html
<pr-FormField>
  <label for="emailInput">E-mail</label>
  <input id="emailInput" type="email" />
  <span class="pr-help-text">Renseignez une adresse e-mail valide.</span>
</pr-FormField>
```

## Accessibilité

- Assurez-vous que chaque champ soit associé à une étiquette accessible (`<label>`).
- Si un champ est requis, indiquez cette condition via le DOM avec l'attribut `aria-required="true"` ou via un message contextuel visible.
- Évitez toute dépendance exclusive sur la couleur pour transmettre des informations.

## Guidelines Prisme

- [Composant Form Field](https://prisme.lucca.io/94310e217/v/latest/p/810797) : utilisez toujours un label clair et précis. Ne surchargez pas visuellement les formulaires ; préférez des instructions spécifiques dans un texte d’aide le cas échéant.