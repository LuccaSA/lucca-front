---
name: update-components-changelog
description: 'Met à jour les fichiers CHANGELOG.md associés à chaque composant Lucca Front.'
---

Chaque composant Lucca Front possède son propre fichier `CHANGELOG.md`. Ces fichiers documentent uniquement les changements visibles pour les utilisateurs du composant (API publique, comportement, styles).

## Relation entre `packages/ng/`, `packages/prisme/` et packages annexes

Les composants Angular sont migrés petit à petit de `packages/ng/<composant>/` vers `packages/prisme/<composant>/` à partir de la v21. Le CHANGELOG d'un composant `prisme` doit donc couvrir **les deux chemins** pour ne pas manquer l'historique antérieur à la migration. Le chemin SCSS (`packages/scss/src/components/<composant>/`) existe depuis le début et est commun aux deux ères.

Certains composants s'appuient sur un **package annexe** qui contient une partie de leur API publique. Ces packages doivent être inclus dans les commandes git :

| Composant | Package annexe | Contenu concerné |
|---|---|---|
| `icon` | `packages/icons/` | Type `LuccaIcon` (liste des noms d'icônes disponibles) |

## Workflow

### 1. Identifier la plage de versions à documenter

La dernière version documentée se lit en tête du CHANGELOG (premier `### X.Y.Z`). Les versions publiées se trouvent dans les tags git :

```bash
git tag --sort=-version:refname | head -20
```

Consulter aussi le changelog GitHub : https://github.com/LuccaSA/lucca-front/releases

### 2. Lister les commits concernés

Toujours inclure les chemins : `prisme`, `ng` (historique pré-migration), `scss`, et les **packages annexes** le cas échéant (voir tableau ci-dessus) :

```bash
git log --oneline <dernière-version-documentée>..HEAD -- packages/prisme/<composant>/ packages/ng/<composant>/ packages/scss/src/components/<composant>/ [packages/annexe/]
```

Pour chaque version intermédiaire publiée, affiner avec une plage précise afin d'assigner chaque commit à la bonne version :

```bash
git log --oneline vX.Y.Z-prev..vX.Y.Z -- packages/prisme/<composant>/ packages/ng/<composant>/ packages/scss/src/components/<composant>/ [packages/annexe/]
```

Trouver la première version stable contenant un commit donné — **obligatoire pour chaque commit avant de rédiger une entrée** :

```bash
git tag --sort=version:refname --contains <hash> | grep -v 'rc\|alpha\|beta\|experimental' | head -1
```

> Ne jamais déduire la version depuis les bornes du range (`vX.Y.Z-prev..vX.Y.Z`) : un commit dans ce range peut avoir été publié dans n'importe quel patch intermédiaire.

Inspecter le contenu d'un commit pour comprendre ce qu'il change :

```bash
git show <hash> -- packages/prisme/<composant>/ packages/ng/<composant>/ packages/scss/src/components/<composant>/ [packages/annexe/]
```

Ignorer les commits de type : merge, fix conflicts, stories, linter, tests, build.

### 4. Classer les changements

Pour chaque commit ou diff relevé, le classer dans la bonne section :

| Section | Contenu |
|---|---|
| `Added` | Nouveau input, output, variante CSS, comportement ou option |
| `Changed` | Modification du comportement ou de l'API existants |
| `Deprecated` | Fonctionnalité toujours présente mais vouée à être supprimée |
| `Removed` | Suppression d'une fonctionnalité ou classe précédemment dépréciée |
| `Fixed` | Correction de bug |

N'inclure que les sections qui ont du contenu.

### 5. Rédiger les entrées

- Écrire en anglais.
- Commencer par le nom de la fonctionnalité concernée en backticks (ex. `` `critical` input ``), suivi d'une description courte et claire.
- Ne pas mettre le nom du composant en préfixe — le fichier est déjà spécifique à ce composant.
- Pour les dépréciations, indiquer l'alternative : `use X instead`.

## Format attendu

Les versions sont listées dans l'ordre décroissant (la plus récente en premier). Chaque version utilise un titre de niveau 3 (`###`). Les sections utilisent un titre de niveau 4 (`####`).

```markdown
### 20.4.0

#### Added

- `disclosure` input to display a chevron indicating a menu is attached.

#### Fixed

- `state="error"` animation no longer triggers on initial render.

### 20.3.0

#### Added

- `AI` button style (`luButton="AI"`) for AI-related actions, including the `AI-invert` variant for dark backgrounds.
- Support for a dedicated `mod-AI` icon-only variant.

#### Deprecated

- `delete` input — use `critical` instead.
```

## Règles

- Les changements pas encore publiés ne doivent pas être documentés.
- Ne pas remonter avant la version `18.0.0`.
- Les versions rc, beta, alpha ou experimental ne doivent pas être documentées.
- Toujours inclure `packages/ng/<composant>/` dans les commandes git pour couvrir l'historique pré-migration. Le composant avait la même API Angular dans `ng/` et `prisme/` — les changements dans `ng/` sont pertinents pour le CHANGELOG.
- Ne pas documenter les refactorings internes, changements de nommage SCSS privés, ou ajouts de tests.
- Ne pas créer de section vide.
