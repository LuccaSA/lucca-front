# Traduction d'un formulaire

# Content

## Définition des langues

| **Langues disponibles** | Ce sont les langues dans lesquelles le contenu doit être traduit et qui peuvent être affichées à un utilisateur. Une langue disponible est une langue traduite et accessible selon la préférence linguistique de l’utilisateur définit dans ses préférences. |
| --- | --- |
| **Langue par défaut (Fallback)** | Il s'agit de la langue affichée par défaut à un collaborateur si le contenu n'existe pas dans sa langue de profil. |
| **Langue de rédaction** | Il s'agit de la langue principale utilisée pour créer le contenu initial. Cette langue sert de référentiel unique pour toutes les traductions générées. |
| **Invariant** | C’est une donnée qui n’est pas associé à une langue. Cependant, elle sert de référence, elle est considéré comme la langue par défaut (fallback). |

## Paramètres d'utilisation des langues

Afin de faciliter la création d'objets multilingues, nous permettons à l'utilisateur de définir des paramètres d’utilisation des langues au sein de chaque logiciel. Ils permettent de définir comment seront utilisées les langues supportées par Lucca pour la création et la consultation de ces objets.

Ceux-ci sont appliqués automatiquement à chaque nouvelle ressource, garantissant ainsi une cohérence globale et un gain de temps significatif. Ces réglages sont regroupés au sein d'une page **Langues** dédié dans la configuration du logiciel et dispensent l'utilisateur de configurations répétitives à chaque création d'objet.

### Anatomie

Les paramètres sont **initialisés automatiquement par le système lors du déploiement**, avant même que l'utilisateur ne consulte la page. Pour pré-remplir ces configurations, le système s'appuie sur :

* La langue de l'administrateur effectuant le déploiement (le première utilisateur renseigné en tant qu’administrateur) : elle est définie par défaut comme langue de fallback et ajoutée à la liste des langues disponibles.
* Les langues des utilisateurs de l'instance : toutes les langues utilisées par les collaborateurs de l'instance sont automatiquement ajoutées à la liste des langues à traduire.

L'utilisateur est libre de modifier ses paramètres selon ses besoins, ils ne seront pas mis à jour automatiquement.

La définition d'une langue de fallback dans les paramètres exclut l'usage d'invariants.

Les paramètres généraux de langues s'appliquent à l'ensemble des utilisateurs de l'instance. Toutefois, comme les utilisateurs ne parlent pas tous la même langue, la langue de rédaction ne peut pas être définie comme un paramètre général. Elle doit rester propre à chaque utilisateur pour s'adapter à sa langue de travail.

<notes>

1. Langues disponibles à traduire 

2. Langue de fallback

</notes>

### Comportement

Les langues disponibles sont classées par ordre alphabétique. Seules les langues préalablement sélectionnées dans la liste des langues disponibles peuvent être choisies comme langue de fallback.

Afin de prévenir toute erreur, il est impossible de supprimer une langue si celle-ci est définie comme langue de fallback. Par conséquent, les champs de configuration ne peuvent jamais être vides.

---

## Création d'une ressource

À la création d’une ressource, les paramètres de langue sont pré-remplis avec les paramètres par défaut, tout en permettant une édition à la demande. Ces paramètres s'affichent par défaut via le composant Data presentation.

Si la configuration des paramètres de généraux est monolingue, l'encart "Paramètres par défaut" est masqué afin de ne pas encombrer l'interface.

L'utilisateur ne peut pas supprimer une langue disponible si celle-ci est définie comme langue de fallback ou comme langue de rédaction.

Il a également la possibilité d'enregistrer ses réglages actuels en tant que paramètres généraux. cette option n'apparaît que si une modification a été apportée aux langues disponibles ou à la langue de fallback. La langue de rédaction est exclue de ces paramètres généraux : les réglages étant valables pour l'ensemble des utilisateurs de l'instance, et chacun ne parlant pas nécessairement la même langue, ce paramètre doit rester individuel et associé à une ressource.

<notes>

Une modification a été apportée aux langues disponibles ou à la langue de fallback.

</notes>

<notes>

Aucune modification apportée aux langues disponibles ou à la langue de fallback.

</notes>

Une fois l'objet créé, l'utilisateur peut modifier les paramètres à tout moment.

---

## Traduire un formulaire

Dans le formulaire, l'utilisateur navigue entre les différentes langues via un Segmented control.

Dès lors que l'utilisateur sélectionne des langues disponibles pour les collaborateurs, la traduction de la ressource dans ces langues devient obligatoire.

