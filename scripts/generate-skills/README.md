# generate-skills

Pipeline **déterministe** (zéro IA) qui génère la documentation des composants Lucca Front pour les **Agent Skills**.

Chaque version produit une **skill self-contained** sous `.github/skills/lucca-front/lucca-front-<M>-<m>-<p>/` : un `SKILL.md` + tous les fichiers `references/` de cette version. Le nom du dossier (tirets, pas de point) = `name:` du SKILL.md = dossier d'install APM (leaf), pour un shorthand APM sur une ligne sans collision entre versions.

Une passe finale assemble une skill **agrégat** `lucca-front-all/` : **un seul** `SKILL.md` routeur + le `references/` de chaque version sous `references/<version>/` (sans les SKILL.md par version, pour ne pas dupliquer les descriptions). Le routeur détecte la version de `@lucca-front/ng` (node_modules puis `package.json`) et compose les chemins vers `references/<version>/…`. Deux usages couverts :

- **install global** (machine) : installer `lucca-front-all` → n'importe quel repo obtient la bonne version automatiquement ;
- **install par repo** : installer une/deux `lucca-front-<M>-<m>-<p>` précises (fetch plus léger, version figée).

Distribution via APM (voir `.github/skills/UPDATE.md`).

## Prérequis

- Node.js ≥ 18 avec `ts-node` (inclus dans les dépendances du projet ; le repo est calé sur Node 24 via Volta)
- Accès aux git tags du repo (les API, stories, migrations sont extraites depuis le code source via `git show`)
- Un **Figma Personal Access Token** (lecture seule) — voir [Configuration](#configuration) : requis pour produire les `.figma.md`, le pipeline tourne sans mais saute alors silencieusement la collecte Figma

ZeroHeight et Storybook ne demandent **aucun token** : les URL publiques suffisent (le token de partage ZeroHeight est codé en dur dans `version-config.ts`).

## Configuration

Seul le token Figma se configure. Deux moyens, au choix :

```bash
# Variable d'environnement
export FIGMA_TOKEN=figd_...

# Ou fichier de config local (gitignored, prioritaire sur la variable d'environnement)
cp scripts/generate-skills/generate-skills-config.json.example scripts/generate-skills/generate-skills-config.json
```

Pour créer le token : Figma → Profil → Settings → Security → **Personal access tokens** (la lecture seule suffit).

### Comportement sans token

Sans token, la collecte Figma est sautée **sans erreur ni avertissement** (équivalent `--skip-figma`) :

- les fichiers `.figma.md` (design tokens des variantes) ne sont **ni générés ni rafraîchis** ;
- un `.figma.md` issu d'un run précédent est conservé sur disque et reste lié depuis `<slug>.md` ;
- un composant jamais généré avec token n'aura **aucune** donnée Figma.

Le token est donc optionnel pour développer ou tester le pipeline (AST, ZeroHeight et Storybook fonctionnent sans), mais **requis pour une génération complète destinée à être committée et distribuée**.

## Utilisation

```bash
# Générer un composant pour une version
npx ts-node --project scripts/generate-skills/tsconfig.json \
  scripts/generate-skills/index.ts --version 21.2.3 --component button

# Générer tous les composants pour une version
npx ts-node ... --version 21.2.3

# Plusieurs versions à la fois
npx ts-node ... --version 21.2.3 --version 21.1.4

# Sans Figma / ZeroHeight / Storybook
npx ts-node ... --version 21.2.3 --skip-figma --skip-zeroheight

# Valider la couverture ZH (aucune génération)
npx ts-node ... --validate
```

### Options

| Flag | Description |
|------|-------------|
| `--version <M.m.p>` | Version à générer (ex: `21.2.3`). Répétable. **Requis** (sauf avec `--validate` et `--retry-failed`). |
| `--component <slug>` | Générer uniquement ce composant (n'écrit pas le SKILL.md ni la doc transverse) |
| `--skip-figma` | Ignorer la collecte Figma |
| `--skip-zeroheight` | Ignorer la collecte ZeroHeight |
| `--skip-storybook` | Ignorer la collecte Storybook |
| `--skip-documentation` | Ignorer la doc transverse (tokens, contenu, guidelines, patterns, deprecated) |
| `--skip-tools` | Ignorer les outils (SCSS + Angular tools) |
| `--skip-schematics` | Ignorer les codemods de migration (`collection.json` git) |
| `--skip-aggregate` | Ne pas (ré)assembler la skill agrégat `lucca-front-all/` |
| `--documentation-only` | Ne collecter que doc/outils/schematics (pas les composants) |
| `--dry-run` | N'écrire aucun fichier |
| `--validate` | Vérifier la couverture ZH de `component-map.json` (aucune génération) |
| `--retry-failed` | Rejouer uniquement les unités (composants, pages doc/outils, deprecated) dont le fetch a échoué au run précédent (manifeste `_fetch-failures.json`) |
| `--accept-shrink` | Entériner les régressions de contenu vs les baselines (suppression légitime côté ZH/Figma) |
| `--zh-latest <minor>` | Affirme que `<minor>` (ex. `21.3`) est la dernière version en ligne → autorisée en « latest » non pinné. Répétable. Cf. garde-fou ZeroHeight. |
| `--zh-id <minor>=<id>` | Fournit l'ID de release ZeroHeight d'une mineure (ex. `21.3=61234`), validé puis persisté dans `zh-release-ids.json`. Répétable. |

## Sources de données

Le pipeline agrège des sources **toutes déterministes** (pas d'IA) :

| Source | Ce qu'elle fournit | Comment |
|--------|-------------------|---------|
| **AST extraction** | API Angular (inputs, outputs, models, selectors, types) | `git show <tag>:<path>` — lit le code source directement depuis le git tag |
| **AST diff** | Changelog structurel par composant | Diff de l'API entre tags stables consécutifs (`collectors/api-diff.ts`) |
| **ZeroHeight** | Guidelines design, contenu, accessibilité, dépréciations, prose changelog | Fetch du `.md` versionné par release (`/v/<releaseId>/p/<page>.md`) |
| **Storybook** | Liens + code source des stories Angular et HTML/CSS | `index.json` versionné + `git show` pour les templates |
| **Figma REST API** | Propriétés des variantes (taille, palette, état…) | API REST Figma — reflète l'état courant. Prefetch **batché** (`ids` groupés, `depth=1`) : ~90 nodes en 2-3 requêtes Tier 1 |
| **Schematics (git)** | Codemods de migration (`ng generate`) | `git show <tag>:packages/ng/schematics/collection.json` |

## Fiabilité des fetchs (cache, baselines, rejeu)

Trois mécanismes garantissent un rendu reproductible malgré des sources distantes faillibles :

1. **Cache de run ZeroHeight** (mémoire, clé `(releaseId, pagePath)`) : ZH est versionné par mineure,
   donc un run multi-versions fetch chaque page **une seule fois** — les patches d'une même mineure
   obtiennent un contenu identique octet pour octet. Jamais persisté : un run ultérieur re-fetch
   toujours frais (les éditions ZH au sein d'une release sont prises en compte).
2. **Baselines anti-régression** (`scripts/generate-skills/baselines/`, **committées**) : le dernier
   contenu connu par page ZH (`zeroheight/<releaseId>/<page>.md`) / node Figma (`figma.json`).
   Committées pour que la protection ne dépende pas de la machine qui génère (un poste vierge serait
   sans garde au premier run) et qu'un `--accept-shrink` entériné vaille pour tout le monde — leur
   diff dans une PR montre au passage le contenu source brut qui a changé. Jamais utilisées comme
   source — uniquement comme oracle :
   - **ZH** : si le contenu frais *rétrécit* (section H1 disparue, ou taille < 80 % de la baseline),
     la baseline est conservée en sortie et un échec `shrink` est enregistré (rejouable). Un ajout ou
     une modification passe silencieusement et met à jour la baseline.
   - **Figma** : une réponse 200 fait foi (le frais est toujours écrit) ; la disparition de
     propriétés/variantes est seulement **signalée** dans le rapport de fin de run.
   - `--accept-shrink` entérine : le frais est accepté et les baselines mises à jour.
3. **Manifeste d'échecs + rejeu ciblé** : les échecs transients épuisés (réseau, 5xx, 429, HTML,
   shrink) sont écrits dans `.github/skills/_fetch-failures.json` avec leur *scope* (composant, page
   doc, outil, deprecated). `--retry-failed` rejoue uniquement ces unités via leur collecteur, puis
   rafraîchit SKILL.md et l'agrégat. Itérable jusqu'à manifeste vide ; seuls les `shrink` légitimes
   nécessitent un `--accept-shrink` humain.

Côté Figma, la défense principale contre le rate limit (Tier 1 : ~10-20 req/min) est le **prefetch
batché** ; la sérialisation + cadence + retries `Retry-After` ne restent qu'en filet de sécurité
(fallback unitaire si un chunk échoue).

## Structure de sortie

Layout **flat self-contained par version** (aucun segment de version interne) :

```
.github/skills/lucca-front/
├── _versions.json                    # Manifeste des versions générées (métadonnée dist, hors skill)
├── changelog/<version>.md            # Diff de review humain entre versions (hors skill, non distribué)
├── lucca-front-all/                  # Skill agrégat : UN seul SKILL.md + references/ par version
│   ├── SKILL.md                      # Détecte la version (node_modules/package.json) → compose les chemins
│   └── references/
│       ├── 21.2.4/{components,documentation,tools,types,migrations.md}
│       └── 21.2.2/  …                # references/ de chaque version (sans son SKILL.md)
├── lucca-front-21-2-4/               # Une skill complète (dossier = name = leaf APM)
│   ├── SKILL.md                      # Point d'entrée : version implicite, chemins relatifs
│   └── references/
│       ├── components/
│       │   └── button/
│       │       ├── button.md         # API Angular (~30 lignes) + liens
│       │       ├── button.component.md
│       │       ├── button.figma.md   # Tokens Figma
│       │       ├── button.changelog.md  # Diff structurel cumulatif + prose ZH
│       │       ├── design/{_index.md, design.md, content.md}
│       │       └── stories/{angular-basic.md, html-size.md, …}
│       ├── types/<TypeName>.md       # Types énumérés partagés (ex: LuccaIcon)
│       ├── documentation/            # Doc transverse
│       │   ├── tokens/  content/  guidelines/  patterns/
│       │   └── deprecated/deprecated.md
│       ├── tools/{animations,mixins,numbers,scrollbox,utilitaires}.md
│       └── migrations.md             # Codemods de migration (ng generate) cumulatifs ≤ cette version
└── lucca-front-21-2-2/
    └── …
```

Le fichier principal `button.md` contient uniquement l'import, le basic usage, la table d'API et les liens vers les sous-fichiers. Cela minimise la consommation de tokens quand l'agent n'a besoin que de l'API. Les `.changelog.md` / `.figma.md` / `migrations.md` sont lazy-loaded (lus seulement au besoin).

> La duplication inter-versions (deux versions de fix quasi identiques) est assumée : un projet ne charge qu'une version, le gain est la rapidité de fetch.

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
├── component-metadata.json           # Métadonnées par slug (ZH path, Figma node IDs/name/aliases)
├── component-map.json                # Registre legacy — uniquement pour --validate
├── documentation-map.json            # Registre des pages documentation
├── tools-map.json                    # Registre des pages outils
│
├── collectors/
│   ├── component-discovery.ts        # Découverte dynamique (Storybook + packages git + métadonnées)
│   ├── ast-extractor.ts              # Extraction API Angular depuis git tags
│   ├── api-diff.ts                   # Diff structurel de deux PackageAPI (→ changelog)
│   ├── storybook.ts                  # Fetch index.json Storybook + groupement par slug
│   ├── story-source.ts               # Code source des stories via git show
│   ├── story-eval.ts                 # Évaluation déterministe du render() des stories
│   ├── zeroheight-fetch.ts           # Fetch .md ZeroHeight (avec fallback HTML)
│   ├── figma-connect.ts              # Fetch propriétés Figma via REST API (caché)
│   ├── documentation.ts              # Doc transverse (tokens, contenu, guidelines, patterns)
│   ├── deprecated.ts                 # Page "Cycle de vie" ZH (dépréciés + prose schematics)
│   ├── tools.ts                      # Outils SCSS + Angular depuis git tags
│   └── schematics.ts                 # Codemods de migration depuis collection.json (git), version d'intro par diff de tags
│
├── generators/
│   ├── template-renderer.ts          # Rendu Handlebars + cleanZeroHeightMarkdown
│   ├── skill-writer.ts               # Écriture des fichiers (flat par version)
│   ├── toc-writer.ts                 # Génération du SKILL.md par version
│   └── changelog-writer.ts           # Changelog cumulatif par composant (AST diff)
│
└── templates/
    ├── component.hbs                 # API Angular + liens
    ├── design-index.hbs / design-section.hbs
    ├── component-page.hbs            # Page implémentation (notes + stories)
    ├── example.hbs                   # Un story individuel
    ├── type-definition.hbs           # Type énuméré partagé
    ├── changelog.hbs                 # Prose ZH (couche "notes de release")
    └── component-figma.hbs           # Tokens Figma
```

## Flux de génération (par version)

```
1. CLI parse (--version, --component, flags)
2. Résolution version → git tag, ZH release ID, Storybook base URL
3. Doc transverse        → references/documentation/<category>/   (ZH fetch)
4. Dépréciés             → references/documentation/deprecated/deprecated.md  (ZH "Cycle de vie")
5. Schematics            → references/migrations.md                (git collection.json, codemods cumulatifs ≤ cible)
6. Outils                → references/tools/                       (git + ZH)
7. Composants (découverte Storybook + git) — pour chacun :
   a. AST extraction          → PackageAPI (inputs, outputs, models, selectors, types)
   b. ZeroHeight fetch        → design sections + prose changelog
   c. Storybook + story source/eval → exemples Angular + HTML/CSS
   d. Figma REST API          → tokens variantes
   e. Changelog structurel    → AST diff sur tags stables ≤ cible (cumulatif) + prose ZH
   f. Rendu Handlebars + écriture → references/components/<slug>/
   g. Types partagés          → references/types/<TypeName>.md
8. _versions.json (manifeste dist)
9. SKILL.md de la version (toc-writer) — écrit après les fichiers (scanne les composants du disque)
```

## Changelog structurel

`changelog-writer.ts` construit un `<slug>.changelog.md` **cumulatif par composant** :

- walk des **tags git stables** de la majeure (`listStableTags`, pré-releases filtrées), ≤ version cible ;
- pour chaque paire consécutive, `diffPackageApi` (`api-diff.ts`) compare selectors / inputs / outputs / models ;
- **les versions sans changement d'API sont omises** ; extraction AST mémoïsée par `(ngPackage, tag)` ;
- une couche optionnelle « Notes de release (ZeroHeight) » (prose) est ajoutée en fin.

Comme le workflow de montée met à jour **d'abord** (la skill cible est alors installée), le changelog cumulatif de la cible couvre le delta depuis n'importe quelle version de départ. Layout-agnostique (différe des objets AST, pas des dossiers).

## Découverte des composants & métadonnées

La liste des composants est **découverte dynamiquement** (`collectors/component-discovery.ts`) en croisant l'index Storybook et les packages Angular présents au git tag. Le slug d'un composant est son slug Storybook (ex: `userpopover`, `errorpage`) — c'est aussi le nom du dossier généré. `component-metadata.json` ne fait qu'**enrichir** (et est auto-synchronisé par `sync-metadata.ts`, dédup compact).

```jsonc
{
  "userpopover": {
    "zeroheightPagePath": "85b183",
    "figmaNodeIds": ["18202:1181"],
    "figmaName": "pr-UserPopover"
  }
}
```

| Champ | Description |
|-------|-------------|
| `zeroheightPagePath` | Segment de page ZeroHeight (stable entre versions) |
| `figmaNodeIds` | Node IDs Figma pour les design tokens |
| `figmaName` | Nom du composant dans Figma (peut différer du slug Angular) |
| `figmaAliases` | Noms Figma alternatifs (many-to-one) |
| `ngPackageOverride` | Force le mapping vers un package Angular si l'heuristique échoue |

> La résolution slug → clé tolère les écarts de tirets : `findMetadata` compare en forme compacte (sans tirets), donc `userpopover` retrouve une clé `user-popover` et inversement.

### component-map.json (legacy)

Ancien registre central, conservé uniquement pour `--validate` (couverture ZeroHeight). Ses clés (hyphénées) ne servent plus à la génération.

## Versionnement & consommation

- **ZeroHeight** : versionné par release mineure (mapping `ZH_RELEASE_IDS` dans `version-config.ts` — voir ci-dessous).
- **Storybook** : versionné au fix près (`lucca-front.lucca.io/v21.2.3/storybook/`).
- **AST / stories / migrations** : versionné au fix près via git tags.
- **Figma** : reflète l'état courant.

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

Côté consommateur, deux modèles :

- **skill par version** (`lucca-front-<M>-<m>-<p>`) : la version n'est **pas détectée**, la skill installée **est** une version donnée. Pour un repo qui fige une/deux versions.
- **skill agrégat** (`lucca-front-all`) : embarque toutes les versions sous `references/<version>/`, son unique `SKILL.md` **détecte** la version (`node_modules/@lucca-front/ng` puis `package.json`) et compose les chemins. Pour une install globale machine qui sert n'importe quel repo. C'est le seul cas où le check `package.json` est réintroduit (garde-fou « stop si version indéterminée »).

La distribution et la mise à jour sont décrites dans `.github/skills/UPDATE.md`.
