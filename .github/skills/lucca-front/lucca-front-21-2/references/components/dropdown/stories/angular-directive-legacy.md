# dropdown — Directive legacy _(Angular)_

```js
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuDropdownModule, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
```

```html
<button type="button" luButton [luDropdown]="dropdown">Dropdown</button>

<lu-dropdown #dropdown>
	<li class="dropdown-list-option">
		<span class="dropdown-list-option-action is-disabled" luDropdownItem>
			<lu-icon icon="eye" />
			Prévisualiser
		</span>
	</li>
	<li class="dropdown-list-option">
		<a routerLink="." fragment="link2" class="dropdown-list-option-action" luDropdownItem>
			<lu-icon icon="officePen" />
			Éditer
		</a>
	</li>
	<li class="dropdown-list-option">
		<button type="button" class="dropdown-list-option-action mod-critical" luDropdownItem>
			<lu-icon icon="trashDelete" />
			Supprimer
		</button>
	</li>
</lu-dropdown>
```
