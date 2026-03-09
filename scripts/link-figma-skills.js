#!/usr/bin/env node

/**
 * Script pour lier les skills.md aux nodes Figma via Code Connect
 *
 * Ce script lit les fichiers skills.md et peut:
 * 1. Lister les skills non liés à Figma
 * 2. Mettre à jour un skill avec un nodeId Figma
 * 3. Exporter les mappings pour Code Connect
 *
 * Usage:
 *   node scripts/link-figma-skills.js --list          # Liste les skills non liés
 *   node scripts/link-figma-skills.js --export        # Exporte les mappings en JSON
 *   node scripts/link-figma-skills.js --link <component> <nodeId> [fileKey]
 */

const fs = require('fs');
const path = require('path');

const STORIES_ROOT = path.join(__dirname, '..', 'stories', 'documentation');

const args = process.argv.slice(2);

/**
 * Trouve tous les fichiers skills.md
 */
function findSkillFiles(dir) {
  const skills = [];

  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) return;

    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (item === 'skills.md') {
        skills.push(fullPath);
      }
    }
  }

  walk(dir);
  return skills;
}

/**
 * Parse un fichier skills.md pour extraire les métadonnées
 */
function parseSkillFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extraire le frontmatter YAML
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];

  // Parser les valeurs clés
  const descMatch = frontmatter.match(/description:\s*(.+)/);
  const nodeIdMatch = frontmatter.match(/nodeId:\s*["']?([^"'\n]+)["']?/);
  const fileKeyMatch = frontmatter.match(/fileKey:\s*["']?([^"'\n]+)["']?/);

  // Extraire les triggers
  const triggersMatch = frontmatter.match(/triggers:\n((?:\s+-\s+.+\n?)+)/);
  const triggers = triggersMatch
    ? triggersMatch[1].match(/-\s+(.+)/g).map(t => t.replace(/^-\s+/, '').trim())
    : [];

  // Extraire le nom du composant depuis le contenu
  const titleMatch = content.match(/^#\s+(.+)/m);

  return {
    path: filePath,
    relativePath: path.relative(STORIES_ROOT, filePath),
    description: descMatch ? descMatch[1].trim() : null,
    componentName: titleMatch ? titleMatch[1].trim() : path.basename(path.dirname(filePath)),
    triggers,
    figma: {
      nodeId: nodeIdMatch && nodeIdMatch[1] !== 'null' ? nodeIdMatch[1].trim() : null,
      fileKey: fileKeyMatch && fileKeyMatch[1] !== 'null' ? fileKeyMatch[1].trim() : null,
    },
    hasLink: nodeIdMatch && nodeIdMatch[1] !== 'null',
  };
}

/**
 * Met à jour le nodeId Figma dans un fichier skills.md
 */
function updateFigmaLink(filePath, nodeId, fileKey = null) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Mettre à jour le nodeId
  content = content.replace(
    /nodeId:\s*["']?[^"'\n]*["']?/,
    `nodeId: "${nodeId}"`
  );

  // Mettre à jour le fileKey si fourni
  if (fileKey) {
    content = content.replace(
      /fileKey:\s*["']?[^"'\n]*["']?/,
      `fileKey: "${fileKey}"`
    );
  }

  // Mettre à jour la section Figma dans le contenu
  content = content.replace(
    /## Figma\n\n[^\n]+/,
    `## Figma\n\nCe composant est lié au node Figma \`${nodeId}\`.`
  );

  fs.writeFileSync(filePath, content, 'utf-8');
}

/**
 * Commande: lister les skills non liés
 */
