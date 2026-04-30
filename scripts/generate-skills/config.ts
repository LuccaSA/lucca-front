import fs from 'fs';
import path from 'path';
import { Config } from './types';

const CONFIG_PATH = path.join(__dirname, 'generate-skills-config.json');

export function loadConfig(): Config {
	if (!fs.existsSync(CONFIG_PATH)) {
		throw new Error(
			`Config file not found: ${CONFIG_PATH}\n` +
				`Copy scripts/generate-skills/generate-skills-config.json.example to scripts/generate-skills/generate-skills-config.json and fill in your credentials.`,
		);
	}

	let raw: string;
	try {
		raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
	} catch (err: any) {
		throw new Error(`Unable to read ${CONFIG_PATH}: ${err.message}`);
	}

	// Strip optional UTF-8 BOM (added by some Windows editors)
	raw = raw.replace(/^\uFEFF/, '');

	let cfg: any;
	try {
		cfg = JSON.parse(raw);
	} catch (err: any) {
		throw new Error(`scripts/generate-skills/generate-skills-config.json is invalid (malformed JSON): ${err.message}`);
	}

	if (!cfg.ai?.apiKey || cfg.ai.apiKey === 'YOUR_API_KEY_HERE') {
		throw new Error('config.ai.apiKey is required (set the value in scripts/generate-skills/generate-skills-config.json)');
	}
	if (!cfg.ai?.provider) {
		throw new Error('config.ai.provider is required ("anthropic", "openai" or "github-models")');
	}
	if (!['anthropic', 'openai', 'github-models'].includes(cfg.ai.provider)) {
		throw new Error(`config.ai.provider invalid "${cfg.ai.provider}". Accepted values: "anthropic", "openai", "github-models"`);
	}
	if (!cfg.figma?.token || cfg.figma.token === 'figd_YOUR_FIGMA_TOKEN_HERE') {
		throw new Error('config.figma.token is required (Figma Personal Access Token)');
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
