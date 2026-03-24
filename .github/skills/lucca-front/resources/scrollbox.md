# Scrollbar

## Quand utiliser ce composant
- Pour ajouter un défilement personnalisé aux conteneurs de contenu lorsque le contenu déborde.
- Lors de la conception d'interfaces utilisateur sur des plateformes PC ou Mac où une expérience utilisateur améliorée est requise.
- Dans des applications qui nécessitent des directions de défilement spécifiques, que ce soit horizontal ou vertical.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-horizontalnavigation-html-css-scrollbox--docs)

## Composant Figma
[Scrollbar Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3200-27112) - Le composant Scrollbar est conçu pour être intégré dans les interfaces de navigation et est disponible en plusieurs variantes, dont les types et directions pour s'adapter à différents cas d'utilisation (PC/Mac, horizontal/vertical).

## Import

```typescript
import { ScrollboxComponent } from '@lucca-front/ng/navigation';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-scrollbox></lu-scrollbox>
```

## Directive / Composant : `luScrollbox` ou `<lu-scrollbox>`

Composant permettant d'ajouter une barre de défilement personnalisée. Applicable pour ajouter du défilement à tout conteneur débordant.

### Valeurs 

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"horizontal"` | Scrollbar en mode horizontal |
| `"vertical"` | Scrollbar en mode vertical |
| `"mac"` | Variante pour Mac |
| `"pc"` | Variante pour PC |

```html
<lu-scrollbox direction="horizontal" type="pc"></lu-scrollbox>
```

## Inputs

### `direction`
Type: `'horizontal' | 'vertical'` — Default: `'vertical'`

Détermine la direction de la barre de défilement.

```html
<lu-scrollbox [direction]="'horizontal'"></lu-scrollbox>
```

### `type`
Type: `'mac' | 'pc'` — Default: `'pc'`

Définit le type de scrollbar, adapté pour Mac ou PC.

```html
<lu-scrollbox [type]="'mac'"></lu-scrollbox>
```

## Patterns courants

### Scrollbar horizontal pour PC
```html
<lu-scrollbox direction="horizontal" type="pc"></lu-scrollbox>
```

### Scrollbar vertical pour Mac
```html
<lu-scrollbox direction="vertical" type="mac"></lu-scrollbox>
```

## Accessibilité
Assurez-vous que les éléments de défilement sont navigables au clavier et que des étiquettes accessibles sont fournies pour les utilisateurs de lecteurs d'écran.

## Guidelines Prisme
- Utilisez des barres de défilement personnalisées pour une meilleure expérience utilisateur, en veillant à ce qu'elles soient visibles tout en restant discrètes.
- Évitez d'utiliser des barres de défilement non intégrées qui peuvent nuire à la visibilité et à l'accessibilité.