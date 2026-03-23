# pr-MultilanguageTextfield

## Quand utiliser ce composant
- Lorsque vous devez collecter des données dans plusieurs langues tout en maintenant une interface utilisateur claire.
- Pour les formulaires nécessitant des champs où chaque langue a une valeur distincte et où la validation multilingue est nécessaire.
- Dans des situations où vous devez afficher un message d'aide contextuel ou une erreur sous le champ.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-multilanguagefield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-multilanguagefield-angular--basic)

## Composant Figma
[Pr-MultilanguageTextfield Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=25864-39239) - Composant texte multilingue permettant d'entrer des valeurs en plusieurs langues, avec plusieurs variantes de taille et d'état disponibles.

## Import

```typescript
import { MultilanguageInputComponent, FormFieldComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<lu-form-field>
  <lu-multilanguage-input [formControl]="formControl"></lu-multilanguage-input>
</lu-form-field>
```

## Directive / Composant : `lu-multilanguage-input` ou `<lu-multilanguage-input>`

Champ de saisie pour des valeurs multilingues. Applicable dans un contexte de formulaire.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"S"` | Taille petite |
| `"M"` | Taille moyenne |
| ... | D'autres variantes prédéfinies disponibles |

```html
<lu-multilanguage-input size="M" placeholder="Entrez la valeur..."></lu-multilanguage-input>
```

## Inputs

### `formControl`
Type: `FormControl<MultilanguageTranslation[]>` — Default: `null`

Contrôle du formulaire contenant les traductions.

```html
<lu-multilanguage-input [formControl]="formControl"></lu-multilanguage-input>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du champ.

```html
<lu-multilanguage-input [size]="'S'"></lu-multilanguage-input>
```

### `placeholder`
Type: `string` — Default: `''`

Texte affiché lorsque le champ est vide.

```html
<lu-multilanguage-input placeholder="Entrez une valeur..."></lu-multilanguage-input>
```

## Patterns courants

### Champ multilingue
```html
<lu-form-field label="Langues" inlineMessage="Veuillez remplir toutes les langues requises.">
  <lu-multilanguage-input [formControl]="formControl" [allLanguagesRequired]="true"></lu-multilanguage-input>
</lu-form-field>
```

## Accessibilité
Assurez-vous d'utiliser des labels compréhensibles pour tous les utilisateurs, et envisagez d'utiliser des messages d'aide sous le champ pour guider l'utilisateur.

## Guidelines Prisme
- Évitez d'utiliser le champ multilingue sans indications claires sur les traductions requises.
- Soyez cohérent dans la taille et le style de vos champs au sein des formulaires.