# FancyBox

## Quand utiliser ce composant
- Pour afficher des images dans une modal avec un fond personnalisé.
- Lorsque l'on souhaite une présentation responsive d'images.
- Pour créer une galerie d'images interactive et attrayante.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-fancybox-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-fancybox-angular-basic--basic)

## Composant Figma
[pr-FancyBox (v19.1)](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=25658-1087) + Variantes disponibles : Size=M, Responsive=True, Size=S, Responsive=True, Size=M, Responsive=False, Size=S, Responsive=False.

## Import

```typescript
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
```

## Usage de base

```html
<lu-fancy-box 
  [backgroundLeft]="urlImageGauche" 
  [backgroundRight]="urlImageDroite" 
  [foreground]="urlImagePremierPlan" 
  [size]="'M'">
</lu-fancy-box>
```

## Inputs

### `backgroundLeft`
Type: `string` — Default: `undefined`

URL de l'image en arrière plan à gauche (200x160).

```html
<lu-fancy-box [backgroundLeft]="urlImageGauche">...</lu-fancy-box>
```

### `backgroundRight`
Type: `string` — Default: `undefined`

URL de l'image en arrière plan à droite (200x160).

```html
<lu-fancy-box [backgroundRight]="urlImageDroite">...</lu-fancy-box>
```

### `foreground`
Type: `string` — Default: `undefined`

URL de l'image au premier plan (200x160).

```html
<lu-fancy-box [foreground]="urlImagePremierPlan">...</lu-fancy-box>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du composant.

```html
<lu-fancy-box [size]="'S'">...</lu-fancy-box>
```

## Patterns courants

### Affichage d'une image avec fond
```html
<lu-fancy-box 
  [backgroundLeft]="urlImageGauche" 
  [backgroundRight]="urlImageDroite" 
  [foreground]="urlImagePremierPlan" 
  [size]="'M'">
</lu-fancy-box>
```

## Accessibilité
Assurez-vous que les images ont des attributs `alt` valides pour améliorer l'accessibilité.

## Guidelines Prisme
- Utiliser des images de haute qualité et optimisées pour le web.
- Ne pas surcharger la modal avec trop d'éléments pour une meilleure lisibilité.
- Éviter les couleurs d'arrière-plan trop vives qui pourraient gêner la visibilité des images.