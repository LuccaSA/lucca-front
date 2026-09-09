# approbation-inbox — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-approbation-inbox-angular-detail--docs)

## Angular

### Detail

```js
import { ApprobationInboxDetailComponent, ApprobationInboxDetailMainBlockComponent, ApprobationInboxHeaderComponent } from '@lucca-front/ng/approbation-inbox';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { ButtonComponent } from '@lucca/prisme/button';
import { IconComponent } from '@lucca/prisme/icon';
```

```html
<lu-approbation-inbox-detail>
	<lu-approbation-inbox-detail-header approbationInboxDetailHeader label="Title">
		<ng-container approbationInboxDetailActions>
			<button luButton type="button">Approve</button>
			<button luButton type="button">Reject</button>
		</ng-container>
	</lu-approbation-inbox-detail-header>
	<lu-approbation-inbox-detail-main-block label="Approval Process">
		Dolor sit amet
	</lu-approbation-inbox-detail-main-block>
</lu-approbation-inbox-detail>
```

### List

```js
import { FormsModule } from '@angular/forms';
import {
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { ButtonComponent } from '@lucca/prisme/button';
import { IconComponent } from '@lucca/prisme/icon';
```

```html
<lu-approbation-inbox-list>
	<lu-approbation-inbox-list-item>
		<a href="#" lu-approbation-inbox-list-action approbationInboxListItemTitle>Title</a>
		Metadata
	</lu-approbation-inbox-list-item>
</lu-approbation-inbox-list>
```

## HTML/CSS

### Detail basic

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/container';
```

```html
<section class="approbationInbox-detail">
	<div class="container approbationInbox-detail-container">
		<header class="approbationInbox-detail-header">Header</header>
		<div class="approbationInbox-detail-main">Main</div>
	</div>
</section>
```

### Block insideDialog

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/divider';
```

```html
<div class="approbationInbox-detail mod-insideDialog">
	<div class="approbationInbox-detail-main">
		<div class="approbationInbox-detail-main-block">
			<h2 class="approbationInbox-detail-main-block-title">Block title</h2>
			<div class="approbationInbox-detail-main-block-content">Content</div>
			<div class="divider approbationInbox-detail-main-block-divider"></div>
		</div>
		<div class="approbationInbox-detail-main-block">
			<h2 class="approbationInbox-detail-main-block-title">Block title</h2>
			<div class="approbationInbox-detail-main-block-content">Content</div>
			<div class="divider approbationInbox-detail-main-block-divider"></div>
		</div>
		<div class="approbationInbox-detail-main-block">
			<h2 class="approbationInbox-detail-main-block-title">Block title</h2>
			<div class="approbationInbox-detail-main-block-content">Content</div>
			<div class="divider approbationInbox-detail-main-block-divider"></div>
		</div>
	</div>
</div>
```

### Block

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/divider';
```

```html
<div class="approbationInbox-detail">
	<div class="approbationInbox-detail-main">
		<div class="approbationInbox-detail-main-block">
			<h2 class="approbationInbox-detail-main-block-title">Block title</h2>
			<div class="approbationInbox-detail-main-block-content">Content</div>
			<div class="divider approbationInbox-detail-main-block-divider"></div>
		</div>
		<div class="approbationInbox-detail-main-block">
			<h2 class="approbationInbox-detail-main-block-title">Block title</h2>
			<div class="approbationInbox-detail-main-block-content">Content</div>
			<div class="divider approbationInbox-detail-main-block-divider"></div>
		</div>
		<div class="approbationInbox-detail-main-block">
			<h2 class="approbationInbox-detail-main-block-title">Block title</h2>
			<div class="approbationInbox-detail-main-block-content">Content</div>
			<div class="divider approbationInbox-detail-main-block-divider"></div>
		</div>
	</div>
</div>
```

### Header all

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/listing';
@forward '@lucca-front/scss/src/components/tag';
```

