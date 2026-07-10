# footer — Design

**Mots-clés :**pied de page, layout

## Règles d’utilisation

### Ordre d’affichage des boutons

Pour garantir une navigation prévisible, nous distinguons deux zones d'interaction basées sur l'intention de l'utilisateur.

#### Le flux décisionnel (alignement à droite)

C'est la zone par défaut pour toutes les actions qui font progresser ou clôturent un processus. La lecture se fait de gauche à droite.

Le bouton principal est placé à gauche du groupe, suivi de l’action secondaire. Cette logique permet à l’utilisateur de se focaliser d’abord sur l’action prioritaire.

L’action de fermeture est toujours placée à l'extrême droite du Footer, en style `Ghost`.

En l’absence d’action métier forte, il se peut que le ou le bouton d’action principal porte le style `Outlined`en couleur `Product`.

#### La zone de rupture (alignement à gauche)

Cette zone accueille les actions qui sortent l'utilisateur du parcours de saisie actuel ou qui impactent l'existence même de l'objet.

Dans un parcours en étapes, le bouton pour revenir à l’étape précédente se trouve dans cette zone. Cela respecte la métaphore spatiale de lecture (gauche pour le passé, droite pour le futur).

L’actions de destruction doit être systématiquement isolée à l'extrême gauche. Cette rupture d'alignement sert de garde-fou visuel et physique (Fitts's Law) pour prévenir toute perte de donnée accidentelle.

Ce bouton doit être en `Outlined` et utiliser la palette `Critical`. L’intitulé du bouton doit être “Supprimer” accompagné de l’icône `trash-delete`.

#### Gestion de l’encombrement

Lorsque le nombre d'actions risque de nuire à la lisibilité ou de manquer d'espace, il est recommandé de ne garder visibles que les actions prioritaires et l'action de fermeture.

Les actions secondaires sont regroupées dans un menu contextuel.

### Utilisation des icônes

L'icône n'est pas un ornement. Nous ne l'utilisons jamais « pour faire joli ». C'est un signal fonctionnel qui doit rester rare pour garder son impact.

Par défaut, **nous n’affichons pas d’icône** dans les boutons d’action.

#### Cas exceptionnels

* Pour les actions destructives dans le but de renforcer le signal de danger et limiter les erreurs.
* Lorsque plusieurs actions secondaires sont disponibles et que nous souhaitons en mettre une en avant. Utiliser une icône universelle permet une identification instantanée avant même la lecture du label.

- **Do** : Utilisons l’icône comme repère cognitif. Elle permet à l'utilisateur de repérer instantanément une action dans une liste de boutons secondaires, sans avoir besoin de lire le label
- **Don't** : Ne multiplions pas les icônes sur des actions secondaire. Cela sature l'interface. L’icône perd sa fonction de signal pour devenir un élément de décor parasite.
- **Don't** : N’utilisons pas d’icône sur le bouton principal. Il porte déjà toute l'emphase visuelle par sa couleur pleine. L'ajout d'une icône alourdit inutilement le bouton.

## Cas d'usage

### Contenu non modifiable

Certaines Dialogs n’ont qu’un but consultatif, il n’y a alors pas d’action à réaliser par l’utilisateur. 

Nous utilisons le verbe « **Fermer** » + la croix de fermeture pour que l’utilisateur puisse quitter la Dialog à tout moment.

Nous évitons « OK », ni « Compris ! » : ce n’est pas une action.

### Formulaire simple

Le formulaire simple permet de demander des informations à l’utilisateur en une seule étape.

Ce Footer comporte en général deux boutons : 

* « **Enregistrer + {objet}** » en Product700.
* « **Annuler** » pour que l’utilisateur puisse quitter le formulaire de suite.

Si l’utilisateur a complété des informations et qu'il souhaite quitter, une Dialog de confirmation apparaît.

N’utilisons pas « Enregistrer et quitter », ni « Quitter » dans un Footer : cela porterait à confusion sur le rôle de la croix de fermeture et sur celui de « Annuler »

#### Affichage des erreurs

Une erreur ou une alerte dans le Footer est communiquée uniquement via un Callout popover. L’erreur est potentiellement hors du champ de vision de l’utilisateur et on ne maitrise pas la longueur du message décrivant l’erreur.

Se référer à la guideline Erreurs dans les formulaires.

#### Création en chaîne

Pour permettre à l’utilisateur de créer plusieurs objets à la suite, il suffit de lui proposer un bouton d’action clair. Cette approche simple évite toute complexité dans l’interface

- **Do** : Si l’utilisateur souhaite créer plusieurs objets à la suite, il peut recommencer le processus de création autant de fois qu’il le souhaite.
- **Don't** : Nous évitons la case à cocher ou le bouton du type « Ajouter et nouveau » ou « Créer un objet »: ces intitulés créent de la confusion.

#### Actions claires et distinctes

Nous évitons d’utiliser deux fois le même verbe dans des boutons voisins, pour privilégier des formulations explicites : chaque libellé doit permettre de différencier l’action proposée, sans aucune ambigüité. 

- **Do** : Nous explicitons les actions et évitons l'usage du même verbe dans des boutons voisins.
- **Don't** : Nous n'utilisons pas le même verbe dans deux boutons voisins.
- **Do** : N'utilisons qu'un seul verbe dans le bouton.
- **Don't** : Nous évitons d'utiliser deux verbes d'actions dans un même bouton : cela créerait une confusion pour l'utilisateur sur ce qui va réellement se produire.

### Formulaire en plusieurs étapes

Ce parcours permet de répartir une collecte d'informations en plusieurs étapes. Cela implique une navigation entre les différentes étapes et une validation finale.

Ce Footer comporte en général plusieurs boutons : 

* « **Étape précédente** » , avec l'icône `arrow-left`, positionné sur la gauche du Footer
* « **Étape suivante** » en Product700
* « **Annuler** » pour que l’utilisateur puisse quitter le formulaire à tout moment.

N’utilisons pas de bouton « Enregistrer + {objet} » cela peut perturber l’utilisateur le laissant penser qu’il doit systématiquement enregistrer à chaque étape. Signifions l'enregistrement de manière implicite : il s'effectue à chaque clic sur « Étape suivante ».

Vérifier l'accent sur la majuscule du mot « Étape » pour l'accessibilité.

Le Footer traitant d'actions répétées, ou similaires sur un même objet (ex : contrôle de bulletins de paie), comportent un bouton « **Enregistrer et continuer** » et un bouton « **Annuler** ».

Mais il ne comporte pas « Étape précédente / Étape suivante ».

Pour l'étape finale du parcours, tout Footer contient un bouton d'action principale « **Verbe + {objet}** » . Si l'objet existe déjà avant cette étape finale, utilisons plutôt « **Enregistrer + {objet}** ».

### Dialog de confirmation d'abandon

Lorsque l’utilisateur quitte un formulaire en cours de modification, une Dialog s’affiche pour qu’il confirme son intention. Le Footer de cette Dialog propose des boutons d'action clairs et sans ambiguïté :

* « **Quitter sans enregistrer** »
* « **Annuler** »

Pour le contenu complet de cette Dialog, consulter les messages standards de confirmation.

### Enregistrement automatique

Certains logiciels proposent un enregistrement qui se déclenche dès la saisie des informations. Le Footer relaie la confirmation de l’enregistrement.

### Sélection d'objets

Dans certains contexte, le Footer peut-être utilisé pour réaliser des actions sur une sélection d’objets (IndexTable par exemple).

Le Footer est affiché par défaut sur l’interface, avant même la sélection d’un premier objet. Cela permet de donner une information à l’utilisateur sur ce qu’il peut faire.

Utilisons « **{verbe} + {objet}** » pour les actions liées à la sélection.

Des infos complémentaires peuvent être affichées pour aider à la décision.

Pour des actions secondaires, connues de l’utilisateur, le bouton menu peut être utilisé.

Si plusieurs actions sont possibles sur l’ensemble des objets sélectionnés, il est préférable d’afficher le nombre d’objet en information supplémentaire plutôt que de répéter l’information via le Numeric badge de chaque bouton.

- **Do** : Affichons le nombre d'objets sélectionnés dans l'espace dédié.
- **Don't** : N'affichons pas un Numeric badge dans chaque bouton d'action.
