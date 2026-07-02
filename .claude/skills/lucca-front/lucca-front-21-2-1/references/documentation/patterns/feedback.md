# Feedback

# Content

## Animations

Dans de nombreux cas, le feedback peut être intégré directement dans l'interface par l'apparition ou la disparition d'objets suite à une création, suppression ou un traitement spécifique sur l’objet. Cela permet une expérience plus fluide et évite la surcharge d'informations.

## Button

**Quand l'utiliser :**

* Pour informer l'utilisateur du succès de l'action initiée par le clic sur un bouton. Dans le cas d’une erreur, il faut privilégier l’affichage d’un Callout ou d'un Toast si l’erreur ne peut être mis en avant sur l’interface.

**Comment l'utiliser :**

* Changez l'apparence du bouton (couleur, texte, icône) pour indiquer l'état de l'action (en cours, succès).
* Utilisé dans une Dialog, ce feedback ne doit pas être doublé par l’affichage d’un Toast une fois la Dialog fermée.
* Dans le cas d’une erreur, le bouton vibre puis reprend son état actif. Un Callout ou un Toast est affiché pour donner plus d’information à l’utilisateur.
* Le feedback doit être affiché pendant un minimum de 500 ms. 

Pour en savoir plus, vous pouvez consulter la guideline sur le composant Button.

## Inline message

**Quand l'utiliser :**

* Dans les formulaires, pour indiquer l'état d'un champ spécifique, comme des erreurs de validation, des avertissements ou des succès pour confirmer un format spécifique.

**Comment l'utiliser :**

* Placez le message directement sous ou à côté de l'élément auquel il se rapporte.
* Utilisez une couleur et une icône appropriées pour indiquer la nature du message (succès, avertissement ou erreur).
* Gardez le message concis et clair, en fournissant des indications précises sur la façon de corriger une erreur

Pour en savoir plus, vous pouvez consulter la guideline sur le composant Inline message.

## Dialog

**Quand l'utiliser :**

* Pour des messages importants qui nécessitent une action immédiate de l'utilisateur.
* Pour des confirmations, des avertissements critiques, ou des informations qui nécessitent une interaction de l'utilisateur avant de continuer.

**Comment l'utiliser :**

* Positionnement au centre de l'écran avec un backdrop pour focaliser l'attention.
* Fournissez des boutons clairs pour les actions.
* Utilisez des titres et des messages clairs et concis.

Pour en savoir plus, vous pouvez consulter la guideline sur le composant Dialog. Si vous voulez en savoir plus sur les comportements attendus lorsqu’un objet est supprimé, vous pouvez consulter la guideline à ce sujet.

## Callout

**Quand l'utiliser :**

* Pour afficher un message nécessaire à une bonne utilisation du logiciel par l’utilisateur. Ce message ne doit pas être temporaire au risque de laisser l’utilisateur sans information.
* Pour attirer l'attention sur des informations importantes, voire critique.

**Comment l'utiliser :**

* Placez le Callout dans une position visible.
* Dans un footer, à côté des actions, pour informer l’utilisateur de certaines erreurs.
* Utilisez des couleurs et des icônes pour attirer l'attention sans perturber l'utilisateur.

Pour en savoir plus, vous pouvez consulter la guideline sur le composant Callout.

## Empty state

**Quand l'utiliser :**

* Lorsque des données ou des contenus sont absents ou non disponibles. Pour cela, deux options sont possibles en fonction du contexte : Les Empty State de section et ceux de début de parcours.
* Pour guider l'utilisateur sur ce qu'il doit faire.
* Pour indiquer à l’utilisateur qu’il a terminé de traiter une liste d’éléments.
* Pour indiquer à l’utilisateur qu’un accès est restreint.
* Pour une première connexion (encore en réflexion).

**Comment l'utiliser :**

* Fournissez des illustrations ou des icônes pour rendre l'état vide plus engageant.
* Ajoutez des instructions ou des suggestions sur ce que l'utilisateur doit faire ensuite.
* Incluez des boutons ou des liens pour des actions possibles.

Pour en savoir plus, vous pouvez consulter la guideline sur le composant Empty state.

## Toast

**Quand l'utiliser :**

* Pour confirmer visuellement une action hors du flux principal de l'utilisateur, lorsque l'objet modifié n'est pas visible dans la vue courante. Si l’objet est présent sur l’interface mais en hors de la zone visible, alors il faut privilégier une animation.
* Pour des notifications d’erreur suite à une action de l’utilisateur.
* Pour permettre à l’utilisateur d’annuler son action. Dans ce cas, le Toast contient un bouton “Annuler”.

**Comment l'utiliser :**

* Affichez le Toast brièvement en bas à droite de l'écran.
* Utilisez des couleurs et des icônes pour indiquer la nature du message (succès, erreur, information).
* Le Toast doit disparaître automatiquement après quelques secondes, mais permettre une fermeture manuelle est souhaitable. Dans le cas d’une erreur, il est préférable de ne pas le faire disparaître automatiquement

Pour en savoir plus, vous pouvez consulter la guideline sur le composant Toast.
