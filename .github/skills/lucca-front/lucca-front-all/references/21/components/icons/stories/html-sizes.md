# icons — Sizes _(HTML/CSS)_

<callout background="2">

La taille d'une icône est généralement liée au`line-height`du texte la contentant. Si vous souhaitez utiliser une variable de thème pour définir la taille d'une icône, favorisez les [variables sizes](https://prisme.lucca.io/94310e217/p/9025b9-theme/t/719ce5) de type `var(--sizes-M-lineHeight)`.

</callout>

```css
@forward '@lucca-front/scss/src/components/icon';
```

```html
<span aria-hidden="true" class="lucca-icon icon-heart mod-XXS"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-XS"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-S"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-M"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-L"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-XL"></span>
<span aria-hidden="true" class="lucca-icon icon-heart mod-XXL"></span>
```
