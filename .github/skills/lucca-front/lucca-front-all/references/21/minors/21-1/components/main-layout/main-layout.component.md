# main-layout — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-structure-main-layout-angular-basic--docs)

## Angular

### Basic

```js
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
```

```html
<lu-main-layout footerSticky>
	<ng-container mainLayoutHeader>
		<lu-container>
			<div class="fakeContent">header</div>
		</lu-container>
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
```

### InAppLayout

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
			<div class="fakeContent">
				footer
				<!-- <lu-footer container /> -->
			</div>
		</ng-container>
	</lu-main-layout>
</lu-app-layout>
```

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/main-layout';
@forward '@lucca-front/scss/src/components/container';
```

```html
<main role="main" class="mainLayout">
	<div class="mainLayout-content">
		<div class="mainLayout-content-inside">
			<div class="mainLayout-content-inside-header">
				<div class="container">
					<div class="fakeContent">header</div>
				</div>
			</div>
			<div class="mainLayout-content-inside-block">
				<div class="container">
					<div class="fakeContent">content</div>
				</div>
			</div>
			<div class="mainLayout-content-inside-footer mod-sticky">
				<div class="container">
					<div class="fakeContent">footer</div>
				</div>
			</div>
		</div>
	</div>
</main>
```

### InAppLayout

```css
@forward '@lucca-front/scss/src/components/main-layout';
@forward '@lucca-front/scss/src/components/appLayout';
@forward '@lucca-front/scss/src/components/container';
```

```html
<div class="appLayout">
	<div class="appLayout-banner">banner</div>
	<div class="appLayout-navSide">navSide</div>
	<div class="appLayout-main">
		<main role="main" class="mainLayout">
			<div class="mainLayout-content">
				<div class="mainLayout-content-inside">
					<div class="mainLayout-content-inside-header">
						<div class="fakeContent">
							header
							<!-- .pageHeader container -->
						</div>
					</div>
					<div class="mainLayout-content-inside-block">
						<div class="container">
							<div class="fakeContent">content</div>
						</div>
					</div>
					<div class="mainLayout-content-inside-footer mod-sticky">
						<div class="fakeContent">
							header
							<!-- .footer container -->
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</div>
```
