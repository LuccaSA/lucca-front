# footer — Basic _(Angular)_

```js
import { ButtonComponent } from '@lucca-front/ng/button';
import { FOOTER_CONTAINER_MAX, FOOTER_NARROW_AT_MEDIA_MAX, FooterComponent } from '@lucca-front/ng/footer';
```

```html
<lu-footer narrowAtMediaMax="XXS">
	<ng-container footerContent>Content</ng-container>
	<button type="button" luButton>Button</button>
	<button type="button" luButton="outlined">Button</button>
</lu-footer>
```
