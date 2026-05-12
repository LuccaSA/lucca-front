# Conception d'un formulaire

# Content

## **Principes généraux**

* Un formulaire bien conçu est facile à utiliser et à comprendre.
* Il facilite, voire anticipe, les tâches de l’utilisateur.
* Il est accessible : chaque champ est compréhensible, navigable au clavier et lisible par tous.
* Nous évitons les usages spécifiques à un seul logiciel : nous assurons la cohérence de nos formulaires dans tous nos logiciels.
* Structure logique, pas technique. Nous suivons autant que possible ces logiques :
    * Du général au spécifique : commençons par les informations de base avant les détails.
    * Chronologie naturelle : suivons l'ordre temporel des actions à paramétrer, s'il existe.
    * Réutiliser les données existantes : nous évitons de demander des informations déjà disponibles et pré-remplissons les champs lorsque c’est possible.

## Grille

### Anatomie

La grille, via le composant Grid, permet de structurer efficacement la disposition des champs. Son objectif principal est de garantir un alignement cohérent, une lisibilité optimale et une adaptabilité parfaite en responsive.

### Bonnes pratiques

* La grille se compose de **4 colonnes**. De manière générale, il n’est pas recommandé d’avoir plus de 2 champs sur une même ligne.
* Des champs comme le Textarea, le Rich textfield ou encore le Select multiple doivent utiliser les 4 colonnes de la grille.
* La largeur du champ doit refléter la valeur attendue. Un champ seul sur une ligne peut être affiché sur une ou deux colonnes.
* La largeur maximum du formulaire est de **800px**.
* Dans le cadre d’une utilisation mobile, la répartition des champs peut se faire uniquement sur 1 ou 2 colonnes.

- **Do** : Utilisons la pleine largeur de la grille pour les champs comme le Textarea ou le Rich textfield.
- **Do** : Pour l’ensemble des champs, comme les Select ou les Textfield, utilisons la pleine largeur lorsque nous ne maitrisons pas le contenu. Cela sera notamment pratique pour l’internationalisation.
- **Do** : Lorsque des champs sont étroitement liés, nous pouvons les afficher sur une même ligne.
- **Don't** : Les composants comme le Datepicker ne doivent pas utiliser toute la largeur de la grille.

## Découpage en Fieldsets

Découpons un formulaire en Fieldsets pour structurer efficacement des formulaires longs. Cela permet de regrouper logiquement les champs lorsque l'utilisateur renseigne un seul objet principal qui comporte de nombreux champs.

### Anatomie

<notes>

1. Form layout
2. Fieldset
3. Titre du Fieldset
4. Ligne
5. Séparateur entre deux Fieldset

</notes>

### Séparations des Fieldsets

Pour séparer deux Fieldsets, nous utilisons toujours un Divider. Il permet de structurer visuellement le formulaire et d'améliorer sa lisibilité.

Nous ajoutons un titre au Fieldset pour apporter une clarification à l'utilisateur sur le découpage du formulaire. Nous pouvons nous en passer lorsque le formulaire est court et ne comporte qu'un ou deux Fieldsets, sans risque de confusion.

Il n'est pas recommandé d'alterner les Fieldset avec ou sans titre.

### Bonnes pratiques

* Un Fieldset regroupe au minimum 2 champs.
* Limitons le titre à 1-2 mots-clés maximum.
* Évitons dans un titre les mots « Informations », « Contenu », « Données » : tout est information, contenu ou donnée sur un formulaire.
* Si le titre n'est pas jugé assez explicite par les utilisateurs, on peut opter pour une question. Les mots-clefs doivent apparaître tôt dans l'intitulé de la section.

- **Do** : On peut se limiter aux seuls Dividers pour aérer les formulaires.
- **Don't** : Sans Divider, ni titre de Textfield, les informations sont difficiles à parcourir.
- **Do** : Les titres de Fieldset offrent une clarification sur la nature des informations à compléter.
- **Don't** : Sans titres de Fieldset, la logique de regroupement est ici peu claire.

### Fieldset rétractable

Cela permet de ne pas afficher certains champs lors de la première lecture pour optimiser l'espacement ou pour afficher des champs optionnels.

Un fieldset rétractable ne **doit pas comporter de champs obligatoires**.

### Fieldset narratif

Le Fieldset narratif présente les champs du formulaire directement intégrés dans une phrase. L’utilisateur construit ainsi une règle ou une condition sous une forme proche du langage naturel. Cela rend la logique métier plus claire et lisible.

À utiliser **uniquement en dernier recours.** 

### Fieldset requis

L’option Fieldset requis rend obligatoire un groupe de champs, tout en laissant à l’utilisateur le choix de remplir celui qui lui convient.

Un astérisque s’affiche dans le titre du Fieldset (non répété sur les champs). Le sous-titre doit préciser qu’il suffit de renseigner au moins un des champs.

En cas d’oubli, une erreur identique est affichée sur chaque champ du Fieldset, listant les options possibles. Elle disparaît dès qu’un champ est renseigné.

Si tous les champs d’un Fieldset sont obligatoires, alors l’astérisque doit se trouver à côté du label de chacun des champs.

---

## **Découpage en é**tapes

Nous découpons un formulaire en étapes lorsqu’il est long ou complexe, et qu’il implique de paramétrer plusieurs sous-objets ou logiques différentes.

Cela permet de guider l’utilisateur pas à pas, de réduire la charge cognitive et d’éviter de présenter trop d’informations d’un coup.

Une étape peut contenir **un ou plusieurs Fieldsets**.

### Séparation des étapes

La navigation est séquentielle : l’utilisateur complète une étape à la fois et navigue entre les étapes via le composant Footer.

Ce Footer comporte en général plusieurs boutons : 

* « **Étape précédente** » , avec une icône de flèche, positionné sur la gauche du Footer
* « **Étape suivante** » en Product700
* « **Annuler + {objet}** » pour que l’utilisateur puisse quitter le formulaire à tout moment.

À partir de 3 étapes, nous affichons un indicateur de progression (Timeline) pour donner de la visibilité et permettre à l’utilisateur de se situer dans son parcours.

L’utilisateur doit pouvoir revenir en arrière sans perte de données.

### **Bonnes pratiques** 

* Une étape doit regrouper un ensemble cohérent d’actions ou de décisions, pas simplement un groupement de champs.
* Limiter le nombre d’étapes pour ne pas alourdir le parcours (idéalement 3 à 5).
* L’intitulé de chaque étape se limite à 1-2 mots-clefs explicites.
* Éviter les titres génériques comme « Étape 1 », « Paramètres », qui n’apportent pas de sens.

⚠️ Travail complémentaire en cours pour définir le fonctionnement standardisé de formulaires en étapes.

## Affichage dans une Dialog

Nous affichons les formulaires dans une **Dialog de type drawer****.**

Utilisons par défaut la taille **Dialog M**. Cette taille peut être agrandie lorsque le formulaire contient des données plus complexes nécessitant davantage d'espace, comme un tableau par exemple. 

Dans un formulaire en étapes, la largeur de la Dialog peut changer d'une étape à l'autre

Les Dialog centrées peuvent être utilisées en taille S lorsque l’utilisateur doit compléter un micro-formulaire qui s’ouvre depuis le formulaire principal.

- **Do** : Un formulaire s’affiche verticalement.
- **Don't** : Les Fieldsets d’un formulaire ne doit pas être affichés horizontalement. Ce comportement est déprécié.
