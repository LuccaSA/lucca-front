# Popover

## Quand utiliser ce composant
- Pour afficher des informations supplémentaires sur un élément au survol ou au clic de l'utilisateur.
- Lorsqu'il est nécessaire de fournir des conseils ou des descriptions contextuelles sans occuper d'espace permanent sur l'interface.
- Pour créer des interactions riches où l'utilisateur a besoin de plus d'informations avant de prendre une décision.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-overlays-popover--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-users-popover-angular--basic)

## Composant Figma
[Visuel du pr-Popover](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=5742-31562) - Ce composant représente une superposition d'informations contextuelles avec une variante disponible : pr-Popover.

## Import

```typescript
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

## Usage de base

```html
<!-- Usage minimal -->
<button type="button" class="userPopover_trigger" [luUserPopover]="luUserPopover()" [luUserPopoverDisabled]="luUserPopoverDisabled()">Survolez-moi !</button>
```

## Directive / Composant : `luUserPopover` ou `<lu-user-popover>`

Cette directive permet d'afficher un popover associé à un élément déclencheur.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<!-- Exemple de directive avec valeur -->
<button type="button" [luUserPopover]="yourValue">...</button>
```

## Inputs

### `luUserPopover`
Type: `ILuUser | null` — Default: `null`

Permet de spécifier l'utilisateur dont les informations seront affichées dans le popover.

```html
<button type="button" [luUserPopover]="{ id: 1, firstName: 'Chloe', lastName: 'Alibert' }">Survolez-moi !</button>
```

### `luUserPopoverEnterDelay`
Type: `number` — Default: `300`

Délai en millisecondes avant d'afficher le popover après le survol.

```html
<button type="button" [luUserPopoverEnterDelay]="500">Survolez-moi !</button>
```

### `luUserPopoverLeaveDelay`
Type: `number` — Default: `200`

Délai en millisecondes avant de masquer le popover après que le curseur quitte l'élément déclencheur.

```html
<button type="button" [luUserPopoverLeaveDelay]="400">Survolez-moi !</button>
```

### `luUserPopoverDisabled`
Type: `boolean` — Default: `false`

Indique si le popover est désactivé.

```html
<button type="button" [luUserPopoverDisabled]="true">Survolez-moi !</button>
```

## Patterns courants

### Utilisation de Popover avec délai
```html
<!-- Utilisation d'un popover avec des délais personnalisés -->
<button type="button" [luUserPopover]="{ id: 1, firstName: 'Chloe', lastName: 'Alibert' }" [luUserPopoverEnterDelay]="300" [luUserPopoverLeaveDelay]="200">Survolez-moi !</button>
```

## Accessibilité
Veillez à maintenir un bon contraste visuel entre le popover et le fond, et à utiliser des descriptions d'éléments pour s'assurer que les lecteurs d'écran puissent correctement interpréter les popovers.

## Guidelines Prisme
- Utiliser cette directive pour toutes les informations contextuelles qui ne doivent pas encombrer l'interface principale.
- Ne pas abuser des popovers pour éviter une surcharge d’informations pouvant nuire à l’expérience utilisateur.