# Vues, filtres et navigation dans une page

# Content

## Les vues

Les vues, représentées par le composant SegmentedControl, permettent de basculer entre différentes représentations d’un même contenu ou ensemble de données. Elles peuvent être utilisées pour :

* Filtrer les données affichées pour répondre à un besoin ou contexte spécifique (ex. : afficher uniquement les ressources en cours d’approbation, ou celles terminées, etc.). **Dans ce cas, le SegmentedControl est utilisé comme un filtre**.
* Changer la manière dont un même ensemble de données est présenté (ex. : afficher un graphique en tableau, afficher un formulaire dans une autre langue, etc.). **Dans ce cas, le SegmentedControl est utilisé comme des onglets**.

⚠️  Il ne peut y avoir qu’un seul SegmentedControl sur une interface.

### Vues en tant que filtres

Le composant SegmentedControl (disponible via le composant FilterBar) peut être utilisé seul pour permettre à l’utilisateur de passer d’une vue à une autre.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3660:56636">

**View only - Picture**

**View only - Picture**

</design>

Des filtres supplémentaires sont disponibles via des FilterPills (Select, Date, Period, etc.). Lorsqu’un utilisateur bascule d’une vue à une autre les filtres actifs ne sont pas réinitialisés, ils sont cumulatifs.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3660:56647">

**View & filters - Picture**

**View & filters - Picture**

</design>

Une vue peut aussi représenter un état prédéfini des données, basé sur un ensemble de filtres. Lorsqu’une vue est sélectionnée, ces filtres sont affichés mais désactivés. L’utilisateur ne peut pas les modifier.

Une vue “Tous” doit être disponible pour que l’utilisateur puisse filtrer comme il l’entend parmi l’ensemble des données.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3660:56658">

**Saved view - Picture**

**Saved view - Picture**

</design>

### Vues en tant qu’onglets

Les vues peuvent être utilisées comme des onglets, ce qui permet à l’utilisateur de modifier ce qui est affiché sur l’interface. D’un point de vue technique, cela n’engendre pas de rechargement de la page, le contenu de chaque onglet étant déjà présent dans le HTML.

Lorsque l’utilisateur clique sur une vue, seul le contenu lié à l’onglet actif est visible, les autres sont masqués.

Il est possible que des **filtres soient spécifiques à la vue sélectionnée**. Si le contenu de ces onglets est un tableau, il peut différer d'un onglet à l'autre (colonnes différentes) mais doit représenter des ressources similaires.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3660:56671">

**Formation - Picture #1**

**Formation - Picture #1**

</design>

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3660:56681">

**Formation - Picture #2**

**Formation - Picture #2**

</design>

Les vues permettent aussi à l’utilisateur de changer la manière dont les informations sont présentées, sans affecter les données elles-mêmes. Chaque vue représente une mise en forme ou un mode d’affichage différent du même ensemble de données. Ce type de vue peut-être accompagné de filtres supplémentaires. Ils peuvent être affiché pour toutes les vues.

Dans ce contexte spécifique, les vues, représentées par le composant SegmentedControl, se positionnent sur la droite de l’interface.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3660:56706">

**Entretiens - Picture**

**Entretiens - Picture**

</design>

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3660:56692">

**Réuménration - Picture**

**Réuménration - Picture**

</design>

## La navigation horizontale

La navigation horizontale, représentée par le composant Menu, permet de structurer et naviguer entre des sections principales ou des catégories d’une interface. Ces sections sont totalement indépendantes et ne partagent pas les même caractéristiques.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3660:56725">

**General - Picture**

**General - Picture**

</design>

⚠️  Il ne peut y avoir de niveau de navigation supplémentaire sous cette barre de navigation.

À noter qu’il est tout à fait possible de trouver une FilterBar (vues et/ou FilterPills) à l’intérieur du module actif. Le contenu de ce module est totalement indépendant.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3660:56734">

**With filters - Picture**

**With filters - Picture**

</design>
