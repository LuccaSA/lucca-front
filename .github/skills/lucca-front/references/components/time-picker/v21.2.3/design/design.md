# time-picker — Design

## Anatomie

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=2921:16397">

**Anatomie**

**Anatomie**

<notes>

1. **Label :** Le label du champ doit indiquer quel type d'information le champ requiert.
2. **Champ de saisie :** Le champ dans lequel les utilisateurs cliquent pour saisir une durée. Ce espace se divise en deux pour permettre à l’utilisateur de saisir des heures et des minutes séparément.
3. **Message d’aide (Inline message) :** Le message d’aide est optionnel. Il permet de fournir des informations supplémentaires à l’utilisateur pour l’aider à compléter le champ.

</notes>

</design>

## Options

### Message d'aide

Les deux champs peuvent comporter chacun deux messages d'aide pour fournir des informations contextuelles supplémentaires ou des instructions sur ce que l'utilisateur doit saisir.

* L’utilisation d’une icône juxtaposée au Label permet de clarifier l'intitulé du champ via un tooltip lorsque cela est nécessaire.
* Situé sous le champ, le message d’aide fournit une description informative pour donner plus de contexte à l'utilisateur sur ce qu'il doit saisir.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3431:5134">

**Helper message - Picture**

**Helper message - Picture**

</design>

### Champ obligatoire

Les champs obligatoires doivent être signalés explicitement aux utilisateurs. C’est à la fois une recommandation d’accessibilité et d’ergonomie : les utilisateurs complètent ainsi les formulaires sans avoir de doute sur le caractère obligatoire ou optionnel de chaque champ.

Si un champ obligatoire n’est pas renseigné, une erreur sera remontée à la soumission du formulaire. Pour en savoir plus, vous pouvez vous référer à la guideline sur les formulaires.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3431:5142">

**Required - Picture**

**Required - Picture**

</design>

### Inactif

Un champ inactif indique qu'un champ de saisie existe, mais qu'il n'est pas disponible dans ce contexte, à un instant donné. Cela peut être utilisé pour maintenir la continuité de la mise en page et indiquer qu'un champ peut devenir disponible ultérieurement.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3011:5375">

**Disabled - Picture**

**Disabled - Picture**

</design>

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3011:5375">

**Inactif**

**Inactif**

<notes>

Un champ inactif indique qu'un champ de saisie existe, mais qu'il n'est pas disponible dans ce contexte, à un instant donné. Cela peut être utilisé pour maintenir la continuité de la mise en page et indiquer qu'un champ peut devenir disponible ultérieurement.

</notes>

</design>

## Comportement

### Utilisation dans un formulaire

Dans un formulaire, le composant peut être utilisé avec un label et/ou un message d’aide comme tous les champs de formulaires (Select, Text field, Date picker, etc.).

Les flèches permettant d’incrémenter/décrémenter la valeur saisie ne doivent pas être utilisées dans le cas d'un formulaire.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3431:9491">

**Form - Picture**

**Form - Picture**

</design>

#### Complétion du champ

L’utilisateur peut saisir une durée à l’aide de son clavier. Pour cela plusieurs possibilité :

* Via le pavé numérique pour directement saisir une valeur
* Via les flèches haut et bas pour incrémenter ou décrémenter les heures et minutes

D’autres raccourcis clavier sont disponibles :

* Flèche de droite pour passer des heures aux minutes
* Flèche de gauche pour passer des minutes aux heures
* Retour arrière pour effacer une valeur saisie
* Touche “h” permet de passer des heures aux minutes pour les utilisateurs qui saisissent naturellement “2h30”

Il n’est pas possible de saisir un caractère dans le champ.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3431:9563">

**Form - Completion - Picture**

**Form - Completion - Picture**

</design>

#### Largeur du champ

Dans le cas d’un formulaire, la largeur du champ peut s’adapter à la grille de construction d’un formulaire. Le champ ne peut en revanche pas prendre une largeur plus grande qu’une colonne.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3431:9587">

**Form - Width - Picture**

**Form - Width - Picture**

</design>

### Utilisation “Standalone”

