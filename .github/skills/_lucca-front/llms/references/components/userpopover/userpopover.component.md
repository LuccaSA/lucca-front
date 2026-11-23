# userpopover — Code & Implementation

**Sommaire**

- Angular
  - Utilisation
  - Store et Services
  - Popover
- HTML/CSS
  - Popover

📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-users-userpopover-angular--docs)

## Angular

### Utilisation

Pour utiliser la UserPopover, il vous suffit d'utiliser la directive `[luUserPopover]` et de lui fournir un LuUser

Note : l'import du composant se fait seulement à son utilisation. Le style lié à `userPopover_trigger` peut donc ne pas être chargé à l'initialisation de la page. Dans ce cas, il est possible de remplacer cette classe par les utilitaires `pr-u-buttonReset pr-u-inlineSizeFitContent pr-u-borderRadiusDefault` ou `pr-u-buttonReset pr-u-inlineSizeFitContent pr-u-borderRadiusFull`.

#### luEmployeeCard

Permet de fournir un utilisateur à la UserPopover.

#### luUserPopoverEnterDelay

Permet de définir le délai avant l'affichage du UserPopover en millisecondes. Par défaut 300

#### luUserPopoverLeaveDelay

Permet de définir le délai avant la disparition du UserPopover en millisecondes. Par défaut 100

#### luUserPopoverDisabled

Permet de désactiver le UserPopover

### Store et Services

Le User popover est fournit avec un service qui gère la récupération des données, mais aussi qui stocke les informations des utilisateurs déjà récupérés, y compris les images.
Ce service est un singleton et est donc partagé entre tous les UserPopover de l'application.

Il est possible de fournir un autre service qui implémente l'interface `ILuUserPopoverStore` pour gérer la récupération des données et le stockage des informations.

### Popover

```js
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ILuUser, LuUserDisplayModule } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

```html
<button
	type="button"
	class="userPopover_trigger"
	[luUserPopover]="luUserPopover"
	[luUserPopoverDisabled]="luUserPopoverDisabled"
	[luPopoverOpenDelay]="luPopoverOpenDelay"
	[luPopoverCloseDelay]="luPopoverCloseDelay"
	translate="no"
>
	{{ luUserPopover | luUserDisplay: "lf" }}
</button>
```

## HTML/CSS

### Popover

```css
@forward '@lucca-front/scss/src/components/userPopover';
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/link';
```

```html
<section class="lu-popover-content userPopover">
	<div class="userPopover-details">
		<div class="userPopover-details-avatar avatar">
			<div class="avatar-picture" style="background-color: rgb(92, 214, 153)">
				<span class="avatar-picture-initials" translate="no">CA</span>
			</div>
		</div>
		<div class="userPopover-details-info">
			<h1 class="userPopover-details-info-name pr-u-ellipsis">
				<a class="userPopover-details-info-name-linkOptional" href="#">Chloé Alibert</a>
			</h1>
			<p class="userPopover-details-info-detail pr-u-ellipsis">Technicienne</p>
			<p class="userPopover-details-info-detail pr-u-ellipsis">SAV</p>
			<p class="userPopover-details-info-detail pr-u-marginTop100">
				<!--
					<span class="userPopover-details-info-detail-workplace">
						<span aria-hidden="true" class="lucca-icon icon-calendarPlanning mod-XS userPopover-details-info-detail-workplace-icon"></span>
						<span class="userPopover-details-info-detail-link-state">Arrivée prévue le 3 mai</span>
					</span>
					<span class="userPopover-details-info-detail-workplace">
						<span aria-hidden="true" class="lucca-icon icon-calendarStrikethrough mod-XS userPopover-details-info-detail-workplace-icon"></span>
						<span class="userPopover-details-info-detail-link-state">Parti(e)</span>
					</span>
					-->
				<span class="userPopover-details-info-detail-workplace">
					<span
						aria-hidden="true"
						class="lucca-icon icon-calendarPlanning mod-XS userPopover-details-info-detail-workplace-icon"
					></span>
					<a
						class="link mod-icon mod-hiddenIcon mod-decorationHover mod-neutral userPopover-details-info-detail-workplace-state"
						href="#"
					>
						<span class="link-text">
							Absent(e) –
							<span class="pr-u-textLight">Jusqu’au 28/02/2024 inclus</span>
						</span>
						<span class="link-icon"><span aria-hidden="true" class="lucca-icon icon-arrowExternal"></span></span>
						<span class="pr-u-mask">(Open in a new window.)</span>
					</a>
				</span>
			</p>
		</div>
	</div>
</section>
```
