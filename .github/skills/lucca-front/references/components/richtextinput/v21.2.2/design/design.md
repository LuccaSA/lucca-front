# richtextinput — Design

**Des questions, commentaires ou retours ?**Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

<notes>

1. **Label :** Le label du champ doit indiquer quel type d'information le champ requiert.
2. **Champ de saisie :** Le champ dans lequel les utilisateurs cliquent pour saisir du texte.
3. **Barre d’outils :** L’espace dans lequel se retrouve les outils pour personnaliser le texte.
4. **Inline message :** Le message d’aide est optionnel. Il permet de fournir des informations supplémentaires à l’utilisateur pour l’aider à compléter le champ.

</notes>

---

## Options

### Champs obligatoire

Les champs obligatoires doivent être signalés explicitement aux utilisateurs. C’est à la fois une recommandation d’accessibilité et d’ergonomie : les utilisateurs complètent ainsi les formulaires sans avoir de doute sur le caractère obligatoire ou optionnel de chaque champ.

Si un champ obligatoire n’est pas renseigné, une erreur sera remontée à la soumission du formulaire. Pour en savoir plus, vous pouvez vous référer à la guideline sur les erreurs dans les formulaires.

### Balises

Il est possible d’afficher une liste de balises, via le composant Tag, que l’utilisateur pourra sélectionner pour les intégrer dans son corps de texte. Ces balises font appel à des données de l’utilisateur ou de l’entreprise (prénom, nom, poste, coordonnées, etc.).

La liste des balises est définie et personnalisées en fonction du contexte.

### Mention d’un collaborateur (non disponible pour le moment)

Un bouton “@” permet de mentionner un collaborateur. La mention s’affiche au format “@Prénom” dans le corps de texte.

Il est aussi possible de mentionner une personne en écrivant “@” dans le corps de texte. Une liste apparait alors et se filtre au fur et à mesure que l’utilisateur saisit le nom du collaborateur.

---

## Comportement

### Styles de texte

Les styles de texte sont définis par le composant Text flow. Les styles appliquées seront les styles utilisés lorsque le texte sera affiché dans un autre contexte (WYSIWYG : “What you see is what you get”).

### Redimensionnement

#### Hauteur par défaut

La hauteur du Rich textfield est fixe par défaut. Cette hauteur correspond à 3 lignes de texte (hauteur minimale) mais peut-être personnalisée en fonction du contexte.

Lorsque le contenu est plus long, une barre de scroll s’affiche dans le composant permettant ainsi à l’utilisateur de consulter l’entièreté du message.

#### Redimensionnement manuel

S’il le souhaite, l’utilisateur peut manuellement agrandir le champ verticalement pour optimiser son espace de saisie. À noter que le champ est redimensionnable verticalement mais pas horizontalement, cela permet d’éviter les effets de bords sur le reste de l’interface.

L’utilisateur ne pourra pas donner une hauteur plus petite que celle par défaut (3 lignes de texte).

#### Redimensionnement automatique

Dans certains contexte, il est possible d’activer cette option. Le Rich textfield se redimensionne automatiquement lorsque l’utilisateur saisit son texte.

### Champ en erreur

Le message d'erreur s'affiche lorsque les exigences du champ ne sont pas remplies, incitant l'utilisateur à corriger ou à modifier sa saisie initiale. Si un message d'aide était présent, le texte du message d'erreur doit fournir les mêmes informations que le message d'aide, en plus d’expliciter l’erreur.

---

## Règles d’utilisation

### Choisir le bon composant de saisie de texte

Si le contexte ne nécessite pas de pouvoir formater du texte (graisse, italique, tailles, etc.) alors il faut utiliser le composant Textarea.

- **Do** : Utilisons le Rich textfield lorsqu'il est intéressant pour l'utilisateur de mettre son texte en forme.
- **Don't** : N'utilisons pas le Rich textfield si aucune mise en forme du contenu n'est nécessaire.

### Choisir une largeur appropriée

La largeur doit être basée sur la grille et prendre la largeur maximale possible (4 colonnes). En savoir plus sur la construction d’un formulaire.

De manière générale, le champ doit prendre la plus grande largeur possible sur l’interface.

- **Do** : Utilisons la largeur maximale disponible pour afficher le Rich textfield. Cette largeur sera de 640px dans le cas d'un formulaire.
- **Don't** : Si le Rich textfield n'est pas assez large, il est difficile pour l'utilisateur de saisir et éditer son texte comme il le souhaite. De plus, certaines fonctionnalités risquent d'être masquées dans la barre d'outils.
