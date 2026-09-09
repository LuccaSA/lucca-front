# activity-feed — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/3541ee)

# Design

**Mots-clés :**fil, activité, timeline

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

### Commentaire

L'option Commentaire est utilisée pour capturer et afficher la justification ou l'explication fournie par un utilisateur au moment où il effectue une action. Le commentaire se place systématiquement en dernière position de l'étape, sous le statut et les éventuelles pièces jointes.

Si le commentaire dépasse une certaine longueur, il est recommandé d'intégrer le composant `read-more` pour ne pas étirer la timeline de manière excessive.

### Pièces jointes

Cette option permet d'afficher les fichiers importés par un utilisateur lors d'une action. Si le contexte le permet, ou le requiert, il faut laisser la possibilité à l’utilisateur de télécharger le fichier.

### Modification d'un paramètre

Cette option est utilisée lorsqu'une action entraîne la modification d'une propriété de la ressource. Elle permet d'afficher côte à côte l'ancienne valeur et la nouvelle valeur pour une compréhension immédiate de l'évolution.

## États

### Étape en cours

Utilisez l'étape en attente pour réduire l'incertitude de l'utilisateur.

### État de succès

Utilisez le jalon de succès pour marquer la fin positive d'un processus de décision (ex: validation de congé).

### État de refus

Le jalon de refus marque la clôture d'un workflow avec une issue négative. Il utilise les codes visuels d’erreur pour signaler que la ressource n'a pas atteint l'objectif escompté.

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

- **Do** : Utilisons les avatars ou les états succès et erreur dans l’en-tête de chaque étape du fil d’activité.
- **Don't** : N’utilisons pas de numéros pour indiquer l’ordre des étapes.

### Fil de discussion

- **Do** : Utilisons le composant Comment chat lorsque l’on est dans une interface de conversation.
- **Don't** : N’utilisons pas un fil d’activité si l’interface est purement conversationnelle.

# Content

## Contenu & rédaction

### En-tête

### Description d'une action

L'entête se lit comme une phrase simple : **[Auteur] + [Verbe d'action] + [Objet]**.

1. **L’auteur de l’action :**
    * **Utilisateur :** utiliser le `Prénom` + `Nom`. Éviter les pseudos ou les initiales seules pour garantir la traçabilité.
2. **Le verbe d'action :**
    * **Temps :** toujours utiliser le **passé composé** pour les actions terminées (*"a modifié"*, *"a transmis"*, *"a supprimé"*).
3. **L'objet :**
    * Être spécifique mais concis.
    * Formulation des descriptions des étapes doivent être identique pour toutes les étapes.
    * Dans le cas d’un changement : ne mentionnez pas la valeur finale du changement (ex: le nom du statut) dans l'entête si celle-ci est déjà explicitée par un composant dédié (Badge, Tag, Comparaison) situé juste en dessous.

- **Do** : Gardons une en-tête simple et consice.
- **Don't** : Ne mentionnons pas la valeur finale du changement dans l’en-ête.

### Description d'un statut

L'entête se lit comme une phrase simple : **[Nom de l’objet] + [Verbe d'action]**.

1. **L'objet :**
    * Être spécifique mais concis.
2. **Le verbe d'action :**
    * **Temps :** Toujours utiliser le **présent** (*"approuvé"*).

### L'horodatage

Format : `[jour] [n° jour] [Mois] [Année] à [HH:mm]`.

Pour les actions de moins de 24h, on peut utiliser des termes relatifs (*"Il y a 1h"*) pour plus de proximité.

* Moins de 1h : “À l’instant”
* Entre 1 et 24h : “Il y a X heures”
* La veille : “Hier à 10:36”
* Au delà : “jeudi 18 mars 2026 à 10:36”
