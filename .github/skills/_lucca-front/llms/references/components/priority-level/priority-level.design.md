# priority-level — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/33674d)

# Design

**Mots-clés :** priorité, importance, urgence, niveau

## Définition

Une priorité répond à une seule question : dans quel ordre traiter ? Une personne la choisit, elle peut changer, et elle se compare d’une ligne à l’autre. Elle ne dit rien de l’avancement d’une demande ni de sa nature.

Nous la distinguons de deux notions voisines, qui ont chacune leur composant.

| Notion | Question à laquelle elle répond | Composant | Exemples |
| --- | --- | --- | --- |
| **Priorité** | Dans quel ordre traiter ? | **Icône de priorité + libellée** | Basse, Moyenne, Haute |
| Statut | Où en est le processus ? | **StatusBadge** | Brouillon, En attente, Validée, Refusée |
| Catégorie | De quoi s’agit-il ? | **Tag** | Formation, RH, Document |

Nous affichons toujours une priorité sous la forme icône puis libellé. L’ordre ne doit jamais être inversé.

## Échelle de priorité

Il existe 3 niveaux de priorité et ce sont les même dans tous les logiciels Lucca. Un utilisateur qui passe d'un logiciel à l'autre retrouve les mêmes valeurs, les mêmes icônes et les mêmes couleurs.

Seules les barres actives des icônes porte la couleur. Les barres inactives restent en neutral et le libellé prend toujours la couleur `pr-t-color-text`.

| Niveau de priorité | Icône | Barres actives | Couleur des barres actives |
| --- | --- | --- | --- |
| Basse | `level-low` | 1 sur 3 | `neutral` |
| Moyenne | `level-medium` | 2 sur 3 | `warning` |
| Haute | `level-high` | 3 sur 3 | `critical` |

## Règles d’utilisation

### Couleur

Le libellé ne porte jamais de couleur : l'icône la porte déjà.

Réservons la couleur `neutral` à la priorité basse. La couleur des icônes signale un niveau, jamais un jugement de valeur.

- **Do** : Colorons seulement l'icône et gardons le libellé en pr-t-color-text
- **Don't** : Ne colorons pas le libellé.
- **Do** : Nous affichons la priorité basse en neutral.
- **Don't** : N'employons pas une autre couleur pour la priorité basse.

## Cas d’usage

### Affichage

#### Tableaux

Dans un tableau l’affichage de la priorité occupe une colonne dédiée. Une FilterPill ou des vues permettent de filtrer le contenu par niveau de priorité.

- **Don't** : N'affichons jamais l'icône seule dans une cellule.

#### Card

Dans une Card, la priorité rejoint le groupe de métadonnées, sous le titre, selon le pattern Métadonnées. Elle ne passe jamais au-dessus du nom de la ressource ou à côté.

**C'est la seule métadonnée qui garde son icône.**

S’il y a peu d’espace dans la Card pour afficher la priorité, il est possible d’afficher uniquement l’icône, mais à deux conditions :

1. un Tooltip affiche « Haute » au survol et au focus,
2. le libellé complet apparaît dans le détail ouvert depuis la Card.

#### En-tête

Dans un PageHeader comme dans l'entête d'une Dialog, la priorité rejoint les métadonnées sous le titre. Elle s’affiche sous la forme suivante : « Priorité : icône + libellé ». **C'est la seule métadonnée qui garde son icône.**

### Définir une priorité

Pour définir une priorité, le choix peut s’effectuer dans un **SelectSimple** ou un groupe de **Radio**. Les options sont toujours présentée dans l’ordre suivant : basse, moyenne, haute.

Dans un Select les options de priorité affichent l’icône et le libellé de niveau de priorité.

Dans un groupe de Radio, on affichera uniquement le libellé de niveau de priorité.
