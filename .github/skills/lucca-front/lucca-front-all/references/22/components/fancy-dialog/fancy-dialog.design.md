# fancy-dialog — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/32b1a9)

# Design

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

### Tailles

La Fancy dialog peut être utilisée en **deux tailles : M et L**.

Pour préserver la lisibilité de son contenu, évitons d’utiliser des tailles en dehors de ces deux options. En dessous, le contenu serait trop compressé et au-delà, il serait dispersé et difficile à lire.

## Cas d'usage

### Récapitulatif des actions réalisées

L'utilisateur a réalisé un parcours complexe, on lui confirme ce qui a été fait. Cela peut se faire via un texte descriptif simple ou une liste indiquant les actions réalisées.

À noter que dans le cas d’un parcours de création de ressource comprenant une étape récapitulative en fin de parcours, il n’est pas recommandé d’utiliser cette Fancy dialog une fois l’action de lancement finale réalisée, l’utilisateur ayant déjà pu vérifier l’intégralité des informations saisies.

Lorsque certaines actions n’ont pas fonctionné mais que l’utilisateur ne peut revenir en arrière, elles sont aussi affichées dans ce récapitulatif. Nous proposons donc à l’utilisateur des solutions pour corriger ce qui n’a pas été correctement réalisé.

- **Don't** : N’utilisons pas la Fancy dialog si le contenu n’apporte pas de valeur à l’utilisateur.

### Informations sur les prochaines étapes

Dans ce cas d’usage, l'utilisateur a déclenché une action qui va se poursuivre en dehors de l'interface ou implique d'autres utilisateurs. Nous l'informons de ce qui va se passer ensuite et des potentielles actions qu’il devra réaliser dans le futur.

Si l’utilisateur doit agir dès cette étape, alors on lui indique un bouton en `filled` pour l’inciter à réaliser cette action et on lui indique les différentes étapes à suivre.

### Installation ou souscription à un logiciel Lucca

Lorsqu’un utilisateur finalise l’installation d’un logiciel ou la souscription à une offre Lucca, nous le félicitons de cette action et nous lui proposons toujours une première action concrète à réaliser dans ce logiciel.

## Spécifications

### Illustration

Une illustration est toujours présente à droite pour égailler et appuyer le message. Les bulles situées en arrière-plan sont toujours les mêmes mais l’illustration s’affichant par-dessus varie suivant le contexte.

Le composant prévoit plusieurs illustrations génériques mais il est tout à fait possible d’utiliser une illustration personnalisée en respectant certaines règles :

* l’illustration ne doit pas dépasser **224 x 288px**,
* l’illustration comporte **entre 1 et 3 objets**.
* ces objets représentent le contexte de l’utilisateur à ce moment du parcours,
* n’utilisons pas les illustration de plantes, trop forte visuellement dans ce contexte,
* les confettis et les clés ne peuvent pas être utilisés dans des compositions personnalisées (usage réservé à l’installation d’un soft `install`)

# Content

## Contenu et rédaction

### Cas général

#### Titre

* L’énoncé du titre doit être factuel et précis pour informer l’utilisateur de l’action accomplie.
* N’utilisons pas "Bravo" ou"Félicitations” ni de question dans un titre.

#### Description

* La description doit contenir une ou deux informations maximum (1 phrase = 1 information).
* Il est possible de structurer le contenu en liste pour faciliter la lecture.
* Nous devons toujours proposer une suite à l’utilisateur (action, navigation).

#### Boutons d’action

| Nombre d'actions | Boutons affichés |
| --- | --- |
| Aucune action spécifique | Bouton « **Fermer** » en `outlined` |
| Une action spécifique | Bouton principal en `filled` |
| Bouton « **Fermer** » en `outlined` |   |
| Deux actions spécifiques | Bouton principal en `filled` |
| Bouton secondaire en `outlined` |   |

* Conformément aux règles sur les boutons d’actions, le bouton d’action principal se positionne avant le bouton secondaire, dans le sens de lecture.
* La croix de fermeture est toujours présente.

- **Do** : Le titre doit informer l’utilisateur de l’action accomplie.
- **Don't** : N’utilisons pas “Félicitations” en titre.

### Cas particulier d’un succès partiel

* Le contenu doit être orienté solution, sans formules négatives
* Signalons ce qui n'a pas fonctionné.
* Proposons action concrète

- **Do** : Signalons ce qui n’a pas fonctionné et proposons une action concrète à l’utilisateur.
- **Don't** : Évitons les formulations négatives et ne laissons pas l’utilisateur dans une impasse.
