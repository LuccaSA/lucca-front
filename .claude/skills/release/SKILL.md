---
name: release
description: 'Prépare la sortie d’une version Lucca Front (`/release 22.1`, `/release 22.0.6`) : changelog GitHub, CHANGELOG.md des composants, PR de sync vers les releases en cours pour un patch et, pour une mineure ou une majeure, PR release → master, utilitaire highlight-prisme et propositions de migrations.'
argument-hint: '<version> (ex. 22.1, 23.0, 22.0.6)'
disable-model-invocation: true
---

# Skill : release

Orchestre tout ce qui doit être fait au moment de sortir la version **`$ARGUMENTS`**. Ce skill ne publie rien (pas de tag, pas de GitHub Release, pas de `npm publish`) : il prépare le changelog, ouvre les PR de mise à jour et propose les migrations.

Suivre les étapes avec `TodoWrite` (une tâche par étape applicable), et s'arrêter pour demander confirmation **avant chaque commit, push ou création de PR**.

---

## Étape 0 — Cadrer la version

### Normaliser et classer

Sans argument, demander la version et s'arrêter. Accepter `22.1`, `22.1.0`, `v22.1.0` ; en déduire `X.Y.Z` :

| Type | Forme | Exemple | Milestone GitHub |
|---|---|---|---|
| **Majeure** | `X.0.0` | `23.0` | `23.0` |
| **Mineure** | `X.Y.0`, `Y > 0` | `22.1` | `22.1` |
| **Patch** | `X.Y.Z`, `Z > 0` | `22.0.6` | `22.0.6` |

Vérifier que le milestone existe, sinon s'arrêter et le signaler. La liste est paginée : toujours passer `--paginate`, sinon un milestone au-delà de la première page passe pour absent.

```bash
gh api repos/LuccaSA/lucca-front/milestones --paginate -q '.[] | "\(.number)\t\(.title)\t\(.state)"'
```

### Branche source et version précédente

```bash
git fetch origin --tags --prune
```

- **Mineure / majeure** : branche source `origin/release/X.Y` (sans `v`). Si elle n'existe pas, s'arrêter.
- **Patch** : `origin/master` si `X.Y` est la ligne courante de master, c'est-à-dire celle de son dernier tag stable :

  ```bash
  git describe --tags --abbrev=0 --match 'v*' --exclude '*-*' origin/master   # ex. v22.0.5 → ligne 22.0
  ```

  Sinon, la branche de maintenance `origin/vX.Y-lts` (jamais `release/X.Y`, ces branches sont des snapshots dormants une fois la mineure sortie). Si aucune des deux ne correspond, s'arrêter.

Version précédente (`PREV_TAG`), toujours un tag stable : sans suffixe (`rc`, `alpha`, `beta`, `experimental`…), et strictement inférieur à `vX.Y.Z`. Ne jamais calculer le numéro (`Z-1`, `Y-1`) : un patch peut avoir été sauté, et une mineure précédente n'existe pas toujours (`X.0.0`).

```bash
{ git tag -l 'v*' | awk '!/-/'; echo "vX.Y.Z"; } | sort -uV \
  | awk -v cur="vX.Y.Z" '$0 == cur { print p; exit } { p = $0 }'
```

On insère `vX.Y.Z` (pas encore tagué) dans la liste triée des tags stables, et on lit celui qui le précède. Contrôler ensuite qu'il est cohérent avec le type :

- **Patch** : un tag `vX.Y.*`. Sinon (premier patch sur une ligne sans tag), s'arrêter.
- **Mineure** : un tag de la même majeure (`vX.*`).
- **Majeure** : un tag de la majeure précédente.

Vérifier enfin que la branche source contient `PREV_TAG` : `git merge-base --is-ancestor <PREV_TAG> origin/<branche source>`. Si non, la branche est périmée : s'arrêter.

Annoncer en une ligne : type, branche source, `PREV_TAG`, étapes qui vont s'exécuter.

---

## Étape 1 — Changelog GitHub (tous types)

Lancer le skill `generate-version-changelog-markdown` (outil `Skill`) avec la version du milestone (`22.1`, `22.0.6`…).

Il produit un bloc markdown à copier-coller : le reprendre tel quel dans le rapport final. Le garder aussi sous la main, les étapes 3 et 5 s'en servent (sections `✅ Actions required to update`, `💥`, `💀 Deprecated`, `🤖 Schematics`).

