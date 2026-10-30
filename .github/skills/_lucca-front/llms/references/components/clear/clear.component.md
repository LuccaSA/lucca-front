# clear — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-texts-clear-angular-basic--docs)

## Angular

### Clear

```js
import { CLEAR_SIZE, ClearComponent, luClearTranslations } from '@lucca-front/ng/clear';
import { PALETTE } from '@lucca/prisme/core';
```

```html
<lu-clear (onClear)="onClear($event)"><span #content>Clear</span></lu-clear>
```


## HTML/CSS

### Clear

```css
@forward '@lucca-front/scss/src/components/clear';
```

```html
<button class="clear">
	<span class="pr-u-mask">Clear</span>
</button>
```
