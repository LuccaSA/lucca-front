# tooltip — Design

Mots-clés : info-bulle, infobulle, aide, survol

#### Des questions, commentaires ou retours ?

Laisser un commentaire sur Figma ou contactez-nous sur Slack :*#design-system-public*

## Cas d'usage

#### **✅  Utilisons le Tooltip pour...**

* Décrire la fonction d'un élément lorsqu'elle peut être ambiguë. Exemples : explications d'un sigle, d’une formule de calcul, nom d’un collaborateur concerné.
* Expliquer la raison de l’état inactif d’un élément interactif.
* Afficher l’intégralité d’un intitulé tronqué ou abrégé, à condition que l'intégralité n'excède pas 2 lignes.

#### **❌  Ne l'utilisons pas pour...**

* Fournir des informations que l'utilisateur doit connaître ou dont il doit se souvenir.
* Afficher un texte très long (plus de 2 lignes). 
* On privilégie alors le Popover.

### Bouton d'action

Les Tooltips sont importants pour apporter une information, concernant les boutons d’interaction. C’est le cas pour les boutons de type “Icon” dans lesquels il n’est affiché aucun libellé.

### Information contextuelle

Pour les icônes `sign-help` ou encore `sign-info`, un Tooltip est affiché au survol pour afficher une information complémentaire.

### Interaction inactive

Lorsqu’une interaction est inactive (bouton, champ de formulaire, etc.), le Tooltip peut en expliquer les raisons.

### Texte tronqué

Le Tooltip peut-être utilisé pour afficher l’intégralité d’un texte tronqué. Par exemple lorsque le nom d’une donnée est trop long pour être affiché dans une colonne de tableau.

### Liens explicités

Nous pouvons clarifier la redirection d’un lien au survol avec un Tooltip.

### **Tooltip ou Popover ?**

Le Popover est recommandé pour une description plus longue, du texte formaté et des images. Ou des liens facultatifs.

- **Do** : Utilisons le Popover lorsque le contenu est riche et/ou nécessite d'être mis en forme.
- **Don't** : Le Tooltip ne peut contenir que du texte. Ne l'utilisons pas pour mettre en forme du contenu.

**Sont aussi nommés tooltips les messages gérés avec notre outil** **[Userflow 🏷](https://www.notion.so/Userflow-22e2f73cfeb1478dbabf7952a5f95f21?pvs=21)**, qui aident à des parcours de type « onboarding », « new feature », « step by step » ou « sondage ». À ne pas confondre donc.
