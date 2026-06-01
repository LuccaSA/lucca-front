# textfield — Design

## Anatomie

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=556:16944">

**Anatomie**

**Anatomie**

<notes>

1. **Label :** Le label du champ doit indiquer quel type d'information le champ requiert.
2. **Champ de saisie :** Le champ dans lequel les utilisateurs cliquent pour saisir du texte.
3. **Message d’aide (Inline message) :** Le message d’aide est optionnel. Il permet de fournir des informations supplémentaires à l’utilisateur pour l’aider à compléter le champ.

</notes>

</design>

## Options

### Placeholder 

L'utilisation d'un *Placeholder* est facultative. Son utilisation peut donner à l'utilisateur une indication sur le format ou un exemple de la donnée attendue.

Il est conseillé d'utiliser en premier lieu l'option de message d'aide pour éviter une perte d'indication suite à un clic dans le champ.

Le *Placeholder* ne doit pas répéter le label.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=577:16542">

**Placeholder - Picture**

**Placeholder - Picture**

</design>

### Message d'aide

Un *Textfield* peut comporter deux messages d'aide pour fournir des informations contextuelles supplémentaires ou des instructions sur ce que l'utilisateur doit saisir.

1. L’utilisation d’une icône juxtaposée au *Label* permet de clarifier l'intitulé du champ via un *Tooltip* lorsque cela est nécessaire.
2. Situé sous le champ, le message d’aide fournit une description informative pour donner plus de contexte à l'utilisateur sur ce qu'il doit saisir.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=577:16552">

**Helper message - Picture**

**Helper message - Picture**

</design>

### Champ obligatoire

Les champs obligatoires doivent être signalés explicitement aux utilisateurs. C’est à la fois une recommandation d’accessibilité et d’ergonomie : les utilisateurs complètent ainsi les formulaires sans avoir de doute sur le caractère obligatoire ou optionnel de chaque champ.

Si un champ obligatoire n’est pas renseigné, une erreur sera remontée à la soumission du formulaire. Pour en savoir plus, vous pouvez vous référer à la guideline sur les formulaires.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=577:16567">

**Required - Picture**

**Required - Picture**

</design>

### Inactif

Un champ inactif indique qu'un champ de saisie existe, mais qu'il n'est pas disponible dans ce contexte, à un instant donné. Cela peut être utilisé pour maintenir la continuité de la mise en page et indiquer qu'un champ peut devenir disponible ultérieurement.

Un champ inactif ne peut pas porter de *Placeholder*, le champ est soit vide, soit rempli.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=577:16584">

**Disable - Picture**

**Disable - Picture**

</design>

### Préfixe et suffixe

L’utilisation de préfixes et de suffixes permet de fournir des indications contextuelles à l’utilisateur. Par exemple, un préfixe peut être utilisé pour indiquer une devise (comme "$" pour les dollars), tandis qu'un suffixe peut spécifier une unité de mesure (comme "cm" pour centimètres). Ils contribuent à améliorer la lisibilité et la compréhension des données entrées dans le champ de texte.

Si l’unité peut-être modifiée, cela doit se faire via un composant Select au sein du formulaire, juxtaposé au *Textfield*.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=556:16953">

**Prefix & suffix - Default - Picture**

**Prefix & suffix - Default - Picture**

</design>

### Icône

Une icône peut être affichée en suffixe pour expliciter la nature du champ et ce que l’utilisateur peut ou doit faire. C’est notamment dans le cas d’un champ de recherche.

L’icône peut aussi être cliquable lorsque l’utilisateur peut interagir avec le champ. C’est notamment le cas du champ de saisie de mot de passe (pour afficher/masquer la saisie).

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=584:18090">

**Icon - Picture**

**Icon - Picture**

</design>

### Compteur de caractères

Le compteur de caractère affiche le nombre de caractères saisis dans ce champ. Il est utilisé pour aider les utilisateurs à respecter des limites de longueur de texte ou à surveiller la quantité de texte soumise.

Lorsque cette limite est atteinte ou dépassée, le compteur s’affiche avec la couleur *Critical*. Si l’utilisateur ne corrige pas sa saisie et sort du champ, alors le champ passe en erreur.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=580:17520">

**Characters counter - Picture**

**Characters counter - Picture**

</design>

### Champ nombre

Lorsqu’on attend de l’utilisateur qu’il saisissent une donnée numérique, il est possible d’afficher des flèches pour incrémenter/décrémenter en suivant un pas défini.

Le rendu des boutons d’incrémentation sont natifs et diffère donc d’un navigateur à l’autre.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3253:4612">

**Number - Picture**

**Number - Picture**

</design>

## Comportement

### Débordement

Lorsque l’utilisateur saisit une valeur plus longue que l’espace disponible, le curseur reste à droite pour permettre à l’utilisateur de voir le texte qu’il est en train d’écrire.

Une fois le champ quitté, le texte est tronqué mais reste accessible via un *Tooltip* au survol.

