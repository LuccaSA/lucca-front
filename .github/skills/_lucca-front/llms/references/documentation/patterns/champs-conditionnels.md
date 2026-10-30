# Champs conditionnels

# Content

## Affichage direct ou conditionnel

Par défaut, affichons le champ. Un champ ne doit pas être masqué si son affichage direct est possible :

* utilisons un champ optionnel si l’information peut être laissée vide ou supprimée par l’utilisateur,
* utilisons un champ obligatoire avec une valeur nulle par défaut (*Aucun*, *Non applicable*, etc.).

L’affichage conditionnel doit être réservé aux champs qui, sans un choix préalable, n’auraient aucun sens, aucune logique.

- **Do** : Affichons directement le champ comme optionnel. L’utilisateur peut choisir de le renseigner ou de le laisser vide, sans étape supplémentaire.
- **Don't** : N’utilisons pas une Checkbox dont le seul but est de révéler un champ optionnel. Cela ajoute de la friction inutilement.

## États du champ

Un champ conditionnel connaît deux états : affiché ou masqué. **Il n'est jamais inactif**. Un champ inactif signale une restriction de droits, pas une absence de pertinence : l'utilisateur cherche alors l'action qui le débloquera, et elle n'existe pas.

Un champ qui apparaît ou disparaît quand l'utilisateur change son choix ne pose pas de problème. C'est même le comportement attendu : le formulaire répond à sa décision.

Ici s'applique notre principe Don't make me think :

* un champ affiché appelle une réponse,
* un champ absent n'attend rien.

- **Do** : Affichons le champ seulement au moment où il devient pertinent. L’utilisateur comprend ainsi naturellement la logique du formulaire, sans distraction inutile.
- **Don't** : N’affichons pas un champ conditionnel de manière inactive. Cela brouille la lecture et donne une impression de blocage.

## Affichage dans un formulaire

Le champ conditionnel se place dans le flux du formulaire, sous ou a proximité immédiate du champ qui le déclenche. Pour en regrouper plusieurs, utilisons un Input framed.

- **Do** : Affichons le champ conditionnel directement sous le champ déclencheur, dans le flux du formulaire, pour conserver une lecture fluide et naturelle.
- **Don't** : Ne plaçons pas un champ conditionnel dans un fieldset contextuel. Cela alourdit inutilement l’interface.
- **Do** : Privilégions l’utilisation du composant Input framed pour afficher plusieurs champs conditionnels.
- **Don't** : N’utilisons pas le Fieldset contextuel pour afficher plusieurs champs conditionnels.
