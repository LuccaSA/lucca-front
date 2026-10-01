### Fonctionnement

Les traductions sont hébergées par Lokalise sur le projet `Lucca.Front` et doivent être importées en lançant la commande suivante à la racine du projet : `npm run i18n:update`.
[Documentation complète des traductions](https://www.notion.so/Lucca-Front-Traductions-Lokalise-173d278ab26e801b8462f90e1a93dd50)

### Surcharges

De nombreux composants de Lucca Front permettent de surcharger les traductions via l'input `[intl]`. Cela permet de personnaliser certaines traductions sans modifier les fichiers de traduction par défaut.

Les composants utilisent la fonction `intlInputOptions()` pour créer un input `intl` qui :

1. charge automatiquement les traductions selon la locale courante (`LOCALE_ID`) ;
2. accepte un objet de traductions partielles pour surcharger certaines clés ;
3. fusionne vos traductions avec celles par défaut.

#### Exemple avec le composant Pagination

**Surcharger plusieurs clés** :

```html
<lu-pagination 
  [from]="0" 
  [to]="10" 
  [itemsCount]="100" 
  [intl]="{
    results: 'Page {{from}}-{{to}} / {{itemsCount}}',
    previous: 'Prev',
    next: 'Next',
    resultsA11y: 'Showing {{from}} to {{to}} of {{itemsCount}} items'
  }" 
/>
```
