# Card et box

# Card

Une Card est la représentation visuelle d’un lien de navigation. Il peut s’agir d’une ressource Lucca (un objectif, une formation, une dépense, etc.) ou d’un simple lien de navigation permettant d’accéder à un niveau plus profond d’une application. Par défaut, une carte est donc cliquable. Les Cards peuvent s’utiliser aussi bien dans une structure en grille qu’en liste (dans un tableau par exemple).

## Caractéristiques

Les Cards sont généralement organisées sous la forme de rectangles blancs avec des bords arrondis et espacés d’une marge minimale. Cette forme les rend visuellement distinctes des autres éléments de l'interface. À cette forme rectangulaire vient s’ajouter une ombre. L'utilisation de l'ombre donne l'impression que la Card est flottante au-dessus du fond, ce qui renforce son effet de séparation et son aspect interactif.

## Interactivité

Par définition, une Card est un lien permettant d’accéder à une ressource. Ce lien doit changer l’URL de l’application, que ce soit dans une modal, un panel ou une nouvelle page. L’interaction avec la Card doit donc mettre en avant son comportement cliquable.

Deux points principaux à retenir :

1. L’utilisation d’icône ou de bouton pour appuyer cette interaction est à proscrire, cela nuit à la **[loi de Fitts](https://blocnotes.iergo.fr/breve/motsetphrases/loi-de-fitts/)**.
2. La propriété CSS `cursor:pointer` est obligatoire.

Le comportement interactif est renforcé par une animation de la Card au survol ou à la navigation au clavier. Une solution efficace consiste à agrandir la Card pour lui donner de l’importance. À cela s’ajoute un changement d’ombre pour accentuer l’élévation de la Card.

## Comportement

### Simuler l’élévation de la Card

Un agrandissement de la Card, aussi bien en hauteur qu’en largeur, associé à une ombre plus vaste et plus diffuse permet de simuler son élévation avec efficacité. La Card seule s’agrandit, son contenu non.

L’agrandissement n’est pas défini par le Design System et doit se faire en fonction de l’interface, des éléments qui l’entourent et de l’espace disponible. Le Product Designer doit s’assurer que l’effet est suffisamment visible.

### Les Cards ne se superposent pas

Lorsque l’utilisateur interagit avec une Card, celle-ci ne doit pas se superposer aux autres Cards présentent sur l’interface pour ne pas masquer du contenu qui pourrait être important.

### L’interaction ne casse pas la structure

L’agrandissement de la Card ne doit pas casser la structure de l’interface et ne pas déplacer les autres Cards autour.

## Actions à l’intérieur d’une Card

En limitant les actions possibles sur la Card, on évite toute confusion ou surcharge d'informations qui pourraient perturber l'utilisateur. Si des interactions, autres que le clic sur la Card, sont utiles pour l’expérience alors ces boutons d’actions n’apparaissent qu’au survol ou au focus (en haut, à droite). Ces interactions doivent être des actions rapides permettant à l’utilisateur d’agir sur la ressource sans la consulter en détail (archiver, dupliquer, supprimer, etc.).

## Mobile et écrans tactiles

Sur les écrans tactiles, l’utilisateur perd la possibilité de survoler les éléments d’une interface. L’agrandissement de la Card n’est donc pas visible sur mobile, seule son aspect UI alerte l’utilisateur des interactions possibles. Dans le cas d’actions à l’intérieur d’une Card (qui ne sont visibles qu’au survol), celles-ci doivent être affichées par défaut sur un écran tactile.

# Box

Une Box est un élément utilisé pour organiser et structurer le contenu dans une interface utilisateur. Elle peut contenir toute sorte d’éléments tels que du texte, des images, des boutons, etc. La Box permet de délimiter un espace spécifique dans la mise en page, ce qui facilite la hiérarchisation du contenu.

## Caractéristiques

De la même manière que les Cards, les Box sont généralement de forme rectangulaire avec des bords arrondis. Le style d’une Box n’est pas figé et peut s’adapter en fonction du besoin et de l’interface. Elle peut donc avoir une bordure, un fond de couleur ou un fond transparent. En revanche elle ne peut porter une ombre, c’est ce qui la distingue, avec l’interaction, d’une Card.

## Interactivité

À la différence d’une Card, une Box n’est pas un lien et n’est donc pas cliquable. En revanche son contenu est entièrement personnalisable et peut tout à fait contenir des éléments d’interaction.
