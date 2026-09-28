# software-icon — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-structure-software-icon-angular-basic--docs)

## Angular

Component selector : `lu-software-icon`

### Basic

```js
import { SoftwareIconComponent, SoftwareIconList } from '@lucca-front/ng/software-icon';
```

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/software-icon';
```

```html
<div
	class="softwareIcon"
	aria-hidden="true"
	[innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/software-icon/absences.svg' | luSafeExternalSvg"
></div>
```
