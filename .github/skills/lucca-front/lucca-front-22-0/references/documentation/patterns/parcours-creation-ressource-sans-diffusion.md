# Parcours de création de ressource : sans action de diffusion

# Création

## Types de parcours

Le choix du parcours dépend de la complexité et de la quantité d'informations à saisir.

### Formulaire simple

Ce type de parcours est idéal lorsque la ressource à créer est simple, avec **un nombre limité de champs** à remplir, idéalement pas plus de trois.

Le formulaire est présenté dans une Dialog latérale (`drawer`). L’utilisateur voit tous les champs nécessaires sur un seul écran, ce qui permet une saisie rapide et directe.

La ressource est immédiatement créée à la validation du formulaire.

Le formulaire peut être structuré en plusieurs fieldsets pour maintenir une bonne lisibilité. Une guideline sur les formulaire est disponible pour aider à construire un formulaire.

#### Contenu et rédaction

| Élément | Contenu |
| --- | --- |
| Titre de la Dialog | « **{Infinitif} un/une {ressource}** » |
| Bouton de validation | « **{Infinitif} le/la {ressource}** » en `filled` |
| Bouton d’annulation | « **Annuler** » |

### Formulaire en étapes

Une découpage du formulaire en étapes s'impose lorsque la complexité des Fieldsets devient trop importante. Chaque étape traite un aspect spécifique de la ressource, ce qui permet de focaliser l'attention de l'utilisateur sur un point précis.

Un découpage du formulaire en étapes (via un ProgressStepper) s’impose pour structurer la saisie d'informations denses. L'usage de ce parcours est spécifiquement recommandé dans les cas suivants :

* **Parcours conditionnel :** le contenu des étapes suivantes varie en fonction d'un ou de plusieurs choix fait à l'étape précédente.
* **Création séquentielle de plusieurs objets :** le parcours nécessite d'enchaîner la création de plusieurs entités ou objets distincts (qui seront généralement présentés sous forme d'onglets dans la vue finale).
* **Réduction de la charge cognitive :** la ressource à créer comporte un grand nombre de champs. Diviser sa saisie en plusieurs sous-parties thématiques plutôt qu’en Fieldset permet d'alléger l'effort mental de l'administrateur en focalisant son attention sur un seul sujet à la fois.

Le parcours se déroule dans une Dialog latérale (`drawer`) avec un Progress stepper visible indiquant la progression. Au-delà de 6 étapes la charge cognitive devient trop élevée pour l'utilisateur. Il est impératif de simplifier le processus ou de le découper en sous-tâches plus petites au sein des étapes existantes.

#### Contenu et rédaction

| Élément | Standard |
| --- | --- |
| Titre de la Dialog | « **{Infinitif} un/une {ressource}** » |
| Bouton précédent | «  **← Étape précédente** » en `outlined` |
| Icône `arrow-left`, positionnée sur la gauche du Footer. |   |
| Bouton suivant | «  **Étape suivante** » en `filled` |
| Bouton de validation | « **{Infinitif} le/la {ressource}** » en `filled`. |
| Bouton d’annulation | « **Annuler** » |

### Création de ressources contextuelles

Lorsqu'un utilisateur remplit un formulaire principal, il peut avoir besoin de créer une autre ressource sans quitter le parcours. Il existe deux cas de figure selon la nature de cette ressource contextuelle.

#### Une ressource enfant

Il s'agit d'une ressource dépendante appartenant exclusivement à la ressource principale en cours de création et n'a pas d'existence propre en dehors d'elle.

Selon la complexité de la ressource enfant, le bouton ajoute soit directement une ligne d'édition dans le formulaire, soit ouvre une Dialog (`drawer`) dédiée par-dessus.

#### Une ressource tierce

Une ressource tierce est une ressource autonome, paramétrée de manière globale dans le logiciel et réutilisable dans d'autres contextes. Son parcours de création depuis un Select s'adapte selon la manière dont le bouton d'accès est présenté.

