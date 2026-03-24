# pr-MobileNavigation

## Quand utiliser ce composant
- Pour créer une navigation mobile avec un nombre flexible d'onglets.
- Lors de la conception d'applications où l'espace d'affichage est limité et nécessite une interface utilisateur mobile conviviale.
- Pour améliorer l'expérience utilisateur sur des appareils mobiles en fournissant une navigation intuitive et accessible.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-mobilenavigation-basic--docs)

## Composant Figma
[pr-MobileNavigation Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8399-38433) - Ce composant présente une navigation sobre avec des variantes disponibles permettant d'afficher de 2 à 5 onglets.

## Import

```typescript
import { PrMobileNavigationComponent } from '@lucca-front/ng/navigation';
```

## Usage de base

```html
<!-- Usage minimal -->
<pr-mobile-navigation></pr-mobile-navigation>
```

## Directive / Composant : `prMobileNavigation` ou `<pr-mobile-navigation>`

Composant de navigation mobile. Applicable comme élément racine pour structurer la navigation sur mobile.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `2` | Affiche 2 onglets |
| `3` | Affiche 3 onglets |
| `4` | Affiche 4 onglets |
| `5` | Affiche 5 onglets |

```html
<pr-mobile-navigation [tabCount]="3"></pr-mobile-navigation>
```

## Inputs

### `tabCount`
Type: `2 | 3 | 4 | 5` — Default: `2`

Détermine le nombre d'onglets à afficher dans la navigation mobile.

```html
<pr-mobile-navigation [tabCount]="4"></pr-mobile-navigation>
```

## Patterns courants

### Navigation avec plusieurs onglets
```html
<!-- Exemple de navigation avec 5 onglets -->
<pr-mobile-navigation [tabCount]="5"></pr-mobile-navigation>
```

## Accessibilité
Assurez-vous que chaque onglet est accessible via le clavier et qu'ils possèdent des labels pertinents pour les lecteurs d'écran.

## Guidelines Prisme
- Favorisez la simplicité et la clarté dans la navigation.
- Limitez le nombre d'onglets visibles pour éviter la surcharge d'information.
- Utilisez des icônes representant clairement chaque onglet.