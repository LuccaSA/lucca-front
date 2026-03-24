# pr-VerticalNavigation

## Quand utiliser ce composant
- Pour structurer la navigation d'une application avec plusieurs sections.
- Lorsque l'on souhaite une interface claire et accessible pour les utilisateurs.
- Pour offrir une navigation persistante tout en économisant de l'espace à l'écran.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-verticalnavigation-angular-disabled--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-verticalnavigation-angular-disabled--basic)
- [Iconless](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-verticalnavigation-angular-iconless--basic)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-verticalnavigation-angular-basic--basic)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=13580-1866) - La Vertical navigation permet de naviguer entre différentes sections d’une interface. Variantes disponibles : pr-VerticalNavigation.

## Import

```typescript
import { VerticalNavigationComponent } from '@lucca-front/ng/navigation';
// ou
import { VerticalNavigationGroupComponent } from '@lucca-front/ng/navigation';
// ou
import { VerticalNavigationItemComponent } from '@lucca-front/ng/navigation';
// ou
import { VerticalNavigationLinkComponent } from '@lucca-front/ng/navigation';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-vertical-navigation>...</lu-vertical-navigation>
```

## Directive / Composant : `lu-vertical-navigation` ou `<lu-vertical-navigation>`

Composant permettant la création d'une navigation verticale. Applicable sur un conteneur d'éléments de navigation.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-vertical-navigation ...>...</lu-vertical-navigation>
```

## Inputs

### Aucun input spécifique

Aucun input n'est requis pour ce composant.

## Patterns courants

### Navigation verticale de base
```html
<lu-vertical-navigation>
  <lu-vertical-navigation-group>
    <lu-vertical-navigation-item>
      <span luVerticalNavigationLink>Section 1</span>
    </lu-vertical-navigation-item>
    <lu-vertical-navigation-item>
      <span luVerticalNavigationLink>Section 2</span>
    </lu-vertical-navigation-item>
  </lu-vertical-navigation-group>
</lu-vertical-navigation>
```

## Accessibilité
Le composant doit être utilisé avec des attributs ARIA appropriés pour assurer une navigation accessible via le clavier. Les éléments de navigation doivent être étiquetés clairement.

## Guidelines Prisme
- Privilégier l'utilisation des icônes accompagnées de texte pour une meilleure compréhension.
- Éviter de surcharger la navigation avec de trop nombreux éléments, privilégier la clarté.
- Assurer un feedback visuel lors du survol des éléments de navigation.