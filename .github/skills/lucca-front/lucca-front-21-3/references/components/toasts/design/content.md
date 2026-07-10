# toasts — Content

## Contenu & rédaction

### Un contenu clair et concis

Pas de titre, ni de bouton d'action requis pour ce composant. 

Utilisons une phrase courte, à la tonalité neutre pour décrire ce qui se passe de la manière la plus succincte possible. L’utilisateur doit pouvoir lire rapidement ce message.

- **Do** : Formulons un message simple, informatif et sans surcharge de détails inutiles.
- **Don't** : Ne surchargeons pas avec des informations secondaires qui apportent plus de complexité au message.
- **Do** : Allons droit au but, en exprimant la contrainte ou l’erreur de manière claire, sans détour.
- **Don't** : Évitons les formulations longues, techniques ou inutiles qui alourdissent le message.

### En cas d'action asynchrone

Lorsque le Toast s’affiche à la suite d’une action asynchrone, il est important de préciser quelle action a été réalisée, en indiquant clairement ce qu’il peut faire ensuite.

- **Do** : Précisons clairement ce qui a été généré et où l’utilisateur peut le retrouver.
- **Don't** : Ne restons pas trop vague. Un message comme « Le document a été généré » ne permet pas à l’utilisateur de savoir de quel document il s’agit ni où le trouver.

### Les messages d’erreur

Il faut fournir un message explicite et actionnable. Un Toast d’erreur efficace inclut une brève explication de la cause de l’échec (ex : “Pas de connexion réseau”).

Il inclut, si possible, une suggestion de solution ou un lien vers une action corrective.

N’employons pas de ton encourageant ni décontracté, restons très direct.

- **Do** : Expliquons la cause de l’erreur de façon compréhensible, et idéalement proposer une solution ou un contact.
- **Don't** : N'utilisons pas une formulation générique et peu exploitable. L’utilisateur ne saura pas quoi faire pour corriger l’erreur.
