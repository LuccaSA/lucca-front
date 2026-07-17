# icons — Design

## Règles d'utilisation

### Actions génériques

Les icônes d’interface sont des repères visuels universels qui doivent être **cohérents à travers tous les logiciels Lucca**.

Toute action générique (ex : Supprimer, Copier, Dupliquer, Créer) **doit obligatoirement utiliser la même icône** sur tous les logiciels. Cette cohérence renforce les repères utilisateurs établis, facilitant la reconnaissance et l’apprentissage.

### Icônes sans libellé

Certaines icônes peuvent être utilisées sans libellé dans les interfaces Lucca lorsque leur signification est largement connue des utilisateurs (ex. : cœur, croix, flèche).

Ce choix permet d’optimiser l’espace et la densité d’information, notamment dans des contextes à forte densité comme les index tables.

**Accessibilité :** toute icône sans libellé doit impérativement comporter une **Tooltip** affichée au survol, explicitant l’action ou la fonction associée.

### Dans les boutons

L'icône n'est pas un ornement. Nous ne l'utilisons jamais « pour faire joli ». C'est un signal fonctionnel qui doit rester rare pour garder son impact.

Par défaut, **nous n’affichons pas d’icône** dans les boutons d’action.

**Cas exceptionnels**

* Pour les actions destructives dans le but de renforcer le signal de danger et limiter les erreurs.
* Lorsque plusieurs actions secondaires sont disponibles et que nous souhaitons en mettre une en avant. Utiliser une icône universelle permet une identification instantanée avant même la lecture du label.

- **Do** : Utilisons l’icône comme repère cognitif. Elle permet à l'utilisateur de repérer instantanément une action dans une liste de boutons secondaires, sans avoir besoin de lire le label
- **Don't** : Ne multiplions pas les icônes sur des actions secondaire. Cela sature l'interface. L’icône perd sa fonction de signal pour devenir un élément de décor parasite.
- **Don't** : N’utilisons pas d’icône sur le bouton principal. Il porte déjà toute l'emphase visuelle par sa couleur pleine. L'ajout d'une icône alourdit inutilement le bouton.

### Dans les menus déroulants

L’usage des icônes dans les menus déroulants doit être réfléchi et parcimonieux. Les icônes peuvent aider à repérer rapidement certaines actions ou options importantes, mais leur présence systématique sur tous les éléments peut alourdir visuellement le menu et nuire à la lisibilité.

**Quand utiliser des icônes ?**

Les icônes sont particulièrement utiles dans les menus courts ou lorsque les actions proposées sont bien distinctes. Elles facilitent la reconnaissance rapide des options et renforcent la hiérarchie visuelle. Dans ces cas, chaque élément du menu doit idéalement être accompagné d’une icône cohérente.

- **Do** : Lorsque les menus déroulants sont courts ou si les actions sont génériques, nous pouvons afficher des icônes.
- **Don't** : Si un menu déroulant contient des actions trop différentes et/ou trop compliquées à imager, n'utilisons pas d'icônes.

**Éviter la discontinuité visuelle**

Dans les menus plus longs ou comportant des actions très variées, l’ajout d’icônes uniquement sur certains éléments peut créer une rupture visuelle qui perturbe la lecture et la compréhension. Mélanger des items avec et sans icônes dans un même menu génère une discontinuité qui nuit à la fluidité de navigation.

Pour éviter cette confusion, il est recommandé de choisir une approche cohérente : soit afficher des icônes sur tous les éléments du menu, soit ne pas en afficher du tout. Lorsque les icônes ne sont pas indispensables, il est préférable de s’en passer, surtout si elles n’apportent pas de valeur ajoutée claire.

- **Don't** : Ne mélangeons pas option avec et sans icône.

**Structurer le menu par groupes**Pour compenser l’absence d’icônes, il est important de structurer le menu avec des séparateurs qui permettent de regrouper les actions par catégories logiques. Cette organisation facilite la lecture et la compréhension des options proposées.

- **Do** : Structurons le contenu des menus déroulant pour plus de lisibilité et de clarté.

### Distinction "Clear" vs "Delete"

Il est important de bien différencier les icônes représentant l’action d'effacer et celles représentant l’action de supprimer.

* Le **Clear** est utilisée pour des actions temporaires ou réversibles, comme effacer le contenu d'un champ de formulaire ou un élément de liste. Elle ne doit jamais être associée à une suppression définitive. Il n'y a d'ailleurs pas de Dialog de confirmation à la suite de l'action.
* L'icône `trash-delete` symbolise la suppression définitive d'un objet, d'une ligne, d'un fichier ou d'un champ. Cette action est souvent critique et peut être accompagnée d’une confirmation pour éviter les erreurs.

Pour renforcer cette distinction, les actions de suppression sont mise en avant via la palette `Critical`.

## Construction

### Grille

L'ensemble des icônes doit être réalisé dans un espace de construction défini. Cet espace est un carré de 20x20px contenu dans une frame de 24x24px. Il est important de bien aligner les éléments sur la grille pour éviter les effets de flou à l'affichage.

### Structure

Plusieurs structures sont définies à l'intérieur de la grille pour faciliter la construction des icônes. Ces structures vous permettrons de garder une cohérence de proportions entre les différentes formes.

On distingue 4 structures principales :

* **Carrée :** 18x18px
* **Verticale :** 20x16px
* **Horizontale :** 16x20px
* **Cercle :** 20x20px

Si nécessaire, les grilles 16x20 et 20x16 peuvent être étendues à 18x20 et 20x18 afin de garantir une homogénéité dans l'espace occupé par les icônes.

Une cinquième structure existe pour les éléments fins et penchés. On utilisera un cercle de 24x24px pour définir ces icônes.

### Angles

Tous les icônes ne sont pas nécessairement rectangles ou carrés. Dans certains cas, il est possible d'ajouter une rotation dans la construction. Pour cela il est conseillé d'utiliser des angles à 45 degrés.

### Épaisseur

L'épaisseur des icônes est définie à 2px. Il est nécessaire de respecter cette épaisseur pour garder une cohérence graphique entre tous les icônes de notre kit.

### Arrondis

L'arrondi des formes fait partie intégrante du style que l'on veut donner à notre set d'icône. Dans la majorité des cas, il est défini comme ci-dessous :

* Arrondi extérieur : 3px
* Arrondi intérieur : 1px

Dans d'autres cas, l'arrondi peut être ajusté optiquement pour une meilleure lisibilité.

### Tracés arrondis

Le style de nos icônes est très arrondi, jusque dans les tracés de nos formes.

### Découpe

Pour appuyer le style de nos icônes et apporter du dynamisme, il est possible d'intégrer une découpe dans la forme. Cette découpe peut être utilisée pour faire ressortir un élément, pour appuyer une perspective ou encore pour séparer plusieurs éléments de l'objet représenté.

### Remplissage

Quand certaines zones sont trop petites pour être compréhensibles, il est possible de les remplir. Attention cette zone ne doit pas être trop grande pour ne pas prendre trop d'importance visuellement.
