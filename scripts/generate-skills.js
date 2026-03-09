#!/usr/bin/env node

/**
 * Skills Generation Script for Lucca Front Design System
 *
 * Generates structured skills documentation following the Agent Skills specification:
 * - https://agentskills.io/specification
 * - https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
 *
 * Structure:
 * skills/
 * ├── SKILL.md                    # Main skill file with routing guide
 * ├── ng/
 * │   └── references/             # Auto-generated Angular component skills
 * ├── icons/
 * │   └── references/             # Auto-generated icon skills
 * ├── scss/
 * │   └── references/             # Auto-generated SCSS skills
 * └── prisme/
 *     └── references/             # Auto-generated Prisme skills
 *
 * Usage: node scripts/generate-skills.js [--dry-run] [--package <name>]
 */

const fs = require('fs');
const path = require('path');

// Configuration
const ROOT_DIR = path.join(__dirname, '..');
const SKILLS_ROOT = path.join(ROOT_DIR, 'skills');
const STORIES_ROOT = path.join(ROOT_DIR, 'stories', 'documentation');
const PACKAGES = {
  ng: {
    root: path.join(ROOT_DIR, 'packages', 'ng'),
    storiesRoot: STORIES_ROOT,
    description: 'Angular components and directives for Lucca Front design system',
  },
  icons: {
    root: path.join(ROOT_DIR, 'packages', 'icons'),
    description: 'Icon library for Lucca Front design system',
  },
  scss: {
    root: path.join(ROOT_DIR, 'packages', 'scss'),
    description: 'SCSS utilities, mixins, and variables for Lucca Front design system',
  },
  prisme: {
    root: path.join(ROOT_DIR, 'packages', 'prisme'),
    description: 'Core Prisme components shared across Lucca Front',
  },
};

// CLI Arguments
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const PACKAGE_FILTER = args.includes('--package')
  ? args[args.indexOf('--package') + 1]
  : null;

