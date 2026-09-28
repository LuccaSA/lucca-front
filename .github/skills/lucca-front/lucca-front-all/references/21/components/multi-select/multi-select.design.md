# multi-select — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/927519)

# Design

**Mots-clés :**multi-select, sélection, multiple

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

### Placeholder

Le placeholder "**Sélectionner…**" est obligatoire. Il incite l'utilisateur à choisir une option dans le menu de sélection et disparaît une fois que l'utilisateur a fait son choix.

- **Do** : Utilisons seulement "Sélectionner…" comme placeholder dans les Select.
- **Don't** : N’utilisons pas de placeholder pour indiquer un état vide dans un Select.
- **Don't** : Nous n’indiquons pas l'objet de la sélection dans le placeholder du Select.
- **Don't** : Le placeholder "Sélectionner…" est obligatoire dans un Select.

### Champ désactivé

Un champ désactivé indique que l’utilisateur ne peut pas interagir avec : il ne peut ni ouvrir la liste des options, ni en changer la valeur. Le champ est visible mais inactif.

Un Tooltip doit s'afficher au survol, indiquant à l'utilisateur les raisons de cet état.

- **Don't** : Un champ désactivé vide ne doit pas afficher de placeholder.
- **Don't** : Un champ désactivé rempli ne doit pas afficher de Clear. L'utilisateur ne peut pas interagir avec le champ.

### Faux indicateur de sélection

Dans les formulaires de paramétrage, le composant Select Multiple est fréquemment utilisé comme un filtre pour délimiter des populations (établissements, départements, métiers, qualifications, etc.).

Si **aucune option n'est sélectionnée**, toutes les options disponibles sont implicitement considérées comme sélectionnées. Cette règle est essentielle pour garantir que le filtre n'exclut aucune donnée par défaut.

Afin de refléter ce comportement par défaut, nous utilisons un faux indicateur de sélection en lieu et place du placeholder classique.

### Tout sélectionner

Lorsque nécéssaire, une option "Tout sélectionner" est affichée en première dans le menu déroulant. Ce raccourci permet de sélectionner toutes les options en un clic.

### Regroupements d'options

Les options sélectionnables peuvent être regroupées en catégories.

Un titre vient alors se positionner en en-tête de la catégorie ainsi qu'un bouton "Tout sélectionner" pour sélectionner toutes les options de cette catégorie.

Si l'utilisateur effectue une recherche, l'affichage dans le menu déroulant est modifié. Le nom de la catégorie est affiché en texte secondaire sous l'option.

### **Structure arborescente**

Cette option permet d'afficher une relation de parenté entre plusieurs options. Dans ce contexte, l'utilisateur peut sélectionner le parent et ses enfants, le parent seul ou les enfants seuls.

Lors d’une recherche, on affiche l’intégralité de l’arborescence (parents et enfants).

### Bouton d'ajout d'option

Lorsque la création est une action fréquente, l'option "+ Ajouter une nouvelle option" est affichée en permanence en fin de liste.

Si le contenu dépasse la zone d'affichage, cette option devient sticky pour rester toujours visible au bas du menu déroulant.

Pour les cas où l'option n'est pas affichée par défaut, l'utilisateur a la possibilité d'ajouter une nouvelle option après avoir saisi une recherche.

Si une saisie est détectée, le bouton "Ajouter [Terme recherché]" apparaît, permettant de créer une nouvelle option et pré-remplissant automatiquement son nom.

### Sélection d'un collaborateur

#### Inclure les collaborateurs partis

Cette option permet d'inclure dans la liste des collaborateurs sélectionnables les collaborateurs ayant quitté l'entreprise (anciens collaborateurs). Par défaut, seuls les collaborateurs actifs sont affichés. En cochant cette case, la liste s'étend pour afficher aussi les collaborateurs partis.

#### Mise en avant de l'utilisateur

Cette option met en avant l'utilisateur courant dans la liste des collaborateurs. Le nom de l'utilisateur connecté est affiché en premier, précédé de la mention "Moi :". Cela facilite la sélection rapide de soi-même dans la liste.

#### Affichage de l'avatar des collaborateurs

Cette option affiche un avatar (ou les initiales) à côté du nom de chaque collaborateur dans la liste déroulante.

## Comportement

### Affichage des résultats

Les valeurs sélectionnées s’affichent avec le composant Chip à l’intérieur du Select. La hauteur du Select s’adapte au nombre de valeurs sélectionnées.

Il est possible d'afficher un nombre maximum de Chips. Au delà, on affiche un compteur à la suite de la dernière Chip indiquant le nombre d'option sélectionnées en plus.

Lorsque l'option "Tout sélectionner" est activée, il n'est techniquement pas possible d'afficher l'entièreté des Chips dans le Select. L'affichage s'en trouve donc modifié, le Select affiche un compteur sous forme de Chip unique.

### Recherche