---

## Étape 2 — CHANGELOG.md des composants (tous types)

### Branche

Partir de la branche source de l'étape 0 :

```bash
git switch -c docs/components-changelog-X.Y.Z origin/<branche source>
```

(`docs/components-changelog-22.1.0`, `docs/components-changelog-22.0.6`.) Si le working tree n'est pas propre, s'arrêter et le signaler au lieu de stasher.

### Composants à traiter

Lister les composants dont le code publié a changé depuis `PREV_TAG` :

```bash
git diff --name-only <PREV_TAG>..origin/<branche source> -- packages/ng packages/prisme packages/scss/src/components packages/icons \
  | grep -vE '\.spec\.ts$|/stories/|/schematics/|CHANGELOG\.md$' \
  | sed -E 's#^packages/(ng|prisme)/([^/]+)/.*#\2#; s#^packages/scss/src/components/([^/]+)/.*#\1#; s#^packages/icons/.*#icon#' \
  | grep -v '^packages/' | sort -u
```

Rapprocher les noms SCSS (camelCase) des entrypoints Angular (kebab-case) et ne garder que ceux qui ont un `CHANGELOG.md` (`find packages -name CHANGELOG.md -not -path '*/node_modules/*'`). Un composant sans CHANGELOG.md est listé dans le rapport, pas créé.

Si la liste est vide (release purement technique ou documentaire), le dire, supprimer la branche locale (`git switch - && git branch -d docs/components-changelog-X.Y.Z`) et passer à l'étape suivante sans PR.

### Mise à jour

Appliquer le skill `update-components-changelog` à chacun de ces composants, avec **une seule adaptation** : la version `X.Y.Z` n'est pas encore taguée, mais c'est elle qu'on documente. Les commits de `<PREV_TAG>..origin/<branche source>` vont sous `### X.Y.Z`, au lieu d'être écartés comme « non publiés ». Les versions déjà publiées et non documentées suivent la règle normale du skill.

Recouper avec le changelog de l'étape 1 : une entrée de composant sans PR correspondante dans le milestone (ou l'inverse) est signalée, pas tranchée en silence.

### PR

Montrer le `git diff --stat` et demander confirmation :

- **Refus** : ne rien commiter, laisser les modifications sur la branche locale et le noter dans le rapport.
- **Accord partiel** (« pousse », sans parler de PR) : ne faire que ce qui a été validé, et proposer le reste dans le rapport.
- **Les modifications ont déjà été commitées par l'utilisateur** (`git status` propre, commit en avance sur la base) : ne pas recommiter, reprendre directement au push.

Pour chaque étape validée :

```bash
git add -- ':(glob)packages/**/CHANGELOG.md'
git commit -m "docs(changelog): update components changelog for X.Y.Z"
git push -u origin docs/components-changelog-X.Y.Z
gh pr create --base <release/X.Y | master | vX.Y-lts> --template feature.md \
  --title "docs(changelog): update components changelog for X.Y.Z" \
  --label ":book: Documentation changes" --label "🤖 Produced by AI"
```

Remplir le template sans retirer les séparateurs `-----` : une phrase dans le premier bloc, la liste des composants touchés dans le second. Ajouter le milestone de la version (`--milestone X.Y` / `X.Y.Z`).

**Pour une mineure ou une majeure, passer à l'étape 3.** Un patch continue à l'étape 2 bis.

---

## Étape 2 bis — PR de sync vers les releases en cours (patch depuis master)

Un fix publié depuis `master` doit redescendre dans chaque branche `release/A.B` d'une version supérieure à `X.Y`, sinon il manque à la prochaine mineure. Un patch publié depuis `vX.Y-lts` n'est pas concerné : il rétroporte un fix déjà sur `master`. Le dire et aller au rapport final.

### Branches cibles

```bash
git branch -r --list 'origin/release/*' | sed 's#^ *origin/release/##' \
  | awk -F. -v x=X -v y=Y '$1 > x || ($1 == x && $2 > y)' | sort -V
```

Écarter une branche dont la version est déjà sortie (`git tag -l 'vA.B.0'` non vide) : c'est un snapshot dormant. Écarter aussi une branche qui contient déjà `master` (`git merge-base --is-ancestor origin/master origin/release/A.B` réussit) : le merge serait vide et `gh pr create` échouerait faute de commit. Si aucune branche ne reste, le dire et aller au rapport final.