// Category configurations for contextual documentation
const CATEGORY_CONFIG = {
  actions: {
    description: 'Interactive components to trigger user actions',
    triggers: ['click', 'action', 'interactive', 'cta', 'button'],
    usage: {
      when: ['User actions', 'Event triggering', 'Form submissions'],
      whenNot: ['Simple navigation (use Link)', 'Static information display'],
    },
    a11y: [
      'Use appropriate semantic elements (<button>, <a>)',
      'Provide alternative text for visual elements',
      'Ensure sufficient contrast',
    ],
  },
  forms: {
    description: 'Components for user data input and validation',
    triggers: ['input', 'form', 'field', 'control', 'validation'],
    usage: {
      when: ['Data entry', 'Forms', 'Configuration', 'Filters'],
      whenNot: ['Read-only data display', 'Navigation'],
    },
    a11y: [
      'Associate each field with a label using for/id',
      'Provide explicit error messages',
      'Support keyboard navigation',
      'Indicate required fields',
    ],
  },
  overlays: {
    description: 'Components displayed above the main content',
    triggers: ['modal', 'popup', 'overlay', 'layer', 'dialog', 'floating'],
    usage: {
      when: ['Important confirmations', 'Contextual forms', 'Additional information'],
      whenNot: ['Main page content', 'Frequent navigation'],
    },
    a11y: [
      'Manage focus trap in modals',
      'Allow closing with Escape',
      'Announce opening to screen readers',
      'Use aria-modal and role="dialog"',
    ],
  },
  feedback: {
    description: 'Components to communicate information and states to the user',
    triggers: ['notification', 'message', 'alert', 'status', 'feedback', 'info'],
    usage: {
      when: ['Success/error messages', 'Important alerts', 'Contextual information'],
      whenNot: ['Main content', 'User actions'],
    },
    a11y: [
      'Use aria-live for dynamic messages',
      'Associate appropriate role (alert, status)',
      'Do not rely solely on color',
    ],
  },
  navigation: {
    description: 'Components for application navigation',
    triggers: ['nav', 'menu', 'navigate', 'route', 'link', 'breadcrumb'],
    usage: {
      when: ['Page navigation', 'Menus', 'Breadcrumbs', 'Pagination'],
      whenNot: ['Actions (use Button)', 'Data display'],
    },
    a11y: [
      'Use appropriate nav landmarks',
      'Indicate current page with aria-current',
      'Support keyboard navigation',
    ],
  },
  listings: {
    description: 'Components to display lists and data collections',
    triggers: ['list', 'table', 'data', 'grid', 'collection', 'items'],
    usage: {
      when: ['Collection display', 'Data tables', 'Item lists'],
      whenNot: ['Single element', 'Forms'],
    },
    a11y: [
      'Use semantic structures (table, ul, ol)',
      'Provide headers for tables',
      'Support accessible sorting and pagination',
    ],
  },
  loaders: {
    description: 'Components to indicate loading or progress',
    triggers: ['loading', 'spinner', 'progress', 'wait', 'skeleton'],
    usage: {
      when: ['Data loading', 'Async actions', 'Progress indication'],
      whenNot: ['Immediately available content'],
    },
    a11y: [
      'Announce loading with aria-busy',
      'Provide descriptive alternative text',
      'Inform when loading completes',
    ],
  },
  texts: {
    description: 'Components for typography and textual content',
    triggers: ['text', 'typography', 'content', 'label', 'badge', 'tag'],
    usage: {
      when: ['Text formatting', 'Labels', 'Badges', 'Tags'],
      whenNot: ['Interactive actions', 'Forms'],
    },
    a11y: [
      'Use logical heading hierarchy',
      'Ensure sufficient text contrast',
      'Avoid text in images',
    ],
  },
  structure: {
    description: 'Components for layout structuring',
    triggers: ['layout', 'container', 'structure', 'grid', 'box', 'card'],
    usage: {
      when: ['Content organization', 'Layout', 'Containers'],
      whenNot: ['Interactive components'],
    },
    a11y: [
      'Use appropriate landmarks',
      'Maintain logical reading order',
      'Structure content semantically',
    ],
  },
  users: {
    description: 'Components to display user information',
    triggers: ['user', 'avatar', 'profile', 'person', 'employee'],
    usage: {
      when: ['User display', 'Avatars', 'Profiles'],
      whenNot: ['Non-user related data'],
    },
    a11y: [
      'Provide alternative text for avatars',
      'Do not rely solely on images',
    ],
  },
};

/**
 * Parse a TypeScript story file to extract metadata
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

  // Extract title
  const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
  if (titleMatch) {
    metadata.title = titleMatch[1];
  }

  // Extract @lucca-front imports
  const importMatches = content.matchAll(/import\s*{([^}]+)}\s*from\s*['"]@lucca-front\/ng\/([^'"]+)['"]/g);
  for (const match of importMatches) {
    const components = match[1].split(',').map(c => c.trim()).filter(c => c);
    const packageName = match[2];
    metadata.imports.push({ components, package: packageName });
  }

  // Extract @lucca/prisme imports
  const prismeImportMatches = content.matchAll(/import\s*{([^}]+)}\s*from\s*['"]@lucca\/prisme\/([^'"]+)['"]/g);
  for (const match of prismeImportMatches) {
    const components = match[1].split(',').map(c => c.trim()).filter(c => c);
    const packageName = match[2];
    metadata.imports.push({ components, package: packageName, isPrisme: true });
  }

  // Extract main component
  const componentMatch = content.match(/component:\s*(\w+)/);
  if (componentMatch) {
    metadata.component = componentMatch[1];
  }

  // Extract HTML templates
  const templateMatches = content.matchAll(/template:\s*[`'"]([^`'"]+)[`'"]/gs);
  for (const match of templateMatches) {
    metadata.templates.push(match[1].trim());
  }

  // Extract templates from getTemplate functions
  const getTemplateMatches = content.matchAll(/return\s*[`'"]([^`'"]*(?:<[^>]+>[^`'"]*)*)[`'"]/gs);
  for (const match of getTemplateMatches) {
    const template = match[1].trim();
    if (template.includes('<') && template.length > 10) {
      metadata.templates.push(template);
    }
  }

  // Extract CSS classes
  const classMatches = content.matchAll(/class="([^"]+)"/g);
  for (const match of classMatches) {
    const classes = match[1].split(/\s+/);
    for (const cls of classes) {
      if (cls && !cls.includes('${') && !metadata.cssClasses.includes(cls)) {
        metadata.cssClasses.push(cls);
      }
    }
  }

  // Extract argTypes with descriptions
  const argTypesMatch = content.match(/argTypes:\s*{([\s\S]*?)(?=\n\s*}\s*(?:as Meta|,|\n))/);
  if (argTypesMatch) {
    const argTypesContent = argTypesMatch[1];
    const argRegex = /(\w+):\s*{([^}]*(?:{[^}]*}[^}]*)*)}/g;
    let argMatch;
    while ((argMatch = argRegex.exec(argTypesContent)) !== null) {
      const argName = argMatch[1];
      const argContent = argMatch[2];

      const descMatch = argContent.match(/description:\s*['"`]([^'"`]+)['"`]/);
      const optionsMatch = argContent.match(/options:\s*\[([^\]]+)\]/);
      const typeMatch = argContent.match(/type:\s*['"`]([^'"`]+)['"`]/);

      metadata.argTypes[argName] = {
        description: descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : null,
        options: optionsMatch ? optionsMatch[1].split(',').map(o => o.trim().replace(/['"]/g, '')).filter(o => o) : null,
        type: typeMatch ? typeMatch[1] : null,
      };
    }
  }

  return metadata;
}

/**
 * Parse Angular component source to extract inputs
 */
