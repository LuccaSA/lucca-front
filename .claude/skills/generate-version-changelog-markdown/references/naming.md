# Nom du composant en préfixe

Le préfixe est dérivé du **sélecteur** du composant touché, pas du dossier : les entrypoints versionnés ou imbriqués (`date2/calendar2`, `forms/rich-text-input`) donneraient un nom faux. Le scope de commit et le préfixe `[…]` du titre servent à identifier le composant ; c'est le sélecteur qui fixe son orthographe.

## Normalisation

Prendre la première variante `lu*` du sélecteur, retirer `lu-` / `lu`, retirer un éventuel suffixe numérique de version, passer en PascalCase :

| Sélecteur                                            | Préfixe           |
| ---------------------------------------------------- | ----------------- |
| `lu-core-select`                                     | `[CoreSelect]`    |
| `lu-rich-text-input`                                 | `[RichTextInput]` |
| `lu-calendar2`                                       | `[Calendar]`      |
| `lu-tag,pr-tag`                                      | `[Tag]`           |
| `button[luButton], a[luButton], …, button[prButton]` | `[Button]`        |

## Directive

Une directive prend le nom du composant auquel elle se rattache : `[luDialogOpen]` → `[Dialog]`, `[luCoreSelectPanelElement]` → `[CoreSelect]`.

## Sous-composant

Le préfixe est le composant racine de l'entrypoint ; le sous-composant est nommé en code inline dans la description :

```
- [FileEntry] New `lu-file-entry-wrapper` component, a display wrapper around file entries
- [Dialog] Update the `lu-dialog-header` `id` along with the content
```

## Plusieurs composants touchés

Nommer **tous les composants qui portent réellement le changement**, séparés par `/`, le composant central d'abord. N'entrent dans le préfixe que ceux dont l'API, le comportement ou le rendu changent pour le consommateur.

Sont **exclus du préfixe**, même si leurs fichiers apparaissent dans le diff, les composants touchés par ricochet :

- adaptation d'un appel pour suivre une signature qui a changé ailleurs ;
- mise à jour d'import, de type ou correction de compilation ;
- style répercuté sans changement visible propre ;
- composant qui consomme le composant modifié sans gagner de capacité qui lui soit propre.

En cas de doute, regarder le diff du composant : s'il n'apporte rien qu'un consommateur de _ce_ composant remarquerait, il reste hors du préfixe et n'a pas besoin d'être mentionné.

```
- [Calendar/DateInput/DateRangeInput] Add a week selection mode, returning the Thursday of the selected week
- [DataTable/IndexTable] Add the mixed checkbox state
```

Au-delà de trois composants porteurs, ne nommer que le composant **central** — celui qui porte l'implémentation partagée — et mentionner l'étendue du changement dans la description, plutôt que d'aligner une longue liste :

```
- [CoreSelect] Rebuild the simple, multi and tree selects on top of the new listbox component
```

## Changements transverses

Seuls ces préfixes sont autorisés hors composant :

| Préfixe        | Périmètre                        |
| -------------- | -------------------------------- |
| `[Colors]`     | palettes et tokens de couleur    |
| `[Icons]`      | police d'icônes                  |
| `[Utils]`      | classes utilitaires SCSS         |
| `[Tokens]`     | espacements, radius, typographie |
| `[Schematics]` | migrations `ng update`           |

Tout le reste s'écrit **sans préfixe** : dépendances, tsconfig, CI, typage global, outillage, services et stratégies sans sélecteur.
