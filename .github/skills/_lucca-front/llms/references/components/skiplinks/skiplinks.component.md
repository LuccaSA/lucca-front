# skiplinks — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-navigation-skiplinks-angular-basic--docs)

## Angular

### Links basic

```js
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuSkipLinksComponent, luSkipLinksTranslations, SkipLinkDirective } from '@lucca-front/ng/a11y';
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { LuSkipLinksComponent, SkipLinkDirective } from '@lucca-front/ng/a11y';
```

```html
<lu-skip-links />
<lu-app-layout>
	<ng-container appLayoutBanner>
		<div id="lucca-banner-solutions-container" tabindex="-1">
			<a href="#">banner</a>
		</div>
	</ng-container>
	<ng-container appLayoutNavSide>
		<div id="navSide" tabindex="-1">
			<a href="#">navside</a>
			<a href="#">navside</a>
			<a href="#">navside</a>
			<a href="#">navside</a>
			<a href="#">navside</a>
		</div>
	</ng-container>
	<lu-main-layout>
		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent"><a href="#">content</a></div>
			</lu-container>
		</lu-main-layout-block>
		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent"><a href="#">content</a></div>
			</lu-container>
		</lu-main-layout-block>
		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent"><a href="#">content</a></div>
			</lu-container>
		</lu-main-layout-block>
		<lu-main-layout-block>
			<lu-container>
				<div luSkipLinkTarget luSkipLinkLabel="Go to custom skip link target" class="fakeContent">
					<a href="#">custom skip link target</a>
				</div>
			</lu-container>
		</lu-main-layout-block>
		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent"><a href="#">content</a></div>
			</lu-container>
		</lu-main-layout-block>
	</lu-main-layout>
</lu-app-layout>
```
