# data-table — Design

**Mots-clés :**tableau, données

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

<notes>

1. **Entête** : regroupe l’ensemble des cellules d’en-tête.
2. **Cellule d’entête** : affiche le titre d’une colonne, souvent avec des options de tri.
3. **Ligne** : correspond à une entrée du tableau, composée de plusieurs cellules.
4. **Cellule de ligne** : affiche une donnée pour une colonne donnée.

</notes>

---

## Options

### Lignes sélectionnables

Si le parcours utilisateur permet des actions groupées, une case cocher s’affiche en début de ligne pour permettre à l’utilisateur de sélectionner les lignes souhaitées.

Dans un tableau avec pagination, la sélection est conservée lorsque l’utilisateur navigue entre les pages.

### Lignes éditables

Des champs de formulaire (Textfield, Select, DatePicker, etc.) peuvent se trouver dans le tableau. L’utilisateur peut alors directement saisir quelque chose pour compléter le tableau.

### Colonnes obligatoires

L'indication de champ obligatoire se matérialise par un astérisque (*) placé dans la cellule d’en-tête de la colonne, à droite du libellé.

### Arborescence

Il est possible de regrouper des données au sein d’un tableau. Pour cela, une ligne parent permet d’afficher ou masquer toutes les données qu’il contient. Cette ligne parent peut contenir d’autres informations comme des totaux.

### Regroupement

Pour faciliter la lecture d’un tableau, il est possible de regrouper certaines lignes. Si c’est le cas, alors une ligne ne peut pas vivre seule, en dehors d’un groupe.

### Liens de redirection

Certaines données peuvent être des liens de redirection, notamment lorsque une des propriétés mentionne une ressource présente sur une autre interface.

### Bordures sur les cellules

Cette option renforce la séparation entre chaque cellule, offrant une lecture précise des données. Elle est recommandée pour les tableaux avec des informations denses comme les rapports.

Il est possible d’appliquer des bordures uniquement sur certaines zones du tableau pour mettre en évidence des regroupements de colonnes. Cette approche est utile pour souligner des relations ou des catégories dans les données.

### Actions rapides

Des actions rapides en bout de ligne permettent aux utilisateurs d’effectuer des tâches directement liées aux données affichées, sans quitter le contexte du tableau.

---

## Comportement

### Pagination

La pagination divise les données du tableau en pages distinctes. Elle indique le nombre total de résultats ainsi que le nombre de pages tout en permettant de naviguer entre la précédente et la suivante. Le composant de pagination est toujours placé en bas de la table de données.

Lorsqu’il n’y a qu’une seule page, il ne faut pas afficher la pagination.

Si des filtres sont appliqués sur le contenu du tableau, ils restent appliqués même lorsque l’utilisateur navigue de page en page.

Dans un tableau avec des lignes sélectionnables, si des lignes sont sélectionnées, la sélection est conservée lorsque l’utilisateur navigue entre les pages.

### Empty state

Si un tableau est vide, il faut utiliser le composant EmptyStateSection. Il indique à l’utilisateur qu’aucune donnée n’existe.

Dans le cas où l’utilisateur filtre le tableau, le composant EmptyStateSection doit être utilisé à l’intérieur du tableau. Cela permet de garder le contexte, avec notamment l’affichage des entêtes de colonne.

### Affichage en plein écran

Il est possible d’afficher le tableau en plein écran pour immerger l’utilisateur et lui permettre de travailler avec une meilleure visibilité sur l’ensemble du tableau.

---

## **Règles d’utilisation**

### Alignements des en-têtes

- **Do** : Alignons le texte multi-lignes des cellules d’en-tête par le bas pour faciliter la lecture. Centrons le contenu d’un en-tête regroupant plusieurs colonnes, quel que soit le nombre de colonnes concernées.
- **Don't** : N’alignons pas les textes multi-lignes par le haut.

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

## Contenu et rédaction

### **Intitulé des en-têtes**

L’intitulé des en-tête doit toujours être au singulier.

### **Noms et prénoms**

Pour faciliter la lecture d’un tableau, il est conseillé de toujours appliquer le format “Nom Prénom” pour citer des utilisateurs dans un tableau.

### Emphase

Le contenu de certaines colonnes peut être mis en avant en utilisant une graisse typographique plus importante. L’emphase ne doit être appliquée que sur une colonne pour ne pas perturber la lisibilité.

L’utilisation de la couleur peut-être une bonne solution pour appuyer une information, comme une somme négative ou positive.

### **Valeurs manquantes**

L’absence de donnée doit être matérialisée par un tiret demi-cadratin (–). Afin que les lecteurs d'écrans restituent correctement l'absence de données, il est conseillé d'appliquer le tiret via le code HTML suivant : `<span aria-hidden="true" data-content-before="–"></span>.`
