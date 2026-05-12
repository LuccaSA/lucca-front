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
    └── tools/                        # Outils SCSS + Angular (versionnés par fix)
        └── v21.2.1/
            ├── animations.md         # Keyframes SCSS
            ├── functions.md          # pxToRem, flatMap…
            ├── mixins-*.md           # Mixins (a11y, media, color, text…)
            ├── ng-animations.md      # Angular animations (fade, scale, slide)
            └── ng-number.md          # LuNumberPipe
```

Le fichier principal `button.md` contient uniquement l'import, le basic usage, la table d'API et les liens vers les sous-fichiers. Cela minimise la consommation de tokens quand l'agent n'a besoin que de l'API.

## Architecture du pipeline

```
scripts/generate-skills/
├── index.ts                          # Point d'entrée, orchestration, CLI
├── config.ts                         # Chargement config (env + JSON)
├── types.ts                          # Types TypeScript partagés
├── version-config.ts                 # Résolution version → tag, ZH releaseId, SB URL
├── component-map.json                # Registre des 99 composants (slug, packages, Figma IDs…)
├── documentation-map.json            # Registre des 48 pages documentation (tokens, contenu, etc.)
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
3. Chargement component-map.json + documentation-map.json
4. Documentation transverse (par version) :
   a. ZeroHeight fetch      → tokens, contenu, guidelines, patterns (.md versionnés par mineure)
   b. Écriture              → references/documentation/<category>/v<M>.<m>/
5. Outils (par version) :
   a. Git show              → SCSS mixins/keyframes/fonctions + Angular animations/pipes
   b. Écriture              → references/tools/v<M>.<m>.<p>/
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

## component-map.json

Registre central des composants. Chaque entrée est indexée par slug :

```jsonc
{
  "button": {
    "storybookSlug": "button",
    "zeroheightPagePath": "098404-button",
    "ngPackage": "button",
    "figmaNodeIds": ["6854:42773"],
    "category": "Actions",
    "since": "17.0.0"
  }
}
```

| Champ | Description |
|-------|-------------|
| `storybookSlug` | Slug pour matcher dans l'index Storybook (optionnel si pas de stories) |
| `zeroheightPagePath` | Segment de page ZeroHeight (stable entre versions) |
| `ngPackage` | Nom du package Angular (optionnel pour les composants CSS-only) |
| `figmaNodeIds` | Node IDs Figma pour les design tokens |
| `figmaAliases` | Noms Figma alternatifs (many-to-one) |
| `category` | Catégorie pour le TOC |
| `since` / `until` | Plage de versions où le composant existe |

## Versionnement

- **ZeroHeight** : versionné par release mineure (ex: v21.2 = release ID `47452`). Mapping dans `version-config.ts`.
- **Storybook** : versionné au fix près (`lucca-front.lucca.io/v21.2.1/storybook/`).
- **AST** : versionné au fix près via git tags (`git show v21.2.1:packages/ng/button/...`).
- **Figma** : non versionné (toujours l'état courant).

L'agent consommateur lit la version de `@lucca-front/ng` dans le `package.json` du projet et navigue vers le dossier correspondant.
