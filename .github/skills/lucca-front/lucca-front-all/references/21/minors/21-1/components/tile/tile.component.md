# tile — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-users-tile-angular-format--docs)

## Angular

Component selector : `lu-user-tile`

### Tile format

```js
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuUserDisplayModule, LuUserPictureModule, LuUserTileComponent, LuUserTileModule } from '@lucca-front/ng/user';
import { bob, patrick, squidwards } from '../../user.mocks';
```

### Tile

```js
import { bob } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuUserTileComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

```html
<div class="pr-u-displayFlex pr-u-gap300">
	<button [luUserPopover]="bob" type="button" class="userPopover_trigger">
		<lu-user-tile [user]="bob" />
	</button>
	<lu-user-tile [user]="bob" displayFormat="LF" role="Administrateur" />
	<lu-user-tile [user]="bob" size="L" />
</div>
```

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/user';
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/userTile';
```

```html
<div class="userTile">
	<div class="avatar">
		<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
	</div>
	<dl class="userTile-content">
		<dt class="userTile-content-name" translate="no">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>
```

### Sizes

```css
@forward '@lucca-front/scss/src/components/user';
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/userTile';
```

```html
<div class="userTile mod-XS">
	<div class="avatar">
		<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
	</div>
	<dl class="userTile-content">
		<dt class="userTile-content-name" translate="no">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>
<div class="userTile mod-S">
	<div class="avatar">
		<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
	</div>
	<dl class="userTile-content">
		<dt class="userTile-content-name" translate="no">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>
<div class="userTile">
	<div class="avatar">
		<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
	</div>
	<dl class="userTile-content">
		<dt class="userTile-content-name" translate="no">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>
<div class="userTile mod-L">
	<div class="avatar">
		<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
	</div>
	<dl class="userTile-content">
		<dt class="userTile-content-name" translate="no">Mertens Finn</dt>
		<dd class="userTile-content-info">Hero</dd>
	</dl>
</div>
```