function parseComponentSource(pkgPath) {
  if (!fs.existsSync(pkgPath)) return [];

  const inputs = [];

  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        walkDir(fullPath);
      } else if (item.endsWith('.component.ts')) {
        const content = fs.readFileSync(fullPath, 'utf-8');

        // Extract inputs with input() signal
        const inputMatches = content.matchAll(/\/\*\*\s*\n\s*\*\s*([^*]+)\s*\*\/\s*\n\s*readonly\s+(\w+)\s*=\s*input<([^>]+)>\(([^)]*)\)/gs);
        for (const match of inputMatches) {
          inputs.push({
            name: match[2],
            type: match[3].trim(),
            description: match[1].trim(),
            default: match[4] ? match[4].split(',')[0].trim().replace(/['"]/g, '') : null,
            file: path.relative(pkgPath, fullPath),
          });
        }

        // Extract inputs with @Input() decorator
        const decoratorMatches = content.matchAll(/@Input\(\)\s+(?:set\s+)?(\w+)[\s:]/g);
        for (const match of decoratorMatches) {
          if (!inputs.find(i => i.name === match[1])) {
            inputs.push({
              name: match[1],
              type: 'any',
              description: null,
              default: null,
              file: path.relative(pkgPath, fullPath),
            });
          }
        }
      }
    }
  }

  walkDir(pkgPath);
  return inputs;
}

/**
 * Find all story files in a directory
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
 * Get component name from path
 */
function getComponentNameFromPath(storyPath) {
  const relativePath = path.relative(STORIES_ROOT, storyPath);
  const parts = relativePath.split(path.sep);

  for (let i = parts.length - 2; i >= 0; i--) {
    const part = parts[i];
    if (!['angular', 'html&css', 'HTML&CSS', 'Angular'].includes(part)) {
      return kebabToPascal(part);
    }
  }

  return kebabToPascal(path.basename(storyPath, '.stories.ts'));
}

/**
 * Get category from path
 */
function getCategoryFromPath(storyPath) {
  const relativePath = path.relative(STORIES_ROOT, storyPath);
  const parts = relativePath.split(path.sep);
  return parts[0] ? parts[0].toLowerCase() : 'general';
}

/**
 * Convert kebab-case to PascalCase
 */
