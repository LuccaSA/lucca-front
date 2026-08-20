# loading — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-loaders-loading-angular-basic--docs)

## Angular

Component selector : `lu-loading`

### Basic

```js
import { LoadingComponent } from '@lucca-front/ng/loading';
```

## HTML/CSS

Classe CSS : `.loading`

La classe `mod-fullPage` permettent de centrer un loading dans une page entière.

Les classes `mod-popin` et `mod-drawer` permettent de centrer un loading dans une fenêtre de dialogue en version classique ou drawer.

### Basic

```css
@forward '@lucca-front/scss/src/components/loading';
```

```html
<div class="loading mod-hiddenLabel">
	<span class="loading-label">Chargement…</span>
</div>
```
