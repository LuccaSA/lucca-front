# activity-feed — Content

## Contenu & rédaction

### En-tête

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7763:13630">

</design>

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
