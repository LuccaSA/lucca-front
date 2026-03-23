# EmptyStateSection

## Quand utiliser ce composant
- Lorsque vous avez besoin d'afficher un état vide avec un message d'information.
- Pour ajouter un appel à l'action lorsque le contenu est indisponible.
- Pour illustrer une section sans données, tout en restant visuellement cohérent.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-empty-state-angular-page--docs)
- [Page](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-empty-state-angular-page--page)
- [Section](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-empty-state-angular-section--section)

## Composant Figma
[Accéder au fichier Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21818-76686) - Composant visuellement conçu pour afficher des états vides avec possibilité d'alignement du texte à gauche ou centré.

## Import

```typescript
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
```

## Usage de base

```html
<lu-empty-state-section ...>...</lu-empty-state-section>
```

## Directive / Composant : `luEmptyStateSection` ou `<lu-empty-state-section>`

Permet d'afficher une section d'état vide. Applicable sur des éléments pour présenter des données vides ou des messages descriptifs.

### Valeurs (si directive avec valeurs)

| Valeur   | Description                     |
|----------|---------------------------------|
| `""`     | Variante par défaut             |
| `center` | Aligne le texte au centre       |

```html
<lu-empty-state-section center>...</lu-empty-state-section>
```

## Inputs

### `heading`
Type: `string` — Default: `''`

Titre principal de la section.

```html
<lu-empty-state-section [heading]="'Titre'">...</lu-empty-state-section>
```

### `description`
Type: `string` — Default: `''`

Description de l'état vide.

```html
<lu-empty-state-section [description]="'Aucune donnée disponible.'">...</lu-empty-state-section>
```

### `illustration`
Type: `string` — Default: `''`

Illustration à afficher dans la section vide.

```html
<lu-empty-state-section illustration="absence">...</lu-empty-state-section>
```

### `action`
Type: `boolean` — Default: `false`

Indique si un bouton d'action doit être affiché.

```html
<lu-empty-state-section [action]="true">...</lu-empty-state-section>
```

### `center`
Type: `boolean` — Default: `false`

Indique si le contenu doit être centré.

```html
<lu-empty-state-section [center]="true">...</lu-empty-state-section>
```

### `palette`
Type: `'none' | 'primary' | 'secondary' | 'product'` — Default: `'none'`

Palette de couleur à appliquer sur le bouton.

```html
<lu-empty-state-section [palette]="'primary'">...</lu-empty-state-section>
```

## Patterns courants

### Section avec action
```html
<lu-empty-state-section heading="Pas de données" description="Veuillez ajouter des données." action center>
    <button luButton type="button" palette="product">Ajouter des données</button>
</lu-empty-state-section>
```

## Accessibilité
Assurez-vous que le contenu est descriptif et que les boutons d'action sont accessibles via le clavier.

## Guidelines Prisme
- Toujours fournir un message clair pour les états vides.
- Utiliser des illustrations pertinentes lorsque cela est nécessaire.
- Éviter de surcharger l'utilisateur avec trop d'options dans les états vides.