Si on attend de l’utilisateur qu’il saisisse une plus importante quantité de texte, il est préférable d’utiliser le composant *Textarea*.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=1418:17753">

**Overflow - Picture**

**Overflow - Picture**

</design>

### États spécifiques (erreur, avertissement, succès)

Le **message d'erreur** s'affiche lorsque les exigences du champ ne sont pas remplies, incitant l'utilisateur à corriger ou à modifier sa saisie initiale. Pour en savoir plus sur le déclenchement des erreurs, une guideline existe à ce sujet. Si un message d'aide était présent, le texte du message d'erreur doit fournir les mêmes informations que le message d'aide, en plus d’expliciter l’erreur.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=581:17783">

**States - Error - Picture**

**States - Error - Picture**

</design>

Le **message d'avertissement** est affiché pour alerter l'utilisateur qu'une donnée ou un champ particulier peut avoir des conséquences sur le formulaire. Contrairement à une erreur, l'état d'avertissement ne bloque pas l'utilisateur dans la validation du formulaire. Si un message d'aide était présent, le texte du message d’avertissement doit fournir les mêmes informations que le message d'aide, en plus d’expliciter l’avertissement.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=581:17788">

**States - Warning - Picture**

**States - Warning - Picture**

</design>

Le **message de validité** s'affiche pour rassurer l'utilisateur sur les données renseignées ou recherchées automatiquement. Par exemple, après un appel API pour vérifier si un IBAN existe.Le message de validité est placé sous le champ. Si un message d'aide était présent, il est remplacé par le message de succès.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=581:17793">

**States - Success - Picture**

**States - Success - Picture**

</design>

## Règles d'utilisation

### Toujours afficher le label

Chaque *Textfield* doit avoir un *Label*. Un *Textfield* sans Label est ambigu et non accessible. Le *Placeholder* ne doit pas remplacer le *Label*.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=585:18416">

**Label - Picture**

**Label - Picture**

</design>

Les champs de recherche peuvent cependant être utilisé sans *Label*. L’icône de loupe étant devenu un élément récurrent des interfaces web. En revanche, l’utilisation d’un *Placeholder* est obligatoire.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=2476:5759">

**Label (Search) - Picture**

**Label (Search) - Picture**

</design>

### Écrire un label court et précis

Le Label doit être le plus succinct possible. S’il est difficile de réduire le texte à quelques mots, le *Label* peut alors dépasser la largeur du champ si l’espace est suffisant et qu’aucun champ ne se trouve à sa droite. Dans le cas contraire, le *Label* peut être affiché sur plusieurs lignes.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=1407:6041">

**Label length - Picture**

**Label length - Picture**

</design>

### Textfield ou Textarea

Le format de la donnée attendue permet de choisir entre les deux composants. Le *Textfield* permet de renseigner un très court texte là où le *Textarea* permet de saisir une plus grande quantité de texte.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3253:25419">

**Textarea vs Textfield - Picture**

**Textarea vs Textfield - Picture**

</design>

### Choisir une largeur appropriée

La largeur du champ indique à l’utilisateur le format de la donnée attendue.

Lorsque le champ vit seul, sa largeur peut être personnalisée en prenant en compte les problématiques d’internationalisation.

Dans le cas d’une utilisation au sein d’un formulaire, la largeur doit être basée sur la grille et doit être aussi proche que possible de la taille maximale de la valeur attendue. En savoir plus sur la construction d’un formulaire.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=585:18304">

**Field width - Picture**

**Field width - Picture**

</design>

### Effacer le contenu du champ

Il ne faut pas utiliser le composant *Clear* dans les *Textfield*, cela alourdit grandement les formulaires. Il est préférable de laisser l’utilisateur effacer sa saisie manuellement.

Exception cependant pour les champs de recherche. L’utilisateur doit pouvoir rapidement effacer sa recherche pour réinitialiser le contenu de l’interface qu’il consulte. Le *Clear* n’apparaît que lorsqu’une valeur est saisie dans le champ de recherche.

Le bouton *Clear* ne doit apparaître que lorsque l’utilisateur a saisit quelque chose.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3229:38562">

**Clear - Picture**

**Clear - Picture**

</design>

### Alignement du contenu à droite

Il est possible de ferrer le texte à droite, notamment pour les données numériques lorsqu’un *Textfield* est affiché dans un tableau. Cela est aussi valable lorsque le *Textfield* contient un préfixe.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=2477:8523">

**Right align - Picture**

**Right align - Picture**

</design>

### Utilisation dans un tableau

Lorsque des champs de texte sont présents dans un *Data table*, ils doivent être en taille M pour garder une cohérence visuelle avec la taille de texte du reste des informations sur tableau.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=2607:1849">

**Table - Picture**

**Table - Picture**

</design>

### Utilisation dans les titres

Le *Textfield* ne doit pas être utilisé pour changer le titre d’une interface. Il faut pour cela privilégier une *Dialog* de modification.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3279:2485">

**Title - Picture**

**Title - Picture**

</design>
