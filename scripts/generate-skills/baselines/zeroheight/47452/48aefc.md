---
title: Skip links
description: Skip links (Accès rapides) permet d'accéder aux contenus principaux plus rapidement lors d'une navigation clavier.
---

# Content

**Mots-clés**

liens d'évitement, accessibilité, a11y

## Design

En navigant uniquement au clavier, il est nécessaire de passer par chaque élément des différents menus avant d'arriver au contenu, ce qui peut parfois demander des dizaines d'actions. L'accès rapide permet de cibler plus rapidement chaque section générale avant d'accéder plus rapidement au contenu souhaité.

<callout background="2">

ℹ️ Pour tester l'accès rapide, cliquez sur le coin supérieur gauche du composant ci-dessous, puis naviguez avec tab et entrée.

</callout>

[Basic](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-navigation-skiplinks-basic--basic)

## Mise en place

* Importez `LuSkipLinksComponent` dans `app.component.ts`.
* Ajoutez `<lu-skip-links></lu-skip-links>`au dessus du menu principal et [secondaire](https://prisme.lucca.io/94310e217/p/160093-secondary-menu-sidenav), généralement présents dans `app.component.html`.

## Sections cibles 

L'accès rapide va cibler 3 sections, en se basant sur les identifiants suivants :

* Menu principal :`#lucca-banner-solutions-container`
* Menu secondaire : `#navSide`
* Contenu principal : `#main-content` (à ajouter manuellement si nécessaire)
