# icons — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-texts-icons-angular--docs)

## Angular

Component selector: `lu-icon`

## HTML/CSS

Classe CSS : `.lucca-icon`

Si vous avez besoin des ligatures, vous pouvez appeler les icones en remplaçant le camelCase par des "_" ex. `<span aria-hidden="true" class="lucca-icon">chevron_south</span>`.

Si votre icône transmet un sens fort, pensez à accompagner l'icône d'un span masqué `<span class="u-mask">information</span>`.

### Angular

```css
@forward '@lucca-front/scss/src/components/icon';
```

### Basic

```css
@forward '@lucca-front/scss/src/components/icon';
```

```html
<span aria-hidden="true" class="lucca-icon icon-heart"></span>
```

### Colors

```css
@forward '@lucca-front/scss/src/components/icon';
```

```html
<span aria-hidden="true" class="lucca-icon icon-heart"></span>
<span aria-hidden="true" class="lucca-icon icon-heart pr-u-colorTextSubtle"></span>
<span aria-hidden="true" class="lucca-icon icon-heart pr-u-colorInputTextPlaceholder"></span>
<span aria-hidden="true" class="lucca-icon icon-heart pr-u-colorTextProduct"></span>
<span aria-hidden="true" class="lucca-icon icon-heart pr-u-colorTextError"></span>
<span aria-hidden="true" class="lucca-icon icon-heart pr-u-colorTextWarning"></span>
<span aria-hidden="true" class="lucca-icon icon-heart pr-u-colorTextSuccess"></span>
<!-- 20.3 -->
<span aria-hidden="true" class="lucca-icon icon-heart mod-AI"></span>
```

### Ia

```css
@forward '@lucca-front/scss/src/components/icon';
```

```html
<span aria-hidden="true" class="lucca-icon icon-heart mod-AI"></span>
```

### Sizes

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
