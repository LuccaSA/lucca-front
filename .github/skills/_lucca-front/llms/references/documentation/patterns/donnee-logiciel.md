# Représenter la donnée « Logiciel »

# Content

## Choisir le bon affichage

| **Cas d’usage** | Affichage |
| --- | --- |
| **Titre de page / modale** | SoftwareIcon + nom |
| **Onglet de navigation** | SoftwareIcon + nom |
| **Tableau, un seul logiciel** | SoftwareIcon + nom |
| **Tableau, plusieurs logiciels** | SoftwareIconWrapper |
| **Lien de redirection** | Link |
| **Bouton** | « Verbe d’action + [objet] » |
| **Éditorial / cross-sell** | SoftwareIcon + Nom |

## Cas d’usage

### Affichage

#### Titres et onglets

Dans un titre ou un onglet, affichons le SoftwareIcon suivi du nom du logiciel.

La taille de l’icône s’adapte en fonction de la taille du titre.

| **Taille de titre** | **Taille de l’icône** |
| --- | --- |
| Heading 1 | 32 x 32 px |
| Heading 2 | 28 x 28 px |
| Heading 3 | 24 x 24 px |
| Heading 4 et text | 20 x 20 px |

#### Tableaux

Dans une cellule de tableau, affichons le SoftwareIcon suivi du nom du logiciel.

Lorsqu'une colonne affiche plusieurs logiciels, utilisons le SoftwareIconWrapper. Au-delà de 5 icônes, un +X s’ajoute à la fin du wrapper et les logiciels masqués s’affichent dans un Popover.

### Navigation vers un autre logiciel

#### Lien

Pour rediriger un utilisateur vers un autre logiciel, nous utilisons le composant Link. Le lien doit utiliser la couleur `Product` du **logiciel dans lequel il se trouve**.

**Dans un tableau ou une liste dense**, quand une redirection doit être effectuée, utilisons un lien en masquant l'icône arrow-external pour éviter une surcharge visuelle.

#### Bouton

Un bouton peut aussi rediriger vers un autre logiciel. Dans ce cas, utilisons un verbe d’action suivi de l’objet comme label et n'ajoutons pas de SoftwareIcon, ni le nom du logiciel.Exemple : « Modifier les absences ».

- **Don't** : N’utilisons pas de softwareIcon dans les boutons.

## Contenu et rédaction

Pour le nom du logiciel écrivons **Absences**, **Notes de frais, Office** jamais « Lucca Absences » ni « Lucca Notes de frais ». Cette règle vaut pour la navigation, les libellés, les filtres, les en-têtes de colonnes et les titres affichés dans la page. Elle ne vaut pas pour le titre de l'onglet du navigateur, qui suit Identification des pages. La liste complète des noms des logiciels, pour toutes les langues, figure dans Noms des logiciels.

### **Formatage**

* **Casse titre :** *Absences*, *Notes de frais*.
* **Pas d'abréviation :** nous écrivons *Notes de frais*, jamais *NDF*.
* **Pas de majuscules :** nous écrivons *Absences*, jamais *ABSENCES.*

### **Le mot « logiciel »**

Dans les interfaces comme dans cette documentation, nous désignons un logiciel Lucca par le mot **logiciel**. Nous écartons « solution », « module », « application », « outil » et « produit », qui créent des ambiguïtés.