```html
<div class="approbationInbox-detail">
	<header class="approbationInbox-detail-header">
		<div class="approbationInbox-detail-header-illustration">
			<div class="avatar mod-M">
				<div class="avatar-picture" style="background-color: rgb(214, 92, 92)">
					<span translate="no" class="avatar-picture-initials">VV</span>
				</div>
			</div>
		</div>
		<div class="approbationInbox-detail-header-main">
			<div class="approbationInbox-detail-header-main-infos">
				<h1 class="approbationInbox-detail-header-main-infos-title">
					<span class="approbationInbox-detail-header-main-infos-title-content">Title</span>
				</h1>
				<div class="approbationInbox-detail-header-main-infos-description">
					<ul class="listing mod-inline mod-divider">
						<li class="listing-item">
							<div class="listing-item-content">Lorem ipsum</div>
						</li>
						<li class="listing-item">
							<div class="listing-item-content">Dolor sit amet</div>
						</li>
					</ul>
				</div>
				<div class="approbationInbox-detail-header-main-delegation">
					<span class="tag mod-M palette-none">
						<span class="tag-content pr-u-ellipsis">Délégation</span>
					</span>
				</div>
			</div>
			<div class="approbationInbox-detail-header-main-actions">
				<button type="button" class="button">Approuver</button>
				<button type="button" class="button">Refuser</button>
				<button type="button" class="button mod-onlyIcon mod-iconOnLeft mod-iconOnRight" aria-expanded="false">
					<span aria-hidden="true" class="lucca-icon icon-menuDots"></span>
					<span class="pr-u-mask">Other options</span>
				</button>
			</div>
		</div>
	</header>
</div>
```

### Header delegation

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/tag';
```

```html
<div class="approbationInbox-detail">
	<header class="approbationInbox-detail-header">
		<div class="approbationInbox-detail-header-main">
			<div class="approbationInbox-detail-header-main-infos">
				<h1 class="approbationInbox-detail-header-main-infos-title">
					<span class="approbationInbox-detail-header-main-infos-title-content">Title</span>
				</h1>
				<div class="approbationInbox-detail-header-main-delegation">
					<span class="tag mod-M palette-none">
						<span class="tag-content pr-u-ellipsis">Délégation</span>
					</span>
				</div>
			</div>
			<div class="approbationInbox-detail-header-main-actions">
				<button type="button" class="button">Approuver</button>
				<button type="button" class="button">Refuser</button>
			</div>
		</div>
	</header>
</div>
```

### Header description

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/listing';
```

```html
<div class="approbationInbox-detail">
	<header class="approbationInbox-detail-header">
		<div class="approbationInbox-detail-header-main">
			<div class="approbationInbox-detail-header-main-infos">
				<h1 class="approbationInbox-detail-header-main-infos-title">
					<span class="approbationInbox-detail-header-main-infos-title-content">Title</span>
				</h1>
				<div class="approbationInbox-detail-header-main-infos-description">
					<ul class="listing mod-inline mod-divider">
						<li class="listing-item">
							<div class="listing-item-content">Lorem ipsum</div>
						</li>
						<li class="listing-item">
							<div class="listing-item-content">Dolor sit amet</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="approbationInbox-detail-header-main-actions">
				<button type="button" class="button">Approuver</button>
				<button type="button" class="button">Refuser</button>
			</div>
		</div>
	</header>
</div>
```

### Header illustration

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="approbationInbox-detail">
	<header class="approbationInbox-detail-header">
		<div class="approbationInbox-detail-header-illustration">
			<div class="avatar mod-M">
				<div class="avatar-picture" style="background-color: rgb(214, 92, 92)">
					<span translate="no" class="avatar-picture-initials">VV</span>
				</div>
			</div>
		</div>
		<div class="approbationInbox-detail-header-main">
			<div class="approbationInbox-detail-header-main-infos">
				<h1 class="approbationInbox-detail-header-main-infos-title">
					<span class="approbationInbox-detail-header-main-infos-title-content">Title</span>
				</h1>
			</div>
			<div class="approbationInbox-detail-header-main-actions">
				<button type="button" class="button">Approuver</button>
				<button type="button" class="button">Refuser</button>
			</div>
		</div>
	</header>
</div>
```

### Header insideDialog

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="approbationInbox-detail mod-insideDialog">
	<header class="approbationInbox-detail-header">
		<div class="approbationInbox-detail-header-main">
			<div class="approbationInbox-detail-header-main-infos">
				<h1 class="approbationInbox-detail-header-main-infos-title">
					<span class="approbationInbox-detail-header-main-infos-title-content">Title</span>
				</h1>
			</div>
			<div class="approbationInbox-detail-header-main-actions">
				<button type="button" class="button">Approuver</button>
				<button type="button" class="button">Refuser</button>
			</div>
		</div>
	</header>
</div>
```

