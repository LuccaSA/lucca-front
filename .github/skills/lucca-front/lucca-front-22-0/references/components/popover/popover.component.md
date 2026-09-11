# popover — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-overlays-popover--docs)

## Angular

Mots-clés : bulle contextuelle

Directive selector : `luPopover2`

Popover2 est la nouvelle version de LuPopover, il a été choisi de partir sur une implémentation différente et donc, afin d'éviter les impacts d'un breaking change,
une nouvelle directive a vu le jour `luPopover2`, dans un nouveau point d'entrée, `@lucca-front/ng/popover2`.

### Mise en place

Popover2 est fait pour être simple à utiliser, il suffit de l'importer dans votre environement avec `configureLuPopover()` (à placer dans les providers de votre `AppModule` ou lors du bootstrap de `AppComponent` si vous êtes en full standalone).

### Utilisation

Pour utiliser `Popover2` dans un template, il suffit d'appliquer la directive `[luPopover2]` en renseignant en input une référence à un `ng-template`, exemple:

### Paramètres et position

Seule la référence au `ng-template` est obligatoire, mais la directive propose des paramètres pour divers usages:

- `luPopoverTrigger` permet de définir les évènements déclencheurs d’ouverture du popover :
  - `click` est le cas par défaut, c’est le cas le plus proche d’un comportement natif navigateur et le moins intrusif.
  - `click+hover` ajoute au click l’ouverture au survol. Le popover s’ouvre alors plus facilement (mais peut l’être aussi de manière involontaire).
  - `hover+focus` désactive l’ouverture au click, ce qui permet de le réserver pour une navigation vers une autre page. Il faut cependant bien noter que dans cette configuration le popover n’est plus accessible : il convient donc de s’assurer que les informations contenues dans le popover soient reprises dans la page liée.
- `luPopoverPosition` par défaut à `above`, permet de régler la position voulue du popover, en cas d'espace manquant dans le rendu, le composant tentera de se positionner d'abord à l'opposé de la position demandée, puis les deux autres à tour de rôle.
- `luPopoverDisabled` permet de désactiver totalement le popover.
- `customPositions` à utiliser avec précaution, permet de renseigner des `ConnectionPositionPair` pour totalement remplacer la logique de positionnement, très utile pour les menus qui doivent être `below` mais alignés sur un côté plutôt que l'autre.

Les positions custom doivent être déclarées dans le `component.ts` sous forme d'un tableau et passés dans le template en input, exemple pour un menu qui s'ouvre en dessous à gauche (ou au dessus à gauche si pas de place):

component.ts:

component.html:

### Overlays popover

```js
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuPopoverAlignment, LuPopoverModule, LuPopoverPosition, LuPopoverTriggerEvent } from '@lucca-front/ng/popover';
import { LuPopoverModule } from '@lucca-front/ng/popover';
```

```html
<button
	type="button"
	class="button"
	[luPopover]="popover"
	[luPopoverPosition]="position()"
	[luPopoverAlignment]="alignment()"
	[luPopoverTrigger]="trigger()"
>
	{{ trigger() }} me
</button>
<lu-popover #popover>{{ popoverContent() }}</lu-popover>
```

### Users popover

```js
import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuUser } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

```html
<button
	type="button"
	class="userPopover_trigger"
	[luUserPopover]="luUserPopover()"
	[luUserPopoverDisabled]="luUserPopoverDisabled()"
>
	Survolez-moi !
</button>
```

## HTML/CSS

### Popover

```css
@forward '@lucca-front/scss/src/components/popover';
@forward '@lucca-front/scss/src/components/avatar';
@forward '@lucca-front/scss/src/components/userPopover';
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
			<p class="userPopover-details-info-detail">
				<!--
					<span class="userPopover-details-info-detail-workplace">
						<span aria-hidden="true" class="lucca-icon icon-calendarPlanning mod-S"></span>
						<span class="userPopover-details-info-detail-link-state">Arrivée prévue le 3 mai</span>
					</span>
					<span class="userPopover-details-info-detail-workplace">
						<span aria-hidden="true" class="lucca-icon icon-calendarStrikethrough mod-S"></span>
						<span class="userPopover-details-info-detail-link-state">Parti(e)</span>
					</span>
					-->
				<a class="userPopover-details-info-detail-workplace" href="#">
					<span aria-hidden="true" class="lucca-icon icon-calendarPlanning mod-S"></span>
					<span class="userPopover-details-info-detail-workplace-state">
						Absent(e) –
						<span class="pr-u-textLight">Jusqu’au 28/02/2024 inclus</span>
					</span>
				</a>
			</p>
		</div>
	</div>
</section>
```
