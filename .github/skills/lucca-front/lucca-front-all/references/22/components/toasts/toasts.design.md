# toasts — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/12eaab)

# Design

## Anatomie

## Cas d'usage

### Annulation d’une action

Lorsqu’une action est réversible dans un un court délai il est possible d’afficher un Toast pour que l’utilisateur puisse annuler son action de manière simple.

### Erreur suite à une action de l’utilisateur

Le Toast est un bon moyen pour alerter l’utilisateur quand l’action qu’il vient de réaliser rencontre une erreur. Cela est aussi valable dans le cas d’un enregistrement automatique.

### En résultat à une action asynchrone

Le Toast est particulièrement utile pour informer l’utilisateur du résultat d’une action asynchrone. Il notifie du succès ou de l’échec d’une action, offrant un feedback rapide et non intrusif, alors que l’utilisateur a continué sa navigation.

### N'en abusons pas

Le Toast distrait l'utilisateur car il s'affiche par dessus la page, loin de la zone de l'action (donc loin du locus of attention). Il peut masquer du contenu utile de la page.

Dans le cas d’une action synchrone ou si le feedback peut être fait directement en contexte, préférer un autre comportement de feedback.

## Comportement

### Durée d'affichage

Les Toasts d’erreurs doivent être fermés par l’utilisateur. Cela permet d'augmenter les chances de lecture du message.

Les autres Toasts ont une durée d’affichage de 5 secondes minimum. Si le message est long et mérite toute l’attention de l’utilisateur, le délai peut être prolongé.

### Positionnement

Les Toasts s’affichent en bas à droite de l’écran. C’est là que se trouvent les actions d’enregistrement de manière générale.

### Empilement

Si l’utilisateur clique à répétition sur un bouton qui entraine une erreur, plusieurs Toasts peuvent s’empiler sur l’interface.

# Content

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
