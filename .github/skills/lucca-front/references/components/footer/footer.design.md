# footer — Design Guidelines

**Sommaire**

- Design
  - Règles d’utilisation
    - Ordre d’affichage des boutons
    - Utilisation des icônes
  - Cas d'usage
    - Contenu non modifiable
    - Parcours de création de ressource
    - Dialog de confirmation d'abandon
    - Enregistrement automatique
    - Actions en masse
- Design (iOS)
  - Anatomie
  - Options
    - Bouton secondaire
    - Contenu additionnel
  - Cas d'usage
    - Parcours de création de ressource
    - Actions en masse
    - Filtres
  - Règles d'utilisation
    - Taille du Footer
    - Bouton Annuler
- Design (Android)
  - Anatomie
  - Options
    - Bouton secondaire
    - Contenu additionnel
  - Cas d'usage
    - Parcours de création de ressource
    - Actions en masse
    - Filtres
  - Règles d'utilisation
    - Taille du Footer
    - Bouton Annuler

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/419504)

# Design

**Mots-clés :**pied de page, layout

## Règles d’utilisation

### Ordre d’affichage des boutons

Pour garantir une navigation prévisible, nous distinguons deux zones d'interaction basées sur l'intention de l'utilisateur.

#### Le flux décisionnel (alignement à droite)

C'est la zone par défaut pour toutes les actions qui font progresser ou clôturent un processus. La lecture se fait de gauche à droite.

Le bouton principal est placé à gauche du groupe, suivi de l’action secondaire. Cette logique permet à l’utilisateur de se focaliser d’abord sur l’action prioritaire.

L’action de fermeture est toujours placée à l'extrême droite du Footer, en style `Ghost`.

En l’absence d’action métier forte, il se peut que le ou le bouton d’action principal porte le style `Outlined`en couleur `Product`.

#### La zone de rupture (alignement à gauche)

Cette zone accueille les actions qui sortent l'utilisateur du parcours de saisie actuel ou qui impactent l'existence même de la ressource.

Dans un parcours en étapes, le bouton pour revenir à l’étape précédente se trouve dans cette zone. Cela respecte la métaphore spatiale de lecture (gauche pour le passé, droite pour le futur).

