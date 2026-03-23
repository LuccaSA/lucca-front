import fs from 'fs';
import path from 'path';
import { Config } from './types';

const CONFIG_PATH = path.join(__dirname, 'generate-skills-config.json');

export function loadConfig(): Config {
	if (!fs.existsSync(CONFIG_PATH)) {
		throw new Error(`Fichier de config introuvable: ${CONFIG_PATH}\n` + `Copiez scripts/generate-skills/generate-skills-config.json.example vers scripts/generate-skills/generate-skills-config.json et renseignez vos credentials.`);
	}

	let raw: string;
	try {
		raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
	} catch (err: any) {
		throw new Error(`Impossible de lire ${CONFIG_PATH}: ${err.message}`);
	}

	// Supprimer le BOM UTF-8 éventuel (ajouté par certains éditeurs Windows)
	raw = raw.replace(/^\uFEFF/, '');

	let cfg: any;
	try {
		cfg = JSON.parse(raw);
	} catch (err: any) {
		throw new Error(`scripts/generate-skills/generate-skills-config.json est invalide (JSON malformé): ${err.message}`);
	}

	if (!cfg.ai?.apiKey || cfg.ai.apiKey === 'YOUR_API_KEY_HERE') {
		throw new Error('config.ai.apiKey est requis (remplacez la valeur dans scripts/generate-skills/generate-skills-config.json)');
	}
	if (!cfg.ai?.provider) {
		throw new Error('config.ai.provider est requis ("anthropic" ou "openai")');
	}
	if (!['anthropic', 'openai', 'github-models'].includes(cfg.ai.provider)) {
		throw new Error(`config.ai.provider invalide "${cfg.ai.provider}". Valeurs acceptées: "anthropic", "openai", "github-models"`);
	}
	if (!cfg.figma?.token || cfg.figma.token === 'figd_YOUR_FIGMA_TOKEN_HERE') {
		throw new Error('config.figma.token est requis (Personal Access Token Figma)');
	}

	return {
		ai: {
			provider: cfg.ai.provider,
			model: cfg.ai.model || (cfg.ai.provider === 'anthropic' ? 'claude-sonnet-4-5' : 'gpt-4o'),
			apiKey: cfg.ai.apiKey,
			concurrency: cfg.ai.concurrency || 3,
		},
		figma: {
			token: cfg.figma.token,
			fileKey: 'PQEOcUF9CYfKNqaejAGLWP',
			nodeId: '1-53',
		},
		storybook: {
			indexUrl: 'https://lucca-front.lucca.io/storybook/index.json',
			baseUrl: 'https://lucca-front.lucca.io/storybook',
		},
		zeroheight: {
			mcpUrl: 'https://mcp.zeroheight.com/mcp/6c6e2fd48ab678e2d32da5585430fa9ebdac8050',
		},
		output: {
			skillsDir: path.join(__dirname, '..', '..', '.github', 'skills'),
		},
	};
}
