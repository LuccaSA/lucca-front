# main-layout — InAppLayout _(Angular)_

```js
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
```

```html
<lu-app-layout>
	<ng-container appLayoutBanner>banner</ng-container>
	<ng-container appLayoutNavSide>navSide</ng-container>
	<lu-main-layout footerSticky>
		<ng-container mainLayoutHeader>
			<div class="fakeContent">
				header
				<!-- <lu-page-header container /> -->
			</div>
		</ng-container>

		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent">content</div>
			</lu-container>
		</lu-main-layout-block>

		<ng-container mainLayoutFooter>
			<lu-container>
				<div class="fakeContent">footer</div>
			</lu-container>
		</ng-container>
	</lu-main-layout>
</lu-app-layout>
```
