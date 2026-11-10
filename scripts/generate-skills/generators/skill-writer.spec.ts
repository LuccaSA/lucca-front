import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generatorRoot, readSkillManifest } from './skill-writer';

let dir: string;

beforeEach(() => {
	dir = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-writer-'));
});

afterEach(() => {
	fs.rmSync(dir, { recursive: true, force: true });
});

function writeManifest(content: string): void {
	fs.mkdirSync(generatorRoot(dir), { recursive: true });
	fs.writeFileSync(path.join(generatorRoot(dir), 'versions.json'), content);
}

describe('readSkillManifest', () => {
	it('returns null before the first generation', () => {
		expect(readSkillManifest(dir)).toBeNull();
	});

	it('reads the minor the committed skill documents', () => {
		writeManifest('{ "minor": "22.1" }');
		expect(readSkillManifest(dir)?.minor).toBe('22.1');
	});

	it('throws on a manifest left with conflict markers', () => {
		writeManifest('<<<<<<< HEAD\n{ "minor": "22.1" }\n=======\n{ "minor": "22.0" }\n>>>>>>> master\n');
		expect(() => readSkillManifest(dir)).toThrow(SyntaxError);
	});
});