**Bouton permanent**

Lorsque le bouton d'ajout est permanent (sous la forme « + Ajouter un/une {ressource} »), il reste affiché en bas du menu déroulant et devient *sticky* en cas de défilement.

Dans ce cas de figure, le clic entraîne **obligatoirement l'ouverture d'une Dialog latérale** (`drawer`). Aucune donnée n'ayant été saisie au préalable dans le champ, ce formulaire est indispensable pour définir au minimum le nom de la nouvelle ressource.

**Bouton conditionnel à la saisie**

À l'inverse, l'option d'ajout peut être conditionnelle à la saisie et n'apparaître qu'après une recherche. Le bouton adapte alors son libellé au texte tapé par l'utilisateur (« + Ajouter {terme recherché} ») et propose deux comportements distincts selon le besoin d'information :

* **Création directe :** si le terme saisi suffit à caractériser la ressource ou si sa qualification complète est reportée à une étape ultérieure, la ressource est créée immédiatement et sélectionnée dans le champ.
* **Création via Dialog :** si la ressource exige des données complémentaires obligatoires, le clic ouvre une Dialog (`drawer`) dans laquelle le terme recherché vient pré-remplir automatiquement le champ « Nom ».

**Finalisation du parcours**

Quel que soit le mode de création (directe ou via Dialog), la validation de l'action entraîne la fermeture de la Dialog latérale, immédiatement suivie de la fermeture du menu déroulant du Select. La nouvelle ressource tierce ainsi créée est alors automatiquement renseignée comme valeur sélectionnée dans le champ.

## Gestion des erreurs

Dans **le cas d'un parcours sans étapes** (formulaire court ou long), les erreurs sont détectées au moment de la soumission du formulaire, c'est-à-dire au clic sur le bouton de validation.

Dans **le cas d'un parcours en étapes**, la validation des données est **manuelle** et se fait à chaque changement d’étape. Elle est déclenchée soit via le bouton permettant de passer à l’étape suivante, soit via une Dialog de confirmation lorsque l’utilisateur navigue via le composant Progress stepper. Si des erreurs sont détectées lors de la tentative de passage à l'étape suivante, elles sont immédiatement remontées à l’utilisateur via un Callout popover dans le Footer et bloquent la progression tant qu'elles ne sont pas corrigées.

Pour certains champs avec un format spécifique imposé (email, url, date, mot de passe, etc.), qu’il soit obligatoire ou non, les erreurs sont déclenchées au `blur` lorsque le format n’est pas respecté.

Pour en savoir, vous pouvez consulter la guideline dédiée à la gestion des erreurs dans un formulaire.

# Consultation et modification

## Affichage des ressources

Les ressources sont affichées dans les interfaces via deux composants :

* L'**IndexTable** présente les ressources sous forme de tableau, permettant une comparaison plus simple entre les ressources créée, notamment lorsqu’il y en a beaucoup.
* La **ResourceCard** propose quant à elle un affichage en cartes pour une vue plus visuelle et lorsque la quantité de ressources attendue est faible.

Le besoin de comparaison constitue un point déterminant dans le choix du composant d'affichage. Lorsque les utilisateurs ont besoin d'effectuer une comparaison multi-critères détaillée, l'IndexTable est recommandée car elle facilite la lecture et la comparaison colonne par colonne.

## Consultation d’une ressource

Une fois créée, une ressource peut être consultée et modifiée par l'utilisateur. Le mode d'affichage du détail dépend de la complexité de la ressource et de son parcours de création.

### Consultation en Dialog

Ce mode d’affichage en Dialog latérale (`drawer`) est recommandé lorsque les informations de la ressource, une fois celle-ci créée, sont visuellement simples et concises à consulter.

L'usage de la Dialog se justifie même si la création a nécessité un parcours complexe ou un formulaire en plusieurs étapes, la consultation finale reste synthétique et ne nécessite pas une consultation en page complète (pas de sous-navigation, d'onglets ou de gestion de ressources enfants denses).

