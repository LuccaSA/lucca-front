#!/usr/bin/env node

/**
 * Script de génération/mise à jour des fichiers skills.md pour chaque story
 *
 * Basé sur les spécifications :
 * - https://agentskills.io/specification
 * - https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
 * - https://github.com/anthropics/skills/tree/main/skills/skill-creator
 *
 * Usage: node scripts/generate-skills.js [--update] [--dry-run] [--component <name>]
 */

const fs = require('fs');
const path = require('path');

// Configuration
const STORIES_ROOT = path.join(__dirname, '..', 'stories', 'documentation');
const PACKAGES_ROOT = path.join(__dirname, '..', 'packages', 'ng');

// Arguments CLI
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const UPDATE_ONLY = args.includes('--update');
const COMPONENT_FILTER = args.includes('--component')
  ? args[args.indexOf('--component') + 1]
  : null;

/**
 * Parse un fichier story TypeScript pour extraire les métadonnées
 */
function parseStoryFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const metadata = {
    title: null,
    component: null,
    imports: [],
    argTypes: {},
    description: null,
  };

  // Extraire le title
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  if (titleMatch) {
    metadata.title = titleMatch[1];
  }

  // Extraire les imports @lucca-front
  const importMatches = content.matchAll(/import\s*{([^}]+)}\s*from\s*['"]@lucca-front\/ng\/([^'"]+)['"]/g);
  for (const match of importMatches) {
    const components = match[1].split(',').map(c => c.trim());
    const packageName = match[2];
    metadata.imports.push({ components, package: packageName });
  }

  // Extraire le component principal
  const componentMatch = content.match(/component:\s*(\w+)/);
  if (componentMatch) {
    metadata.component = componentMatch[1];
  }

  // Extraire les argTypes avec descriptions
  const argTypesMatch = content.match(/argTypes:\s*{([^}]+(?:{[^}]*}[^}]*)*)}/s);
  if (argTypesMatch) {
    const argTypesContent = argTypesMatch[1];

    // Parser chaque argType
    const argMatches = argTypesContent.matchAll(/(\w+):\s*{([^}]+(?:{[^}]*}[^}]*)*)}/gs);
    for (const match of argMatches) {
      const argName = match[1];
      const argContent = match[2];

      const descMatch = argContent.match(/description:\s*['"`]([^'"`]+)['"`]/);
      const optionsMatch = argContent.match(/options:\s*\[([^\]]+)\]/);
      const typeMatch = argContent.match(/type:\s*['"`]([^'"`]+)['"`]/);

      metadata.argTypes[argName] = {
        description: descMatch ? descMatch[1] : null,
        options: optionsMatch ? optionsMatch[1].split(',').map(o => o.trim().replace(/['"]/g, '')) : null,
        type: typeMatch ? typeMatch[1] : null,
      };
    }
  }

  return metadata;
}

/**
 * Trouve tous les fichiers story dans un dossier
 */
function findStoryFiles(dir) {
  const stories = [];

  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) return;

    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (item.endsWith('.stories.ts') && !item.includes('.spec.')) {
        stories.push(fullPath);
      }
    }
  }

  walk(dir);
  return stories;
}

/**
 * Détermine le nom du composant à partir du chemin
 */
function getComponentNameFromPath(storyPath) {
  const relativePath = path.relative(STORIES_ROOT, storyPath);
  const parts = relativePath.split(path.sep);

  // Trouver le nom du composant (généralement le dossier parent ou le fichier)
  // Ex: actions/button/angular/button-basic.stories.ts -> Button
  // Ex: overlays/dialog/dialog-basic.stories.ts -> Dialog

  for (let i = parts.length - 2; i >= 0; i--) {
    const part = parts[i];
    if (part !== 'angular' && part !== 'html&css') {
      return capitalize(part.replace(/-/g, ' '));
    }
  }

  return path.basename(storyPath, '.stories.ts');
}

/**
 * Extrait la catégorie du chemin de la story
 */
function getCategoryFromPath(storyPath) {
  const relativePath = path.relative(STORIES_ROOT, storyPath);
  const parts = relativePath.split(path.sep);
  return parts[0] ? capitalize(parts[0]) : 'General';
}

/**
 * Génère les triggers pour un composant
 */
function generateTriggers(componentName, metadata, category) {
  const triggers = new Set();

  // Nom du composant et variantes
  const baseName = componentName.toLowerCase().replace(/\s+/g, '-');
  triggers.add(baseName);
  triggers.add(componentName.toLowerCase().replace(/\s+/g, ''));

  // Ajouter les imports comme triggers
  for (const imp of metadata.imports) {
    triggers.add(imp.package);
    for (const comp of imp.components) {
      triggers.add(comp.replace(/Component|Directive|Module/g, '').toLowerCase());
    }
  }

  // Triggers basés sur la catégorie
  const categoryTriggers = {
    'Actions': ['click', 'action', 'interactive'],
    'Forms': ['input', 'form', 'field', 'control'],
    'Overlays': ['modal', 'popup', 'overlay', 'layer'],
    'Feedback': ['notification', 'message', 'alert'],
    'Navigation': ['nav', 'menu', 'navigate'],
    'Listings': ['list', 'table', 'data', 'grid'],
    'Loaders': ['loading', 'spinner', 'progress'],
    'Texts': ['text', 'typography', 'content'],
  };

  if (categoryTriggers[category]) {
    for (const t of categoryTriggers[category]) {
      triggers.add(t);
    }
  }

  return Array.from(triggers).filter(t => t && t.length > 1);
}

/**
 * Génère le contenu du skills.md
 */
function generateSkillContent(componentName, category, metadata, storyDir, existingSkill = null) {
  const triggers = generateTriggers(componentName, metadata, category);

  // Préserver les données Figma existantes si présentes
  let figmaNodeId = null;
  let figmaFileKey = null;

  if (existingSkill) {
    const nodeIdMatch = existingSkill.match(/nodeId:\s*["']?([^"'\n]+)["']?/);
    const fileKeyMatch = existingSkill.match(/fileKey:\s*["']?([^"'\n]+)["']?/);
    if (nodeIdMatch && nodeIdMatch[1] !== 'null') figmaNodeId = nodeIdMatch[1].trim();
    if (fileKeyMatch && fileKeyMatch[1] !== 'null') figmaFileKey = fileKeyMatch[1].trim();
  }

  // Construire les globs pour les fichiers cibles
  const globs = ['**/*.ts', '**/*.html'];

  // Générer la table des propriétés
  let propertiesTable = '';
  if (Object.keys(metadata.argTypes).length > 0) {
    propertiesTable = `\n## Propriétés\n\n| Propriété | Type | Description |\n|-----------|------|-------------|\n`;
    for (const [name, info] of Object.entries(metadata.argTypes)) {
      const type = info.options ? info.options.join(' \\| ') : (info.type || 'any');
      const desc = info.description ? info.description.replace(/\|/g, '\\|').replace(/<[^>]+>/g, '') : '-';
      propertiesTable += `| ${name} | ${type} | ${desc} |\n`;
    }
  }

  // Générer les imports
  let importsSection = '';
  if (metadata.imports.length > 0) {
    importsSection = `\n## Imports\n\n\`\`\`typescript\n`;
    for (const imp of metadata.imports) {
      importsSection += `import { ${imp.components.join(', ')} } from '@lucca-front/ng/${imp.package}';\n`;
    }
    importsSection += `\`\`\`\n`;
  }

  // Construire le contenu
  const content = `---
description: ${componentName} component from Lucca Front design system
triggers:
${triggers.map(t => `  - ${t}`).join('\n')}
figma:
  nodeId: ${figmaNodeId || 'null'}
  fileKey: ${figmaFileKey || 'null'}
globs:
${globs.map(g => `  - "${g}"`).join('\n')}
alwaysApply: false
---

# ${componentName}

## Description

${componentName} est un composant de la catégorie **${category}** du design system Lucca Front.

${metadata.title ? `**Story path:** \`${metadata.title}\`` : ''}
${metadata.component ? `\n**Component:** \`${metadata.component}\`` : ''}
${importsSection}
${propertiesTable}
## Utilisation

### Quand utiliser ${componentName}

<!-- TODO: Décrire les cas d'usage appropriés -->

### Quand ne pas utiliser

<!-- TODO: Décrire les cas où un autre composant serait plus approprié -->

## Exemples

### Exemple basique

\`\`\`html
<!-- TODO: Ajouter un exemple de code basique -->
\`\`\`

### Exemple avancé

\`\`\`typescript
<!-- TODO: Ajouter un exemple de code avancé -->
\`\`\`

## Accessibilité

<!-- TODO: Documenter les considérations d'accessibilité -->

## Figma

${figmaNodeId ? `Ce composant est lié au node Figma \`${figmaNodeId}\`.` : '⚠️ Ce composant n\'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.'}

