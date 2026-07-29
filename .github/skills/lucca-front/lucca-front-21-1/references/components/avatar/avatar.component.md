# avatar — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-users-avatar-angular-basic--docs)

## Angular

Component selector : `lu-user-picture`

### Basic

```js
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDisplayInitials, LuUserPictureComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
import { bob, georges, squidwards } from '../../user.mocks';
```

```html
<button class="userPopover_trigger" type="button" [luUserPopover]="user">
	<lu-user-picture
		[user]="user"
		[displayFormat]="displayFormat"
		data-testid="lu-user-picture"
		[class.mod-placeholder]="placeholder"
	/>
</button>
```

### Group

### Non cliquable

### Cliquable

```js
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { squidwards } from '../../user.mocks';
```

```html
<ul class="avatarWrapper" [class]="sizes()">
	<li class="avatarWrapper-item" translate="no">
		<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
		<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
		<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
		<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
		<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
		<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
	</li>
</ul>

<ul class="avatarWrapper" [class]="sizes()">
	<li class="avatarWrapper-item" translate="no">
		<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
		<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
		<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
		<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
		<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
	</li>
	<li class="avatarWrapper-item" role="presentation">
		<button type="button" class="avatarWrapper-item-action">
			<span class="avatarWrapper-item-action-more">
				<span aria-hidden="true" data-content-before="+6"></span>
				<span class="pr-u-mask">Voir les 6 utilisateurs supplémentaires</span>
			</span>
		</button>
	</li>
</ul>

<ul class="avatarWrapper" [class]="sizes()">
	<li class="avatarWrapper-item" translate="no">
		<a href="#" class="avatarWrapper-item-action">
			<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
			<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
		</a>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<a href="#" class="avatarWrapper-item-action">
			<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
			<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
		</a>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<a href="#" class="avatarWrapper-item-action">
			<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
			<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
		</a>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<a href="#" class="avatarWrapper-item-action">
			<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
			<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
		</a>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<a href="#" class="avatarWrapper-item-action">
			<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
			<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
		</a>
	</li>
</ul>

<ul class="avatarWrapper" [class]="sizes()">
	<li class="avatarWrapper-item" translate="no">
		<a href="#" class="avatarWrapper-item-action">
			<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
			<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
		</a>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<a href="#" class="avatarWrapper-item-action">
			<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
			<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
		</a>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<a href="#" class="avatarWrapper-item-action">
			<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
			<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
		</a>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<a href="#" class="avatarWrapper-item-action">
			<lu-user-picture aria-hidden="true" class="avatar" [user]="user" />
			<span class="pr-u-mask">{{ user.firstName }} {{ user.lastName }}</span>
		</a>
	</li>
	<li class="avatarWrapper-item" role="presentation">
		<button type="button" class="avatarWrapper-item-action">
			<span class="avatarWrapper-item-action-more">
				<span aria-hidden="true" data-content-before="+6"></span>
				<span class="pr-u-mask">Voir les 6 utilisateurs supplémentaires</span>
			</span>
		</button>
	</li>
</ul>
```

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/user';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<div class="avatar">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</div>
```

### Display

```css
@forward '@lucca-front/scss/src/components/user';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<span class="avatar">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar" translate="no">
	<span class="avatar-picture" style="background-color: rgb(202, 92, 214)">
		<span class="avatar-picture-initials">FM</span>
	</span>
</span>
<span class="avatar mod-placeholder" translate="no">
	<span class="avatar-picture"></span>
</span>
<span class="avatar mod-AI" translate="no">
	<span class="avatar-picture"></span>
</span>
```

### Basic

```css
@forward '@lucca-front/scss/src/components/user';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<ul class="avatarWrapper">
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
</ul>
```

### Clickable

```css
@forward '@lucca-front/scss/src/components/user';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<ul class="avatarWrapper">
	<li class="avatarWrapper-item" translate="no">
		<a href="#" class="avatarWrapper-item-action">
			<span class="avatar">
				<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
			</span>
			<span class="pr-u-mask">Finn Mertens</span>
		</a>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<a href="#" class="avatarWrapper-item-action">
			<span class="avatar">
				<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
			</span>
			<span class="pr-u-mask">Finn Mertens</span>
		</a>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<a href="#" class="avatarWrapper-item-action">
			<span class="avatar">
				<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
			</span>
			<span class="pr-u-mask">Finn Mertens</span>
		</a>
	</li>
</ul>
```

### More

```css
@forward '@lucca-front/scss/src/components/user';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<ul class="avatarWrapper">
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li class="avatarWrapper-item" translate="no">
		<span class="avatar">
			<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
		</span>
		<span class="pr-u-mask">Finn Mertens</span>
	</li>
	<li role="presentation" class="avatarWrapper-item">
		<button type="button" class="avatarWrapper-item-action">
			<span class="avatarWrapper-item-action-more">
				<span aria-hidden="true" data-content-before="+8"></span>
				<span class="pr-u-mask">Voir les 8 utilisateurs supplémentaires</span>
			</span>
		</button>
	</li>
</ul>
```

### Sizes

```css
@forward '@lucca-front/scss/src/components/user';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<span class="avatar mod-XS">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar mod-S">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar mod-M">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar mod-L">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar mod-XL">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar mod-XXL">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
<span class="avatar mod-XXXL">
	<img alt="" class="avatar-picture" loading="lazy" src="https://cdn.lucca.fr/lucca-front/avatars/finn.png" />
</span>
```
