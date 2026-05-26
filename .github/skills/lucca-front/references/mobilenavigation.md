# pr-MobileNavigation

## Quand utiliser ce composant
- Lorsque vous devez implémenter une navigation responsive adaptée aux appareils mobiles.
- Quand vous souhaitez afficher un nombre variable d'onglets dans une interface mobile.
- Dans les situations où un accès rapide et simple à différentes sections d’une application est requis sur mobile.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-mobilenavigation-basic--docs)

## Composant Figma
[Visuel du composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8399-38433) - Affiche un menu de navigation mobile avec différentes variantes possible en fonction du nombre d'onglets.

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

Affiche une navigation mobile. Applicable uniquement pour les composants de navigation.

### Valeurs 

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut (1 onglet) |
| `"2-tabs"` | Variante avec 2 onglets |
| `"3-tabs"` | Variante avec 3 onglets |
| `"4-tabs"` | Variante avec 4 onglets |
| `"5-tabs"` | Variante avec 5 onglets |

```html
<lu-mobile-navigation [tabsCount]="2"></lu-mobile-navigation>
```

## Inputs

### `tabsCount`
Type: `2 | 3 | 4 | 5` — Default: `2`

Définit le nombre d'onglets à afficher dans la navigation mobile.

```html
<lu-mobile-navigation [tabsCount]="3"></lu-mobile-navigation>
```

## Patterns courants

### Navigation avec 4 onglets
```html
<lu-mobile-navigation [tabsCount]="4"></lu-mobile-navigation>
```

## Accessibilité
Assurez-vous que chaque onglet de navigation est accessible via le clavier et doté d'étiquettes claires pour une identification simple.

## Guidelines Prisme
- Utilisez des éléments de navigation qui sont alignés avec les pratiques de design mobile.
- Ne surchargez pas la navigation avec trop d'onglets pour éviter la confusion pour l'utilisateur.