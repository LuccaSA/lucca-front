# Select panel → ListBox

Le panel des nouveaux Select (`lu-simple-select` et `lu-multi-select`) référençait encore le vieux style peu maintenable hérité de `luSelect`. Il est remplacé par le composant **ListBox**.

## Ce qui est automatique

Le remplacement du panel est fait automatiquement par LF (côté composant). **Aucune action** n'est requise en usage standard.

## Ce qui peut casser (⚠️ contextuel)

Les projets qui **surchargent** la classe `.optionItem` et ses enfants verront des régressions, car ces classes n'existent plus dans le panel ListBox.

Cas le plus courant :

| Override déprécié | Remplacement |
|---|---|
| `.optionItem-value` | `.listboxOption-content` |

## Détection — ne rien modifier automatiquement

Les surcharges SCSS du panel sont **hors périmètre de la migration automatique** : ne modifier aucun sélecteur, même quand un équivalent est documenté. Le rendu du panel dépend de la structure DOM réelle et du reste de la feuille de style du projet — seul le développeur peut valider le remplacement.

1. Rechercher dans les SCSS/CSS du projet les sélecteurs ciblant `.optionItem` et ses enfants (`.optionItem-value`, etc.).
2. **Lister chaque occurrence dans le rapport de migration** (fichier, ligne, sélecteur), avec l'équivalent connu à titre indicatif (`.optionItem-value` → `.listboxOption-content`) et « équivalent non documenté » pour les autres.
3. Laisser l'utilisateur trancher et appliquer les changements.

> Ne jamais inventer un nom de classe ListBox : si l'équivalent n'est pas documenté ici, le signaler tel quel.