function kebabToPascal(str) {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Convert kebab-case to Title Case
 */
function kebabToTitle(str) {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

/**
 * Generate triggers for a component
 */
function generateTriggers(componentName, metadata, category) {
  const triggers = new Set();
  const baseName = componentName.toLowerCase();

  triggers.add(baseName);
  triggers.add(baseName.replace(/\s+/g, '-'));

  // Add imports as triggers
  for (const imp of metadata.imports) {
    triggers.add(imp.package);
    for (const comp of imp.components) {
      const cleanName = comp.replace(/Component|Directive|Module|Service/g, '').toLowerCase();
      if (cleanName.length > 2) {
        triggers.add(cleanName);
      }
    }
  }

  // Category-based triggers
  const categoryConfig = CATEGORY_CONFIG[category];
  if (categoryConfig?.triggers) {
    categoryConfig.triggers.forEach(t => triggers.add(t));
  }

  return Array.from(triggers).filter(t => t && t.length > 1).slice(0, 15);
}

/**
 * Clean and format HTML template
 */
function cleanTemplate(template) {
  return template
    .replace(/\$\{[^}]+\}/g, '...')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '>\n<')
    .trim();
}

/**
 * Extract code examples from templates
 */
function extractExamples(metadata) {
  const examples = [];
  const seen = new Set();

  for (const template of metadata.templates) {
    const cleaned = cleanTemplate(template);
    if (cleaned.length > 20 && cleaned.length < 500 && !seen.has(cleaned)) {
      seen.add(cleaned);
      examples.push(cleaned);
    }
  }

  return examples.slice(0, 3);
}

/**
 * Generate properties table
 */
function generatePropertiesTable(metadata, componentInputs) {
  const properties = new Map();

  for (const input of componentInputs) {
    properties.set(input.name, {
      type: input.type,
      default: input.default || '-',
      description: input.description || '-',
    });
  }

  for (const [name, info] of Object.entries(metadata.argTypes)) {
    const existing = properties.get(name) || {};
    properties.set(name, {
      type: info.options ? info.options.map(o => `'${o}'`).join(' | ') : (existing.type || info.type || 'any'),
      default: existing.default || '-',
      description: info.description || existing.description || '-',
    });
  }

  if (properties.size === 0) return '';

  let table = '| Property | Type | Default | Description |\n|----------|------|---------|-------------|\n';

  for (const [name, info] of properties) {
    const type = info.type.length > 40 ? info.type.substring(0, 37) + '...' : info.type;
    const desc = info.description.replace(/\|/g, '\\|').substring(0, 80);
    table += `| \`${name}\` | \`${type}\` | \`${info.default}\` | ${desc} |\n`;
  }

  return table;
}

/**
 * Generate CSS classes section
 */
function generateCssClassesSection(cssClasses) {
  if (cssClasses.length === 0) return '';

  const modClasses = cssClasses.filter(c => c.startsWith('mod-'));
  const isClasses = cssClasses.filter(c => c.startsWith('is-'));
  const baseClasses = cssClasses.filter(c => !c.startsWith('mod-') && !c.startsWith('is-') && !c.startsWith('palette-') && !c.startsWith('pr-'));

  let section = '### CSS Classes\n\n| Class | Type |\n|-------|------|\n';

  for (const cls of baseClasses.slice(0, 3)) {
    section += `| \`.${cls}\` | Base |\n`;
  }
  for (const cls of modClasses.slice(0, 5)) {
    section += `| \`.${cls}\` | Modifier |\n`;
  }
  for (const cls of isClasses.slice(0, 3)) {
    section += `| \`.${cls}\` | State |\n`;
  }

  return section;
}

/**
 * Generate a single component reference file
 */
function generateComponentReference(componentName, category, metadata, componentInputs) {
  const categoryConfig = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.structure;
  const triggers = generateTriggers(componentName, metadata, category);
  const propertiesTable = generatePropertiesTable(metadata, componentInputs);
  const cssSection = generateCssClassesSection(metadata.cssClasses);
  const examples = extractExamples(metadata);

  // Generate imports section
  let importsSection = '';
  if (metadata.imports.length > 0) {
    const ngImports = metadata.imports.filter(i => !i.isPrisme);
    if (ngImports.length > 0) {
      importsSection = '### Imports\n\n```typescript\n';
      for (const imp of ngImports) {
        importsSection += `import { ${imp.components.join(', ')} } from '@lucca-front/ng/${imp.package}';\n`;
      }
      importsSection += '```\n\n';
    }
  }

  // Generate examples section
  let examplesSection = '';
  if (examples.length > 0) {
    examplesSection = '### Examples\n\n```html\n' + examples[0] + '\n```\n';
  }

  const content = `# ${componentName}

${categoryConfig.description}.

${metadata.title ? `**Storybook:** \`${metadata.title}\`\n` : ''}
${importsSection}${propertiesTable ? `### Properties\n\n${propertiesTable}\n` : ''}${examplesSection}${cssSection}
### When to use

