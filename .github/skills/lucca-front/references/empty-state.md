# pr-EmptyStateFull

## Quand utiliser ce composant
- Lorsque vous souhaitez informer l'utilisateur qu'il n'y a aucune donnée à afficher dans une section ou une page.
- Pour guider l'utilisateur sur les actions possibles à entreprendre lorsque le contenu est vide.
- Lorsque vous avez besoin d'un design visuel cohérent et adapté à différentes tailles d'écran et produits.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-empty-state-angular-page--docs)
- [Page](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-empty-state-angular-page--page)
- [Section](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-empty-state-angular-section--section)

## Composant Figma
[Consulter le Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21818-68878) - Composant avec plusieurs variantes selon la taille de l'écran (XS, S, M) et le produit (Time and Activities, Spend Management, etc.).

## Import

```typescript
import { EmptyStatePageComponent } from '@lucca-front/ng/empty-state';
// ou
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
```

## Usage de base

```html
<!-- Usage pour une page -->
<lu-empty-state-page heading="Titre" description="Aucune donnée à afficher." hx="exemple-hx">
    <button luButton type="button" palette="product">Button</button>
    <button luButton="outlined" type="button">Button</button>
</lu-empty-state-page>

<!-- Usage pour une section -->
<lu-empty-state-section illustration="illustration.svg" heading="Titre" description="Aucune donnée à afficher." hx="exemple-hx">
    <button luButton type="button" palette="product">Button</button>
    <button luButton="outlined" type="button">Button</button>
</lu-empty-state-section>
```

## Directive / Composant : `lu-empty-state-page` ou `lu-empty-state-section`

Description courte du sélecteur. Applicable sur les sections et pages pour indiquer un état vide.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

## Inputs

### `hx`
Type: `string` — Default: `undefined`

Utilisé pour des effets ou transitions spécifiques.

```html
<lu-empty-state-page [hx]="value">...</lu-empty-state-page>
```

### `heading`
Type: `string` — Default: `undefined`

Titre affiché dans l'état vide.

```html
<lu-empty-state-page [heading]="value">...</lu-empty-state-page>
```

### `description`
Type: `string` — Default: `undefined`

Description affichée sous le titre.

```html
<lu-empty-state-page [description]="value">...</lu-empty-state-page>
```

### `slotTop`
Type: `ng-template` — Default: `undefined`

Permet d'ajouter du contenu au-dessus du titre.

```html
<lu-empty-state-page [slotTop]="template">...</lu-empty-state-page>
```

## Patterns courants

### État vide avec bouton d'action
```html
<lu-empty-state-page heading="Pas de données" description="Commencez par ajouter du contenu." hx="example">
    <button luButton type="button" palette="product">Ajouter</button>
</lu-empty-state-page>
```

## Accessibilité
Assurez-vous que les éléments interactifs sont accessibles via le clavier et qu'ils ont des attributs ARIA appropriés pour les lecteurs d'écran. Utilisez des titres et des descriptions explicites pour aider les utilisateurs à comprendre l'état vide.

## Guidelines Prisme
- Utiliser des titres clairs et pertinents.
- Éviter des messages vagues dans la description.
- Inclure un appel à l'action lorsque c'est pertinent.