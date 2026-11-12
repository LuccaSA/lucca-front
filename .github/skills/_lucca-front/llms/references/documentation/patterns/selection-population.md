# Sélection de population

**Sommaire**

- Content
  - Sélection nominative
    - Sélection simple
    - Sélection avancée
    - Comportement
    - Consultation de la sélection
  - Sélection par critère
    - Champs
    - Cas d'usage
    - Comportement

# Content

Le pattern propose deux modes de constitution de la population :

* la **sélection nominative** : l'utilisateur choisit les collaborateurs un à un, la population reste figée.
* la **sélection par critère** : l'utilisateur définit des critères, la population est dynamique et évolue avec les collaborateurs qui y correspondent.

Le mode dépend de la durée de vie de la population : figée à un instant donné, nous utilisons la sélection nominative ou à maintenir à jour, la sélection par critère.

## Sélection nominative

L'utilisateur désigne nommément et unitairement les collaborateurs. La population reste figée après validation. L'ampleur de la sélection décide de la configuration :

* pour désigner quelques collaborateurs, un Select suffit.
* dès qu'il faut filtrer ou rechercher, nous passons à la sélection avancée.

### Sélection simple

Un SelectMultiple suffit à constituer la population. Nous retenons cette configuration lorsque l'utilisateur connaît les collaborateurs à désigner.

Pour en savoir plus sur la configuration du champ et l'affichage de la sélection, référez-vous à la guideline associée.

### Sélection avancée

La sélection avancée s'ouvre dans une Dialog de type `drawer`, depuis deux points d'entrée. Ils diffèrent sur la façon de l'ouvrir et sur la restitution de la sélection dans l'objet. Tout ce qui suit s'applique aux deux.

#### Points d'entrée

**Depuis un Select**

Nous utilisons ce point d'entrée lorsque la sélection de collaborateurs est un champ parmi d'autres dans un formulaire. Le Select propose alors l'option « **Ouvrir la sélection avancée** » : l'utilisateur sélectionne directement quelques collaborateurs dans le champ, et n'ouvre la sélection avancée que si nécessaire (filtres, recherche avancée).

Le formulaire reste léger : la sélection avancée n'apparaît qu'à la demande.

Une fois la sélection validée, la Dialog se ferme et le champ affiche les collaborateurs retenus. L'utilisateur peut en retirer directement dans le champ, ou rouvrir la sélection avancée pour retravailler sa population.

**Depuis une Box**

Nous utilisons ce point d'entrée lorsque l'ajout de collaborateurs est une composante majeure de l'objet (ex. constituer la population d'une campagne). Une Box introduit une section dédiée et porte un bouton « **Sélectionner des collaborateurs** » qui ouvre directement la sélection avancée. Cette configuration permet de :

* mettre en avant l'étape de constitution de la population dans un parcours,
* ajouter une description pour guider l'utilisateur,
* proposer d'autres modes d'ajout de collaborateurs.

Une fois la population sélectionnée, la Box devient un HighlightData : elle affiche l'effectif sélectionné et un bouton « **Modifier** ». Un clic sur l'effectif ouvre le panier de sélection pour consulter le détail.

### Comportement

#### **Sélection**

Cocher un collaborateur dans le tableau l'ajoute à la sélection. Le décocher l'en retire. Le résumé de sélection, situé dans le Footer de la Dialog, récapitule l’effectif sélectionné et s’actualise à chaque ajout ou retrait. Un compteur annonce le nombre de résultats de la liste affichée.

#### **Filtres et recherche**

Les filtres et la recherche n'agissent que sur la liste affichée : **la sélection reste inchangée**. L'utilisateur peut ainsi enchaîner plusieurs filtres pour constituer sa population sans perdre sa sélection.

### **Consultation de la sélection**

La Checkbox « **Afficher les collaborateurs sélectionnés** » filtre le tableau pour afficher uniquement les collaborateurs sélectionnés. L'utilisateur peut y rechercher un collaborateur, appliquer des filtres et vider toute la sélection en une action.

## Sélection par critère

L'utilisateur ne désigne pas les collaborateurs un à un : il définit des critères, et la population regroupe tous les collaborateurs qui y correspondent. Chaque critère associe un **champ** (ex. Établissement) et une ou plusieurs **valeurs** (ex. Lucca France, Lucca Belgique).

Les critères se combinent selon une règle unique :

* **entre les valeurs d'un même champ**, le collaborateur correspond à l'une des valeurs (OU),
* **entre plusieurs champs**, il correspond à tous (ET).

Un critère sans valeur ne restreint pas la population. Le nombre de collaborateurs se recalcule à chaque modification.

La population est **dynamique** : les collaborateurs qui remplissent les critères après coup (nouvelle embauche, changement de département…) la rejoignent automatiquement, ceux qui ne les remplissent plus en sortent.

### Champs

Chaque produit choisit les champs proposés selon son besoin métier. Les champs s'affichent sous forme de formulaire et sont regroupés par thème.

| Champ | Thème | Type |
| --- | --- | --- |
| Unité légale et Établissement | Organisation | Liste de valeurs |
| Département | Organisation | Liste de valeurs |
| Manager | Organisation | Collaborateur |
| Qualification | Contrat | Liste de valeurs |
| Catégorie socioprofessionnelle | Contrat | Liste de valeurs |
| Type de contrat | Contrat | Liste de valeurs |
| Date de début de contrat | Contrat | Date |
| Ancienneté | Contrat | Durée |
| Genre | Informations personnelles | Liste de valeurs |

### Cas d'usage

L'accès aux critères varie selon la complexité du formulaire qui l'accueille. Dans les deux cas, l'utilisateur retrouve la même zone de critères et le même résumé de sélection.

#### Formulaire simple

Nous retenons cette configuration lorsque la population n'occupe qu'une place parmi d'autres champs du formulaire. Une Box affiche l'effectif ciblé et porte un bouton « **Modifier** » qui ouvre la Dialog de sélection par critère.

#### Formulaire en étape

Nous utilisons ce cas lorsqu’un objet se crée en plusieurs étapes et nécessite l’ajout d’une population. Les critères occupent alors une **étape entière du parcours de création**.

### Comportement

#### **Point de départ**

À l'ouverture, aucun critère n’est renseigné : la population comprend tous les collaborateurs, et chaque critère renseigné la restreint. Le résumé de sélection affiche donc un nombre dès le premier écran.

Nous partons de l'ensemble des collaborateurs pour trois raisons :

* **Sans critère, personne n'est exclu** : seul un critère renseigné restreint la population.
* **L'utilisateur voit l'effet de chaque critère** : le nombre de collaborateurs baisse à chaque critère renseigné.
* **L'utilisateur filtre une liste**, comme dans la sélection avancée.

- **Don't** : Ne rendons pas un champ de critère obligatoire et n’utilisons pas de placeholders.

Lorsqu’aucun collaborateur ne correspond aux critères, **le résumé de sélection affiche « 0 collaborateur », sans empty state**. Le nombre porte l'information, 0 est une valeur comme une autre.

#### **Consultation du détail**

Un clic sur le nombre de collaborateurs ouvre la Dialog « **Détail des collaborateurs** », en lecture seule. Cette Dialog liste les collaborateurs correspondant aux critères, et propose une recherche pour vérifier si une personne en fait partie.
