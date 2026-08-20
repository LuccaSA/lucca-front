# progress-bar — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-loaders-progress-bar-angular-basic--docs)

## Angular

Component selector : `lu-progress-bar`

### Bar

```js
import { ProgressBarComponent } from '@lucca-front/ng/progress-bar';
```

## HTML/CSS

### Bar

```css
@forward '@lucca-front/scss/src/components/progress-bar';
@forward '@lucca-front/scss/src/components/progress';
```

```html
<div class="progress">
	<div class="progress-bar" [attr.style]="'width:' + width + '%'"></div>
</div>
```
