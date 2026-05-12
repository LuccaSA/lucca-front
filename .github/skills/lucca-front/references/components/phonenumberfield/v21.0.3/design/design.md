# phonenumberfield — Design

#### Des questions, commentaires ou retours ?

Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

<notes>

1. **Label **: il doit indiquer quel type d'information le champ requiert. Il est aligné à gauche, directement au-dessus de la zone de saisie.
2. **Sélection de l’indicatif :** il permet de choisir le pays correspondant à son numéro. C’est ce qui détermine le préfixe qui sera sauvegardé.
3. **Champs de saisie du numéro :** il permet de saisir le numéro de téléphone.
4. **Message d’aide (Inline message) :** le message d’aide est optionnel. Il permet de fournir des informations supplémentaires à l’utilisateur.

</notes>

---

## Option

### Message d'aide

Situé sous le champ, le message d’aide explique **pourquoi le numéro de téléphone est nécessaire** et à quoi il servira.

Ce message d’aide peut limiter les questionnements chez l’utilisateur et doit être affiché lorsque le champ est obligatoire.

### Inactif

Un champ inactif indique qu'un champ de saisie existe, mais qu'il n'est pas disponible dans ce contexte, à un instant donné. Il peut être utilisé pour maintenir la continuité de la mise en page et indiquer qu'un champ peut devenir disponible ultérieurement.

- **Do** : Les deux parties du champ doivent être inactives.
- **Don't** : Il n'est pas possible que seul le sélecteur d'indicatif ou le champ de saisi soit inactif.

## Comportement

### Sélection de l'indicatif téléphonique

L’indicatif téléphonique sélectionné par défaut est celui du pays de l’unité légale du collaborateur.

Les indicatifs sont affichés dans la langue de l’utilisateur et rangés par ordre alphabétique.

Pour rechercher un indicatif, l’utilisateur peut rechercher directement le numéro ou le nom du pays. Le défilement est automatique jusqu’au premier élément de la liste qui correspond à la recherche. Ce élément de liste est affiché en surbrillance. L’utilisateur peut le sélectionner directement avec la touche “Entrée” du clavier.

- **Do** : Le sélecteur d'indicatif n'affiche que le drapeau du pays sélectionné.
- **Don't** : Nous n'affichons pas l'indicatif dans le sélecteur. Cela perturbe la compréhension du champ et l'utilisateur se questionne sur ce qu'il doit saisir.

### Placeholder

Le placeholder est modifié au changement de pays. Cela permet de donner une information supplémentaire à l’utilisateur sur le format attendu. Le *placeholder* ne doit pas mentionner l’indicatif.

### Formatage du numéro

Si l’utilisateur saisit le numéro sans espaces, les espaces sont automatiquement insérés **lorsqu’il sort du champ**. Cela permet une meilleure lisibilité. L’utilisateur se pose moins de questions sur le format attendu.

L'indicatif change automatiquement en fonction de ce qui est saisi dans le champ. Si l'utilisateur saisi manuellement ou copie-colle un numéro, le drapeau change automatiquement.

### Numéro non valide

Dans le cas d’un numéro non valide, le formatage du numéro ne peut pas fonctionner. Le champ peut donc présenter une erreur.

### Affichage en texte

Dans ce cas, on affiche le préfixe pour des raisons d’accessibilité. Le numéro de téléphone est cliquable pour permettre à l’utilisateur de téléphoner directement.

Au survol, un bouton apparaît pour copier le numéro au format international.