### Une PR par branche cible

Pour chaque `release/A.B`, chercher d'abord une sync déjà ouverte :

```bash
gh pr list -R LuccaSA/lucca-front --base release/A.B --state open --limit 500 --json number,url,headRefName \
  -q '.[] | select(.headRefName | startswith("chore/sync")) | "\(.number)\t\(.headRefName)\t\(.url)"'
```

`--limit` est nécessaire : par défaut `gh pr list` ne renvoie que 30 PR, et le filtre s'applique après cette limite.

- **Elle existe** : y merger `origin/master` (sur sa branche) au lieu d'en ouvrir une autre, après confirmation.
- **Elle n'existe pas** : après confirmation, la créer.

```bash
git switch -c chore/sync-X.Y.Z-to-A.B origin/release/A.B
git merge --no-ff origin/master -m "chore(sync): X.Y.Z to A.B"
git push -u origin chore/sync-X.Y.Z-to-A.B
gh pr create --base release/A.B --title "chore(sync): X.Y.Z to A.B" --template feature.md \
  --label ":hammer: Technical" --label "🤖 Produced by AI"
```

Corps : le template `feature.md` avec `Sync X.Y.Z to A.B` dans le premier bloc, séparateurs `-----` conservés.

En cas de conflit, s'arrêter et montrer les fichiers en conflit : ne pas les résoudre sans validation.

Si la PR de l'étape 2 n'est pas encore mergée, la sync ne contient pas le changelog des composants. Le signaler et proposer d'attendre son merge, ou de pousser maintenant puis de la compléter plus tard. Dans les deux cas, lancer `git fetch origin` après le merge de cette PR, avant de merger `origin/master` dans la branche de sync : sinon la référence locale est périmée et le changelog manque toujours.

Rappeler dans le rapport que ces PR se mergent en **merge commit, jamais en squash**.

**Pour un patch, le skill s'arrête ici** → aller au rapport final.

---

## Étape 3 — PR release/X.Y → master (mineure / majeure)

```bash
gh pr list -R LuccaSA/lucca-front --head release/X.Y --base master --state open --json number,url,isDraft
```

- **Elle existe** : donner son lien, ne rien modifier.
- **Elle n'existe pas** : après confirmation, la créer en draft, sur le modèle de #5459 :

```bash
gh pr create --draft --head release/X.Y --base master \
  --title "chore(release): X.Y" --milestone X.Y --body-file <fichier>
```

Corps : le template `feature.md`, avec le changelog de l'étape 1 dans le premier bloc (description fonctionnelle) et les séparateurs `-----` conservés. Labels : un par section présente dans le changelog — `:boom: Breaking change` (✅ Actions required ou 💥), `:bookmark::sparkles: Feature`, `:bookmark::bug: FIX`, `:hammer: Technical`, `:book: Documentation changes`, `:skull: Deprecate`.

Rappeler dans le rapport que cette PR se merge en **merge commit, jamais en squash**.

---

## Étape 4 — Utilitaire highlight-prisme (mineure / majeure)

Fichier : `packages/scss/src/commons/utils/highlight-prisme.scss`. Il liste chaque composant en quatre blocs (`HTML COMPONENTS OUTSIDE` / `INSIDE`, `ANGULAR COMPONENTS OUTSIDE` / `INSIDE`), rangés par catégorie (`// Actions`, `// Forms`, `// Structure`…), plus un bloc `DEPRECATED COMPONENTS` en rouge.

### Détecter les écarts depuis `PREV_TAG`

```bash
# Nouveaux composants SCSS
git log --oneline --diff-filter=A <PREV_TAG>..origin/release/X.Y -- 'packages/scss/src/components/*/index.scss'
# Composants SCSS supprimés
git log --oneline --diff-filter=D <PREV_TAG>..origin/release/X.Y -- 'packages/scss/src/components/*/index.scss'
# Nouveaux sélecteurs Angular publics (hors tests et stories)
git diff <PREV_TAG>..origin/release/X.Y -- packages/ng packages/prisme ':!**/*.spec.ts' ':!**/stories/**' ':!**/schematics/**' \
  | grep -E '^\+\s*selector:'
# Nouvelles dépréciations
git diff <PREV_TAG>..origin/release/X.Y -- packages/stylelint-config/LFDeprecatedSelectors.mjs
```

