# MobileNavigation

## Quand utiliser ce composant
- Lorsque vous souhaitez offrir une navigation optimisée pour les appareils mobiles.
- Pour créer une interface utilisateur intuitive avec plusieurs onglets accessibles facilement.
- Lorsque vous avez besoin d'une barre de navigation qui s'adapte à différents nombre d'onglets.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-mobilenavigation-basic--docs)

## Composant Figma
[Voir le composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8399-38433) — Le composant pr-MobileNavigation présente une navigation fluide avec la possibilité d'avoir jusqu'à 5 onglets différents.

## Import

```typescript
import { MobileNavigationComponent } from '@lucca-front/ng/navigation';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-mobile-navigation></lu-mobile-navigation>
```

## Directive / Composant : `luMobileNavigation` ou `<lu-mobile-navigation>`

Le sélecteur `luMobileNavigation` est utilisé pour intégrer le composant de navigation mobile. Il peut être appliqué directement sur un élément pour créer une barre de navigation.

### Valeurs (si directive avec valeurs)

| Valeur        | Description                      |
|---------------|----------------------------------|
| `""` (vide)   | Variante par défaut              |
| `"tabCount=2"`| 2 onglets                        |
| `"tabCount=3"`| 3 onglets                        |
| `"tabCount=4"`| 4 onglets                        |
| `"tabCount=5"`| 5 onglets                        |

```html
<lu-mobile-navigation tabCount="3"></lu-mobile-navigation>
```

## Inputs

### (Aucun input à spécifier)

## Patterns courants

### Navigation mobile avec 4 onglets
```html
<lu-mobile-navigation tabCount="4"></lu-mobile-navigation>
```

## Accessibilité
Assurez-vous que la navigation mobile est accessible via le clavier et que les étapes de navigation sont clairement définies pour les lecteurs d'écran.

## Guidelines Prisme
- Suivez les principes de conception définis dans le guide Prisme, en vous assurant que les interactions utilisateur sont intuitives et que la navigation est fluide.