# Mixins SCSS

# Icônes

Génère une icône grâce à la mixin `icon.generate`.

```css
@use '@lucca-front/icons/src/commons/utils/icon';
@include icon.generate('heart');
```

Il est très souvent utile d'utiliser la mixin generate dans un `::before`

# Loadings

## Spinner

```css
@use '@lucca-front/scss/src/commons/utils/loading';
@include loading.spinner(); 
```

| Propriété | Valeur par défaut | Description |
| --- | --- | --- |
| `$size` | `1.5rem` | Taille du spinner |

## Gradient

```css
@use '@lucca-front/scss/src/commons/utils/loading';
@include loading.gradient(); 
```

| Propriété | Valeur par défaut | Description |
| --- | --- | --- |
| `$backgroundColor` | `transparent` | Couleur de fond |
| `$color` | `color.transparentize(var(--palettes-neutral-900), 0.1)` | Couleur du dégradé |

# Media et container queries

Vous pouvez utiliser les breakpoints via les mixins `max` et `min`ou `between` disponibles pour les medias ou les containers.

```css
@use '@lucca-front/scss/src/commons/utils/media';
@use '@lucca-front/scss/src/commons/utils/container';

@include media.max('M') {…}
@include media.min('M') {…}
@include media.between('S', 'L') {…}

@include container.max('M') {…}
@include container.min('M') {…}
@include container.between('S', 'L') {…}
```

Si les valeurs prédéfinies ne conviennent pas, les valeurs personnalisées des breakpoints sont autorisées et converties automatiquement de `px` en `em`.

Il est possible pour les containers queries de nommer le container avec le paramètre `$name`.

Le paramètre `$property: height` permet de basculer les tests de la largeur à la hauteur. 

# Masquage

Masque visuellement un élément sans pour autant le retirer de la couche sémantique du document.

```css
@use '@lucca-front/scss/src/commons/utils/a11y';
@include a11y.mask;
```

La classe `.pr-u-mask` fait directement appel à cette mixin.

# Focus

Marque le focus d'un élément de la page. Il est recommandé d'utiliser `:focus-visible` plutôt que `:focus` afin de n'afficher le contour de sélection seulement lors de la navigation clavier ainsi que pour les éléments nécessitant une saisie clavier (ex: textfield). 

```css
@use '@lucca-front/scss/src/commons/utils/a11y';
@include a11y.focusVisible();
```

| Propriété | Valeur par défaut | Description |
| --- | --- | --- |
| `$borderRadius` | `false` | `border-radius` du composant au focus. |
| `$offset` | `2px` | Espace entre le composant et l'outline. |
| `$color` | `var(--palettes-product-700)` | Couleur de l'outline. |

# Colors

## Transparantize

Permet d'appliquer une transparence à une couleur.

```css
@use '@lucca-front/scss/src/commons/utils/color';
color.transparentize(var(--palettes-neutral-900), 0.6); 
```

# Overflow scrollblock [v19.2]

Permet de bloquer l'affichage de la barre de scroll sur le body, afin d'éviter un double scroll lors de l'affichage d'une fenêtre de dialogue.

```css
@use '@lucca-front/scss/src/commons/utils/overflow';
@include overflow.scrollblock;
```