Le Time picker et Duration picker existent aussi en “Standalone”. Des flèches au-dessus et en dessous du champ permettent d’incrémenter/décrémenter la valeur saisie.

Il s’agit d’un cas très particulier utilisé par les applications de gestion des temps comme Timmi Temps. Cette option peut s’avérer pertinente lorsque la saisie à la souris est à privilégier pour apporter un aspect ludique à l’interface.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3431:9534">

**Standalone - Picture**

**Standalone - Picture**

</design>

#### Complétion du champ

Lorsque le champ est en Standalone, des flèches sont visibles permettant à l’utilisateur d’incrémenter les heures et/ou les minutes en fonction du pas défini dans le paramétrage.

Le comportement du champ au clavier est le même en Standalone que pour une utilisation dans un formulaire.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3015:3078">

**Standalone - Completion - Picture**

**Standalone - Completion - Picture**

</design>

#### Sans label ni message d’aide

Le composant ne peut pas être utilisé avec le label, le message d’aide ET les flèches d’incrémentation.

Le format avec label est à privilégier pour une utilisation dans les formulaires alors que le format avec les flèches est à privilégier lorsque l’interface comprends une majorité de champs de ce type (cf. Timmi Temps).

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3431:81702">

**Standalone - Without label - Picture**

**Standalone - Without label - Picture**

</design>

### Incrémentation selon un pas pré-défini

Il est possible d’incrémenter la saisie en suivant un pas défini pour les minute(s) ou les heure(s). Il est important de noter que le pas n’est qu’une aide à la saisie, mais il reste tout à fait possible de saisir une valeur spécifique au clavier.

Si le pas est défini en minutes (ex: P0DT30M), les heures s’incrémentent automatiquement lorsque l’utilisateur augmente les minutes.

Les pas disponibles sont des multiples de 60 (P0DT1M, P0DT4M, P0DT5M, P0DT6M, P0DT10M, P0DT15M, P0DT20M & P0DT30M).

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=2921:16444">

**Increment - Picture 1**

**Increment - Picture 1**

</design>

Si le pas est défini en heures (ex: P0DT1H), alors il n’est pas possible pour l’utilisateur de changer les minutes.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3015:6303">

**Increment - Picture 2**

**Increment - Picture 2**

</design>

### Valeur maximale et minimale

Pour le Duration picker, il est possible de définir une durée maximale ainsi qu’une durée minimale. Lorsque c’est le cas, il faut l’indiquer à l’utilisateur via le message d’aide.

Si l’utilisateur saisit une valeur au clavier qui se trouve hors de ces bornes, la valeur est corrigée automatiquement en ramenant à la valeur maximale ou minimale. Le champ ne peut donc pas se trouver en erreur.

Lorsque l'utilisateur saisit une valeur qui ne peut pas correspondre à une heure valide (définit par une valeur maximale ou minimale), le composant comprend qu'il s'agit en fait d'une saisie partielle et passe directement au champ des minutes pour continuer la saisie. Par exemple, avec une valeur maximale de “23 h 59”, si l’utilisateur saisit “8” dans le champ des heures, le focus se déplacera automatiquement sur les minutes car il n’est pas possible de saisir 80, 81 […] 89 heures.

### Comportement sur mobile

Le clic sur le composant ouvre le clavier du téléphone pour permettre à l’utilisateur de saisir une durée. L’ouverture du clavier doit se faire sur le clavier numérique. Si le composant était en “Standalone”, alors l’utilisateur peut aussi les utiliser pour saisir dans le champ.

## Contenu & internationalisation

### Système horaire sur 12 heures

Dans un contexte d’internationalisation, il existe une option pour les pays adoptant le système horaire sur 12 heures. Cette option permet à l’utilisateur de sélectionner AM ou PM.

<design figma-url="https://www.figma.com/design/ud1QBuvu6PMBaMRljCZVYV/?node-id=3431:9096">

**PM - Picture**

**PM - Picture**

</design>

### Heures et minutes

Seules les minutes seront systématiquement cadrées sur deux caractères (ajout de zéros par la gauche). On écrit donc “05” minutes et non pas “5” minutes.

Les heures, elles, sont cadrées sur un ou deux caractères. On écrit “2” heures et non pas “02 h” heures.
