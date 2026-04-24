# Scrollbar

## Quand utiliser ce composant
- Lorsqu'un élément a un contenu qui déborde et nécessite un défilement.
- Pour assurer une navigation fluide dans des sections de contenu visibles limitées.
- Lors de l'implémentation de l'expérience utilisateur sur des interfaces mobiles et desktop nécessitant un défilement.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-horizontalnavigation-html-css-scrollbox--docs)

## Composant Figma
[Scrollbar Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3200-27112) — Ce composant représente une barre de défilement avec des variantes basées sur le type de système d'exploitation et la direction. Variantes disponibles : Type=PC, Direction=Horizontal, Type=Mac, Direction=Vertical, Type=PC, Direction=Vertical, Type=Mac, Direction=Horizontal.

## Import

```typescript
import { ScrollboxComponent } from '@lucca-front/ng/navigation';
```

## Usage de base

```html
<!-- Usage minimal -->
<div luScrollbox>Contenu avec défilement</div>
```

## Directive / Composant : `luScrollbox` ou `<lu-scrollbox>`

Description courte du sélecteur. Applicable aux éléments contenant du contenu qui nécessite un défilement.

### Valeurs

| Valeur         | Description                          |
|----------------|--------------------------------------|
| `"PC"`         | Type pour les systèmes PC          |
| `"Mac"`        | Type pour les systèmes Mac         |
| `"Horizontal"` | Défilement horizontal               |
| `"Vertical"`   | Défilement vertical                 |

```html
<div luScrollbox="PC, Horizontal">Contenu défilant horizontalement</div>
```

## Inputs

### `type`
Type: `'PC' | 'Mac'` — Default: `'PC'`

Type de barre de défilement en fonction du système d'exploitation.

```html
<div luScrollbox [type]="'Mac'">Contenu défilant sur Mac</div>
```

### `direction`
Type: `'Horizontal' | 'Vertical'` — Default: `'Vertical'`

Direction de défilement de la barre.

```html
<div luScrollbox [direction]="'Horizontal'">Contenu défilant horizontalement</div>
```

## Patterns courants

### Utilisation de la scrollbar
```html
<!-- Contenu défilant verticalement pour PC -->
<div luScrollbox type="PC" direction="Vertical">Contenu défilant verticalement</div>
```

## Accessibilité
Veillez à assurer que toutes les actions de défilement soient accessibles via le clavier et que les lecteurs d'écran puissent annoncer correctement le contenu défilant.

## Guidelines Prisme
- Assurez-vous de tester le comportement du composant dans différents navigateurs pour garantir une expérience utilisateur cohérente.
- Évitez d'utiliser le défilement avec du contenu critique qui nécessite l'attention immédiate de l'utilisateur.