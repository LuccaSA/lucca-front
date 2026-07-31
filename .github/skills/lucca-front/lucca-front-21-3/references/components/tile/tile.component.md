# tile — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-users-tile-angular-basic--docs)

## Angular

Component selector : `lu-user-tile`

### Tile

```js
import { finn, jake, marceline } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuUser, LuUserTileComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
import { LuUserPopoverStore } from '@lucca-front/ng/user-popover/service/user-popover.store';
import { of } from 'rxjs';
```

```html
<lu-user-tile [user]="user" />
```

## HTML/CSS

Classe CSS : `.userTile`

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
