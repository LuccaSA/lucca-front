# calendar — Design

#### Des questions, commentaires ou retours ?

Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

<notes>

1. **Flèche de navigation :** Elles permettent de naviguer dans le calendrier, de mois en mois, d’année en année ou de décennie en décennie.
2. **Période affichée :** Il permet d’indiquer à l’utilisateur la période affichée dans le calendrier. Il peut s’agit d’un mois, d’une année ou d’une décennie.
3. **Jours de la semaine :** On affiche les jours de la semaine en utilisant la première lettre de chacun des jours. L’ordre des jours s’adapte en fonction de la locale.
4. **Semaines et jours :** Le calendrier s’affiche sur 5 ou 6 lignes, chaque ligne représentant une semaine.
5. **Aujourd’hui :** Le jour en cours est mis en avant dans le calendrier, en gras et en couleur.

</notes>

---

## Options

### Affichage des jours chômés

Une option permet d’activer un affichage différent des jours chômés dans le calendrier. Les jours chômés apparaissent sur fond hachuré, facilitant ainsi leur identification.

Cette option est désactivé par défaut mais peut être activée selon le contexte ou les besoins spécifiques de l’utilisateur.

### Affichage des jours des mois précédents et suivants

Une option permet d’afficher les jours des mois précédents et suivants dans le calendrier, afin de donner un aperçu complet. Les jours des mois adjacents apparaissent avec un style différent (couleur plus claire) pour indiquer qu’ils ne font pas partie du mois affiché.

Ces jours sont tout de même interactifs et permettent de sélectionner rapidement sans avoir à naviguer sur le mois suivant ou précédent.

---

## Cas d'usage

### DatePicker

Le Calendar est utilisé dans le composant DatePicker. Il permet de sélectionner un jour, un mois ou une année.

Pour en savoir plus, consulter la page dédiée au DatePicker.

### DateRangePicker

Le Calendar est utilisé dans le composant DateRangePicker. Dans ce contexte, deux Calendar sont affichés, permettant à l’utilisateur de sélectionner une période avec une date de début et une date de fin.

Pour en savoir plus, consulter la page dédiée au DateRangePicker.

### En tant que calendrier

Le Calendar peut aussi être utilisé pour afficher un calendrier sur 12 mois ou plus directement dans une interface. Cela permet à l’utilisateur de définir des périodes, des dates clés ou autre directement sur la calendrier.
