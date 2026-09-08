# progress-bar — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-loaders-progress-bar-angular-basic--docs)

## Angular

Component selector : `lu-progress-bar`

### Bar

```js
import { PROGRESS_BAR_STATE, ProgressBarComponent } from '@lucca-front/ng/progress-bar';
import { cleanupTemplate, setStoryOptions } from '@/helpers/stories';
```


## HTML/CSS

Classe CSS : `.progress`

### Bar

```css
@forward '@lucca-front/scss/src/components/progress-bar';
@forward '@lucca-front/scss/src/components/progress';
```

```html
<div class="progress">
	<div class="progress-bar" [attr.style]="'inline-size:' + width + '%'"></div>
</div>
```
