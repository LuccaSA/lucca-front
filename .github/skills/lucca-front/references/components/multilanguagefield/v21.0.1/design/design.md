# multilanguagefield — Design

## Anatomie

**Anatomie**

**Anatomie**

<notes>

1. **Label :** Le label du champ doit indiquer quel type d'information le champ requiert.
2. **Champ de saisie :** Le champ dans lequel les utilisateurs cliquent pour saisir du texte. La valeur saisie dans ce champ sera appliquée pour les langues qui ne sont pas renseignées dans le Popover.
3. **Message d’aide (Inline message) :** Le message d’aide est optionnel. Il permet de fournir des informations supplémentaires à l’utilisateur pour l’aider à compléter le champ.
4. **Bouton :** Le bouton placé dans le champ permet d’ouvrir un Popover.
5. **Popover :** Le Popover contient un ensemble de Textfield. Chaque Textfield correspond à une locale traduisible.

</notes>

---

## Options

### Champ obligatoire

Les champs obligatoires doivent être signalés explicitement aux utilisateurs. C’est à la fois une recommandation d’accessibilité et d’ergonomie : les utilisateurs complètent ainsi les formulaires sans avoir de doute sur le caractère obligatoire ou optionnel de chaque champ.

Si un champ obligatoire n’est pas renseigné, une erreur sera remontée à la soumission du formulaire. Pour en savoir plus, vous pouvez vous référer à la guideline sur les formulaires.

**Required - Picture**

**Required - Picture**

### Message d'aide

Un Multilanguage textfield peut comporter deux messages d'aide pour fournir des informations contextuelles supplémentaires ou des instructions sur ce que l'utilisateur doit saisir.

* L’utilisation d’une icône juxtaposée au Label permet de clarifier l'intitulé du champ via un tooltip lorsque cela est nécessaire.
* Situé sous le champ, le message d’aide fournit une description informative pour donner plus de contexte à l'utilisateur sur ce qu'il doit saisir.

À noter que le Tooltip au survol de l’icône est inaccessible lorsque le Popover est ouvert.

**Helper message - Picture**

**Helper message - Picture**

### Inactif

Un champ inactif indique qu'un champ de saisie existe, mais qu'il n'est pas disponible dans ce contexte, à un instant donné. Cela peut être utilisé pour maintenir la continuité de la mise en page et indiquer qu'un champ peut devenir disponible ultérieurement.

⚠️  Un champ inactif ne peut pas porter de Placeholder, le champ est soit vide, soit rempli.

**Disable - Picture**

**Disable - Picture**

Le bouton dans le champ reste cliquable pour permettre à l’utilisateur de consulter les traductions renseignées.

**Disable - Picture (Popover)**

**Disable - Picture (Popover)**

### Traduction automatique (non disponible pour le moment)

Il est envisagé de pouvoir traduire automatiquement toutes les langues disponibles en cliquant sur des boutons prévus à cet effet.

⚠️  Design non contractuel, travail toujours en cours.

**AI - Picture**

**AI - Picture**

---

## Comportement

### Navigation à la souris

L’utilisateur peut saisir une valeur directement dans le champ de saisie. Cette valeur “Invariant” est considérée comme valeur par défaut, il s’agit donc du texte qui sera affiché pour toutes les langues non-renseignées.

**Overflow - Picture 1**

**Overflow - Picture 1**

En revanche, l’utilisateur peut accéder aux champs de traduction en cliquant sur l’icône situé dans le champ principal. Un Popover apparaît pour laisser l’utilisateur saisir les différentes locales proposées.

**Overflow - Picture 2**

**Overflow - Picture 2**

### Navigation au clavier

Pour les utilisateurs préférants une navigation au clavier, il est tout à fait possible de saisir aussi bien dans le champ principal que dans les champs de traduction à l’intérieur du Popover.

**Overflow - Picture 1**

**Overflow - Picture 1**

Le bouton est accessible au clavier via la touche de tabulation et la touche “Entrée” permet d’ouvrir/fermer le Popover de traduction.

**Overflow - Picture 2**

