import { execFileSync } from 'node:child_process';

const GENERATED = ['.github/skills/lucca-front', '.github/skills/_lucca-front/versions.json', 'scripts/generate-skills/component-metadata.json'];

// `git status` rather than `git diff`: a newly generated file is untracked, and `git diff` ignores it.
const drift = execFileSync('git', ['status', '--porcelain', '--', ...GENERATED], { encoding: 'utf8' });

if (drift) {
	console.error(`${drift}\nThe lucca-front skill no longer matches the code: run \`npm run skills:update\` and commit the result.`);
	process.exit(1);
}