#### Modification des données

L'utilisateur clique sur la ressource et accède directement à une **Dialog en mode édition ou présentation**, similaire au parcours de création. Dans le cas d’un formulaire en mode `presentation` un bouton est disponible pour rendre le formulaire éditable.

**Contenu et rédaction**

| Élément | Contenu |
| --- | --- |
| Titre de la Dialog | « **Modifier un/une {ressource}** » |
| Bouton de validation | « **Enregistrer le/la {ressource}** » en `filled` |
| Bouton d’annulation | « **Annuler** » |

#### Actions génériques

Les ressources créées portent régulièrement des actions génériques comme l’archivage, la duplication ou la suppression. Ces actions sont disponibles directement depuis la liste des ressources, que ce soit via un IndexTable ou des ResourceCard, via un bouton ouvrant un menu contextuel.

L’utilisateur doit aussi pouvoir accéder à ces actions depuis la ressource. Un même bouton ouvrant un menu contextuel est disponible depuis l’entête de la Dialog.

Si une seule action est disponible, elle doit aussi être placée dans un menu contextuel, elle ne doit ni être affichée comme un bouton textuel, ni positionné dans le Footer de la Dialog.

- **Don't** : Les actions génériques ne doivent pas être présentées dans le Footer de la Dialog.
- **Don't** : L’action de suppression ne doit pas être affiché dans le Footer.

Les actions critiques comme la suppression doivent être suivi d’une Dialog de confirmation de suppression, comme mentionné dans la guideline dédiée.

#### Actions métier

Si des actions métier sont disponibles, celles-ci doivent être positionnées dans le Footer de la Dialog, en respectant les règles d’ordre d’affichage définit dans la guideline du composant Button.

Comme définit dans cette même guideline, lorsque le nombre d'actions risque de nuire à la lisibilité ou de manquer d'espace, il est recommandé de ne garder visibles que les actions prioritaires et l'action de fermeture. Les actions secondaires sont regroupées dans un menu contextuel.

### Consultation en pleine page

Ce mode d’affichage doit être privilégié pour les ressources issues d’un parcours de création en étapes ou si des données supplémentaires peuvent être renseignées après la création initiale, alors ce mode d’affichage doit aussi être utilisé.

L'utilisateur clique sur la ressource et accède à une **pleine page dédiée**, organisée en plusieurs sections reflétant la structure du parcours de création. Les informations renseignées lors de la création y apparaissent en mode `presentation`.

Certaines données, non demandées lors du parcours de création, peuvent être ajoutées à posteriori dans la vue détaillée. L'interface affiche un Empty state section tant que l'utilisateur n'y a rien renseigné.

#### Modification des données

Chaque section peut être modifiée individuellement, offrant une vue d'ensemble tout en permettant des modifications ciblées. Lorsque l’utilisateur clique sur le bouton pour modifier la ressource, le formulaire ne contient que les données présentées dans la section, il ne doit pas repasser par l’entièreté du parcours de création.

**Contenu et rédaction**

| Élément | Contenu |
| --- | --- |
| Titre de la Dialog | « **Modifier le/la {nom de la section}** » |
| Bouton de validation | « **Enregistrer le/la {ressource}** » en `filled` |
| Bouton d’annulation | « **Annuler** » |

#### Actions génériques

Les actions génériques sont disponibles directement depuis la liste des ressources, que ce soit via un IndexTable ou des ResourceCard, via un bouton ouvrant un menu contextuel.

Lorsque l’utilisateur consulte une ressource, les actions génériques doivent être accessible depuis un menu contextuel situé dans le PageHeader.

- **Don't** : N’affichons pas les actions génériques via des Button Icon.
- **Don't** : N’affichons pas les actions génériques dans un menu contextuel situé dans une Dialog de modification.
