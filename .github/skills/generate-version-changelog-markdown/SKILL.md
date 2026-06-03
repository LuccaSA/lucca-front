---
name: generate-version-changelog-markdown
description: 'Génère un markdown pour une version spécifique à destination du changelog GitHub.'
---

# Skill : generate-version-changelog-markdown

Génère le corps markdown d'une GitHub Release pour lucca-front, à partir d'une liste de PRs associée à une version spécifique (mergées ou non). Le markdown suit une structure précise avec des sections dédiées aux actions de mise à jour, aux nouvelles fonctionnalités, aux corrections, etc. Chaque entrée est formatée de manière concise avec un lien vers la PR correspondante.

---

## Format général d'une entrée

```
- [NomComposant] Description courte [#XXXX](https://github.com/LuccaSA/lucca-front/pull/XXXX)
```

- Le préfixe `[NomComposant]` est **optionnel** : l'omettre pour les changements transverses (ex. : dépendances, schematics globaux).
- Le nom du composant est en **PascalCase sans espaces** : `[MultiSelect]`, `[RichText]`, `[IndexTable]`, `[DateRange]`.
- Plusieurs PRs sur une même ligne sont séparées par un espace : `[#4815](https://github.com/LuccaSA/lucca-front/pull/4815) [#4821](https://github.com/LuccaSA/lucca-front/pull/4821)`.
- Le symbole de puce est `-`.

---

## Sections et ordre

### Versions patch (x.y.**Z**)

Ne contiennent que les sections pertinentes (omettre celles qui sont vides) :

```
### 🎉 Features
### 🩹 Fixes
### 🎨 UI update
### 📖 Documentation
### 🔨 Technical
```

### Versions mineures (x.**Y**.0)

Toujours inclure dans cet ordre (y compris si vide, avec la mention `None`) :

```
### ✅ Actions required to update
### 🧹 Actions suggested
### 🤖 Schematics
### 🎉 Features
### 🎨 UI update
### 🩹 Fixes
### 📖 Documentation
### 🔨 Technical
```

---

## Source des PRs

La liste des PRs à inclure est déterminée par le **milestone GitHub** correspondant à la version (ex. : `21.2.3`), accessible via :

```
https://github.com/LuccaSA/lucca-front/milestone/<id>
https://github.com/LuccaSA/lucca-front/milestone/<id>?closed=1
```

**Règles d'inclusion :**
- ✅ Inclure les PRs **mergées** dans le milestone.
- ✅ Inclure les PRs **ouvertes** (non encore mergées) dans le milestone.
- ❌ Exclure les PRs **fermées sans merge** (closed, not merged).

> Pour trouver les PRs ouvertes, consulter directement le milestone sur GitHub ou utiliser `git log <tag-precedent>..origin/master` complété par les PRs du milestone non encore mergées.

---

## Format de sortie

Toujours encadrer le résultat dans un bloc de code markdown :

````
```markdown
### 🎉 Features
...
```
````

---

## Règles de rédaction

- **Description** : phrase courte, commencer par un verbe à l'infinitif ou un nom (`Add`, `Fix`, `New component`, `Improve`…).
- **Majuscule** uniquement sur le premier mot de la description (après le préfixe de composant).
- Ne pas mettre de point final.
- Les noms de propriétés (`input`, `output`, attribut, option, variable) doivent être écrits au format code inline : `` `propertyName` ``.
- Pour `✅ Actions required to update` et `🧹 Actions suggested` : écrire `None` si aucune action n'est requise.
- Pour `🤖 Schematics` : format `- Description \`ng g @lucca-front/ng:commande\` [#XXXX](url)`.

## Ordre des PRs dans une section

Les PRs doivent être triées **par importance métier**, pas par numéro.

