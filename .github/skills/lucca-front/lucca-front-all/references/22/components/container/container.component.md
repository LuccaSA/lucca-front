# container — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-container-angular-basic--docs)

## Angular

Mots-clés : conteneur, wrapper

Component selector : `lu-container`

### Basic

```js
import { HiddenArgType } from '@/helpers/common-arg-types';
import { cleanupTemplate, generateInputs, setStoryOptions } from '@/helpers/stories';
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
