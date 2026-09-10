# skiplinks — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-navigation-skiplinks-basic--docs)

## Angular

En navigant uniquement au clavier, il est nécessaire de passer par chaque élément des différents menus avant d'arriver au contenu, ce qui peut parfois demander des dizaines d'actions. L'accès rapide permet de cibler plus rapidement chaque section générale avant d'accéder plus rapidement au contenu souhaité.

Le composant reste masqué visuellement tant qu'il n'a pas le focus : il n'apparaît qu'au premier `tab`, et disparaît dès que le focus le quitte. Il n'a donc aucun impact sur le rendu de l'interface pour un utilisateur à la souris.

ℹ️ Pour tester l'accès rapide, cliquez sur le coin supérieur gauche du composant ci-dessous, puis naviguez avec tab et entrée.

## Mise en place

Le composant se déclare une seule fois, dans `app.component.html`, **avant** le menu principal et le menu secondaire. Il doit être le premier élément focusable de la page :

### Sections cibles intégrées

Les trois liens intégrés s'appuient sur les identifiants suivants : 

| Lien | Identifiant attendu |
| --- | --- |
| Menu principal | `#lucca-banner-solutions-container` |
| Menu secondaire | `#navSide` |
| Contenu principal | `#main-content` (à ajouter manuellement si nécessaire) |

### Ajouter un accès rapide `v21.3`

La directive `luSkipLinkTarget` se pose sur l'élément à atteindre : le lien correspondant est alors ajouté automatiquement au composant SkipLinks. L'identifiant utilisé pour l'ancre est généré automatiquement si aucune valeur n'est passée à la directive.

L'input `luSkipLinkLabel` est obligatoire : il renseigne l'intitulé du lien affiché dans SkipLinks.

### Links basic

```js
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuSkipLinksComponent, SkipLinkDirective } from '@lucca-front/ng/a11y';
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
```

```html
<lu-skip-links />
<lu-app-layout>
	<ng-container appLayoutBanner>
		<div id="lucca-banner-solutions-container" tabindex="-1">
			<a href="#">banner</a>
		</div>
	</ng-container>
	<ng-container appLayoutNavSide>
		<div id="navSide" tabindex="-1">
			<a href="#">navside</a>
			<a href="#">navside</a>
			<a href="#">navside</a>
			<a href="#">navside</a>
			<a href="#">navside</a>
		</div>
	</ng-container>
	<lu-main-layout>
		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent"><a href="#">content</a></div>
			</lu-container>
		</lu-main-layout-block>
		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent"><a href="#">content</a></div>
			</lu-container>
		</lu-main-layout-block>
		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent"><a href="#">content</a></div>
			</lu-container>
		</lu-main-layout-block>
		<lu-main-layout-block>
			<lu-container>
				<div luSkipLinkTarget luSkipLinkLabel="Go to custom skip link target" class="fakeContent">
					<a href="#">custom skip link target</a>
				</div>
			</lu-container>
		</lu-main-layout-block>
		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent"><a href="#">content</a></div>
			</lu-container>
		</lu-main-layout-block>
	</lu-main-layout>
</lu-app-layout>
```
