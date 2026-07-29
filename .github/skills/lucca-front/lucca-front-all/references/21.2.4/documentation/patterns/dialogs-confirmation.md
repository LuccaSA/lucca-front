# Dialogs de confirmation

# Suppression

## **Contexte d’utilisation**

Les Dialogs de suppression ou de désactivation sont utilisées lorsque l’utilisateur s’apprête à effectuer une action pouvant entraîner une perte définitive de données ou un changement difficilement réversible.

Leur rôle est d’éviter les erreurs en rendant l’intention explicite et en informant clairement des conséquences.

Le contenu s'adapte au niveau de criticité de l'action et de ses conséquences :

## Contenu et rédaction

### Niveau 1 : impact faible

* **Titre :** « Supprimer le/la {ressource} ? »
* **Description :** « Si vous supprimez la/la {ressource}, {description des conséquences}. »
* **Boutons :** « Supprimer le/la {ressource} »

### Niveau 2 : impact moyen

* **Titre :** « Supprimer le/la {ressource} ? »
* **Description :** « **La suppression est définitive.** Si vous supprimez la/la {ressource}, {description des conséquences}. »
* **Boutons :** « Supprimer le/la {ressource} »

### Niveau 3 : impact élevé

* **Titre :** « Supprimer le/la {ressource} ? »
* **Description :** « **La suppression est définitive.** Si vous supprimez la/la {ressource}, {description des conséquences}. »
* **Case à cocher :**  « J'ai bien compris les risques. »
* **Boutons :** « Supprimer le/la {ressource} »

### Bonnes pratiques de rédaction

* Écrivons le titre sous forme de question commençant par « **Supprimer** ». Pourquoi ?
    * Une question interpelle davantage qu'une phrase affirmative.
    * Une question encourage l'utilisateur à comprendre l'enjeu du son choix.
* Dans la description, utilisons le conditionnel (« Si... ») et le futur de l'indicatif, pour expliquer les conséquences de l'action. Cela rassure l'utilisateur sur le fait que l'action n'a pas encore été effectuée.
* Si besoin, les conséquences peuvent être affichées sous forme de liste.
* La phrase « **La suppression est définitive.** » doit être en gras. Un saut de ligne la sépare de la description qui suit.

# Modifications non sauvegardées

## **Contexte d’utilisation**

Cette Dialog s’affiche lorsque l’utilisateur tente de quitter un formulaire en cours d’édition sans avoir enregistré ses modifications.

Elle peut apparaître :

* après un clic sur « Annuler » ou sur la croix de fermeture,
* lors d’un changement de page interrompant une action en cours.

L’objectif est d’éviter toute **perte involontaire de données**, en informant l’utilisateur des conséquences de son action avant qu’elle ne soit confirmée.

## Contenu et rédaction

* **Titre :** « Quitter sans enregistrer ? »
* **Description :** « Si vous quittez, les modifications non enregistrées seront supprimées. »
* **Boutons :** « Quitter sans enregistrer » / « Reprendre les modifications »

### Bonnes pratiques de rédaction

* Écrivons le titre sous forme de question commençant par « **Quitter** ». Pourquoi ?
    * Une question interpelle davantage qu'une phrase affirmative.
    * Une question encourage l'utilisateur à comprendre l'enjeu du son choix.
* Dans la description, utilisons le conditionnel (« Si... ») et le futur de l'indicatif, pour expliquer les conséquences de l'action. Cela rassure l'utilisateur sur le fait que l'action n'a pas encore été effectuée.

# Validation

## **Contexte d’utilisation**

Les Dialogs de validation sont utilisées pour interpeller l'utilisateur avant l'exécution d'une action importante, sans perte de données, mais avec des conséquences significatives sur un ou plusieurs logiciels.

Elles peuvent aussi interpeller l'utilisateur après la modification de paramètres servant au bon fonctionnement d'un logiciel, pour s'assurer des conséquences.

## Contenu et rédaction

### Niveau 1 : impact faible

* **Titre :** « Modifier le/la {ressource} ? »
* **Description :** « Si vous modifiez la/la {ressource}, {description des conséquences}. »
* **Boutons :** « Modifier le/la {ressource} » / « Annuler »

### Niveau 2 : impact moyen

* **Titre :** « Modifier le/la {ressource} ? »
* **Description :** « **Cette action est irréversible.** Si vous modifiez la/la {ressource}, {description des conséquences}. »
* **Boutons :** « Modifier le/la {ressource} » / « Annuler »

### Niveau 3 : impact élevé

* **Titre :** « Modifier le/la {ressource} ? »
* **Description :** « **Cette action est irréversible.** Si vous modifiez la/la {ressource}, {description des conséquences}. »
* **Case à cocher :** « J'ai bien compris les risques. »
* **Boutons :** « Modifier le/la {ressource} » / « Annuler »

### Bonnes pratiques de rédaction

* Écrivons le titre sous forme de question du type **{verbe à l'infinitif} + {objet}**. 
    * Une question interpelle davantage qu'une phrase affirmative.
    * Une question encourage l'utilisateur à comprendre l'enjeu du son choix.
* Dans la description, utilisons le conditionnel (« Si... ») et le futur de l'indicatif, pour expliquer les conséquences de l'action. Cela rassure l'utilisateur sur le fait que l'action n'a pas encore été effectuée.
* Si besoin, les conséquences peuvent être affichées sous forme de liste.
* La phrase « **Cette action est irréversible.** » doit être en gras. Un saut de ligne la sépare de la description qui suit.

## Règles d'utilisation

- **Don't** : L'utilisation de Callouts est à proscrire dans les Dialogs de confirmation et de suppression. Il est préférable de travailler sur la clarté du texte. Le simple fait que ce texte se trouve dans une Dialog, et s'ouvre après une action, suffit à alerter l'utilisateur.
