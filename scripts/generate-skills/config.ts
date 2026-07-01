import fs from 'fs';
import path from 'path';
import { Config } from './types';

const CONFIG_PATH = path.join(__dirname, 'generate-skills-config.json');

export function loadConfig(): Config {
	let cfg: any = {};

	if (fs.existsSync(CONFIG_PATH)) {
		try {
			const raw = fs.readFileSync(CONFIG_PATH, 'utf-8').replace(/^\uFEFF/, '');
			cfg = JSON.parse(raw);
		} catch (err: any) {
			console.warn(`⚠️  Config file invalid, using defaults: ${err.message}`);
		}
	}

	return {
		figma: {
			token: cfg.figma?.token || process.env['FIGMA_TOKEN'] || undefined,
			fileKey: cfg.figma?.fileKey || 'PQEOcUF9CYfKNqaejAGLWP',
		},
		output: {
			skillsDir: cfg.output?.skillsDir || path.join(__dirname, '..', '..', '.claude', 'skills'),
		},
		concurrency: cfg.concurrency || 5,
	};
}
