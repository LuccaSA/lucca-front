# simple-select — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.2/storybook/?path=/docs/documentation-forms-fields-simple-select-angular--docs)

## Angular

Component selector : `lu-simple-select`

### Appeler une API

Pour un format de retour V3 ou V4 sans customisation de l'affichage (l'entité doit avoir une propriété `name`), il suffit de donner l'API à appeler :

### Personnaliser l'affichage

Dans le cas d'une personnalisation de l'option et/ou de la valeur affichée, il est nécessaire de créer votre propre directive en s'aidant de `LuCoreSelectApiV4Directive` ou de `LuCoreSelectApiV3Directive` :

### API non conventionnelle (sans id)

Dans le cas d'un appel API ne rentrant pas dans le moule habituel, il est nécessaire de créer votre propre directive en s'aidant de `ALuCoreSelectApiDirective` :

| Example | File |
|---------|------|
| Select | [angular-select.md](./stories/angular-select.md) |
