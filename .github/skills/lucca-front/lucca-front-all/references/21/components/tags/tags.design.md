# tags — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/6036ad)

# Design

**Mots-clés :**étiquette

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

Le Tag s'adapte aux besoins de classification grâce à plusieurs configurations de contenu et de couleur :

### **Thèmes de couleur**

Le Tag utilise exclusivement une apparence `outlined`, déclinable selon trois palettes : `product`, `neutral`, `decorative`.

### **Icône**

L’affichage d'une icône à gauche du label est optionnelle. Son utilisation doit être limitée et réservée aux **situations où l'icône apporte une réelle valeur d'identification sémantique**, sous peine de surcharger inutilement l'interface.

## Cas d’usage

### **Mise en avant d'un attribut ou d'une nouveauté**

Le Tag permet d’attirer rapidement l'attention de l'utilisateur sur une caractéristique temporaire ou importante d'un objet, par exemple « Nouveau » ou « Le plus utilisé » sur une fonctionnalité.

Dans ce contexte, le Tag ne doit pas afficher d’icône et doit utiliser la couleur `product`.

Un objet ne doit porter qu'**un seul Tag de mise en avant** à la fois afin de garantir un impact maximal.

- **Don't** : Ne cumulons pas les Tag pour mettre en avant un attribut

### **Catégorisation de plusieurs objets**

Le Tag peut être utilisé pour identifier des objets similaires au sein d'une liste ou d'un tableau. Il est possible de faire cohabiter plusieurs couleurs pour distinguer des concepts distincts, l’utilisation de l’icône est optionnelle. Cependant, pour créer un repère visuel fiable, une même catégorie doit **toujours** conserver la même couleur.

En cas de grand nombre de catégories, privilégiez l'utilisation de la couleur `neutral` pour l'ensemble des tags.

- **Do** : Privilégions les Tags en neutral lorsqu’il existe un grand nombre de catégories.
- **Caution** : Évitons d’utiliser des Tag en couleur lorsqu’il existe un grand nombre de catégories. Cela peut perturber la lecture.
- **Don't** : N’utilisons pas les mêmes couleurs pour des catégories différentes.

### **Mise en avant d'une donnée issue de l'IA**

Sur les fonctionnalité utilisant l’IA, utilisez le Tag pour signaler clairement à l'utilisateur qu'une donnée a été pré-remplie automatiquement par une intelligence artificielle.

Le Tag AI possède sa propre couleur et doit être obligatoirement associé d’un icône correspondant aux codes graphiques de l’IA.

- **Don't** : N’utilisons pas le Tag AI sans icône.

## Comportement

### Interactivité

Le Tag est un composant **statique**. Il n'est pas cliquable et ne déclenche aucune action.

- **Don't** : Le Tag ne doit pas être cliquable.

### Ellipse

La propriété `withEllipsis` permet de gérer le comportement du texte au sein du Tag en cas de débordement, garantissant ainsi l'intégrité des mises en page. Lorsqu'elle est activée, elle déclenche les comportements suivants :

* **Troncation automatique :** si le label est plus large que le Tag, le texte est automatiquement tronqué et se termine par des points de suspension (...).
* **Tooltip d'accessibilité :** pour garantir que l'information reste entièrement accessible, le survol d'un Tag tronqué fait obligatoirement apparaître un Tooltip affichant le label dans son intégralité.

## Règles d’utilisation

### Label concis

Utilisez des termes très courts (1 à 2 mots maximum) pour que l’information reste lisible en un coup d'œil.

- **Do** : Utilisons un label court et explicite.
- **Don't** : Évitons les phrases, descriptions trop longue et les verbes d’actions.

### Densité

Évitez de saturer l'écran avec une profusion de Tags. Trop de Tags côte à côte annulent l'effet de catégorisation et fatiguent l'utilisateur.

- **Do** : Limitons le nombre de Tags affichés simultanément sur un même objet.
- **Don't** : Évitons de cumulez les tags sur un objet.
