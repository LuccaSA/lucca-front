# readmore — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-texts-readmore-angular-ai--docs)

## Angular

Component selector : `lu-read-more`

### More ai

```js
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
import { TagComponent } from '@lucca-front/ng/tag';
```

```html
<div class="box">
	<h3 class="mod-elementAfterText pr-u-marginBlockEnd150">
		Ce qu’il faut retenir
		<lu-tag AI label="Généré par IA" icon="weatherStars" />
	</h3>
	<lu-read-more textFlow lineClamp="2">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt ullamcorper blandit. Vestibulum neque
			nisi, gravida ac dictum in, finibus at lorem. Mauris fringilla viverra ornare. Proin bibendum, tortor sed
			fringilla ullamcorper, nulla purus mollis tellus, at facilisis sapien sem id orci. Fusce ac nibh convallis,
			fermentum orci in, lobortis arcu.
		</p>
		<p>
			Praesent id purus ac eros maximus ultricies. Nam vulputate, nisl vel porta mattis, elit eros ornare leo, ut
			faucibus leo ligula malesuada nulla. Ut imperdiet, mi sit amet ultrices vehicula, massa ligula mattis dolor, a
			vehicula libero ligula eget orci. Maecenas mi diam, facilisis id leo dictum, malesuada finibus mi. Quisque tempus
			at est eget euismod. Integer eget mattis magna, commodo vulputate erat.
		</p>
	</lu-read-more>
</div>
```

### More

```js
import { READ_MORE_SURFACE, ReadMoreComponent } from '@lucca-front/ng/read-more';
```

```html
<lu-read-more${…}${…} />
```

```html
<lu-read-more${…}${…}>
	${…}
</lu-read-more>
```
