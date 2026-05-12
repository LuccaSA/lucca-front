# simple-select — Design

#### Des questions, commentaires ou retours ?

Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

<notes>

1. **Label :** le label du champ doit indiquer quel type d'information le champ requiert.
2. **Champ de saisie :** l’utilisateur y clique pour afficher les options qu’il peut choisir.
3. **Tout effacer :** la croix efface tout dans le champ de saisie. Il n'apparaît que lorsqu’une option au moins a été sélectionnée.
4. **Menu déroulant :** il contient la liste de toutes les options sélectionnables.

</notes>

---

## Options

### Placeholder

Le placeholder "**Sélectionner…**" est obligatoire. Il incite l'utilisateur à choisir une option dans le menu de sélection et disparaît une fois que l'utilisateur a fait son choix.

- **Do** : Utilisons seulement "Sélectionner…" comme placeholder dans les Select.
- **Don't** : N’utilisons pas de placeholder pour indiquer un état vide dans un Select.
- **Don't** : Nous n’indiquons pas l'objet de la sélection dans le placeholder du Select.
- **Don't** : Le placeholder "Sélectionner…" est obligatoire dans un Select.

### Champ désactivé

Un champ désactivé indique que l’utilisateur ne peut pas interagir avec : il ne peut ni ouvrir la liste des options, ni en changer la valeur. Le champ est visible mais inactif.

Un Tooltip doit s'afficher au survol, indiquant à l'utilisateur les raisons de cet état.

- **Don't** : Un champ désactivé vide ne doit pas afficher de placeholder.
- **Don't** : Un champ désactivé rempli ne doit pas afficher de Clear. L'utilisateur ne peut pas interagir avec le champ.

### Regroupements d'options

Les options sélectionnables peuvent être regroupées en catégories. Un titre vient alors se positionner en en-tête de la catégorie.

Si l'utilisateur effectue une recherche, l'affichage dans le menu déroulant est modifié. Le nom de la catégorie est affiché en texte secondaire sous l'option.

### **Structure arborescente**

Cette option permet d'afficher une relation de parenté entre plusieurs options. Lors d’une recherche, on affiche l’intégralité de l’arborescence (parents et enfants).

### Bouton d'ajout d'option

Lorsque la création est une action fréquente, l'option "+ Ajouter une nouvelle option" est affichée en permanence en fin de liste.

Si le contenu dépasse la zone d'affichage, cette option devient sticky pour rester toujours visible au bas du menu déroulant.

Pour les cas où l'option n'est pas affichée par défaut, l'utilisateur a la possibilité d'ajouter une nouvelle option après avoir saisi une recherche.

Si une saisie est détectée, le bouton "Ajouter [Terme recherché]" apparaît, permettant de créer une nouvelle option et pré-remplissant automatiquement son nom.

### Champ effaçable

Lorsqu’un champ est optionnel, il est possible d’effacer l'option sélectionnée via un bouton Clear sur la droite.

Pour en savoir plus sur les champs effaçables, vous pouvez consulter la guideline dédiée.

- **Do** : Affichons le bouton Clear lorsque le champ est optionnel.
- **Do** : N'affichons pas le bouton Clear lorsque le champ est obligatoire.
- **Don't** : N'affichons pas le bouton Clear lorsque le champ est vide.
- **Don't** : N'affichons pas le bouton Clear lorsque le champ est obligatoire.

## Comportement

### État vide

Le contenu du menu déroulant peut être vide lorsqu'il n'existe aucune donnée disponible ou qu'une recherche ne donne aucun résultat. Le message doit être adapté pour chacun de ces cas.

Cet état peut être cumulé avec l'ajout d'option. C'est notamment pratique pour pouvoir créer une nouvelle donnée directement depuis le Select ou via une Dialog.

### Chargement

L'indication de chargement s'affiche pour prévenir l'utilisateur que le champ est en train de charger une ou plusieurs données.

Cela peut se produire à l’ouverture du menu déroulant, lorsque l’utilisateur effectue une recherche ou quand il scroll et qu’une quantité de donnée est chargée.

### États spécifiques

#### Affichage d'une erreur

Un message d'erreur s'affiche sous le champ lorsque les exigences du Select ne sont pas remplies, incitant l'utilisateur à y répondre. L'utilisateur ne pourra pas soumettre le formulaire tant que les erreurs ne sont pas corrigées.

Si un message d'aide était présent, le texte du message d'erreur doit fournir les mêmes informations que le message d'aide, en plus d’expliciter l’erreur.

#### Affichage d'une alerte

Le message d'alerte est affiché pour alerter l'utilisateur qu'une donnée ou un champ particulier peut avoir des conséquences sur le formulaire. Contrairement à une erreur, **l'état d'avertissement ne bloque pas l'utilisateur** dans la validation du formulaire.

Si un message d'aide était présent, le texte du message d’avertissement doit fournir les mêmes informations que le message d'aide, en plus d’expliciter l’avertissement.

### **Débordement**

Lorsque le nom d’une option sélectionnée est trop long, le texte est tronqué.

Le texte est tout de même visible dans son entièreté à l’intérieur du menu déroulant. Dans le cas d’un Select peu large, le menu déroulant peut avoir une largeur plus importante si les options qu’il contient sont longues. La largeur maximal du menu déroulant est de 560px.

---

## Règles d'utilisation

### Radio ou Select

Utilisez des Radio plutôt qu’un Select lorsque :

* les utilisateurs doivent voir immédiatement toutes les options disponibles,
* il est important de comparer visuellement les options,
* le nombre d’options est limité (en général entre 2 et 5),
* l’action est fréquente ou doit être rapide à effectuer, car les Radio permettent une sélection directe sans ouvrir de menu déroulant.

À l’inverse, préférez un Select lorsque :

* l’utilisateur connaît déjà les options et n’a pas besoin de les voir toutes en même temps,
* il y a beaucoup d’options (au-delà de 6),
* l’objectif est de gagner de la place dans l’interface.

### Affichage du label

Chaque Select doit avoir un label. Un Select sans label est ambigu et non accessible.

- **Do** : Affichons systématiquement un label aux champs de formulaire.
- **Don't** : Un Select sans label est ambigu et non accessible.

### Choisir une largeur appropriée

La largeur doit être basée sur la grille de construction d'un formulaire. Le Select peut prendre 2, 3 ou 4 colonnes. Idéalement, le champ doit être suffisamment large pour indiquer à l'utilisateur le type de donnée qu'il peut contenir.

### **Largeur du menu déroulant**

Le menu déroulant a une largeur minimale correspondant à la largeur du Select. Sa largeur peut être plus grande que le Select si certaines options nécessitent un affichage plus large.

- **Do** : Le menu déroulant doit toujours avoir une largeur minimale équivalente à la largeur du Select.
- **Don't** : La largeur du menu déroulant ne doit pas s'adapter à son contenu, au risque d'être plus petit que le Select.
