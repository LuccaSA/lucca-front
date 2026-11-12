import { describe, expect, it, vi } from 'vitest';
import { documentedMinor, resolveSourceVersion } from './version-config';

const TAGS = ['v22.0.0', 'v22.1.0', 'v22.1.1', 'v22.2.0-rc.1'];

// cmd.exe keeps single quotes, so on Windows a shell-quoted `git tag -l 'v*'` matches no tag.
vi.mock('child_process', () => ({
	execSync: vi.fn(() => ''),
	execFileSync: vi.fn((file: string, args: string[]) => {
		if (file !== 'git') throw new Error(`unexpected command ${file}`);
		if (args[0] === 'rev-parse') return 'f00d\n';
		if (args[0] === 'cat-file') return 'tree\n';
		if (args[0] === 'tag') {
			const pattern = new RegExp(`^${args.at(-1)!.replace(/\./g, '\\.').replace(/\*/g, '.*')}$`);
			return TAGS.filter((tag) => pattern.test(tag)).join('\n') + '\n';
		}
		throw new Error(`unexpected git ${args.join(' ')}`);
	}),
}));

describe('documentedMinor', () => {
	it.each`
		tagged    | prepared   | expected
		${'22.1'} | ${null}    | ${'22.1'}
		${'22.1'} | ${'22.1'}  | ${'22.1'}
		${'22.1'} | ${'22.2'}  | ${'22.2'}
		${'22.9'} | ${'22.10'} | ${'22.10'}
		${'22.3'} | ${'23.0'}  | ${'23.0'}
		${'22.2'} | ${'22.1'}  | ${'22.2'}
	`('documents $expected when the last tag is $tagged and the branch prepares $prepared', ({ tagged, prepared, expected }) => {
		expect(documentedMinor(tagged, prepared)).toBe(expected);
	});
});

describe('resolveSourceVersion', () => {
	it('should resolve the last stable tag when git tags are listed without a shell', () => {
		const ref = 'f00d';

		const resolution = resolveSourceVersion(ref);

		expect(resolution.minorKey).toBe('22.1');
		expect(resolution.patchTags).toEqual(['v22.1.0', 'v22.1.1']);
	});
});
