# skeleton — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-loaders-skeleton--docs)

## Angular

Mots-clés : placeholder, chargement, loading

## HTML/CSS

Classe CSS : `.skeleton`

La classe `.skeleton` englobe les différents éléments enfants (`.skeleton-item`) qui seront affichés lors de la phase de chargement. 

Le statut `.is-loading` active l'état de chargement des éléments enfants.

### Align

```css
@forward '@lucca-front/scss/src/components/skeleton';
```

```html
<div class="skeleton is-loading">
	<span class="skeleton-item" style="--components-skeleton-text-width: 50%"></span>
	<span class="skeleton-item mod-alignCenter" style="--components-skeleton-text-width: 50%"></span>
	<span class="skeleton-item mod-alignRight" style="--components-skeleton-text-width: 50%"></span>
</div>
```

### Circle

Les formes permettent de marquer le chargement de certains éléments spécifiques comme les [avatars](https://prisme.lucca.io/94310e217/p/42b330-avatar).

Il est possible de contrôler les taille des formes plus précisement via les variables `--components-skeleton-shape-height` et `--components-skeleton-shape-width`.

```css
@forward '@lucca-front/scss/src/components/skeleton';
```

```html
<div class="skeleton is-loading pr-u-displayFlex pr-u-gap100 pr-u-alignItemsCenter">
	<span class="skeleton-item mod-circle mod-XS"></span>
	<span class="skeleton-item mod-circle mod-S"></span>
	<span class="skeleton-item mod-circle"></span>
	<span class="skeleton-item mod-circle mod-L"></span>
	<span class="skeleton-item mod-circle mod-XL"></span>
	<span class="skeleton-item mod-circle mod-XXL"></span>
</div>
```

### Dark

L'option sombre permet d'optimiser l'affichage du skeleton sur un fond gris. 

`.mod-dark` peut être utilisé sur `skeleton-item` pour une mise en forme plus fine.

```css
@forward '@lucca-front/scss/src/components/skeleton';
```

```html
<div class="skeleton mod-dark is-loading">
	<h1 class="skeleton-item"></h1>
	<span class="skeleton-item"></span>
</div>
```

### Square

Les formes permettent de marquer le chargement de certains éléments spécifiques comme les [avatars](https://prisme.lucca.io/94310e217/p/42b330-avatar).

Il est possible de contrôler les taille des formes plus précisement via les variables `--components-skeleton-shape-height` et `--components-skeleton-shape-width`.

```css
@forward '@lucca-front/scss/src/components/skeleton';
```

```html
<div class="skeleton is-loading pr-u-displayFlex pr-u-gap100 pr-u-alignItemsCenter">
	<span class="skeleton-item mod-square mod-XS"></span>
	<span class="skeleton-item mod-square mod-S"></span>
	<span class="skeleton-item mod-square"></span>
	<span class="skeleton-item mod-square mod-L"></span>
	<span class="skeleton-item mod-square mod-XL"></span>
	<span class="skeleton-item mod-square mod-XXL"></span>
</div>
```

### Texts

```css
@forward '@lucca-front/scss/src/components/skeleton';
```

```html
<div class="skeleton is-loading">
	<span class="skeleton-item"></span>
	<span class="skeleton-item pr-u-bodyS"></span>
	<span class="skeleton-item pr-u-bodyXS"></span>
</div>
```

### Titles

Les skeletons fonctionnent également avec les utilitaires dédiés à la taille des titres `.pr-u-h1`, `.pr-u-h2`, `.pr-u-h3` et `.pr-u-h4`

```css
@forward '@lucca-front/scss/src/components/skeleton';
```

```html
<div class="skeleton is-loading">
	<h1 class="skeleton-item"></h1>
	<h2 class="skeleton-item"></h2>
	<h3 class="skeleton-item"></h3>
	<h4 class="skeleton-item"></h4>
</div>
```

### Width

```css
@forward '@lucca-front/scss/src/components/skeleton';
```

```html
<div class="skeleton is-loading">
	<span class="skeleton-item" style="--components-skeleton-text-width: 20%"></span>
	<span class="skeleton-item pr-u-bodyS" style="--components-skeleton-text-width: 80%"></span>
	<span class="skeleton-item pr-u-bodyXS" style="--components-skeleton-text-width: 40%"></span>
</div>
```
