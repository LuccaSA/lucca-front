# dateinput — Design

#### Des questions, commentaires ou retours ?

Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

<notes>

1. **Label :** Le label du champ doit indiquer quel type d'information le champ requiert.
2. **Champ de saisie :** Le champ dans lequel les utilisateurs cliquent pour saisir les dates. La saisie peut se faire directement en saisissant les dates au clavier ou via le calendrier qui s’affiche.
3. **Calendrier :** La calendrier s’affiche et permet à l’utilisateur de sélectionner une date.
4. **Tout effacer :** La croix efface tout dans le champ de saisie. Il n'apparaît que lorsqu’une le champ est optionnel et qu’une valeur est renseignée.

</notes>

---

## Options

### Affichage des jours chômés

Une option permet d’activer un affichage différent des jours chômés dans le calendrier. Les jours chômés apparaissent sur fond hachuré, facilitant ainsi leur identification.

Cette option est désactivée par défaut mais peut être activée selon le contexte ou les besoins spécifiques de l’utilisateur.

### Restriction de la plage de sélection

Cette fonctionnalité permet de définir des bornes minimale et/ou maximale de la période de sélection de dates. Les jours qui tombent en dehors de ces restrictions sont affichés comme inactifs (grisés, barrés et non sélectionnables).

### Sélection d'un jour

Dans son état par défaut, le Date picker permet de sélectionner un jour.

### Sélection d'un mois

Dans certains contexte, il peut être utile de sélectionner un mois. Dans ce cas, le Date picker permet de naviguer d’année en année pour sélectionner un mois.

### Sélection d'une année

De la même manière que la sélection en mois, il peut être utile de sélectionner une année. Dans ce cas, le Date picker permet de naviguer de décennie en décennie pour sélectionner une année.

### Sélection rapide date du jour

Une option permet d’afficher un bouton sous forme de lien permettant à l’utilisateur de sélectionner la date du jour. Ce bouton reste visible même si l’utilisateur navigue de mois en mois dans le calendrier.

---

## Comportement

### Sélection d’une date loin dans le passé

Il est parfois demandé de sélectionner des dates lointaines dans le passé, par exemple pour une date de naissance. dans ce cas, il est possible d’ouvrir le calendrier en affichage décennie. De cette manière, il est plus simple pour l’utilisateur de saisir une date lointaine.

---

## Règles d'utilisation

### Placeholder obligatoire

Le placeholder est obligatoire. Il doit porter la mention “JJ/MM/AAAA”. Le format du placeholder s’adapte en fonction de la locale de l’utilisateur.

- **Do** : La placeholder est obligatoire, il indique le format attendu.
- **Don't** : Ne masquons jamais le placeholder dans un Date picker.

### Sélection d’une période

Si un besoin de sélection de période existe, le composant Date range picker doit être utilisé. Il ne faut pas utiliser deux DatePicker pour sélectionner une date de début et une date de fin.

- **Do** : Utilisons le Date range picker pour sélectionner une période.
- **Don't** : Ne cumulons pas deux Date picker pour sélectionner une date de début et une date de fin.

### Affichage des jours des mois précédents et suivants

Le composant Calendar propose une option pour afficher ou non les jours des mois précédents et suivants. Dans le cas du Date picker, l'**affichage de ces jours est obligatoire**.

- **Do** : L'affichage des jours des mois précédents et suivants est obligatoire. Cela permet d'y accéder plus rapidement.
- **Don't** : Ne masquons pas les jours des mois précédents et suivants.

## Contenu associé
