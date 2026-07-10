/**
 * Builds documentation links for tokens and utility classes. Pure — no 'vscode'
 * import.
 *
 * Two sources:
 *  - The ZeroHeight "Prisme" design-system site — always linkable, but only at
 *    its root (page IDs are opaque hex, not derivable from a token/class name).
 *  - Storybook autodocs — per-family pages for the ~16 utility families that
 *    have a story. The Storybook host isn't derivable, so it's only used when
 *    the user configures a base URL. Tokens and unmapped utilities (spacing,
 *    gap, flex, …) have no Storybook page.
 */

/** Canonical human-facing design-system docs (ZeroHeight Prisme). */
export const PRISME_DOCS_URL = 'https://prisme.lucca.io/94310e217/';

export interface DocLink {
	label: string;
	url: string;
}

/**
 * Ordered map from utility class name → Storybook autodocs family slug. The
 * slug is the sanitized story title (lowercased, camelCase NOT split). Only the
 * families that have a dedicated story are listed; anything unmatched (spacing,
 * gap, flex, alignment, …) intentionally has no Storybook page. Hand-maintained.
 */
const UTILITY_FAMILY_SLUGS: { test: RegExp; slug: string }[] = [
	{ test: /^pr-u-(colorText|text[A-Z][a-z]|text(XS|S|M|L|XL|XXL|XXXL)$)/, slug: 'textcolor' },
	{ test: /^pr-u-body|^pr-u-h[1-6]$|^pr-u-fontWeight|^pr-u-fontFamily/, slug: 'textstyle' },
	{ test: /^pr-u-textAlign|^pr-u-textDecoration|^pr-u-whiteSpace|^pr-u-textLeft$|^pr-u-textRight$|^pr-u-textCenter$/, slug: 'textstyle' },
	{ test: /^pr-u-display/, slug: 'display' },
	{ test: /^pr-u-(flexDirection|justifyContent|alignItems|flexWrap|flex|order|placeItemsCenter)/, slug: 'display' },
	{ test: /^pr-u-position|^pr-u-(top|bottom|left|right|inset)/, slug: 'position' },
	{ test: /^pr-u-float|^pr-u-clear/, slug: 'float' },
	{ test: /^pr-u-visibility/, slug: 'visibility' },
	{ test: /^pr-u-verticalAlign/, slug: 'verticalalign' },
	{ test: /^pr-u-shadow|^pr-u-elevation/, slug: 'shadows' },
	{ test: /^pr-u-border[A-Z].*Radius|^pr-u-borderRadius/, slug: 'borderradius' },
	{ test: /^pr-u-border/, slug: 'border' },
	{ test: /^pr-u-ellipsis/, slug: 'ellipsis' },
	{ test: /^pr-u-onlyPrint/, slug: 'print' },
	{ test: /^pr-u-(listReset|buttonReset|clearfix)/, slug: 'reset' },
	{ test: /^pr-u-animated/, slug: 'spin' },
	{ test: /^pr-u-help/, slug: 'help' },
];

function familySlug(className: string): string | undefined {
	return UTILITY_FAMILY_SLUGS.find((entry) => entry.test.test(className))?.slug;
}

function storybookUrl(base: string, slug: string): string {
	return `${base.replace(/\/+$/, '')}/?path=/docs/documentation-integration-utilities-${slug}--docs`;
}

/** Placeholder in the configured base URL, replaced with the installed version alias. */
const VERSION_PLACEHOLDER = '{version}';

/**
 * The Storybook path segment for a lib version, e.g. `20.3.1` → `v20.3`
 * (deployments publish a stable `v<major>.<minor>` alias). Returns undefined
 * when the version can't be parsed (dev/link installs, override).
 */
export function versionSegment(libVersion: string | undefined): string | undefined {
	const match = /^(\d+)\.(\d+)/.exec(libVersion ?? '');
	if (!match || match[1] === '0') {
		// Major 0 is the dev/workspace-link sentinel (0.0.0) — no published storybook.
		return undefined;
	}
	return `v${match[1]}.${match[2]}`;
}

/**
 * Resolves the configured base URL. If it contains `{version}`, the placeholder
 * is filled from the installed lib version; when that can't be derived, the
 * base is unusable and undefined is returned (so we fall back to Prisme only).
 */
function resolveBase(base: string, libVersion: string | undefined): string | undefined {
	if (!base.includes(VERSION_PLACEHOLDER)) {
		return base;
	}
	const segment = versionSegment(libVersion);
	return segment ? base.split(VERSION_PLACEHOLDER).join(segment) : undefined;
}

const prismeLink: DocLink = { label: '📘 Prisme docs', url: PRISME_DOCS_URL };

/** Links for a utility class: always Prisme, plus a Storybook family page when derivable and configured. */
export function utilityDocLinks(className: string, storybookBaseUrl: string, libVersion?: string): DocLink[] {
	const links: DocLink[] = [prismeLink];
	const slug = familySlug(className);
	const base = storybookBaseUrl ? resolveBase(storybookBaseUrl, libVersion) : undefined;
	if (base && slug) {
		links.push({ label: '📖 Storybook', url: storybookUrl(base, slug) });
	}
	return links;
}

/** Links for a custom property: Prisme only (tokens are not deep-linkable). */
export function propertyDocLinks(): DocLink[] {
	return [prismeLink];
}

/** Renders links as a single markdown line. */
export function renderDocLinks(links: DocLink[]): string {
	return links.map((l) => `[${l.label}](${l.url})`).join(' · ');
}
