# numericbadge — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-texts-numericbadge-angular-basic--docs)

## Angular

Mots-clés : badge, numérique, compteur, count

Component selector : `lu-numeric-badge`

### Badge

```js
import { NUMERIC_BADGE_SIZE, NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PALETTE } from '@lucca/prisme/core';
```

```html
<lu-numeric-badge maxValue="999" [value]="7" />
```

## HTML/CSS

Classe CSS : `.numericBadge`

### Badge basic

```css
@forward '@lucca-front/scss/src/components/numeric-badge';
```

```html
<span class="numericBadge">7</span>
```

### Badge loading

```css
@forward '@lucca-front/scss/src/components/numeric-badge';
```

```html
<span class="numericBadge is-loading" aria-hidden="true">7</span>
```

### Badge palette

```css
@forward '@lucca-front/scss/src/components/numeric-badge';
```

```html
<span class="numericBadge palette-product">7</span>
```

### Badge size

```css
@forward '@lucca-front/scss/src/components/numeric-badge';
```

```html
<span class="numericBadge">7</span>
<span class="numericBadge mod-S">7</span>
<span class="numericBadge mod-XS">7</span>
```
