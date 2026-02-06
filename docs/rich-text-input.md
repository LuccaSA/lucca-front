### Dépendances

Avant toute utilisation de `lu-rich-text-input`, il est nécessaire d'ajouter les `peerDependencies` suivantes à votre projet :

```sh
npm i lexical @lexical/history @lexical/link @lexical/text @lexical/rich-text @lexical/selection @lexical/utils
```

En fonction du format désiré en entrée / sortie du composant, les dépendances suivantes doivent être installées:

- HTML

```sh
npm i @lexical/html
```

- Markdown

```sh
npm i @lexical/markdown
```

- Plain text

```sh
npm i @lexical/plain-text
```

### Formats d'entrée/sortie
Avant toute utilisation du composant, il est nécessaire de définir le formateur à utiliser.

Trois formateurs par défaut sont disponibles : sous forme de directives ou de services à provide au niveau du composant parent.

#### HTML

```angular2html
<lu-rich-text-input luWithHtmlFormatter></lu-rich-text-input>
```

```ts
import { provideLuRichTextHTMLFormatter } from '@lucca-front/ng/forms/rich-text-input/formatters/html';
provideLuRichTextHTMLFormatter();
```

#### Markdown

* Directives disponibles :
  * `luWithMarkdownFormatter` : formateur markdown classique, avec les balises markdown standards.
  * `luWithMarkdownTagsFormatter` : formateur markdown avec support des [tags personnalisés](#TagTool).
```angular2html
<lu-rich-text-input luWithMarkdownFormatter></lu-rich-text-input>
<lu-rich-text-input luWithMarkdownTagsFormatter></lu-rich-text-input>
```

* Providers
```ts
import { provideLuRichTextMarkdownFormatter } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
provideLuRichTextMarkdownFormatter(transformers);
```

#### Plain Text

Ce formateur accepte en paramètres une liste optionnelle de `PlainTextTransformer` pour les noeuds custom.

Il peut être utilisé dans des contextes où le formatage riche n'est pas désiré, mais où l'on souhaite tout de même bénéficier d'un outil en particulier (l'outil [Tags](#TagTool) par exemple).

En conséquent:
- La plupart des outils n'auront aucun effet sur le contenu de l'éditeur.
- Il n'intègre pas les raccourcis clavier de formatage de texte (gras, italique, listes, etc...).
- La récupération du contenu se fait en texte brut lors du copier/coller.

```angular2html
<lu-rich-text-input luWithPlainTextTagsFormatter></lu-rich-text-input>
```

```ts
import { provideLuRichTextPlainTextFormatter } from '@lucca-front/ng/forms/rich-text-input/formatters/plain-text';
provideLuRichTextPlainTextFormatter(transformers);
```


### Barre d'outils

La barre d'outils du `lu-rich-text-input` est configuré directement depuis le template.

Pour plus de simplicité, une barre d'outil par défaut est mise à disposition.

```angular2html
<lu-rich-text-input luWithMarkdownFormatter 
                    placeholder="Enter some text..." 
                    [(ngModel)]="example">
  <lu-rich-text-input-toolbar />
</lu-rich-text-input>
```

Il est aussi possible de créer une barre d'outil personnalisée en assemblant les outils existant et en y ajoutant de nouvelles fonctionnalités.

```angular2html
<lu-rich-text-input luWithMarkdownFormatter
                    placeholder="Enter some text..." 
                    [(ngModel)]="example">
  <div class="richTextField-toolbar-formatting">
    <div class="richTextField-toolbar-col">
      <div class="richTextField-toolbar-col-group">
        <lu-rich-text-plugin-text-style
          icon="formatTextBold"
          tooltip="Bold"
          format="bold"
        />
        <lu-rich-text-plugin-text-style
          icon="formatTextItalic"
          tooltip="Italic"
          format="italic"
        />
      </div>
      <lu-rich-text-toolbar-list-style />
      <lu-rich-text-plugin-link />
    </div>
    <div class="richTextField-toolbar-col">
      <lu-rich-text-plugin-clear-format />
    </div>
  </div>
</lu-rich-text-input>
```

Il est nécessaire d'avoir la barre d'outil pour utiliser les noeuds Lexical correspondants aux outils.
Pour cacher la barre d'outil tout en gardant les fonctionnalités, il est possible d'utiliser le composant `lu-rich-text-input` avec l'attribut `hideToolbar`.

```angular2html
<lu-rich-text-input
  luWithMarkdownFormatter
  placeholder="Enter some text..."
  [(ngModel)]="example"
  hideToolbar
>
  <lu-rich-text-input-toolbar>
</lu-rich-text-input>
```

#### Styles

- Bouton de style individuel

```angular2html
<lu-rich-text-plugin-text-style style="bold" icon="formatTextBold" tooltip="Gras" />
```

- Barre préconfigurée (Gras, Italique, Souligné)

```angular2html
<lu-rich-text-toolbar-text-style />
```

#### Listes

- Barre préconfigurée (Puces, Numérotées)

```angular2html
<lu-rich-text-toolbar-list-style />
```

#### Titres

- Barre préconfigurée (Paragraphe, H1, H2, H3...)

```angular2html
<lu-rich-text-plugin-headings maxHeadingLevel="4" />
```

#### Liens

- Outil individuel

```angular2html
<lu-rich-text-plugin-link />
```

#### Suppression du formatage

- Outil individuel

```angular2html
<lu-rich-text-plugin-clear-format />
```

#### <a id="TagTool"></a>Tag

- Outil individuel

L'outil prend en paramètre une liste de tag personnalisés, qu'il est possible d'insérer dans le contenu de l'éditeur, sous forme de chips.

Chaque tag est un objet avec une clé et une description optionnelle. La clé est utilisée pour l'insertion dans le contenu réel de l'éditeur, la description est uniquement utilisée pour la représentation visuelle de la balise.

Si la description n'est pas fournie, la clé sera utilisée à la place.

Les tags ont la forme `{{tag.key}}` dans le contenu brut en entrée/sortie de l'éditeur.
Si le contenu en entrée de l'éditeur contient des tags non reconnus par l'outil, ils seront automatiquement supprimés.

```angular2html
<lu-rich-text-plugin-tag [tags]="[{ key: 'tag1', description: 'Premier tag'}, { key: 'tag2', description: 'Second tag'}]" />
```

Pour gérer les tags en markdown ou en plain-text, il est nécessaire de fournir le transformer approprié.

```ts
provideLuRichTextMarkdownFormatter([...DEFAULT_MARKDOWN_TRANSFORMERS, TAGS]);

provideLuRichTextPlainTextFormatter([PLAINTEXT_TAGS]);
```

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

```ts
export class MyCustomRichTextPluginComponent implements OnDestroy, RichTextPluginComponent {
  isDisabled = signal(false);
  // élément à focus
  element = viewChild('element', { read: ElementRef<HTMLButtonElement> });
  // outils intégrés
  pluginComponents = viewChildren(RICH_TEXT_PLUGIN_COMPONENT);

  #registeredCommands: () => void = () => {};

  setEditorInstance(editor: LexicalEditor): void {
    this.#registeredCommands = mergeRegister(registerCustomLexicalCommand(editor));
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled.set(isDisabled);
  }

  getLexicalNodes(): Klass<LexicalNode>[] {
    return [MyCustomNode];
  }

  focus() {
    (this.element() as ElementRef<HTMLButtonElement>).nativeElement.focus();
  }

  ngOnDestroy() {
    this.#registeredCommands();
  }
}
```

### Ajout de formateurs personnalisés

Il est possible d'ajouter des formateurs personnalisés pour le `lu-rich-text-input`. Pour cela, il faut créer une classe qui implémente l'interface `RichTextFormatter`.

```ts
export class MyCustomFormatter implements RichTextFormatter {
  override parse(editor: LexicalEditor, text?: string | null): void {
    // Conversion d'une string pour alimenter l'éditeur Lexical
  }

  override format(editor: LexicalEditor): string {
    // Conversion du contenu de l'éditeur Lexical en string
  }
}

export function provideLuRichTextCustomFormatter(): Provider {
  return {
    provide: RICH_TEXT_FORMATTER,
    useFactory: () => new MyCustomFormatter(),
  };
}
```