${categoryConfig.usage.when.map(u => `- ${u}`).join('\n')}

### When not to use

${categoryConfig.usage.whenNot.map(u => `- ${u}`).join('\n')}

### Accessibility

${categoryConfig.a11y.map(a => `- ${a}`).join('\n')}
`;

  return { content, triggers, category };
}

/**
 * Group stories by component
 */
function groupStoriesByComponent(storyFiles) {
  const groups = new Map();

  for (const storyPath of storyFiles) {
    const dir = path.dirname(storyPath);
    const componentName = getComponentNameFromPath(storyPath);

    let componentDir = dir;
    const dirName = path.basename(dir).toLowerCase();
    if (['angular', 'html&css'].includes(dirName)) {
      componentDir = path.dirname(dir);
    }

    const key = componentDir;
    if (!groups.has(key)) {
      groups.set(key, {
        name: componentName,
        stories: [],
        dir: componentDir,
      });
    }

    groups.get(key).stories.push(storyPath);
  }

  return groups;
}

/**
 * Generate all references for ng package
 */
function generateNgReferences() {
  console.log('📦 Generating @lucca-front/ng references...\n');

  const storyFiles = findStoryFiles(STORIES_ROOT);
  const groups = groupStoriesByComponent(storyFiles);
  const references = [];

  for (const [componentDir, group] of groups) {
    const componentName = group.name;

    // Skip sample
    if (componentName.toLowerCase().includes('sample')) continue;

    // Merge metadata from all stories
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

        for (const imp of metadata.imports) {
          const existing = combinedMetadata.imports.find(i => i.package === imp.package);
          if (existing) {
            imp.components.forEach(c => {
              if (!existing.components.includes(c)) existing.components.push(c);
            });
          } else {
            combinedMetadata.imports.push({ ...imp });
          }
        }

        combinedMetadata.argTypes = { ...combinedMetadata.argTypes, ...metadata.argTypes };
        combinedMetadata.templates.push(...metadata.templates);
        metadata.cssClasses.forEach(cls => {
          if (!combinedMetadata.cssClasses.includes(cls)) {
            combinedMetadata.cssClasses.push(cls);
          }
        });
      } catch (e) {
        console.warn(`  ⚠️  Error parsing ${storyPath}: ${e.message}`);
      }
    }

    const category = getCategoryFromPath(group.stories[0]);
    const mainPackage = combinedMetadata.imports.length > 0 ? combinedMetadata.imports[0].package : null;
    const pkgPath = mainPackage ? path.join(PACKAGES.ng.root, mainPackage) : null;
    const componentInputs = pkgPath ? parseComponentSource(pkgPath) : [];

    const { content, triggers } = generateComponentReference(
      componentName,
      category,
      combinedMetadata,
      componentInputs
    );

    const fileName = componentName.toLowerCase().replace(/\s+/g, '-') + '.md';
    const filePath = path.join(SKILLS_ROOT, 'ng', 'references', fileName);

    references.push({
      name: componentName,
      file: fileName,
      category,
      triggers,
      description: CATEGORY_CONFIG[category]?.description || 'Component',
    });

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`  ✅ ${fileName}`);
    } else {
      console.log(`  [DRY-RUN] ${fileName}`);
    }
  }

  return references;
}

/**
 * Generate icons references
 */
function generateIconsReferences() {
  console.log('📦 Generating @lucca-front/icons references...\n');

  const iconsRoot = PACKAGES.icons.root;
  const selectionPath = path.join(iconsRoot, 'selection.json');

  if (!fs.existsSync(selectionPath)) {
    console.log('  ⚠️  No selection.json found');
    return [];
  }

  const selection = JSON.parse(fs.readFileSync(selectionPath, 'utf-8'));
  const icons = selection.icons || [];

  const content = `# Icons Reference

