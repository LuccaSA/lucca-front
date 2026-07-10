# bubble-icon — Design

## Options

### Formes

Plusieurs formes de bulles sont disponibles avec le composant Bubble icon. Elles sont portées par la propriété `direction` qui propose quatre valeurs : `top`, `right`, `bottom` et `left`. La forme de la bulle est aléatoire, ce qui permet de rendre l'interface plus dynamique lorsque plusieurs de ces icônes y sont présentes. Cette propriété peut être forcée si besoin.

### Couleurs

#### Couleurs des logiciels

Les Bubbles icons doivent s'adapter automatiquement à la palette de couleurs du logiciel. Cela garantit une intégration harmonieuse et cohérente avec le reste de l'interface.

#### Couleurs décoratives

Si le besoin d'apporter plus de dynamisme dans l'interface se fait ressentir, il est possible d'utiliser ces icônes avec les couleurs décoratives.

#### Couleurs de feedback

Il est possible d’appliquer les couleurs de feedback dans certains contextes pour appuyer visuellement l’intention sur l’impact de l’interaction par l’utilisateur.

## Cas d'usage

Les Bubbles icons sont utilisées pour illustrer et dynamiser des zones spécifiques de l’interface où l’utilisateur peut interagir. Elles apportent une dimension visuelle claire et attractive, facilitant la compréhension et l’utilisation des fonctionnalités.

### Resource card

Dans le composant Resource card, les Bubbles icons permettent d’identifier rapidement les différentes catégories ou types de ressources disponibles. Elles accompagnent les titres et descriptions pour renforcer la lisibilité et guider l’utilisateur dans la création ou la sélection d’éléments.

L’icône doit servir à différencier visuellement les types de ressources, donc elle est pertinente uniquement si elle apporte une information distinctive.

### Input framed

Les Bubbles icons peuvent aussi être intégrées dans des Input framed pour apporter un repère visuel supplémentaire. Elles illustrent la valeur du champ et doivent être différentes sur chacune des options.

- **Don't** : N’utilisons pas les Bubble icons dans les composants comme les Dropdowns.

- **Don't** : N’utilisons pas les Bubbles icons devant des titres ou une zone ou l’utilisateur ne dois pas interagir. Ce signal visuel fort crée un faux sentiment d'interactivité et incite l'utilisateur à cliquer inutilement.
