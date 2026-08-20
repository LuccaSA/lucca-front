# pageheader — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-structure-pageheader-angular-basic--docs)

## Angular

Component selector : `lu-page-header`

### Header basic

```js
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { BreadcrumbsComponent, BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
```

```html
<lu-page-header
	label="H1. Page title"
	description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet justo. Nullam condimentum nulla et neque ultricies bibendum."
></lu-page-header>
```

## HTML/CSS

Les exemples ci-dessous sont affichés dans leur vue compact par défaut compte tenu de l'espace disponible :

### Header back

```css
@forward '@lucca-front/scss/src/components/page-header';
@forward '@lucca-front/scss/src/components/button';
```

```html
<header class="pageHeader">
	<div class="pageHeader-content">
		<div class="pageHeader-content-title">
			<nav role="presentation" class="pageHeader-content-title-back">
				<a href="#" class="button mod-onlyIcon mod-ghost">
					<span class="lucca-icon icon-arrowLeft" aria-hidden="true"></span>
					<span class="pr-u-mask">Page parente</span>
				</a>
			</nav>
			<h1 class="pr-u-margin0">Page courante</h1>
			<div>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Modifier">
					<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					<span class="pr-u-mask">Modifier</span>
				</button>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Copier">
					<span aria-hidden="true" class="lucca-icon icon-fileCopy"></span>
					<span class="pr-u-mask">Copier</span>
				</button>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Supprimer">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					<span class="pr-u-mask">Supprimer</span>
				</button>
			</div>
		</div>
		<div class="pageHeader-content-actions">
			<label class="textfield mod-search">
				<input class="textfield-input" type="text" placeholder="ex : Mon précieux" />
				<span class="textfield-label pr-u-mask">Rechercher</span>
			</label>
			<button type="button" class="button">Button</button>
			<button type="button" class="button mod-outline">Button</button>
			<button type="button" class="button mod-onlyIcon mod-ghost">
				<span aria-hidden="true" class="lucca-icon icon-menuDots"></span>
				<span class="pr-u-mask">Voir plus</span>
			</button>
		</div>
	</div>
	<div class="pageHeader-description">
		<p class="pr-u-marginBlockEnd0">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet
			justo. Nullam condimentum nulla et neque ultricies bibendum.
		</p>
	</div>
</header>
```

### Header basic

```css
@forward '@lucca-front/scss/src/components/page-header';
@forward '@lucca-front/scss/src/components/button';
```

```html
<header class="pageHeader">
	<div class="pageHeader-content">
		<div class="pageHeader-content-title">
			<h1 class="pr-u-margin0">H1. Page title</h1>
			<div>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Modifier">
					<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					<span class="pr-u-mask">Modifier</span>
				</button>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Copier">
					<span aria-hidden="true" class="lucca-icon icon-fileCopy"></span>
					<span class="pr-u-mask">Copier</span>
				</button>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Supprimer">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					<span class="pr-u-mask">Supprimer</span>
				</button>
			</div>
		</div>
		<div class="pageHeader-content-actions">
			<label class="textfield mod-search">
				<input class="textfield-input" type="text" placeholder="ex : Mon précieux" />
				<span class="textfield-label pr-u-mask">Rechercher</span>
			</label>
			<button type="button" class="button">Button</button>
			<button type="button" class="button mod-outline">Button</button>
			<button type="button" class="button mod-onlyIcon mod-ghost">
				<span aria-hidden="true" class="lucca-icon icon-menuDots"></span>
				<span class="pr-u-mask">voir plus</span>
			</button>
		</div>
	</div>
	<div class="pageHeader-description">
		<p class="pr-u-marginBlockEnd0">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet
			justo. Nullam condimentum nulla et neque ultricies bibendum
			<a target="_blank">
				Lien
				<span aria-hidden="true" class="lucca-icon icon-arrowExternal mod-XS pr-u-marginInlineStart50"></span>
			</a>
			.
		</p>
	</div>
</header>
```

### Header breadcrumb

