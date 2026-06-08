# verticalnavigation — Navigation disabled _(Angular)_

```js
import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
```

```html
<lu-vertical-navigation heading="Section">
	<lu-vertical-navigation-item>
		<span luVerticalNavigationLink icon="heart" disabled>Item</span>
	</lu-vertical-navigation-item>
	<lu-vertical-navigation-group label="Group" icon="star">
		<lu-vertical-navigation-item>
			<span luVerticalNavigationLink icon="heart" disabled>Item</span>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<span luVerticalNavigationLink icon="heart" disabled>Item</span>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
	<lu-vertical-navigation-group label="Group" expanded="false" icon="heartFilled" disabled>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 4</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 5</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
</lu-vertical-navigation>
```
