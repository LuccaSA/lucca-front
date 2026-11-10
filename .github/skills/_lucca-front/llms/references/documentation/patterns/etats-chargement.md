# États de chargement

# Content

L’objectif est de rendre le temps de chargement invisible pour l'utilisateur. L’état de chargement débute 100ms après le déclenchement, cela permet de ne pas afficher cet état lorsque le temps de chargement est rapide. Ce feedback visuel du chargement doit être placé au plus proche de l'action de l'utilisateur.

Une animation de transition sera utilisé pour limiter l’effet flash. Nous utiliserons un `FadeIn` pour l’apparition du Skeleton puis pour les données qui apparaissent.

Nous privilégions la vélocité : **aucun délai artificiel n'est ajouté pour lisser l'interface**. Dans cette optique, l'interface se charge de manière asynchrone : chaque composant s'affiche dès qu'il est disponible, sans attendre le chargement complet de la page.

## **Cas d'usage**

### Chargement de structure

Lors de la navigation entre des pages **nous utilisons un Skeleton**.

Il simule la mise en page finale de l’interface. Son but n'est pas d'indiquer une progression précise, mais de préparer l'utilisateur à la structure du contenu à venir. Le Skeleton ne doit pas chercher à reproduire l'interface à 100% :

* utilisons des blocs pour représenter les textes, images et avatars,
* évitons d'inclure des icônes ou des éléments interactifs détaillés.
* l'attention de l'utilisateur doit rester focalisée sur l'arrivée de la donnée, pas sur l'animation du chargement elle-même.

Pour en savoir plus sur le Skeleton, vous pouvez consulter la guideline spécifique à ce composant.

### Réponse à une action utilisateur

#### Déclenchement manuel

Cette section concerne les interactions ponctuelles où l'utilisateur attend une réponse rapide du système après une action précise. L’état de chargement doit être indiqué via **le composant Loading**.

Ce feedback visuel doit impérativement être placé au plus proche du point d'interaction (Button par exemple) pour intercepter le regard de l’utilisateur.

#### Enregistrement automatique

Dans le cas d’un enregistrement automatique, il est nécessaire d’afficher l’état d’attente, lorsque l’opération est en cours, près des boutons d’actions principaux. Cela permet à l’utilisateur de vérifier que son travail est bien enregistré avant de cliquer sur le bouton d’action.

Nous utiliserons un Loader animé accompagné de la mention « **Enregistrement…** »

### Processus longs et/ou asynchrones

Cette section regroupe les actions dont la durée est longue ou imprévisibles (import, export, génération de document, etc.). Cet état de chargement **doit être matérialisé par une animation spécifique** illustrant l’action en cours :

* l’illustration doit être accompagnée d'un message descriptif de l’état,
* afin d'éviter tout mouvement superflu, nous n'ajouterons aucun élément animé en plus de l'illustration (ni Gauge, ni ProgressBar).

L'utilisateur doit pouvoir quitter la page si le traitement est asynchrone, nous l’avertirons alors de cette possibilité ainsi de la réussite ou de l’échec du traitement, ceci grâce à un email ou une notification système.

#### Analyse de document

L’analyse de document est un état transitoire indispensable lors du traitement de fichiers importés par l'utilisateur. L’illustration doit indiquer l’analyse d’un document :

* il est possible d’adapter l’aspect de l’objet à analyser (facture, dépense, fichier tableur, etc.),
* l’animation de scanner doit être identique pour assurer une cohérence visuelle entre toutes nos analyse,
* le texte associé sera : « **Analyse en cours…** ».

#### Génération de contenu

La génération de contenu intervient lorsque l'application synthétise, compile ou crée un nouvel élément de toutes pièces à partir de données existantes (par exemple : la création d'un rapport).

L’illustration doit refléter la création d’un document :

* le type de document dans l’illustration peut-être adapté,
* le texte quand à lui devra être : « **Génération du/de la [Nom de l’objet] en cours…**».

#### Traduction

Le pattern de traduction est présent lorsque l'application convertit ou génère des contenus textuels d'une langue à une autre, comme la traduction automatique de questions de formulaires.

L’animation doit ici valoriser la "réflexion" du système :

* elle intègre les codes visuels de l’IA (étoiles),
* le texte doit indiquer : « **Traduction en cours…** ».

### Chargement d'éléments paginés

#### Pagination classique

Lors d’un changement de page d’une pagination classique, l’intégralité des données passe au format Skeleton. Seules les lignes du tableau basculent vers l'état Skeleton.

Dans le cas où une action (comme l'application d'un filtre) nécessite de recharger la pagination, le bloc de contrôle complet (boutons et indicateurs de pages) passe au format Skeleton.

#### Scroll infini

Lors d’un chargement de données supplémentaires avec un scroll infini, nous faisons apparaître un élément supplémentaire en Skeleton. C’est le cas pour les listes de ResourceCard mais aussi les IndexTable utilisant un scroll infini.

#### Select

Le composant Select intègre également un mécanisme de pagination. Lors de l'ouverture du menu déroulant, un option s'affiche au format Skeleton le temps de récupérer les données.

Le comportement est similaire lorsque l’utilisateur scroll en bas de liste et que nous chargeons de nouvelles données.