Ce composant doit être positionné à proximité immédiate des champs concernés : soit à droite du titre d'un Fieldset, soit dans l'en-tête d'une Dialog ou d’un drawer (à condition de laisser le header fixe).

<notes>

Positionnement du Segmented control dans le header d’un drawer.

</notes>

<notes>

Positionnement du segmented control à droite du Fieldset title.

</notes>

À partir de cinq langues sélectionnées, l'affichage bascule automatiquement vers un Select pour optimiser l'espace.

Les langues affichées dans le Segmented control se limiteront au code de la langue, sans distinction de culture (variantes régionales). En pratique, l'usage d'une langue générique (par exemple un seul anglais) est privilégié pour simplifier le travail de traduction de l’utilisateur. Dans le cas d'un Select, nous affichons le nom complet de la langue suivi de son code entre parenthèses, par exemple : “Français (FR)”.

<notes>

1. Code de la langue 

2. Langue suivi de son code

</notes>

---

## Champs traduisibles

Chaque champ de saisie multilingue est identifiable par le rappel du code de la langue (ex : FR, EN, ES) accolé au label. Ce rappel visuel permet à l'utilisateur de savoir instantanément dans quelle langue il rédige, même lorsqu'il fait défiler de longs formulaires.

### Anatomie

#### Langue de rédaction sélectionnée

<notes>

1. Label (Code de la langue) 

2. Champ

</notes>

#### Langue à traduire sélectionnée

<notes>

1. Label (Code de la langue) 

2. Champ 

3. Inline message : Code de la langue : Contenu rédigé dans la langue de rédaction.

</notes>

### Cas particulier

La structure mentionnée précédemment ne s'applique pas aux composants de saisie de texte long (Textarea, Rich textfield). En effet, la longueur du contenu ne permet pas de garantir la visibilité permanente d'un Inline message pour rappeler la langue de rédaction. Par conséquent, nous n'utiliserons pas d’Inline message dans ce cas précis.

### Traductions incomplètes

Si l'utilisateur tente de soumettre le formulaire sans avoir complété toutes les **traductions** **obligatoires** alors nous lui proposons de générer automatiquement l'intégralité des traductions manquantes avant de finaliser l'enregistrement. Cela permet de prévenir toute erreur liée au processus de traduction.

Si l'utilisateur choisit la traduction manuelle, nous le redirigions automatiquement vers le premier champ non traduit du formulaire. Une icône d'erreur s'affiche dans le Segmented control au niveau des langues concernés, accompagnée d'un Callout popover pour signaler précisément les langues où les traductions font défaut.

---

Dans le cas où le traitement des données serait long, l'affichage d'une barre de progression sera nécessaire pour permettre à l'utilisateur de suivre l'avancement.

---

## Traduire un champ

Lorsqu'un formulaire ne contient qu'un seul champ nécessitant une traduction, il convient d'utiliser le composant Multilanguage TextField.

- **Do** : Utilisons un Multilanguge Textfield.
- **Don't** : N’utilisons pas de Segmented Control.

Cette règle ne s'applique pas si le champ est un Textarea ou Rich textfield. Pour ces composants, on utilisera un Segmented control positionné à droite du titre du fieldset.

---

## Traduction automatique

Pour garantir une expérience fluide, les traductions sont générées automatiquement dans les champs vides dès que l'utilisateur sélectionne une langue dans le Segmented control. Ce mécanisme permet un gain de temps considérable : l'utilisateur a la liberté de modifier le contenu ou de le remplacer intégralement si nécessaire.

### Relancer une traduction

Si tous les champs dans la langue à traduire sont déjà renseignés, la traduction automatique ne se déclenche plus lors de la navigation entre les onglets. Si l'utilisateur souhaite relancer une traduction pour une langue autre que la langue de rédaction, il peut utiliser le bouton dédié. Ce bouton est exclusivement visible lors de la consultation des langues cibles. Son activation déclenche la traduction automatique de l'intégralité des champs traduisibles pour la langue sélectionnée.

En fonction de la place disponible, il est possible d’utiliser le bouton un label “traduire”, ou bouton icône.

### Modification d'un champ dans la langue de rédaction

Si l'utilisateur modifie un champ dans la langue de rédaction alors que des traductions ont déjà été générées, un callout avec le style IA doit apparaître sous le champ. Ce message incite l'utilisateur à vérifier ou à mettre à jour les traductions existantes pour garantir la cohérence des contenus.

### Animation de chargement

Afin d'indiquer qu'une traduction est en cours, le texte de la langue de rédaction est temporairement dupliqué dans le champ cible avec une animation de balayage brillant. Ce dégradé, utilisant les codes couleurs associés à l'IA, signale visuellement le processus de génération automatique.
