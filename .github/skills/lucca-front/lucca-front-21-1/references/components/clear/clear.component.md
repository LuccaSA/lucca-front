# clear — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-texts-clear-angular-basic--docs)

## Angular

Component selector : `lu-clear`

### Clear

```js
import { ClearComponent } from '@lucca-front/ng/clear';
```

```html
<lu-clear>Clear</lu-clear>
```

## HTML/CSS

Le clear est construit avec un faux lien car il se retrouve parfois imbriqué dans un label et activé par erreur quand on l’actionne.

Son ancre ne doit pas être activée et on assure ainsi la navigation clavier.

### Clear

```css
@forward '@lucca-front/scss/src/components/clear';
```

```html
<button class="clear">
	<span class="pr-u-mask">Clear</span>
</button>
```
