# Pr-PhoneNumberField

## Quand utiliser ce composant
- Pour saisir un numéro de téléphone dans un formulaire.
- Lorsque vous devez afficher des messages de feedback tels que l'erreur ou le succès.
- Pour intégrer des fonctionnalités de saisie spécifique, comme les préfixes et les suffixes.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-phonenumberfield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-phonenumberfield-angular--basic)

## Composant Figma
[Visuel du composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=25864-48330) - Variantes disponibles: 56 variantes incluant différentes tailles (S, M), états (Default, Disabled/Readonly, Hover, Focus), contenus (Filled, Placeholder), feedbacks (Critical, Warning, Success).

## Import

```typescript
import { PhoneNumberInputComponent } from '@lucca-front/ng/forms';
// ou
import { FormFieldComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-form-field>
  <lu-phone-number-input></lu-phone-number-input>
</lu-form-field>
```

## Directive / Composant : `lu-phone-number-input` ou `<lu-phone-number-input>`

Champ de saisie pour le numéro de téléphone. Applicable sur les éléments HTML pour traiter spécifiquement les entrées de téléphone.

### Valeurs (si directive avec valeurs)

| Valeur  | Description |
|---------|-------------|
| `""` (vide) | Variante par défaut avec intégration standard |
| `"filled"` | Variante avec fond rempli |
| `"placeholder"` | Variante affichant un texte d'indication |

```html
<lu-phone-number-input content="filled"></lu-phone-number-input>
```

## Inputs

### `content`
Type: `'filled' | 'placeholder'` — Default: `'filled'`

Définit le contenu affiché dans le champ de saisie.

```html
<lu-phone-number-input [content]="'placeholder'"></lu-phone-number-input>
```

## Patterns courants

### Champ de numéro de téléphone avec feedback
```html
<lu-form-field>
  <lu-phone-number-input [content]="'filled'" feedback="success"></lu-phone-number-input>
</lu-form-field>
```

## Accessibilité
Assurez-vous que le champ de saisie est étiqueté correctement pour une meilleure compréhension par les technologies d'assistance. Utilisez `aria-label` si nécessaire.

## Guidelines Prisme
- Privilégier la clarté dans les labels des champs de saisie.
- Ne pas masquer les messages d'erreur, ils doivent être visibles et clairs pour l'utilisateur.