# tags — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-texts-tags-angular-basic--docs)

## Angular

Component selector : `lu-tag`

### Tag

```js
import { TAG_SIZE, TagComponent } from '@lucca-front/ng/tag';
```

```html
<lu-tag label="Text" />
```

## HTML/CSS

Classe CSS : `.tag`

### Basic

```css
@forward '@lucca-front/scss/src/components/tag';
```

```html
<span class="tag">Text</span>
```

### Clickable

```css
@forward '@lucca-front/scss/src/components/tag';
```

```html
<a href="#" class="tag">Text</a>
```

### Ia

```css
@forward '@lucca-front/scss/src/components/tag';
```

```html
<span class="tag mod-AI">Text</span>
```

### Icon

```css
@forward '@lucca-front/scss/src/components/tag';
```

```html
<span class="tag">
	<span class="lucca-icon icon-heart" aria-hidden="true"></span>
	<span class="tag-content">Text</span>
</span>
```

### Outlined

```css
@forward '@lucca-front/scss/src/components/tag';
```

```html
<span class="tag mod-outlined">Text</span>
```

### Palettes

```css
@forward '@lucca-front/scss/src/components/tag';
```

```html
<span class="tag palette-product">Text</span>
<span class="tag palette-success">Text</span>
<span class="tag palette-warning">Text</span>
<span class="tag palette-error">Text</span>
<span class="tag palette-kiwi">Text</span>
<span class="tag palette-lime">Text</span>
<span class="tag palette-cucumber">Text</span>
<span class="tag palette-mint">Text</span>
<span class="tag palette-glacier">Text</span>
<span class="tag palette-lagoon">Text</span>
<span class="tag palette-blueberry">Text</span>
<span class="tag palette-lavender">Text</span>
<span class="tag palette-grape">Text</span>
<span class="tag palette-watermelon">Text</span>
<span class="tag palette-pumpkin">Text</span>
<span class="tag palette-pineapple">Text</span>
```

### Sizes

```css
@forward '@lucca-front/scss/src/components/tag';
```

```html
<span class="tag mod-L">Text</span>
<span class="tag mod-M">Text</span>
<!-- 20.3 -->
<span class="tag mod-S">Text</span>
```