### Header moreActions

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="approbationInbox-detail">
	<header class="approbationInbox-detail-header">
		<div class="approbationInbox-detail-header-main">
			<div class="approbationInbox-detail-header-main-infos">
				<h1 class="approbationInbox-detail-header-main-infos-title">
					<span class="approbationInbox-detail-header-main-infos-title-content">Title</span>
				</h1>
			</div>
			<div class="approbationInbox-detail-header-main-actions">
				<button type="button" class="button">Approuver</button>
				<button type="button" class="button">Refuser</button>
				<button type="button" class="button mod-onlyIcon mod-iconOnLeft mod-iconOnRight" aria-expanded="false">
					<span aria-hidden="true" class="lucca-icon icon-menuDots"></span>
					<span class="pr-u-mask">Other options</span>
				</button>
			</div>
		</div>
	</header>
</div>
```

### Header

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/button';
```

```html
<div class="approbationInbox-detail">
	<header class="approbationInbox-detail-header">
		<div class="approbationInbox-detail-header-main">
			<div class="approbationInbox-detail-header-main-infos">
				<h1 class="approbationInbox-detail-header-main-infos-title">
					<span class="approbationInbox-detail-header-main-infos-title-content">Title</span>
				</h1>
			</div>
			<div class="approbationInbox-detail-header-main-actions">
				<button type="button" class="button">Approuver</button>
				<button type="button" class="button">Refuser</button>
			</div>
		</div>
	</header>
</div>
```

### InsideDialog

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/container';
```

```html
<section class="approbationInbox-detail mod-insideDialog">
	<div class="container approbationInbox-detail-container">
		<header class="approbationInbox-detail-header">Header</header>
		<div class="approbationInbox-detail-main">Main</div>
	</div>
</section>
```

### List basic

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/numericBadge';
```

```html
<section class="approbationInbox-list">
	<header class="approbationInbox-list-header">
		<h1 class="approbationInbox-list-header-title">
			À approuver
			<span class="numericBadge">8</span>
		</h1>
	</header>
	<div class="approbationInbox-list-content">
		<ul class="approbationInbox-list-content-items">
			<li class="approbationInbox-list-content-items-item">
				<div class="approbationInbox-list-content-items-item-content">
					<div class="approbationInbox-list-content-items-item-content-info">Contenu</div>
				</div>
			</li>
		</ul>
	</div>
</section>
```

### Filterable

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/filterBar';
@forward '@lucca-front/scss/src/components/numericBadge';
@forward '@lucca-front/scss/src/components/scrollBox';
@forward '@lucca-front/scss/src/components/segmentedControl';
```

```html
<section class="approbationInbox-list">
	<header class="approbationInbox-list-header">
		<h1 class="approbationInbox-list-header-title">
			À approuver
			<span class="numericBadge">8</span>
		</h1>
		<div class="approbationInbox-list-header-filterBar">
			<div class="filterBar">
				<div class="scrollBox filterBar-scrollBox is-firstVisible is-lastVisible">
					<div class="filterBar-scrollBox-group">
						<div class="segmentedControl filterBar-segmentedControl">
							<div class="segmentedControl-item">
								<input
									type="radio"
									class="segmentedControl-item-input"
									name="segmentedControl"
									id="segmentedControl0"
									checked="checked"
								/>
								<label class="segmentedControl-item-action" for="segmentedControl0">Par vous</label>
							</div>
							<div class="segmentedControl-item">
								<input
									type="radio"
									class="segmentedControl-item-input"
									name="segmentedControl"
									id="segmentedControl1"
								/>
								<label class="segmentedControl-item-action" for="segmentedControl1">Par d’autres</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
	<div class="approbationInbox-list-content">
		<ul class="approbationInbox-list-content-items">
			<li class="approbationInbox-list-content-items-item">
				<div class="approbationInbox-list-content-items-item-content">
					<div class="approbationInbox-list-content-items-item-content-info">Contenu</div>
				</div>
			</li>
		</ul>
	</div>
</section>
```

### Group basic

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
```

