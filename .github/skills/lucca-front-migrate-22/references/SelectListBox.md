# Select panel → ListBox

Le panel des nouveaux Select (`lu-simple-select` et `lu-multi-select`) référençait encore le vieux style peu maintenable hérité de `luSelect`. Il est remplacé par le composant **ListBox**.

## Ce qui est automatique

Le remplacement du panel est fait automatiquement par LF (côté composant). **Aucune action** n'est requise en usage standard.

## Ce qui peut casser (⚠️ contextuel)

Les projets qui **overrident** la classe `.optionItem` et ses enfants verront des régressions, car ces classes n'existent plus dans le panel ListBox.

Cas le plus courant :

| Override déprécié | Remplacement |
|---|---|
| `.optionItem-value` | `.listboxOption-content` |

## Migration

1. Rechercher dans les SCSS/CSS du projet les sélecteurs ciblant `.optionItem` et ses enfants (`.optionItem-value`, etc.).
2. Remplacer `.optionItem-value` par `.listboxOption-content`.
3. Pour les autres enfants de `.optionItem` sans équivalent documenté : inspecter le DOM réel du panel ListBox et signaler l'override comme nécessitant une reprise manuelle (ne pas deviner le nom de classe).

> Ne jamais inventer un nom de classe ListBox : si l'équivalent n'est pas documenté ici, signaler et laisser le développeur trancher.
