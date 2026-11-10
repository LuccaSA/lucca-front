import { execFileSync } from 'node:child_process';

// npm runs `prepare` through cmd.exe on Windows: no POSIX one-liner there.
try {
	execFileSync('git', ['config', 'core.hooksPath', '.git-hooks'], { stdio: 'ignore' });
} catch {
	// installing outside a git checkout, from a tarball for instance: nothing to wire up
}
