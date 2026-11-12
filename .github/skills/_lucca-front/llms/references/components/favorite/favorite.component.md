# favorite — Code & Implementation

**Sommaire**

- Angular
  - Basic
- HTML/CSS
  - Basic
  - Disabled
  - Favorite
  - Size

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-actions-favorite-angular-basic--docs)

## Angular

### Basic

```js
import { FAVORITE_BUTTON_SIZE, FavoriteComponent, luFavoriteTranslations } from '@lucca-front/ng/favorite';
```

```html
<lu-favorite (favoriteChange)="onFavoriteChange($event)" />
```

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/favorite';
@forward '@lucca-front/scss/src/components/button';
```

```html
<span class="favorite">
	<button
		type="button"
		class="favorite-button button"
		aria-pressed="false"
		luTooltip="Add to favorites"
		luTooltipOnlyForDisplay
	>
		<span aria-hidden="true" class="lucca-icon icon-star"></span>
		<span class="pr-u-mask">Favorite</span>
	</button>
</span>
```

### Disabled

```css
@forward '@lucca-front/scss/src/components/favorite';
@forward '@lucca-front/scss/src/components/button';
```

```html
<span class="favorite">
	<button
		type="button"
		class="favorite-button button"
		aria-pressed="false"
		aria-disabled="true"
		luTooltip="Add to favorites"
		luTooltipOnlyForDisplay
	>
		<span aria-hidden="true" class="lucca-icon icon-star"></span>
		<span class="pr-u-mask">Favorite</span>
	</button>
</span>
<span class="favorite">
	<button
		type="button"
		class="favorite-button button"
		aria-pressed="true"
		aria-disabled="true"
		luTooltip="Remove from favorites"
		luTooltipOnlyForDisplay
	>
		<span aria-hidden="true" class="lucca-icon icon-starFilled"></span>
		<span class="pr-u-mask">Favorite</span>
	</button>
</span>
```

### Favorite

```css
@forward '@lucca-front/scss/src/components/favorite';
@forward '@lucca-front/scss/src/components/button';
```

```html
<span class="favorite">
	<button
		type="button"
		class="favorite-button button"
		aria-pressed="true"
		luTooltip="Remove from favorites"
		luTooltipOnlyForDisplay
	>
		<span aria-hidden="true" class="lucca-icon icon-starFilled"></span>
		<span class="pr-u-mask">Favorite</span>
	</button>
</span>
```

### Size

```css
@forward '@lucca-front/scss/src/components/favorite';
@forward '@lucca-front/scss/src/components/button';
```

```html
<span class="favorite mod-S">
	<button
		type="button"
		class="favorite-button button"
		aria-pressed="false"
		luTooltip="Add to favorites"
		luTooltipOnlyForDisplay
	>
		<span aria-hidden="true" class="lucca-icon icon-star"></span>
		<span class="pr-u-mask">Favorite</span>
	</button>
</span>
<span class="favorite mod-XS">
	<button
		type="button"
		class="favorite-button button"
		aria-pressed="false"
		luTooltip="Add to favorites"
		luTooltipOnlyForDisplay
	>
		<span aria-hidden="true" class="lucca-icon icon-star"></span>
		<span class="pr-u-mask">Favorite</span>
	</button>
</span>
```
