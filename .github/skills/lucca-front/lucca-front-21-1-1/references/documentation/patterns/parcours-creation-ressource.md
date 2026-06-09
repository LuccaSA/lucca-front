# Parcours de création de ressource

# Avec action de diffusion

## Principes généraux

Ce type de parcours s'applique lorsque la ressource nécessite une **action métier finale explicite** pour être diffusée comme « Lancer la campagne » ou « Envoyer l'enquête ».

Caractéristiques clés :

* la ressource est créée en base dès l'étape d'initialisation,
* l'utilisateur peut sauvegarder et reprendre le parcours à tout moment,
* elle possède un statut « En cours de création » jusqu'à l'action finale,
* l’affichage de la ressource diffère entre la création et la consultation une fois l’action finale réalisée

## Description du parcours

### Étape d'initialisation

L'étape d'initialisation est **obligatoire** dans ce type de parcours. Elle permet de créer la ressource en base dès le départ, offrant ainsi la possibilité de sauvegarder les données et de reprendre le parcours ultérieurement.

Cette première étape contient **deux à trois champs essentiels** pour identifier la ressource

Si le parcours de création nécessite de traduire le contenu en plusieurs langues, les paramètres des langues sont accessibles depuis cette première étape d’initialisation. Pour en savoir plus, consultez la guideline sur les traductions de formulaire.

#### Contenu et rédaction

| Élément | Contenu |
| --- | --- |
| Titre de la Dialog | « **Créer un/une {ressource}** » |
| Bouton de validation | « **Créer le/la {ressource}** » en `filled`. |
| Bouton d’annulation | « **Annuler** » |

### Étapes intermédiaires

Une fois la ressource créée via l’étape d’initialisation, l'utilisateur configure progressivement tous les paramètres nécessaires. Le parcours se déroule dans une Dialog latérale (`drawer`) avec un Progress stepper visible indiquant la progression. L’entête de la Dialog reprend le nom de la ressource.

Chaque étape traite un aspect spécifique de la ressource, ce qui permet de focaliser l'attention de l'utilisateur sur un point précis.

Dans ce contexte de création de ressource, la complétion des étapes peut être séquentielle (l’utilisateur doit suivre un ordre définit) ou libre (l’utilisateur peut naviguer entre les étapes à sa guise).

#### Contenu et rédaction

| Élément | Standard |
| --- | --- |
| Titre de la Dialog | « **{Nom de la ressource}** » |
| Bouton précédent | «  **← Étape précédente** » en `outlined` |
| Icône `arrow-left`, positionnée sur la gauche du Footer. |   |
| Bouton de validation | «  **Étape suivante** » en `filled` |
| Bouton d’enregistrement | « **Continuer plus tard** » en `outlined` et palette `product` |

### Création de ressources enfants

Certaines ressources nécessitent la création de ressources enfants. Cela est possible pour des formulaires long ou en étapes.

Ces ressources enfants sont créées dans une Dialog latérale (`drawer`) superposée, qui vient se placer au-dessus du parcours principal, permettant de garder le contexte en arrière-plan.

La Dialog enfant se ferme après validation, ramenant l'utilisateur à la Dialog parente.

### Étape récapitulative

Cette étape récapitulative est **optionnelle**. L'ajout d'un récapitulatif dépend de la criticité de l'action, ses conséquences en cas d'erreur, la difficulté à corriger et le stress généré pour l'utilisateur.

Une fois toutes les étapes complétées, l'utilisateur accède à un écran présentant l'ensemble des informations saisies avant la validation finale. Cet écran permet de vérifier les paramètres configurés et de les corriger si nécessaire avant de confirmer l'action.

#### Contenu et rédaction

| Élément | Standard |
| --- | --- |
| Titre de la Dialog | « **{Nom de la ressource}** » |
| Bouton précédent | «  **← Étape précédente** » en `outlined` |
| Icône `arrow-left`, positionnée sur la gauche du Footer. |   |
| Bouton d’action final | « **{Infinitif} le/la {ressource}** » en `filled`. |
| Bouton secondaire | « **Continuer plus tard** » en `outlined` et palette `product` |

