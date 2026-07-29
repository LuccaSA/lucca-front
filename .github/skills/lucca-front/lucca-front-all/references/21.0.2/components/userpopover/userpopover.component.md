# userpopover — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.2/storybook/?path=/docs/documentation-users-display-userpopover--docs)

## Angular

### Mise en place

Afin de pouvoir installer la UserPopover, vous devez appeler la fonction `provideLuUserPopover` dans votre module racine.

### Utilisation

Pour utiliser la UserPopover, il vous suffit d'utiliser la directive `[luUserPopover]` et de lui fournir un LuUser

### Inputs

#### luEmployeeCard

Permet de fournir un utilisateur à la UserPopover.

#### luUserPopoverEnterDelay

Permet de définir le délai avant l'affichage du UserPopover en millisecondes. Par défaut 300

#### luUserPopoverLeaveDelay

Permet de définir le délai avant la disparition du UserPopover en millisecondes. Par défaut 100

#### luUserPopoverDisabled

Permet de désactiver le UserPopover

### Store et Services

Le User popover est fournit avec un service qui gère la récupération des données, mais aussi qui stocke les informations des utilisateurs déjà récupérés, y compris les images.
Ce service est un singleton et est donc partagé entre tous les UserPopover de l'application.

Il est possible de fournir un autre service qui implémente l'interface `ILuUserPopoverStore` pour gérer la récupération des données et le stockage des informations.

## HTML/CSS

| Example | File |
|---------|------|
| Popover | [html-popover.md](./stories/html-popover.md) |
