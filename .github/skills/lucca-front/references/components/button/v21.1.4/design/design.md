# button — Design

## Usage

### Hiérarchie

Les boutons emploient la couleur et le contraste pour établir quatre niveaux d'emphase :

* `Filled` (niveau le plus fort),
* `Outlined` utilisant la palette `Product`,
* `Outlined` utilisant la palette `Neutral`,
* `Ghost`.

Cette hiérarchie met en évidence l'action la plus importante dans un contexte donné, permettant à l'utilisateur d'agir rapidement.

#### Primary

Le bouton `Filled` est utilisé pour **l’action principale** dans un contexte donné (page, dialog). Il doit être unique.

- **Do** : Utilisons un seul bouton principal par interface.
- **Don't** : Évitons d’utiliser plusieurs boutons principaux sur un même écran, quelle que soit leur taille.
- **Do** : Nous pouvons utiliser plusieurs boutons principaux sur une interface si l’un des deux apparaît suite à une action de l’utilisateur (sélection, etc.). L’action en question devient alors le flow principal.

#### Secondary

Le bouton `Outlined` est utilisé pour des **actions secondaires**. Il se décline en deux palettes, permettant de créer une hiérarchie supplémentaire :

* `Product` pour des actions importantes complémentaires à l’action principale,
* `Neutral` pour des actions indépendantes de l’action principale mais non prioritaires.

- **Do** : Utilisons le bouton Outlined en couleur Product pour les actions plus importantes.
- **Do** : Utilisons les boutons Outlined  en couleur Neutral dans le composant Filter bar.

#### Tertiary

Les boutons `Ghost` doivent être utilisés avec parcimonie. Les cas d’utilisation sont définis ainsi :

* Pour des **actions d'abandon** qui permettent aux utilisateurs d’annuler ou de passer à autre chose (croix de fermeture des Dialog ou bouton “Annuler”).
* Pour ouvrir un **contenu informatif** comme les politiques (de congés, de frais, etc.) ou les historiques.
* Pour des **actions rapides** dans les Index table et Data table.

- **Do** : Utilisons le bouton Ghost pour les boutons d’annulation et de fermeture des Dialogs.
- **Do** : En dehors des actions d'abandon, le bouton Ghost doit systématiquement être utilisé à côté d'un bouton Outlined ou Filled.
- **Don't** : N'affichons pas plusieurs boutons Ghost les uns à côté des autres sans avoir un bouton Outlined ou Filled. Cela ne met pas en avant la cliquabilité de ces boutons.
- **Do** : Privilégions les boutons Outlined lorsqu'ils sont isolés dans les interfaces.
- **Don't** : Évitons les boutons Ghost pour des actions isolées dans les interfaces. Ils sont trop discret et l'utilisateur peut ne pas les voir.

### Actions critiques

Une variante spécifique du bouton doit être utilisée pour toute action aux conséquences importantes ou irréversibles comme **la suppression d'un élément**.

Ce bouton critique est identifiable par sa couleur `Critical` et peut nécessiter une friction supplémentaire dans l'interface.

Dans certains contexte, il est préférable de mettre en retrait l’action de suppression. Pour cela il existe un `mod-critical` permettant de n’avoir l’aspect critique seulement au survol du composant. Ce mode est utilisable sur les boutons`Outlined`et `Ghost`en palette`Neutral`.

- **Do** : Utilisons le bouton Outlined en palette Critical pour les boutons de suppression et les boutons de confirmation de suppression.
- **Don't** : Nous évitons le bouton Filled en couleur Critical pour les actions de suppression.
- **Do** : Utilisons le bouton Filled en couleur Critical pour les actions de confirmation de suppression.
- **Don't** : Nous évitons le bouton Filled en couleur Product pour les actions de confirmation critiques.

#### Refus ou annulation

Bien qu'elles puissent être perçues comme « négatives », les actions de traitement métier (ex: Refuser une note de frais, Annuler une demande de congés) ne sont pas considérées comme critiques.

