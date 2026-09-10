/**
 * One-shot TTY question, shared by the pre-flight (`preflight.ts`) and the ZeroHeight release-ID
 * guard (`zh-release-guard.ts`). Both ask the operator a single line and wait; a second copy of the
 * readline dance would drift the moment one of them starts handling, say, EOF differently.
 */

import readline from 'readline';

/** Asks `question` on stdin/stdout and resolves with the trimmed answer. */
export function ask(question: string): Promise<string> {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	return new Promise((resolve) => rl.question(question, (answer) => { rl.close(); resolve(answer.trim()); }));
}

/** Whether the run can ask anything at all (a CI job cannot answer). */
export function isInteractive(): boolean {
	return !!process.stdin.isTTY;
}

/** Reads an answer as a yes. Accepts the French forms — the prompts are in French. */
export function isYes(answer: string): boolean {
	return ['y', 'yes', 'o', 'oui'].includes(answer.trim().toLowerCase());
}
