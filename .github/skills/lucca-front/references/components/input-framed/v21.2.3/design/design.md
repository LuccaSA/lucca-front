# input-framed — Design

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5509:140787">

</design>

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5361:13280">

<notes>

1. **Sélecteur et Label:** l'Input framed doit toujours comporter un sélecteur pour assurer une bonne compréhension du comportement de sélection, ainsi qu'un Label clair désignant l'option.
2. **Message d'aide :**  l’utilisation d’un message d’aide au niveau de chacune des options permet d’expliciter l’option ou d’en donner plus d’information.

</notes>

</design>

## Cas d’usage

### Choix à enjeu ou impact fort

On utilise l'Input framed lorsque l’impact du choix sur le parcours utilisateur ou la logique métier est forte.

Dans ce contexte, **l’utilisation de l'Input framed en taille L**, plutôt que du composant Radio ou Checkbox, permet de :

* donner du relief à une étape-clé,
* rendre explicite les conséquences du choix,
* donner des éléments de contexte afin de guider l’utilisateur dans la sélection d’un choix structurant.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5361:13293">

</design>

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5361:13295">

</design>

### Dans un formulaire

Les Input framed peuvent tout à fait être utilisés dans un formulaire contenant d’autres champs. Ils servent donc à appuyer l’importance de cette section du formulaire.

Nous privilégions **une utilisation du composant en taille M** pour ce cas d'usage. Cela permet de ne pas alourdir le formulaire.

**⚠️**  Un formulaire ne doit comporter qu’une seule question utilisant des Input framed pour éviter d’alourdir le formulaire visuellement. **Il doit être utilisé pour mettre en avant une question importante**.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6748:4889">

</design>

## Options

### Icône

L'Input framed propose un espace dans sa partie droite pour y afficher une icône ou une image (logo, illustration spécifique fournit par l’équipe Brand) si celle-ci est pertinente et porteuse de sens.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5361:13285">

</design>

### Tag

Les options peuvent porter un Tag, notamment pour indiquer une option recommandée ou une catégorie. Ce Tag est positionnée près du label et :

* porte la couleur Product s'il n'y en a qu'un seul,
* utilise les couleurs Decoratives s'il est utilisé pour catégoriser les options.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5361:13287">

<notes>

*Utilisation d'un Tag pour mettre en avant une option recommandée.*

</notes>

</design>

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5497:3233">

<notes>

*Utilisation du Tag pour catégoriser les options.*

</notes>

</design>

### Informations supplémentaires

Il est possible d’afficher du contenu supplémentaire permettant de donner plus d’information à l’utilisateur, par exemple en listant des caractéristiques.

**⚠️**  Cette option ne peut pas être cumulé avec l’option “Formulaire contextuel”.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5361:13289">

</design>

### Formulaire contextuel

L'input framed, une fois sélectionné, peut s’étendre pour présenter des champs supplémentaires.

**⚠️**  Ne peut pas être cumulé avec l’option “Informations supplémentaires”.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5361:13291">

</design>

## Comportement

### Sélection par défaut

Il est possible de sélectionner ou non une valeur par défaut en fonction du contexte d’utilisation du composant. Un [article de NNGroup](https://www.nngroup.com/articles/radio-buttons-default-selection/) sur ce sujet est disponible.

**Sélectionner une valeur par défaut :**

* pour optimiser et fluidifier l’expérience. Si la plupart des utilisateurs font le même choix, vous pouvez sélectionner ce choix par défaut,
* pour indiquer à l’utilisateur qu’une réponse obligatoire est attendue. Lorsqu’une option est sélectionnée par défaut, il n’est pas nécessaire de marquer le champ comme étant obligatoire.

**Éviter de sélectionner une valeur par défaut :**

* si vous ne savez pas ce que souhaite faire l’utilisateur,
* pour s’assurer que l’utilisateur consulte la liste des options et sélectionne de son plein-gré.

### Champ en erreur

Un message d'erreur s'affiche lorsque le champ est indiqué comme obligatoire et qu’aucune option n’est sélectionnée. Les Input framed portent alors la couleur Critical.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=5361:13297">

</design>

### Disposition

L'Input framed peut être disposé selon plusieurs orientations en fonction du contexte et de l’espace disponible, en suivant les recommandations liées au composant Fieldset :

* **disposition verticale** pour une utilisation au sein d’un formulaire,
* **disposition horizontale** quand les options sont visuellement simples et équilibrées ou quand on veut un rendu plus compact (dans un maximum de 4 par ligne),
* **disposition en grille** idéale quand les options sont visuellement similaires et doivent être comparées facilement (dans un maximum de 4 par ligne).

L’espacement entre les options est de 12px, aussi bien horizontalement que verticalement.

- **Do** : Nous utilisons la disposition verticale si le choix d’une option déclenche un formulaire contextuel.
- **Don't** : Nous n’utilisons pas la disposition en grille si le choix d’une option déclenche un formulaire contextuel.
- **Do** : En disposition grille, la hauteur de tous les Input framed disposés sur une même ligne doit être la même.
