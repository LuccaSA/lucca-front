# pr-DataPresentation

## Quand utiliser ce composant
- Lorsque vous devez afficher des informations de manière claire et structurée dans un formulaire.
- Pour des présentations de données qui nécessitent une étiquette avec des valeurs associées.
- Idéal pour les cas où une présentation visuelle est nécessaire sans interaction utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-data-presentation-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-data-presentation-angular-basic--template)

## Composant Figma
[Visuel du composant dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34358-99807) + Variantes disponibles : pr-DataPresentation (v21.1) 🎉 

## Import

```typescript
import { DataPresentationComponent } from '@lucca-front/ng/form-field';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-data-presentation label="label">Value</lu-data-presentation>
```

## Directive / Composant : `lu-data-presentation` ou `<lu-data-presentation>`

Le sélecteur `lu-data-presentation` est utilisé pour afficher une étiquette avec une valeur associée, applicable aux informations présentées dans les formulaires.

## Inputs

### `label`
Type: `string` — Default: `''`

Définit l'étiquette à afficher avec la valeur.

```html
<lu-data-presentation [label]="'Votre étiquette'">Votre valeur</lu-data-presentation>
```

## Patterns courants

### Présentation de données
```html
<!-- Présentation d'un produit avec label -->
<lu-data-presentation label="Nom du produit">Produit A</lu-data-presentation>
```

## Accessibilité
Assurez-vous que l'étiquette est descriptive et utile pour les utilisateurs de lecteurs d'écran.

## Guidelines Prisme
- Utiliser des étiquettes claires et concises pour chaque valeur présentée.
- Évitez d'utiliser des étiquettes vides pour garantir l'accessibilité.