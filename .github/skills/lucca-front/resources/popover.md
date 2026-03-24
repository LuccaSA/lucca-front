# Popover

## Quand utiliser ce composant
- Pour afficher des informations contextuelles lorsqu'un utilisateur survole ou clique sur un élément.
- Lorsqu'il est nécessaire de fournir des instructions supplémentaires sans quitter la page actuelle.
- Pour montrer des actions disponibles en association avec des éléments d'interface utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-overlays-popover--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-popover-angular--basic)

## Composant Figma
[Visuel du composant sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5742-31562) - Ce Popover permet d'afficher du contenu additionnel par superposition. Variante disponible : pr-Popover.

## Import

```typescript
import { LuUserPopoverDirective } from '@lucca-front/ng/popover';
```

## Usage de base

```html
<!-- Usage minimal -->
<button type="button" [luUserPopover]="'Votre texte ici'">Ouvrir Popover</button>
```

## Directive / Composant : `luUserPopover` ou `[luUserPopover]`

Description courte du sélecteur. Applicable sur les éléments HTML pour afficher un Popover.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<button type="button" [luUserPopover]="'Votre texte ici'">Ouvrir Popover</button>
```

## Inputs

### `content`
Type: `string` — Default: `''`

Le contenu à afficher à l'intérieur du Popover.

```html
<button type="button" [luUserPopover]="content">Ouvrir Popover</button>
```

## Patterns courants

### Afficher un Popover sur un bouton
```html
<!-- Un bouton qui affiche un Popover avec du texte explicatif -->
<button type="button" [luUserPopover]="'Cliquez ici pour plus d\'infos'">Infos</button>
```

## Accessibilité
Assurez-vous que le Popover soit accessible via le clavier et que l'utilisateur puisse le fermer avec un bouton ou un clic en dehors de celui-ci.

## Guidelines Prisme
- Utilisez des popovers pour fournir des informations contextuelles de manière non intrusives.
- Évitez d'utiliser un Popover pour des informations critiques qui nécessitent l'attention immédiate de l'utilisateur.
- Soyez attentif à la clarté et à la concision du contenu présenté dans un Popover pour une meilleure compréhension.