Croiser avec les entrées `New component` et `💀 Deprecated` du changelog de l'étape 1, puis vérifier chaque candidat contre le fichier : il est peut-être déjà présent.

### Appliquer

- **Nouveau composant** : sa classe racine dans le bloc HTML, son sélecteur `lu-*` (ou `[luX]`) dans le bloc Angular, sous la catégorie de sa doc Storybook (`stories/documentation/<catégorie>/`). `OUTSIDE` par défaut ; `INSIDE` (outline négatif) pour un composant qui occupe toute la largeur de son conteneur (dialog, footer, navigation, ligne de tableau). Si le host Angular n'a pas de rendu propre, cibler la classe interne (`lu-tag .tag`).
- **Composant déprécié** : le retirer de ses blocs et l'ajouter à `DEPRECATED COMPONENTS`.
- **Composant supprimé** : le retirer partout, `DEPRECATED COMPONENTS` compris.

Lancer `npx stylelint packages/scss/src/commons/utils/highlight-prisme.scss`. S'il n'y a rien à changer, le dire et passer à l'étape 5.

### PR

Même déroulé que l'étape 2, sur une branche dédiée partant de `origin/release/X.Y` :

- branche `chore/highlight-prisme-X.Y`
- titre `chore(scss): update the highlight-prisme utility for X.Y`
- base `release/X.Y`, milestone `X.Y`, labels `:hammer: Technical` et `🤖 Produced by AI`.

---

## Étape 5 — Proposer les migrations (mineure / majeure)

Analyse et proposition seulement : **ne rien implémenter sans accord explicite.**

### Recenser

1. Les entrées `✅ Actions required to update`, `💥` et `💀 Deprecated` du changelog de l'étape 1. Ouvrir chaque PR concernée (`gh pr view <N> --json body,files`) pour connaître l'avant/après exact.
2. Ce qui existe déjà : `packages/ng/schematics/collection.json`, la section `🤖 Schematics` du changelog, et pour une majeure le skill `lucca-front-migrate-<X-1 → X>` s'il a été amorcé (`.claude/skills/lucca-front-migrate-*`).

### Classer chaque changement

| Proposition | Quand |
|---|---|
| **Schematic** | Transformation mécanique et sans ambiguïté : renommage de classe, de variable CSS, de token, d'input ou de sélecteur, suppression d'un import, remplacement de valeur. Tout ce qu'un `replace` ou un parcours d'AST couvre sans connaître l'intention. S'inspirer des schematics existants (`palettes`, `tokens-*`, `deprecated-resolver`). |
| **Section du skill de migration** | Changement contextuel : restructuration de template, choix entre plusieurs alternatives, nullabilité à gérer, comportement modifié, résiduel d'un schematic. Pour une majeure, c'est une référence de `lucca-front-migrate-X` (modèle : `lucca-front-migrate-22`, un fichier `references/<Sujet>.md` par refacto). |
| **Rien** | La ligne du changelog suffit (ex. montée de peer dependency), ou le changement est déjà couvert. |

Une dépréciation d'une mineure n'appelle pas forcément de migration immédiate : proposer le schematic seulement s'il est simple, sinon noter qu'il faudra le prévoir avant la majeure qui supprimera l'API.

### Présenter

Un tableau, une ligne par changement : composant, changement, PR, proposition (schematic / skill / rien), justification en une phrase, effort estimé (S/M/L). Finir par une recommandation : quoi faire en priorité, puis demander lesquels implémenter.

---

## Rapport final

Court, dans cet ordre :

1. Le changelog GitHub en bloc markdown à copier-coller (étape 1), avec le compte de PRs et les PRs encore ouvertes.
2. Les liens des PR ouvertes ou existantes : changelog des composants, sync vers les releases en cours, release → master, highlight-prisme.
3. Les écarts relevés : composants sans CHANGELOG.md, divergences changelog GitHub / CHANGELOG des composants, étapes sautées et pourquoi.
4. Mineure / majeure : le tableau des migrations proposées, en attente de décision.
5. Mineure / majeure : déclarer la mineure de la documentation LLM dans la PR release → master, **avant** le tag `vX.Y.0` : `npm run skills:update -- --minor X.Y`, puis committer `.github/skills/_lucca-front/llms` et `.github/skills/_lucca-front/versions.json`. Sans ça, le package `.0` livre une documentation nommée d'après la mineure précédente (cf. `scripts/generate-skills/README.md`, « Une documentation qui suit le code »).