```html
<div class="approbationInbox-list">
	<div class="approbationInbox-list-content">
		<div class="approbationInbox-list-content-groupOptional">
			<div class="approbationInbox-list-content-groupOptional-header">
				<button type="button" class="approbationInbox-list-content-groupOptional-header-action" aria-expanded="true">
					<span class="approbationInbox-list-content-groupOptional-header-action-icon">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom mod-XS"></span>
					</span>
					Group title
				</button>
			</div>
			<div class="approbationInbox-list-content-groupOptional-content">
				<div class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Content</div>
					</div>
				</div>
				<div class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Content</div>
					</div>
				</div>
			</div>
		</div>
		<div class="approbationInbox-list-content-groupOptional">
			<div class="approbationInbox-list-content-groupOptional-header">
				<button type="button" class="approbationInbox-list-content-groupOptional-header-action" aria-expanded="true">
					<span class="approbationInbox-list-content-groupOptional-header-action-icon">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom mod-XS"></span>
					</span>
					Group title
				</button>
			</div>
			<div class="approbationInbox-list-content-groupOptional-content">
				<div class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Content</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
```

### Group collapsed

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
```

```html
<div class="approbationInbox-list">
	<div class="approbationInbox-list-content">
		<div class="approbationInbox-list-content-groupOptional">
			<div class="approbationInbox-list-content-groupOptional-header">
				<button type="button" class="approbationInbox-list-content-groupOptional-header-action" aria-expanded="false">
					<span class="approbationInbox-list-content-groupOptional-header-action-icon">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom mod-XS"></span>
					</span>
					Group title
				</button>
			</div>
			<div class="approbationInbox-list-content-groupOptional-content">
				<div class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Content</div>
					</div>
				</div>
				<div class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Content</div>
					</div>
				</div>
			</div>
		</div>
		<div class="approbationInbox-list-content-groupOptional">
			<div class="approbationInbox-list-content-groupOptional-header">
				<button type="button" class="approbationInbox-list-content-groupOptional-header-action" aria-expanded="false">
					<span class="approbationInbox-list-content-groupOptional-header-action-icon">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom mod-XS"></span>
					</span>
					Group title
				</button>
			</div>
			<div class="approbationInbox-list-content-groupOptional-content">
				<div class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Content</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
```

### Group selectable

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/formLabel';
```

```html
<div class="approbationInbox-list">
	<div class="approbationInbox-list-content">
		<div class="approbationInbox-list-content-groupOptional">
			<div class="approbationInbox-list-content-groupOptional-header">
				<div class="approbationInbox-list-content-groupOptional-header-formfieldOptional form-field">
					<label class="formLabel pr-u-mask" for="selectgroup">
						<span>Select "Group"</span>
					</label>
					<div class="checkboxField">
						<input type="checkbox" class="checkboxField-input" id="selectgroup" />
						<span aria-hidden="true" class="checkboxField-icon">
							<span class="checkboxField-icon-check"></span>
						</span>
					</div>
				</div>
				<button type="button" class="approbationInbox-list-content-groupOptional-header-action" aria-expanded="true">
					<span class="approbationInbox-list-content-groupOptional-header-action-icon">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom mod-XS"></span>
					</span>
					Group title
				</button>
			</div>
			<div class="approbationInbox-list-content-groupOptional-content">
				<div class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Content</div>
					</div>
				</div>
				<div class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Content</div>
					</div>
				</div>
			</div>
		</div>
		<div class="approbationInbox-list-content-groupOptional">
			<div class="approbationInbox-list-content-groupOptional-header">
				<div class="approbationInbox-list-content-groupOptional-header-formfieldOptional form-field">
					<label class="formLabel pr-u-mask" for="selectgroup">
						<span>Select "Group"</span>
					</label>
					<div class="checkboxField">
						<input type="checkbox" class="checkboxField-input" id="selectgroup" />
						<span aria-hidden="true" class="checkboxField-icon">
							<span class="checkboxField-icon-check"></span>
						</span>
					</div>
				</div>
				<button type="button" class="approbationInbox-list-content-groupOptional-header-action" aria-expanded="true">
					<span class="approbationInbox-list-content-groupOptional-header-action-icon">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom mod-XS"></span>
					</span>
					Group title
				</button>
			</div>
			<div class="approbationInbox-list-content-groupOptional-content">
				<div class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Content</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
```

