# title-and-text — Code & Implementation

## HTML/CSS

**v19.2**

Les marges et paddings sont supprimés par défaut pour éviter l'usage massif d'utilitaires de spacings.

Il est possible de conserver ces spacings temporairement via un flag suivant :

## Règles d’usage

### Accessibilité 

* Pour faciliter le travail de construction de plans de documents de nos pages, la sémantique des titres et leurs styles graphiques peuvent être dissociés avec ces classes utilitaires : `.pr-u-h1, .pr-u-h2…`.
* Des *mixins* `@include hx, @include h1, @include h2…` permettent également de pouvoir associer des styles graphiques différents en fonction du *responsive* ; le *mixin* `@include hx` regroupant les styles communs à tout les niveaux de titres.

Pour tous les Titles, ne mettons pas de point final.
