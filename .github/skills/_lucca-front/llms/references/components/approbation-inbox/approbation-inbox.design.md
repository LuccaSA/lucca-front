# approbation-inbox — Design Guidelines

**Sommaire**

- Design
  - Anatomie
  - Liste des ressources
    - Titre
    - Élément de liste
    - Options d’affichage
  - Détail de la demande
    - En-tête
    - Contenu de la demande
  - Traitement en masse
    - Sélection
  - Transférer l'approbation
  - EmptyStates
    - Aucune demande à traiter
    - Les filtres ne retournent aucun résultat
  - Mobile
    - Navigation séquentielle

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/70ecf7)

# Design

## Anatomie

1. Liste des objets à traiter
2. Aperçu de l’objet

## Liste des ressources

La liste permet de parcourir chronologiquement ou par priorité les demandes en attente de traitement grâce à une pagination en scroll infini. Par défaut, **le premier élément de la liste est automatiquement sélectionné** au chargement de la page.

Lorsqu’une action est réalisée, la demande disparaît de la liste et la suivante est automatiquement sélectionnée. Cela permet un traitement fluide.

### Titre

Le titre est obligatoire et doit toujours adopter la même structure :

* « {**Nom de l'objet au singulier} + {Action}** ». Exemples : « Variable à approuver », « Demande à prioriser ».
* Le titre peut être suivi d’un NumericBadge indiquant le nombre de demandes à traiter si l’option des vues n’est pas activée.

### Élément de liste

Chaque élément de la liste représente une demande. Son rôle est de présenter un condensé d'informations pour permettre un balayage visuel rapide. Le contenu de ce composant est **flexible**. Il met à disposition deux espaces de composition que l’on peut agencer librement en fonction de chaque problématique métier.

#### **1. Identification**

Cette zone accueille l'élément principal qui permet à l'utilisateur de scanner visuellement la liste. **Le contenu de cette zone doit s'adapter de manière souple au contexte métier.** Il est structuré pour accueillir :

* **Le titre (obligatoire) :** c'est le point d'ancrage de la carte. Il identifie formellement la ressource (ex : {nom du collaborateur] ou {nom du poste}).
* **Un élément visuel fort :** selon le besoin, cela peut être l'Avatar d'un collaborateur, le logo d'un organisme de formation, une icône de catégorie, ou une miniature de justificatif.
* **Des éléments contextuels :** des éléments contextuels peuvent être ajouté à ce titre, comme des méta-données apportant plus de contexte à l’utilisateur.

**2. Indicateurs clés**

La partie droite s'adapte dynamiquement selon la présence ou l'absence des blocs suivants. L’ordre d’affichage de ces éléments s’adapte en fonction du contexte. Il est possible d’y mettre :

* **La valeur clé :** elle isole la donnée la plus utile pour trier visuellement la liste (ex : un montant, un nombre de jours, ou une date).
* **Des alertes :** ligne dédiée aux icônes de contexte et au Callout d’alerte ou d’erreur.

#### 3. Indicateur de retard

Si le délai idéal de traitement est dépassé, le composant StatusBadge « En retard » s'affiche obligatoirement en zone basse (`isOverdue`), sous les informations textuelles du bloc d'identification.

### Options d’affichage

#### Vues

L’affichage des vues dépend du rôle de l’utilisateur.

Lorsque son périmètre d’action est plus large que ses propres demandes à traiter, l’utilisateur doit pouvoir distinguer ses propres demandes à traiter de celles des autres collaborateurs de son périmètre.

Cette distinction se fait via un SegmentedControl (FilterBar) présentant deux vues :

* « **Par vous** » listant toutes les demandes à traiter par l’utilisateur,
* « **Par d’autres** » listant les demandes à traiter par les autres collaborateurs de son périmètre. Les demandes sont alors regroupées par responsable de l’action (utilisateur qui doit traiter la demande et non celui qui en est à l’origine).

Chacune des vues affiche un NumericBadge indiquant le nombre de demandes en attente de traitement. Il doit respecter certaines règles :

* il doit être toujours affiché et indiquer « 0 » s’il n’y a pas de demande en attente,
* la valeur indiqué dans la vue « Par vous » est la même que celle indiqué dans le menu de navigation du logiciel.

À noter que lorsque les vues sont activées, **le titre ne doit pas indiquer de NumericBadge**.

- **Do** : Le NumericBadge doit indiquer « 0 » si la liste des demandes est vide.
- **Do** : Le NumericBadge de la navigation indique le nombre de demande à approuver dans la vue « Par vous ».
- **Don't** : Ne cumulons pas les NumericBadge dans le titre et dans les vues.

#### Filtres

Une FilterBar peut être affichée pour permettre à l’utilisateur d’affiner la liste :

* Par défaut, la FilterBar ne présente que le bouton d’ajout de filtre. Si des filtres sont ajoutés, ils viennent s’afficher à côté et passent à la ligne si besoin.
* Si un seul filtre est disponible, il est possible de l’afficher directement et ne pas le masquer derrière un bouton d’ajout de filtre.
* Les filtres ajoutés sont cumulables. Si les vues sont affichées, les filtres s'appliquent simultanément aux deux vues.

#### Regroupement et tri

L’option de regroupement permet de segmenter visuellement la liste en groupes rétractables. Cela permet de réduire la charge cognitive en permettant à l'utilisateur de traiter des lots de ressources homogènes.

Cette option ne doit pas être activé par l’utilisateur, c’est une décision à prendre par l’équipe en charge du développement du logiciel. On distingue par exemple aujourd’hui des regroupement par **date**, **période**, **utilisateur** ou d’autres critères spécifiques au contexte métier.

Concernant le tri des éléments, par défaut ils sont triées par priorité. C’est à dire que les éléments à traiter en priorité doivent apparaître tout en haut de la liste ou des groupes si l’option est utilisée.

## Détail de la demande

### En-tête

L’en-tête de l'aperçu permet d’identifier la demande sélectionnée et les actions associées. L’affichage des actions suit un ordre précis comme définit dans les règles d’utilisation :

* **l’action principale positive** via un bouton `filled` (ex : « Approuver », « Prioriser »),
* **l’action secondaire de refus** via un bouton `outlined` en palette `neutral` (ex : « Refuser »),
* **une ou plusieurs actions tertiaires** regroupées dans un menu contextuel accessible via un bouton `icon` (ex :« Transférer la demande », « Demander des précisions »).

### Contenu de la demande

Le contenu de la demande est flexible et s’adapte aux besoins de chaque métier et contexte. Il peut être découpé en différentes sections, séparées par un Divider et introduites par un titre.

En revanche, un **historique des évènements (****ActivityFeed****)** liés à la demande doit être systématiquement présent. L’utilisateur doit pouvoir consulter l’historique de la ressource ainsi que l’étape en cours.

## Traitement en masse

L’option de traitement en masse permet à l’utilisateur d’effectuer une action similaire sur plusieurs demandes sélectionnées. Pour cela, des Checkbox ainsi qu’un bouton de sélection global « Tout sélectionner » sont affichés dans la liste.

À noter que les actions nécessitant une justification (motif de refus par exemple) ne peuvent être effectuées en masse.

### Sélection

Cocher une demande et consulter son détail sont deux interactions distinctes. **Seule la Checkbox sélectionne une demande.**

Un clic sur l'élément de liste ne coche jamais la demande : il affiche son contenu à droite. L'utilisateur consulte ainsi le détail d'une demande même lorsque plusieurs demandes sont déjà sélectionnées.

Dès la première demande cochée, un Footer s'affiche en bas de la liste des ressources. Il réunit le compteur des demandes sélectionnées, l'action principale et l'action secondaire. Le compteur se met à jour à chaque demande cochée ou décochée, et le Footer disparaît lorsque l'utilisateur décoche la dernière.

## Transférer l'approbation

Le transfert d’une demande permet à l'utilisateur de confier le traitement de cette demande à un autre collaborateur. Lors de cette action, une Dialog s’affiche pour sélectionner l’utilisateur ou l’établissement destinataire.

Dès la validation du transfert, la Dialog se ferme et la demande disparaît.

Le nouvel approbateur peut donc afficher la demande de son côté. Un Tag est affiché dans le détail de la demande indiquant « **Transféré par {Prénom + Nom}** ».

Le transfert est enregistré dans l’historique de la demande.

## EmptyStates

### Aucune demande à traiter

Lorsque toutes les demandes d’approbation ont été traitées, l’utilisateur est félicité via un EmptyState. Il n’existe pas d'état vide global : un EmptyState spécifique s’affiche pour chaque vue dès que celle-ci ne contient plus d'éléments.

### Les filtres ne retournent aucun résultat

## Mobile

### Navigation séquentielle

Sur mobile, l’approbation se passe en deux étapes. L’utilisateur navigue d’abord dans la liste l’objet à approuver, puis rentre dans un objet pour pouvoir l’approuver ou le refuser.

Si l’utilisateur sélectionne en masse des demandes alors les boutons d’actions apparaissent dans un Footer.
