DateInput (`lu-date-input`) est le composant qui vient remplacer et moderniser `lu-date-picker`, il est fait pour s'intégrer dans un `lu-form-field` comme tous les composants `lu-***-input`.

### Utilisation

Le composant s'utilise via la balise `lu-form-field` et supporte `ngModel` ainsi que `formControl` comme tous les composants d'input nouvelle génération au sein de lucca-front.

### Configuration

Il est possible d'utiliser `lu-date-input` de plusieurs façons différentes, via ses inputs, tout d'abord:

- `min` et `max`, servent à définir des dates minimales et maximales pour la sélection, **ils ne constituent pas un validateur**, ainsi, vous devrez spécficier un `Validator` à la main pour traiter une sélection hors limites comme erreur.
- `hideToday` permet de désactiver le style spécifique appliqué au jour en cours.
- `hasTodayButton` permet d'ajouter un bouton "aujourd'hui", automatiquement traduit via `Intl`, qui sélectionne la date d'aujourd'hui.
- `hideWeekend` permet de désactiver le style spécifiques des jours du weekend.
- `clearable` permet d'ajouter un bouton "clear" à la fin de l'input.

Le composant utilise uniquement des objets de type `Date`, le premier jour de la semaine ainsi que les jours du weekend sont récupérés via la locale Angular, car à ce jour, l'implémentation proposée dans `Intl` n'est pas présente dans Firefox.

### Configuration avancée

Dans le cas ou la donnée attendue doit être un mois ou une année, il est possible de passer par l'input `mode` et spécifier `day`, `month` ou `year` (ce qui correspond au type `CalendarMode`) en fonction de la donnée attendue.
Dans tous les cas, le date sera au début de la période sélectionnée, exemples:

- Si l'utilisateur sélectionne le 8/10/2024 en mode `day`, la date sélectionnée sera `Tue Oct 08 2024 00:00:00 GMT+0200 (heure d’été d’Europe centrale)`
- Si l'utilisateur sélectionne 10/2024 en mode `month`, la date sélectionnée sera `Tue Oct 01 2024 00:00:00 GMT+0200 (heure d’été d’Europe centrale)`
- Si l'utilisateur sélectionne 2024 en mode `year`, la date sélectionnée sera `Mon Jan 01 2024 00:00:00 GMT+0100 (heure normale d’Europe centrale)`

Il vous reste donc à appeler la méthode que vous souhaitez sur l'objet date pour récupérer ce qui compte dans votre contexte.

Il est également possible, via l'input `getCellInfo`, de mettre des classes ou états personnalisés sur des cellules spécifiques.

La signature de cette méthode est `(day: Date, mode: CalendarMode) => CellStatus`, voici un exemple:

```ts
(date: Date, mode: CalendarMode) => {
  // Si on est en vue jour et que nous sommes le 10 du mois en cours, la case est marquée sélectionnée
  if (mode === 'day' && date.getDate() === 10 && date.getMonth() === new Date().getMonth()) {
    return {
      selected: true,
    };
  }
  // Si on est en vue jour et que nous sommes le 17 du mois en cours, la case est désactivée
  if (mode === 'day' && date.getDate() === 17 && date.getMonth() === new Date().getMonth()) {
    return {
      disabled: true,
    };
  }
  // Si on est en vue année et que l'année est 2023, on marque comme sélectionné, on ajoute un label (affiché en tooltip) et on ajoute une palette mint
  if (mode === 'year' && date.getFullYear() === 2023) {
    return {
      selected: true,
      label: 'I am green',
      classes: ['palette-mint'],
    };
  }
  return { classes: [] };
}
```

Enfin, il est possible de spécifier des `ranges` via l'input du même nom. Chaque range (de type `DateRange`) sera alors affiché dans le calendrier, au niveau spécifié par sa variable `scope`, ou, à défaut, en vue `day` uniquement.