Lucca Front icon library with ${icons.length} icons.

## Usage

### Angular

\`\`\`html
<lu-icon icon="iconName" alt="Description" />
\`\`\`

### HTML/CSS

\`\`\`html
<span class="lucca-icon icon-iconName" aria-hidden="true"></span>
\`\`\`

## Available Icons

| Icon Name | Tags |
|-----------|------|
${icons.slice(0, 50).map(icon => {
  const name = icon.properties?.name || icon.icon?.tags?.[0] || 'unknown';
  const tags = icon.icon?.tags?.join(', ') || '';
  return `| \`${name}\` | ${tags} |`;
}).join('\n')}
${icons.length > 50 ? `\n*... and ${icons.length - 50} more icons*` : ''}

## Accessibility

- Always provide \`alt\` text for meaningful icons
- Use \`aria-hidden="true"\` for decorative icons
- Pair icons with visible text when possible
`;

  const filePath = path.join(SKILLS_ROOT, 'icons', 'references', 'icons.md');

  if (!DRY_RUN) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ icons.md`);
  } else {
    console.log(`  [DRY-RUN] icons.md`);
  }

  return [{
    name: 'Icons',
    file: 'icons.md',
    category: 'icons',
    triggers: ['icon', 'lucca-icon', 'lu-icon', 'pictogram', 'symbol'],
    description: 'Icon library',
  }];
}

/**
 * Generate SCSS references
 */
function generateScssReferences() {
  console.log('📦 Generating @lucca-front/scss references...\n');

  const content = `# SCSS Utilities Reference

Lucca Front SCSS utilities, mixins, and variables.

## Import

\`\`\`scss
@use '@lucca-front/scss/src/theming' as theming;
@use '@lucca-front/scss/src/commons' as commons;
\`\`\`

## Utilities

### Spacing

\`\`\`scss
// Padding utilities: pr-u-padding{100-800}
// Margin utilities: pr-u-margin{100-800}
// Gap utilities: pr-u-gap{100-800}
\`\`\`

### Display

\`\`\`scss
// pr-u-displayNone
// pr-u-displayFlex
// pr-u-displayGrid
// pr-u-displayBlock
// pr-u-displayInline
\`\`\`

### Flexbox

\`\`\`scss
// pr-u-flexWrapNowrap
// pr-u-alignItemsCenter
// pr-u-justifyContentCenter
// pr-u-flexDirectionColumn
\`\`\`

### Text

\`\`\`scss
// pr-u-textAlignCenter
// pr-u-textAlignLeft
// pr-u-textAlignRight
\`\`\`

### Visibility

\`\`\`scss
// pr-u-mask (visually hidden but accessible)
\`\`\`

## Mixins

### Media Queries

\`\`\`scss
@include commons.media('S') { ... }
@include commons.media('M') { ... }
@include commons.media('L') { ... }
\`\`\`

### Theming

\`\`\`scss
@include theming.palette('primary') { ... }
@include theming.mode('dark') { ... }
\`\`\`

## CSS Custom Properties

| Property | Description |
|----------|-------------|
| \`--palettes-*\` | Color palette tokens |
| \`--sizes-*\` | Size tokens |
| \`--spacings-*\` | Spacing tokens |
| \`--radii-*\` | Border radius tokens |
`;

  const filePath = path.join(SKILLS_ROOT, 'scss', 'references', 'utilities.md');

  if (!DRY_RUN) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ utilities.md`);
  } else {
    console.log(`  [DRY-RUN] utilities.md`);
  }

  return [{
    name: 'SCSS Utilities',
    file: 'utilities.md',
    category: 'scss',
    triggers: ['scss', 'css', 'style', 'utility', 'mixin', 'variable', 'theming'],
    description: 'SCSS utilities and mixins',
  }];
}

/**
 * Generate Prisme references
 */
function generatePrismeReferences() {
  console.log('📦 Generating @lucca/prisme references...\n');

  const prismeRoot = PACKAGES.prisme.root;
  const references = [];

  if (!fs.existsSync(prismeRoot)) {
    console.log('  ⚠️  Prisme package not found');
    return [];
  }

  // Find components in prisme
  const items = fs.readdirSync(prismeRoot);
  const components = items.filter(item => {
    const fullPath = path.join(prismeRoot, item);
    return fs.statSync(fullPath).isDirectory() && !item.startsWith('.') && item !== 'node_modules';
  });

  for (const component of components) {
    const componentPath = path.join(prismeRoot, component);
    const inputs = parseComponentSource(componentPath);

    const content = `# ${kebabToTitle(component)}