## Gestion des erreurs

La gestion des erreurs diffère entre les deux types de complétion.

### Complétion séquentielle

L'utilisateur doit compléter chaque étape dans l'ordre avant de passer à la suivante. La navigation est contrainte : il n'est pas possible d'accéder à l'étape 2 sans avoir validé l'étape 1.

La validation des données est **manuelle** et se fait à chaque changement d’étape. Elle est déclenchée via le bouton permettant de passer à l’étape suivante. Si des erreurs sont détectées lors de la tentative de passage à l'étape suivante, elles sont immédiatement remontées via un Callout popover à l'utilisateur et bloquent la progression tant qu'elles ne sont pas corrigées.

Le composant Progress stepper indique un état « Succès » pour les étapes validées.

### Complétion libre

Dans ce contexte de création de ressource, la complétion des paramètres est guidée mais n’est pas imposée. C’est à dire que l’utilisateur peut naviguer entre les étapes, même si des informations ne sont pas renseignées.

Il est d’ailleurs tout à fait possible que certaines étapes soit déjà considérées comme validées dès le début du parcours car déjà pré-paramétrées, comme pour les mails de notification par exemple. Le composant Progress stepper indique un état “Succès” pour ces étapes.

Dans ce cas, aucune validation n'est effectuée pendant les étapes intermédiaires. Les erreurs sont détectées et bloquantes uniquement au moment de l'action finale (dernière étape du parcours). L’étape récapitulative permet de les exposer à l’utilisateur pour qu’il puisse les corriger.

Exception faite pour certains champs avec un format spécifique imposé (email, url, etc.), les erreurs peuvent être déclenchées au `blur` lorsque le format n'est pas respecté. Cela aide l'utilisateur à corriger immédiatement sans attendre la fin du parcours.

## Enregistrement

Un enregistrement de la ressource est effectué à chaque étape, lorsque l’utilisateur change d’étape, via le bouton « Étape suivante » ou via le Progress stepper. Le bouton « Étape suivante » passe en état `loading` le temps de l'enregistrement.

Un bouton « **Continuer plus tard** » est proposé à chaque étape pour permettre à l’utilisateur de quitter le parcours à tout moment tout en sauvegardant l’état actuel de sa saisie. La ressource reste alors en statut « En cours de création ».

Lorsque l'utilisateur clique sur une ressource « En cours de création », il est automatiquement renvoyé dans le parcours de création (Dialog latérale (`drawer`)) à la **première étape non validée**, avec possibilité de continuer la configuration et de finaliser la diffusion.

## Actions secondaires

Un bouton est toujours présent dans l'entête de la Dialog pour que l'utilisateur puisse accéder à des actions secondaires. C'est à cet endroit qu'il pourra accéder à des actions pour :

* modifier le nom de la ressource,
* modifier les paramètres de langues,
* dupliquer la ressource,
* supprimer la ressource en cours de création.

Des actions spécifiques à la ressource peuvent aussi y trouver place.

## Affichage des ressources

Les ressources sont affichées dans les interfaces via deux composants :

* L'**Index table** présente les ressources sous forme de tableau, permettant une comparaison plus simple entre les ressources créée.
* La **Resource card** propose quant à elle un affichage en cartes pour une vue plus visuelle et synthétique.

Le besoin de comparaison constitue un point déterminant dans le choix du composant d'affichage. Lorsque les utilisateurs ont besoin d'effectuer une comparaison multi-critères détaillée, l'Index table est recommandée car elle facilite la lecture et la comparaison colonne par colonne. À l'inverse, pour une comparaison visuelle rapide, la Resource card est plus appropriée grâce à sa mise en avant des informations clés et un scan visuel plus rapide.

### Ressources en cours de création

