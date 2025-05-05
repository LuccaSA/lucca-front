// We are keeping this hardcoded in LF for local stylelint usage
import { readFile } from 'node:fs/promises';

let version = null;

try {
	const LFFolder = import.meta.resolve('@lucca-front/scss');

	if (LFFolder) {
		const packageJson = await readFile(new URL('../package.json', LFFolder), {
			encoding: 'utf-8',
		});
		version = JSON.parse(packageJson).version;
		if (version === '0.0.0') {
			version = null;
		}
	}
} catch (e) {}

export default version;
