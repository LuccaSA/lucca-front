# skiplinks — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-navigation-skiplinks-basic--docs)

## HTML/CSS

### Links basic

```css
@forward '@lucca-front/scss/src/components/a11y';
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
