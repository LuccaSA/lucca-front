# generate-skills

Pipeline **déterministe** (zéro IA) qui génère la documentation des composants Lucca Front pour les **GitHub Copilot Agent Skills**.

Chaque composant produit un ensemble de fichiers markdown versionnés dans `.github/skills/lucca-front/references/`.

## Prérequis

- Node.js ≥ 18 avec `ts-node` (inclus dans les dépendances du projet)
- Accès aux git tags du repo (les API sont extraites directement depuis le code source via `git show`)
- **Optionnel** : un Figma Personal Access Token (lecture seule) pour les design tokens

## Configuration

La configuration se fait par **variables d'environnement** ou via un fichier JSON optionnel :

```bash
# Variable d'environnement (recommandé)
export FIGMA_TOKEN=figd_...

# Ou copier le fichier d'exemple
cp scripts/generate-skills/generate-skills-config.json.example scripts/generate-skills/generate-skills-config.json
```

`generate-skills-config.json` est gitignored. Le token Figma n'est nécessaire que pour générer les fichiers `.figma.md`.

## Utilisation

```bash
# Générer un composant pour une version spécifique
npx ts-node --project scripts/generate-skills/tsconfig.json \
  scripts/generate-skills/index.ts --version 21.2.1 --component button

# Générer tous les composants pour une version
npx ts-node --project scripts/generate-skills/tsconfig.json \
  scripts/generate-skills/index.ts --version 21.2.1

# Sans Figma / ZeroHeight / Storybook
npx ts-node ... --version 21.2.1 --skip-figma --skip-zeroheight

# Mode dry-run (affiche ce qui serait généré)
npx ts-node ... --version 21.2.1 --dry-run

# Générer plusieurs versions à la fois
npx ts-node ... --version 21.2.1 --version 21.1.4

# Valider la couverture ZH (aucune génération)
npx ts-node ... --validate
```

### Options

| Flag | Description |
|------|-------------|
| `--version <M.m.p>` | Version à générer (ex: `21.2.1`). Répétable. **Requis.** |
| `--component <slug>` | Générer uniquement ce composant |
| `--skip-figma` | Ignorer la collecte Figma |
| `--skip-zeroheight` | Ignorer la collecte ZeroHeight |
| `--skip-storybook` | Ignorer la collecte Storybook |
| `--skip-documentation` | Ignorer la collecte documentation (tokens, contenu, guidelines, patterns) |
| `--skip-tools` | Ignorer la collecte outils (SCSS + Angular tools) |
| `--documentation-only` | Ne collecter que la documentation et les outils (pas les composants) |
| `--dry-run` | N'écrire aucun fichier |
| `--validate` | Vérifier la couverture ZH de component-map.json (aucune génération) |

## Sources de données

