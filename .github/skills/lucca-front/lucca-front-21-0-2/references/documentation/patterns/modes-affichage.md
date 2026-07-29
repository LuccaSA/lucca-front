# Modes d'affichage

# Content

## États des champs de formulaire

### Champ éditable

C’est l’état par défaut du champ. L’utilisateur peut interagir avec le champ, saisir et modifier les données librement.

### Champ inactif

Un champ `disabled` est visible et non modifiable. Il ne peut pas recevoir le focus et n’est pas soumis lors de l’envoi du formulaire.

Cet état est utilisé pour désactiver temporairement un champ selon la logique métier, par exemple lorsqu’un champ doit être inactif pour des raisons de droits et exclu de la soumission.

### Champ en lecture seule

Un champ `readonly` est visible et non modifiable, mais il peut recevoir le focus et sa valeur est incluse lors de la soumission du formulaire.

Cet état est adapté pour afficher des données en lecture seule, comme des champs complétés automatiquement sur lesquels l'utilisateur n'a pas la main.

Son apparence est la même que celle du champ disabled.

### Champ en présentation

Un champ en présentation affiche la donnée sous forme de texte dur, c’est-à-dire un label accompagné de sa valeur, sans aucune possibilité d’édition.

Ce mode s'active via la propriété `presentation` à placer sur Form field (champ unique) ou Form (formulaire dans son intégralité). Le composant Data Presentation permet d'exploiter directement cette mise en forme sans passer par des champs de formulaire (exemple : Mode mixte).

## Modes d'affichage des formulaires

### Mode édition

Dans ce mode, tous les champs sont modifiables par l’utilisateur, sauf exceptions. Il est utilisé principalement pour la création ou la modification globale d’une ressource. Un bouton d’enregistrement unique permet de sauvegarder toutes les modifications du formulaire.

Certains champs peuvent être en état `disabled` ou `readonly` même en mode édition, selon la logique métier ou technique (ex. données calculées, données non modifiables pour des raisons de droits, etc.). La distinction entre ces deux états doit être respectée, même si leur apparence est identique.

### Mode présentation

Le formulaire affiche les données sous forme de simple texte (label + valeur) via les composants de formulaire en mode `presentation`. Un bouton permet de basculer l’ensemble du formulaire en mode édition.

Ce mode est adapté lorsque l’intérêt principal de la ressource est d’être consultée, tout en offrant à l’utilisateur, si ses droits le lui permette, une possibilité de modification.

### Mode mixte

Certaines sections du formulaire sont affichées en mode présentation, tandis que d’autres restent éditables. Chacune de ces sections possède son propre bouton de modification ouvrant une Dialog permettant de modifier les données.

Ces données sont affichées via le composant `DataPresentation` et non pas le mode `presentation` des champs de formulaire puisqu’elles ne sont pas modifiables *in-place*.

Ce mode convient lorsque certains regroupement de données complexes ont besoin d’être isolées pour éviter les erreurs de saisi ou lorsque ces données sont appelé depuis un autre endroit (paramètres globaux au logiciel par exemple) mais modifiables à ce moment du parcours.
