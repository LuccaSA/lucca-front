# richtextinput — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.2/storybook/?path=/docs/documentation-forms-fields-richtextinput-angular--docs)

## Angular

RichTextInput (`lu-rich-text-input`) est basé sur [Lexical](https://lexical.dev/).

Component selector : `lu-rich-text-input`

### Dépendances

Avant toute utilisation de `lu-rich-text-input`, il est nécessaire d'ajouter les `peerDependencies` suivantes à votre projet :

En fonction du format désiré en entrée / sortie du composant, les dépendances suivantes doivent être installées:

- HTML

- Markdown

- Plain text

### Formats d'entrée/sortie
Avant toute utilisation du composant, il est nécessaire de définir le formateur à utiliser.

Trois formateurs par défaut sont disponibles : sous forme de directives ou de services à provide au niveau du composant parent.

#### HTML

#### Markdown

* Directives disponibles :
  * `luWithMarkdownFormatter` : formateur markdown classique, avec les balises markdown standards.
  * `luWithMarkdownTagsFormatter` : formateur markdown avec support des [tags personnalisés](#TagTool).

* Providers

#### Plain Text

Ce formateur accepte en paramètres une liste optionnelle de `PlainTextTransformer` pour les noeuds custom.

Il peut être utilisé dans des contextes où le formatage riche n'est pas désiré, mais où l'on souhaite tout de même bénéficier d'un outil en particulier (l'outil [Tags](#TagTool) par exemple).

En conséquent:
- La plupart des outils n'auront aucun effet sur le contenu de l'éditeur.
- Il n'intègre pas les raccourcis clavier de formatage de texte (gras, italique, listes, etc...).
- La récupération du contenu se fait en texte brut lors du copier/coller.

### Barre d'outils

La barre d'outils du `lu-rich-text-input` est configuré directement depuis le template.

Pour plus de simplicité, une barre d'outil par défaut est mise à disposition.

Il est aussi possible de créer une barre d'outil personnalisée en assemblant les outils existant et en y ajoutant de nouvelles fonctionnalités.

Il est nécessaire d'avoir la barre d'outil pour utiliser les noeuds Lexical correspondants aux outils.
Pour cacher la barre d'outil tout en gardant les fonctionnalités, il est possible d'utiliser le composant `lu-rich-text-input` avec l'attribut `hideToolbar`.

#### Styles

- Bouton de style individuel

- Barre préconfigurée (Gras, Italique, Souligné)

#### Listes

- Barre préconfigurée (Puces, Numérotées)

#### Titres

- Barre préconfigurée (Paragraphe, H1, H2, H3...)

#### Liens

- Outil individuel

#### Suppression du formatage

- Outil individuel

#### <a id="TagTool"></a>Tag

- Outil individuel

L'outil prend en paramètre une liste de tag personnalisés, qu'il est possible d'insérer dans le contenu de l'éditeur, sous forme de chips.

Chaque tag est un objet avec une clé et une description optionnelle. La clé est utilisée pour l'insertion dans le contenu réel de l'éditeur, la description est uniquement utilisée pour la représentation visuelle de la balise.

Si la description n'est pas fournie, la clé sera utilisée à la place.

Les tags ont la forme `{{tag.key}}` dans le contenu brut en entrée/sortie de l'éditeur.
Si le contenu en entrée de l'éditeur contient des tags non reconnus par l'outil, ils seront automatiquement supprimés.

Pour gérer les tags en markdown ou en plain-text, il est nécessaire de fournir le transformer approprié.

### Ajout d'outils personnalisés

Les outils sont des composants implémentant l'interface `RichTextPluginComponent`. Cette interface est utilisée pour les outils et les barres d'outils.
Elle définit plusieurs méthodes et propriétés:

- `setEditorInstance(editor: LexicalEditor)` : Permet de récupérer l'instance de l'éditeur lexical lors de sa création, ce qui permet par exemple de s'abonner aux évènements Lexical.
- `setDisabledState(isDisabled: boolean)` : Permet de gérer l'état désactivé de l'outil.
- `getLexicalNodes()` : Optionnel. Renvoie les noeuds Lexical spécifiques à l'outil.
- `focus()` : Optionnel. Permet de définir le comportement de focus de l'outil.
- `pluginComponents`: Optionnel. `Signal` renvoyant les plugin internes à l'outil, s'il y en a (utilisé par exemple pour les barres d'outils).
- `tabindex`: Optionnel. `WritableSignal<number>` à appliquer sur l'élément de l'outil qui prend le tabindex lors de la navigation clavier.

Attention: si l'outil s'abonne à des évènements Lexical, il est faut penser à se désabonner lors de la destruction du composant.

### Ajout de formateurs personnalisés

Il est possible d'ajouter des formateurs personnalisés pour le `lu-rich-text-input`. Pour cela, il faut créer une classe qui implémente l'interface `RichTextFormatter`.

| Example | File |
|---------|------|
| Text input | [angular-text-input.md](./stories/angular-text-input.md) |