Elles ne doivent pas utiliser ni la palette `Critical`, ni le `mod-critical`. Cela permet de maintenir une interface sereine et non anxiogène.

- **Do** : Utilisons des boutons Outlined en couleur Product pour les actions de refus ou d'annulation.
- **Don't** : N'utilisons pas le style des actions critiques pour les actions métier de refus ou d'annulation.

### Groupe de boutons

Le composant Button group permet d'afficher plusieurs boutons sous forme de groupe.

---

## Comportement

### États

Le bouton réagit à différents états d’interaction.

* À l’état normal, il est pleinement visible et accessible au clic.
* Lors du `:hover` il change légèrement de teinte pour offrir un retour visuel à l’utilisateur.
* Pour faciliter la navigation au clavier et l’accessibilité, au `:focus-visible` le bouton reprend le style commun à tous les composants.
* À l’état `:active`, son apparence s’assombrit ou s’enfonce légèrement.

#### Chargement

Lorsqu’une action est en cours de traitement, le bouton peut afficher un indicateur de chargement à la place du label ou de l’icône. La largeur du bouton ne change pas à l’état de chargement.

Cette animation empêche l’utilisateur de cliquer plusieurs fois et informe que l’action est en cours.

#### Succès

Un bouton déclenche une action qui aboutit ou échoue. Le feedback de succès est affiché directement dans le composant. En revanche, le feedback d’erreur est affiché à travers d’autres composants (Toast, Callout, Inline message), et non directement sur le bouton lui-même.

- **Do** : Utilisons l’état succès du bouton pour indiquer à l’utilisateur la réussite de l’action réalisée.
- **Don't** : Nous évitons l'aplat en couleur Success pour indiquer l'état de succès : c'est visuellement très lourd et ça ne fonctionne pas dans tous les cas (exemple : avec un bouton de confirmation critique).

#### Erreur

De la même manière que pour indiquer le succès d'une action, un bouton doit aussi pour indiquer une erreur ou le non fonctionnement de l'action. Dans ce cas, à la suite d'une période de chargement, le bouton vibre de droite à gauche. Un message, sous forme de Callout ou de Toast apparaissent sur l'interface pour expliciter les raisons de l'échec.

- **Don't** : Nous évitons l'aplat en couleur Critical lorsque l’action échoue. Privilégions l’utilisation d’un Callout pour afficher l’erreur et expliquer les raisons à l’utilisateur.

#### Inactif

Les boutons inactifs peuvent être source de confusion et de frustration pour de nombreux utilisateurs, et peuvent être difficiles à repérer pour les personnes malvoyantes.

Pour faciliter les choses, utilisons un bouton actif pour que les utilisateurs puissent cliquer dessus, et affichons un message d'erreur si des informations sont manquantes ou incorrectes.

Il est possible d’utiliser un bouton inactif lorsqu’une fonctionnalité est indisponible pour des raisons de paramétrages ou de rôle. Dans ce cas, affichons un Tooltip au survol du bouton pour expliquer les raison.

Un bouton inactif ne peut ni prendre le focus à la souris ni au clavier. Le curseur de la souris doit rester `default` au survol. Il n'est pas possible d'interagir avec et son UI ne peut pas être altérée.

- **Don't** : Évitons les bouton inactifs pour indiquer qu’il manque des informations ou qu’il y a une erreur.
- **Do** : Affichons toujours un bouton actif, même si le formulaire n’est pas complet : il permet d’afficher les erreurs lorsque l’utilisateur clique sur le bouton.
- **Do** : Dans les interfaces hors formulaires, nous pouvons afficher un bouton inactif : il faut alors préciser la raison de son indisponibilité. L'utilisateur doit toujours comprendre pourquoi une action est bloquée et comment la débloquer.

### Largeur

Par défaut, les boutons ont une largeur adaptée à leur contenu.

