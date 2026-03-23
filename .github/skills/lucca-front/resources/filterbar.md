# pr-FilterBar

## Quand utiliser ce composant
1. Pour créer des barres de filtrage contextuelles dans des formulaires d'application.
2. Pour permettre aux utilisateurs de sélectionner des vues spécifiques et des filtres avec un seul composant.
3. Pour intégrer des éléments de filtre supplémentaires dans une interface utilisateur de manière dynamique.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-filterspills-filterbar-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-filterspills-filterbar-angular--basic)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=26824-221178) — Le pr-FilterBar est représenté avec des variations : Full, Views only, Right-align views, et FilterPills only, chacune adaptée à des cas d'utilisation spécifiques.

## Import

```typescript
import { FilterBarComponent } from '@lucca-front/ng/filter-pills';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-filter-bar>...</lu-filter-bar>
```

## Directive / Composant : `luFilterBar` ou `<lu-filter-bar>`

Description courte du sélecteur. Applicable sur le conteneur de la barre de filtrage.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut : Full |
| `"views-only"` | Variante affichant uniquement les vues |
| `"right-align"` | Variante avec les vues alignées à droite |
| `"filter-pills-only"` | Variante affichant uniquement les filtres sous forme de «pills» |

```html
<lu-filter-bar type="views-only">...</lu-filter-bar>
```

## Inputs

### `type`
Type: `'full' | 'views-only' | 'right-align' | 'filter-pills-only'` — Default: `'full'`

Définit la variante de la barre de filtre.

```html
<lu-filter-bar [type]="'right-align'">...</lu-filter-bar>
```

## Patterns courants

### Barre de filtres complète
```html
<lu-filter-bar type="full">...</lu-filter-bar>
```

## Accessibilité
Assurez-vous que tous les éléments interactifs dans le pr-FilterBar sont accessibles via le clavier et offrent des étiquettes significatives pour les technologies d'assistance.

## Guidelines Prisme
- Utiliser des étiquettes claires et concises pour chaque type de filtre.
- Éviter d'encombrer la barre de filtres avec trop d'options.
- S'assurer que les vues sont intuitives et faciles à utiliser pour l'utilisateur.