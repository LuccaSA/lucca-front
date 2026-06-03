# fancybox — Design

**Mots-clés :**boîte, illustrations

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

Le composant est disponible en deux tailles :

* La **taille M**, la plus courante, doit être utilisée dans la majorité des interfaces, en pleine page, pour afficher une information importante.
* La **taille S**, correspondant à une version plus compacte, peut être utilisée dans des espaces plus restreints comme des Dialogs ou lorsque l'espace horizontal est réduit (petits écrans ou mobile).

☝️ Si vous souhaitez en savoir plus sur son utilisation au sein d’une interface, son positionnement et les spécifications Design, rendez-vous en bas de cette page.

## Cas d'usage

### Champ de recherche

Le composant Fancy box est idéal pour mettre en avant un champ de recherche lorsque cette fonctionnalité est centrale. Il attire visuellement l’attention, facilitant l’identification immédiate et incitant l’utilisateur à effectuer sa recherche.

### Donnée importante

De la même manière, ce composant peut être utilisé pour mettre en avant une donnée clé ou un chiffre important, comme un solde. Il permet de capter l’attention de l’utilisateur et de valoriser une information essentielle dans l’interface.

### Action importante

Le composant Fancy box est idéal pour mettre en avant une action importante. Il attire l’attention sur une interaction clé, peut-être la seule possible sur l’interface.

## Règles d’utilisation

### Card ou Box ?

Comme indiqué dans le nom du composant, il s’agit d’une Box et non d’une Card. Il n’est donc pas possible de rendre l’entièreté de la zone cliquable. Si des actions sont possibles, il faut les expliciter via un bouton.

- **Do** : Seuls les éléments et composants présents dans la Fancy box sont interactifs (Button, Textfield, etc.).
- **Don't** : La Fancy box n'est pas une Card, elle n'est pas interactive.

### Éléments au premier plan

Pour éviter de surcharger la Box, il est recommandé de n’afficher qu’un seul objet au premier plan.

- **Do** : Seule une des deux illustrations peut passer en premier plan.
- **Don't** : Lorsque les deux illustrations sont placées au premier plan, cela complique la lisibilité du contenu de la Fancy box.

## Comportement

### Illustration adaptée

Il est possible de prévoir plusieurs illustrations qui peuvent s’adapter en fonction du contenu de la box, notamment lorsqu’il s’agit d’un solde.

### Petits écrans et mobile

L’affichage de la Fancy box s’adapte sur les petits écrans et mobiles. Les illustrations sont réduites en gardant le même ratio, ce qui les rend plus discrètes.

## Spécifications

La Fancy box est principalement utilisée directement sous le Page header. Cet emplacement est idéal pour mettre en avant un élément central de l’interface, c’est la première chose qu’il doit voir.

Les illustrations doivent toujours respecter une taille fixe de 200x160px, y compris celles placées au premier plan. Les éléments constituant l’illustration doivent impérativement rester contenus dans ces dimensions sans jamais les dépasser.

Des composant `🎨 templateFancyBox` sont disponibles dans Figma pour permettre aux Designers de créer plus facilement leurs illustrations. Il faudra ensuite appeler ces composants depuis le composant principal Fancy box.
