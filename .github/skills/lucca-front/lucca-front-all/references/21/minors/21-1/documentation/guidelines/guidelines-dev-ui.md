# Guidelines dev UI

# Content

## Règles d’usage

### Introduction

L'écriture du style d’une application web est complexe. Dans un contexte d’évolution permanente du design, d’architecture produit et d’accroissement des équipes, il est important de pouvoir mettre à jour des composants, en ajouter, en supprimer, et ce, de manière industrielle, sans crainte d’effets de bords.

Pour ces raisons, le dev UI chez Lucca répond à une méthodologie stricte, inspirée afin d’en assurer sa maintenabilité et sa compréhension.

#### Contexte

Tout nouveau module Lucca doit se baser sur Angular et [Lucca Front](https://github.com/LuccaSA/lucca-front). Les fichiers sont donc écrits en SASS et la transpilation CSS est assurée par dart-sass depuis Angular 8.

Lucca est composé de plusieurs applications, pour lesquelles [Lucca Front](https://github.com/LuccaSA/lucca-front) répond aux composants génériques sous la forme de styles et composants Angular réutilisables, eux même basés sur la librairie Figma de composants communs, maintenue et utilisée par les Product Designers. Ces composants sont personnalisables grâce au thème.

### Composants

Des boutons à la grille, en passant par le footer ou un élément de formulaire, tout est composant. Un composant peut exister sous la forme d’un composant Angular ou d’un composant CSS appliqué à la feuille de style globale. Ces composants doivent être — dans la mesure du possible — hermétiques les uns avec les autres, via l’encapsulation Angular ou le nommage de classes CSS, afin de ne pas rendre complexe leur maintenabilité.

#### Structure

Un composant répond à une structure type BEM (Block Element Modifier) : `.composant-descendant-descendant`

Cette structure est calquée sur l’imbrication HTML et permet d’appeler chaque élément du composant grâce à une classe unique, limitant ainsi sa spécificité (ou poids de la déclaration).

Le composant doit être nommé de façon claire et en anglais (ex. button, textfield, etc.) et être associé à une feuille de style unique portant le même nom. S’il s’agit d’un composant Angular dont le nom est complexe, la classe associée pourra être simplifiée, mais devra rester suffisamment explicite.

Chaque enfant est séparé d’un `-` (kebab case). Afin de simplifier la lecture, on utilisera le camelCase sur le nom d’un composant ou d’un descendant comportant plusieurs mots.

Ex. `emptyState-title`

Les ID (spécificité très lourde) et les éléments HTML (pas assez spécifiques) sont à bannir de nos feuilles de style et on évitera de découper une classe en plusieurs déclarations afin de simplifier la lecture du document et la recherche au sein d’un projet.

| ✅  | ❌ |
| --- | --- |
| `.header-menu-logo {` `}` | `.header .menu .logo {` `}` |
|   | `.header-menu img {` `}` |
|   | `.header {`   `&-menu {`     `&-logo {`     `}`   `}` `}` |

#### Modifiers

Les modifiers, ou *mods* permettent de créer une variation du style d’un composant : `.button.mod-invert`

Ils peuvent servir à modifier différents attributs d’un composant, comme la structure, la couleur, la taille, etc. et peuvent être placé sur le composant ou sur un descendant.

Le *mod* ajoute une seconde classe au composant, ce qui augmente sa spécificité et permet d’éviter de générer des problèmes liés au *cascading*.

Un composant peut recevoir plusieurs mods.

Un *mod* ne peut pas vivre seul, il est forcément rattaché à un composant afin de rester encapsulé.

| ✅  | ❌ |
| --- | --- |
| `.button {`   `&.mod-invert {`   `}` `}` | `.mod-invert {` `}` |
| `.table {`   `&.mod-S {`     `.table-body-row-cell {`     `}`   `}` `}` |   |

Les mods sont placés après le style principal du composant afin ne pas surcharger sa lecture.

#### États

Les états, ou *states* permettent de créer une variation liée à l’état d’un composant. `.button.is-loading`

Il sont renseignés par le controller et peuvent couvrir de nombreux états comme : activé, caché, déroulé, désactivé, chargé, etc.

L’état ajoute une seconde classe au composant, ce qui augmente la spécificité et permet d’éviter de générer des problèmes liés au *cascading*.

Un composant peut recevoir plusieurs états.

Un état ne peut pas vivre seul, il est forcément rattaché à un composant afin de rester encapsulé.

| ✅  | ❌ |
| --- | --- |
| `.button {`   `&.is-success {`   `}` `}` | `.is-success {` `}` |

Les états sont placés après le style principal du composant afin ne pas surcharger sa lecture.

#### Media Queries

Les media queries sont intégrées directement dans les définitions concernées. Elles ne doivent pas être placées dans un fichier à part ou en fin de document afin d’éviter de laisser du code mort en cas de suppression d’une partie d’un composant.

#### Exemple d’un composant CSS type

```sass
.component {
  ...
}

.component-descendent {
  ...

  @media {
    ...
  }
}

.component {
  &.mod-L {
    ...
  }
}

.component {
  &.is-active {
    ...
  }
}
```

Des media queries usuelles sont disponibles dans Lucca Front sous forme de mixins.

### Encapsulation des composants

Dans la mesure du possible, le style des composants ne doivent pas communiquer entre eux, ceci afin d’éviter l’effet “pelote de laine”, et ainsi rendre complexe la maintenabilité du design.

Un composant peut cependant en contenir un autre.

| ✅  | ❌ |
| --- | --- |
| `<div class=”grid”>`   `<div class=”grid-6@mediaMinXS”>`     `<div class=”card”>`     `</div>`   `</div>` `</div>` | `<div class=”grid”>`   `<div class=”grid-6@mediaMinXS card”>`   `</div>` `</div>` |

### **Layers**

Afin de structurer le CSS de Lucca Front et d'optimiser la spécificité de ses sélecteurs, des [layers CSS](https://developer.mozilla.org/fr/docs/Web/CSS/@layer) sont utilisés. Ils sont organisés ainsi, de la priorité la plus basse à la plus haute : 

```css
reset → base → components → mods → product → utils
```

Lucca Front utilise toutes ces couches, sauf `product`qui, comme son nom l’indique, est réservée pour le code CSS côté produit.

Pour profiter pleinement des layers, il convient donc d’encapsuler le code produit d'un `@layer product { … }`.

### Règles de nommage avancées 

#### Groupe de composants

Afin d’identifier l’appartenance au composant initial, et afin d’éviter toute confusion avec un terme générique en *camelCase,* les éléments parents qui regroupent plusieurs composants identiques ou qui offrent des fonctionnalités additionnelles à un composant sont nommés à partir de cette structure : `.componantFonctionWrapper`.

1. Le nom du composant en début de sélecteur est obligatoire.
2. Ce qui permet de décrire plus précisément ce que fait l’élément englobant n’étant pas toujours nécessaire, la fonction est facultative.
3. `Wrapper` est à la fin du sélecteur est obligatoire.

Ex. `.avatarWrapper` est un parent de plusieurs composants `.avatar`.

Ex. `.tableOverflowWrapper` est un parent du composant `.table` qui permet de lui ajouter une capacité de débordement.

| ✅  | ❌ |
| --- | --- |
| `.buttonWrapper` `.buttonGroupWrapper` | `.buttons` `.button-wrapper` `.buttonGroup` `.wrapperButton` `.group` |

#### Composants sans parent unique

Les composants en plusieurs parties qui ne sont pas regroupées par un parent se doivent d’être identifiés comme tels, toujours dans un souci d’identification facile du composant principal. C’est le caractère `_` qui indiquera alors la notion d’éléments frères.`-` décrit la descendance, `_`  l’adjacence.

1. Le nom du composant en début de sélecteur est obligatoire.
2. Le caractère d’adjacence `_` est obligatoire.
3. La fonction du composant est obligatoire à la fin du sélecteur.

Ex. `.dialog_backdrop` est un élément frère du composant `.dialog`.

| ✅  | ❌ |
| --- | --- |
| `.viewTabs_panel` | `.panel` `.viewTabs-panel` `.viewTabsPanel` `.panel_viewTabs` |

#### Sous-composants optionnels

Les sous-composants optionnels sont identifiés avec `.component-functionOptional`. On peut ainsi facilement voir à quel composant ils sont rattachés, comprendre leur fonctionnalité, et identifier qu’ils sont facultatifs dans l’imbrication HTML.

1. Le nom du composant en début de sélecteur est obligatoire.
2. La fonction du sous-composant est obligatoire.
3. `Optional` est obligatoire à la fin du sélecteur.

Ex. `.dialog-formOptional` est un sous-composant optionnel pour les formulaires dans les boîtes de dialogue.

| ✅  | ❌ |
| --- | --- |
| `.dialog-formOptional` | `.dialog-form` `.dialog-optional`  `.dialog-optionalForm` |

Les éventuels sous-composants de ces sous-composants optionnels ne reprennent pas leur noms. Ex. Un enfant de ce composant sera intitulé `.dialog-footer`, sans reprendre la notion de formulaire (puisqu’il est optionnel).

| ✅  | ❌ |
| --- | --- |
| `.dialog-footer` | `.dialog-form-footer` `.dialog-formOptional-footer`  |

### Particularités des composants Angular

#### Structure

Dans la mesure du possible, utiliser la déclaration `:host` (ou cibler l'élément Angular en fonction des réglages d'encapsulation du composant) pour le style à la racine du composant. Des classes peuvent être ajoutées via l’[host binding](https://angular.io/api/core/HostBinding) d’Angular. Cela permet d’éviter des niveaux de DOM inutiles.

On évite aussi la multiplication des `*ngIf`. On peut notamment s’appuyer sur les `ng-container` pour encapsuler plusieurs éléments dont l’affichage répond à la même condition.

| ✅  | ❌ |
| --- | --- |
| `<ng-container *ngIf=”isDisplayed”>`   `<div>…</div>`   `<div>…</div>` `</ng-container>` | `<div *ngIf=”isDisplayed”>…</div>` `<div *ngIf=”isDisplayed”>…</div>` |

Dans une logique conditionnelle, `ng-template` peut également être utilisé afin de remplacer un contenu par un autre. Cette méthode peut s'avérer utile pour contrôler l'affichage de composants type empty state, loading…

```html
<table class="table" *ngIf="…; else loading">
  …
</table>

<ng-template #loading>
  <div aria-hidden="true" class="loading"></div>
  <span class="u-mask">Loading…</span>
</ng-template>
```

#### host-context / ::ng-deep

Lorsque le contexte impose la modification d’un composant Angular, on privilégiera l’utilisation d'un `:host-context` à celui d'un `::ng-deep`. Cela permet notamment de garder le style du composant à l'intérieur de ce dernier.

Qui plus est, `::ng-deep` est voué à être déprécié.

### Mixins

Les *mixins* permettent de factoriser du code afin de l’exploiter à divers endroits. Elles sont utiles mais complexifient grandement la compréhension du style (style d’un même composant partagé entre plusieurs sources, possibilité d'altérer un autre composant sans le vouloir, plus coûteux pour remonter à la source…).

Elles sont donc à utiliser avec parcimonie afin d’éviter l’effet “pelote de laine”.

On privilégiera donc l’utilisation de *mixins* sur du code partagé à de nombreux endroits, qui demanderait beaucoup de temps de réécriture (ex. dégradé de fond, style erreur, etc.)

### Utilitaires

Les utilitaires, ou *utilities*, sont des déclarations universelles, utilisables partout.

Elles ont des utilisations variées comme la gestion des couleurs, des marges, du padding, de l’alignement, du retour à la ligne, etc.

Elles sont les seules à utiliser la règle `!important` afin d’écraser le style à coup sûr et ne doivent donc être utilisées qu'en bout de chaîne.

### Variables Lucca Front

Lucca Front embarque de nombreuses variables globales ou liées aux composants qui peuvent être utilisées et écrasées. Il est nécessaire de les utiliser systématiquement, et ce, dans une logique de maintenabilité.

Exemple :

```sass
.class {
  left: var(--commons-navSide-width);
  top: calc(var(--commons-banner-height) + var(--commons-navSide-mobile-toggle-height));
  color: var(--palettes-primary-700);
}
```

### Style consistant

Les règles décrites ci-dessous sont paramétrées dans Lucca Front et peuvent être automatiquement appliquées via l'utilisation de l'extension [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Afin de rendre l’édition et la lisibilité du style plus aisé pour tous, il est important de respecter quelques bonnes pratiques :

* Pas d'espace avant les `:`, mais un espace après.
* Indentation par tabs
* Une ligne par déclaration
* Une ligne sauté avant chaque nouvelle classe
* Pas de prefix (utilisation d’outils comme autoprefixer)
* Déclarations classées par ordre alphabétique
* Utiliser les reductions de style (ex : `0 1rem` à la place de `0 1rem 0 1rem`, ou `.15` à la place de `0.15`)
* Nombres hexadécimaux en majuscules
* Pas d’imbrication du nom des classes (ex : `&-descendant`)
* kebab + camel

Exemple :

```sass
.emptyState {
  margin: 5rem auto;
  max-width: 30rem;
  padding: .5rem 2rem;
  text-align: center;
}

.emptyState-title {
  color: #AAAAAA;
}

.emptyState-description {
  color: #AAAAAA;
  margin-bottom: 2rem;
}
```

Le respect du style permettra de rester dans un environnement propre, faisant ainsi écho à la [théorie des carreaux cassés](https://www.vanschneider.com/the-broken-window-theory).

### Shame.scss

Dans chaque projet, un fichier [shame.scss](https://csswizardry.com/2013/04/shame-css/) est créé.

Ce fichier permet de répondre aux problématiques de délais des mises à jour de Lucca Front, ou simplement de corriger un bug rapidement sans générer de la dette qui sera oubliée dans le futur.

Il permet également aux contributeurs Lucca Front de tracer facilement ce code, afin de le supprimer.

Ce fichier est divisé en 3 sections :

```sass
// Next update (numéro de prochaine maj)
  Code fixé dans la prochaine version de Lucca Front

// In roadmap
  Bugs ou features référencés dans la roadmap Lucca Front, mais pas encore implémentées

// Not logged
  Bugs ou features pas encore répertoriés par Lucca Front
```

Ce fichier doit être mis à jour à chaque update de Lucca Front.

### Où placer mon style ?

* Un composant CSS métier réutilisé à plusieurs endroits dans l’application pourra être placé dans un dossier `/components`.
* Une extension d’un composant Lucca Front pourra être placée dans un dossier `/theme/components`.
* Du style exclusivement lié à un composant de l’application, sera placé dans le fichier scss du composant, afin de le garder encapsulé.
* Du style répondant à un besoin ou un fix Lucca Front sera placé dans le fichier `shame.scss` afin d’être traité par un contributeur Lucca Front.

Il est donc important de se demander si tout ce qui est placé dans un composant concerne bien le composant en question ou un besoin plus générique.

De la même manière, il faut se demander si un composant ne peut pas être sous-découpé en plusieurs sous-composants.

### Résumé

* Nommage des composants : `composant-descendant-descendant`
* Utilisation du kebab case + camelCase pour les descendants à plusieurs mots
* Modifiers : `.componsant-descendant.mod-…` — pas de .mod- isolé
* États : `.componsant-descendant.is-…` — pas de `.is-…` isolé
* Placer les media queries directement dans les déclarations
* Utiliser les mixins et imports avec parcimonie
* Utilities préfixés en `u-…`
* Multiplier les composants et les petits fichiers
* Pas d’ID, de sélecteur HTML
* Rester propre et régulier et rendre le fichier plus clair pour la prochaine utilisation