### Item centered

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<div class="approbationInbox-list">
	<ul class="approbationInbox-list-content-items">
		<li class="approbationInbox-list-content-items-item">
			<div class="approbationInbox-list-content-items-item-content">
				<div class="approbationInbox-list-content-items-item-content-info mod-center">
					<div class="approbationInbox-list-content-items-item-content-info-visual">
						<div class="avatar mod-M">
							<div class="avatar-picture" style="background-color: rgb(214, 92, 92)">
								<span translate="no" class="avatar-picture-initials">VV</span>
							</div>
						</div>
					</div>
					<div class="approbationInbox-list-content-items-item-content-info-main">
						<div class="approbationInbox-list-content-items-item-content-info-main-title">
							<a href="#" class="approbationInbox-list-content-items-item-content-action">Title</a>
						</div>
						Metadata
					</div>
					<div class="approbationInbox-list-content-items-item-content-info-rightContent">
						<ul class="approbationInbox-list-content-items-item-content-info-rightContent-icons">
							<li>
								<span class="approbationInbox-list-content-items-item-content-info-rightContent-icons-icon">
									<span aria-hidden="true" class="lucca-icon icon-formatClipperAttachment mod-XS"></span>
									<span class="pr-u-mask">Contient une pièce jointe</span>
								</span>
							</li>
							<li>
								<span class="approbationInbox-list-content-items-item-content-info-rightContent-icons-icon">
									<span aria-hidden="true" class="lucca-icon icon-bubbleSpeech mod-XS"></span>
									<span class="pr-u-mask">Contient un commentaire</span>
								</span>
							</li>
							<li>
								<span
									class="approbationInbox-list-content-items-item-content-info-rightContent-icons-icon pr-u-textWarning"
								>
									<span aria-hidden="true" class="lucca-icon icon-signWarning mod-XS"></span>
									<span class="pr-u-mask">Contient un avertissement</span>
								</span>
							</li>
						</ul>
						Data
						<div class="approbationInbox-list-content-items-item-content-info-rightContent-subtle">Data</div>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>
```

### Item current

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
```

```html
<div class="approbationInbox-list">
	<ul class="approbationInbox-list-content-items">
		<li class="approbationInbox-list-content-items-item">
			<div class="approbationInbox-list-content-items-item-content">
				<div class="approbationInbox-list-content-items-item-content-info">
					<div class="approbationInbox-list-content-items-item-content-info-main">
						<div class="approbationInbox-list-content-items-item-content-info-main-title">
							<a href="#" class="approbationInbox-list-content-items-item-content-action" aria-current="page">Title</a>
						</div>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>
```

### Item data

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/avatar';
```

```html
<div class="approbationInbox-list">
	<ul class="approbationInbox-list-content-items">
		<li class="approbationInbox-list-content-items-item">
			<div class="approbationInbox-list-content-items-item-content">
				<div class="approbationInbox-list-content-items-item-content-info">
					<div class="approbationInbox-list-content-items-item-content-info-visual">
						<div class="avatar mod-M">
							<div class="avatar-picture" style="background-color: rgb(214, 92, 92)">
								<span translate="no" class="avatar-picture-initials">VV</span>
							</div>
						</div>
					</div>
					<div class="approbationInbox-list-content-items-item-content-info-main">
						<div class="approbationInbox-list-content-items-item-content-info-main-title">
							<a href="#" class="approbationInbox-list-content-items-item-content-action">Title</a>
						</div>
						Metadata
					</div>
					<div class="approbationInbox-list-content-items-item-content-info-rightContent">
						<ul class="approbationInbox-list-content-items-item-content-info-rightContent-icons">
							<li>
								<span class="approbationInbox-list-content-items-item-content-info-rightContent-icons-icon">
									<span aria-hidden="true" class="lucca-icon icon-formatClipperAttachment mod-XS"></span>
									<span class="pr-u-mask">Contient une pièce jointe</span>
								</span>
							</li>
							<li>
								<span class="approbationInbox-list-content-items-item-content-info-rightContent-icons-icon">
									<span aria-hidden="true" class="lucca-icon icon-bubbleSpeech mod-XS"></span>
									<span class="pr-u-mask">Contient un commentaire</span>
								</span>
							</li>
							<li>
								<span
									class="approbationInbox-list-content-items-item-content-info-rightContent-icons-icon pr-u-textWarning"
								>
									<span aria-hidden="true" class="lucca-icon icon-signWarning mod-XS"></span>
									<span class="pr-u-mask">Contient un avertissement</span>
								</span>
							</li>
						</ul>
						Data
						<div class="approbationInbox-list-content-items-item-content-info-rightContent-subtle">Data</div>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>
```

### Item selectable

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/formLabel';
```

