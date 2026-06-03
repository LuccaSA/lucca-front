# index-table — Design

## **Anatomie**

### **Cellules**

## **Options**

### **Sélectionnable**

Lorsqu’il est possible de sélectionner une ressource, alors une case à cocher se place à l’extrême gauche de la ligne. La sélection de la ligne n’est possible qu’au clic sur la case à cocher. Il est aussi possible de sélectionner toutes les ressources via une case à cocher dans l’en-tête du tableau.

Dans un tableau avec pagination, la sélection est conservée lorsque l’utilisateur navigue entre les pages.

### **Regroupement**

Il est possible de regrouper des ressources au sein d’un tableau. Pour cela, une ligne parent permet d’afficher ou masquer toutes les ressources qu’il contient. Cette ligne parent peut contenir d’autres informations comme des totaux, des statuts ou des actions rapides. Pour ouvrir ou fermer un groupe, la ligne de groupe est entièrement cliquable.

Lorsqu'un groupe ne contient aucune ressource, il n'est pas nécessaire de l'afficher.

Il est tout à fait possible de cumuler l’arborescence et l’option sélectionnable. Dans ce cas, chaque groupe est sélectionnable indépendamment.

### **Affichage d’une ligne de total**

Il est possible d’afficher une ligne lorsque l’on souhaite communiquer à l’utilisateur un total sur une ou plusieurs propriétés de l’ensemble des ressources.

L’affichage de la pagination n’étant pas possible avec l’affichage d’un total, il est conseillé de recourir à l’infinite scroll.

De la même manière, il est possible d’afficher un sous-total par groupe. Lorsqu’il est fermé, le sous-total s’affiche sur la ligne du groupe et non pas à la suite des ressources.

### **Empilement**

Lorsqu’une ligne représente un ensemble de ressource, il est possible de représenter un empilement pour appuyer cet ensemble. Le clic sur la ligne redirige l’utilisateur vers une vue plus détaillée de cet ensemble de ressource.

## **Comportement**

### **Interactions**

Chaque ligne est une Card représentant un objet. Les interactions en reprennent donc les principes détaillés dans la guideline de ce composant. La ligne s’élargit et s’agrandit pour appuyer l’effet de survol et son potentiel cliquable.

### **Pagination**

La pagination divise les données du tableau en pages distinctes. Elle indique le nombre total de résultats ainsi que le nombre de pages tout en permettant de naviguer entre la précédente et la suivante. Le composant de pagination est toujours placé en bas de la table de données.

Lorsqu’il n’y a qu’une seule page, il ne faut pas afficher la pagination.

Si des filtres sont appliqués sur le contenu du tableau, ils restent appliqués même lorsque l’utilisateur navigue de page en page.

Dans un tableau avec des lignes sélectionnables, si des lignes sont sélectionnées, la sélection est conservée lorsque l’utilisateur navigue entre les pages.

### **Empty state**

Si un tableau est vide, il faut utiliser le composant EmptyStateSection. Il indique à l’utilisateur qu’aucune donnée n’existe. S’il est possible de créer une ressource, un bouton doit permettre à l’utilisateur de le faire directement à la suite du message.

Dans le cas où l’utilisateur filtre le tableau, le composant EmptyStateSection doit être utilisé à l’intérieur du tableau. Cela permet de garder le contexte, avec notamment l’affichage des entêtes de colonne.

### **Débordement**

Dans un espace restreint, la valeur des cellules peut ne pas tenir sur une seule ligne. Dans ce cas plusieurs options sont possibles en fonction du contexte.

#### **Ellipser le contenu**

S’il est important de garder une homogénéité entre les lignes, notamment pour faciliter la lecture du tableau par l’utilisateur, alors il est préférable d’ellipser le contenu des cellules. Si l’utilisateur veut consulter les données dans leur ensemble, il peut ouvrir la ressource pour en afficher une vue détaillée.

#### **Adapter la hauteur des lignes au contenu**

