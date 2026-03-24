# AssetsSelect

## Quand utiliser ce composant
- Lorsque l'utilisateur doit sélectionner plusieurs options parmi une liste grande ou catégorisée.
- Pour permettre la sélection d'éléments dans un format d'arborescence, afin de gérer des groupes d'options.
- Lorsqu'il est nécessaire de fournir un retour visuel sur l'état des sélections (sélectionné, indéfini, désactivé).

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-multi-select-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-multi-select-angular--basic)

## Composant Figma
[AssetsSelect sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=16278-20930) - Ce composant présente un sélecteur de type multi, intégrant des variantes multiples adaptées aux besoins des utilisateurs.

## Import

```typescript
import { LuMultiSelectInputComponent } from '@lucca-front/ng/forms';
// ou
import { LuOptionDirective } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<lu-multi-select>
  <label lu-form-field>Choisissez vos actifs</label>
  <ng-container *ngFor="let option of options">
    <div [luOption]="option">{{ option.label }}</div>
  </ng-container>
</lu-multi-select>
```

## Directive / Composant : `lu-multi-select`

Composant utilisé pour créer un sélecteur multiple. Applicable sur les éléments qui nécessitent la sélection d'options parmi une liste.

### Valeurs (si directive avec valeurs)

| Valeur            | Description                   |
|-------------------|-------------------------------|
| `""` (vide)       | Variante par défaut           |
| `"disabled"`      | État désactivé                |
| `"loading"`       | État de chargement            |

```html
<lu-multi-select [disabled]="true">...</lu-multi-select>
```

## Inputs

### `options`
Type: `Array<{label: string, value: any}>` — Default: `[]`

Liste des options à afficher dans le sélecteur.

```html
<lu-multi-select [options]="myOptions">...</lu-multi-select>
```

## Patterns courants

### Sélection d'actifs
```html
<!-- Un sélecteur multi avec options chargées dynamiquement -->
<lu-multi-select [options]="assets">...</lu-multi-select>
```

## Accessibilité
Veillez à inclure des attributs ARIA pertinents pour améliorer l'expérience des utilisateurs avec des besoins spécifiques.

## Guidelines Prisme
- Privilégiez l'utilisation des composants dans un contexte clair et organisé.
- Évitez de surcharger l'utilisateur avec trop d'options à la fois.
- Assurez-vous de prendre en compte les retours visuels durant l'interaction pour informer l'utilisateur.