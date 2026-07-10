# daterangeinput — Design

**Mots-clés :**plage, range, date range, DateRange période

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

## Options

### Affichage des jours chômés

Une option permet d’activer un affichage différent des jours chômés dans le calendrier. Les jours chômés apparaissent sur fond hachuré, facilitant ainsi leur identification.

Cette option est désactivée par défaut mais peut être activée selon le contexte ou les besoins spécifiques de l’utilisateur.

### Restriction de la plage de sélection

Cette fonctionnalité permet de définir des bornes minimale et/ou maximale de la période de sélection de dates. Les jours qui tombent en dehors de ces restrictions sont affichés comme inactifs (grisés, barrés et non sélectionnables).

### Période en jours

Dans son état par défaut, le Date range picker permet de sélectionner une période en jours. L’utilisateur peut donc sélectionner le premier et le dernier jour pour définir la période.

### Période en mois

Dans certains contexte, il peut être utile de sélectionner une période en mois. Dans ce cas, le Date range picker permet de naviguer d’année en année pour sélectionner le premier et le dernier mois de la période.

### Période en années

De la même manière que la période en mois, il peut être utile de sélectionner une période en années. Dans ce cas, le Date range picker permet de naviguer de décennie en décennie pour sélectionner la première et la dernière année de la période.

### Périodes pré-définies

L’ajout de périodes prédéfinies dans le Date range picker simplifie l’expérience utilisateur en proposant des sélections rapides pour des périodes fréquemment utilisées. Ces dernières s’affichent sur la gauche du calendrier.

## Règles d'utilisation

### Placeholder obligatoire

Le placeholder est obligatoire. Il doit porter la mention “JJ/MM/AAAA” pour la date de début ainsi que la date de fin. Le format du placeholder s’adapte en fonction de la locale de l’utilisateur.

- **Do** : La placeholder est obligatoire, il indique le format attendu.
- **Don't** : Ne masquons jamais le placeholder dans un Date range picker.

### Valeurs pré-définies

Lorsque l’utilisateur n’a le choix qu’entre certaines valeurs pré-définies, alors il est préférable d’utiliser un Select plutôt que le Date range picker.

- **Do** : Utilisons un Select pour sélectionner une période prédéfinie.

### Affichage des jours des mois précédents et suivants

Le composant Calendar propose une option pour afficher ou non les jours des mois précédents et suivants. Dans le cas du Date range picker, l'**affichage de ces jours est interdit**.

- **Do** : Nous masquons les jours des mois précédents et suivants.
- **Don't** : Nous n'affichons pas les jours des mois précédents et suivants. Cela complique la lecture du calendrier et les interactions.

### Ne pas utiliser deux Date picker

Le Period picker, comme son nom l’indique, permet de sélectionner une période. Il doit donc être utilisé pour cela et ne plus utiliser deux Date picker pour définir une date de début et une date de fin.

- **Do** : Utilisons le Date range picker pour sélectionner une période.
- **Don't** : Ne cumulons pas deux Date picker pour sélectionner une date de début et une date de fin.

## Contenu associé
