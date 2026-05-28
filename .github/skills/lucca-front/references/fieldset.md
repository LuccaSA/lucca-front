# AssetsFieldset

## Quand utiliser ce composant
- Pour grouper un ensemble de champs de formulaire avec un titre et une aide contextuelle.
- Lorsqu'il est nécessaire d'afficher plusieurs options dans un format de grille avec une disposition responsive.
- Pour créer des sections de formulaire qui peuvent être repliées ou dépliées pour une meilleure organisation des données.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fieldset-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fieldset-angular-basic--basic)

## Composant Figma
[AssetsFieldset sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28461-200809) — Composant visuel permettant de regrouper divers inputs en sections. Variantes pratiques pour le développement, telles que différentes configurations de colonnes et de lignes.

## Import

```typescript
import { FieldsetComponent, FormFieldComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-fieldset heading="Titre du Fieldset">
  <lu-grid mode="form">
    <lu-grid-column colspan="4">
      <lu-form-field label="Label">
        <lu-text-input type="text" [(ngModel)]="example" />
      </lu-form-field>
    </lu-grid-column>
  </lu-grid>
</lu-fieldset>
```

## Directive / Composant : `lu-fieldset` ou `<lu-fieldset>`

Composant utilisé pour créer un champ de formulaire groupé, utile pour structurer les données de manière logique.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"columns-2"` | Deux colonnes |
| `"columns-4"` | Quatre colonnes |
| `"lines-3"` | Trois lignes |
| ... | Autres variantes |

```html
<lu-fieldset [horizontal]="true" [expandable]="true">...</lu-fieldset>
```

## Inputs

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

### `withAction`
Type: `boolean` — Default: `false`

Ajoute un bouton d'action à droite du titre.

```html
<lu-fieldset [withAction]="true">...</lu-fieldset>
```

### `expanded`
Type: `boolean` — Default: `false`

Affiche le fieldset en vue dépliée.

```html
<lu-fieldset [expanded]="true">...</lu-fieldset>
```

### `size`
Type: `'small' | 'medium' | 'large'` — Default: `'medium'`

Modifie la taille du fieldset.

```html
<lu-fieldset size="small">...</lu-fieldset>
```

### `heading`
Type: `string` — Default: `''`

Titre du fieldset.

```html
<lu-fieldset heading="Titre">...</lu-fieldset>
```

### `helper`
Type: `string` — Default: `''`

Ajoute un sous-titre au fieldset.

```html
<lu-fieldset heading="Titre" helper="Sous-titre">...</lu-fieldset>
```

### `presentation`
Type: `boolean` — Default: `false`

Transforme le champ de formulaire en donnée textuelle non éditable.

```html
<lu-fieldset [presentation]="true">...</lu-fieldset>
```

## Patterns courants

### Champ de formulaire organisé
```html
<lu-fieldset heading="Informations utilisateur" expandable="true">
  <lu-grid mode="form">
    <lu-grid-column colspan="4">
      <lu-form-field label="Nom">
        <lu-text-input type="text" [(ngModel)]="user.name" />
      </lu-form-field>
    </lu-grid-column>
    <lu-grid-column colspan="4">
      <lu-form-field label="Email">
        <lu-text-input type="text" [(ngModel)]="user.email" />
      </lu-form-field>
    </lu-grid-column>
  </lu-grid>
</lu-fieldset>
```

## Accessibilité
Assurez-vous que les titres des fieldsets soient informatifs et que les inputs soient correctement étiquetés avec des éléments `<label>` associés pour garantir une bonne navigation.

## Guidelines Prisme
- Utilisez des titres clairs et descriptifs pour chaque section.
- Ne pas surcharger le fieldset avec trop de champs ; favorisez la clarté.
- Assurez-vous que les options dépliables soient clairement indiquées visuellement.