# statusbadge — Design

## Anatomie

## Options

### Plusieurs tailles disponibles

Le composant existe en deux tailles. La taille par défaut est la plus petite, c’est celle utilisée dans la grande majorité des cas. Lorsqu’un *status-badge* doit se placer à côté d’un titre de niveau 1 ou 2 (titre de page ou de section), il est conseillé d’utiliser la plus grande taille pour garantir une meilleure lisibilité.

### Des couleurs sémantiques

Le *status-badge* doit être utilisé avec les couleurs proposées. Chaque couleur à une signification et appuie le message porté par le statut.

| Neutral | État inactif, l'utilisateur n'a rien à faire. Cela peut correspondre à un état final d’un processus annulé ou refusé. |
| --- | --- |
| Ongoing / Pending | Processus en cours, nécessite une action d’un utilisateur pour continuer le processus. Il peut s’agir de l’utilisateur connecté ou d’un autre collaborateur. Le texte marque la différence entre les deux statuts. |
| Warning | Processus en cours mais la ressource nécessite une attention particulière. |
| Error  | Processus bloqué en raison d’une erreur. La ressource nécessite une correction de la part de l’utilisateur. |
| Success | Étape finale d’un processus dans son bon déroulement. |

## Règles d'usage

### On ne s’écarte pas du design proposé

Le *status badge* ne peut vivre qu’avec le design proposé par le Design System. Il est interdit de le faire vivre sans son point ni sans son texte. De la même manière, le fond de couleur appuie le message, il est donc conseillé de ne pas l’enlever.

### Un seul statut par ressource

Une ressource ne peut porter qu’un seul statut. Si cette ressource s’inscrit simultanément dans plusieurs processus ou états, il peut-être utile de différencier les deux états en utilisant des onglets.

Lorsqu'un index table est affiché dans une vue filtrée sur un statut, il ne faut pas répéter ce dernier dans le tableau afin d'éviter une surcharge et une redondance d'informations.

### Positionnement dans un tableau

Dans le cas d’un *index table*, le statut doit être porté dans une colonne prévue à cette effet. Cette colonne doit se trouver vers la gauche du tableau, proche de l’identifiant de la ressource.

### Positionnement en dehors d’un tableau

Le statut doit systématiquement être juxtaposé au nom de la ressource qui le porte. Cela facilite la lecture et permet de rapidement lier la ressource et son statut.

### Comportement

#### Non cliquable

Le *status badge* n’est pas cliquable. Il représente une information lié à la ressource qui le porte, c’est donc cette ressource qui est cliquable. Le statut d’une ressource évolue au cours de son processus de vie et des actions attendues de la part des collaborateurs impliqués dans ce processus.

#### Survol

Il est conseillé d’afficher un *popover* au survol de *status badge* pour donner plus de contexte. De cette manière l’utilisateur peut savoir pourquoi la ressource porte ce statut et les actions en attente (de lui ou d’un autre collaborateur) pour avancer dans la processus.

#### Débordement

Lorsque la largeur du *status badge* est contrainte (par son conteneur notamment), il est conseillé d’ellipser le texte plutôt que de passer à la ligne. Dans ce cas, l’ensemble du texte est lisible depuis le *popover* au survol.
