# Classement des PRs

## Section d'une PR

Point de départ : les labels.

| Label GitHub                   | Section                                                                                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:bookmark::sparkles: Feature` | `🎉 Features`                                                                                                                                             |
| `:bookmark::bug: FIX`          | `🩹 Fixes`                                                                                                                                                |
| `:hammer: Technical`           | `🔨 Technical`                                                                                                                                            |
| `:book: Documentation changes` | `📖 Documentation`                                                                                                                                        |
| `👥 UI`                        | signal fort pour `🎨 UI update`                                                                                                                           |
| `:boom: Breaking change`       | pas une section : alimente `✅ Actions required to update`, **en plus** de la section correspondant à la nature du changement, où l'entrée est marquée 💥 |
| `:skull: Deprecate`            | pas une section : alimente `🧹 Actions suggested`                                                                                                         |

Arbitrages quand plusieurs labels cohabitent, ce qui est fréquent :

- `Documentation changes` accompagne presque toujours une feature ou un fix : c'est un effet de bord, pas la nature du changement. Ne classer en `📖 Documentation` que les PRs dont la doc ou les stories **sont** le livrable.
- `Feature` + `Technical` → `🎉 Features` si le consommateur du framework y gagne une capacité, `🔨 Technical` sinon.
- `FIX` + `Technical` → `🩹 Fixes`.
- Aucun label exploitable → se rabattre sur le préfixe de commit conventionnel (`feat:`, `fix:`, `tech:`/`chore:`/`refactor:`/`test:`, `docs:`), puis sur le contenu de la PR.

### Heuristique `🎨 UI update`

Une PR va dans `🎨 UI update`, et pas dans `🩹 Fixes` ou `🎉 Features`, quand le changement est **purement visuel et subi** : il ne modifie ni l'API ni le comportement, mais l'apparence change sans action du consommateur.

Signaux : label `👥 UI`, diff limité à `packages/scss/**` ou aux `.scss` d'un composant, changement de tokens / palettes / espacements / typographie, alignement sur une maquette Prisme.

Contre-exemples : un défaut visuel corrigé (alignement cassé, chevauchement, contraste) reste un `🩹 Fixes` ; une nouvelle variante visuelle activable par un input reste une `🎉 Features`.

---

## Ordre dans une section

Trier **par importance métier**, pas par numéro.

- `🎉 Features` : nouveaux composants, puis capacités majeures, puis améliorations mineures.
- `🩹 Fixes` : impact utilisateur fort d'abord (bug bloquant, régression, accessibilité), puis corrections secondaires.
- `🎨 UI update` : changements visuels structurants, puis ajustements cosmétiques.
- `📖 Documentation` : doc des nouveaux composants et features, puis compléments et clarifications.
- `🔨 Technical` : build/CI/release à impact global, puis refactoring et maintenance.
- `💀 Deprecated` : d'abord ce qui disparaîtra le plus tôt ou touche le plus de code, puis le reste.

### Rangs dans `🎉 Features`

1. Nouveaux composants
2. Nouvelles capacités majeures sur composants existants
3. Améliorations mineures

La frontière entre 2 et 3 se tranche sur l'**ampleur réelle du changement**, jamais sur la longueur ou le ton du titre — un titre laconique peut cacher une refonte. En cas d'hésitation, regarder les fichiers touchés (`gh pr view <NUM> --json files`) avant de classer.

Relève du rang 2 :

- un nouveau mode de fonctionnement d'un composant (nouvelle façon de sélectionner, de naviguer, d'afficher) ;
- un nouveau sous-composant, une nouvelle directive ou un nouveau service exportés dans la `public-api` ;
- une refonte de l'implémentation d'un composant existant ;
- un changement qui se propage à plusieurs composants ou à tout un entrypoint.

Relève du rang 3 :

- un nouvel input/output ou attribut sur une API existante ;
- une nouvelle valeur acceptée par une API existante (palette, taille, variante) ;
- un ajustement circonscrit à un seul composant.

Si plusieurs nouveaux composants existent, les placer en tête et les ordonner par numéro de PR croissant.

### Détection des nouveaux composants

Ne pas se baser uniquement sur le titre. Une PR est un **nouveau composant** si au moins un signal fort est présent :

- le titre ou la description mentionne explicitement `new component`, `nouveau composant`, `add component` ;
- le scope ou le préfixe correspond à un composant inédit dans la version et le contenu montre une création initiale ;
- la PR ajoute la structure complète d'un composant (stories, styles, API, docs, exports) ;
- les changelogs ou fichiers de doc associés décrivent une première disponibilité.

En cas de doute, privilégier l'interprétation **nouveau composant** si les artefacts montrent une création initiale.

### Regroupement par composant à importance égale

À l'intérieur d'un même rang, les entrées qui portent sur le **même composant** se suivent, plutôt que d'être dispersées.

- Le regroupement ne remonte jamais une entrée d'un rang à l'autre.
- Un groupe se place à la position de son entrée la mieux classée ; les autres la rejoignent immédiatement.
- À l'intérieur d'un groupe, ordonner par numéro de PR croissant.

À importance similaire et sans composant commun, conserver un ordre stable (numéro de PR croissant).

---

## Sections `✅ Actions required to update` et `🧹 Actions suggested`

Ce ne sont pas un tri de PRs mais une **liste d'actions de migration**, écrites du point de vue du consommateur : ce qu'il doit faire dans _son_ code.

1. Isoler les PRs breaking : celles labellisées `:boom: Breaking change`, complétées par le balayage du diff décrit dans [`breaking.md`](breaking.md).
2. Lire le corps de chacune (`gh pr view <NUM> --json body,files`) pour identifier ce qui casse : API supprimée ou renommée, valeur d'input disparue, exigence de version, changement de structure de template, durcissement de typage.
3. Écrire **une entrée par migration**, en nommant les symboles en code inline. Une même PR peut donner plusieurs entrées ; plusieurs PRs poursuivant la même migration donnent une seule entrée cumulant les liens.
4. Si un schematic couvre la migration, le mentionner (`(see schematics)`) et vérifier qu'il figure dans `🤖 Schematics`.

Une PR `Breaking change` reste listée dans sa section naturelle : les deux ne s'excluent pas. Vérifier ce doublement pour **chaque** PR breaking — une PR qui ne casse que du typage ou des peer dependencies a aussi sa place en `🔨 Technical`.

Dans cette section naturelle, l'entrée porte le marqueur 💥 avant le préfixe de composant :

```
- 💥 [ActivityFeed] Group updates together [#XXXX](url)
- 💥 Drop Angular 21 from the peer dependencies [#XXXX](url)
```

Une ligne qui regroupe plusieurs PRs porte le marqueur dès qu'**au moins une** d'entre elles est breaking.

`🧹 Actions suggested` recueille ce qui n'est pas bloquant et **n'est pas une dépréciation** : remplacements HTML → Angular recommandés, adoptions conseillées, nettoyages. Les dépréciations vont dans `💀 Deprecated`.

Si aucune action, la section n'apparaît pas.

---

## Section `💀 Deprecated`

Liste ce qui est **marqué déprécié dans cette version** : API, input, output, classe CSS, variable, composant ou entrypoint entier. Une dépréciation annonce une suppression future ; elle ne casse rien aujourd'hui, ce qui la distingue de `✅ Actions required to update`.

Point de départ : les PRs labellisées `:skull: Deprecate`. Vérifier aussi les `@deprecated` ajoutés dans le diff, une PR pouvant déprécier sans porter le label.

Chaque entrée nomme **ce qui est déprécié** et **par quoi le remplacer** :

```
- [Composant] `oldInput` is deprecated, use `newInput` instead [#XXXX](url)
- [Colors] The `palette-lucca` class is deprecated, use `palette-product` instead [#XXXX](url)
```

Quand aucun remplacement n'existe encore, le dire explicitement plutôt que de laisser la ligne incomplète :

```
- [Dialog] `neutralBackground` is deprecated on introduction, it is a transitional option with no replacement yet [#XXXX](url)
```

Une PR de dépréciation reste listée dans sa section naturelle si elle apporte autre chose (une feature, un fix) : les deux ne s'excluent pas.

Si aucune dépréciation, la section n'apparaît pas.
