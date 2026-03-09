# Générateur de Skills pour Lucca Front

Ce script génère des fichiers `skills.md` au format [Agent Skills](https://agentskills.io/specification) pour chaque composant Storybook.

## Objectif

Les fichiers skills permettent :
1. **Documenter** les composants de manière standardisée
2. **Lier à Figma** via Code Connect pour le design-to-code
3. **Guider les agents IA** pour savoir quels composants utiliser lors de l'implémentation d'une maquette

## Installation

Aucune dépendance supplémentaire n'est nécessaire. Le script utilise Node.js natif.

## Scripts disponibles

```bash
# Génération des skills
npm run skills:generate      # Génère tous les skills (nouveaux uniquement)
npm run skills:update        # Met à jour les skills existants
npm run skills:dry-run       # Prévisualise sans modifier

# Liaison Figma
npm run skills:figma-list    # Liste l'état des liaisons Figma
npm run skills:figma-export  # Exporte les mappings en JSON
```

## Utilisation détaillée

### Générer les skills

```bash
# Générer tous les skills (création uniquement pour les nouveaux)
node scripts/generate-skills.js

# Mode dry-run (voir ce qui serait fait sans modifier les fichiers)
node scripts/generate-skills.js --dry-run

# Mettre à jour uniquement les skills existants
node scripts/generate-skills.js --update

# Générer/mettre à jour un composant spécifique
node scripts/generate-skills.js --component button
node scripts/generate-skills.js --component dialog
```

### Gérer les liaisons Figma

```bash
# Lister tous les skills et leur état de liaison
node scripts/link-figma-skills.js --list

# Exporter les mappings en JSON
node scripts/link-figma-skills.js --export

# Lier manuellement un composant à un node Figma
node scripts/link-figma-skills.js --link Button "123:456"
node scripts/link-figma-skills.js --link Dialog "789:012" "abc123def"
```

## Structure d'un skills.md

```markdown
---
description: Description courte du composant
triggers:
  - mot-clé-1
  - mot-clé-2
figma:
  nodeId: "123:456"      # ID du node Figma (à remplir via Code Connect)
  fileKey: "abc123"      # Clé du fichier Figma
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Nom du Composant

## Description
...

## Propriétés
| Propriété | Type | Description |
|-----------|------|-------------|
...

## Exemples
...

## Figma
...
```

## Lier à Figma

### Workflow avec Code Connect MCP

Le workflow recommandé pour lier les composants à Figma :

1. **Ouvrez Figma** sur le composant souhaité dans l'application desktop
2. **Utilisez l'outil MCP** `get_design_context` pour obtenir le nodeId
3. **Liez le composant** avec le script :
   ```bash
   node scripts/link-figma-skills.js --link Button "123:456" "fileKeyABC"
   ```
4. Le nodeId sera **préservé** lors des prochaines mises à jour du skill

### Workflow automatique avec Code Connect

Vous pouvez aussi utiliser les outils MCP Figma directement :

```
# Dans VS Code avec Copilot
1. Sélectionnez un node dans Figma
2. Utilisez get_code_connect_suggestions 
3. Validez avec send_code_connect_mappings
```

### Export pour intégration CI/CD

```bash
npm run skills:figma-export
# Génère scripts/skills-mappings.json
```

Ce fichier JSON peut être utilisé pour :
- Vérifier la couverture des liaisons Figma
- Intégrer dans un workflow de validation
- Générer des rapports de documentation

## Workflow recommandé

1. **Première génération** : `node scripts/generate-skills.js`
2. **Compléter les TODOs** dans chaque skills.md
3. **Lier à Figma** via Code Connect
4. **Mises à jour** : `node scripts/generate-skills.js --update`

## Configuration

Voir `scripts/skills.config.json` pour personnaliser :
- Les triggers par catégorie
- Les chemins des stories
- La configuration Figma par défaut

## Spécifications suivies

- [Agent Skills Specification](https://agentskills.io/specification)
- [Claude Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Anthropic Skill Creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)