La recherche se fait directement dans le champ de saisie. Le menu déroulant se réduit pour n’afficher que les résultats de la recherche.

Par défaut, lorsque l'utilisateur sélectionne une option, la recherche se réinitialise et le menu déroulant affiche l’ensemble des options.

Une option `keepSearchAfterSelection` permet de ne pas réinitialiser la recherche après la sélection.

C'est intéressant pour des données comme les métiers ou les qualifications, quand l'utilisateur peut vouloir sélectionner plusieurs options correspondants à sa recherche.

### État vide

Le contenu du menu déroulant peut être vide lorsqu'il n'existe aucune donnée disponible ou qu'une recherche ne donne aucun résultat. Le message doit être adapté pour chacun de ces cas.

Cet état peut être cumulé avec l'ajout d'option. C'est notamment pratique pour pouvoir créer une nouvelle donnée directement depuis le Select ou via une Dialog.

### Chargement

L'indication de chargement s'affiche pour prévenir l'utilisateur que le champ est en train de charger une ou plusieurs données.

Cela peut se produire à l’ouverture du menu déroulant, lorsque l’utilisateur effectue une recherche ou quand il scroll et qu’une quantité de donnée est chargée.

### États spécifiques

#### Affichage d'une erreur

Un message d'erreur s'affiche sous le champ lorsque les exigences du Select ne sont pas remplies, incitant l'utilisateur à y répondre. L'utilisateur ne pourra pas soumettre le formulaire tant que les erreurs ne sont pas corrigées.

Si un message d'aide était présent, le texte du message d'erreur doit fournir les mêmes informations que le message d'aide, en plus d’expliciter l’erreur.

#### Option sélectionnée en alerte ou erreur

Il est possible que certaines alertes ou erreurs soient liées à une ou plusieurs options sélectionnées par l'utilisateur. Dans ce cas, la Chip correspondant à cette valeur porte le feedback d'alerte ou d'erreur (couleur + icône).

## Règles d'utilisation

### Checkbox ou Select

Utilisons un groupe de Checkbox plutôt qu’un Select lorsque :

* les utilisateurs doivent voir immédiatement toutes les options disponibles,
* il est important de comparer visuellement les options,
* le nombre d’options est limité (en général entre 2 et 5),
* l’action est fréquente ou doit être rapide à effectuer, car les Checkbox permettent une sélection directe sans ouvrir de menu déroulant.

- **Do** : Privilégions un groupe de Checkbox quand l'utilisateur doit voir toutes les options possibles.
- **Caution** : N'utilisons pas de Select si le Label ne permet pas d'expliciter les options possibles.

### Affichage du label

Chaque Select doit avoir un label. Un Select sans label est ambigu et non accessible.

- **Do** : Affichons systématiquement un label aux champs de formulaire.
- **Don't** : Un Select sans label est ambigu et non accessible.

### Choisir une largeur appropriée

La largeur doit être basée sur la grille de construction d'un formulaire et prendre la largeur maximale possible (4 colonnes). De manière générale, le champ doit prendre la plus grande largeur possible sur l’interface.

- **Do** : Le Select multiple doit utiliser toute la largeur disponible dans un formulaire, soit les 4 colonnes de la grille de construction.
- **Don't** : N'affichons pas un Select multiple sur 1, 2 ou 3 colonnes. Le rendu n'est pas optimal pour afficher les options sélectionnées.

### **Largeur du menu déroulant**

Le menu déroulant a une largeur minimale correspondant à la largeur du Select. Sa largeur peut être plus grande que le Select si certaines options nécessitent un affichage plus large.

- **Do** : Le menu déroulant doit toujours avoir une largeur minimale équivalente à la largeur du Select.
- **Don't** : La largeur du menu déroulant ne doit pas s'adapter à son contenu, au risque d'être plus petit que le Select.

# Design (iOS)

## Anatomie

## Options

### Bouton d'ajout d'option

Lorsque la création est une action fréquente, l'option d’ajout est affichée en permanence en haut à droite de l’écran.

L'utilisateur a la possibilité d'ajouter une nouvelle option après avoir saisi une recherche, si celle-ci n’a donné aucun résultat.

## Comportement

### Recherche

La recherche se fait depuis la barre de recherche en haut de l’écran de sélection. Les résultats sont mis à jour en temps réel lors de la saisie au clavier.

Lorsque l’utilisateur sélectionne une option, il reste dans le contexte de recherche. Il est possible de quitter la recherche en appuyant sur le bouton “Annuler” à côté de la barre de recherche.

### État vide

Le contenu de l’écran de sélection se transforme en *empty state* lorsqu'il n'existe aucune donnée disponible ou qu'une recherche ne donne aucun résultat. Le message doit être adapté pour chacun de ces cas.

Cet état peut être cumulé avec l'ajout de option. C'est notamment pratique pour pouvoir créer une nouvelle donnée directement via une Fullscreen Sheet.

### Nombre d'options sélectionnées