```html
<div class="approbationInbox-list">
	<ul class="approbationInbox-list-content-items">
		<li class="approbationInbox-list-content-items-item">
			<div class="approbationInbox-list-content-items-item-formfieldOptional form-field">
				<label class="formLabel pr-u-mask" for="input">
					<span>Sélectionner « Title »</span>
				</label>
				<div class="checkboxField">
					<input type="checkbox" class="checkboxField-input" id="input" />
					<span aria-hidden="true" class="checkboxField-icon">
						<span class="checkboxField-icon-check"></span>
					</span>
				</div>
			</div>
			<div class="approbationInbox-list-content-items-item-content">
				<div class="approbationInbox-list-content-items-item-content-info">
					<div class="approbationInbox-list-content-items-item-content-info-main">
						<div class="approbationInbox-list-content-items-item-content-info-main-title">
							<a href="#" class="approbationInbox-list-content-items-item-content-action">Title</a>
						</div>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>
```

### Item

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
```

```html
<div class="approbationInbox-list">
	<ul class="approbationInbox-list-content-items">
		<li class="approbationInbox-list-content-items-item">
			<div class="approbationInbox-list-content-items-item-content">
				<div class="approbationInbox-list-content-items-item-content-info">
					<div class="approbationInbox-list-content-items-item-content-info-main">
						<div class="approbationInbox-list-content-items-item-content-info-main-title">
							<a href="#" class="approbationInbox-list-content-items-item-content-action">Title</a>
						</div>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>
```

### Selectable

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/divider';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/numericBadge';
```

```html
<section class="approbationInbox-list">
	<form class="approbationInbox-list-formSelectionOptional">
		<header class="approbationInbox-list-header">
			<h1 class="approbationInbox-list-header-title">
				À approuver
				<span class="numericBadge">8</span>
			</h1>
		</header>
		<div class="approbationInbox-list-content">
			<div class="approbationInbox-list-formSelectionOptional-formfield form-field">
				<label class="formLabel" for="selectall">
					<span>Tout sélectionner</span>
				</label>
				<div class="checkboxField">
					<input type="checkbox" class="checkboxField-input" id="selectall" />
					<span aria-hidden="true" class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</div>
			</div>
			<div class="divider"></div>
			<ul class="approbationInbox-list-content-items">
				<li class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-formfieldOptional form-field">
						<label class="formLabel pr-u-mask" for="input">
							<span>Sélectionner « Title »</span>
						</label>
						<div class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="input" />
							<span aria-hidden="true" class="checkboxField-icon">
								<span class="checkboxField-icon-check"></span>
							</span>
						</div>
					</div>
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Contenu</div>
					</div>
				</li>
			</ul>
		</div>
	</form>
</section>
```

### Selected

```css
@forward '@lucca-front/scss/src/components/approbation-inbox';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/checkboxField';
@forward '@lucca-front/scss/src/components/divider';
@forward '@lucca-front/scss/src/components/formLabel';
@forward '@lucca-front/scss/src/components/numericBadge';
```

```html
<section class="approbationInbox-list">
	<form class="approbationInbox-list-formSelectionOptional">
		<header class="approbationInbox-list-header">
			<h1 class="approbationInbox-list-header-title">
				À approuver
				<span class="numericBadge">8</span>
			</h1>
		</header>
		<div class="approbationInbox-list-content">
			<div class="approbationInbox-list-formSelectionOptional-formfield form-field">
				<label class="formLabel" for="selectall">
					<span>Tout sélectionner</span>
				</label>
				<div class="checkboxField">
					<input type="checkbox" class="checkboxField-input" checked="checked" id="selectall" />
					<span aria-hidden="true" class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</div>
			</div>
			<div class="divider"></div>
			<ul class="approbationInbox-list-content-items">
				<li class="approbationInbox-list-content-items-item">
					<div class="approbationInbox-list-content-items-item-formfieldOptional form-field">
						<label class="formLabel pr-u-mask" for="input">
							<span>Sélectionner « Title »</span>
						</label>
						<div class="checkboxField">
							<input type="checkbox" class="checkboxField-input" checked="checked" id="input" />
							<span aria-hidden="true" class="checkboxField-icon">
								<span class="checkboxField-icon-check"></span>
							</span>
						</div>
					</div>
					<div class="approbationInbox-list-content-items-item-content">
						<div class="approbationInbox-list-content-items-item-content-info">Contenu</div>
					</div>
				</li>
			</ul>
		</div>
		<footer class="approbationInbox-list-footer">
			<h2 class="approbationInbox-list-footer-title">1 élément sélectionné</h2>
			<button type="submit" class="button">Approuver l’élément</button>
			<button type="button" class="button">Transférer l’élément</button>
		</footer>
	</form>
</section>
```
