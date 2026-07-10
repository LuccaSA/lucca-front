# fileentry — Design

**Mots-clés :**upload, téléchargement, fichier, pièce jointe

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

Le composant est disponible en deux tailles :

* La **taille S**, la plus courante, doit être utilisée dans la majorité des formulaires. Elle permet de sélectionner un fichier ou plusieurs en les présentant directement sous le champ. Cette taille ne doit pas être utilisée pour afficher un aperçu du document sélectionné.
* La **taille M**, moins utilisée, principalement en début de parcours lorsque l'import d'un document lance un processus d'analyse. Cette taille peut aussi être utilisée dans les formulaire, s'il est intéressant de visualiser un aperçu du fichier sélectionné (une image ou un pdf).

## Cas d’usage

### Formulaire

Utilisé dans un formulaire, le composant File upload nécessite un bouton de validation en bas du formulaire. La **taille S** est a privilégier pour gagner en densité.

Lorsque l’import de fichier est l’élément central d’une interface ou d’un formulaire, il est possible d’utiliser la **taille M** pour lui donner plus d’importance. Il peut aussi être positionné sur la gauche du formulaire.

Cette spécificité est intéressante pour pouvoir afficher un document de type média, consultable par l’utilisateur.

#### Import de fichier unique

Lorsqu’un fichier est importé, il est représenté par le composant File entry en lieu et place de la zone de sélection de fichier.

Si l’utilisateur souhaite changer de fichier, il doit supprimer le fichier chargé pour en sélectionner un nouveau.

Lorsque le contexte requiert un affichage du fichier importé, celui-ci s’affiche toujours via le composant File entry mais sous la forme de média.

À noter que si l’affichage du fichier requiert une navigation entre plusieurs pages ou encore une gestion du zoom, il s’agit alors d’un composant autre que File entry.

Si le format et/ou le poids du fichier sélectionné ne correspond pas aux critères requis, le fichier n’est pas importé et le champ s’affiche en erreur. Un message d’erreur permet d’expliquer à l’utilisateur les raisons de cette erreur.

#### Import de plusieurs fichiers

Lorsqu’il est possible d’importer plusieurs fichiers, le comportement est différent. Les fichiers s'affichent en-dessous de la zone d’import dans l'ordre de sélection. L’utilisateur peut à tout moment cliquer sur la zone d’import pour ajouter un ou plusieurs autres fichiers.

Un affichage spécifique en grille est possible quand on attend de l’utilisateur qu’il importe des images. Cela permet de donner un aperçu plus explicite des images sélectionnées et potentiellement de les réordonner.

Il est possible d’afficher les images dans un ordre chronologique si l’ordre à une importance dans un contexte donné.

En cas d'erreur sur le chargement d'un fichier (poids, format, erreur de connexion, etc.), le message d’erreur est porté par le fichier lui-même et non la zone d’import. L'utilisateur peut le supprimer manuellement et en importer un nouveau. S'il ne le supprime pas, une Dialog apparaitra à la soumission du formulaire pour indiquer que le ou les fichiers en erreurs ne seront pas importés.

#### Champ obligatoire

Si le champ est obligatoire et que l'utilisateur n’a importé aucun fichier, le champ s’affiche en erreur à la soumission du formulaire.

#### Fichier protégé

En cas de fichier protégé, l’utilisateur doit saisir et valider le mot de passe avant de pouvoir soumettre le formulaire.

Une fois le mot de passe validé, le fieldset contextuel disparait. Si le mot de passe saisi est erroné, un message d’erreur s’affiche sous le champ.

### Parcours d’analyse de document

L’import de fichier peut être le point de départ d’un parcours utilisateur, notamment dans le cas d’un import et d’une analyse de fichier. Dans ce contexte, la **taille M** est privilégiée, le composant pouvant prendre la largeur de l’interface.

L’analyse du document se lance automatiquement une fois le fichier sélectionné ou déposé dans la zone.

Des informations supplémentaires peuvent être demandées, ce cas d’usage se rapproche d’une utilisation dans un formulaire. Un bouton de soumission permet de lancer l’analyse du document importé.

## Illustrations

Le File upload utilise les Bubble Illustrations, permettant de guider l’utilisateur en illustrant clairement la zone d’upload et dynamiser l’interface pour rendre l’action plus engageante.

Cette illustration peut être modifiée en fonction de la nature des fichiers à importer (photographie, justificatif de dépense, archive, bulletins de paie, etc.).

## Comportement

### Principe de l’import temporaire

Lucca.Files permet de stocker temporairement un fichier pendant **180 minutes**. Durant cette période, l'utilisateur peut manipuler le fichier sans qu’il ne persiste sur Lucca.Files.

Si cette approche est privilégiée, un bouton de confirmation doit permettre de persister le fichier sur Lucca.Files (souvent le bouton de soumission du formulaire).

### Détection des erreurs

Les contraintes liées à l’import de fichier sont définies par le Produit :

* Poids du fichier
* Contrôle du type de fichier

Le Front est capable de remonter des erreurs avant que le fichier soit envoyé sur Lucca.Files. En revanche, l’analyse antivirus est faite au moment de l’import, des erreurs peuvent donc survenir à ce moment là sans pouvoir être anticipées par le Front.

### Aperçu des fichiers

L’aperçu des fichiers est possible directement en Front, mais certaines contraintes existent :

* Pour les PDF volumineux, seule la première page est affichée en image.
* Si le fichier est lourd, l’affichage peut prendre du temps.
