# generate-skills

Pipeline **déterministe** (zéro IA) qui génère la documentation des composants Lucca Front pour les **Agent Skills**.

Le pipeline produit **une seule documentation**, `.github/skills/_lucca-front/llms/` : un `SKILL.md` (le guide d'entrée) et ses fichiers `references/`. Sur une branche qui suit le code (`master`), elle décrit le code du commit qui la porte (cf. [Une documentation qui suit le code](#une-documentation-qui-suit-le-code)). En mode par tag (`--version`, pour une `vX.Y-lts`), `references/` documente le **dernier patch publié** de la mineure, et un dossier `fixes/` porte un `.md` par patch publié (delta vs le patch précédent : API, types partagés, codemods, sources de stories).

Le chemin ne porte **aucune version** : `scripts/llms-skill` copie cette documentation dans le package `@lucca-front/ng` (`llms.txt` + `llms/`), qui la livre donc à la version installée. Les projets n'installent avec [APM](https://microsoft.github.io/apm/) que `.github/skills/lucca-front/`, une skill **écrite à la main** qui renvoie vers `node_modules/@lucca-front/ng/llms.txt` (cf. [Consommation](#consommation)).

## Prérequis

- Node.js ≥ 18 avec `ts-node` (inclus dans les dépendances du projet ; le repo est calé sur Node 24 via Volta)
- Accès aux git tags du repo (les API, stories, migrations sont extraites depuis le code source via `git show`)

ZeroHeight et Storybook ne demandent **aucun token** : les URL publiques suffisent (le token de partage ZeroHeight est codé en dur dans `version-config.ts`).

## Configuration

Aucune configuration n'est requise. Un fichier local facultatif (gitignored) règle la concurrence et le dossier de sortie :

```bash
cp scripts/generate-skills/generate-skills-config.json.example scripts/generate-skills/generate-skills-config.json
```

La variable d'environnement `SKILLS_DIR` redirige tout le run vers un autre dossier, pour une génération de contrôle qui n'écrase pas la skill committée.

## Utilisation

```bash
# Générer un composant pour une mineure
npx ts-node --project scripts/generate-skills/tsconfig.json \
  scripts/generate-skills/index.ts --version 22.1 --component button

# Générer tous les composants pour une mineure
npx ts-node ... --version 22.1

# Sans ZeroHeight (Storybook, lui, est obligatoire — cf. pré-flight)
npx ts-node ... --version 22.1 --skip-zeroheight

# Valider la couverture ZH (aucune génération)
npx ts-node ... --validate
```

### Options

| Flag | Description |
|------|-------------|
| `--version <M.m>` | **Mineure** à générer (ex: `22.1`) — `references/` reflète son dernier patch publié, `fixes/` porte les deltas par patch. Une version patch complète est refusée, comme une mineure que la branche ne peut pas porter (cf. [Phase 0](#phase-0--la-mineure-de-la-branche-preflightts-non-interactif)). **Requis, une seule fois** (sauf avec `--validate` et `--retry-failed`). |
| `--component <slug>` | Générer uniquement ce composant (n'écrit pas le SKILL.md ni la doc transverse). Refusé quand la skill change de mineure : le composant serait seul dans la nouvelle. |
| `--skip-zeroheight` | Ignorer la collecte ZeroHeight |
| `--skip-documentation` | Ignorer la doc transverse (tokens, contenu, guidelines, patterns, deprecated) |
| `--skip-tools` | Ignorer les outils (SCSS + Angular tools) |
| `--skip-schematics` | Ignorer les codemods de migration (`collection.json` git) |
| `--documentation-only` | Ne collecter que doc/outils/schematics (pas les composants) |
| `--dry-run` | N'écrire aucun fichier |
| `--validate` | Vérifier la couverture ZH de `component-map.json` (aucune génération) |
| `--retry-failed` | Rejouer uniquement les unités (composants, pages doc/outils, deprecated) dont le fetch a échoué au run précédent (manifeste `_fetch-failures.json`) |
| `--accept-shrink` | Entériner les régressions de contenu vs les baselines (suppression légitime côté ZH) |
| `--accept-output-violations` | Ne pas faire échouer le run sur les violations du garde-fou de sortie. Cf. garde-fou de sortie. |
| `--offline` | Aucun accès réseau : ZeroHeight est lu dans les baselines committées, l'index Storybook dans `--storybook-index`, et le pré-flight est sauté. Cf. [Mode hors ligne](#mode-hors-ligne). Incompatible avec `--retry-failed` et `--accept-shrink`. |
| `--storybook-index <fichier>` | `index.json` Storybook lu à la place de celui du Storybook déployé. **Requis** avec `--offline` sans `--ref`. Les liens de la skill pointent toujours vers le Storybook versionné. |
| `--ref <ref git>` | Lit le code et les stories depuis ce ref (`HEAD`, ou l'arbre de `git write-tree`) au lieu du tag de la mineure, et construit l'index Storybook en local. La skill suit alors le code : cf. [Une skill qui suit le code](#une-skill-qui-suit-le-code). `--version` devient inutile. |

Variable d'environnement complémentaire : **`FETCH_TIMEOUT_MS`** — deadline des fetchs, 10 000 ms par défaut. Le bon réglage dépend de ce que le run fait bloquer la boucle d'événements : une génération complète le veut **bas** (une page est différée puis rejouée, plutôt que d'immobiliser un worker), une passe `--retry-failed` le veut **haut** (quelques dizaines d'unités seulement, et son but est de les obtenir, pas de les différer à nouveau). Cf. `collectors/http.ts`.
| `--zh-latest <minor>` | Affirme que `<minor>` (ex. `21.3`) est la dernière version en ligne → autorisée en « latest » non pinné. Répétable. Cf. garde-fou ZeroHeight. |
| `--zh-id <minor>=<id>` | Fournit l'ID de release ZeroHeight d'une mineure (ex. `21.3=61234`), validé puis persisté dans `zh-release-ids.json`. Répétable. |

## Parcours pré-flight

Avant la moindre collecte, le run passe une porte puis deux phases. **Aucune question n'est posée tant qu'un contrôle non interactif peut encore tout arrêter** — sinon on répond à des prompts pour une génération qui n'aura pas lieu.

### Phase 0 — la mineure de la branche (`preflight.ts`, non interactif)

La skill est un dossier unique réécrit sur place : générer une mineure écrase celle que la branche porte, et le prochain tag coupé depuis cette branche la livre dans son package npm. `refuseMinorForThisBranch` compare la mineure demandée à celle du manifeste committé (`_lucca-front/versions.json`) et refuse le run, sortie 1, quand la branche ne peut pas la porter.

### Phase 1 — la release existe (`preflight.ts`, non interactif)

Pour chaque mineure passée en `--version`. Lecture seule, donc exécutée aussi sous `--dry-run` : apprendre que la release n'est pas prête est précisément ce qu'on attend d'un dry run. Au premier ❌, arrêt **avant toute question**, sortie 1.

| Contrôle | Source | Ce qu'il ferme |
|---|---|---|
| Tag git | `git tag -l` (via `resolveMinorVersion`) | la mineure n'existe pas |
| Clone à jour | `git ls-remote --tags origin` | un clone en retard d'un patch fait passer `v22.1.1` pour le dernier patch : skill figée sur un patch dépassé, **sans le moindre message** |
| Publication npm | `npm view @lucca-front/ng@<patch> version` | tag poussé mais publication ratée → skill d'une version non installable + `fixes/` fantôme |
| Storybook déployé | `GET <storybookBaseUrl>/index.json` | cf. ci-dessous |

Le pré-flight ne fait **pas** le `git fetch --tags` à ta place : un script de génération n'a pas à muter le dépôt.

Un tag local absent de `origin` (release jamais poussée) est signalé sans bloquer : le contenu qu'il pointe existe.

> **Storybook est obligatoire.** Ce n'est pas une source parmi d'autres : la liste des composants est construite à partir de son index (`discoverComponents` part des groupes Storybook et ne rattrape en phase 2 que les entrées de `component-metadata.json` ayant un entrypoint Angular). Sans lui : aucun exemple de code, les composants CSS-only **disparaissent** de la skill, les survivants tombent en `category: 'Unknown'` — et rien ne le signale, le garde-fou de sortie n'inspectant que des exemples existants (zéro exemple = zéro violation, sortie 0, « All done! »). C'est pourquoi `--skip-storybook` a été supprimé et pourquoi un échec de l'index en cours de run est désormais fatal.

### Phase 2 — IDs de release ZeroHeight (`zh-release-guard.ts`)

Inchangée, cf. [Garde-fou pré-flight](#garde-fou-pré-flight-zh-release-guardts). Il n'y a **pas** de contrôle automatique d'existence de la release ZH en phase 1 : une mineure non pinnée est servie en « latest », qui répond toujours 200 même si Prisme n'a pas encore publié la release. C'est la question humaine (« est-elle la dernière version disponible EN LIGNE ? ») qui tient ce rôle.

### Récapitulatif des questions

| Ordre | Question | Posée quand | Défaut | Refus |
|---|---|---|---|---|
| 1 | ID ZeroHeight de `<mineure>.x` ? | mineure supersédée non pinnée (0..n fois) | — | `abandon` → sortie 1 |
| 2 | `<mineure>` est-elle la dernière en ligne ? `(y/n)` | mineure la plus récente du run, non pinnée | — | `n` → demande l'ID |

Tous les abandons sortent en **1**, via `PreflightAbort` attrapé dans `main()` — jamais par un `process.exit(0)`, qui déclencherait le faux diagnostic « Génération interrompue avant la fin » du garde de sortie (`index.ts`). Le message d'abandon est préfixé 🛑 pour se distinguer d'un plantage.

## Sources de données

Le pipeline agrège des sources **toutes déterministes** (pas d'IA) :

| Source | Ce qu'elle fournit | Comment |
|--------|-------------------|---------|
| **AST extraction** | API Angular (inputs, outputs, models, selectors, types) | `git show <tag>:<path>` — lit le code source directement depuis le git tag |
| **AST diff** | Changelog structurel par composant | Diff de l'API entre tags stables consécutifs (`collectors/api-diff.ts`) |
| **ZeroHeight** | Guidelines design, contenu, accessibilité, dépréciations, prose changelog | Fetch du `.md` versionné par release (`/v/<releaseId>/p/<page>.md`) |
| **Storybook** | Liens + code source des stories Angular et HTML/CSS | `index.json` versionné + `git show` pour les templates |
| **Schematics (git)** | Codemods de migration (`ng generate`) | `git show <tag>:packages/ng/schematics/collection.json` |

## Fiabilité des fetchs (cache, baselines, rejeu)

Trois mécanismes garantissent un rendu reproductible malgré des sources distantes faillibles :

1. **Cache de run ZeroHeight** (mémoire, clé `(releaseId, pagePath)`) : ZH est versionné par mineure,
   donc un run fetch chaque page **une seule fois** — les patches d'une même mineure
   obtiennent un contenu identique octet pour octet. Jamais persisté : un run ultérieur re-fetch
   toujours frais (les éditions ZH au sein d'une release sont prises en compte).
2. **Baselines anti-régression** (`scripts/generate-skills/baselines/`, **committées**) : le dernier
   contenu connu par page ZH (`zeroheight/<releaseId>/<page>.md`).
   Committées pour que la protection ne dépende pas de la machine qui génère (un poste vierge serait
   sans garde au premier run) et qu'un `--accept-shrink` entériné vaille pour tout le monde — leur
   diff dans une PR montre au passage le contenu source brut qui a changé. Un run en ligne ne les
   utilise jamais comme source — uniquement comme oracle (le [mode hors ligne](#mode-hors-ligne), lui,
   les lit comme source) :
   - **ZH** : si le contenu frais *rétrécit* (section H1 disparue, ou taille < 80 % de la baseline),
     la baseline est conservée en sortie et un échec `shrink` est enregistré (rejouable). Un ajout ou
     une modification passe silencieusement et met à jour la baseline. Les titres de sections sont
     comparés sans casse ni ponctuation/emoji (`Changelog 🧪` → `Changelog` n'est pas une disparition).
   - `--accept-shrink` entérine : le frais est accepté et les baselines mises à jour.
3. **Manifeste d'échecs + rejeu ciblé** : les échecs transients épuisés (réseau, 5xx, 429, HTML,
   shrink) sont écrits dans `.github/skills/_fetch-failures.json` avec leur *scope* (composant, page
   doc, outil, deprecated). `--retry-failed` rejoue uniquement ces unités via leur collecteur, puis
   rafraîchit SKILL.md. Itérable jusqu'à manifeste vide ; seuls les `shrink` légitimes
   nécessitent un `--accept-shrink` humain.

## Mode hors ligne

`--offline --storybook-index <fichier>` régénère la skill sans le moindre accès réseau, à partir du dépôt
et d'un `index.json` Storybook fourni par l'appelant, qui doit correspondre au tag résolu. Deux runs sur les mêmes entrées produisent la même sortie, octet pour octet.

| Source | En ligne | Hors ligne |
|---|---|---|
| Git (AST, stories, schematics) | `git show <tag>` | inchangé |
| Storybook | `GET <storybookBaseUrl>/index.json` | le fichier `--storybook-index` |
| ZeroHeight | fetch, la baseline sert d'oracle | la baseline `zeroheight/<releaseId\|latest>/<page>.md` |
| npm, `ls-remote`, pré-flight | contrôlés | sautés |

Un run en ligne réussi tient les baselines à jour : il écrit la page fraîche, et **supprime** la
baseline d'une page qui répond 404. Hors ligne, une page sans baseline se lit donc comme absente.

Le run hors ligne n'écrit ni baselines, ni manifeste d'échecs.

Il ne régénère que la mineure committée (`_lucca-front/versions.json`) : passer à une autre viderait
`references/` et lirait ZeroHeight « latest » sans le garde-fou qui l'épingle. `--offline` refuse donc
toute autre `--version` ; une nouvelle mineure passe d'abord par un run en ligne. Avec `--ref`, c'est
le commit qui fixe la mineure, et `skills:update` en change hors ligne quand un tag ou `--minor` la
fait avancer (cf. [Une documentation qui suit le code](#une-documentation-qui-suit-le-code)).

## Structure de sortie

```
.github/skills/
├── lucca-front/                      # Skill pointeur écrite à la main, installée via APM (non générée)
│   └── SKILL.md                      # Renvoie vers node_modules/@lucca-front/ng/llms.txt
└── _lucca-front/                     # Généré : jamais installé par APM
    ├── llms/                         # Copié dans @lucca-front/ng (llms/) par scripts/llms-skill
    │   ├── SKILL.md                  # Guide d'entrée : mineure implicite, chemins relatifs
    │   ├── fixes/
    │   │   ├── 22-1-1.md             # Delta du patch 22.1.1 vs 22.1.0 (API, types, codemods, stories)
    │   │   └── …                     # Un fichier par patch publié > .0
    │   └── references/               # Contenu du DERNIER patch publié de la mineure
    │       ├── components/
    │       │   └── button/
    │       │       ├── button.md     # API Angular + liens + section ## Changelog (diff structurel cumulatif + prose ZH)
    │       │       ├── button.component.md  # Notes d'implémentation + toutes les stories inline (### <nom>)
    │       │       └── button.design.md  # Guidelines design ZH fusionnées (overview + sections)
    │       ├── types/<TypeName>.md   # Types énumérés partagés (ex: LuccaIcon)
    │       ├── documentation/        # Doc transverse
    │       │   ├── tokens/  content/  guidelines/  patterns/
    │       │   └── deprecated/deprecated.md
    │       ├── tools/{animations,mixins,numbers,scrollbox,utilitaires}.md
    │       └── migrations.md         # Codemods de migration (ng generate) cumulatifs ≤ cette version
    ├── versions.json                 # Manifeste : la mineure documentée, ses patchs (lu par scripts/llms-skill)
    └── changelog/<M.m>.md            # Diff de review du run (avant → après), non distribué
```

Le fichier principal `button.md` contient l'import, le basic usage, la table d'API, les liens vers les fichiers frères, et se termine par la section `## Changelog` (toujours en **dernière position** — le diff de review s'appuie dessus pour l'ignorer dans les comparaisons). Les `.component.md` / `.design.md` / `migrations.md` / `fixes/*.md` sont lazy-loaded (lus seulement au besoin) ; chaque fichier reste sous ~80 Ko, lisible en une passe.

### Fixes par patch (aucune perte d'information)

`references/` reflète le **dernier patch publié** de la mineure ; chaque patch antérieur reste documenté par `fixes/<M-m-p>.md` (généré par `generators/fixes-writer.ts`, sources 100 % git) :

- **API** : diff structurel par composant entre les deux tags (même différeur que le changelog) ; un composant retiré embarque sa dernière API connue ;
- **Types partagés** : valeurs ajoutées/retirées des unions énumérées (ex : `LuccaIcon`) — invisibles au diff d'API car le nom du type ne change pas ;
- **Codemods** : entrées ajoutées/retirées de la collection de schematics ;
- **Stories** : diff git complet de `stories/` (les suppressions embarquent le contenu supprimé) — couvre aussi les descriptions d'API, sourcées des argTypes ;
- **URL Storybook exacte du patch** (les URLs de `references/` pointent le dernier patch).

### Tags fantômes (jamais publiés npm)

Un tag git sans release npm (ex : `v21.1.5`, `v21.2.3`) ne doit produire **ni skill, ni fixe, ni entrée de changelog** : ses changements sont attribués au patch publié suivant. La liste est maintenue dans `UNPUBLISHED_TAGS` (`version-config.ts`) — à compléter si un futur tag n'atteint jamais npm. Le [pré-flight](#parcours-pré-flight) interroge npm sur le dernier patch de la mineure ciblée et refuse de générer un fantôme, de sorte que le cas se découvre au moment où il se produit et non des semaines plus tard ; npm reste une **alarme**, jamais une source : `listStableTags` demeure git-only, donc changelogs et `fixes/` restent hors-ligne et reproductibles.

### Mineures techniques (pas de skill dédiée)

Une **mineure technique** est une release npm publiée dont le patch `.0` a pour seul objet la compatibilité framework (ex : `21.4.0` = support Angular 22 avant la majeure 22.0) : aucun changement d'API, de codemod ni de documentation, et en général **pas de release ZeroHeight dédiée** (Prisme passe directement à la majeure suivante — il n'existe pas de 21.4 sur ZH, mais une 22.0). Le cas revient avant chaque majeure. Générer une skill dédiée dupliquerait ~440 fichiers et, sans ID ZH, tirerait le contenu design « latest » (= la majeure suivante) : la table `TECHNICAL_MINORS` (`version-config.ts`) déclare donc la mineure couverte par une mineure documentée, et `--version <mineure technique>` est refusé.

Les patchs **suivant** le `.0` (ex : `21.4.1`, `21.4.2`) ne sont en revanche **pas neutres** : c'est le tronc qui continue à livrer des correctifs et de petits ajouts d'API avant la majeure (inputs, icônes, variables CSS…). `resolveMinorVersion` expose donc leurs tags (`MinorResolution.technicalMinors`) et `fixes-writer.ts` génère pour chacun un `fixes/<tech-M-m-p>.md` **dans la skill de la mineure de couverture** (ex : `fixes/21-4-1.md`, `21-4-2.md` dans la skill 21.3 de `v21.4-lts`), avec le même diff structurel git que les fixes ordinaires. Leur en-tête inverse le sens de lecture : `references/` reflète `21.3.1`, `21.4.0` lui est équivalent, et un projet en `21.4.p` **possède** les changements de tous les `fixes/21-4-*.md` ≤ `p`. Le `.0` n'a pas de fichier (son delta vs `21.3.1` est le bump de framework : ~500 Ko de diff de stories, aucune API). Le SKILL.md de la mineure de couverture et `_lucca-front/versions.json` (`technicalMinors`) listent la mineure technique et tous ses patchs ; le garde-fou de cohérence les laisse passer. Si la mineure obtient un jour sa propre release ZeroHeight et de vrais changements de doc, générer une vraie skill (retirer l'entrée de la table).

## Architecture du pipeline

```
scripts/generate-skills/
├── index.ts                          # Point d'entrée, orchestration, CLI
├── config.ts                         # Chargement config (env + JSON)
├── types.ts                          # Types TypeScript partagés
├── version-config.ts                 # version → tag, ZH releaseId, SB URL ; listStableTags/compareTags
├── zh-release-ids.json               # Table mineure → ID de release ZeroHeight (writable)
├── zh-release-guard.ts               # Garde-fou pré-flight : exige un ID pour toute mineure supersédée
├── sync-metadata.ts                  # Synchronise component-metadata.json depuis Storybook
├── component-metadata.json           # Métadonnées par slug (ZH path, overrides de package, sélecteurs)
├── component-map.json                # Registre legacy — uniquement pour --validate
├── documentation-map.json            # Registre des pages documentation
├── tools-map.json                    # Registre des pages outils
│
├── collectors/
│   ├── component-discovery.ts        # Découverte dynamique (Storybook + packages git + métadonnées)
│   ├── ast-extractor.ts              # Extraction API Angular depuis git tags (chaîne `extends` incluse)
│   ├── api-diff.ts                   # Diff structurel de deux PackageAPI (→ changelog)
│   ├── storybook.ts                  # Fetch index.json Storybook + groupement par slug + classification framework (tiers 1-2)
│   ├── story-source.ts               # Code source des stories via git show + classification framework (tier 3)
│   ├── story-eval.ts                 # Évaluation déterministe du render() des stories
│   ├── zeroheight-fetch.ts           # Fetch .md ZeroHeight (avec fallback HTML)
│   ├── documentation.ts              # Doc transverse (tokens, contenu, guidelines, patterns)
│   ├── deprecated.ts                 # Page "Cycle de vie" ZH (dépréciés + prose schematics)
│   ├── tools.ts                      # Outils SCSS + Angular depuis git tags
│   └── schematics.ts                 # Codemods de migration depuis collection.json (git), version d'intro par diff de tags
│
├── generators/
│   ├── template-renderer.ts          # Rendu Handlebars + cleanZeroHeightMarkdown
│   ├── skill-writer.ts               # Écriture des fichiers (flat par mineure)
│   ├── toc-writer.ts                 # Génération du SKILL.md par mineure
│   ├── changelog-writer.ts           # Changelog cumulatif par composant (AST diff)
│   ├── fixes-writer.ts               # fixes/<M-m-p>.md : delta par patch publié (git)
│   ├── output-guard.ts               # Garde-fou de sortie : invariants sur le markdown émis
│   └── version-diff-writer.ts        # _lucca-front/changelog/<M.m>.md : diff de review avant → après le run
│
└── templates/
    ├── component.hbs                 # API Angular + liens + section ## Changelog
    ├── design.hbs                    # Guidelines design fusionnées (overview + sections)
    ├── component-page.hbs            # Page implémentation (notes + stories inline)
    ├── story-body.hbs                # Partial : une story (utilisé par component-page)
    ├── type-definition.hbs           # Type énuméré partagé
    └── changelog.hbs                 # Prose ZH (couche "notes de release")
```

## Flux de génération (par mineure)

```
1. CLI parse (--version M.m, --component, flags) — une version patch est refusée
2. Résolution mineure → dernier tag stable publié (tags fantômes exclus) + liste des tags patch,
   ZH release ID, Storybook base URL
2 bis. Pré-flight (preflight.ts + zh-release-guard.ts) : mineure de la branche, existence de la
   release, IDs de release ZeroHeight — cf. « Parcours pré-flight »
2 ter. Instantané de la skill committée (dossier temporaire), base du diff de review ; sur une
   nouvelle mineure, `references/` et `fixes/` sont vidés (une page que la mineure n'émet plus
   ne doit pas survivre avec le contenu de la précédente)
3. Doc transverse        → references/documentation/<category>/   (ZH fetch)
4. Dépréciés             → references/documentation/deprecated/deprecated.md  (ZH "Cycle de vie")
5. Schematics            → references/migrations.md                (git collection.json, codemods cumulatifs ≤ cible)
6. Outils                → references/tools/                       (git + ZH)
7. Composants (découverte Storybook + git) — pour chacun :
   a. AST extraction          → PackageAPI (inputs, outputs, models, selectors, types)
   b. ZeroHeight fetch        → design sections + prose changelog
   c. Storybook + story source/eval → exemples Angular + HTML/CSS (framework résolu, cf. ci-dessous)
   d. Changelog structurel    → AST diff sur tags stables ≤ cible (cumulatif) + prose ZH
   e. Rendu Handlebars + écriture → references/components/<slug>/
   f. Types partagés          → references/types/<TypeName>.md
8. Fixes                 → fixes/<M-m-p>.md par paire de tags patch consécutifs (fixes-writer)
9. _lucca-front/versions.json (manifeste : mineure + sous-map patches)
10. SKILL.md (toc-writer) — écrit après les fichiers (scanne les composants du disque)
11. _lucca-front/changelog/<M.m>.md — diff de review : la skill après le run vs l'instantané
```

## Membres hérités (`extends`)

L'extracteur lisait le corps de la classe décorée et s'arrêtait là : tout `input()` / `output()` /
`model()` déclaré sur une classe de base manquait au tableau d'API — sans rien qui distingue « ce
composant a cinq inputs » de « ce composant a cinq de ses dix-huit inputs ». `lu-date-input` en
perdait 13 (+ 1 model, 2 outputs) hérités d'`AbstractDateComponent` ; même chose pour les cellules
data-table / index-table (`editable`, `align`) et les trois composants file-upload.

`collectInheritedMembers` remonte la chaîne : la classe de base est cherchée dans le fichier courant,
sinon via l'import qui l'amène (relatif, `@lucca-front/ng/<pkg>`, `@lucca/prisme/<sub>`), en suivant
un niveau de re-export de barrel. Un membre redéclaré dans la classe dérivée gagne — c'est ce que fait
une surcharge. Profondeur bornée et cycles coupés par un `seen`.

## Angular ou HTML/CSS : la classification du framework

Chaque story est rendue soit sous `## Angular`, soit sous `## HTML/CSS` de son `.component.md`. La
décision se prend en trois paliers, le premier qui tranche gagne :

| Palier | Signal | Où |
|--------|--------|-----|
| 1 | Dossier de la story : `angular/` ou `html&css/` | `collectors/storybook.ts` — `classifyFramework()` |
| 2 | Segment de framework du titre Storybook (`Documentation/Overlays/Dialog/**Angular**`) | idem |
| 3 | Source de la story : `moduleMetadata(` / `applicationConfig(` / `importProvidersFrom(` / `component:` | `collectors/story-source.ts` — `resolveStoryFrameworks()` |

Le palier 3 existe parce que ni le dossier ni le titre ne sont garantis : à `v21.3.1`, **164 stories
sur 596** n'ont aucun des deux (`stories/documentation/forms/date2/date-range-input.stories.ts`,
`overlays/dialog/*.stories.ts`…). Elles étaient toutes déclarées `html-css` par défaut — dont 60
stories Angular, ce qui les rangeait sous `## HTML/CSS` et concaténait leurs imports TypeScript dans
le bloc SCSS du composant.

Deux signaux **volontairement écartés**, tous deux mesurés comme faux :

- **La syntaxe de binding Angular dans le markup** (`(click)="…"`, `[attr.style]="…"`) : les stories
  `html&css/` du repo en utilisent, puisqu'elles sont rendues dans Storybook Angular. 29 stories
  légitimes mal classées à `v21.3.1`.
- **Un import depuis `@storybook/angular`** : toutes les stories en ont, `html&css/` incluses.

Le palier 3 ne s'applique jamais à une story que le palier 1 ou 2 a tranchée : `moduleMetadata` est
aussi utilisé par des stories `html&css/` qui ont besoin de directives Angular pour se rendre.

## Extraction des templates de stories

Le markup d'un exemple est lu dans la source de la story, par `extractTemplateLiterals()`
(`collectors/story-source.ts`), avec quatre formes reconnues et, en dernier recours, l'évaluation
de la story :

| Forme | Exemple |
|-------|---------|
| Littéral direct | ``template: `<lu-box>…</lu-box>` `` |
| Littéral emballé dans un helper | ``template: cleanupTemplate(`<lu-box>…</lu-box>`)`` — forme dominante du repo |
| Chaîne quotée contenant du markup | `return '<span class="tag">Text</span>';` |
| Fichier `.html` frère | `templateUrl: './dropdown-basic.stories.html'` — lu depuis le même tag git |
| Template calculé | `template: getTemplate()` → résolu par `story-eval` (`vm`) |

L'évaluation (`renderStoryTemplates`) est tentée **aussi bien quand l'extraction statique a laissé
des `${…}` que quand elle n'a rien trouvé** : un template calculé n'existe qu'à l'exécution, et ce
second cas n'atteignait jamais l'évaluateur.

Résultat mesuré, stories sans aucun template extrait :

| Tag | Avant | Après |
|-----|-------|-------|
| `v21.3.1` | 53 / 596 | **12** |
| `v22.0.0` | 55 / 636 | **14** |

Le résidu n'est pas extractible : ce sont des stories `component:` + `args` sans aucun markup dans
la source (les `skeleton-*`, `inline-message`, `icon-angular`, `new-badge` — Storybook rend le
composant depuis ses args), plus `highlight-text-palettes` dont le template est calculé depuis une
constante de package que le sandbox `vm` neutralise.

Ces stories sont désormais **écartées** (`if (templates.length === 0) continue;`) au lieu d'être
publiées comme un titre au-dessus d'un bloc d'imports sans code. Leur bloc d'imports était de toute
façon identique au `## Import` de `<slug>.md`, donc rien n'est perdu. **L'ordre compte** : écarter
ces stories avant de réparer l'extraction aurait supprimé 41 exemples légitimes à `v21.3.1`.

## Garde-fou de sortie (`generators/output-guard.ts`)

Les mécanismes de la section « Fiabilité des fetchs » protègent les **entrées** — ils répondent à
« la source a-t-elle été récupérée fidèlement ». Aucun ne répond à « le markdown émis est-il
cohérent ». C'est ce trou qui a laissé passer des imports TypeScript rendus dans des blocs ```css
sur les cinq variantes de skill : `scripts/**` n'était couvert par aucun projet Vitest, aucun job CI
n'exécute `skills:generate`, et les skills atterrissent dans des PR de 30 000+ fichiers marqués
`linguist-generated` — donc invisibles en revue.

Le garde-fou vérifie des **invariants**, pas des heuristiques : une violation est toujours un bug du
générateur. Il tourne en fin de run, après écriture (pour que la sortie fautive soit lisible), et
fait échouer le run (`process.exitCode = 1`) sauf `--accept-output-violations`.

| Règle | Ce qu'elle interdit | Quand |
|-------|--------------------|-------|
| `html-css-story-with-ts-imports` | Des imports ou extraits TypeScript curés sur ZeroHeight pour une story classée `html-css` — c'est la classification du framework qui est fausse | En cours de génération, par composant |
| `ts-import-in-css-fence` | Une ligne `import … from` dans un bloc ```css / ```scss | Relecture du markdown écrit |
| `sass-in-ts-fence` | Un `@forward` / `@use` dans un bloc ```js / ```ts (la régression miroir) | idem |
| `scss-forward-unknown-component` | Un `@forward '@lucca-front/scss/src/components/<x>'` dont le dossier n'existe pas au tag généré | idem |
| `truncated-import` | Une ligne `import` sans module source dans un bloc ```js / ```ts (statement tronqué) | idem |

La règle 4 se compare au **listing réel** de `packages/scss/src/components` au tag : les dossiers y sont
en camelCase (`dataTable`, `emptyState`) alors que `ngPackage` et les slugs sont en kebab-case. Le chemin
était interpolé depuis `ngPackage`, d'où 206 `@forward` morts sur 48 fichiers de la 22.0. La résolution
vit dans `resolveScssComponentName` (exact → kebab→camel → insensible à la casse, sur `scssComponent`
puis `ngPackage` puis le slug) ; si rien ne correspond, **aucun import n'est émis** et un avertissement
le dit. `sanitizeScssForwards` retire en plus les lignes invalides quelle qu'en soit l'origine — ZeroHeight
en écrit quelques-unes à la main, dont une fausse (`components/forms` n'existe à aucun tag). La règle
n'est appliquée qu'aux dossiers dans le périmètre du run, pour ne pas juger une skill ancienne sur un
listing récent.

La règle 5 découle de la collecte des imports : elle se faisait ligne à ligne, donc un import replié par
prettier publiait le seul `import {` — 13 blocs ```js syntaxiquement invalides sur la 22.0, et toujours
la ligne la plus longue, c'est-à-dire le package du composant lui-même. `collectImportStatements`
recompose maintenant le statement sur une ligne.

La règle 2 est volontairement étroite : les blocs ```css contiennent aussi du CSS et du Sass
légitimes venus des pages de documentation ZH (tokens, mixins, utilitaires). Exiger `@forward`/`@use`
y déclencherait 211 faux positifs — seul un `import … from` n'est jamais du CSS.

`changelog/` est exclu de la relecture : ces fichiers citent du markdown généré dans des blocs
````diff, donc toute violation y est l'écho d'une autre déjà signalée à sa source.

**Périmètre** : seule la doc générée (`_lucca-front/llms/`) est bloquante. Les violations trouvées dans les skills écrites à la main à côté (le pointeur `lucca-front/`, `lucca-front-scss/`…) sont signalées comme « hors périmètre » : un run du générateur ne doit pas échouer sur du contenu qu'il n'a pas produit.

## Changelog structurel

`changelog-writer.ts` construit un `<slug>.changelog.md` **cumulatif par composant** :

- **baseline** : l'API telle qu'elle était au dernier tag stable de la majeure précédente (`previousMajorLastStableTag`) ;
- walk des **tags git stables** de la majeure (`listStableTags`, pré-releases filtrées), ≤ version cible ;
- pour chaque paire consécutive, `diffPackageApi` (`api-diff.ts`) compare selectors / inputs / outputs / models ;
- **les versions sans changement d'API sont omises** ; extraction AST mémoïsée par `(ngPackage, tag)` ;
- une couche optionnelle « Notes de release (ZeroHeight) » (prose) est ajoutée en fin.

Sans baseline, le walk démarrait sur une API vide et le **premier tag de la majeure** ressortait en
« Composant introduit » pour tout composant qui lui préexistait. Invisible tant qu'une majeure comptait
18 tags et que la ligne fausse était noyée sous un vrai historique ; sur la 22.0, où `v22.0.0` est le seul
tag, c'était la seule ligne de **119 des 128** pages composant.

Comme le workflow de montée met à jour **d'abord** (la skill cible est alors installée), le changelog cumulatif de la cible couvre le delta depuis n'importe quelle version de départ. Layout-agnostique (différe des objets AST, pas des dossiers).

## Découverte des composants & métadonnées

La liste des composants est **découverte dynamiquement** (`collectors/component-discovery.ts`) en croisant l'index Storybook et les packages Angular présents au git tag. Le slug d'un composant est son slug Storybook (ex: `userpopover`, `errorpage`) — c'est aussi le nom du dossier généré. `component-metadata.json` ne fait qu'**enrichir** (et est auto-synchronisé par `sync-metadata.ts`, dédup compact).

```jsonc
{
  "userpopover": {
    "zeroheightPagePath": "85b183"
  }
}
```

| Champ | Description |
|-------|-------------|
| `zeroheightPagePath` | Segment de page ZeroHeight (stable entre versions) |
| `ngPackageOverride` | Force le mapping vers un package Angular si l'heuristique échoue |
| `ngSelectors` | Restreint l'API extraite à ces sélecteurs (isole un composant d'un package multi-composants) |
| `scssComponent` | Dossier SCSS sous `packages/scss/src/components`. À renseigner seulement quand ni `ngPackage` ni le slug ne s'y résolvent (`date2` → `dateField`). `""` déclare l'absence de contrepartie SCSS et éteint l'avertissement |
| `storybookFamily` | Titre Storybook de la famille de stories. **Opt-in** : ne le renseigner que si deux composants réellement différents se retrouvent dans le même groupe — `Documentation/Forms/FiltersPills/Checkbox` documentait un filter pill sur la page `checkbox`. Regrouper plusieurs familles d'un **même** composant est le comportement utile par défaut |

> La résolution slug → clé tolère les écarts de tirets : `findMetadata` compare en forme compacte (sans tirets), donc `userpopover` retrouve une clé `user-popover` et inversement.

### component-map.json (legacy)

Ancien registre central, conservé uniquement pour `--validate` (couverture ZeroHeight). Ses clés (hyphénées) ne servent plus à la génération.

## Versionnement & consommation

- **ZeroHeight** : versionné par release mineure (mapping `ZH_RELEASE_IDS` dans `version-config.ts` — voir ci-dessous).
- **Storybook** : versionné au fix près (`lucca-front.lucca.io/v21.2.4/storybook/`) — `references/` pointe l'URL du dernier patch, chaque `fixes/<M-m-p>.md` porte l'URL exacte de son patch.
- **AST / stories / migrations** : versionné au fix près via git tags — l'historique patch est porté par les changelogs cumulatifs et `fixes/`.

### IDs de release ZeroHeight (`ZH_RELEASE_IDS`)

Le contenu ZeroHeight (guidelines, accessibilité, dépréciations, prose changelog) n'est **reproductible que si la mineure est pinnée** dans **`zh-release-ids.json`** (la table, chargée et tenue à jour par `version-config.ts` ; écrite par le garde-fou).

- **Mineure pinnée** → URL `prisme.lucca.io/<token>/v/<releaseId>/p/<page>.md`, **immuable** : régénérer cette version donne toujours le même contenu.
- **Mineure absente** → `zhReleaseId = null` → URL sans `/v/<id>/` = contenu **« latest »**, **cible mouvante**.

npm et ZeroHeight sortent **ensemble** : une mineure est donc sûre en « latest » **uniquement tant qu'elle est la version la plus récente publiée**. Le piège est de **régénérer une mineure plus ancienne** non pinnée (ex. une re-génération globale après une amélioration du générateur) : elle tirerait le « latest » du moment (= une version postérieure) → **corruption silencieuse** des sections design. Le reste (API, sélecteurs, stories, changelog structurel) reste correct car versionné par tag git + URL Storybook.

> Pinner ≠ corriger l'existant. Comme npm/ZH sont en lockstep, le contenu capté à la première génération est déjà correct ; pinner l'ID sert à la **reproductibilité future** (et range la baseline ZH de `zeroheight/latest/` vers `zeroheight/<id>/`). Régénérer n'est pas requis pour « réparer ».

#### Garde-fou pré-flight (`zh-release-guard.ts`)

Avant toute génération, le pipeline applique l'invariant :

> Une mineure ne peut être (re)générée **non pinnée** que si c'est **la plus récente** parmi celles concernées (run ∪ disque).

- **Mineure supersédée non pinnée** (une plus récente existe) → **bloque** : il faut son ID.
- **Mineure la plus récente, (re)générée, non pinnée** → demande de confirmer que c'est bien la **dernière version en ligne** (ZH peut être en avance sur ce qui a été généré).

Résolution :

| Contexte | Comportement |
|---|---|
| **Interactif (TTY)** | Pose `Est-ce la dernière version en ligne ? (y/n)`. `y` → contenu « latest ». `n` → demande l'ID. Pour une mineure supersédée : demande directement l'ID. L'ID saisi est **validé** (fetch `/v/<id>/`) puis **persisté** dans `zh-release-ids.json`. |
| **Non-interactif / CI** | `--zh-latest <minor>` pour affirmer « c'est la dernière en ligne » ; `--zh-id <minor>=<releaseId>` pour fournir un ID. Sans l'un ni l'autre quand c'est requis → **échec** (exit ≠ 0), aucune génération. |

Exemples :

```bash
# 21.3 vient de sortir et c'est la dernière en ligne :
npx ts-node … --version 21.3.0 --zh-latest 21.3

# 21.4 sort ; on régénère 21.3 (désormais supersédée) → il FAUT son ID :
npx ts-node … --version 21.4.0 --zh-latest 21.4 --zh-id 21.3=<releaseId>
```

#### Obtenir un ID de release

Il est **opaque** (non déductible du repo, de git ou de npm) :

1. MCP ZeroHeight `list-releases` (la source qui a initialisé la table) ; **ou**
2. le **sélecteur de versions Prisme** (accessible sans backoffice) — ouvrir le styleguide, choisir la release, lire l'ID dans l'URL sous la forme `/v/<releaseId>/` :

   👉 **https://prisme.lucca.io/94310e217/** → menu des versions → sélectionner la mineure → l'URL devient `…/v/<ID>/…`.

   (`94310e217` est le token de partage du styleguide, défini par `ZH_STYLEGUIDE_TOKEN` dans `version-config.ts`.)

> Un simple fetch HTTP public ne suffit pas : la landing n'expose pas la table complète et l'API releases de ZeroHeight (`/api/styleguide/<id>/releases`) exige un token d'authentification (401).

**✅ À faire dès qu'une version est publiée** : récupérer son ID (méthode ci-dessus) et l'ajouter dans `zh-release-ids.json` (clé `"major.minor"`). Une mineure déjà pinnée **ne déclenche jamais le garde-fou** — pinner de façon proactive évite d'avoir à passer `--zh-latest` / `--zh-id` (ou de répondre au prompt) aux régénérations suivantes.

## Consommation

Un projet déclare la skill pointeur dans son `apm.yml`, sans ref : son contenu ne dépend pas de la version de Lucca Front.

```yaml
dependencies:
  apm:
    - LuccaSA/lucca-front/.github/skills/lucca-front
```

`apm install` la déploie sous `.claude/skills/lucca-front/` (et `.github/skills/` pour Copilot). Elle renvoie vers `node_modules/@lucca-front/ng/llms.txt` : la documentation lue est celle du package installé, et rien n'est à mettre à jour quand le projet monte de version. Si le package ne livre pas `llms.txt`, elle lit la documentation déployée de sa version (`https://lucca-front.lucca.io/v<version>/storybook/llms.txt`), puis les types du package.

### Une documentation qui suit le code

La documentation committée décrit le code du commit qui la porte : chaque tag la livre donc, à sa propre version, dans le package npm, sans génération à lancer après la release. Elle ne déclare aucune version : le package qui la livre en tient lieu, et le `SKILL.md` demande la version installée seulement pour compléter les liens Storybook (`https://lucca-front.lucca.io/v{version}/storybook/…`). Pas de `fixes/` non plus : chaque patch a sa documentation.

`npm run skills:update` la régénère hors ligne depuis `HEAD` (`--offline --ref HEAD`) : le code et les stories viennent du commit, l'index Storybook est construit en local, ZeroHeight vient des baselines. Le manifeste `versions.json` le signale par `"followsCode": true` ; `scripts/llms-skill` embarque alors la documentation sur n'importe quel tag.

La mineure est celle du dernier tag publié que contient le commit, sauf si la branche en **prépare** une plus récente. Le tag `vX.Y.0` est posé sur un commit qui ne le contient pas encore : sans rien déclarer, sa documentation porterait la mineure précédente, et un tag ne se corrige plus. La PR de release d'une mineure ou d'une majeure la déclare donc avant le tag :

```bash
npm run skills:update -- --minor 22.2
```

`versions.json` garde `"minor": "22.2"`, et les runs suivants (hook, CI) la conservent tant que le dernier tag est plus ancien. Le code est lu tel quel ; les changelogs s'arrêtent au dernier tag publié.

Trois garde-fous, comme sur `@lucca/cdk` :

- **Hook pre-commit** (`.git-hooks/pre-commit`, installé par `npm install` via `prepare`) : dès qu'un fichier de `packages/ng`, `packages/prisme`, `packages/scss`, `stories` ou du générateur est indexé, il régénère depuis l'index (`--ref "$(git write-tree)"`) et ajoute la documentation au commit. Compter une vingtaine de secondes au premier commit, une dizaine ensuite : les tags publiés lus par les changelogs sont extraits une fois dans `node_modules/.cache/lf-skills-tags` (~10 Mo par tag, vidé par `npm ci`). `git commit --no-verify` le saute. Sans `node` dans le `PATH` ni tag atteignable, il ne fait rien.
- **CI** (`skills` dans `build.yml`) : `npm run skills:check` régénère et échoue sur tout écart, fichiers nouveaux compris, car un hook reste contournable.
- **Baselines** : ZeroHeight ne bouge qu'au rafraîchissement en ligne, qui ouvre un diff de baselines relisible. Sans rafraîchissement, la documentation garde le dernier contenu design récupéré.

### Rafraîchir le contenu ZeroHeight

Un run en ligne depuis `HEAD` met les baselines à jour, puis le run hors ligne régénère la documentation à partir d'elles :

```bash
npm run skills:generate -- --ref HEAD --zh-latest 22.1
npm run skills:update
```

`--zh-latest` affirme que la mineure du dernier tag est la dernière en ligne sur ZeroHeight. Le run en ligne écrit aussi la documentation : seule compte celle du run hors ligne qui suit, que la CI compare.

### Générer la documentation d'une release

Le mode par tag reste disponible pour une branche qui ne suit pas le code, une `vX.Y-lts` par exemple : `npm run skills:generate -- --version 21.4`. `references/` y documente alors le dernier patch de la mineure et `fixes/` les patchs précédents. Le package n'embarque cette documentation que sur les tags de la mineure qu'elle documente.

### Depuis les anciens chemins par mineure

Jusqu'à `v22.1.0`, chaque mineure avait son dossier (`.github/skills/lucca-front/lucca-front-<M>-<m>/`) et une skill agrégat `lucca-front-all/` routait selon la version détectée. Ces dossiers restent lisibles dans les tags existants : un projet épinglé sur `v22.1.0` ou un SHA antérieur n'est pas affecté. Pour migrer :

| Dépendance actuelle | Nouvelle dépendance |
|---|---|
| `LuccaSA/lucca-front/.github/skills/lucca-front/lucca-front-<M>-<m>` (ou `…/lucca-front-all`), sans ref ou sur `master` | **avant le merge**, le même chemin épinglé : `…/lucca-front-<M>-<m>#v22.1.0` (ou `…/lucca-front-all#v22.1.0`), sans quoi `apm install --update` échoue |
| n'importe quel chemin, projet dont `node_modules/@lucca-front/ng/llms.txt` existe | `LuccaSA/lucca-front/.github/skills/lucca-front`, sans ref |

Un projet dont le package ne livre pas encore `llms.txt` (21.x, 22.1.x, une partie des patchs 22.0) garde la skill complète de sa mineure épinglée sur `#v22.1.0` : le Storybook déployé de sa version ne sert pas non plus de `llms.txt`, le pointeur n'y trouverait que les types.