Les ressources « En cours de création » doivent toujours être **visibles et facilement identifiables** pour éviter que l'utilisateur ne perde de vue une ressource en cours et ne la recrée par erreur.

La façon de les afficher dépend de leur architecture technique.

#### Bases de données séparées

Lorsque les ressources « En cours de création » et les ressources finalisées ne partagent pas la même base de données, elles sont séparées visuellement sur une même interface.

Elles sont donc organisées en deux sections distinctes : une section dédiée placée en haut de page pour les ressources « En cours de création », suivie de la section principale pour les ressources finalisées.

Les deux types de ressources peuvent utiliser un mode d'affichage différent (Resource card ou Index table).

- **Do** : Mettons en avant les ressources en cours de création sur la même interface que celles déjà diffusées.
- **Caution** : Évitons de séparer les ressources « En cours de création » et les ressources finalisées via une navigation horizontale. L’utilisateur peut se demander où sont passées les ressources en cours et vouloir en créer une nouvelle au lieu de reprendre son parcours.

#### Même base de données

Lorsque les ressources en cours et finalisées partagent la même base de données, elles peuvent être mélangées dans un même affichage (Index table ou liste de Resource cards).

Les ressources « En cours de création » doivent impérativement apparaître en premier, en haut de la liste.

#### Identification visuelle

Dans tous les cas, chaque ressource « En cours de création » doit être identifiée par un Status badge en couleur `product` visible, situé à la suite du nom de la ressource. Ce badge permet de distinguer rapidement l'état de la ressource.

# Sans action de diffusion

## Principes généraux

Ce type de parcours s'applique lorsque la seule action possible est **la création de la ressource**. Il n'y a pas d'action finale métier comme « Lancer la campagne » ou « Envoyer l'enquête ».

Caractéristiques clés :

* la ressource est créée en base uniquement à la fin du parcours,
* elle ne peut pas avoir de statut « En cours de création »,
* il n’y a pas de sauvegarde intermédiaire : l'utilisateur doit compléter le parcours en une fois,
* une fois créée, la ressource peut être consultée et modifiée,
* ce sont des ressources qui vivent dans le temps, de l'ordre du paramétrage.

## Types de parcours

Le choix du parcours dépend de la complexité et de la quantité d'informations à saisir.

### Formulaire court

Ce type de parcours est idéal lorsque la ressource à créer est simple, avec **un nombre limité de champs** à remplir, idéalement pas plus de trois.

Le formulaire est présenté dans une Dialog centrée. L’utilisateur voit tous les champs nécessaires sur un seul écran, ce qui permet une saisie rapide et directe.

La ressource est immédiatement créée à la validation du formulaire.

#### Contenu et rédaction

| Élément | Contenu |
| --- | --- |
| Titre de la Dialog | « **{Infinitif} un/une {ressource}** » |
| Bouton de validation | « **{Infinitif} le/la {ressource}** » en `filled` |
| Bouton d’annulation | « **Annuler** » |

### Formulaire long

Au-delà de 3 champs, si les informations demandés ne nécessitent pas de découpage en étape, l’utilisation d’un formulaire long est approprié. Ce formulaire présenté dans une Dialog latérale (`drawer`) peut être structuré en plusieurs fieldsets pour maintenir une bonne lisibilité.

#### Contenu et rédaction

| Élément | Contenu |
| --- | --- |
| Titre de la Dialog | « **{Infinitif} un/une {ressource}** » |
| Bouton de validation | « **{Infinitif} le/la {ressource}** » en `filled` |
| Bouton d’annulation | « **Annuler** » |

### Formulaire en étapes

Une découpage du formulaire en étapes s'impose lorsque la complexité des Fieldsets devient trop importante. Chaque étape traite un aspect spécifique de la ressource, ce qui permet de focaliser l'attention de l'utilisateur sur un point précis.

Le parcours se déroule dans une Dialog latérale (`drawer`) avec un Progress stepper visible indiquant la progression.

