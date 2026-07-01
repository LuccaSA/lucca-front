# skeleton — Circle _(HTML/CSS)_

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