Le nombre d’options sélectionnées est affiché dans un compteur à côté du bouton de validation.

Si aucune option n’est sélectionnée, le compteur n’est pas affiché.

### Affichage des résultats

Les options sélectionnées s’affichent avec le composant Chip à l’intérieur du Select, sur une seule ligne. Un effet de débordement est présent si les résultats dépassent de la largeur du Select.

Il est possible de voir les options suivantes à l’aide du swipe.

## Règles d'utilisation

### Résumé de sélection

N’affichons pas les options sélectionnées depuis l’écran de sélection : elles minimisent la zone d’affichage et rendent la lecture de l’écran plus difficile.

Privilégions l’affichage des options depuis l’Input seulement.

- **Do** : Les options peuvent être consultées après la validation en utilisant le format Chip.
- **Don't** : Le nombre d'options visibles à l’écran est drastiquement réduit lorsque les options sélectionnées sont affichées au dessus du bouton de sélection.

### Orientation du chevron

L’ouverture de l’écran de sélection provoque un changement de page. Le chevron doit donc être orienté vers la droite pour indiquer la présence d’une navigation.

# Design (Android)

## Anatomie

## Options

### Bouton d'ajout d'option

Lorsque la création est une action fréquente, l'option d’ajout est affichée en permanence en haut à droite de l’écran.

L'utilisateur a la possibilité d'ajouter une nouvelle option après avoir saisi une recherche, si celle-ci n’a donné aucun résultat.

## Comportement

### Recherche

La recherche se fait depuis la barre de recherche en haut de l’écran de sélection. Les résultats sont mis à jour en temps réel lors de la saisie au clavier.

Lorsque l’utilisateur sélectionne une option, il reste dans le contexte de recherche. 

### État vide

Le contenu de l’écran de sélection se transforme en *empty state* lorsqu'il n'existe aucune donnée disponible ou qu'une recherche ne donne aucun résultat. Le message doit être adapté pour chacun de ces cas.

Cet état peut être cumulé avec l'ajout de option. C'est notamment pratique pour pouvoir créer une nouvelle donnée directement via une Fullscreen Cover.

### Nombre d'options sélectionnées

Le nombre d’options sélectionnées est affiché dans un compteur à côté du bouton de validation.

Si aucune option n’est sélectionnée, le compteur n’est pas affiché.

### Affichage des résultats

Les options sélectionnées s’affichent avec le composant Chip à l’intérieur du Select, sur une seule ligne. Un effet de débordement est présent si les résultats dépassent de la largeur du Select.

Il est possible de voir les options suivantes à l’aide du swipe.

## Règles d'utilisation

### Positionnement du label

Sur Android, le label est positionné à l’intérieur du champ de sélection. Ce choix est fait pour respecter les spécifications de **[Material Design](https://m3.material.io/components/text-fields/specs#6d654d1d-262e-4697-858c-9a75e8e7c81d)** sur les champs de formulaire.

- **Do** : Le label à l’intérieur du champ permet de maximiser la zone de touche.

### Résumé de sélection

N’affichons pas les options sélectionnées depuis l’écran de sélection : elles minimisent la zone d’affichage et rendent la lecture de l’écran plus difficile.

Privilégions l’affichage des options depuis l’Input seulement.

- **Do** : Les options peuvent être consultées après la validation en utilisant le format Chip.
- **Don't** : Le nombre d'options visibles à l’écran est drastiquement réduit lorsque les options sélectionnées sont affichées au dessus du bouton de sélection.

### Orientation du chevron

L’ouverture de l’écran de sélection provoque un changement de page. Le chevron doit donc être orienté vers la droite pour indiquer la présence d’une navigation.

# Content

## Contenu et rédaction

### **Label**

* Le label répond clairement à : "Qu'est-ce que je sélectionne ?" en restant descriptif et minimaliste. Pas de ton "parlé".
* Le label est **toujours au singulier**, même si le composant permet de sélectionner plusieurs éléments. L'affordance visuelle (Checkbox, Chips) suffit à signaler la multiplicité.
* Tous les intitulés (label, placeholder, liste des valeurs, message d'aide) commencent par une majuscule. Le reste en minuscule.
* Le message d'aide (Tooltip) explique le contexte (pourquoi + quand), sur maximum 2 lignes (1 seule idéalement). Point final obligatoire.

- **Do** : Utilisons le singulier pour les labels.
- **Don't** : N'utilisons pas le pluriel, cela suggère un caractère obligatoire de la pluralité.
- **Don't** : N'utilisons pas le pluriel optionnel entre parenthèse, cela casse la lecture et créé de la confusion.
- **Don't** : N'utilisons pas de verbe d'action dans le label. Le composant suffit pour indiquer ce qui est attendu.

### **Message**

Le message d'aide (Tooltip) explique le contexte (pourquoi + quand), sur maximum 2 lignes (1 seule idéalement). Point final obligatoire.
