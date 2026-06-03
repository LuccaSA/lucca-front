# toasts — Design

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
