### Configuration

Avant toute utilisation de `lu-rich-text-input`, il est nécessaire d'ajouter les `peerDependencies` suivantes à votre projet :

```sh
npm i lexical @lexical/history @lexical/link @lexical/rich-text @lexical/selection @lexical/utils
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

Avant toute utilisation du composant, il est nécessaire de définir le formateur à utiliser.
Deux formateurs par défaut sont disponibles, à provide au niveau du composant parent de l'input :

- HTML

```ts
import { provideLuRichTextHTMLFormatter } from '@lucca-front/ng/forms/rich-text-input/formatters/html';
provideLuRichTextHTMLFormatter();
```

- Markdown (avec une liste optionnelle de `Transformer` markdown pour les noeuds custom)

```ts
import { provideLuRichTextMarkdownFormatter } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
provideLuRichTextMarkdownFormatter(transformers);
```

Exemple d'utilisation :

```angular2html
<lu-form-field label="Rich Text">
  <lu-rich-text-input [(ngModel)]="example" placeholder="Placeholder">
    <!-- tools -->
  </lu-rich-text-input>
</lu-form-field>
```

### Barre d'outils

La barre d'outils du `lu-rich-text-input` est configuré directement depuis le template.

Pour plus de simplicité, une barre d'outil par défaut est mise à disposition.

```angular2html
<lu-rich-text-input placeholder="Enter some text..." [(ngModel)]="example">
  <lu-rich-text-input-toolbar />
</lu-rich-text-input>
```

Il est aussi possible de créer une barre d'outil personnalisée en assemblant les outils existant et en y ajoutant de nouvelles fonctionnalités.

```angular2html
<lu-rich-text-input placeholder="Enter some text..." [(ngModel)]="example">
  <div class="richTextField-toolbar-col">
    <lu-rich-text-toolbar-list-style />
    <lu-rich-text-plugin-headings />
  </div>
  <div class="richTextField-toolbar-col">
    <lu-rich-text-plugin-link />
  </div>
</lu-rich-text-input>
```

#### Styles

- Bouton de style individuel

```angular2html
<lu-rich-text-plugin-text-style style="bold" icon="formatTextBold" tooltip="Gras"/>
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