**Overflow - Picture 2**

### Défilement vertical

Par défaut, le Popover affiche tout son contenu. Si l'espace disponible est insuffisant, une barre de défilement apparaît à l'intérieur du Popover.

**Scroll - Picture**

**Scroll - Picture**

### Débordement

Lorsque l’utilisateur saisit une valeur plus longue que l’espace disponible, le curseur reste à droite pour permettre à l’utilisateur de voir le texte qu’il est en train d’écrire.

Une fois le champ quitté, le texte est tronqué mais reste accessible via un Tooltip au survol.

**Overflow - Picture 1**

**Overflow - Picture 1**

Le comportement est similaire pour les Textfield présents à l’intérieur du Popover. À noter que le Tooltip au survol du champ “invariant” est inaccessible lorsque le Popover est ouvert.

**Overflow - Picture 2**

**Overflow - Picture 2**

### États spécifiques (erreur, avertissement, succès)

Le message d'erreur s'affiche lorsque les exigences du champ ne sont pas remplies, incitant l'utilisateur à corriger ou à modifier sa saisie initiale. Pour en savoir plus sur le déclenchement des erreurs, une guideline existe à ce sujet. Si un message d'aide était présent, le texte du message d'erreur doit fournir les mêmes informations que le message d'aide, en plus d’expliciter l’erreur.

**States - Error - Picture**

**States - Error - Picture**

La valeur “Invariant” étant considérée comme obligatoire, si elle n’est pas renseignée mais que toutes les traductions sont renseignées, alors le champ sera en erreur.

**Required - Picture**

**Required - Picture**

Le message d'avertissement est affiché pour alerter l'utilisateur qu'une donnée ou un champ particulier peut avoir des conséquences sur le formulaire. Contrairement à une erreur, l'état d'avertissement ne bloque pas l'utilisateur dans la validation du formulaire. Si un message d'aide était présent, le texte du message d’avertissement doit fournir les mêmes informations que le message d'aide, en plus d’expliciter l’avertissement.

**States - Warning - Picture**

**States - Warning - Picture**

Le message de validité s'affiche pour rassurer l'utilisateur sur les données renseignées ou recherchées automatiquement. Par exemple, après un appel API pour vérifier si un IBAN existe.Le message de validité est placé sous le champ. Si un message d'aide était présent, il est remplacé par le message de succès.

**States - Success - Picture**

**States - Success - Picture**

---

## Règles d'utilisation 

### Toujours afficher le label

Chaque Multilanguage textfield doit avoir un Label. Un Multilanguage textfield sans Label est ambigu et non accessible. Le Placeholder ne doit pas remplacer le Label.

**Label - Picture**

**Label - Picture**

### Écrire un label court et précis

Le Label doit être le plus succinct possible. S’il est difficile de réduire le texte à quelques mots, le label peut alors dépasser la largeur du champ si l’espace est suffisant et qu’aucun champ ne se trouve à sa droite. Dans le cas contraire, le label peut être affiché sur plusieurs lignes.

**Label length - Picture**

**Label length - Picture**

### Choisir une largeur appropriée

La largeur doit être basée sur la grille de construction d’un formulaire.

Le contenu pouvant être plus ou moins grand en fonction de la langue, il est conseillé de donner au champ une largeur de 3 ou 4 colonnes pour garantir une utilisation optimale.

**Field width - Picture**

**Field width - Picture**

### Effacer le contenu du champ

Il ne faut pas utiliser le composant Clear dans les Multilanguage textfield, cela alourdit grandement les formulaires. Il est préférable de laisser l’utilisateur effacer sa saisie manuellement.

**Clear - Picture**

**Clear - Picture**

Il en va de même dans les Textfield situés à l’intérieur du Popover.

**Clear - Picture (Popover)**

**Clear - Picture (Popover)**

### Utilisation dans les titres de page

Le Multilanguage textfield ne doit pas être utilisé pour changer le titre d’une interface. Il faut pour cela privilégier une Dialog de modification.

**Title - Picture**

**Title - Picture**
