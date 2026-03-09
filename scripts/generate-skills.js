#!/usr/bin/env node

/**
 * Script de génération/mise à jour des fichiers skills.md pour chaque story
 *
 * Génère des skills.md riches avec :
 * - Description détaillée extraite des stories et du code source
 * - Propriétés complètes avec types et valeurs par défaut
 * - Exemples de code extraits des templates des stories
 * - Classes CSS documentées
 * - Guide d'utilisation et d'accessibilité
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
const PACKAGES_NG_ROOT = path.join(__dirname, '..', 'packages', 'ng');
const PACKAGES_PRISME_ROOT = path.join(__dirname, '..', 'packages', 'prisme');

// Arguments CLI
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const UPDATE_ONLY = args.includes('--update');
const COMPONENT_FILTER = args.includes('--component')
  ? args[args.indexOf('--component') + 1]
  : null;

// Descriptions et triggers enrichis par catégorie
const CATEGORY_CONFIG = {
  'Actions': {
    description: 'Composants interactifs pour déclencher des actions utilisateur',
    triggers: ['click', 'action', 'interactive', 'cta'],
    usage: {
      when: ['Actions utilisateur', 'Déclenchement d\'événements', 'Soumission de formulaires'],
      whenNot: ['Navigation simple (utiliser Link)', 'Affichage d\'informations statiques'],
    },
    a11y: [
      'Utiliser des éléments sémantiques appropriés (<button>, <a>)',
      'Fournir un texte alternatif pour les éléments visuels',
      'Assurer un contraste suffisant',
    ],
  },
  'Forms': {
    description: 'Composants pour la saisie et validation de données utilisateur',
    triggers: ['input', 'form', 'field', 'control', 'validation', 'saisie'],
    usage: {
      when: ['Saisie de données', 'Formulaires', 'Configuration', 'Filtres'],
      whenNot: ['Affichage de données en lecture seule', 'Navigation'],
    },
    a11y: [
      'Associer chaque champ à un label avec for/id',
      'Fournir des messages d\'erreur explicites',
      'Supporter la navigation au clavier',
      'Indiquer les champs obligatoires',
    ],
  },
  'Overlays': {
    description: 'Composants affichés par-dessus le contenu principal',
    triggers: ['modal', 'popup', 'overlay', 'layer', 'dialog', 'floating'],
    usage: {
      when: ['Confirmations importantes', 'Formulaires contextuels', 'Informations complémentaires'],
      whenNot: ['Contenu principal de la page', 'Navigation fréquente'],
    },
    a11y: [
      'Gérer le focus trap dans les modales',
      'Permettre la fermeture avec Escape',
      'Annoncer l\'ouverture aux lecteurs d\'écran',
      'Utiliser aria-modal et role="dialog"',
    ],
  },
  'Feedback': {
    description: 'Composants pour communiquer des informations et états à l\'utilisateur',
    triggers: ['notification', 'message', 'alert', 'status', 'feedback', 'info'],
    usage: {
      when: ['Messages de succès/erreur', 'Alertes importantes', 'Informations contextuelles'],
      whenNot: ['Contenu principal', 'Actions utilisateur'],
    },
    a11y: [
      'Utiliser aria-live pour les messages dynamiques',
      'Associer le rôle approprié (alert, status)',
      'Ne pas reposer uniquement sur la couleur',
    ],
  },
  'Navigation': {
    description: 'Composants pour la navigation dans l\'application',
    triggers: ['nav', 'menu', 'navigate', 'route', 'link', 'breadcrumb'],
    usage: {
      when: ['Navigation entre pages', 'Menus', 'Fil d\'Ariane', 'Pagination'],
      whenNot: ['Actions (utiliser Button)', 'Affichage de données'],
    },
    a11y: [
      'Utiliser des landmarks nav appropriés',
      'Indiquer la page courante avec aria-current',
      'Supporter la navigation au clavier',
    ],
  },
  'Listings': {
    description: 'Composants pour afficher des listes et collections de données',
    triggers: ['list', 'table', 'data', 'grid', 'collection', 'items'],
    usage: {
      when: ['Affichage de collections', 'Tableaux de données', 'Listes d\'éléments'],
      whenNot: ['Élément unique', 'Formulaires'],
    },
    a11y: [
      'Utiliser des structures sémantiques (table, ul, ol)',
      'Fournir des en-têtes pour les tableaux',
      'Supporter le tri et la pagination accessibles',
    ],
  },
  'Loaders': {
    description: 'Composants pour indiquer un chargement ou une progression',
    triggers: ['loading', 'spinner', 'progress', 'wait', 'skeleton'],
    usage: {
      when: ['Chargement de données', 'Actions asynchrones', 'Progression'],
      whenNot: ['Contenu disponible immédiatement'],
    },
    a11y: [
      'Annoncer le chargement avec aria-busy',
      'Fournir un texte alternatif descriptif',
      'Informer de la fin du chargement',
    ],
  },
  'Texts': {
    description: 'Composants pour la typographie et le contenu textuel',
    triggers: ['text', 'typography', 'content', 'label', 'badge', 'tag'],
    usage: {
      when: ['Mise en forme de texte', 'Labels', 'Badges', 'Tags'],
      whenNot: ['Actions interactives', 'Formulaires'],
    },
    a11y: [
      'Utiliser une hiérarchie de titres logique',
      'Assurer un contraste de texte suffisant',
      'Éviter le texte dans les images',
    ],
  },
  'Structure': {
    description: 'Composants pour structurer la mise en page',
    triggers: ['layout', 'container', 'structure', 'grid', 'box', 'card'],
    usage: {
      when: ['Organisation du contenu', 'Mise en page', 'Conteneurs'],
      whenNot: ['Composants interactifs'],
    },
    a11y: [
      'Utiliser des landmarks appropriés',
      'Maintenir un ordre de lecture logique',
      'Structurer le contenu de manière sémantique',
    ],
  },
  'Users': {
    description: 'Composants pour afficher des informations utilisateur',
    triggers: ['user', 'avatar', 'profile', 'person', 'employee'],
    usage: {
      when: ['Affichage d\'utilisateurs', 'Avatars', 'Profils'],
      whenNot: ['Données non liées aux utilisateurs'],
    },
    a11y: [
      'Fournir un texte alternatif pour les avatars',
      'Ne pas reposer uniquement sur les images',
    ],
  },
  'Toolbox': {
    description: 'Utilitaires et fonctions helpers',
    triggers: ['utility', 'helper', 'tool', 'format', 'pipe'],
    usage: {
      when: ['Formatage de données', 'Utilitaires réutilisables'],
      whenNot: ['Composants visuels'],
    },
    a11y: [
      'S\'assurer que les données formatées restent accessibles',
    ],
  },
  'Integration': {
    description: 'Composants d\'intégration et utilitaires',
    triggers: ['integration', 'utility', 'helper'],
    usage: {
      when: ['Intégration de services', 'Utilitaires'],
      whenNot: ['Composants visuels autonomes'],
    },
    a11y: [
      'Vérifier l\'accessibilité des composants intégrés',
    ],
  },
  'Intl': {
    description: 'Composants d\'internationalisation',
    triggers: ['intl', 'i18n', 'translation', 'locale', 'language'],
    usage: {
      when: ['Traductions', 'Formatage localisé', 'Pluralisation'],
      whenNot: ['Contenu non internationalisé'],
    },
    a11y: [
      'Utiliser lang pour indiquer la langue',
      'S\'assurer que les traductions sont complètes',
    ],
  },
};

/**
 * Parse un fichier story TypeScript pour extraire les métadonnées enrichies
 */
function parseStoryFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const metadata = {
    title: null,
    component: null,
    imports: [],
    argTypes: {},
    templates: [],
    cssClasses: [],
    storyName: path.basename(filePath, '.stories.ts'),
  };

  // Extraire le title
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  if (titleMatch) {
    metadata.title = titleMatch[1];
  }

  // Extraire les imports @lucca-front
  const importMatches = content.matchAll(/import\s*{([^}]+)}\s*from\s*['"]@lucca-front\/ng\/([^'"]+)['"]/g);
  for (const match of importMatches) {
    const components = match[1].split(',').map(c => c.trim()).filter(c => c);
    const packageName = match[2];
    metadata.imports.push({ components, package: packageName });
  }

  // Extraire les imports @lucca/prisme
  const prismeImportMatches = content.matchAll(/import\s*{([^}]+)}\s*from\s*['"]@lucca\/prisme\/([^'"]+)['"]/g);
  for (const match of prismeImportMatches) {
    const components = match[1].split(',').map(c => c.trim()).filter(c => c);
    const packageName = match[2];
    metadata.imports.push({ components, package: packageName, isPrisme: true });
  }

  // Extraire le component principal
  const componentMatch = content.match(/component:\s*(\w+)/);
  if (componentMatch) {
    metadata.component = componentMatch[1];
  }

  // Extraire les templates HTML
  const templateMatches = content.matchAll(/template:\s*[`'"]([^`'"]+)[`'"]/gs);
  for (const match of templateMatches) {
    metadata.templates.push(match[1].trim());
  }

  // Extraire les templates de getTemplate
  const getTemplateMatches = content.matchAll(/return\s*[`'"]([^`'"]*(?:<[^>]+>[^`'"]*)*)[`'"]/gs);
  for (const match of getTemplateMatches) {
    const template = match[1].trim();
    if (template.includes('<') && template.length > 10) {
      metadata.templates.push(template);
    }
  }

  // Extraire les classes CSS utilisées
  const classMatches = content.matchAll(/class="([^"]+)"/g);
  for (const match of classMatches) {
    const classes = match[1].split(/\s+/);
    for (const cls of classes) {
      if (cls && !cls.includes('${') && !metadata.cssClasses.includes(cls)) {
        metadata.cssClasses.push(cls);
      }
    }
  }

  // Extraire les argTypes avec descriptions
  const argTypesMatch = content.match(/argTypes:\s*{([\s\S]*?)(?=\n\s*}\s*(?:as Meta|,|\n))/);
  if (argTypesMatch) {
    const argTypesContent = argTypesMatch[1];

    // Parser chaque argType
    const argRegex = /(\w+):\s*{([^}]*(?:{[^}]*}[^}]*)*)}/g;
    let argMatch;
    while ((argMatch = argRegex.exec(argTypesContent)) !== null) {
      const argName = argMatch[1];
      const argContent = argMatch[2];

      const descMatch = argContent.match(/description:\s*['"`]([^'"`]+)['"`]/);
      const optionsMatch = argContent.match(/options:\s*\[([^\]]+)\]/);
      const typeMatch = argContent.match(/type:\s*['"`]([^'"`]+)['"`]/);
      const defaultMatch = argContent.match(/defaultValue:\s*['"`]?([^'"`\n,}]+)['"`]?/);

      metadata.argTypes[argName] = {
        description: descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : null,
        options: optionsMatch ? optionsMatch[1].split(',').map(o => o.trim().replace(/['"]/g, '')).filter(o => o) : null,
        type: typeMatch ? typeMatch[1] : null,
        default: defaultMatch ? defaultMatch[1].trim() : null,
      };
    }
  }

  // Extraire les args par défaut
  const argsMatch = content.match(/args:\s*{([^}]+)}/);
  if (argsMatch) {
    const argsContent = argsMatch[1];
    const argDefaults = argsContent.matchAll(/(\w+):\s*(['"`]?[^,\n}]+['"`]?)/g);
    for (const match of argDefaults) {
      const argName = match[1];
      let argValue = match[2].trim().replace(/['"]/g, '');
      if (metadata.argTypes[argName] && !metadata.argTypes[argName].default) {
        metadata.argTypes[argName].default = argValue;
      }
    }
  }

  return metadata;
}

/**
 * Parse le code source du composant Angular pour extraire les inputs
 */
function parseComponentSource(packageName) {
  const possiblePaths = [
    path.join(PACKAGES_NG_ROOT, packageName),
    path.join(PACKAGES_PRISME_ROOT, packageName),
  ];

  for (const pkgPath of possiblePaths) {
    if (!fs.existsSync(pkgPath)) continue;

    // Chercher les fichiers .component.ts
    const files = fs.readdirSync(pkgPath);
    for (const file of files) {
      if (file.endsWith('.component.ts')) {
        const filePath = path.join(pkgPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        const inputs = [];

        // Extraire les inputs avec input()
        const inputMatches = content.matchAll(/\/\*\*\s*\n\s*\*\s*([^*]+)\s*\*\/\s*\n\s*readonly\s+(\w+)\s*=\s*input<([^>]+)>\(([^)]*)\)/gs);
        for (const match of inputMatches) {
          inputs.push({
            name: match[2],
            type: match[3].trim(),
            description: match[1].trim(),
            default: match[4] ? match[4].split(',')[0].trim().replace(/['"]/g, '') : null,
          });
        }

        // Extraire les inputs avec @Input()
        const decoratorMatches = content.matchAll(/@Input\(\)\s+(?:set\s+)?(\w+)[\s:]/g);
        for (const match of decoratorMatches) {
          if (!inputs.find(i => i.name === match[1])) {
            inputs.push({
              name: match[1],
              type: 'any',
              description: null,
              default: null,
            });
          }
        }

        return inputs;
      }
    }
  }

  return [];
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

  for (let i = parts.length - 2; i >= 0; i--) {
    const part = parts[i];
    if (part !== 'angular' && part !== 'html&css' && part !== 'HTML&CSS' && part !== 'Angular') {
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

  // Version française si applicable
  const frenchNames = {
    'button': 'bouton',
    'link': 'lien',
    'dialog': 'dialogue',
    'table': 'tableau',
    'list': 'liste',
    'form': 'formulaire',
    'input': 'saisie',
    'checkbox': 'case-a-cocher',
    'radio': 'bouton-radio',
    'select': 'selection',
    'dropdown': 'menu-deroulant',
    'loading': 'chargement',
    'progress': 'progression',
    'alert': 'alerte',
    'notification': 'notification',
    'avatar': 'avatar',
    'card': 'carte',
    'badge': 'badge',
    'chip': 'etiquette',
    'tooltip': 'infobulle',
    'popover': 'popover',
    'modal': 'modale',
    'sidebar': 'barre-laterale',
    'header': 'en-tete',
    'footer': 'pied-de-page',
    'breadcrumb': 'fil-d-ariane',
    'pagination': 'pagination',
    'tab': 'onglet',
    'accordion': 'accordeon',
    'menu': 'menu',
    'navigation': 'navigation',
    'search': 'recherche',
    'filter': 'filtre',
    'sort': 'tri',
    'date': 'date',
    'time': 'heure',
    'calendar': 'calendrier',
    'file': 'fichier',
    'upload': 'telechargement',
    'download': 'telechargement',
    'image': 'image',
    'icon': 'icone',
    'text': 'texte',
    'label': 'libelle',
    'title': 'titre',
    'user': 'utilisateur',
    'profile': 'profil',
    'settings': 'parametres',
    'switch': 'interrupteur',
  };

  if (frenchNames[baseName]) {
    triggers.add(frenchNames[baseName]);
  }

  // Ajouter les imports comme triggers
  for (const imp of metadata.imports) {
    triggers.add(imp.package);
    for (const comp of imp.components) {
      const cleanName = comp.replace(/Component|Directive|Module|Service/g, '').toLowerCase();
      if (cleanName.length > 2) {
        triggers.add(cleanName);
      }
    }
  }

  // Triggers basés sur la catégorie
  const categoryConfig = CATEGORY_CONFIG[category];
  if (categoryConfig && categoryConfig.triggers) {
    for (const t of categoryConfig.triggers) {
      triggers.add(t);
    }
  }

  return Array.from(triggers).filter(t => t && t.length > 1).slice(0, 20);
}

/**
 * Nettoie et formate un template HTML pour l'affichage
 */
function cleanTemplate(template) {
  return template
    .replace(/\$\{[^}]+\}/g, '...') // Remplacer les interpolations
    .replace(/\s+/g, ' ') // Normaliser les espaces
    .replace(/>\s+</g, '>\n<') // Retours à la ligne entre balises
    .trim();
}

/**
 * Extrait les exemples de code des templates
 */
function extractExamples(metadata, componentName) {
  const examples = [];
  const seenTemplates = new Set();

  for (const template of metadata.templates) {
    const cleaned = cleanTemplate(template);
    if (cleaned.length > 20 && cleaned.length < 500 && !seenTemplates.has(cleaned)) {
      seenTemplates.add(cleaned);
      examples.push(cleaned);
    }
  }

  return examples.slice(0, 5); // Limiter à 5 exemples
}

/**
 * Génère la table des propriétés
 */
function generatePropertiesTable(metadata, componentInputs) {
  const properties = new Map();

  // Ajouter les propriétés du code source
  for (const input of componentInputs) {
    properties.set(input.name, {
      type: input.type,
      default: input.default || '-',
      description: input.description || '-',
    });
  }

  // Enrichir/ajouter avec les argTypes des stories
  for (const [name, info] of Object.entries(metadata.argTypes)) {
    const existing = properties.get(name) || {};
    properties.set(name, {
      type: info.options ? info.options.map(o => `'${o}'`).join(' \\| ') : (existing.type || info.type || 'any'),
      default: info.default || existing.default || '-',
      description: info.description || existing.description || '-',
    });
  }

  if (properties.size === 0) return '';

  let table = '\n## Propriétés\n\n| Propriété | Type | Défaut | Description |\n|-----------|------|--------|-------------|\n';

  for (const [name, info] of properties) {
    const type = info.type.length > 50 ? info.type.substring(0, 47) + '...' : info.type;
    const desc = info.description.replace(/\|/g, '\\|').substring(0, 100);
    table += `| \`${name}\` | \`${type}\` | \`${info.default}\` | ${desc} |\n`;
  }

  return table;
}

/**
 * Génère la section des classes CSS
 */
function generateCssClassesSection(cssClasses) {
  if (cssClasses.length === 0) return '';

  // Grouper les classes par type
  const modClasses = cssClasses.filter(c => c.startsWith('mod-'));
  const isClasses = cssClasses.filter(c => c.startsWith('is-'));
  const paletteClasses = cssClasses.filter(c => c.startsWith('palette-'));
  const baseClasses = cssClasses.filter(c => !c.startsWith('mod-') && !c.startsWith('is-') && !c.startsWith('palette-') && !c.startsWith('pr-'));

  let section = '\n## Classes CSS\n\n| Classe | Description |\n|--------|-------------|\n';

  for (const cls of baseClasses.slice(0, 5)) {
    section += `| \`.${cls}\` | Classe de base |\n`;
  }
  for (const cls of modClasses.slice(0, 10)) {
    const name = cls.replace('mod-', '');
    section += `| \`.${cls}\` | Modificateur ${name} |\n`;
  }
  for (const cls of isClasses.slice(0, 5)) {
    const name = cls.replace('is-', '');
    section += `| \`.${cls}\` | État ${name} |\n`;
  }
  for (const cls of paletteClasses.slice(0, 5)) {
    const name = cls.replace('palette-', '');
    section += `| \`.${cls}\` | Palette ${name} |\n`;
  }

  return section;
}

/**
 * Génère le contenu complet du skills.md
 */
function generateSkillContent(componentName, category, metadata, storyDir, existingSkill = null) {
  const triggers = generateTriggers(componentName, metadata, category);
  const categoryConfig = CATEGORY_CONFIG[category] || CATEGORY_CONFIG['Structure'];

  // Préserver les données Figma existantes si présentes
  let figmaNodeId = null;
  let figmaFileKey = null;

  if (existingSkill) {
    const nodeIdMatch = existingSkill.match(/nodeId:\s*["']?([^"'\n]+)["']?/);
    const fileKeyMatch = existingSkill.match(/fileKey:\s*["']?([^"'\n]+)["']?/);
    if (nodeIdMatch && nodeIdMatch[1] !== 'null') figmaNodeId = nodeIdMatch[1].trim();
    if (fileKeyMatch && fileKeyMatch[1] !== 'null') figmaFileKey = fileKeyMatch[1].trim();
  }

  // Extraire le package principal pour chercher le code source
  const mainPackage = metadata.imports.length > 0 ? metadata.imports[0].package : null;
  const componentInputs = mainPackage ? parseComponentSource(mainPackage) : [];

  // Générer les sections
  const propertiesTable = generatePropertiesTable(metadata, componentInputs);
  const cssClassesSection = generateCssClassesSection(metadata.cssClasses);
  const examples = extractExamples(metadata, componentName);

  // Générer les imports
  let importsSection = '';
  if (metadata.imports.length > 0) {
    const ngImports = metadata.imports.filter(i => !i.isPrisme);
    if (ngImports.length > 0) {
      importsSection = '\n## Imports\n\n```typescript\n';
      for (const imp of ngImports) {
        importsSection += `import { ${imp.components.join(', ')} } from '@lucca-front/ng/${imp.package}';\n`;
      }
      importsSection += '```\n';
    }
  }

  // Générer les exemples de code
  let examplesSection = '\n## Exemples\n';
  if (examples.length > 0) {
    examplesSection += '\n### Exemple basique\n\n```html\n' + examples[0] + '\n```\n';
    if (examples.length > 1) {
      examplesSection += '\n### Autres exemples\n\n```html\n' + examples.slice(1, 3).join('\n\n') + '\n```\n';
    }
  } else {
    examplesSection += '\n### Exemple basique\n\n```html\n<!-- Voir les stories pour des exemples détaillés -->\n```\n';
  }

  // Générer la description enrichie
  const description = `Composant ${componentName} - ${categoryConfig.description.toLowerCase()}`;

  // Construire le contenu final
  const content = `---
description: ${description}
triggers:
${triggers.map(t => `  - ${t}`).join('\n')}
figma:
  nodeId: ${figmaNodeId || 'null'}
  fileKey: ${figmaFileKey || 'null'}
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# ${componentName}

## Description

Le composant **${componentName}** fait partie de la catégorie **${category}** du design system Lucca Front.

${categoryConfig.description}.

${metadata.title ? `**Story path:** \`${metadata.title}\`\n` : ''}${metadata.component ? `**Component:** \`${metadata.component}\`\n` : ''}
${importsSection}
${propertiesTable}
## Utilisation

### Quand utiliser ${componentName}

${categoryConfig.usage.when.map(u => `- ${u}`).join('\n')}

### Quand ne pas utiliser

${categoryConfig.usage.whenNot.map(u => `- ${u}`).join('\n')}
${examplesSection}
${cssClassesSection}
## Accessibilité

${categoryConfig.a11y.map(a => `- ${a}`).join('\n')}

## Figma

${figmaNodeId ? `Ce composant est lié au node Figma \`${figmaNodeId}\`.` : '⚠️ Ce composant n\'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.'}

## Voir aussi

<!-- Composants liés à documenter -->
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
    const dirName = path.basename(dir).toLowerCase();
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
      templates: [],
      cssClasses: [],
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

        // Merger les templates
        combinedMetadata.templates.push(...metadata.templates);

        // Merger les classes CSS
        for (const cls of metadata.cssClasses) {
          if (!combinedMetadata.cssClasses.includes(cls)) {
            combinedMetadata.cssClasses.push(cls);
          }
        }
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

