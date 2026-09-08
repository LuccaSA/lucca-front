---
name: generate-version-changelog-markdown
description: 'Génère un markdown pour une version spécifique à destination du changelog GitHub.'
---

# Skill : generate-version-changelog-markdown

Génère le corps markdown d'une GitHub Release pour lucca-front à partir des PRs d'un milestone.

Références, à lire quand le cas se présente :

- [`references/classification.md`](references/classification.md) — dans quelle section va une PR, dans quel ordre, et comment remplir les sections d'actions.
- [`references/naming.md`](references/naming.md) — comment nommer le préfixe `[Composant]` d'une entrée.
- [`references/breaking.md`](references/breaking.md) — repérer les PRs breaking, label compris ou non.
- [`references/writing.md`](references/writing.md) — comment rédiger la description d'une entrée.
- [`references/examples.md`](references/examples.md) — exemples complets d'une version patch et d'une version mineure.

---

## 1. Récupérer les PRs

La liste est déterminée par le **milestone GitHub** correspondant à la version (ex. : `22.0`, `21.2.3`).

Trouver le numéro du milestone à partir de son titre :

```bash
gh api repos/LuccaSA/lucca-front/milestones --paginate \
  -q '.[] | "\(.number)\t\(.title)\t\(.state)"'
```

Lister ses PRs avec état, statut de merge et labels :

```bash
gh api graphql -f query='
query {
  repository(owner: "LuccaSA", name: "lucca-front") {
    milestone(number: <MILESTONE_NUMBER>) {
      pullRequests(first: 100) {
        totalCount
        pageInfo { hasNextPage endCursor }
        nodes { number title state merged labels(first: 20) { nodes { name } } }
      }
    }
  }
}' | jq -r '.data.repository.milestone.pullRequests.nodes[]
  | "\(.number)\t\(.state)\t\(.merged)\t\(.title)\t\([.labels.nodes[].name] | join(","))"' | sort -n
```

Si `hasNextPage` vaut `true`, relancer avec `after: "<endCursor>"` et concaténer.

> Le milestone contient aussi des **issues** : le compteur `open/closed` de GitHub est supérieur au nombre de PRs. Se fier au `totalCount`.

## 2. Filtrer

- ✅ PRs **mergées** du milestone.
- ✅ PRs **ouvertes** du milestone : elles sont censées entrer dans la version.
- ❌ PRs **fermées sans merge** (`state: CLOSED` et `merged: false`).
- ❌ PRs labellisées `:see_no_evil: No log`.
- ❌ **PRs de synchronisation de branches** : merges `master` → `release/x.y`, bumps entre branches, PRs de release. Titres du type `Bump master into release/22.0`, `master to release/22.0`, `tech(bump): 21.4 into release.22`, `Release/22.0`.

Vérifier le compte : `PRs du milestone − fermées non mergées − sync − No log` doit égaler le nombre d'entrées produites.

## 3. Lire ce qui ne se déduit pas du titre

Un titre de PR ne suffit presque jamais. Ouvrir la PR dès que la description, le classement ou le préfixe sont incertains, et **systématiquement** pour les PRs labellisées `Breaking change` :

```bash
gh pr view <NUM> -R LuccaSA/lucca-front --json title,body,files
```

Pour une version mineure, passer aussi le diff global au crible des signaux breaking : [`references/breaking.md`](references/breaking.md).

## 4. Classer, nommer, rédiger

Voir [`references/classification.md`](references/classification.md), [`references/naming.md`](references/naming.md) et [`references/writing.md`](references/writing.md).

Format d'une entrée :

```
- [NomComposant] Description courte [#XXXX](https://github.com/LuccaSA/lucca-front/pull/XXXX)
```

- Puce `-`, préfixe en PascalCase sans espaces, description sans point final.
- **PR breaking** (label `:boom: Breaking change`) : préfixer l'entrée de 💥, avant le nom du composant — `- 💥 [Composant] Description`. Le marqueur n'est pas repris dans `✅ Actions required to update`, dont toutes les entrées sont breaking par nature.
- Majuscule sur le premier mot de la description seulement.
- Noms de propriétés, d'inputs, d'options et de variables en code inline : `` `propertyName` ``.
- Plusieurs PRs sur une même ligne : liens séparés par un espace.
- Le préfixe est omis pour les changements transverses.

## 5. Assembler les sections

**Une section vide n'est jamais affichée** : pas de mention `None`, pas de titre orphelin.

**Version patch (x.y.Z)** — dans cet ordre :

```
### 🎉 Features
### 🩹 Fixes
### 🎨 UI update
### 📖 Documentation
### 🔨 Technical
### 💀 Deprecated
```

**Version mineure (x.Y.0)** — mêmes règles, avec quatre sections supplémentaires, dans cet ordre :

```
### ✅ Actions required to update
### 🧹 Actions suggested
### 🤖 Schematics
### 🎉 Features
### 🎨 UI update
### 🩹 Fixes
### 📖 Documentation
### 🔨 Technical
### 💀 Deprecated
```

## 6. Produire la sortie

Encadrer le résultat dans un bloc de code markdown :

````
```markdown
### 🎉 Features
...
```
````

Puis, sur une ligne séparée, le nombre de PRs incluses :

> 42 PRs incluses dans ce changelog.

Puis, en une phrase, ce qui a été écarté (fermées sans merge, sync, `No log`) et la liste des PRs **encore ouvertes** incluses, qui peuvent basculer avant la publication.
