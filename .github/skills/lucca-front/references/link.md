# pr-Link

## Quand utiliser ce composant
- Pour créer des liens cliquables dans vos applications Angular.
- Lors de la navigation entre différentes parties d'une application ou vers des ressources externes.
- Pour indiquer des actions à effectuer qui mènent à une autre vue ou à un document.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-actions-link-angular-test--docs)

## Composant Figma
[pr-Link sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=33422-7619) - Le composant pr-Link est disponible dans diverses tailles (S, M) et états (default, hover, focus, disabled, visited) avec des variations sur le soulignement et la palette (Neutral, Product).

## Import

```typescript
import { PrLinkComponent } from '@lucca-front/ng/actions';
// ou
import { PrLinkDirective } from '@lucca-front/ng/actions';
```

## Usage de base

```html
<!-- Usage minimal -->
<a prLink href="url">Lien</a>
```

## Directive / Composant : `prLink` ou `<pr-link>`

Directives Angular pour transformer un élément en lien cliquable. Applicable sur les éléments `<a>`.

### Valeurs

| Valeur               | Description                |
|----------------------|----------------------------|
| `""` (vide)          | Variante par défaut         |
| `"underline"`        | Lien avec soulignement     |
| `"no-underline"`     | Lien sans soulignement     |

```html
<a prLink="underline" href="url">Lien avec soulignement</a>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Détermine la taille du lien (small ou medium).

```html
<a prLink [size]="'S'" href="url">Lien petit</a>
```

### `underline`
Type: `boolean` — Default: `true`

Spécifie si le lien doit être souligné.

```html
<a prLink [underline]="true" href="url">Lien souligné</a>
```

### `state`
Type: `'default' | 'hover' | 'focus' | 'disabled' | 'visited'` — Default: `'default'`

Définit l'état visuel du lien.

```html
<a prLink [state]="'hover'" href="url">Lien au survol</a>
```

### `palette`
Type: `'Neutral' | 'Product'` — Default: `'Neutral'`

Choix de la palette de couleur pour le lien.

```html
<a prLink [palette]="'Product'" href="url">Lien avec palette Produit</a>
```

## Patterns courants

### Lien simple
```html
<!-- Lien cliquable avec un style par défaut -->
<a prLink href="url">Lien simple</a>
```

### Lien avec soulignement
```html
<!-- Lien cliquable avec un soulignement -->
<a prLink [underline]="true" href="url">Lien souligné</a>
```

## Accessibilité
Assurez-vous que tous les liens sont descriptifs et accessibles. Utilisez des attributs `aria` appropriés pour améliorer l'accessibilité.

## Guidelines Prisme
- Préférez l'utilisation de liens dans un contexte qui indique clairement leur fonction.
- Ne pas surcharger l'interface avec trop de liens similaires, cela peut déstabiliser l'utilisateur.
- Assurez-vous que les liens se distinguent visuellement pour les utilisateurs ayant des déficiences visuelles.