#### Contenu et rédaction

| Élément | Standard |
| --- | --- |
| Titre de la Dialog | « **{Infinitif} un/une {ressource}** » |
| Bouton précédent | «  **← Étape précédente** » en `outlined` |
| Icône `arrow-left`, positionnée sur la gauche du Footer. |   |
| Bouton suivant | «  **Étape suivante** » en `filled` |
| Bouton de validation | « **{Infinitif} le/la {ressource}** » en `filled`. |
| Bouton d’annulation | « **Annuler** » |

### Création de ressources enfants

Certaines ressources nécessitent la création de ressources enfants. Cela est possible pour des formulaires long ou en étapes.

Ces ressources enfants sont créées dans une Dialog latérale (`drawer`) superposée, qui vient se placer au-dessus du parcours principal, permettant de garder le contexte en arrière-plan.

La Dialog enfant se ferme après validation, ramenant l'utilisateur à la Dialog parente.

## Gestion des erreurs

Dans **le cas d'un parcours sans étapes** (formulaire court ou long), les erreurs sont détectées au moment de la soumission du formulaire, c'est-à-dire au clic sur le bouton de validation.

Dans **le cas d'un parcours en étapes**, la validation des données est **manuelle** et se fait à chaque changement d’étape. Elle est déclenchée soit via le bouton permettant de passer à l’étape suivante, soit via une Dialog de confirmation lorsque l’utilisateur navigue via le composant Progress stepper. Si des erreurs sont détectées lors de la tentative de passage à l'étape suivante, elles sont immédiatement remontées via un Callout popover à l'utilisateur et bloquent la progression tant qu'elles ne sont pas corrigées

Pour certains champs avec un format spécifique imposé (email, url, date, mot de passe, etc.), qu’il soit obligatoire ou non, les erreurs sont déclenchées au `blur` lorsque le format n’est pas respecté.

Pour en savoir, vous pouvez consulter la guideline dédiée à la gestion des erreurs dans un formulaire.

## Affichage des ressources

Les ressources sont affichées dans les interfaces via deux composants :

* L'**Index table** présente les ressources sous forme de tableau, permettant une comparaison plus simple entre les ressources créée, notamment lorsqu’il y en a beaucoup.
* La **Resource card** propose quant à elle un affichage en cartes pour une vue plus visuelle et lorsque la quantité de ressources attendue est faible.

Le besoin de comparaison constitue un point déterminant dans le choix du composant d'affichage. Lorsque les utilisateurs ont besoin d'effectuer une comparaison multi-critères détaillée, l'Index table est recommandée car elle facilite la lecture et la comparaison colonne par colonne.

### Détail d’une ressource

Une fois créée, une ressource peut être consultée et modifiée par l'utilisateur. Le mode d'affichage du détail dépend de la complexité de la ressource et de son parcours de création.

#### Consultation en Dialog

Ce mode d’affichage convient pour les parcours de création simple ou long, sans étapes et **lorsqu’aucune information supplémentaire n’est attendue** ou ne peut être ajoutée après la création. L'utilisateur clique sur la ressource et accède directement à une **Dialog en mode édition ou présentation**, similaire au parcours de création.

#### Consultation en pleine page

Ce mode d’affichage doit être privilégié pour les ressources **issues d’un parcours de création en étapes ou si des données supplémentaires peuvent être renseignées après la création initiale (formulaire simple ou long)**, alors ce mode d’affichage doit aussi être utilisé.

L'utilisateur clique sur la ressource et accède à une **pleine page dédiée**, organisée en plusieurs sections (via le composant HorizontalNavigation) reflétant la structure du parcours de création.

Chaque section peut être modifiée individuellement, offrant une vue d'ensemble tout en permettant des modifications ciblées.

Certaines données, non demandées lors du parcours de création, peuvent être ajoutées à posteriori dans la vue détaillée. L'interface affiche un Empty state section tant que l'utilisateur n'y a rien renseigné.
