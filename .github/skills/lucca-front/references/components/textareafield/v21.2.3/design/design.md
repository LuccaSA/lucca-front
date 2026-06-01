# textareafield — Design

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5759:156929">

</design>

## Anatomie

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=1418:17807">

<notes>

1. **Label :** Le label du champ doit indiquer quel type d'information le champ requiert.
2. **Champ de saisie :** Le champ dans lequel les utilisateurs cliquent pour saisir du texte.
3. **Message d’aide (Inline message) :** Le message d’aide est optionnel. Il permet de fournir des informations supplémentaires à l’utilisateur pour l’aider à compléter le champ.

</notes>

</design>

## Options

### Placeholder

L'utilisation d'un Placeholder est facultative. Son utilisation peut donner à l'utilisateur une indication sur le format ou un exemple de la donnée attendue.

Il est conseillé d'utiliser en premier lieu l'option de message d'aide pour éviter une perte d'indication suite à un clic dans le champ.

**⚠️**  Le placeholder ne doit pas répéter le label.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=1418:17836">

</design>

### Champ obligatoire

Les champs obligatoires doivent être signalés explicitement aux utilisateurs. C’est à la fois une recommandation d’accessibilité et d’ergonomie : les utilisateurs complètent ainsi les formulaires sans avoir de doute sur le caractère obligatoire ou optionnel de chaque champ.

Si un champ obligatoire n’est pas renseigné, une erreur sera remontée à la soumission du formulaire. Pour en savoir plus, vous pouvez vous référer à la guideline sur les formulaires.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=1418:17861">

</design>

### Inactif

Un champ inactif indique qu'un champ de saisie existe, mais qu'il n'est pas disponible dans ce contexte, à un instant donné. Cela peut être utilisé pour maintenir la continuité de la mise en page et indiquer qu'un champ peut devenir disponible ultérieurement.

**⚠️**  Un champ inactif ne peut pas porter de placeholder.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=1418:17877">

</design>

### Compteur de caractères

Le compteur de caractère affiche le nombre de caractères saisis dans ce champ. Il est utilisé pour aider les utilisateurs à respecter des limites de longueur de texte ou à surveiller la quantité de texte soumise.

Lorsque cette limite est atteinte ou dépassée, le compteur s’affiche avec la couleur Critical. Si l’utilisateur ne corrige pas sa saisie et sort du champ, alors le champ passe en erreur.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=2234:15981">

</design>

### Read-only

L’affichage en read-only d’un Textarea peut se faire de plusieurs manière :

* Via un affichage en texte simple dans le cadre d’un formulaire simple, lorsque le texte ne correspond pas à un commentaire d’une personne (cf. “Résumé de la formation”),

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=2908:4817">

</design>

* Via le composant Comment si le Textarea permettait à l’utilisateur de commenter quelque chose (une dépense, une saisie des temps, etc.).

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5759:154639">

</design>

## Comportement

### Hauteur par défaut

La hauteur du Textarea est fixe par défaut, c’est ce qui permet de le différencier visuellement du composant Textfield. Cette hauteur correspond à 3 lignes.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=1418:20779">

</design>

Lorsque le contenu est plus long, une barre de scroll s’affiche dans le composant permettant ainsi à l’utilisateur de consulter l’entièreté du message.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=2234:15921">

</design>

### Redimensionnement manuel

S’il le souhaite, l’utilisateur peut manuellement agrandir le champ verticalement pour optimiser son espace de saisie. À noter que le champ est redimensionnable verticalement mais pas horizontalement, cela permet d’éviter les effets de bords sur le reste de l’interface.

L’utilisateur ne pourra pas donner une hauteur plus petite que celle par défaut (3 lignes de texte).

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=2234:15941">

</design>

### Hauteur spécifique

Il est possible de donner une hauteur spécifique au composant si cela est nécessaire dans un contexte donné, si on attend de l’utilisateur une quantité importante de texte. Cela doit rester un cas à la marge. La hauteur minimale du champ est définie à 2 lignes.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=2241:31551">

</design>

### Redimensionnement automatique

Dans certains contexte, il est possible d’activer cette option. Le Textarea se redimensionne automatiquement lorsque l’utilisateur saisit son texte.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=4296:1293">

</design>

## Règles d'utilisation

### **Textarea vs Textfield**

Le format de la donnée attendue permet de choisir entre les deux composants. Le Textfield permet de renseigner un très court texte là où le Textarea permet de saisir une plus grande quantité de texte.

- **Do** : Utilisons le Textarea pour la saisie d’un texte libre un peu long.
- **Don't** : N’utilisons le Textfield que pour des saisies très courtes. Il est inadapté à des contenus sur plusieurs lignes.

### **Textarea vs Rich textfield**

Si le contexte ne nécessite pas de pouvoir formater du texte (graisse, italique, tailles, etc.) alors il faut utiliser le composant Textarea.

- **Do** : Utilisons le Rich textfield lorsque l’utilisateur a besoin de mise en forme (gras, listes, liens…).
- **Don't** : N'utilisons pas un Textarea si le contenu nécessite une structure ou une hiérarchie visuelle.

### Choisir une largeur appropriée

La largeur doit être basée sur la grille et prendre la largeur maximale possible (4 colonnes). En savoir plus sur la construction d’un formulaire.

- **Do** : Utilisons toujours  la largeur maximale disponible dans la grille du formulaire (souvent 4 colonnes) pour une meilleure lisibilité.
- **Don't** : Ne restreignons pas la largeur du Textarea sans raison : cela nuit au confort de lecture et de saisie.
