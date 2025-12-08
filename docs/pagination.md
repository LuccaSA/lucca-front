`LuPagination` permet la navigation entre plusieurs pages, comme pour un tableau.

Il propose 2 interfaces différentes (appelé `mod`) :
   * `default` : le plus simple, avec des boutons de navigation et des informations sur la page courante et le nombre total d'éléments
   * `compact` : un mode plus compact, avec les boutons de navigation uniquement

### Mod `default`

La pagination en mode `default` est le mode par défaut si vous ne précisez rien. Pour l'utiliser, vous devrez :

   * passer les inputs suivantes :
     * `from` : l'index du premier élément de la page courante
     * `to` : l'index du dernier élément de la page courante
     * `itemsCount` : le nombre total d'éléments
     * `isFirstPage` : un booléen indiquant si la page courante est la première
     * `isLastPage` : un booléen indiquant si la page courante est la dernière

   * récupérer les outputs suivants :
     * `previousPage` : émis lorsque l'utilisateur clique sur le bouton avec la flèche gauche `<`, correspondant à "précédent"
     * `nextPage` : émis lorsque l'utilisateur clique sur le bouton avec la flèche droite `>`, correspondant à "suivant"

Voici un exemple d'utilisation de `LuPagination` en mode `default` :

```html
<lu-pagination
  [from]="1"
  [to]="20"
  [itemsCount]="27"
  [isFirstPage]="true"
  [isLastPage]="false"
  (previousPage)="previouPage()"
  (nextPage)="nextPage()"
/>
```

### Mod `compact`

Le mode `compact` est une version plus simple de la pagination avec uniquement les boutons de navigation. Pour l'utiliser, vous devrez :

   * passer les inputs suivants :
     * `isFirstPage` : un booléen indiquant si la page courante est la première
     * `isLastPage` : un booléen indiquant si la page courante est la dernière

   * récupérer les outputs suivants :
     * `previousPage` : émis lorsque l'utilisateur clique sur le bouton avec la flèche gauche `<`, correspondant à "précédent"
     * `nextPage` : émis lorsque l'utilisateur clique sur le bouton avec la flèche droite `>`, correspondant à "suivant"

Voici un exemple d'utilisation de `LuPagination` en mode `compact` :

```html
<lu-pagination
  mod="compact"
  [isFirstPage]="true"
  [isLastPage]="false"
  (previousPage)="previousPage()"
  (nextPage)="nextPage()"
/>
```
