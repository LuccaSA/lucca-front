# Widgets

# Design

## Anatomie

## Options

### Filtres

L’option filtres permet à l’utilisateur de filtrer les données affichées dans un widget selon des critères définis. Certains filtres peuvent être actifs par défaut. La modification des filtres s’appliquent automatiquement.

Il est recommandé de persister les filtres sélectionnés (le filtre est mémorisé et appliqué à la prochaine visite), mais ce comportement est laissé à l’appréciation de chaque équipe.

### Pagination

L’option pagination permet à l’utilisateur de faire **défiler horizontalement** une liste d’objets identiques dans un widget.

### Déploiement

L'option déploiement permet à l'utilisateur de déplier verticalement un widget pour afficher des informations ou des données supplémentaires.

La hauteur maximum du widget lors du déploiement est de 320px.

⚠️ Cette option est à utiliser avec précaution pour éviter d'afficher trop d'informations et de surcharger la page d'accueil.

Dans le cas où des filtres appliqués ne donnent aucun résultat, l’icône de déploiement est maintenue pour éviter les sauts de mise en page.

- **Don't** : L’option pagination et déploiement ne peuvent pas cohabiter.

### Navigation

Le widget permet à l’utilisateur de naviguer vers les logiciels. Deux **options cumulables** existent :

* Un **bouton** dans l’en-tête du widget permet de naviguer vers le logiciel ou vers la page de tous les objets présentés par le widget.
* Dans le contenu, afficher un **lien** au survol de l’objet présenté pour le consulter dans le logiciel.

Suite au clique la consultation se fait dans le même onglet.

- **Do** : Affichons un bouton de navigation dans l’entête du widget.
- **Don't** : N’affichons pas de lien au survol du titre du widget.
- **Do** : Affichons un lien sur le nom de l’objet pour permettre à l’utilisateur d’être redirigé vers cet objet.

## Spécifications

Les widgets sont conçus pour être utilisés uniquement sur la page d'accueil et non à l'intérieur des solutions. L'affichage des widgets sur la page d'accueil peut se faire en colonne ou en grille.

L’espacement entre ces widgets est de 16px horizontalement et verticalement.

# Content

## **Contenu & rédaction**

Le titre du widget est **obligatoire**.

Il identifie la fonctionnalité ou l'information mise en avant sur la page d’accueil.

Le titre doit préciser l'objet ou l'usage, en évitant le nom du logiciel qui ne clarifie pas la finalité du widget.

Titre au singulier ou au pluriel ? Nos réponses.

- **Do** : Privilégions un titre qui décrit clairement l’usage ou l’objet.
- **Don't** : Évitons d’utiliser le nom du logiciel seul, car il ne donne pas d’indication concrète sur ce que propose le widget.
- **Do** : Utilisons le nom du logiciel s’il est pertinent et décrit l’usage du widget.