## Voir aussi

<!-- TODO: Lister les composants liés -->
`;

  return content;
}

/**
 * Capitalise la première lettre
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Groupe les stories par composant/dossier
 */
function groupStoriesByComponent(storyFiles) {
  const groups = new Map();

  for (const storyPath of storyFiles) {
    const dir = path.dirname(storyPath);
    const componentName = getComponentNameFromPath(storyPath);

    // Trouver le dossier parent du composant (pas angular ou html&css)
    let componentDir = dir;
    const dirName = path.basename(dir);
    if (dirName === 'angular' || dirName === 'html&css') {
      componentDir = path.dirname(dir);
    }

    if (!groups.has(componentDir)) {
      groups.set(componentDir, {
        name: componentName,
        stories: [],
        dir: componentDir,
      });
    }

    groups.get(componentDir).stories.push(storyPath);
  }

  return groups;
}

/**
 * Point d'entrée principal
 */
async function main() {
  console.log('🔍 Recherche des fichiers story...\n');

  const storyFiles = findStoryFiles(STORIES_ROOT);
  console.log(`📚 ${storyFiles.length} fichiers story trouvés\n`);

  const groups = groupStoriesByComponent(storyFiles);
  console.log(`📦 ${groups.size} composants identifiés\n`);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const [componentDir, group] of groups) {
    const componentName = group.name;

    // Filtrer si demandé
    if (COMPONENT_FILTER && !componentName.toLowerCase().includes(COMPONENT_FILTER.toLowerCase())) {
      continue;
    }

    const skillPath = path.join(componentDir, 'skills.md');
    const skillExists = fs.existsSync(skillPath);

    // Si --update et le fichier n'existe pas, skip
    if (UPDATE_ONLY && !skillExists) {
      skipped++;
      continue;
    }

    // Parser toutes les stories du composant pour collecter les métadonnées
    let combinedMetadata = {
      title: null,
      component: null,
      imports: [],
      argTypes: {},
    };

    for (const storyPath of group.stories) {
      try {
        const metadata = parseStoryFile(storyPath);

        if (metadata.title && !combinedMetadata.title) {
          combinedMetadata.title = metadata.title;
        }
        if (metadata.component && !combinedMetadata.component) {
          combinedMetadata.component = metadata.component;
        }

        // Merger les imports
        for (const imp of metadata.imports) {
          const existing = combinedMetadata.imports.find(i => i.package === imp.package);
          if (existing) {
            for (const comp of imp.components) {
              if (!existing.components.includes(comp)) {
                existing.components.push(comp);
              }
            }
          } else {
            combinedMetadata.imports.push({ ...imp });
          }
        }

        // Merger les argTypes
        combinedMetadata.argTypes = { ...combinedMetadata.argTypes, ...metadata.argTypes };
      } catch (e) {
        console.warn(`⚠️  Erreur parsing ${storyPath}: ${e.message}`);
      }
    }

    const category = getCategoryFromPath(group.stories[0]);
    const existingSkill = skillExists ? fs.readFileSync(skillPath, 'utf-8') : null;
    const content = generateSkillContent(componentName, category, combinedMetadata, componentDir, existingSkill);

    if (DRY_RUN) {
      console.log(`[DRY-RUN] ${skillExists ? 'Mise à jour' : 'Création'}: ${path.relative(STORIES_ROOT, skillPath)}`);
    } else {
      fs.writeFileSync(skillPath, content, 'utf-8');

      if (skillExists) {
        console.log(`✏️  Mis à jour: ${path.relative(STORIES_ROOT, skillPath)}`);
        updated++;
      } else {
        console.log(`✨ Créé: ${path.relative(STORIES_ROOT, skillPath)}`);
        created++;
      }
    }
  }

  console.log('\n📊 Résumé:');
  console.log(`   ✨ Créés: ${created}`);
  console.log(`   ✏️  Mis à jour: ${updated}`);
  console.log(`   ⏭️  Ignorés: ${skipped}`);

  if (DRY_RUN) {
    console.log('\n💡 Mode dry-run actif. Aucun fichier n\'a été modifié.');
    console.log('   Relancez sans --dry-run pour appliquer les changements.');
  }
}

main().catch(console.error);

