# dropdown — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-overlays-dropdown-angular-basic--docs)

## Angular

### Basic

```js
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDropdownModule } from '@lucca-front/ng/dropdown';
```

### Component

```js
import { Component as AngularComponent } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDropdownModule } from '@lucca-front/ng/dropdown';
```

### Directive legacy

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

### Directive

```js
import { ButtonComponent } from '@lucca-front/ng/button';
import { DropdownActionComponent, DropdownDividerComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverPosition } from '@lucca-front/ng/popover2';
```

```html
<div class="demo">
	<button type="button" luButton disclosure [luDropdown]="dropdownSample">
		Dropdown
		<lu-icon icon="arrowChevronBottom" />
	</button>
	<ng-template #dropdownSample>
		<lu-dropdown-menu>
			<lu-dropdown-item>
				<button lu-dropdown-action type="button">
					<lu-icon icon="heart" />
					Lorem
				</button>
			</lu-dropdown-item>
			<lu-dropdown-item>
				<button lu-dropdown-action disabled type="button">
					<lu-icon icon="cross" />
					Lorem
				</button>
			</lu-dropdown-item>
			<lu-dropdown-divider />
			<lu-dropdown-item>
				<button lu-dropdown-action type="button">
					<lu-icon icon="star" />
					Ipsum
				</button>
			</lu-dropdown-item>
			<lu-dropdown-group label="Group">
				<lu-dropdown-item>
					<button lu-dropdown-action type="button">
						<lu-icon icon="buildingHouse" />
						Dolor
					</button>
				</lu-dropdown-item>
				<lu-dropdown-item>
					<a lu-dropdown-action critical href="#">
						<lu-icon icon="trashDelete" />
						Sit amet
					</a>
				</lu-dropdown-item>
				<lu-dropdown-item>
					<span lu-dropdown-action disabled class="dropdown-list-option-action">
						<lu-icon icon="cross" />
						Sit amet
					</span>
				</lu-dropdown-item>
			</lu-dropdown-group>
		</lu-dropdown-menu>
	</ng-template>
</div>
```

## HTML/CSS

### Basic

```css
@forward '@lucca-front/scss/src/components/dropdown';
@forward '@lucca-front/scss/src/components/divider';
```

```html
<div class="dropdown">
	<ul class="dropdown-list">
		<li class="dropdown-list-option">
			<button type="button" class="dropdown-list-option-action">
				<span class="lucca-icon icon-eye" aria-hidden="true"></span>
				Prévisualiser
			</button>
		</li>
		<li class="dropdown-list-option" aria-hidden="true">
			<div class="divider dropdown-list-option-divider"></div>
		</li>
		<li class="dropdown-list-option">
			<button type="button" class="dropdown-list-option-action">
				<span class="lucca-icon icon-officePen" aria-hidden="true"></span>
				Modifier
			</button>
		</li>
		<li class="dropdown-list-option">
			<button type="button" class="dropdown-list-option-action">
				<span class="lucca-icon icon-fileCopy" aria-hidden="true"></span>
				Copier
			</button>
		</li>
		<li class="dropdown-list-option" aria-hidden="true">
			<div class="divider dropdown-list-option-divider"></div>
		</li>
		<li class="dropdown-list-option">
			Groupe
			<ul class="dropdown-list">
				<li class="dropdown-list-option">
					<button type="button" class="dropdown-list-option-action" disabled="disabled">
						<span class="lucca-icon icon-boxArchive" aria-hidden="true"></span>
						Archiver
					</button>
				</li>
				<li class="dropdown-list-option">
					<button type="button" class="dropdown-list-option-action mod-critical">
						<span class="lucca-icon icon-trashDelete" aria-hidden="true"></span>
						Supprimer
					</button>
				</li>
			</ul>
		</li>
	</ul>
</div>
```

### WithoutIcons

```css
@forward '@lucca-front/scss/src/components/dropdown';
@forward '@lucca-front/scss/src/components/divider';
```

```html
<div class="dropdown">
	<ul class="dropdown-list">
		<li class="dropdown-list-option">
			<button type="button" class="dropdown-list-option-action">Prévisualiser</button>
		</li>
		<li class="dropdown-list-option" aria-hidden="true">
			<div class="divider dropdown-list-option-divider"></div>
		</li>
		<li class="dropdown-list-option">
			<button type="button" class="dropdown-list-option-action">Modifier</button>
		</li>
		<li class="dropdown-list-option">
			<button type="button" class="dropdown-list-option-action">Copier</button>
		</li>
		<li class="dropdown-list-option" aria-hidden="true">
			<div class="divider dropdown-list-option-divider"></div>
		</li>
		<li class="dropdown-list-option">
			Groupe
			<ul class="dropdown-list">
				<li class="dropdown-list-option">
					<button type="button" class="dropdown-list-option-action" disabled="disabled">Archiver</button>
				</li>
				<li class="dropdown-list-option">
					<button type="button" class="dropdown-list-option-action mod-critical">Supprimer</button>
				</li>
			</ul>
		</li>
	</ul>
</div>
```
