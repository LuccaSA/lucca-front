# simple-select — Design

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:142841">

</design>

**Mots-clés :**sélecteur, sélection, combobox

**Des questions, commentaires ou retours ?***Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Anatomie

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:142779">

<notes>

1. **Label :** le label du champ doit indiquer quel type d'information le champ requiert.
2. **Champ de saisie :** l’utilisateur y clique pour afficher les options qu’il peut choisir.
3. **Tout effacer :** la croix efface tout dans le champ de saisie. Il n'apparaît que lorsqu’une option au moins a été sélectionnée.
4. **Menu déroulant :** il contient la liste de toutes les options sélectionnables.

</notes>

</design>

## Options

### Placeholder

Le placeholder "**Sélectionner…**" est obligatoire. Il incite l'utilisateur à choisir une option dans le menu de sélection et disparaît une fois que l'utilisateur a fait son choix.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:142792">

</design>

- **Do** : Utilisons seulement "Sélectionner…" comme placeholder dans les Select.
- **Don't** : N’utilisons pas de placeholder pour indiquer un état vide dans un Select.
- **Don't** : Nous n’indiquons pas l'objet de la sélection dans le placeholder du Select.
- **Don't** : Le placeholder "Sélectionner…" est obligatoire dans un Select.

### Champ désactivé

Un champ désactivé indique que l’utilisateur ne peut pas interagir avec : il ne peut ni ouvrir la liste des options, ni en changer la valeur. Le champ est visible mais inactif.

Un Tooltip doit s'afficher au survol, indiquant à l'utilisateur les raisons de cet état.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6606:38759">

</design>

- **Don't** : Un champ désactivé vide ne doit pas afficher de placeholder.
- **Don't** : Un champ désactivé rempli ne doit pas afficher de Clear. L'utilisateur ne peut pas interagir avec le champ.

### Regroupements d'options

Les options sélectionnables peuvent être regroupées en catégories. Un titre vient alors se positionner en en-tête de la catégorie.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:147426">

</design>

Si l'utilisateur effectue une recherche, l'affichage dans le menu déroulant est modifié. Le nom de la catégorie est affiché en texte secondaire sous l'option.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:147428">

</design>

### **Structure arborescente**

Cette option permet d'afficher une relation de parenté entre plusieurs options. Lors d’une recherche, on affiche l’intégralité de l’arborescence (parents et enfants).

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:148365">

</design>

### Bouton d'ajout d'option

Lorsque la création est une action fréquente, l'option "+ Ajouter une nouvelle option" est affichée en permanence en fin de liste.

Si le contenu dépasse la zone d'affichage, cette option devient sticky pour rester toujours visible au bas du menu déroulant.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:142811">

</design>

Pour les cas où l'option n'est pas affichée par défaut, l'utilisateur a la possibilité d'ajouter une nouvelle option après avoir saisi une recherche.

Si une saisie est détectée, le bouton "Ajouter [Terme recherché]" apparaît, permettant de créer une nouvelle option et pré-remplissant automatiquement son nom.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:142814">

</design>

### Sélection d'un collaborateur

#### Inclure les collaborateurs partis

Cette option permet d'inclure dans la liste des collaborateurs sélectionnables les collaborateurs ayant quitté l'entreprise (anciens collaborateurs). Par défaut, seuls les collaborateurs actifs sont affichés. En cochant cette case, la liste s'étend pour afficher aussi les collaborateurs partis.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7303:45034">

</design>

#### Mise en avant de l'utilisateur

Cette option met en avant l'utilisateur courant dans la liste des collaborateurs. Le nom de l'utilisateur connecté est affiché en premier, précédé de la mention "Moi :". Cela facilite la sélection rapide de soi-même dans la liste.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7324:39712">

</design>

#### Affichage de l'avatar des collaborateurs

Cette option affiche un avatar (ou les initiales) à côté du nom de chaque collaborateur dans la liste déroulante.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=7324:42123">

</design>

### Champ effaçable

Lorsqu’un champ est optionnel, il est possible d’effacer l'option sélectionnée via un bouton Clear sur la droite.

Pour en savoir plus sur les champs effaçables, vous pouvez consulter la guideline dédiée.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6562:156779">

</design>

- **Do** : Affichons le bouton Clear lorsque le champ est optionnel.
- **Do** : N'affichons pas le bouton Clear lorsque le champ est obligatoire.
- **Don't** : N'affichons pas le bouton Clear lorsque le champ est vide.
- **Don't** : N'affichons pas le bouton Clear lorsque le champ est obligatoire.

## Comportement

### État vide

Le contenu du menu déroulant peut être vide lorsqu'il n'existe aucune donnée disponible ou qu'une recherche ne donne aucun résultat. Le message doit être adapté pour chacun de ces cas.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:142832">

</design>

Cet état peut être cumulé avec l'ajout d'option. C'est notamment pratique pour pouvoir créer une nouvelle donnée directement depuis le Select ou via une Dialog.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:142835">

</design>

### Chargement

L'indication de chargement s'affiche pour prévenir l'utilisateur que le champ est en train de charger une ou plusieurs données.

Cela peut se produire à l’ouverture du menu déroulant, lorsque l’utilisateur effectue une recherche ou quand il scroll et qu’une quantité de donnée est chargée.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:142838">

</design>

### États spécifiques

#### Affichage d'une erreur

Un message d'erreur s'affiche sous le champ lorsque les exigences du Select ne sont pas remplies, incitant l'utilisateur à y répondre. L'utilisateur ne pourra pas soumettre le formulaire tant que les erreurs ne sont pas corrigées.

Si un message d'aide était présent, le texte du message d'erreur doit fournir les mêmes informations que le message d'aide, en plus d’expliciter l’erreur.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:135785">

</design>

#### Affichage d'une alerte

Le message d'alerte est affiché pour alerter l'utilisateur qu'une donnée ou un champ particulier peut avoir des conséquences sur le formulaire. Contrairement à une erreur, **l'état d'avertissement ne bloque pas l'utilisateur** dans la validation du formulaire.

Si un message d'aide était présent, le texte du message d’avertissement doit fournir les mêmes informations que le message d'aide, en plus d’expliciter l’avertissement.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6555:135787">

</design>

### **Débordement**

Lorsque le nom d’une option sélectionnée est trop long, le texte est tronqué.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6560:154720">

</design>

Le texte est tout de même visible dans son entièreté à l’intérieur du menu déroulant. Dans le cas d’un Select peu large, le menu déroulant peut avoir une largeur plus importante si les options qu’il contient sont longues. La largeur maximal du menu déroulant est de 560px.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=6562:154900">

</design>

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