function listUnlinked() {
  const skillFiles = findSkillFiles(STORIES_ROOT);
  const skills = skillFiles.map(parseSkillFile).filter(Boolean);

  const unlinked = skills.filter(s => !s.hasLink);
  const linked = skills.filter(s => s.hasLink);

  console.log(`\n📊 État des liaisons Figma:\n`);
  console.log(`   ✅ Liés: ${linked.length}`);
  console.log(`   ⚠️  Non liés: ${unlinked.length}`);
  console.log(`   📦 Total: ${skills.length}\n`);

  if (unlinked.length > 0) {
    console.log(`\n📋 Composants non liés à Figma:\n`);
    for (const skill of unlinked) {
      console.log(`   - ${skill.componentName} (${skill.relativePath})`);
    }
  }

  if (linked.length > 0) {
    console.log(`\n✅ Composants liés à Figma:\n`);
    for (const skill of linked) {
      console.log(`   - ${skill.componentName}: ${skill.figma.nodeId}`);
    }
  }
}

/**
 * Commande: exporter les mappings pour Code Connect
 */
function exportMappings() {
  const skillFiles = findSkillFiles(STORIES_ROOT);
  const skills = skillFiles.map(parseSkillFile).filter(Boolean);

  const mappings = skills.map(skill => ({
    componentName: skill.componentName,
    skillPath: skill.relativePath,
    triggers: skill.triggers,
    figma: skill.figma,
    linked: skill.hasLink,
  }));

  const output = {
    generatedAt: new Date().toISOString(),
    totalComponents: mappings.length,
    linkedComponents: mappings.filter(m => m.linked).length,
    mappings,
  };

  const outputPath = path.join(__dirname, 'skills-mappings.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`\n✅ Mappings exportés vers: ${outputPath}`);
  console.log(`   📦 ${output.totalComponents} composants`);
  console.log(`   ✅ ${output.linkedComponents} liés à Figma\n`);
}

/**
 * Commande: lier un composant à un node Figma
 */
function linkComponent(componentName, nodeId, fileKey) {
  const skillFiles = findSkillFiles(STORIES_ROOT);
  const skills = skillFiles.map(parseSkillFile).filter(Boolean);

  // Trouver le skill correspondant
  const skill = skills.find(s =>
    s.componentName.toLowerCase() === componentName.toLowerCase() ||
    s.relativePath.toLowerCase().includes(componentName.toLowerCase())
  );

  if (!skill) {
    console.error(`\n❌ Composant "${componentName}" non trouvé.\n`);
    console.log('Composants disponibles:');
    for (const s of skills) {
      console.log(`   - ${s.componentName}`);
    }
    process.exit(1);
  }

  updateFigmaLink(skill.path, nodeId, fileKey);
  console.log(`\n✅ ${skill.componentName} lié au node Figma ${nodeId}`);
  if (fileKey) {
    console.log(`   FileKey: ${fileKey}`);
  }
  console.log(`   Fichier: ${skill.relativePath}\n`);
}

/**
 * Affiche l'aide
 */
function showHelp() {
  console.log(`
🔗 Link Figma Skills - Lie les skills.md aux nodes Figma

Usage:
  node scripts/link-figma-skills.js [command] [options]

Commands:
  --list              Liste tous les skills et leur état de liaison
  --export            Exporte les mappings en JSON (scripts/skills-mappings.json)
  --link <name> <nodeId> [fileKey]
                      Lie un composant à un node Figma
  --help              Affiche cette aide

Examples:
  node scripts/link-figma-skills.js --list
  node scripts/link-figma-skills.js --export
  node scripts/link-figma-skills.js --link Button "123:456"
  node scripts/link-figma-skills.js --link Dialog "789:012" "abc123def"
`);
}

// Point d'entrée
if (args.includes('--help') || args.length === 0) {
  showHelp();
} else if (args.includes('--list')) {
  listUnlinked();
} else if (args.includes('--export')) {
  exportMappings();
} else if (args.includes('--link')) {
  const linkIndex = args.indexOf('--link');
  const componentName = args[linkIndex + 1];
  const nodeId = args[linkIndex + 2];
  const fileKey = args[linkIndex + 3];

  if (!componentName || !nodeId) {
    console.error('\n❌ Usage: --link <componentName> <nodeId> [fileKey]\n');
    process.exit(1);
  }

  linkComponent(componentName, nodeId, fileKey);
} else {
  console.error('\n❌ Commande inconnue. Utilisez --help pour voir les options.\n');
  process.exit(1);
}

