# time-range-picker — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/8547fa)

# Design

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

### Affichage par défaut

Par défaut, le TimeRangePicker s'affiche avec un label. C'est le mode à privilégier dans les formulaires.

### Affichage "standalone"

Le composant existe dans un mode “standalone”. La propriété `displayArrows` permet d'afficher des flèches au-dessus et en dessous du champ pour d’incrémenter/décrémenter les valeurs saisies.

Cette option peut s’avérer pertinente lorsque la saisie à la souris est à privilégier pour apporter un aspect ludique à l’interface. Elle est en revanche à proscrire dans un usage de formulaire.

- **Don't** : Le label et le message d’aide doivent être masqués lorsque l’on utilise les flèches d’incrémentation.

### Système horaire sur 12 heures

Dans un contexte d’internationalisation, il existe une option pour les pays adoptant le système horaire sur 12 heures.

La propriété `forceMeridiemDisplay` permet de forcer l'affichage AM/PM.

### Pas d'incrémentation

L'option `step` permet de modifier le pas d'incrémentation pour les heure(s) ou les minute(s). Il est important de noter que le pas n’est qu’une aide à la saisie, mais il reste tout à fait possible de saisir une valeur spécifique au clavier.

Si le pas est défini en minutes (ex: `PT30M`), les heures s’incrémentent automatiquement lorsque l’utilisateur augmente les minutes.

Les pas disponibles sont des multiples de 60 (`PT1M`, `PT4M`, `PT5M`, `PT6M`, `PT10M`, `PT15M`, `PT20M` & `PT30M`).

Si le pas est défini en heures (ex: `PT1H`), alors il n’est pas possible pour l’utilisateur de changer les minutes.

### Valeur maximale et minimale

La propriété `max` permet de définir une durée maximale ainsi qu’une durée minimale. Lorsque c’est le cas, il faut l’indiquer à l’utilisateur via le message d’aide.

Le champ des heures évalue la cohérence des chiffres tapés à la volée (exemple pour une valeur maximale à 12:00) :

* Si l'utilisateur tape le chiffre 1 puis le chiffre 3, le système détecte que 13 dépasse la limite maximale de 12. Le premier chiffre est alors immédiatement éjecté et le champ ne conserve que le dernier chiffre tapé, soit 3 (qui devient la nouvelle valeur 03:00).
* Si l'utilisateur tente de saisir 2 pour commencer à écrire 21, le système détecte immédiatement que l'heure commencera par un 2 (ce qui donnera au minimum 20:00, soit une valeur bien supérieure à 12:00). Le système bloque alors la saisie au premier chiffre et n'écrit que le 2 (qui devient 02:00).
* Si l'utilisateur est positionné sur la valeur maximale autorisée (12) et qu'il appuie sur la flèche Haut, la n'est pas bloquée. Elle repart automatiquement de 0 (ou de la valeur minimale configurée) pour recommencer un cycle de sélection.

# Content

## Contenu et rédaction

### Heures et minutes

Seules les minutes seront systématiquement cadrées sur deux caractères (ajout de zéros par la gauche). On écrit donc “05” minutes et non pas “5” minutes.
