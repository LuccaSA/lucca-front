#!/usr/bin/env node

/**
 * generate-skills — Génère les SKILL.md VS Code Copilot pour chaque composant
 * du design system Lucca Front à partir de Figma, Storybook et Zeroheight.
 *
 * Usage :
 *   ts-node scripts/generate-skills/index.ts [options]
 *   npm run skills:generate [-- options]
 *
 * Options :
 *   --component <slug>   Génère uniquement le composant spécifié
 *   --force              Régénère même si le SKILL.md existe déjà
 *   --dry-run            Affiche le prompt sans écrire de fichiers
 */

import fs from 'fs';
import path from 'path';

import { fetchFigmaComponents, groupFigmaComponentsBySet } from './collectors/figma';
import { fetchStorybookIndex } from './collectors/storybook';
import { fetchComponentGuidelines, initializeMcp } from './collectors/zeroheight';
import { loadConfig } from './config';
import { createAiClient } from './generators/ai-client';
import { buildPrompt } from './generators/prompt-builder';
import { writeComponentResource } from './generators/skill-writer';
import { writeToc } from './generators/toc-writer';
import { loadComponentMap, MAP_PATH, matchComponents, refreshMap, resetMap } from './matchers/component-matcher';
import { MatchedEntry } from './types';

// ─── Parsing des flags CLI ────────────────────────────────────────────────────

const args = process.argv.slice(2);

const flags = {
	force: args.includes('--force'),
	dryRun: args.includes('--dry-run'),
	initMapForce: args.includes('--init-map-force'),
	refreshMap: args.includes('--refresh-map'),
	component: (() => {
		const idx = args.indexOf('--component');
		return idx !== -1 && args[idx + 1] ? args[idx + 1] : null;
	})(),
};

// ─── Utilitaire de concurrence ────────────────────────────────────────────────

async function withConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
	const results: R[] = new Array(items.length);
	const queue = items.map((item, i) => ({ item, i }));
	let cursor = 0;

	async function worker(): Promise<void> {
		while (cursor < queue.length) {
			const { item, i } = queue[cursor++];
			results[i] = await fn(item);
		}
	}

	const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
	await Promise.all(workers);
	return results;
}

// ─── Entrée principale ────────────────────────────────────────────────────────