Core Prisme component shared across Lucca Front.

## Import

\`\`\`typescript
import { ${kebabToPascal(component)}Component } from '@lucca/prisme/${component}';
\`\`\`

${inputs.length > 0 ? `## Properties

| Property | Type | Description |
|----------|------|-------------|
${inputs.slice(0, 10).map(i => `| \`${i.name}\` | \`${i.type}\` | ${i.description || '-'} |`).join('\n')}
` : ''}
`;

    const fileName = component + '.md';
    const filePath = path.join(SKILLS_ROOT, 'prisme', 'references', fileName);

    references.push({
      name: kebabToTitle(component),
      file: fileName,
      category: 'prisme',
      triggers: [component, kebabToPascal(component).toLowerCase()],
      description: 'Core Prisme component',
    });

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`  ✅ ${fileName}`);
    } else {
      console.log(`  [DRY-RUN] ${fileName}`);
    }
  }

  return references;
}

/**
 * Generate the main SKILL.md file
 */
function generateMainSkillFile(allReferences) {
  console.log('\n📝 Generating main SKILL.md...\n');

  // Group references by package
  const ngRefs = allReferences.filter(r => !['icons', 'scss', 'prisme'].includes(r.category));
  const iconRefs = allReferences.filter(r => r.category === 'icons');
  const scssRefs = allReferences.filter(r => r.category === 'scss');
  const prismeRefs = allReferences.filter(r => r.category === 'prisme');

  // Group ng refs by category
  const ngByCategory = {};
  for (const ref of ngRefs) {
    const cat = ref.category;
    if (!ngByCategory[cat]) ngByCategory[cat] = [];
    ngByCategory[cat].push(ref);
  }

  const content = `---
name: lucca-front
description: "Helps developers use the @lucca-front design system library. Covers Angular components (@lucca-front/ng), icons (@lucca-front/icons), SCSS utilities (@lucca-front/scss), and core Prisme components (@lucca/prisme). Use this skill when a developer asks about Lucca UI components, forms, overlays, navigation, data tables, buttons, dialogs, or any front-end design system question — even if they don't mention @lucca-front explicitly."
---

# @lucca-front — Lucca Front Design System

## Import paths

| Package | Import |
|---------|--------|
| Angular Components | \`@lucca-front/ng/{component}\` |
| Icons | \`@lucca-front/icons\` |
| SCSS Utilities | \`@lucca-front/scss\` |
| Prisme Core | \`@lucca/prisme/{component}\` |

## How to use this skill

Read only the reference file(s) relevant to the question. Use the routing guide below to pick the right one — don't load everything at once.

## Routing guide

### Angular Components (@lucca-front/ng)

| If the question is about… | Read |
|---------------------------|------|
${Object.entries(ngByCategory).map(([category, refs]) => {
  const categoryTitle = kebabToTitle(category);
  const refList = refs.slice(0, 5).map(r => r.name).join(', ');
  const firstRef = refs[0];
  return `| **${categoryTitle}** (${refList}${refs.length > 5 ? '...' : ''}) | [ng/references/${firstRef.file}](ng/references/${firstRef.file}) |`;
}).join('\n')}

### By component

| Component | Reference |
|-----------|-----------|
${ngRefs.slice(0, 30).map(ref => `| ${ref.name} | [${ref.file}](ng/references/${ref.file}) |`).join('\n')}
${ngRefs.length > 30 ? `\n*... and ${ngRefs.length - 30} more components in ng/references/*` : ''}

### Icons

| If the question is about… | Read |
|---------------------------|------|
| Icons, pictograms, lu-icon, lucca-icon | [icons/references/icons.md](icons/references/icons.md) |

### SCSS

| If the question is about… | Read |
|---------------------------|------|
| CSS utilities, mixins, theming, spacing, display | [scss/references/utilities.md](scss/references/utilities.md) |

### Prisme Core

| If the question is about… | Read |
|---------------------------|------|
${prismeRefs.map(ref => `| ${ref.name} | [prisme/references/${ref.file}](prisme/references/${ref.file}) |`).join('\n')}

## Quick examples

### Button

\`\`\`html
<button type="button" luButton>Primary action</button>
<button type="button" luButton="outlined">Secondary action</button>
<button type="button" luButton="ghost">Tertiary action</button>
\`\`\`

### Dialog

\`\`\`html
<lu-dialog>
  <lu-dialog-header>Title</lu-dialog-header>
  <lu-dialog-content>Content</lu-dialog-content>
  <lu-dialog-footer>
    <button luButton>Confirm</button>
  </lu-dialog-footer>
</lu-dialog>
\`\`\`

### Form Field

\`\`\`html
<lu-form-field label="Email">
  <lu-text-input [(ngModel)]="email" />
</lu-form-field>
\`\`\`

### Icon

\`\`\`html
<lu-icon icon="heart" alt="Favorite" />
\`\`\`
`;

  const filePath = path.join(SKILLS_ROOT, 'SKILL.md');

  if (!DRY_RUN) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ SKILL.md`);
  } else {
    console.log(`  [DRY-RUN] SKILL.md`);
  }
}

/**
 * Clean old skills.md from stories folders
 */
function cleanOldSkillsFiles() {
  console.log('🧹 Cleaning old skills.md files from stories...\n');

  function walk(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (item === 'skills.md') {
        if (!DRY_RUN) {
          fs.unlinkSync(fullPath);
          console.log(`  🗑️  Removed ${path.relative(ROOT_DIR, fullPath)}`);
        } else {
          console.log(`  [DRY-RUN] Would remove ${path.relative(ROOT_DIR, fullPath)}`);
        }
      }
    }
  }

  walk(STORIES_ROOT);
}

