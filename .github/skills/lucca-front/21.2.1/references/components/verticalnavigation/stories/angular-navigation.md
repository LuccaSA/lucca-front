# verticalnavigation — Navigation _(Angular)_

```js
import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
```

```html
<lu-vertical-navigation heading="Section">
	<lu-vertical-navigation-group label="Group 1" icon="heart">
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 1</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#" aria-current="page">Item 2</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 3</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
	<lu-vertical-navigation-item>
		<a luVerticalNavigationLink href="#" icon="heartFilled">Item 4</a>
	</lu-vertical-navigation-item>
</lu-vertical-navigation>
```
