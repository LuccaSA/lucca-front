---
title: Toast
description: Le Toast est un composant permettant de faire un feedback en réaction à une action de l’utilisateur. Il permet d’annuler une action ou de donner plus d’information sur les raisons de l’échec d’une action.
---

# Design

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5762:157544">

**🖼️ Intro**

**🖼️ Intro**

**Style**

| Group | Name | Value |
| :--- | :--- | :--- |
| Borders | Weight | 1 px |
| Borders | Align | Outside |

**Attributes**

| Attribute | Value |
| :--- | :--- |
| Position | X: 0 px; Y: 0 px |
| Size | W: 960 px; H: 240 px |
| Opacity | 100% |
| Border radius | 8px |

</design>

#### Des questions, commentaires ou retours ?

Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

---

## Anatomie

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=4234:48275">

**🖼️ Anatomy**

**🖼️ Anatomy**

**Style**

| Group | Name | Value |
| :--- | :--- | :--- |
| Borders | Weight | 1 px |
| Borders | Align | Outside |

**Attributes**

| Attribute | Value |
| :--- | :--- |
| Position | X: 0 px; Y: 0 px |
| Size | W: 960 px; H: 248 px |
| Opacity | 100% |
| Border radius | 8px |

<notes>

1. **Icône et couleur de fond :** la combinaison de l'icône et de la couleur de fond indique le type de message (erreur, avertissement ou succès).
2. **Description :** elle explicite l’information ou le problème.
3. **Bouton de fermeture :** la croix de fermeture permet à l’utilisateur de fermer le toast.

</notes>

</design>

---

## Cas d'usage

### Annulation d’une action

Lorsqu’une action est réversible dans un un court délai il est possible d’afficher un Toast pour que l’utilisateur puisse annuler son action de manière simple.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=4234:48305">

**🖼️ Cancel**

**🖼️ Cancel**

**Style**

| Group | Name | Value |
| :--- | :--- | :--- |
| Borders | Weight | 1 px |
| Borders | Align | Outside |

**Attributes**

| Attribute | Value |
| :--- | :--- |
| Position | X: 0 px; Y: 0 px |
| Size | W: 960 px; H: 376 px |
| Opacity | 100% |
| Border radius | 8px |

</design>

### Erreur suite à une action de l’utilisateur

Le Toast est un bon moyen pour alerter l’utilisateur quand l’action qu’il vient de réaliser rencontre une erreur. Cela est aussi valable dans le cas d’un enregistrement automatique.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=4234:48332">

**🖼️ Error**

**🖼️ Error**

**Style**

| Group | Name | Value |
| :--- | :--- | :--- |
| Borders | Weight | 1 px |
| Borders | Align | Outside |

**Attributes**

| Attribute | Value |
| :--- | :--- |
| Position | X: 0 px; Y: 0 px |
| Size | W: 960 px; H: 376 px |
| Opacity | 100% |
| Border radius | 8px |

</design>

### En résultat à une action asynchrone

Le Toast est particulièrement utile pour informer l’utilisateur du résultat d’une action asynchrone. Il notifie du succès ou de l’échec d’une action, offrant un feedback rapide et non intrusif, alors que l’utilisateur a continué sa navigation.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=4234:48353">

**🖼️ Asynchrone**

**🖼️ Asynchrone**

**Style**

| Group | Name | Value |
| :--- | :--- | :--- |
| Borders | Weight | 1 px |
| Borders | Align | Outside |

**Attributes**

| Attribute | Value |
| :--- | :--- |
| Position | X: 0 px; Y: 0 px |
| Size | W: 960 px; H: 376 px |
| Opacity | 100% |
| Border radius | 8px |

</design>

### N'en abusons pas

Le Toast distrait l'utilisateur car il s'affiche par dessus la page, loin de la zone de l'action (donc loin du locus of attention). Il peut masquer du contenu utile de la page.

Dans le cas d’une action synchrone ou si le feedback peut être fait directement en contexte, préférer [un autre comportement de feedback](https://prisme.lucca.io/94310e217/p/833f79).

---

## Comportement

### Durée d'affichage

Les Toasts d’erreurs doivent être fermés par l’utilisateur. Cela permet d'augmenter les chances de lecture du message.

Les autres Toasts ont une durée d’affichage de 5 secondes minimum. Si le message est long et mérite toute l’attention de l’utilisateur, le délai peut être prolongé.

### Positionnement

Les Toasts s’affichent en bas à droite de l’écran. C’est là que se trouvent les actions d’enregistrement de manière générale.

### Empilement

Si l’utilisateur clique à répétition sur un bouton qui entraine une erreur, plusieurs Toasts peuvent s’empiler sur l’interface.

---

## Contenus associés

<shortcut_tiles>
<shortcut_tile url="https://prisme.lucca.io/94310e217/p/833f79" page-id="8108479">
**Feedback**
</shortcut_tile>

<shortcut_tile url="https://prisme.lucca.io/94310e217/p/64c8d8" page-id="8108357">
**Callout**
</shortcut_tile>

<shortcut_tile url="https://prisme.lucca.io/94310e217/p/133ac2">
**Erreurs dans les formulaires**
</shortcut_tile>
</shortcut_tiles>

# Content

## Contenu & rédaction

### Un contenu clair et concis

Pas de titre, ni de bouton d'action requis pour ce composant. 

Utilisons une phrase courte, à la tonalité neutre pour décrire ce qui se passe de la manière la plus succincte possible. L’utilisateur doit pouvoir lire rapidement ce message.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |  |   | Formulons un message simple, informatif et sans surcharge de détails inutiles. |
| Don't |  |   | Ne surchargeons pas avec des informations secondaires qui apportent plus de complexité au message. |
| Do |  |   | Allons droit au but, en exprimant la contrainte ou l’erreur de manière claire, sans détour. |
| Don't |  |   | Évitons les formulations longues, techniques ou inutiles qui alourdissent le message. |

### En cas d'action asynchrone

Lorsque le Toast s’affiche à la suite d’une action asynchrone, il est important de préciser quelle action a été réalisée, en indiquant clairement ce qu’il peut faire ensuite.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |  |   | Précisons clairement ce qui a été généré et où l’utilisateur peut le retrouver. |
| Don't |  |   | Ne restons pas trop vague. Un message comme « Le document a été généré » ne permet pas à l’utilisateur de savoir de quel document il s’agit ni où le trouver. |

### Les messages d’erreur

Il faut fournir un message explicite et actionnable. Un Toast d’erreur efficace inclut une brève explication de la cause de l’échec (ex : “Pas de connexion réseau”).

Il inclut, si possible, une suggestion de solution ou un lien vers une action corrective.

N’employons pas de ton encourageant ni décontracté, restons très direct.

| Rule | Image | Caption | Description |
| :--- | :--- | :--- | :--- |
| Do |  |   | Expliquons la cause de l’erreur de façon compréhensible, et idéalement proposer une solution ou un contact. |
| Don't |  |   | N'utilisons pas une formulation générique et peu exploitable. L’utilisateur ne saura pas quoi faire pour corriger l’erreur.
 |

# Angular

## Design

Les toasts servent à afficher une information ou un callback dans un coin de l'application.

[Basic](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-overlays-toasts--basic)
