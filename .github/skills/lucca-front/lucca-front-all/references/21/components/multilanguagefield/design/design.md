# multilanguagefield — Design

**Mots-clés :**multilingue, traduction, i18n, langues

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

### Valeur universelle

Par défaut, le champ principal accepte une valeur **indépendante de toute considération linguistique** (chaîne brute). Cette valeur sert de contenu de repli universel : elle sera affichée automatiquement à l'utilisateur final si aucune traduction spécifique n'a été renseignée pour sa langue cible.

Le Popover contenant les champs de traduction **ne s'ouvre pas automatiquement** au focus. L'utilisateur doit cliquer sur le bouton de traduction pour le déployer. Il est néanmoins possible d'activer l'ouverture automatique du Popover dès le focus du champ en activant la propriété `openOnFocus` pour pousser l’utilisateur à traduire.

Un message indiquant « Sans traduction renseignée, la valeur principale sera utilisée » est affiché en introduction du Popover.

### Sans valeur par défaut

Il est possible de configurer le MultiLanguageTextfield pour ne pas utiliser de langue de repli, via l’option `hasNoInvariant`.

Cette option doit être utilisée lorsque des paramètres de langues sont définit au niveau de l’objet, par exemple dans un parcours de création de ressource dans lequel est appliqué le pattern de traduction de formulaire.

Dans ce cas, un label est affiché dans le champ principal pour indiquer la langue de rédaction et le Popover contenant la liste des langue doit s’afficher automatiquement via la propriété `openOnFocus`.

Les langues à traduire, définies dans les paramètres de langue, sont **obligatoires**. Nous n’affichons pas de message dans le Popover.

Si des langues ne sont pas renseignées, le champ indique une erreur. En ouvrant la liste des langues à traduire, les champs non renseignés apparaissent en erreur. Un message indique « La traduction est obligatoire »

### Inactif

Un champ inactif indique qu'un champ de saisie existe, mais qu'il n'est pas disponible dans ce contexte, à un instant donné. Cela peut être utilisé pour maintenir la continuité de la mise en page et indiquer qu'un champ peut devenir disponible ultérieurement.

Dans le cas du MultiLanguageTextfield, bien que le composant soit inactif, l'utilisateur **conserve la possibilité de déployer le Popover** en cliquant sur le bouton de traduction. Cela permet de consulter les traductions existantes sans pouvoir les éditer.

### Traduction automatique

Le composant MultiLanguageTextfield propose une aide à la traduction basé sur l’intelligence artificielle. Cette option permet à l'utilisateur de générer instantanément une traduction contextualisée à partir de la valeur saisie dans le champ principal.

Le bouton pour lancer la traduction apparaît lorsque l’utilisateur survol le champ à la souris ou lorsqu’il est focus dedans.

## Règles d'utilisation

### Choisir une largeur appropriée

La largeur doit être basée sur la grille de construction d'un formulaire et prendre la largeur maximale possible (4 colonnes). De manière générale, le champ doit prendre la plus grande largeur possible sur l’interface.

- **Do** : Le MultilanguageTextfield doit utiliser toute la largeur disponible dans un formulaire, soit les 4 colonnes de la grille de construction.
- **Don't** : N'affichons pas le champ sur 1, 2 ou 3 colonnes. Le rendu n'est pas optimal pour afficher les traductions.

### Affichage du Clear

Le MultilanguageTextfield reprend les règles du Textfield, nous n'affichons donc pas de Clear pour effacer le contenu, aussi bien pour le champ principal que pour les champs de traduction.

- **Don't** : N'affichons pas de Clear dans les champs de saisi, comme le MultilanguageTextfield, cela perturbe la lisibilité d'un formulaire.

### Titre de page

Le MultilanguageTextfield ne doit pas être utilisé pour changer le titre d’une interface et/ou le nom d'une ressource dans le cadre d'une modification.

Il faut pour cela privilégier un bouton ouvrant une Dialog comprenant le champ de saisi.

- **Do** : Affichons une Dialog pour modifier le nom d'une ressource.
- **Don't** : N'utilisons pas d'édition inline pour la modification d'un titre et/ou du nom d'une ressource.
