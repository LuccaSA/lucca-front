# Navigation mobile

# Page principale

## Page principale

La page principale est le premier niveau de navigation dans l’application. Il est possible de naviguer entre les logiciels à l’aide du menu de navigation positionné en bas de l'écran.

## Anatomie

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:55061">

**Anatomie - Page principale**

**Anatomie - Page principale**

<notes>

1. Barre de navigation
2. Contenu
3. Menu

</notes>

</design>

## Comportement

### Navigation entre des pages principales

La navigation entre des pages principales se fait uniquement au clic sur un des items du menu. 

Il est impossible de faire un swipe pour changer de page, afin d’éviter des conflits avec les interactions déjà présentes à l’intérieur des pages.

## Règles d'utilisation

### Entrées de la barre de navigation

Les entrées du menu sont utilisées exclusivement pour naviguer entre les solutions principales de l'application.

Pour naviguer à travers toutes les solutions, une entrée "Menu" est positionnée à droite de la barre de navigation.

### Nombre d'entrées

Le menu ayant une taille limitée, il doit contenir entre 1 et 4 solutions (en plus de l'entrée "Menu"). 

# Page secondaire

## Page secondaire

La page secondaire est le second niveau de navigation dans l’application. Elle est accessible depuis une page principale ou depuis le menu, et accueille du contenu lié à cette page.

## Anatomie

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:55195">

**Anatomie - Page secondaire**

**Anatomie - Page secondaire**

<notes>

1. Barre de navigation
2. Contenu
3. Menu
4. Bouton "Retour"

</notes>

</design>

## Comportement

### Retour à la page précédente

L’utilisateur peut revenir à la page précédente au swipe sur le bord gauche de l’écran. Sur iOS, une transition de page lui indique que le swipe est en cours.

## Exemples d'usage

Les objets en lecture seule sont affichés dans une page secondaire.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:54515">

**Exemples - Page secondaire - 1**

**Exemples - Page secondaire - 1**

</design>

La page secondaire permet d’afficher tous les éléments d’une liste lorsqu’une pagination est mise en place.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:55034">

**Exemples - Page secondaire - 2**

**Exemples - Page secondaire - 2**

</design>

## Règles d'utilisation

### Icône du bouton Retour

Pour montrer que la page secondaire est une navigation depuis la page principale, nous affichons un chevron indiquant qu'un retour est possible.

### Affichage du menu

Pour aider l’utilisateur à se situer et naviguer dans l’application, nous affichons aussi le menu depuis une page secondaire.

# Fullscreen cover

## Fullscreen cover

La Fullscreen cover apparaît au dessus d’une page et occupe toute la hauteur de l’écran. Elle permet de concentrer l’attention de l’utilisateur sur une tâche complexe, une image, un fichier PDF, un plan…

## Anatomie

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:55251">

**Anatomie - Fullscreen Cover**

**Anatomie - Fullscreen Cover**

<notes>

1. Barre de navigation
2. Bouton "Annuler"
3. Contenu

</notes>

</design>

## Comportement

### Retour à la page précédente

Il est impossible de retourner à la page précédente au swipe, contrairement à la page secondaire. L’utilisateur doit passer par la barre de navigation pour quitter la page. Cela permet d’éviter un retour en arrière par erreur lors de la réalisation d'une tâche complexe.

### Confirmation de sortie de page

Un message de confirmation est affiché lorsqu’un utilisateur essaie de quitter la page alors qu’il a entamé des modifications.

Des messages standards de confirmation sont disponibles dans la section Contenu.

## Exemples d'usage

Un formulaire complexe comme la déclaration d’un frais kilométrique doit être affiché dans une vue en plein écran pour éviter de perdre des modifications au retour à la page précédente.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:55029">

**Exemples - Fullscreen Cover - 2**

**Exemples - Fullscreen Cover - 2**

</design>

L’affichage d’un bulletin de paie se fait en plein écran pour que l’utilisateur puisse zoomer ou se déplacer dans l’image.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:54603">

**Exemples - Fullscreen Cover - 1**

**Exemples - Fullscreen Cover - 1**

</design>

La Fullscreen cover permet aussi de bloquer l’utilisateur sur une page spécifique, par exemple lors d’une erreur globale sur l’application. Dans ce cas, la barre de navigation n’est pas affichée.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:55032">

**Exemples - Fullscreen Cover - 3**

**Exemples - Fullscreen Cover - 3**

</design>

Ce format doit être utilisé avec parcimonie pour éviter de bloquer totalement l’utilisateur. Une porte de sortie doit toujours être proposée sur ce type d’écran.

# Fullscreen sheet

## Fullscreen sheet

La Fullscreen sheet apparaît au dessus d’une page en prenant toute la hauteur de l’écran. Elle permet de présenter une tâche simple, du contenu informatif ou un parcours en plusieurs étapes.

Ce composant n’est pas disponible sur Android. Pour des cas d’usage similaires, la meilleure alternative est d’utiliser une Fullscreen cover.

## Anatomie

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:55305">

**Anatomie - Fullscreen Sheet**

**Anatomie - Fullscreen Sheet**

<notes>

1. Barre de navigation
2. Bouton "Annuler"
3. Contenu

</notes>

</design>

## Comportement

### Fermeture de la page

La Fullscreen Sheet peut être fermée lorsque l’utilisateur swipe vers le bas depuis la barre de navigation (ou depuis le contenu si l’utilisateur n’a pas scrollé).

Il est possible de bloquer le swipe pour éviter que l’utilisateur quitte la page par erreur.

### Navigation dans une Fullscreen sheet

Il est possible de naviguer au sein d’une même Fullscreen sheet. Dans ce cas, le titre de la barre de navigation peut changer et le bouton "Annuler" est remplacé par un bouton "Retour" indiquant qu'il est possible de revenir à l'étape précédente.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:55186">

**Comportement - Fullscreen Sheet - 3**

**Comportement - Fullscreen Sheet - 3**

</design>

## Exemples d'usage

La sélection d’une option parmi une liste longue est idéale dans une Fullscreen sheet. La barre de navigation peut y accueillir des filtres ou une barre de recherche.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:54615">

**Exemples - Fullscreen Sheet - 1**

**Exemples - Fullscreen Sheet - 1**

</design>

Les formulaires courts peuvent être affichés dans une Fullscreen sheet, tant que leur contenu ne dépasse pas la hauteur de l’écran.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:54606">

**Exemples - Fullscreen Sheet - 2**

**Exemples - Fullscreen Sheet - 2**

</design>

Certains parcours peuvent être découpés en plusieurs étapes d’une même Fullscreen sheet.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:54698">

**Exemples - Fullscreen Sheet - 3**

**Exemples - Fullscreen Sheet - 3**

</design>

## Règles d'utilisation

### Empilement de Fullscreen sheet

Évitons d’empiler plusieurs Fullscreen sheet : cela complexifie la navigation pour l’utilisateur. Pour afficher du contenu complémentaire, privilégions une navigation à l’intérieur de la Fullscreen sheet.

# Bottom sheet

## Bottom Sheet

La Bottom sheet est affichée au dessus d’une page, mais ne masque pas le contenu derrière. Elle permet d’afficher de brèves informations supplémentaires

## Anatomie

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:55091">

**Anatomie - Bottom Sheet**

**Anatomie - Bottom Sheet**

<notes>

1. Barre de navigation (facultatif)
2. Contenu
3. Grabber (facultatif sur iOS)

</notes>

</design>

## Comportement

### Fermeture de la page

La Bottom sheet peut être fermée de plusieurs façons possibles :

* En appuyant n’importe où à l’extérieur de la Bottom sheet
* En faisant un swipe vers le bas depuis la Bottom sheet
* En appuyant sur le bouton de fermeture (sur iOS) ou en appuyant sur le Grabber (sur Android)

### Extension de la Bottom sheet

Il est possible d’étendre la Bottom sheet pour qu’elle prenne toute la hauteur de l’écran, en faisant un swipe vers le haut.

Cette option est recommandée lorsque la Bottom sheet comporte un contenu long ou un contenu secondaire.

## Exemples d'usage

La Bottom sheet est principalement utilisée pour afficher des informations complémentaires sur un objet ou un utilisateur.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:54617">

**Exemples - Bottom Sheet - 1**

**Exemples - Bottom Sheet - 1**

</design>

Les informations textuelles simples comme des instructions sont affichées dans une Bottom sheet.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:54664">

**Exemples - Bottom Sheet - 2**

**Exemples - Bottom Sheet - 2**

</design>

La Bottom sheet peut aussi être utilisée pour informer l’utilisateur lors de la confirmation d’une action importante.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=4183:54680">

**Exemples - Bottom Sheet - 3**

**Exemples - Bottom Sheet - 3**

</design>

## Règles d'utilisation

### Taille de la Bottom sheet

Sur iOS, la hauteur de la Bottom sheet est fixée à la moitié de la hauteur de l’écran.

Sur Android, la Bottom sheet prend la hauteur de son contenu.

### Affichage du titre

Le titre est facultatif : ne l'affichons pas si il n’apporte aucune information supplémentaire ou s’il est redondant avec le contenu en dessous.

### Affichage du Grabber

Sur Android, le Grabber est toujours affiché : il permet de fermer la Bottom sheet lorsque l’utilisateur appuie dessus.

Sur iOS, le Grabber indique visuellement à l’utilisateur que la Bottom sheet peut être étendue. Il doit être affiché uniquement dans ce cas.
