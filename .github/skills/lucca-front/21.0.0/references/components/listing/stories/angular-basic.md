# listing — Basic _(Angular)_

```js
import { IconsList } from '@/stories/icons-list';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
```

```html
<lu-listing>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item>
		item
		<lu-listing>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
			<lu-listing-item>item</lu-listing-item>
		</lu-listing>
	</lu-listing-item>
</lu-listing>
```
