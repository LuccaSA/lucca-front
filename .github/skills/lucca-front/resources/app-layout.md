# pr-AppLayout (360)

## Quand utiliser ce composant
- Pour créer une mise en page d'application complexe nécessitant des sections définies.
- Lorsqu'il est nécessaire de gérer la navigation sur le côté avec une bannière en haut.
- Pour des projets nécessitant une structure réactive s'adaptant aux écrans mobiles.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-app-layout-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-app-layout-angular-basic--basic)

## Composant Figma
[Consulter le design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21818-96550) - Composant pr-AppLayout (360) avec une section de navigation latérale et un en-tête.

## Import

```typescript
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-app-lay>...</lu-app-lay>
```

## Directive / Composant : `lu-app-lay` ou `<lu-app-lay>`

Description courte du sélecteur. Applicable sur tous les éléments HTML, utilisé pour définir la mise en page de l'application.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"mobileNavSideBottom"` | Active la navigation mobile située en bas. |

```html
<lu-app-lay [mobileNavSideBottom]="true">...</lu-app-lay>
```

## Inputs

### `mobileNavSideBottom`
Type: `boolean` — Default: `false`

Active la navigation mobile située au bas de l'application.

```html
<lu-app-lay [mobileNavSideBottom]="true">...</lu-app-lay>
```

## Patterns courants

### Mise en page avec navigation mobile
```html
<!-- Utilisation d'une mise en page avec navigation en bas -->
<lu-app-lay [mobileNavSideBottom]="true">...</lu-app-lay>
```

## Accessibilité
Assurez-vous que la navigation est accessible via le clavier et que des attributs ARIA appropriés sont utilisés pour les éléments de navigation.

## Guidelines Prisme
- Évitez de surcharger la mise en page avec trop d'éléments latéraux.
- Ne pas omettre d'assurer la réactivité de la mise en page sur différents appareils.
- Gardez une cohérence visuelle avec le reste du design system Lucca.