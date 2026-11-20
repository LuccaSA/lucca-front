# Rédaction des entrées

## Réécriture des titres de PR

Le titre de PR n'est **jamais** repris tel quel : il est réécrit en `[Composant] Description`.

- Titre en commit conventionnel → le scope devient le composant, le reste la description : `fix(simple-select): let the panel grow` → `[SimpleSelect] Let the panel grow`. Supprimer le type (`feat`, `fix`, `tech`…), il est déjà porté par la section.
- Titre déjà préfixé `[composant]` → normaliser en PascalCase d'après le sélecteur (voir [`naming.md`](naming.md)).
- Titre cryptique, elliptique ou réduit au seul nom du composant (`core(signal): last module's`, `[approbationInbox]`, `Neutral background`) → **lire le corps et les fichiers de la PR**, puis écrire la description à partir de ce qu'elle fait réellement. Ne jamais recopier un titre que le lecteur du changelog ne pourrait pas comprendre.
- Le titre peut être inexact : c'est le diff qui fait foi, y compris sur la liste des composants touchés.
- Développer les abréviations destinées aux reviewers : `a11y` → `accessibility`, `perf` → `performance`.
- Retirer les mentions de process (`RFC`, `WIP`, `first batch`, dates, numéros de ticket) sauf information utile au consommateur.

## Description

Phrase courte commençant par un verbe à l'infinitif ou un nom (`Add`, `Fix`, `New component`, `Improve`…), sans point final, majuscule sur le premier mot uniquement.

## Nouveau composant

Une entrée `New component` ne se limite jamais à ces deux mots : elle **décrit le rôle du composant en une ligne**, de sorte qu'un lecteur qui ne le connaît pas sache à quoi il sert sans ouvrir la PR.

```
- [NomComposant] New component, <ce qu'il affiche ou permet de faire> [#XXXX](url)
```

La description dit à quoi sert le composant, pas comment il est fait : pas de liste d'inputs, pas de détail d'implémentation.

Où trouver le rôle, par ordre de fiabilité :

1. Le `CHANGELOG.md` du composant ajouté par la PR (`packages/ng/<dossier>/CHANGELOG.md`) : sa section `Added` contient généralement la phrase de présentation.
2. Le JSDoc de la classe et de ses inputs principaux.
3. Les stories de documentation (`stories/documentation/<catégorie>/<composant>/`).
4. La fiche Prisme si la PR y renvoie.

```
- [HighlightSection] New component, a container that highlights a key information or a priority action [#5219](url)
- [ApprobationInbox] New component, a list of items to approve paired with a detail view [#5156](url)
```

## Section `🤖 Schematics`

**Une ligne par commande**, pas par PR : une même commande est souvent enrichie par plusieurs PRs d'une version, listées à la suite sur la même ligne.

La description dit **ce que la commande migre dans le code du consommateur**, en une formule générique et stable d'une version à l'autre. Elle ne décrit ni le mécanisme interne ni ce que chaque PR a ajouté au schematic : un mapping particulier, une regex ou un cas d'entrée traité n'ont pas leur place ici.

```
- Replace the removed color palettes, variables and classes with their new names `ng g @lucca-front/ng:palettes` [#XXXX](url) [#YYYY](url)
```

Source de la formulation, par ordre de fiabilité :

1. La description de la commande dans `packages/ng/schematics/collection.json` : déjà générique et publiée.
2. Le `README` ou le schéma de la commande.
3. À défaut, reformuler à partir de la migration visée, jamais à partir du diff du schematic.

Chaque entrée de `🤖 Schematics` doit avoir sa contrepartie dans `✅ Actions required to update`, et toute migration outillée doit renvoyer vers sa commande.

## Regroupement de PRs sur une ligne

Fusionner les PRs qui décrivent le **même changement du point de vue du consommateur** — une migration menée en plusieurs lots, un correctif décliné — et lister leurs liens à la suite. Ne pas regrouper des PRs qui partagent seulement un composant.
