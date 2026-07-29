# app-layout — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-structure-app-layout-angular-basic--docs)

## Angular

L'option `sidebar` n'est pour le moment pas compatible avec Container et Empty state. Il est prévu de faire évoluer Main Layout de manière à proposer différents layouts usuels et adapter ces composants en fonction. En attendant, ils doivent être overridés manuellement.

### Usage de main-layout-block

`main-layout-block` permet de structurer le contenu de la page courante entre les sections header et footer. Une marge est appliquée automatiquement au dessus et en dessous de cette section.

`lu-container` peut-être ajouté pour restreindre la largeur des contenus.

Pour les contenus larges, il est possible d'ajouter l'option `contentOverflowing` pour rendre le rendre le bloc scrollable (dans les faits, cette option va rendre `main-layout` scrollable, en fixant tous les autres éléments).

Si seulement une section de la page doit scroller, il est possible d'utiliser plusieurs `main-layout-block`. Dans ce cas, les marges seront appliquées seulement au dessus du premier bloc et en dessous du dernier.

### Utilisation de webComponents

Si App Layout importe des webComponents (comme Lucca Banner), il est nécessaire d'autoriser leur utilisation :

### Ancres et scroll

Angular repose actuellement sur `window.scrollTo()` pour accéder au contenu cible d'une ancre. Le scroll d'App layout n'étant pas positionné sur le `body`, il est nécessaire de surcharger ce comportement pour retrouver le fonctionnement natif.

| Example | File |
|---------|------|
| Basic | [angular-basic.md](./stories/angular-basic.md) |

## HTML/CSS

L'ajout manuel d'un ID `main-content` sur `<lu-main-layout>` est nécessaire afin de s'assurer du bon fonctionnement de Skip links.

| Example | File |
|---------|------|
| Basic | [html-basic.md](./stories/html-basic.md) |
