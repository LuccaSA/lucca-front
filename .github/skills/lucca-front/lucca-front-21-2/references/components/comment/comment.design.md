# comment — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/08238a)

# Design

**Mots-clés :**commentaire, note, texte, chat, discussion

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

### Avec label

Si le commentaire est proche du contenu mais pas immédiatement visible (par exemple, si l’utilisateur doit scroller pour retrouver ces informations), envisagez d'utiliser un label "Commentaire".

### Hauteur maximale

Si le commentaire est trop long il est possible d’ajouter un bouton “...lire plus” qui permettra de l’afficher dans son intégralité. Si l’utilisateur clique sur ce bouton, il ne pourra plus revenir en arrière.

### Texte enrichi

Le texte affiché dans le Comment peut provenir d’un éditeur de texte riche. Dans ce cas, on gardera la mise en forme donnée par l’utilisateur dans le champs.

### Pièces-jointes

L’utilisateur peut parfois joindre un document à son commentaire. Dans ce cas, on affichera le fichier joint dans le corps du commentaire, sous le texte rédigé par l’utilisateur.

## Cas d'usage

### Commentaire lié à une ressource

C’est le cas le plus courant. Le ou les commentaires sont associés à une ressource. Ils ont été rédigés par les collaborateurs pour donner plus de contexte ou d’informations sur la ressource.

### Fil d’activité

Les commentaires dans un fil d’activité sont intégrés dans un historique d’événements ou d’actions réalisées par les utilisateurs. Ils permettent de garder une trace des actions ou des remarques sans générer de discussion.

### Fil de discussion

Ce contexte correspond à une conversation entre plusieurs collaborateurs. Les utilisateurs peuvent ajouter des commentaires et y répondre, avec des échanges plus interactifs, facilitant la collaboration autour d’un sujet spécifique.

Lorsque plusieurs messages sont laissé par une même personne, ils s'affichent sans répétition de l'avatar.

# Content

## Contenu et rédaction

### Largeur adaptée au contenu

Le commentaire s’adapte à son contenu. Il possède une largeur maximale de 640 px pour optimiser la lisibilité. Il s'adapte aussi à son conteneur lorsque celui-ci est fixé à une certaine largeur (inférieur à 640px) et que le commentaire est plus long.

### Ne pas décrire d’actions

L’en-tête ne doit pas servir d’endroit pour indiquer les actions de l’utilisateur. On n’y affiche le nom et/ou la date ou un intitulé “Commentaire”.

### Ni italique, ni guillemets

L’utilisation de l’italique (en dehors d’un texte enrichi) et des guillemets est prohibée. Cela alourdi le message, le format est suffisamment explicite pour indiquer qu’il s’agit d’un commentaire. En cas de doute, vous pouvez utiliser le label “Commentaire”.

### Dates et heures

La date et l’heure sont deux informations optionnelles. On les affichera si besoin en fonction du contexte. Par soucis de clarté, on utilisera la version complète et non abrégée. Si l’espace n’est pas suffisant, il est possible d’utiliser la version abrégée.

Pour plus d’informations à ce sujet, vous pouvez consulter la guideline sur le format des dates.
