RichTextInput (`lu-rich-text-input`) permet l'édition de texte riche depuis un formulaire (WYSIWYG). Il est basé sur [Lexical](https://lexical.dev/).

### Utilisation

Le composant s'utilise via la balise `lu-form-field` et supporte `ngModel` ainsi que `formControl` comme tous les composants d'input nouvelle génération au sein de lucca-front.

### Configuration

Avant toute utilisation de `lu-rich-text-input`, il est nécessaire d'ajouter les `peerDependencies` suivantes à votre projet :
```sh
npm i @lexical/history @lexical/link @lexical/rich-text @lexical/selection @lexical/utils
```

En fonction du format désiré en entrée / sortie du composant, les dépendances suivantes doivent être installées:
* HTML
```sh
npm i @lexical/html
```
* Markdown
```sh
npm i @lexical/markdown
```

Avant toute utilisation du composant, il est nécessaire de définir le formateur à utiliser. 
Deux formateurs par défaut sont disponibles, à provide au niveau du composant parent de l'input :
* HTML
```ts
provideLuRichTextHTMLFormater()
```
* Markdown (avec une liste optionnelle de `Transformer` markdown pour les noeuds custom)
```ts
provideLuRichTextMarkdownFormater(transformers)
```

Exemple d'utilisation :
````angular2html
<lu-form-field label="Rich Text">
  <lu-rich-text-input [(ngModel)]="example" placeholder="Placeholder">
    <!-- tools -->
  </lu-rich-text-input>
</lu-form-field>
````

### Barre d'outils

La barre d'outils du `lu-rich-text-input` est configuré directement depuis le template. Plusieurs outils préconfigurés sont disponibles.

Le layout de la barre d'outil est donc à la charge du composant parent.


````angular2html
<lu-rich-text-input placeholder="Enter some text..." [(ngModel)]="example">
    <div
      class="u-width100% u-displayFlex u-justifyContentSpaceBetween pr-u-gap100"
    >
      <div class="u-displayFlex pr-u-gap100">
        <lu-rich-text-toolbar-text-style />
        <lu-divider [vertical]="true" />
        <lu-rich-text-toolbar-list-style />
        <lu-divider [vertical]="true" />
        <lu-rich-text-plugin-headings />
        <lu-divider [vertical]="true" />
        <lu-rich-text-plugin-link />
      </div>
      <lu-rich-text-plugin-clear-format />
    </div>
  </lu-rich-text-input>
````

#### Styles

* Bouton de style individuel
```angular2html
<lu-rich-text-plugin-text-style style="bold" icon="formatTextBold" tooltip="Gras"/>
```

*  Barre préconfigurée (Gras, Italique, Souligné)
```angular2html
<lu-rich-text-toolbar-text-style />
```

#### Listes

*  Barre préconfigurée (Puces, Numérotées)
````angular2html
<lu-rich-text-toolbar-list-style />
````

#### Titres

*  Barre préconfigurée (Paragraphe, H1, H2, H3...)
````angular2html
<lu-rich-text-plugin-headings maxHeadingLevel="4" />
````

#### Liens

* Outil individuel
````angular2html
<lu-rich-text-plugin-link />
````

#### Suppression du formatage

* Outil individuel
````angular2html
<lu-rich-text-plugin-clear-format />
````

### Ajout d'outils personnalisés

Les outils sont des composants implémentant l'interface `RichTextPluginComponent`. Cette interface définit deux méthodes :
* `setEditorInstance(editor: LexicalEditor)` : Permet de récupérer l'instance de l'éditeur lexical lors de sa création, ce qui permet par exemple de s'abonner aux évènements Lexical.
* `getLexicalNodes()` : Optionnel. Renvoie les noeuds Lexical à ajouter à l'éditeur Lexical.

Attention: si l'outil s'abonne à des évènements Lexical, il est faut penser à se désabonner lors de la destruction de l'outil.

```ts
export class MyCustomRichTextPluginComponent implements OnDestroy, RichTextPluginComponent{
  #registeredCommands: () => void = () => {};

  setEditorInstance(editor: LexicalEditor): void {
    this.#registeredCommands = mergeRegister(
      registerCustomLexicalCommand(editor),
    );
  }

  getLexicalNodes(): Klass<LexicalNode>[] {
    return [MyCustomNode];
  }

  ngOnDestroy() {
    this.#registeredCommands();
  }
}
```

### Ajout de formateurs personnalisés

Il est possible d'ajouter des formateurs personnalisés pour le `lu-rich-text-input`. Pour cela, il faut créer une classe qui implémente l'interface `RichTextFormater`.

```ts
export class MyCustomFormater implements RichTextFormater {
  override parse(editor: LexicalEditor, text?: string | null): void {
    // Conversion d'une string pour alimenter l'éditeur Lexical
  }

  override format(editor: LexicalEditor): string {
    // Conversion du contenu de l'éditeur Lexical en string
  }
}

export function provideLuRichTextCustomFormater(): Provider {
  return {
    provide: RICH_TEXT_FORMATER,
    useFactory: () => new MyCustomFormater(),
  };
}

```