- `🎉 Features` : mettre en premier les **nouveaux composants** (`New component`), puis les nouvelles capacités majeures, puis les améliorations mineures.
- `🩹 Fixes` : mettre en premier les corrections avec impact utilisateur fort (bug bloquant, régression, accessibilité), puis les corrections secondaires.
- `🎨 UI update` : mettre en premier les changements visuels structurants, puis les ajustements cosmétiques.
- `📖 Documentation` : mettre en premier la doc des nouveaux composants/features, puis les compléments et clarifications.
- `🔨 Technical` : mettre en premier les changements de build/CI/release ayant un impact global, puis le refactoring et la maintenance.

### Détection des nouveaux composants

Ne pas se baser uniquement sur le titre de PR. Une PR doit être considérée comme **nouveau composant** si au moins un signal fort est présent :

- Le titre ou la description mentionne explicitement `new component`, `nouveau composant`, `add component`.
- Le scope ou le préfixe de PR correspond à un composant inédit dans la version (ex. `[Impersonation]`, `[Highlight]`) et le contenu montre une création initiale.
- La PR ajoute la structure complète d'un composant (stories, styles, API, docs, exports).
- Les changelogs/fichiers de doc associés décrivent une première disponibilité du composant.

En cas de doute, privilégier l'interprétation **nouveau composant** si les artefacts de la PR montrent une création initiale.

### Priorité stricte dans `🎉 Features`

Dans `🎉 Features`, appliquer ce tri dans cet ordre :

1. Nouveaux composants
2. Nouvelles capacités majeures sur composants existants
3. Améliorations mineures

Si plusieurs nouveaux composants existent, les placer en tête puis les ordonner de manière stable (par exemple numéro de PR croissant).

Si deux PRs ont une importance similaire, conserver un ordre stable (par exemple le numéro de PR croissant).

### Sections `✅ Actions required to update` et `🧹 Actions suggested`

Lister les actions de migration nécessaires ou suggérées pour les utilisateurs qui mettent à jour. Si aucune, écrire simplement :

```
None
```

---

## Exemple — version patch

```markdown
### 🎉 Features

- [CalloutPopover] Add `disabledPopover` input [#4821](https://github.com/LuccaSA/lucca-front/pull/4821)
- [Icons] New `MoneyIban` and `SignTag` icons [#4815](https://github.com/LuccaSA/lucca-front/pull/4815)

### 🩹 Fixes

- [Callout] Prevent margins to be visible when `removed` attribute is true [#4813](https://github.com/LuccaSA/lucca-front/pull/4813)
- [FileEntry] Improve `fileSize` management [#4812](https://github.com/LuccaSA/lucca-front/pull/4812)

### 📖 Documentation

- [Skeleton] Add detail to `colsAlign` description [#4814](https://github.com/LuccaSA/lucca-front/pull/4814)

### 🔨 Technical

- Add Renovate config [#4824](https://github.com/LuccaSA/lucca-front/pull/4824)
```

## Exemple — version mineure

```markdown
### ✅ Actions required to update

None

### 🧹 Actions suggested

- Replace HTML Error page by Angular component
- Replace HTML Form label by Angular component

### 🤖 Schematics

- Loading HTML → Angular `ng g @lucca-front/ng:lu-loading` [#4415](https://github.com/LuccaSA/lucca-front/pull/4415)

### 🎉 Features

- [ColorPicker] New component [#4333](https://github.com/LuccaSA/lucca-front/pull/4333)
- [Dialog] Add resize method [#3968](https://github.com/LuccaSA/lucca-front/pull/3968)

### 🎨 UI update

- [Colors] Update pineapple palette [#4358](https://github.com/LuccaSA/lucca-front/pull/4358)

### 🩹 Fixes

- [Duration] Fix hour skip when looping under `min` value [#4411](https://github.com/LuccaSA/lucca-front/pull/4411)

### 📖 Documentation

- Update `contributing` file [#4424](https://github.com/LuccaSA/lucca-front/pull/4424)

### 🔨 Technical

- Add extended diagnostics to tsconfig Angular compiler [#4426](https://github.com/LuccaSA/lucca-front/pull/4426)
```
