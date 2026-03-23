# Scrollbar

## Quand utiliser ce composant
1. Lorsque vous souhaitez fournir une navigation supplémentaire dans des conteneurs ayant un contenu débordant.
2. Pour améliorer l'expérience utilisateur sur des interfaces où le contenu est trop volumineux pour être affiché intégralement.
3. Dans des applications qui nécessitent de gérer plusieurs types de contenu au sein d'une même section.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-horizontalnavigation-html-css-scrollbox--docs)

## Composant Figma
[Scrollbox Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3200-27112) - Composant de défilement permettant de naviguer horizontalement et verticalement, avec des variantes pour les systèmes PC et Mac.

## Import

```typescript
import { ScrollboxComponent } from '@lucca-front/ng/navigation';
```

## Usage de base

```html
<!-- Usage minimal -->
<div luXScrollbox>...</div>
```

## Directive / Composant : `luXScrollbox` ou `<lu-scrollbox>`

Directive destinée à appliquer une scrollbar sur des éléments HTML qui contiennent une grande quantité de contenu.

### Valeurs

| Valeur             | Description                      |
|--------------------|----------------------------------|
| `PC-horizontal`    | Scrollbar horizontale pour PC    |
| `Mac-vertical`     | Scrollbar verticale pour Mac      |
| `PC-vertical`      | Scrollbar verticale pour PC       |
| `Mac-horizontal`   | Scrollbar horizontale pour Mac    |

```html
<div luXScrollbox="PC-horizontal">...</div>
```

## Inputs

### `direction`
Type: `'horizontal' | 'vertical'` — Default: `'vertical'`

Définit la direction de la scrollbar.

```html
<div luXScrollbox [direction]="'horizontal'">...</div>
```

## Patterns courants

### Scroll avec contenu
```html
<!-- Utilisation d'une scrollbar sur un contenu débordant -->
<div luXScrollbox>Contenu large ou long qui nécessite une scrollbar...</div>
```

## Accessibilité
Assurez-vous que les éléments défilants sont accessibles aux utilisateurs de technologies d'assistance, et que le contenu peut être navigué via le clavier.

## Guidelines Prisme
- Évitez d'utiliser des scrollbars personnalisées qui peuvent nuire à l'expérience utilisateur sur certains navigateurs.
- Privilégiez des couleurs et des tailles de scrollbar qui respectent l'identité visuelle de Lucca.