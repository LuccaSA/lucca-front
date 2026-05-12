# Pattern IA

# Cas d'usage

## Aide à la rédaction et traduction

Ce cas d’usage vise à accompagner les utilisateurs dans la formulation de contenus clairs, concis et adaptés, que ce soit pour reformuler une phrase ou traduire un texte.

### Élément déclencheur

Déclencheur global pour reformuler ou optimiser l’ensemble du contenu d’une section. Ce bouton peut-être placé dans un composant Callout permettant de donner plus de contexte à l’utilisateur.

Déclencheur local, via le composant Button, rattaché à chaque champ ou contenu éditable pour un accompagnement plus ciblé.

### Affichage des suggestions

Une fois le déclencheur activé, l’assistance IA peut proposer une ou plusieurs suggestions positionnée de façon contextuelle. L’utilisateur peut appliquer ou refuser la suggestion.

Ces suggestions s’affichent via le composant Callout.

Lorsque l’utilisateur survole les boutons pour confirmer ou non la proposition, le texte du champ ou celui du Callout s’affiche en barré.

---

## Analyse de contenu

L’analyse de contenu utilise l’IA pour extraire automatiquement des informations des documents importés ou analyser des données renseignées dans les logiciels.

### Élément déclencheur

#### Import de document

L’analyse se lance automatiquement dès qu’un utilisateur importe un document via un File upload. Le Tag "Scan intelligent" signale que le fichier sera traité par l’IA pour extraire les informations clés.

#### Déclenchement automatique

Dans certains cas, l’analyse est différée et programmée à une date précise. L’utilisateur est informé de cette échéance via un message clair dans un Empty state.

L'illustration utilisée doit rester la même que dans les Empty state habituels, **sans porter les codes graphiques utilisés pour l'IA** chez Lucca.

### Animation d'analyse

Suite au déclenchement, qu'il soit manuel ou automatique, une animation informe que l’analyse est en cours.

Cette animation **doit porter les codes graphiques utilisés pour l'IA** chez Lucca, les icônes ainsi que les dégradés.

Vous pouvez vous rapprocher de l'équipe Brand pour travailler une animation spécifique à votre besoin.

### Affichage de l'analyse

#### Synthèse

L’IA peut intervenir pour aider à tirer des enseignements ou à générer une synthèse à partir d’un contenu existant.

Ce bloc doit s’intégrer au maximum dans l’interface, un **Tag reprenant les codes graphiques** suffit pour indiquer à l’utilisateur qu’il s’agit d’un contenu généré par IA.

Le bloc comprend 2 lignes minimum. Nous gagnons ainsi en espace. L’utilisateur accède à la totalité du contenu avec le bouton “Lire plus”.”

#### Remplissage automatique de champs

Après analyse d’un fichier, des champs pré-remplis peuvent être proposés par IA. Cette complétion automatique vise à accélérer la saisie et à réduire les erreurs.

Il est possible d’afficher un **indicateur global** au formulaire s’il n’est pas souhaitable de mettre en avant les champs complétés.

Nous utiliserons plutôt un **indicateur local** pour mettre en avant les champs complétés. L’icône disparaît automatiquement si l’utilisateur modifie la valeur renseignée dans le champ.

#### **Rapprochement de contenus**

L’analyse peut servir à rapprocher un nouveau contenu ou document d’un élément déjà existant dans le logiciel. L’IA identifie des correspondances pertinentes et les met en évidence dans l’interface. L’utilisateur peut alors valider ou non le rapprochement.

Ce message s’affiche via le composant Callout.

---

## Assistant conversationnel

Accessible depuis la page d’accueil Lucca ou les logiciels Lucca, l’assistant IA conversationnel permet de poser des questions sur les données traitées dans nos logiciels.

# Codes graphiques

## Codes graphiques

Dès qu’une fonctionnalité repose sur une technologie d’intelligence artificielle (IA générative, OCR, conversationnel, etc.), on applique le pattern IA pour garantir cohérence et homogénéité dans l’interface et au travers des logiciels Lucca.

### Iconographie

Une iconographie est définie pour marquer visuellement tout point d’interactions avec l’intelligence artificielle :

* l’icône `weather-stars` est utilisée pour les bandeaux ou suggestions,
* l’icône `office-pen-star` est utilisée pour les actions déclenchant une aide à la saisie ou à la traduction,
* l’icône `bubble-stars` est utilisé pour ouvrir l’assistant conversationnel.

Seules les icônes définies dans cette guideline pour un usage lié à l’IA peuvent être utilisées. Si vous rencontrez un besoin de création de nouvelle icône, contactez l’équipe Design System.

Concernant l’assistant conversationnel, il possède sa propre icône, semblable au reste des logiciels Lucca. Cette icône est disponible dans le composant Software icon.

### Utilisation du dégradé

Le dégradé se compose de deux couleurs, une couleur décorative `orchid` ainsi que la couleur `brand`. À partir de des deux couleurs, nous avons définit une palette `--palettes-ia` composé de 10 dégradés du plus sombre au plus clair (`--palettes-ia-50` à `--palettes-ia-900`).

Depuis ce nuancier de dégradé nous avons défini des tokens spécifiques :

* `--pr-t-color-border-ai` utilisé pour les bordures (Button, Tag, Callout, etc.),
* `--pr-t-color-background-ai` utilisé en arrière-plan
* `--pr-t-color-icon-ai` utilisé pour les icônes.

- **Do** : Lorsque plusieurs composants sont imbriqués, seul le composant parent porte les codes graphiques.
- **Don't** : N’appliquons pas les codes graphiques dans les composants imbriqués.
- **Do** : Utilisons le dégradé en arrière-plan pour attirer l’oeil sur une information générée par IA.

# Content

#### **Nous n'avons rien à vous dire ici… pour le moment.**

Luccasien·ne, des questions, des remarques ?Partagez-les sur Slack sur *#ux-writing* ou *#design-system-public*.
