# Pr-PhoneNumberField

## Quand utiliser ce composant
- Pour collecter un numéro de téléphone avec validation intégrée.
- Lorsque vous avez besoin d'afficher un label et des messages d'erreur sous le champ de saisie.
- Dans les formulaires nécessitant une entrée de numéro de téléphone dans un format international.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-phonenumberfield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-phonenumberfield-angular--basic)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=25864-48330) + Composant de saisie numéroté avec plusieurs variantes disponibles en termes de taille (S, M), état (Default, Disabled, Hover, Focus), contenu (Filled, Placeholder) et feedback (Critical, Warning, Success, None).

## Import

```typescript
import { PhoneNumberInputComponent } from '@lucca-front/ng/forms/phone-number-input';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-form-field>
  <lu-phone-number-input label="Numéro de téléphone" [(ngModel)]="example" [country]="country"></lu-phone-number-input>
</lu-form-field>
```

## Directive / Composant : `luPhoneNumberInput` ou `<lu-phone-number-input>`

Composant de saisie pour les numéros de téléphone, applicable sur les champs de formulaire.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"disabled"` | Désactive le champ de saisie |
| `"placeholder"` | Affiche un texte indicatif dans le champ |

```html
<lu-phone-number-input [country]="country" placeholder="'Entrez votre numéro'" [disabled]="isDisabled"></lu-phone-number-input>
```

## Inputs

### `country`
Type: `string` — Default: `''`

Code du pays pour le formatage du numéro de téléphone.

```html
<lu-phone-number-input [country]="'US'"></lu-phone-number-input>
```

### `label`
Type: `string` — Default: `'Numéro de téléphone'`

Label affiché pour le champ de saisie.

```html
<lu-phone-number-input label="Numéro de téléphone"></lu-phone-number-input>
```

## Patterns courants

### Saisie d'un numéro de téléphone avec validation
```html
<lu-form-field>
  <lu-phone-number-input label="Numéro de téléphone" [(ngModel)]="phoneNumber" #phoneInput="ngModel"></lu-phone-number-input>
  <div *ngIf="phoneInput.invalid && phoneInput.errors.validPhoneNumber">
    {{ phoneInput.errors.validPhoneNumber }}
  </div>
</lu-form-field>
```

## Accessibilité
Assurez-vous que le label est toujours associé au champ de saisie pour une meilleure accessibilité.

## Guidelines Prisme
- Soyez cohérent dans l'utilisation des états des composants (erreur, succès, etc.).
- Évitez d'utiliser le composant dans des situations où le numéro de téléphone n'est pas exigé sans une gestion claire de la validation.