Dans certains contextes, notamment sur petits écrans ou mobiles inférieurs à`360px`, il est possible d’utiliser une version fluide qui s’adapte en fonction de l’espace disponible ou la largeur de l’écran. Dans ce cas, le label est centré.

- **Do** : Par défaut, la largeur d’un bouton s’adapte à son contenu
- **Don't** : Un bouton ne dois pas prendre toute la largeur disponible (dans une section ou une page).
- **Do** : Lorsque la largeur de la page ou de la section est faible, notamment dans un contexte mobile ou responsive, le bouton peut occuper toute la largeur disponible. Cela facilite l’interaction tactile et améliore l’ergonomie sur les petits écrans

### Ellipse

Les boutons ne doivent **jamais être ellipsés**. Le texte doit toujours être entièrement lisible, quitte à passer à la ligne. Cela garantit la compréhension de l’action proposée et évite toute ambiguïté.

- **Do** : Si le texte est trop long pour être affiché entièrement, nous pouvons afficher des boutons les uns sous les autres.
- **Don't** : Ne tronquons jamais le texte dans un bouton.

## Règles d’utilisation

### Ordre d’affichage

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

### Position

Nous distinguons deux grands contextes d’affichage des boutons dans nos interfaces, en fonction de la nature de l’action attendue par l’utilisateur :

#### En haut à droite

Ce positionnement est utilisé pour les actions **ayant un impact sur le contenu global de la page**, notamment la création d’une ressource présentée sur cette interface. Si l’interface est divisée en plusieurs sections, les boutons peuvent être positionnés au niveau du titre de chaque section.

*Ce positionnement suit le pattern de lecture en Z et permet de rendre visibles les boutons juste après le titre de l’interface.*

#### En bas de page

Nous plaçons les boutons en bas, dans un Footer, lorsqu’il s’agit **d’actions “finales”**, c’est-à-dire liées à un contenu que l’utilisateur vient de consulter, remplir ou sélectionner. Plus d’informations à ce sujet sur la page du composant Footer.

*Ce positionnement suit le pattern de lecture en Z et s’inscrit dans une logique de complétion de tâche.*

#### En bas de liste

Lorsqu'une liste d'objet est affichée et qu'il est possible d'ajouter des objets à cette liste, nous plaçons un bouton d'ajout directement sous la liste, positionné à gauche.

Dans ce cas, il faut utiliser un bouton `Outlined` en couleur `Product`.

### Utilisation des icônes

L'icône n'est pas un ornement. Nous ne l'utilisons jamais « pour faire joli ». C'est un signal fonctionnel qui doit rester rare pour garder son impact.

Par défaut, **nous n’affichons pas d’icône** dans les boutons d’action.

**Cas exceptionnels**

* Pour les actions destructives dans le but de renforcer le signal de danger et limiter les erreurs.
* Lorsque plusieurs actions secondaires sont disponibles et que nous souhaitons en mettre une en avant. Utiliser une icône universelle permet une identification instantanée avant même la lecture du label.

- **Do** : Utilisons l’icône comme repère cognitif. Elle permet à l'utilisateur de repérer instantanément une action dans une liste de boutons secondaires, sans avoir besoin de lire le label
- **Don't** : Ne multiplions pas les icônes sur des actions secondaire. Cela sature l'interface. L’icône perd sa fonction de signal pour devenir un élément de décor parasite.
- **Don't** : N’utilisons pas d’icône sur le bouton principal. Il porte déjà toute l'emphase visuelle par sa couleur pleine. L'ajout d'une icône alourdit inutilement le bouton.

### Button ou link ?

Le Link n’a pas le rôle d’un Button : le Button est destiné à effectuer des actions précises, et non à rediriger les utilisateurs vers une autre page. L'action du Button se produit sur la même page.

- **Do** : Utilisons des Button pour effectuer des actions précises.
- **Don't** : N’utilisons pas de Link pour représenter des actions, même si cela peut sembler plus esthétique ou dense.