Le pipeline agrège **4 sources**, toutes déterministes (pas d'IA) :

| Source | Ce qu'elle fournit | Comment |
|--------|-------------------|---------|
| **AST extraction** | API Angular (inputs, outputs, selectors, types) | Regex sur `git show <tag>:<path>` — lit le code source directement depuis le git tag |
| **ZeroHeight** | Guidelines design, contenu, accessibilité, changelog | Fetch direct du `.md` versionné par release (`/v/<releaseId>/p/<page>.md`) |
| **Storybook** | Liens + code source des stories Angular et HTML/CSS | `index.json` versionné + `git show` pour les templates |
| **Figma REST API** | Propriétés des variantes (taille, palette, état…) | API REST Figma — non versionné (état courant) |

## Structure de sortie

```
.github/skills/lucca-front/
├── SKILL.md                          # Table des matières + routing par version
├── _versions.json                    # Manifeste des versions générées
└── references/
    ├── components/                   # Composants (versionnés par fix)
    │   └── button/
    │       ├── button.figma.md       # Tokens Figma (non versionné)
    │       ├── button.changelog.md   # Changelog (non versionné)
    │       ├── v21.2.1/
    │       │   ├── button.md         # API Angular (~40 lignes)
    │       │   ├── button.component.md
    │       │   ├── design/
    │       │   │   ├── _index.md
    │       │   │   ├── design.md
    │       │   │   └── content.md
    │       │   └── stories/
    │       │       ├── angular-basic.md
    │       │       └── html-size.md
    │       └── v21.2.0/
    │           └── ...
    ├── documentation/                # Documentation transverse (versionnée par mineure)
    │   ├── tokens/v21.2/             # Couleurs, typo, espacements, élévations, arrondis
    │   ├── content/v21.2/            # Règles de rédaction, contenu
    │   ├── guidelines/v21.2/         # Guidelines dev UI
    │   ├── patterns/v21.2/           # Design patterns (formulaires, responsive, IA…)
    │   └── deprecated.md             # Liste des composants dépréciés + remplacements
    └── tools/                        # Outils SCSS + Angular (versionnés par mineure)
        └── v21.2/
            ├── animations.md         # Keyframes / animations SCSS
            ├── mixins.md             # Mixins (a11y, media, color, text…)
            ├── numbers.md            # Helpers nombres (LuNumberPipe…)
            ├── scrollbox.md          # Scrollbox
            └── utilitaires.md        # Classes utilitaires
```

Le fichier principal `button.md` contient uniquement l'import, le basic usage, la table d'API et les liens vers les sous-fichiers. Cela minimise la consommation de tokens quand l'agent n'a besoin que de l'API.

## Architecture du pipeline

```
scripts/generate-skills/
├── index.ts                          # Point d'entrée, orchestration, CLI
├── config.ts                         # Chargement config (env + JSON)
├── types.ts                          # Types TypeScript partagés
├── version-config.ts                 # Résolution version → tag, ZH releaseId, SB URL
├── component-metadata.json           # Métadonnées par composant (ZH path, Figma node IDs/name/aliases)
├── component-map.json                # Registre legacy — utilisé uniquement par --validate (couverture ZH)
├── documentation-map.json            # Registre des pages documentation (tokens, contenu, etc.)
│
├── collectors/
│   ├── ast-extractor.ts              # Extraction API Angular par regex depuis git tags
│   ├── storybook.ts                  # Fetch index.json Storybook + groupement par slug
│   ├── story-source.ts               # Lecture du code source des stories via git show
│   ├── zeroheight-fetch.ts           # Fetch .md ZeroHeight (avec fallback HTML)
│   ├── figma-connect.ts              # Fetch propriétés Figma via REST API
│   ├── documentation.ts              # Collecte documentation transverse (tokens, contenu, patterns)
│   └── tools.ts                      # Collecte outils SCSS + Angular depuis git tags
│
├── generators/
│   ├── template-renderer.ts          # Rendu Handlebars + cleanZeroHeightMarkdown
│   ├── skill-writer.ts               # Écriture des fichiers (components/ + documentation/ + tools/)
│   └── toc-writer.ts                 # Génération du SKILL.md (TOC + routing)
│
└── templates/
    ├── component.hbs                 # API Angular + liens
    ├── design-index.hbs              # Index des sections design
    ├── design-section.hbs            # Une section design
    ├── component-page.hbs            # Page implémentation (notes + stories)
    ├── example.hbs                   # Un story individuel
    ├── changelog.hbs                 # Changelog
    └── component-figma.hbs           # Tokens Figma
```

## Flux de génération

```
1. CLI parse (--version, --component, flags)
2. Résolution version → git tag, ZH release ID, Storybook base URL
3. Découverte dynamique des composants (index Storybook + packages git) + métadonnées (component-metadata.json) + documentation-map.json
4. Documentation transverse (par version) :
   a. ZeroHeight fetch      → tokens, contenu, guidelines, patterns (.md versionnés par mineure)
   b. Écriture              → references/documentation/<category>/v<M>.<m>/
5. Outils (par version) :
   a. Git show              → SCSS mixins/keyframes/fonctions + Angular animations/pipes
   b. Écriture              → references/tools/v<M>.<m>/
6. Composants (par version) :
   a. Fetch Storybook index.json (versionné)
   b. Pour chaque composant :
      i.   AST extraction        → PackageAPI (inputs, outputs, selectors, types)
      ii.  ZeroHeight fetch      → markdown brut → split par H1 (design sections + changelog)
      iii. Storybook match       → StorybookGroup (stories, docs entry)
      iv.  Story source (git)    → StoryExample[] (code inline Angular + HTML/CSS)
      v.   Basic usage extract   → template HTML minimal
      vi.  Figma REST API        → FigmaDesignTokens (propriétés variantes)
      vii. Rendu Handlebars      → fichiers .md
      viii.Écriture disque       → references/components/<slug>/v<M>.<m>.<p>/
7. Mise à jour _versions.json
8. Mise à jour SKILL.md (TOC)
```

## Découverte des composants & métadonnées

La liste des composants n'est plus maintenue à la main : elle est **découverte dynamiquement** par `collectors/component-discovery.ts` en croisant l'index Storybook (versionné) et les packages Angular présents au git tag. Le slug d'un composant est son slug Storybook (ex: `userpopover`, `errorpage`) — c'est aussi le nom du dossier généré.

`component-metadata.json` ne fait qu'**enrichir** cette découverte. Chaque entrée est indexée par slug (aligné sur le dossier) :

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

Ancien registre central, conservé uniquement pour `--validate` (couverture ZeroHeight). Seules ses **valeurs** `zeroheightPagePath` sont lues ; ses clés ne servent plus à la génération. Ses champs `since`/`category` reflètent la version design-system d'origine (ex: `19.1`), pas la plage de versions couverte par la skill.

## Versionnement

- **ZeroHeight** : versionné par release mineure (ex: v21.2 = release ID `47452`). Mapping dans `version-config.ts`.
- **Storybook** : versionné au fix près (`lucca-front.lucca.io/v21.2.1/storybook/`).
- **AST** : versionné au fix près via git tags (`git show v21.2.1:packages/ng/button/...`).
- **Figma** : non versionné (toujours l'état courant).

L'agent consommateur lit la version de `@lucca-front/ng` dans le `package.json` du projet et navigue vers le dossier correspondant.