```css
@forward '@lucca-front/scss/src/components/page-header';
@forward '@lucca-front/scss/src/components/breadcrumbs';
@forward '@lucca-front/scss/src/components/button';
```

```html
<header class="pageHeader mod-withBreadcrumbs">
	<nav class="breadcrumbs" aria-describedby="breadcrumbs-title">
		<p id="breadcrumbs-title" class="pr-u-mask">Breadcrumbs</p>
		<ol class="breadcrumbs-list">
			<li class="breadcrumbs-list-item"><a class="breadcrumbs-list-item-action">Page 0</a></li>
			<li class="breadcrumbs-list-item"><a class="breadcrumbs-list-item-action">Page 1</a></li>
			<li class="breadcrumbs-list-item">
				<span aria-current="page" class="breadcrumbs-list-item-action">Page 2</span>
			</li>
		</ol>
	</nav>
	<div class="pageHeader-content">
		<div class="pageHeader-content-title">
			<h1 class="pr-u-margin0">H1. Page title</h1>
			<div>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Modifier">
					<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					<span class="pr-u-mask">Modifier</span>
				</button>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Copier">
					<span aria-hidden="true" class="lucca-icon icon-fileCopy"></span>
					<span class="pr-u-mask">Copier</span>
				</button>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Supprimer">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					<span class="pr-u-mask">Supprimer</span>
				</button>
			</div>
		</div>
		<div class="pageHeader-content-actions">
			<label class="textfield mod-search">
				<input class="textfield-input" type="text" placeholder="ex : Mon précieux" />
				<span class="textfield-label pr-u-mask">Rechercher</span>
			</label>
			<button type="button" class="button">Button</button>
			<button type="button" class="button mod-outline">Button</button>
			<button type="button" class="button mod-onlyIcon mod-ghost">
				<span aria-hidden="true" class="lucca-icon icon-menuDots"></span>
				<span class="pr-u-mask">voir plus</span>
			</button>
		</div>
	</div>
	<div class="pageHeader-description">
		<p class="pr-u-marginBlockEnd0">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet
			justo. Nullam condimentum nulla et neque ultricies bibendum
			<a target="_blank">
				Lien
				<span aria-hidden="true" class="lucca-icon icon-arrowExternal mod-XS pr-u-marginInlineStart50"></span>
			</a>
			.
		</p>
	</div>
</header>
```

### Header container

```css
@forward '@lucca-front/scss/src/components/page-header';
@forward '@lucca-front/scss/src/components/button';
```

```html
<header class="pageHeader">
	<div class="pageHeader-containerOptional">
		<div class="pageHeader-content">
			<div class="pageHeader-content-title">
				<h1 class="pr-u-margin0">H1. Page title</h1>
				<div>
					<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Modifier">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
						<span class="pr-u-mask">Modifier</span>
					</button>
					<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Copier">
						<span aria-hidden="true" class="lucca-icon icon-fileCopy"></span>
						<span class="pr-u-mask">Copier</span>
					</button>
					<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Supprimer">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
						<span class="pr-u-mask">Supprimer</span>
					</button>
				</div>
			</div>
			<div class="pageHeader-content-actions">
				<label class="textfield mod-search">
					<input class="textfield-input" type="text" placeholder="ex : Mon précieux" />
					<span class="textfield-label pr-u-mask">Rechercher</span>
				</label>
				<button type="button" class="button">Button</button>
				<button type="button" class="button mod-outline">Button</button>
				<button type="button" class="button mod-onlyIcon mod-ghost">
					<span aria-hidden="true" class="lucca-icon icon-menuDots"></span>
					<span class="pr-u-mask">voir plus</span>
				</button>
			</div>
		</div>
		<div class="pageHeader-description">
			<p class="pr-u-marginBlockEnd0">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet
				justo. Nullam condimentum nulla et neque ultricies bibendum
				<a target="_blank">
					Lien
					<span aria-hidden="true" class="lucca-icon icon-arrowExternal mod-XS pr-u-marginInlineStart50"></span>
				</a>
				.
			</p>
		</div>
	</div>
</header>
```