L’actions de destruction doit être systématiquement isolée à l'extrême gauche. Cette rupture d'alignement sert de garde-fou visuel et physique (Fitts's Law) pour prévenir toute perte de donnée accidentelle.

Ce bouton doit être en `Outlined` et utiliser la palette `Critical`. L’intitulé du bouton doit être “Supprimer” accompagné de l’icône `trash-delete`.

#### Gestion de l’encombrement

Lorsque le nombre d'actions risque de nuire à la lisibilité ou de manquer d'espace, il est recommandé de ne garder visibles que les actions prioritaires et l'action de fermeture.

Les actions secondaires sont regroupées dans un menu contextuel.

### Utilisation des icônes

L'icône n'est pas un ornement. Nous ne l'utilisons jamais « pour faire joli ». C'est un signal fonctionnel qui doit rester rare pour garder son impact.

Par défaut, **nous n’affichons pas d’icône** dans les boutons d’action.

#### Cas exceptionnels

* Pour les actions destructives dans le but de renforcer le signal de danger et limiter les erreurs.
* Lorsque plusieurs actions secondaires sont disponibles et que nous souhaitons en mettre une en avant. Utiliser une icône universelle permet une identification instantanée avant même la lecture du label.

- **Do** : Utilisons l’icône comme repère cognitif. Elle permet à l'utilisateur de repérer instantanément une action dans une liste de boutons secondaires, sans avoir besoin de lire le Label
- **Don't** : Ne multiplions pas les icônes sur des actions secondaire. Cela sature l'interface. L’icône perd sa fonction de signal pour devenir un élément de décor parasite.
- **Don't** : N’utilisons pas d’icône sur le bouton principal. Il porte déjà toute l'emphase visuelle par sa couleur pleine. L'ajout d'une icône alourdit inutilement le bouton.

## Cas d'usage

### Contenu non modifiable

Certaines Dialogs n’ont qu’un but consultatif, il n’y a alors pas d’action à réaliser par l’utilisateur. 

Nous utilisons le verbe « **Fermer** » + la croix de fermeture pour que l’utilisateur puisse quitter la Dialog à tout moment.

Nous évitons « OK », ni « Compris ! » : ce n’est pas une action.

### Parcours de création de ressource

#### Sans action de diffusion

Un **parcours de création en formulaire simple ou long** permet de demander des informations à l’utilisateur en une seule étape.

Dans ce contexte le Footer comporte en général deux boutons : 

* « **{Infinitif} le/la {ressource}** » en `filled`
* « **Annuler** » pour que l’utilisateur puisse quitter le formulaire de suite.

Si l’utilisateur a complété des informations et qu'il souhaite quitter, une Dialog de confirmation apparaît.

N’utilisons pas « Enregistrer et quitter », ni « Quitter » dans un Footer : cela porterait à confusion sur le rôle de la croix de fermeture et sur celui de « Annuler »

Un **parcours de création en étapes** permet de répartir une collecte d'informations en plusieurs étapes. Cela implique une navigation entre les différentes étapes et une validation finale.

Le Footer comporte en général plusieurs boutons : 

* «  **Étape précédente** » en `leftIcon` `outlined`Iavec l'cône `arrow-left`
* «  **Étape suivante** » en `filled`
* « **Annuler** » pour que l’utilisateur puisse quitter le formulaire à tout moment.

N’utilisons pas de bouton « {Infinitif} le/la {ressource} » à chaque étape, cela peut perturber l’utilisateur le laissant penser qu’il doit systématiquement enregistrer avant de passer à l'étape suivante. Signifions l'enregistrement de manière implicite : il s'effectue à chaque clic sur « Étape suivante ».

Vérifier l'accent sur la majuscule du mot « Étape » pour l'accessibilité.

Pour l'étape finale du parcours, tout Footer contient un bouton de validation à la place du bouton pour passer à l'étape suivante :

* «  **Étape précédente** » en `leftIcon` `outlined`Iavec l'cône `arrow-left`
* « **{Infinitif} le/la {ressource}** » en `filled`.
* « **Annuler** » pour que l’utilisateur puisse quitter le formulaire à tout moment.

#### Avec action de diffusion

Dans un parcours de création de ressource avec action de diffusion, le contenu du Footer change. L'utilisateur a la possibilité d'enregistrer la ressource pour y revenir plus tard :

* «  **Étape précédente** » en `leftIcon` `outlined`Iavec l'cône `arrow-left`
* «  **Étape suivante** » en `filled`
* « **Continuer plus tard** » en `outlined` et palette `product`

Pour l'étape finale du parcours, le Footer doit exposer l'action de diffusion à la place du bouton pour passer à l'étape suivante :

* «  **Étape précédente** » en `leftIcon` `outlined`Iavec l'cône `arrow-left`
* « **{Infinitif} le/la {ressource}** » en `filled`.
* « **Continuer plus tard** » en `outlined` et palette `product`

#### Affichage des erreurs

Une erreur ou une alerte dans le Footer est communiquée uniquement via un CalloutPopover. L’erreur est potentiellement hors du champ de vision de l’utilisateur et on ne maitrise pas la longueur du message décrivant l’erreur.

Se référer à la guideline Erreurs dans les formulaires.

#### Création en chaîne

Pour permettre à l’utilisateur de créer plusieurs ressources à la suite, il suffit de lui proposer un bouton d’action clair. Cette approche simple évite toute complexité dans l’interface

- **Do** : Si l’utilisateur souhaite créer plusieurs ressource à la suite, il peut recommencer le processus de création autant de fois qu’il le souhaite.
- **Don't** : Nous évitons la case à cocher ou le bouton du type « Ajouter et nouveau » ou « Créer un/une {ressource} »: ces intitulés créent de la confusion.

#### Actions claires et distinctes

Nous évitons d’utiliser deux fois le même verbe dans des boutons voisins, pour privilégier des formulations explicites : chaque libellé doit permettre de différencier l’action proposée, sans aucune ambigüité. 

- **Do** : Nous explicitons les actions et évitons l'usage du même verbe dans des boutons voisins.
- **Don't** : Nous n'utilisons pas le même verbe dans deux boutons voisins.
- **Do** : N'utilisons qu'un seul verbe dans le bouton.
- **Don't** : Nous évitons d'utiliser deux verbes d'actions dans un même bouton : cela créerait une confusion pour l'utilisateur sur ce qui va réellement se produire.

### Dialog de confirmation d'abandon

Lorsque l’utilisateur quitte un formulaire en cours de modification, une Dialog s’affiche pour qu’il confirme son intention. Le Footer de cette Dialog propose des boutons d'action clairs et sans ambiguïté :

* « **Quitter sans enregistrer** » en `filled`
* « **Annuler** »

Pour le contenu complet de cette Dialog, consulter les messages standards de confirmation.

### Enregistrement automatique

Certains logiciels proposent un enregistrement qui se déclenche dès la saisie des informations. Le Footer relaie la confirmation de l’enregistrement.

### Actions en masse

Dans certains contexte, le Footer peut-être utilisé pour réaliser des actions en masse sur une sélection de ressources (IndexTable par exemple).

Le Footer est affiché par défaut sur l’interface, avant même la sélection de la première ressource. Cela permet de donner une information à l’utilisateur sur ce qu’il peut faire.

Utilisons « **{Infinitif} + {ressource}** » en `filled`pour les actions liées à la sélection.

Des infos complémentaires peuvent être affichées pour aider à la décision.

Pour des actions secondaires, connues de l’utilisateur, le bouton menu peut être utilisé.

Si plusieurs actions sont possibles sur l’ensemble des ressources sélectionnées, il est préférable d’afficher leur nombre en information supplémentaire plutôt que de répéter l’information via le NumericBadge de chaque bouton.

- **Do** : Affichons le nombre de ressources sélectionnées dans l'espace dédié.
- **Don't** : N'affichons pas un NumericBadge dans chaque bouton d'action.

# Design (iOS)

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public* ou *#product-mobile-public*

## Anatomie

## Options

### Bouton secondaire

Un bouton secondaire peut être ajouté pour proposer une action en complément de l’action principale. Le bouton secondaire doit porter le style `outlined` et porter la couleur `product` ou `neutral`.

Lorsque deux actions sont présentes, le bouton primaire est toujours affiché au dessus du bouton secondaire.

Il est possible d’aligner les boutons horizontalement lorsqu’un gain de place est nécessaire. Dans ce cas, le bouton primaire est toujours affiché à droite, plus proche de la zone de touche.

Avant de partir sur cette option, assurons-nous que le contenu des boutons ne déborde pas sur des petits écrans. Vérifions que l’intitulé des actions soit suffisamment court dans l’intégralité des langues gérées par Lucca.

### Contenu additionnel

Un bloc de contenu supplémentaire peut être rajouté au dessus des actions du Footer, pour apporter des informations contextuelles à ces actions.

Par exemple, un **Callout** résumant le nombre d’erreurs du formulaire expliquant à l’utilisateur pourquoi la déclaration d’une dépense est impossible.

## Cas d'usage

### Parcours de création de ressource

Un **parcours de création en formulaire simple ou long** permet de demander des informations à l’utilisateur en une seule étape.

#### Parcours de création en étapes

Un **parcours de création en étapes** permet de répartir une collecte d'informations en plusieurs étapes. Cela implique une navigation entre les différentes étapes et une validation finale.

Pour passer à l’étape suivante, le Footer comporte un seul bouton : «  **Étape suivante** » en `filled`

Évitons d’afficher un bouton pour passer à l’étape précédente depuis le Footer. La navigation vers la page précédente depuis la **Toolbar** ou par un swipe est suffisante.

Pour l'étape finale du parcours, tout Footer contient un bouton de validation à la place du bouton pour passer à l'étape suivante : « **{Infinitif} le/la {ressource}** » en  `filled`

#### Affichage des erreurs et alertes

Une erreur dans le Footer est communiquée à l’aide un **Callout**. Le nombre d’erreurs du formulaire est communiqué sous cette forme : **« Il vous reste {X} erreurs à corriger. »**

Lorsque l’utilisateur appuie sur ce **Callout**, il est automatiquement scrollé jusqu’à la première erreur du formulaire.

- **Do** : Si le formulaire est long, affichons les alertes dans la Toolbar.
- **Don't** : Les alertes ne sont pas affichées depuis le Footer : elles occuperaient trop de place et ne sont pas bloquantes pour la création d’une ressource, contrairement aux erreurs.

### Actions en masse

Dans certains contexte, le Footer peut-être utilisé pour réaliser des actions en masse sur une sélection de ressources (approbation par exemple).

Le Footer apparaît uniquement lorsque l’utilisateur rentre dans le mode de sélection. Le nombre d’éléments sélectionnés est mis à jour dans le **NumericBadge**.

### Filtres 

Le Footer permet de gérer un ensemble de filtres présents sur une page dédiée. Deux actions sont présentes :

* **« Appliquer les filtres »**
* **« Réinitialiser les filtres »**

## Règles d'utilisation

### Taille du Footer

Le Footer est fixé au scroll, il diminue donc l’espace dédié au contenu principal de la page. Évitons d'insérer des blocs denses dans le Footer pour laisser le reste du contenu lisible.

- **Do** : Limitons le texte au strict minimum. Le détail des erreurs est déjà présent sur la page.
- **Don't** : Ne détaillons pas la liste des erreurs. Sur un long formulaire, elle risque de prendre la place sur le contenu.

### Bouton Annuler

Ne répétons pas le bouton “Annuler” dans le Footer : la navigation vers la page précédente depuis la **Toolbar** est préférée.

- **Don't** : Revenir à la page précédente depuis un Footer n’est pas conforme aux standards de navigation iOS.

# Design (Android)

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public* ou *#product-mobile-public*

## Anatomie

## Options

### Bouton secondaire

Un bouton secondaire peut être ajouté pour proposer une action en complément de l’action principale. Le bouton secondaire doit porter le style `outlined` et porter la couleur `product` ou `neutral`.

Lorsque deux actions sont présentes, le bouton primaire est toujours affiché au dessus du bouton secondaire.

Il est possible d’aligner les boutons horizontalement lorsqu’un gain de place est nécessaire. Dans ce cas, le bouton primaire est toujours affiché à droite, plus proche de la zone de touche.

Avant de partir sur cette option, assurons-nous que le contenu des boutons ne déborde pas sur des petits écrans. Vérifions que l’intitulé des actions soit suffisamment court dans l’intégralité des langues gérées par Lucca.

### Contenu additionnel

Un bloc de contenu supplémentaire peut être rajouté au dessus des actions du Footer, pour apporter des informations contextuelles à ces actions.

Par exemple, un **Callout** résumant le nombre d’erreurs du formulaire expliquant à l’utilisateur pourquoi la déclaration d’une dépense est impossible.

## Cas d'usage

### Parcours de création de ressource

Un **parcours de création en formulaire simple ou long** permet de demander des informations à l’utilisateur en une seule étape.

#### Parcours de création en étapes

Un **parcours de création en étapes** permet de répartir une collecte d'informations en plusieurs étapes. Cela implique une navigation entre les différentes étapes et une validation finale.

Pour passer à l’étape suivante, le Footer comporte un seul bouton : «  **Étape suivante** » en `filled`

Évitons d’afficher un bouton pour passer à l’étape précédente depuis le Footer. La navigation vers la page précédente depuis la **Toolbar** ou par un swipe est suffisante.

Pour l'étape finale du parcours, tout Footer contient un bouton de validation à la place du bouton pour passer à l'étape suivante : « **{Infinitif} le/la {ressource}** » en  `filled`

#### Affichage des erreurs et alertes

Une erreur dans le Footer est communiquée à l’aide un **Callout**. Le nombre d’erreurs du formulaire est communiqué sous cette forme : **« Il vous reste {X} erreurs à corriger. »**

Lorsque l’utilisateur appuie sur ce **Callout**, il est automatiquement scrollé jusqu’à la première erreur du formulaire.

- **Do** : Si le formulaire est long, affichons les alertes dans l'App bar.
- **Don't** : Les alertes ne sont pas affichées depuis le Footer : elles occuperaient trop de place et ne sont pas bloquantes pour la création d’une ressource, contrairement aux erreurs.

### Actions en masse

Dans certains contexte, le Footer peut-être utilisé pour réaliser des actions en masse sur une sélection de ressources (approbation par exemple).

Le Footer apparaît uniquement lorsque l’utilisateur rentre dans le mode de sélection. Le nombre d’éléments sélectionnés est mis à jour dans le **NumericBadge**.

### Filtres 

Le Footer permet de gérer un ensemble de filtres présents sur une page dédiée. Deux actions sont présentes :

* **« Appliquer les filtres »**
* **« Réinitialiser les filtres »**

## Règles d'utilisation

### Taille du Footer

Le Footer est fixé au scroll, il diminue donc l’espace dédié au contenu principal de la page. Évitons d'insérer des blocs denses dans le Footer pour laisser le reste du contenu lisible.

- **Do** : Limitons le texte au strict minimum. Le détail des erreurs est déjà présent sur la page.
- **Don't** : Ne détaillons pas la liste des erreurs. Sur un long formulaire, elle risque de prendre la place sur le contenu.

### Bouton Annuler

Ne répétons pas le bouton “Annuler” dans le Footer : la navigation vers la page précédente depuis l'**App bar** est préférée.

- **Don't** : Revenir à la page précédente depuis un Footer n’est pas conforme aux standards de navigation de Material Design.
