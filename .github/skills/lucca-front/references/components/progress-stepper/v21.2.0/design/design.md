# progress-stepper — Design

**Mots-clés :**timeline, steps, étapes

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

**Anatomie**

**Anatomie**

<notes>

1. Conteneur 

2. Label 

3. Ligne de liaison

</notes>

---

## Nombre d'étapes

Le choix du nombre d'étapes est crucial pour maintenir l'engagement de l'utilisateur sans le décourager.

Le Stepper doit comporter au minimum 2 étapes et au maximum 6 étapes.

Au-delà de 6 étapes la charge cognitive devient trop élevée pour l'utilisateur. Il est impératif de simplifier le processus ou de le découper en sous-tâches plus petites au sein des étapes existantes.

Pour en savoir plus, consulter la guideline sur les parcours de création de ressource.

---

## États

### Étapes passées

L'utilisateur a déjà visité cette étape.

* Validé : l'indicateur affiche une icône "Check" dans le conteneur à la place du numéro de l’étape. C'est l'état par défaut d'une étape terminée avec succès.
* En attente (*pending*) : si l'utilisateur quitte une étape sans la terminer complètement, elle conserve son numéro mais affiche un style "visité" pour indiquer qu'elle est incomplète.
* En erreur : si l’utilisateur change d’étape et qu'une erreur critique est détectée après coup, le numéro est remplacé par une icône "Exit" rouge.

### Étape actuelle

C’est l'étape où se trouve l'utilisateur. Il peut y avoir qu’une seule étape actuelle à la fois.

- **Do** : La première étape doit être immédiatement en état current dès l'ouverture du parcours.

### Étapes futures

Ce sont les étapes non encore atteintes, elles peuvent parfois être déjà validés car elle ne nécessite pas d’action de l’utilisateur.

---

## Comportement

### Navigation

L’utilisateur peut revenir aux étapes précédentes en cliquant sur l’étape dans le stepper. Il peut également peut naviguer dans le futur avec la stepper si celui-ci est inscrit dans un parcours non-linéaire.

### Ellipse

Si un titre d'étape est trop long pour être affiché entièrement, nous tronquons le texte et nous affichons un tooltip pour que l’utilisateur puisse lire l'intégralité du texte au survol.

- **Do** : Tronquons le texte lorsque celui-ci ne peut être affiché entièrement. L’apparition d’un tooltip au survol permet de lire l’intégralité du titre de l’étape.
- **Don't** : Ne revenons pas à la ligne pour afficher les textes ou mots trop long.
