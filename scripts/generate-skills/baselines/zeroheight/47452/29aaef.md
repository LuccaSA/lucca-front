---
title: Horizontal navigation
description: Le composant Horizontal navigation permet une navigation facile et organisée, vers différentes sous-pages d’une interface, facilitant l'accès aux informations ou aux fonctionnalités spécifiques.
---

# Angular

## Horizontal navigation Angular `v19.3`

Component selector : `lu-horizontal-navigation`

```ts
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
```

[Basic](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-navigation-horizontalnavigation-angular--basic)

# HTML

## Horizontal navigation HTML

Classe CSS : `.horizontalNavigation`

```css
@forward '@lucca-front/scss/src/components/horizontalNavigation';
```

<tabs>
<tab>

<tab-title>**Base**</tab-title>

[Basic](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-navigation-horizontalnavigation-html-css-basic--basic)

</tab>
<tab>

<tab-title>**Compteur**</tab-title>

[Count](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-navigation-horizontalnavigation-html-css-count--count)

</tab>
<tab>

<tab-title>**Container**</tab-title>

Ce menu intègre un `container` pour s'aligner horizontalement au contenu de la page.

[Container](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-navigation-horizontalnavigation-html-css-container--container)

</tab>
<tab>

<tab-title>**Scrollbox**</tab-title>

[Scrollbox](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-navigation-horizontalnavigation-html-css-scrollbox--scrollbox)

</tab>
</tabs>

---

### Accessibilité

* L’attribut `aria-current="page"` permet d’indiquer la page courante à la fois sémantiquement et visuellement.
* Si vous devez ajouter un titre sémantique HTML à votre menu d’onglets, préférez d'ajouter ce titre directement dans la section de chaque panneau en utilisant la class `pr-u-mask`. Ne mélangez pas la navigation et la sémantique de titres.

Ma navigation :

```html
<nav class="menu">
  <ul class="menu-list">
    <li class="menu-list-item">
      <a class="menu-list-item-action">
        Lorem ipsum
        <span class="menu-list-item-action-placeholder" aria-hidden="true" data-content-after="Lorem ipsum"></span>
      </a>
    </li>
  </ul>
</nav>
```

Dans le composant :

```html
<h2 class="u-mask">
	Lorem ipsum
</h2>
```