Si une différence de hauteur entre les lignes importe peu, alors celle-ci peut être fluide en fonction de son contenu.

#### **Défilement horizontal**

S’il faut garder la même hauteur pour chacune des ligne mais qu’on ne veut pas ellipser le contenu des cellules, alors il est possible de faire défiler le contenu du tableau de manière horizontale.

Il n’est pas possible de fixer une ou plusieurs colonnes du tableau.

### **Sélection en masse**

Il est possible de sélectionner l'ensemble des ressources, même si le tableau contient plusieurs pages. Dans ce cas, lorsque l'utilisateur clique sur la case à cocher dans l'en-tête, cela permet de sélectionner non seulement les ressources visibles sur la page visible, mais également celles des autres pages.

Dans un tableau avec pagination, la sélection est conservée lorsque l’utilisateur navigue entre les pages.

Le survol de la case à cocher dans l’en-tête doit afficher un tooltip au survol indiquant “Tout sélectionner” ou “Tout désélectionner” en fonction du comportement attendu.

#### Utilisation des filtres

Lorsque l’utilisateur applique un filtre après avoir fait une sélection globale, cette sélection est réinitialisée. Toutes les ressources précédemment sélectionnées seront donc désélectionnées, le tableau se mettra à jour en fonction du nouveau filtre.

Cette réinitialisation garantit que seules les ressources correspondant aux critères du filtre sont prises en compte pour la sélection.

### **Actions**

#### État par défaut

Si la ressource ne propose aucune action spécifique en dehors de la consultation portée par le clic sur la ligne, nous n'affichons pas de bouton ou de menu contextuel en bout de ligne.

Le clic sur la ligne demeure l'unique point d'entrée.

#### Action rapide

Si une ressource ne possède qu'une seule action métier spécifique et fréquente (ex : « Marquer comme traitée », « Valider »), celle-ci doit être affichée via un bouton en bout de ligne.

Dans ce cas, on n'affiche pas de menu contextuel. L'action est disponible en un clic, et l’action de consultation reste portée par le clic sur la ligne.

Si l'action dépend d'une propriété spécifique à la ressource, il est possible de ne l'afficher que sur les lignes concernées.

#### Le menu contextuel

On utilise un menu contextuel uniquement si la ressource propose une action en plus de l’action de consultation de la ressource.

Si le menu contextuel est présent, il doit obligatoirement inclure l'action de consultation en première position. L’intitulé de cette action doit être “Consulter” accompagné de l’icône `icon-eye`

Si une **action est critique, comme la suppression**, elle doit toujours être placée en dernière position dans un menu contextuel, même si elle est seule, afin d'éviter les clics accidentels.

#### Cas hybride : action rapide et menu contextuel

Lorsque le contexte nécessite d’afficher une action rapide pour optimiser l’expérience utilisateur, on affiche une action métier prioritaire en bouton direct, suivie d'un menu contextuel pour le reste des actions.

Si l'action dépend d'une propriété spécifique à la ressource, il est possible de ne l'afficher que sur les lignes concernées.

#### Action critique

Si une **action est critique, comme la suppression**, elle doit toujours être placée en dernière position dans un menu contextuel, même si elle est seule, afin d'éviter les clics accidentels.

#### Actions en masse

Dans le cas où de la sélection est possible, le ou les boutons sont automatiquement masqués dès lors que l’utilisateur sélectionne une ligne. On considère que l’utilisateur passe dans un mode “Action en masse”.

### **Tri**

Les colonnes peuvent être triées par ordre croissant ou décroissant. Les boutons de tri se trouvent dans les en-têtes de colonne et sont indiqués par une icône de flèches.

Flèche vers le haut signifie un triage ascendant, c'est-à-dire que les valeurs vont croissant vers le bas de la colonne. Flèche vers le bas signifie triage descendant, c'est-à-dire que les valeurs vont en décroissant vers le bas de la colonne.

### **Petits écrans et mobile**

Sur les petits écrans et mobile, le tableau change d’apparence et affiche les ressources sous forme de liste. Chacune des ressources reprend les informations présentent dans le tableau mais affichées de manière différente.

