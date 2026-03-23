# FancyBox

## Quand utiliser ce composant
- Lorsque vous avez besoin d'un conteneur d'images avec un design attrayant et personnalisable.
- Pour afficher des images de fond à gauche et à droite avec un premier plan distinct.
- Dans des mises en page réactives où le dimensionnement du composant doit varier.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-fancybox-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-fancybox-angular-basic--basic)

## Composant Figma
[Accéder au design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=25658-1087) - Le composant FancyBox est visuellement conçu pour intégrer plusieurs images avec des variantes de tailles et de réactivité.

## Import

```typescript
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-fancy-box backgroundLeft="url_gauche" backgroundRight="url_droite" foreground="url_principal" size="S">
	Content
</lu-fancy-box>
```

## Directive / Composant : `lu-fancy-box`

Directive utilisée pour créer un conteneur d'images avec des arrière-plans personnalisés. Applicable aux éléments de conteneurs.

### Valeurs

| Valeur   | Description                          |
|----------|--------------------------------------|
| `""`     | Variante par défaut                  |
| `"S"`    | Variante de taille petite            |
| `"M"`    | Variante de taille moyenne           |

```html
<lu-fancy-box size="S" backgroundLeft="url_gauche" backgroundRight="url_droite" foreground="url_principal">...</lu-fancy-box>
```

## Inputs

### `backgroundLeft`
Type: `string` — Default: `''`

URL de l'image en arrière-plan à gauche (200x160).

```html
<lu-fancy-box [backgroundLeft]="url_gauche">...</lu-fancy-box>
```

### `backgroundRight`
Type: `string` — Default: `''`

URL de l'image en arrière-plan à droite (200x160).

```html
<lu-fancy-box [backgroundRight]="url_droite">...</lu-fancy-box>
```

### `foreground`
Type: `string` — Default: `''`

URL de l'image au premier plan (200x160).

```html
<lu-fancy-box [foreground]="url_principal">...</lu-fancy-box>
```

### `size`
Type: `'' | 'S' | 'M'` — Default: `''`

Modifie la taille du composant.

```html
<lu-fancy-box [size]="sizeValue">...</lu-fancy-box>
```

## Patterns courants

### Utilisation basique
```html
<!-- Exemple d'utilisation d'un FancyBox avec des images de fond -->
<lu-fancy-box backgroundLeft="url_gauche" backgroundRight="url_droite" foreground="url_principal" size="M">
	Content
</lu-fancy-box>
```

## Accessibilité
Veillez à fournir des textes alternatifs pour les images lorsque cela est possible afin d'améliorer l'accessibilité.

## Guidelines Prisme
- Assurez-vous que les contrastes des couleurs respectent les normes d'accessibilité.
- Évitez de surcharger le composant avec trop d'images pour ne pas distraire l'utilisateur.