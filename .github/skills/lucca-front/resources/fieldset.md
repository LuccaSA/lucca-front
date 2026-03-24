# pr-Fieldset

## Quand utiliser ce composant
- Pour regrouper plusieurs éléments de formulaire afin d'améliorer la lisibilité.
- Lors de la création de sections dans un formulaire complexe pour une meilleure organisation visuelle.
- Pour appliquer des styles ou des comportements spécifiques à un ensemble d'inputs.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fieldset-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fieldset-angular-basic--basic)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=30625-11186) + Description visuelle : le composant pr-Fieldset présente un cadre autour des éléments de formulaire, avec un entête optionnel pour indiquer le groupe d'inputs. Variantes disponibles : pr-Fieldset.

## Import

```typescript
import { FieldsetComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-fieldset>...</lu-fieldset>
```

## Directive / Composant : `lu-fieldset`

Description courte du sélecteur. Applicable sur des éléments HTML pour créer des regroupements d'inputs.

## Inputs

### `legend`
Type: `string` — Default: `''`

Texte à afficher en tant que légende pour le champ.

```html
<lu-fieldset [legend]="'Titre du groupe'">...</lu-fieldset>
```

## Patterns courants

### Fieldset avec légende
```html
<!-- Utilisation d'un fieldset avec une légende -->
<lu-fieldset [legend]="'Informations personnelles'">
  <lu-form-field>
    <lu-text-input placeholder="Nom"></lu-text-input>
  </lu-form-field>
  <lu-form-field>
    <lu-text-input placeholder="Prénom"></lu-text-input>
  </lu-form-field>
</lu-fieldset>
```

## Accessibilité
Assurez-vous que le champ fieldset soit associé à une légende pour une meilleure compréhension contextuelle par les utilisateurs de lecteurs d'écran.

## Guidelines Prisme
- Privilégiez l'utilisation de labels explicites pour les champs contenus dans le fieldset.
- Ne pas utiliser les fieldsets à des fins purement décoratives.
- Évitez les fieldsets imbriqués, cela peut causer des problèmes d'accessibilité.