## **Règles d’utilisation**

### Nombre de colonnes

Pour assurer une lecture fluide et une bonne hiérarchisation des informations, il est conseillé de limiter le **nombre de colonnes visibles à 5 ou 6 maximum**. Au-delà, le tableau devient plus difficile à lire et oblige souvent à scroller horizontalement.

Il faut prioriser l’affichage des données essentielles à la lecture ou à l’action. Les données secondaires sont accessibles dans une vue détaillée de l’objet.

### Double ligne dans une cellule

Limitons l'utilisation des doubles lignes, envisageons-les comme une solution d'appoint.

#### Pourquoi limiter l’utilisation de double ligne ?

* Les doubles lignes augmentent la hauteur des lignes. Elles compliquent la lecture du tableau.
* Elles peuvent donner des informations limitant le recours au tri et au filtrage.
* Le tableau perd en clarté et en concision.

#### La double ligne est permise pour ces seuls cas :

* Faible volume de données,
* Contraintes extrêmes d'espace horizontal,
* Devise,
* Double ligne intégrée à un composant comme le contact badge.

**Pour les autres cas suivants**, veiller à ce que la donnée soit affichée dans des colonnes distinctes. Maintenons lisibilité et interactivité :

* indication d'action, 
* étape de workflow, statut,
* donnée dynamique (qui change fréquemment ou en temps réel).

### **Alignements des en-têtes**

De manière générale, il est conseillé de ne pas avoir un en-tête de tableau sur plusieurs lignes. Dans le cas où le texte se retrouve sur plusieurs lignes, ils doivent être alignés par le bas pour faciliter la lisibilité.

### **Alignement des données**

La majorité des données doit être ferrée à gauche. C’est le cas pour les données textuelles, y compris les dates et les numéro de téléphone. Les données numériques (prix, pourcentages, etc.) doivent être ferrées à droite. Il est aussi recommandé d’ajouter les décimales, même quand celles-ci sont de “,00” pour ne pas casser l’alignement des données.

### **Alignement des cases à cocher**

L’alignement des cases à cocher se fait systématiquement avec la première ligne de texte.

### **Arborescence**

Dans le cas d’un tableau contenant une arborescence, il est impératif d’aligner le contenu des lignes enfants avec celui de la ligne parent. On appliquera cette règle même lorsqu’il y a une arborescence plus profonde (2 ou 3 niveaux).

Les cases à cocher ne suivent pas l’arborescence. Cela permet de les garder alignées pour optimiser la multi-sélection.

### **Défilement vertical**

La hauteur d’un Index table ne doit jamais être fixé, elle s’adapte au contenu. De ce fait, lorsqu’il contient une très grande quantité de ressources, il faut utiliser la pagination pour éviter le scroll vertical à l’intérieur du tableau.

## **Contenu & rédaction**

### **Intitulé des en-têtes**

L’intitulé des en-tête doit toujours être au singulier.

### **Noms et prénoms**

Pour faciliter la lecture d’un tableau, il est conseillé de toujours appliquer le format “Nom Prénom” pour citer des utilisateurs dans un tableau.

### **Emphase**

Le contenu de certaines colonnes peut être mis en avant en utilisant une graisse typographique plus importante. L’emphase ne doit être appliquée que sur une colonne pour ne pas perturber la lisibilité.

L’utilisation de la couleur peut-être une bonne solution pour appuyer une information, comme une somme négative ou positive.

### **Valeurs manquantes**

L’absence de donnée doit être matérialisée par un tiret demi-cadratin (–). Afin que les lecteurs d'écrans restituent correctement l'absence de données, il est conseillé d'appliquer le tiret via le code HTML suivant : `<span aria-hidden="true" data-content-before="–"></span>`.

### **Séparateurs verticaux**

Il n’est pas recommandé d’utiliser des séparateurs verticaux dans le tableau. Pour mettre en avant une colonne et des données, on peut utiliser l’emphase.
