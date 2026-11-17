# embedded — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-integration-embedded--docs)

## Angular

### Embedded

```js
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DialogComponent, DialogContentComponent, DialogDismissDirective, DialogFooterComponent, DialogHeaderComponent, LuDialogService, provideLuDialog } from '@lucca-front/ng/dialog';
import { provideLuEmbedded } from '@lucca-front/ng/embedded';
import { IconComponent } from '@lucca-front/ng/icon';
import documentStylesheet from './embedded-document.scss?url';
```

```html
<lu-dialog>
	<lu-dialog-header>Dialog of the embedded application</lu-dialog-header>
	<lu-dialog-content>Its overlay and its styles live in the shadow root of the application.</lu-dialog-content>
	<lu-dialog-footer>
		<div class="footer-actions">
			<button type="button" luButton luDialogDismiss>Close</button>
		</div>
	</lu-dialog-footer>
</lu-dialog>
```

```html
<p>
	Embedded application, built with the
	<code>cleemy</code>
	product palette
</p>
<button type="button" luButton (click)="openDialog()">
	<lu-icon icon="heart" />
	Open a dialog
</button>
```

```html
<p>Host page, with its own Lucca Front styles</p>
<button type="button" luButton>Button of the page</button>
<sb-embedded-app class="pr-u-displayBlock pr-u-marginBlockStart200" />
```
