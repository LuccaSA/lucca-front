# Actions de suppression

# Content

## Niveaux de friction

Le niveau de friction lors de la suppression doit être proportionnel à l’impact potentiel de l’action. Pour des actions sans gravité, aucune confirmation n’est requise, tandis que pour des suppressions impliquant des données critiques, plusieurs étapes de validation peuvent être nécessaires.

### Aucune confirmation nécessaire

Si l’objet peut être recréé rapidement, aucune confirmation n’est requise. L’utilisateur peut supprimer directement sans être interrompu.

### Confirmation en contexte

Lorsque la création de l’objet nécessite plus de temps, une confirmation en contexte est nécessaire. Cela permet à l’utilisateur de valider l’action sans être interrompu de son flux de travail. Au clic sur l’action de suppression, un Popover apparaît pour demander confirmation.

### Interruption avec une Dialog

Pour les suppressions dont l’impact est plus important, une Dialog interrompt l’utilisateur. Cela ajoute une friction supplémentaire, l’obligeant à valider explicitement l’action avant de continuer.

### Double confirmation

La suppression impacte d’autres objets et/ou il est impossible de recréer exactement le même objet. Une demande de confirmation apparaît systématiquement pour demander confirmation à l’utilisateur. Une mesure de sécurité supplémentaire permet à l’utilisateur de certifier ce qu’il fait : une case à cocher (non cochée par défaut).

Le message doit préciser le caractère définitif de la suppression, le caractère critique de l’action et l’impact que cela a sur les autres ressources.

**⚠️**  Il est préférable d’opter pour un système d’archivage pour ce type de données/ressources. Un système d’archivage permet de mieux sécuriser le bon fonctionnement du produit.

---

## **Comportement**

### Boutons

Une variante spécifique du bouton doit être utilisée pour toute action aux conséquences importantes ou irréversibles, comme **la suppression d'un élément, le refus ou l'annulation d'une demande**.

Ce bouton critique est identifiable par sa couleur `Critical`.

Dans certains contexte, il est préférable de mettre en retrait l’action de suppression. Pour cela il existe un `mod-delete` permettant de n’avoir l’aspect critique seulement au survol du composant. Ce mode est utilisable sur les boutons`Outlined`et `Ghost`en palette`Neutral`.

- **Do** : Utilisons le bouton Outlined en palette Critical pour les boutons de suppression et les boutons de confirmation de suppression.
- **Don't** : N’utilisons pas le bouton Filled en couleur Critical pour les actions de suppression.
- **Do** : Utilisons le bouton Filled en couleur Critical pour les actions de confirmation de suppression.
- **Don't** : N’utilisons pas le bouton Filled en couleur Product pour les actions de confirmation critiques.

### Menus déroulants

Dans un menu contenant plusieurs actions, l’action de suppression est indiquée en couleur`Critical` pour la démarquer des autres actions et éviter les erreurs.
