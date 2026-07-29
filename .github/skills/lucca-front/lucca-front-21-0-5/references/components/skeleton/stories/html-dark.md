# skeleton — Dark _(HTML/CSS)_

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
