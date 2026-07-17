# skiplinks — Content

## Design

En navigant uniquement au clavier, il est nécessaire de passer par chaque élément des différents menus avant d'arriver au contenu, ce qui peut parfois demander des dizaines d'actions. L'accès rapide permet de cibler plus rapidement chaque section générale avant d'accéder plus rapidement au contenu souhaité.

ℹ️ Pour tester l'accès rapide, cliquez sur le coin supérieur gauche du composant ci-dessous, puis naviguez avec tab et entrée.

## Mise en place

* Importez `LuSkipLinksComponent` dans `app.component.ts`.
* Ajoutez `<lu-skip-links></lu-skip-links>`au dessus du menu principal et secondaire, généralement présents dans `app.component.html`.

## Sections cibles 

L'accès rapide va cibler 3 sections, en se basant sur les identifiants suivants :

* Menu principal :`#lucca-banner-solutions-container`
* Menu secondaire : `#navSide`
* Contenu principal : `#main-content` (à ajouter manuellement si nécessaire)