/**
 * Main entry point
 */
async function main() {
  console.log('🚀 Lucca Front Skills Generator\n');
  console.log('================================\n');

  // Ensure directories exist
  for (const pkg of Object.keys(PACKAGES)) {
    const refDir = path.join(SKILLS_ROOT, pkg, 'references');
    if (!fs.existsSync(refDir)) {
      fs.mkdirSync(refDir, { recursive: true });
    }
  }

  // Clean old files
  cleanOldSkillsFiles();
  console.log('');

  let allReferences = [];

  // Generate references for each package
  if (!PACKAGE_FILTER || PACKAGE_FILTER === 'ng') {
    allReferences = allReferences.concat(generateNgReferences());
    console.log('');
  }

  if (!PACKAGE_FILTER || PACKAGE_FILTER === 'icons') {
    allReferences = allReferences.concat(generateIconsReferences());
    console.log('');
  }

  if (!PACKAGE_FILTER || PACKAGE_FILTER === 'scss') {
    allReferences = allReferences.concat(generateScssReferences());
    console.log('');
  }

  if (!PACKAGE_FILTER || PACKAGE_FILTER === 'prisme') {
    allReferences = allReferences.concat(generatePrismeReferences());
    console.log('');
  }

  // Generate main SKILL.md
  generateMainSkillFile(allReferences);

  console.log('\n================================');
  console.log(`📊 Summary: ${allReferences.length} references generated`);

  if (DRY_RUN) {
    console.log('\n💡 Dry-run mode. No files were modified.');
    console.log('   Run without --dry-run to apply changes.');
  }
}

main().catch(console.error);

