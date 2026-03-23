# generate-skills

Script TypeScript qui génère automatiquement les fichiers `SKILL.md` pour chaque composant du design system Lucca Front. Ces fichiers sont utilisés par **GitHub Copilot** (via VS Code Agent Skills) pour répondre aux questions sur l'utilisation des composants Angular.

Les fichiers générés sont placés dans `.github/skills/lucca-front/resources/`.

## Prérequis

- Node.js avec `ts-node` (inclus dans les dépendances du projet)
- Un token Figma (accès en lecture au fichier de composants)
- Une clé API pour un provider AI (GitHub Models, Anthropic ou OpenAI)
- Le MCP Zeroheight configuré dans VS Code (optionnel — pour les guidelines Prisme)

## Configuration

Copier le fichier d'exemple et renseigner les credentials :

```bash
cp scripts/generate-skills/generate-skills-config.json.example scripts/generate-skills/generate-skills-config.json
```

```json
{
  "ai": {
    "provider": "github-models",
    "model": "gpt-4o-mini",
    "apiKey": "github_pat_...",
    "concurrency": 1
  },
  "figma": {
    "token": "figd_..."
  }
}
```

Le fichier `generate-skills-config.json` est gitignored.
/!\ Attention de ne pas partager votre token github_pat ! Pour des raisons de sécurité, supprimer le après votre utilisation.

### Providers AI supportés

| Provider | `provider` | Obtenir une clé |
|---|---|---|
| GitHub Models | `github-models` | [github.com/settings/tokens](https://github.com/settings/tokens) — token sans permissions requises |
| Anthropic | `anthropic` | [platform.anthropic.com/settings/api-keys](https://platform.anthropic.com/settings/api-keys) |
| OpenAI | `openai` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |


## Utilisation

```bash
# Générer les SKILL.md manquants uniquement
npm run skills:generate

# Régénérer tous les SKILL.md (y compris ceux déjà existants)
npm run skills:generate -- --force

# Afficher les prompts sans écrire de fichiers (debug)
npm run skills:generate -- --dry-run

# Régénérer un seul composant
npm run skills:generate -- --force --component button

# Redétecter automatiquement les associations Figma ↔ Storybook
npm run skills:generate -- --refresh-map
```


## Architecture

```
scripts/generate-skills/
├── index.ts                           # Point d'entrée et orchestration
├── config.ts                          # Chargement et validation de la config
├── types.ts                           # Types TypeScript partagés
├── component-map.json                 # Mapping manuel Figma ↔ Storybook
├── generate-skills-config.json        # Credentials (gitignored)
├── generate-skills-config.json.example
│
├── collectors/
│   ├── figma.ts                       # Récupère les composants depuis Figma
│   ├── storybook.ts                   # Récupère et groupe les stories Storybook
│   └── zeroheight.ts                  # Récupère les guidelines Prisme via MCP
│
├── matchers/
│   └── component-matcher.ts           # Associe Figma ↔ Storybook via component-map.json
│
└── generators/
    ├── ai-client.ts                   # Abstraction multi-provider (GitHub Models / OpenAI / Anthropic)
    ├── prompt-builder.ts              # Construit le prompt envoyé à l'IA
    ├── skill-writer.ts                # Écrit les fichiers SKILL.md sur disque
    └── toc-writer.ts                  # Met à jour la table des matières SKILL.md
```

## Flux de génération

```
Figma API ──────┐
Storybook ──────┼──► component-matcher ──► prompt-builder ──► AI ──► skill-writer ──► SKILL.md
Zeroheight MCP ─┘                                ▲
packages/ng/ ────────────────────────────────────┘
(sélecteurs réels)
```

1. **Collecte** — Récupère en parallèle les composants Figma, l'index Storybook (1 300+ stories) et les guidelines Zeroheight.
2. **Matching** — `component-map.json` associe chaque composant Figma à un ou plusieurs slugs Storybook. C'est le registre central à maintenir manuellement.
3. **Construction du prompt** — Pour chaque composant, le prompt inclut les métadonnées Figma, les liens et le code source des stories Angular, les **vrais sélecteurs Angular** extraits de `packages/ng/` (pour éviter les hallucinations), et les guidelines Prisme.
4. **Génération IA** — L'IA génère le SKILL.md en suivant un format strict (frontmatter YAML, sections standardisées, exemples Angular uniquement).
5. **Écriture** — Le fichier est écrit dans `.github/skills/lucca-front/resources/<slug>.md` et la table des matières `SKILL.md` est mise à jour.

## component-map.json

Ce fichier est le registre central des associations Figma ↔ Storybook. Il doit être maintenu à la main quand de nouveaux composants sont ajoutés au design system.

```jsonc
{
  // Association simple
  "pr-Button": { "slug": "button", "storybook": "Documentation/Actions/Button/Angular" },

  // Association multiple (1 composant Figma → plusieurs SKILL.md)
  "pr-Select": [
    { "slug": "multi-select", "storybook": "Documentation/Forms/Fields/Multi Select/Angular" },
    { "slug": "simple-select", "storybook": "Documentation/Forms/Fields/Simple Select/Angular" }
  ],

  // Pas de story disponible → null
  "pr-Banner": null
}
```

Pour ajouter un nouveau composant :
1. Trouver le nom exact dans Figma
2. Trouver le chemin de la story dans Storybook (titre dans le fichier `.stories.ts`)
3. Ajouter l'entrée dans `component-map.json`
(PS : Copilot est très bon pour ça. Demandez lui !)

4. Lancer `npm run skills:generate -- --component <slug>`
