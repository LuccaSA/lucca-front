# container — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-structure-container-angular-basic--docs)

## Angular

Mots-clés : conteneur, wrapper

Component selector : `lu-container`

### Basic

```js
import { CONTAINER_SIZE, ContainerComponent } from '@lucca-front/ng/container';
```

## HTML/CSS

Classe CSS : `.container`

### Basic

```css
@forward '@lucca-front/scss/src/components/container';
```

```html
<div class="container">Ce container est responsive et sert à placer le contenu de votre page.</div>
```
