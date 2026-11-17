// Pure helpers of bump-qa.mjs, kept apart so that the tests drive them without git, gh or npm.

/** The packages a Lucca Front release publishes, bumped together. */
export const LF_PACKAGES = ['@lucca-front/ng', '@lucca-front/scss', '@lucca-front/icons', '@lucca/prisme'];

/** Consumer repos bumped by default: the main users of Lucca Front components with a sizeable QA. */
export const DEFAULT_REPOS = ['Cleemy.Procurement', 'Poplee.Talent', 'Figgo', 'Poplee.Engagement', 'Talent.Training'];

export const branchName = (version) => `chore/lucca-front-${version}`;

const VERSION = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;
export const isVersion = (version) => VERSION.test(version);
export const major = (version) => Number(String(version).replace(/^[~^]/, '').split('.')[0]);

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
// A dependency declared as a string: `"@lucca-front/ng": "~22.1.1"`. An `overrides` entry is an object and does not match.
const declaration = (name) => new RegExp(`("${escape(name)}"\\s*:\\s*")([~^]?)([^"]+)(")`, 'g');

/** The Lucca Front packages a package.json declares, with their range as written. */
export function declaredPackages(text) {
	return LF_PACKAGES.flatMap((name) => [...text.matchAll(declaration(name))].map((m) => ({ name, range: m[2] + m[3] })));
}

/**
 * Sets every Lucca Front package of a package.json to `version`, keeping the range prefix each one has
 * (`~`, `^` or none) and the rest of the file byte for byte.
 */
export function bumpPackageJson(text, version) {
	let changed = false;
	let next = text;
	for (const name of LF_PACKAGES) {
		next = next.replace(declaration(name), (whole, open, prefix, current, close) => {
			if (current === version) return whole;
			changed = true;
			return `${open}${prefix}${version}${close}`;
		});
	}
	return { text: next, changed };
}

/**
 * Removes the Lucca Front packages from a package-lock.json, at any depth, so that npm resolves them again.
 * Their published peers pin each other exactly (`@lucca-front/icons@22.1.2` wants `@lucca/prisme@22.1.2`), and
 * `npm install --package-lock-only` cannot move such a locked cluster one package at a time: it answers ERESOLVE,
 * measured with npm 11 on Cleemy.Procurement, whose `@lucca/prisme` is only a transitive dependency.
 */
export function dropFromLock(lockText) {
	const lock = JSON.parse(lockText);
	let removed = 0;
	for (const key of Object.keys(lock.packages ?? {})) {
		if (LF_PACKAGES.some((name) => key === `node_modules/${name}` || key.endsWith(`/node_modules/${name}`))) {
			delete lock.packages[key];
			removed++;
		}
	}
	return { text: JSON.stringify(lock, null, 2) + '\n', removed };
}

/** The dd run id in the link of a `QA Webservice` check: https://dd.lucca.tech/qa/run/82348/e2e. */
export const qaRunId = (link) => Number(/\/qa\/run\/(\d+)/.exec(link ?? '')?.[1]) || undefined;

/** A comment that starts a QA Webservice run (IssueCommentTriggers.cs in LuccaSA/QA.Webservice). */
export const isQaTrigger = (body) => /🎮|🕹️|:video_game:|:joystick:|play test/i.test(body ?? '');

/**
 * Where a bump pull request stands, from its checks and comments.
 * `front / ci` gates the QA: the 🎮 is only posted on a front that builds.
 */
export function classify({ checks, comments }) {
	// A check runs once per event (pull_request, push…) and per re-run: the latest start is the current verdict.
	const latest = (name) =>
		checks.filter((c) => c.name === name).sort((a, b) => String(b.startedAt ?? '').localeCompare(String(a.startedAt ?? '')))[0];
	const front = latest('front / ci');
	const qa = latest('QA Webservice');
	const triggered = comments.some((c) => isQaTrigger(c.body));
	const frontState = front ? front.bucket : 'missing';
	let qaState;
	if (qa) qaState = qa.bucket === 'pending' ? 'running' : 'done';
	else qaState = triggered ? 'queued' : 'not-triggered';
	return {
		front: frontState,
		frontLink: front?.link,
		triggered,
		qa: qaState,
		qaBucket: qa?.bucket,
		qaRun: qaRunId(qa?.link),
		canTrigger: frontState === 'pass' && !triggered,
	};
}