async function main(): Promise<void> {
	console.log('🚀 Lucca Front — Génération des SKILL.md\n');
	console.log(`   Flags : ${JSON.stringify(flags)}\n`);

	// 1. Chargement de la configuration
	const config = loadConfig();

	// 2. Collecte des données (Figma + Storybook + MCP en parallèle)
	console.log('📥 Collecte des données...\n');

	const [figmaComponents, storybookGroups, mcpContext] = await Promise.all([
		fetchFigmaComponents(config),
		fetchStorybookIndex(config),
		initializeMcp(config).catch((err: Error) => {
			console.warn(`\n  ⚠️  MCP Zeroheight non disponible : ${err.message}`);
			console.warn('     Les guidelines Prisme seront absentes des SKILL.md générés.\n');
			return null;
		}),
	]);

	// 3. Matching Figma ↔ Storybook
	const figmaGroups = groupFigmaComponentsBySet(figmaComponents);

	// Mode --init-map-force : réinitialise tout component-map.json avec les suggestions algorithmiques
	if (flags.initMapForce) {
		console.log(`\n🗺️  Réinitialisation complète de component-map.json...\n`);
		const total = resetMap(figmaGroups, storybookGroups);
		console.log(`\n  ✅ ${total} entrée(s) générées dans ${MAP_PATH}`);
		console.log('     ⚠️  Toutes vos corrections manuelles ont été écrasées.');
		console.log('     Éditez component-map.json pour corriger les suggestions et mapper les entrées null.');
		return;
	}

	// Mode --refresh-map : ajoute les nouveaux + supprime les disparus, sans toucher aux autres
	if (flags.refreshMap) {
		console.log(`\n🗺️  Rafraîchissement de component-map.json...\n`);
		const { added, removed } = refreshMap(figmaGroups, storybookGroups);
		if (added === 0 && removed === 0) {
			console.log('  ✅ Aucun changement — la map est à jour.');
		} else {
			if (added > 0) console.log(`\n  ✅ ${added} entrée(s) ajoutée(s)`);
			if (removed > 0) console.log(`  🗑  ${removed} entrée(s) supprimée(s)`);
			console.log(`\n  Fichier mis à jour : ${MAP_PATH}`);
		}
		return;
	}

	const componentMap = loadComponentMap();
	const matchResult = matchComponents(figmaGroups, storybookGroups, componentMap);
	const { matched } = matchResult;

	// 4. Filtrage par --component si demandé
	let targets: MatchedEntry[] = matched;
	if (flags.component) {
		targets = matched.filter((m) => m.slug === flags.component || m.storybook?.slug === flags.component);
		if (targets.length === 0) {
			console.error(`\n❌ Composant "${flags.component}" introuvable dans les données matchées.`);
			console.log(
				`   Composants disponibles :\n   ${matched
					.map((m) => m.slug)
					.sort()
					.join(', ')}`,
			);
			process.exit(1);
		}
	}

	// 5. Génération des SKILL.md via l'IA
	console.log(`\n🤖 Génération de ${targets.length} SKILL.md...\n`);

	const generateText = await createAiClient(config);

	const results = await withConcurrency(targets, config.ai.concurrency, async (target) => {
		const { slug } = target;
		const skillPath = path.join(config.output.skillsDir, 'lucca-front', 'resources', `${slug}.md`);

		// Skip si le fichier existe et que --force n'est pas actif
		if (fs.existsSync(skillPath) && !flags.force && !flags.dryRun) {
			console.log(`  ⏭  ${slug} — ignoré (existe déjà, utilisez --force pour remplacer)`);
			return { slug, status: 'skipped' };
		}

		console.log(`  ⚙️  ${slug} — génération en cours...`);

		// Récupération des guidelines Zeroheight pour ce composant
		let zeroheightData: Record<string, string> | null = null;
		if (mcpContext) {
			try {
				zeroheightData = await fetchComponentGuidelines(mcpContext.mcpUrl, target.figma.figmaName);
			} catch (err: any) {
				console.warn(`     ⚠️  Zeroheight : ${err.message}`);
			}
		}

		// Construction du prompt
		const { systemPrompt, userPrompt } = buildPrompt({ matched: target, zeroheightData });

		// Mode --dry-run : affichage du prompt sans appel AI
		if (flags.dryRun) {
			const separator = '─'.repeat(60);
			console.log(`\n${separator}\n// DRY RUN — ${slug}\n${separator}`);
			console.log('SYSTEM (extrait) :\n', systemPrompt.slice(0, 300), '\n[...]\n');
			console.log('USER (extrait) :\n', userPrompt.slice(0, 600), '\n[...]\n');
			return { slug, status: 'dry-run' };
		}

		// Appel AI
		let content: string;
		try {
			content = await generateText({ systemPrompt, userPrompt });
		} catch (err: any) {
			console.error(`  ❌ ${slug} — erreur AI : ${err.message}`);
			return { slug, status: 'error', error: err.message };
		}

		// Écriture du fichier
		const category = target.storybook?.category ?? '';
		const figmaName = target.figma?.figmaName ?? slug;
		const storybookName = target.storybook?.storybookName ?? slug;
		const result = writeComponentResource(config.output.skillsDir, slug, content, { category, figmaName, storybookName }, flags.force);
		console.log(`  ✅ ${slug} — ${result.status}`);
		return { slug, status: result.status };
	});

	// 6. Génération de la table des matières
	if (!flags.dryRun) {
		const tocPath = writeToc(config.output.skillsDir);
		console.log(`\n📑 Table des matières : ${tocPath}`);
	}

	// 7. Résumé final
	const summary = results.reduce(
		(acc, r) => {
			acc[r.status] = (acc[r.status] ?? 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	console.log('\n🎉 Terminé !');
	if (summary['created']) console.log(`   Créés    : ${summary['created']}`);
	if (summary['updated']) console.log(`   Mis à jour : ${summary['updated']}`);
	if (summary['skipped']) console.log(`   Ignorés  : ${summary['skipped']}`);
	if (summary['error']) console.log(`   Erreurs  : ${summary['error']}`);
	if (summary['dry-run']) console.log(`   Dry-run  : ${summary['dry-run']}`);
}

main().catch((err: Error) => {
	console.error('\n❌ Erreur fatale :', err.message);
	if (process.env['DEBUG']) console.error(err.stack);
	process.exit(1);
});
