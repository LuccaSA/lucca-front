# generate-skills

Pipeline **déterministe** (zéro IA) qui génère la documentation des composants Lucca Front pour les **Agent Skills**.

Chaque version produit une **skill self-contained** sous `.github/skills/lucca-front/<version>/` : un `SKILL.md` + tous les fichiers `references/` de cette version. Un projet n'installe qu'**une** version (cf. distribution APM, voir `.github/skills/UPDATE.md`).

## Prérequis

- Node.js ≥ 18 avec `ts-node` (inclus dans les dépendances du projet)
- Accès aux git tags du repo (les API, stories, migrations sont extraites depuis le code source via `git show`)
- **Optionnel** : un Figma Personal Access Token (lecture seule) pour les design tokens

## Configuration

```bash
# Variable d'environnement (recommandé)
export FIGMA_TOKEN=figd_...

# Ou copier le fichier d'exemple
cp scripts/generate-skills/generate-skills-config.json.example scripts/generate-skills/generate-skills-config.json
```

`generate-skills-config.json` est gitignored. Le token Figma n'est nécessaire que pour générer les fichiers `.figma.md`.

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
| `--version <M.m.p>` | Version à générer (ex: `21.2.3`). Répétable. **Requis.** |
| `--component <slug>` | Générer uniquement ce composant (n'écrit pas le SKILL.md ni la doc transverse) |
| `--skip-figma` | Ignorer la collecte Figma |
| `--skip-zeroheight` | Ignorer la collecte ZeroHeight |
| `--skip-storybook` | Ignorer la collecte Storybook |
| `--skip-documentation` | Ignorer la doc transverse (tokens, contenu, guidelines, patterns, deprecated) |
| `--skip-tools` | Ignorer les outils (SCSS + Angular tools) |
| `--skip-schematics` | Ignorer les migrations (`migrations.json` git) |
| `--documentation-only` | Ne collecter que doc/outils/schematics (pas les composants) |
| `--dry-run` | N'écrire aucun fichier |
| `--validate` | Vérifier la couverture ZH de `component-map.json` (aucune génération) |

## Sources de données

Le pipeline agrège des sources **toutes déterministes** (pas d'IA) :

| Source | Ce qu'elle fournit | Comment |
|--------|-------------------|---------|
| **AST extraction** | API Angular (inputs, outputs, models, selectors, types) | `git show <tag>:<path>` — lit le code source directement depuis le git tag |
| **AST diff** | Changelog structurel par composant | Diff de l'API entre tags stables consécutifs (`collectors/api-diff.ts`) |
| **ZeroHeight** | Guidelines design, contenu, accessibilité, dépréciations, prose changelog | Fetch du `.md` versionné par release (`/v/<releaseId>/p/<page>.md`) |
| **Storybook** | Liens + code source des stories Angular et HTML/CSS | `index.json` versionné + `git show` pour les templates |
| **Figma REST API** | Propriétés des variantes (taille, palette, état…) | API REST Figma — reflète l'état courant |
| **Schematics (git)** | Migrations `ng update` | `git show <tag>:packages/ng/schematics/migrations.json` |

## Structure de sortie

Layout **flat self-contained par version** (aucun segment de version interne) :

```
.github/skills/lucca-front/
├── _versions.json                    # Manifeste des versions générées (métadonnée dist, hors skill)
├── 21.2.3/                           # Une skill complète (dossier = version bare, cf. path APM)
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
│       └── migrations.md             # Migrations ng update cumulatives ≤ cette version
└── 21.2.2/
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
│   └── schematics.ts                 # Migrations ng update depuis migrations.json (git)
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
5. Schematics            → references/migrations.md                (git migrations.json, cumulatif ≤ cible)
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

- **ZeroHeight** : versionné par release mineure (mapping `version-config.ts`).
- **Storybook** : versionné au fix près (`lucca-front.lucca.io/v21.2.3/storybook/`).
- **AST / stories / migrations** : versionné au fix près via git tags.
- **Figma** : reflète l'état courant.

Côté consommateur, la version n'est **plus détectée** : chaque skill installée **est** une version donnée (dossier `<version>/`), distribuée via APM. La distribution et la mise à jour sont décrites dans `.github/skills/UPDATE.md`.
