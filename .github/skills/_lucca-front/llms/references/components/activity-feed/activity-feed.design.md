# activity-feed — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/3541ee)

# Design

**Mots-clés :**fil, activité, timeline

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

### Commentaire

L'option `Comment` est utilisée pour capturer et afficher la justification ou l'explication fournie par un utilisateur au moment où il effectue une action. Le commentaire se place systématiquement en dernière position de l'étape, sous le statut et les éventuelles pièces jointes.

Si le commentaire dépasse une certaine longueur, il est recommandé d'intégrer le composant `read-more` pour ne pas étirer la timeline de manière excessive.

### Pièces jointes

Cette option permet d'afficher les fichiers importés par un utilisateur lors d'une action. Si le contexte le permet, ou le requiert, il faut laisser la possibilité à l’utilisateur de télécharger le fichier.

### Modification d'un paramètre

#### Modification unique

Cette option est utilisée lorsqu'une action entraîne la modification d'une seule propriété de la ressource. Elle permet d'afficher côte à côte l'ancienne valeur et la nouvelle valeur pour une compréhension immédiate de l'évolution. Le titre de l’étape doit préciser ce qui à été modifié par l’utilisateur.

#### Modifications multiples

Lorsque plusieurs modifications sont effectuées simultanément, elles sont regroupées au sein d'une **entrée globale** afin d'alléger le fil d'activité.

* **Titre principal :** il doit être global et synthétiser l'action.
* **Sous-entrées :** un label spécifique est **obligatoire** pour chaque modification afin d'identifier clairemen<t les changements individuels.

## États

### Étape en cours

Utilisez l'étape en attente pour réduire l'incertitude de l'utilisateur.

### État de succès

Utilisez le jalon de succès pour marquer la fin positive d'un processus de décision (ex: validation de congé).

### État de refus

Le jalon de refus marque la clôture d'un workflow avec une issue négative. Il utilise les codes visuels d’erreur pour signaler que la ressource n'a pas atteint l'objectif escompté.

### Action automatique

Une action automatique est une étape réalisée sans l'intervention directe d'un utilisateur : par un acteur externe, un canal d'import ou le logiciel lui-même.

Elle se distingue d'une action utilisateur, portée par un avatar, et d'un statut, qui décrit l'état de la ressource. L'avatar est remplacé par une icône  en `product700` sur un fond en couleur `product100`.

## Comportement

### Ordre d'affichage

Par défaut, l'ordre est antéchronologique. Les événements les plus récents sont donc affichés en haut. Cela facilite ainsi la lecture des événements récents. Si l’utilisateur veut consulter des événements plus anciens, il doit scroller.

### Chargement

Le bouton de chargement est utilisé lorsque le fil d'activité dépasse un certains nombre d'entrées. Il permet de ne pas surcharger la page au chargement initial et d'optimiser les performances techniques.

## Règles d'utilisation

### Horizontal

- **Do** : Utilisons uniquement le composant verticalement
- **Don't** : N’utilisons jamais le composant à l’horizontal

### Numérotation

- **Do** : Utilisons les Avatars ou les états succès et erreur dans l’en-tête de chaque étape du fil d’activité.
- **Don't** : N’utilisons pas de numéros pour indiquer l’ordre des étapes.

### Fil de discussion

- **Do** : Utilisons le composant Comment lorsque l’on est dans une interface de conversation.
- **Don't** : N’utilisons pas un fil d’activité si l’interface est purement conversationnelle.

# Content

## Contenu & rédaction

### Description d'une action

L'en-tête se lit comme une phrase simple, à la voix active : **[Auteur] + [Verbe d'action] + [Objet]**.

1. **L'auteur de l'action**
    * **Utilisateur :** utiliser le `Prénom` + `Nom`.
    * **Acteur externe** (plateforme tierce, organisme, connecteur partenaire) : le nommer explicitement (*« La Plateforme Agréée a importé l'avoir »*).
2. **Le verbe d'action**
    * **Temps :** toujours utiliser le **passé composé** (*« a modifié »*, *« a transmis »*, *« a supprimé »*, *« a importé »*).
    * **Précision :** choisir un verbe spécifique (*modifié, transmis, supprimé, importé, créé, confirmé, transféré, associé, validé*). Voir Verbes d'action.
    * **À bannir :** les formulations vagues ou impersonnelles (*« a été »*, *« peut être »*, *« a permis de »*, *« il est possible de »*).
3. **L'objet**
    * Être spécifique mais concis.
    * Dans le cas d'un changement, ne pas mentionner la valeur finale (ex. : le nom du statut) dans l'en-tête si elle est déjà explicitée par un composant dédié (Badge, Tag, Comparaison) situé juste en dessous.

- **Do** : Gardons une en-tête simple et consice.
- **Don't** : Ne mentionnons pas la valeur finale du changement dans l’en-ête.

### Description d'une action automatique

Une action automatique est une étape réalisée sans l'intervention directe d'un utilisateur : par un acteur externe, un canal d'import ou le logiciel lui-même.

L'en-tête se lit : **[Objet] + [Participe passé] + [Source ou « automatiquement »]**.

1. **L'objet**
    * Placé en début de phrase, sans article (*« Facture »*, *« Avoir »*, *« Rémunération »*).
2. **Le participe passé**
    * Sans auxiliaire : on n'écrit jamais *« a été »*.
    * Accordé avec l'objet (*« Facture importée »*, *« Avoir importé »*).
3. **La source ou le contexte d'origine**
    * **Obligatoire** pour les imports et les créations dérivées. C'est une information utile au diagnostic, pour l'utilisateur comme pour le support (*« Facture importée par email »*, *« Rémunération créée automatiquement depuis l'élément théorique »*).
    * **Sans source**, l'adverbe *« automatiquement »* est indispensable : c'est lui qui indique que personne n'est intervenu (*« Facture confirmée automatiquement »*).

### Description d'un statut

Un statut décrit l'état de la ressource à un moment donné, pas une action. L'en-tête se lit : **[Objet] + [État]**.

1. **L'objet**
    * Être spécifique mais concis.
2. **L'état**
    * Utiliser un **participe passé** (*« Tâche créée »*, *« Demande approuvée »*) ou une **locution d'état** (*« Tâche en cours »*, *« Facture prête pour paiement »*).
    * Se concentrer sur l'état atteint, pas sur ce qu'il permet de faire.

### L'horodatage

Format : `[jour] [n° jour] [Mois] [Année] à [HH:mm]`.

Pour les actions de moins de 24h, on peut utiliser des termes relatifs (*"Il y a 1h"*) pour plus de proximité.

* Moins de 1h : “À l’instant”
* Entre 1 et 24h : “Il y a X heures”
* La veille : “Hier à 10:36”
* Au delà : “jeudi 18 mars 2026 à 10:36”