### Header leading trailing

```css
@forward '@lucca-front/scss/src/components/page-header';
@forward '@lucca-front/scss/src/components/button';
```

```html
<header class="pageHeader">
	<div class="pageHeader-content">
		<div class="pageHeader-content-title">
			<div class="pageHeader-content-title-leading">leading</div>
			<h1 class="pr-u-margin0">Page courante</h1>
			<div class="pageHeader-content-title-trailing">trailing</div>
			<div>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Modifier">
					<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					<span class="pr-u-mask">Modifier</span>
				</button>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Copier">
					<span aria-hidden="true" class="lucca-icon icon-fileCopy"></span>
					<span class="pr-u-mask">Copier</span>
				</button>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Supprimer">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					<span class="pr-u-mask">Supprimer</span>
				</button>
			</div>
		</div>
		<div class="pageHeader-content-actions">
			<label class="textfield mod-search">
				<input class="textfield-input" type="text" placeholder="ex : Mon précieux" />
				<span class="textfield-label pr-u-mask">Rechercher</span>
			</label>
			<button type="button" class="button">Button</button>
			<button type="button" class="button mod-outline">Button</button>
			<button type="button" class="button mod-onlyIcon mod-ghost">
				<span aria-hidden="true" class="lucca-icon icon-menuDots"></span>
				<span class="pr-u-mask">Voir plus</span>
			</button>
		</div>
	</div>
	<div class="pageHeader-description">
		<p class="pr-u-marginBlockEnd0">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet
			justo. Nullam condimentum nulla et neque ultricies bibendum.
		</p>
	</div>
</header>
```

### Header menu

```css
@forward '@lucca-front/scss/src/components/page-header';
@forward '@lucca-front/scss/src/components/button';
@forward '@lucca-front/scss/src/components/horizontalNavigation';
```

```html
<header class="pageHeader mod-withHorizontalNavigation">
	<div class="pageHeader-content">
		<div class="pageHeader-content-title">
			<h1 class="pr-u-margin0">H1. Page title</h1>
			<div>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Modifier">
					<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					<span class="pr-u-mask">Modifier</span>
				</button>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Copier">
					<span aria-hidden="true" class="lucca-icon icon-fileCopy"></span>
					<span class="pr-u-mask">Copier</span>
				</button>
				<button type="button" class="button mod-onlyIcon mod-ghost" luTooltip="Supprimer">
					<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					<span class="pr-u-mask">Supprimer</span>
				</button>
			</div>
		</div>
		<div class="pageHeader-content-actions">
			<label class="textfield mod-search">
				<input class="textfield-input" type="text" placeholder="ex : Mon précieux" />
				<span class="textfield-label pr-u-mask">Rechercher</span>
			</label>
			<button type="button" class="button">Button</button>
			<button type="button" class="button mod-outline">Button</button>
			<button type="button" class="button mod-onlyIcon mod-ghost">
				<span aria-hidden="true" class="lucca-icon icon-menuDots"></span>
				<span class="pr-u-mask">voir plus</span>
			</button>
		</div>
	</div>
	<div class="pageHeader-description">
		<p class="pr-u-marginBlockEnd0">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet
			justo. Nullam condimentum nulla et neque ultricies bibendum
			<a target="_blank">
				Lien
				<span aria-hidden="true" class="lucca-icon icon-arrowExternal mod-XS pr-u-marginInlineStart50"></span>
			</a>
			.
		</p>
	</div>
	<div class="horizontalNavigation">
		<ul class="horizontalNavigation-list">
			<li class="horizontalNavigation-list-item">
				<a class="horizontalNavigation-list-item-action" href="#" aria-current="page">Page</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a class="horizontalNavigation-list-item-action" href="#">Page</a>
			</li>
			<li class="horizontalNavigation-list-item">
				<a class="horizontalNavigation-list-item-action" href="#">Page</a>
			</li>
		</ul>
	</div>
</header>
```
