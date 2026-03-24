# AppLayout

## Quand utiliser ce composant
- Pour créer une structure de mise en page pour des applications Angular.
- Lorsqu'il est nécessaire d'intégrer un en-tête et un pied de page à une application.
- Pour gérer des zones de contenu centralisées avec des composants enfants.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-app-layout-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-app-layout-angular-basic--basic)

## Composant Figma
[pr-AppLayout (360)](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21818-96550) - Ce composant présente une structure de mise en page avec un en-tête, un corps de contenu principal et un pied de page. Il est conçu pour être réactif et adaptable aux différentes résolutions d'écran.

## Import

```typescript
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-app-layout>...</lu-app-layout>
```

## Directive / Composant : `lu-app-layout`

Composant de mise en page pour structurer une application Angular. Applicable comme élément racine pour gérer l'agencement de l'en-tête, du contenu principal et du pied de page.

## Inputs

### `header`
Type: `boolean` — Default: `true`

Permet d'afficher ou non l'en-tête de l'application.

```html
<lu-app-layout [header]="false">...</lu-app-layout>
```

### `footer`
Type: `boolean` — Default: `true`

Permet d'afficher ou non le pied de page de l'application.

```html
<lu-app-layout [footer]="false">...</lu-app-layout>
```

## Patterns courants

### Mise en page avec en-tête et pied de page
```html
<!-- Exemple d'utilisation d'AppLayout avec en-tête et pied de page par défaut -->
<lu-app-layout>
  <div>Contenu principal</div>
</lu-app-layout>
```

## Accessibilité
- Assurez-vous que les zones interactives dans le contenu principal sont accessibles via la navigation clavier.
- Utilisez les balises ARIA si nécessaire pour améliorer l'accessibilité des éléments.

## Guidelines Prisme
- Assurez-vous que la mise en page respecte les principes de design de Lucca.
- Évitez d'enchevêtrer trop de composants à l'intérieur du composant AppLayout, afin de garantir une clarté structurelle.