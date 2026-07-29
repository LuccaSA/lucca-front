/**
 * Figma Code Connect context collector.
 *
 * Fetches structured component metadata (variant properties, descendant tree)
 * from the Figma REST API. This data feeds `*.figma.md` files.
 *
 * UNVERSIONED — Figma has no release concept; we snapshot the current state
 * at generation time. Output goes to `references/components/<slug>/`.
 *
 * Uses the Figma REST API `GET /v1/files/:key/nodes` with the component node IDs,
 * then parses the componentPropertyDefinitions for variant options.
 */

import fs from 'fs';
import path from 'path';
import { FigmaDesignTokens, FigmaProperty } from '../types';
import { TransientFetchError, recordWarning } from './fetch-failures';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
/**
 * `GET /v1/files/:key/nodes` is a Tier 1 endpoint (the most rate-limited: ~10-20 req/min depending
 * on plan/seat). The primary defense is therefore to make FEW requests, not to pace many:
 *   • `prefetchFigmaNodes` batches all node ids into a handful of requests (the `ids` param takes
 *     a comma-separated list) and `depth=1` keeps payloads small (we only read the root node);
 *   • the remaining safety net: serialize (1 in-flight) + a minimum interval between request
 *     starts, honour the server's Retry-After and retry generously.
 * Every node then eventually succeeds within the run (output complete & reproducible). All three
 * knobs are overridable via env for tuning.
 */
const MAX_RETRIES = Math.max(1, Number(process.env.FIGMA_MAX_RETRIES) || 10);
const MAX_CONCURRENT = Math.max(1, Number(process.env.FIGMA_MAX_CONCURRENT) || 1);
const MIN_INTERVAL_MS = Number(process.env.FIGMA_MIN_INTERVAL_MS) || 200;
/** Node ids per batched prefetch request (the URL stays well under length limits). */
const PREFETCH_CHUNK_SIZE = Math.max(1, Number(process.env.FIGMA_PREFETCH_CHUNK) || 40);

/**
 * Process-wide cache of fetched node responses, keyed by `fileKey:nodeId`.
 * Figma is unversioned, so the same node is requested once per version (15×) during a
 * full run — the cache collapses that to a single network call and keeps link emission
 * consistent across versions. A failed fetch is NOT cached, so a later version can retry.
 */
const figmaCache = new Map<string, FigmaDesignTokens | null>();

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// ── Throttle: cap concurrency AND space request starts by a minimum interval ─────
let active = 0;
const waiters: (() => void)[] = [];
let nextAllowedStart = 0;

async function acquire(): Promise<void> {
	if (active < MAX_CONCURRENT) {
		active++;
	} else {
		await new Promise<void>((resolve) => waiters.push(resolve));
		active++;
	}
	// Pace request starts: never fire two within MIN_INTERVAL_MS of each other.
	const now = Date.now();
	const wait = Math.max(0, nextAllowedStart - now);
	nextAllowedStart = Math.max(now, nextAllowedStart) + MIN_INTERVAL_MS;
	if (wait > 0) await sleep(wait);
}
function release(): void {
	active--;
	waiters.shift()?.();
}

interface FigmaResult {
	ok: boolean;
	json?: any;
	status?: string;
	reason?: string;
}

/**
 * One throttled Figma request. Retries 429 / 5xx / network errors with backoff (honouring
 * `Retry-After`). Returns the parsed JSON on success, or a failure when retries are exhausted.
 * A non-retryable HTTP status (e.g. 403) is returned as a failure too (caller decides).
 */
async function figmaRequest(url: string, token: string): Promise<FigmaResult> {
	let lastStatus = 'unknown';
	let lastReason = '';

	for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
		await acquire();
		let response: Response;
		try {
			response = await fetch(url, { headers: { 'X-Figma-Token': token } });
		} catch (err: any) {
			release();
			lastStatus = 'network';
			lastReason = err?.message ?? 'fetch failed';
			if (attempt >= MAX_RETRIES) break;
			console.warn(`  ⏳ Figma réseau — retry ${attempt + 1}/${MAX_RETRIES}`);
			await sleep(Math.min(1000 * 2 ** attempt, 30000));
			continue;
		}
		release();

		if (response.ok) return { ok: true, json: await response.json() };

		lastStatus = String(response.status);
		lastReason = response.statusText || 'HTTP error';

		const retryable = response.status === 429 || response.status >= 500;
		if (!retryable || attempt >= MAX_RETRIES) return { ok: false, status: lastStatus, reason: lastReason };

		const retryAfter = Number(response.headers.get('retry-after'));
		const backoffMs = retryAfter > 0 ? retryAfter * 1000 : Math.min(1000 * 2 ** attempt, 30000);
		console.warn(`  ⏳ Figma ${response.status} — retry ${attempt + 1}/${MAX_RETRIES} in ${Math.round(backoffMs / 1000)}s`);
		await sleep(backoffMs);
	}

	return { ok: false, status: lastStatus, reason: lastReason };
}

interface FigmaNodeDoc {
	name: string;
	type: string;
	componentPropertyDefinitions?: Record<
		string,
		{
			type: string;
			defaultValue: string;
			variantOptions?: string[];
		}
	>;
}

interface FigmaNodeResponse {
	nodes: Record<string, { document: FigmaNodeDoc } | null>;
}

// ─── Shrink-guard baseline (report-only) ─────────────────────────────────────
//
// Last-known property set per node, persisted across runs (COMMITTED — shared across machines,
// like the ZH baseline). Unlike the ZH baseline it never replaces the output: a 200 from the
// Figma API is authoritative (a property removed there IS removed). It only reports
// disappearances (properties or variant options gone vs the last generation) so a
// legitimate-but-uncommon deletion gets a human look. `--accept-shrink` updates the baseline
// and silences the warning.

interface FigmaBaselineEntry {
	componentName: string;
	/** Property name → variant options (null for non-variant properties). */
	properties: Record<string, string[] | null>;
}

const BASELINE_FILE = path.join(__dirname, '..', 'baselines', 'figma.json');

let acceptShrink = false;

/** Set by the CLI when `--accept-shrink` is passed: disappearances update the baseline silently. */
export function setAcceptShrink(value: boolean): void {
	acceptShrink = value;
}

let baselineMap: Record<string, FigmaBaselineEntry> | null = null;

function loadBaseline(): Record<string, FigmaBaselineEntry> {
	if (baselineMap) return baselineMap;
	try {
		baselineMap = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf-8'));
	} catch {
		baselineMap = {};
	}
	return baselineMap!;
}

function saveBaseline(): void {
	if (!baselineMap) return;
	fs.mkdirSync(path.dirname(BASELINE_FILE), { recursive: true });
	fs.writeFileSync(BASELINE_FILE, JSON.stringify(baselineMap, null, '\t') + '\n', 'utf-8');
}

function toBaselineEntry(tokens: FigmaDesignTokens): FigmaBaselineEntry {
	const properties: Record<string, string[] | null> = {};
	for (const p of tokens.properties) {
		properties[p.name] = p.variantOptions ?? null;
	}
	return { componentName: tokens.componentName, properties };
}

/** Compares fresh tokens against the node's baseline; reports disappearances (report-only). */
function checkBaseline(nodeId: string, tokens: FigmaDesignTokens | null): void {
	const baseline = loadBaseline();
	const prev = baseline[nodeId];

	if (tokens === null) {
		if (prev) {
			recordWarning({
				source: 'figma',
				label: `${prev.componentName} (${nodeId})`,
				reason: 'node absent de la réponse Figma alors qu’il existait au run précédent',
			});
			if (acceptShrink) {
				delete baseline[nodeId];
				saveBaseline();
			}
		}
		return;
	}

	if (prev) {
		const freshProps = new Map(tokens.properties.map((p) => [p.name, p.variantOptions ?? null]));
		const lost: string[] = [];
		for (const [name, prevOptions] of Object.entries(prev.properties)) {
			const freshOptions = freshProps.get(name);
			if (freshOptions === undefined) {
				lost.push(`propriété « ${name} » disparue`);
			} else if (prevOptions) {
				const gone = prevOptions.filter((o) => !(freshOptions ?? []).includes(o));
				if (gone.length > 0) lost.push(`variante(s) disparue(s) sur « ${name} » : ${gone.join(', ')}`);
			}
		}
		if (lost.length > 0 && !acceptShrink) {
			recordWarning({
				source: 'figma',
				label: `${tokens.componentName} (${nodeId})`,
				reason: `${lost.join(' ; ')} — le contenu frais est écrit ; --accept-shrink met à jour la référence`,
			});
			return; // keep the previous baseline so the warning persists until accepted
		}
	}

	baseline[nodeId] = toBaselineEntry(tokens);
	saveBaseline();
}

/** Parses a node document into design tokens and runs the baseline check. Caches the result. */
function parseAndCacheNode(fileKey: string, nodeId: string, doc: FigmaNodeDoc | undefined): FigmaDesignTokens | null {
	const cacheKey = `${fileKey}:${nodeId}`;

	if (!doc) {
		figmaCache.set(cacheKey, null); // definitive: node absent from a 200 response
		checkBaseline(nodeId, null);
		return null;
	}

	const propDefs = doc.componentPropertyDefinitions;
	const result: FigmaDesignTokens = {
		componentName: doc.name,
		nodeId,
		properties: propDefs
			? Object.entries(propDefs).map(([name, def]) => ({
					name: cleanPropertyName(name),
					type: mapFigmaType(def.type),
					variantOptions: def.variantOptions ?? undefined,
				}))
			: [],
	};

	figmaCache.set(cacheKey, result);
	checkBaseline(nodeId, result);
	return result;
}

/** Node request URL. `depth=1`: we only read the root node (name + componentPropertyDefinitions). */
function nodesUrl(fileKey: string, nodeIds: string[]): string {
	return `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${nodeIds.map(encodeURIComponent).join(',')}&depth=1`;
}

/**
 * Batched prefetch: fetches all uncached node ids in chunks of PREFETCH_CHUNK_SIZE and fills the
 * cache. With ~90 distinct nodes this is 2-3 Tier-1 requests instead of 90 — the actual fix for
 * Figma's per-minute quota. A failed chunk is only logged: the per-component fetch falls back to
 * individual (retried, failure-recorded) requests for the missing nodes.
 */
export async function prefetchFigmaNodes(fileKey: string, nodeIds: string[], token: string): Promise<void> {
	const pending = [...new Set(nodeIds)].filter((id) => !figmaCache.has(`${fileKey}:${id}`));
	if (pending.length === 0) return;

	const chunks: string[][] = [];
	for (let i = 0; i < pending.length; i += PREFETCH_CHUNK_SIZE) {
		chunks.push(pending.slice(i, i + PREFETCH_CHUNK_SIZE));
	}

	console.log(`🎨 Prefetch Figma : ${pending.length} node(s) en ${chunks.length} requête(s)...`);
	for (const chunk of chunks) {
		const res = await figmaRequest(nodesUrl(fileKey, chunk), token);
		if (!res.ok) {
			console.warn(`  ⚠️  Prefetch Figma (${chunk.length} nodes) : ${res.status} ${res.reason ?? ''} — fallback unitaire`);
			continue;
		}
		const data = res.json as FigmaNodeResponse;
		for (const nodeId of chunk) {
			parseAndCacheNode(fileKey, nodeId, data.nodes[nodeId]?.document);
		}
	}
}

/**
 * Fetches Figma design tokens for a single node (cache-first — a prior `prefetchFigmaNodes`
 * normally makes this a no-op network-wise).
 *
 * @param fileKey — Figma file key (e.g. "PQEOcUF9CYfKNqaejAGLWP")
 * @param nodeId — Node ID of the component set (e.g. "6854:42773")
 * @param token — Figma Personal Access Token
 */
export async function fetchFigmaDesignTokens(fileKey: string, nodeId: string, token: string): Promise<FigmaDesignTokens | null> {
	const cacheKey = `${fileKey}:${nodeId}`;
	if (figmaCache.has(cacheKey)) return figmaCache.get(cacheKey)!;

	const res = await figmaRequest(nodesUrl(fileKey, [nodeId]), token);

	if (!res.ok) {
		if (res.status === '404') {
			figmaCache.set(cacheKey, null); // definitive: node doesn't exist, don't retry
			return null;
		}
		// transient (429/5xx/network exhausted) or non-retryable error: NOT cached, surfaced as a failure
		throw new TransientFetchError(res.status ?? 'unknown', `Figma node ${nodeId}: ${res.reason ?? 'erreur'} (après ${MAX_RETRIES} retries)`);
	}

	const data = res.json as FigmaNodeResponse;
	return parseAndCacheNode(fileKey, nodeId, data.nodes[nodeId]?.document);
}

/**
 * Fetches and merges Figma tokens for ALL of a component's node ids (e.g. aliases or split
 * component sets like dialog/skeleton). Properties are deduplicated by name; the component name
 * comes from the first node that resolves. Throws `TransientFetchError` if any node fetch fails.
 */
export async function fetchFigmaDesignTokensMerged(
	fileKey: string,
	nodeIds: string[],
	token: string,
): Promise<FigmaDesignTokens | null> {
	if (nodeIds.length === 0) return null;

	const allProperties = new Map<string, FigmaProperty>();
	let componentName = '';
	let firstNodeId = '';

	for (const nodeId of nodeIds) {
		const tokens = await fetchFigmaDesignTokens(fileKey, nodeId, token);
		if (!tokens) continue;

		if (!componentName) {
			componentName = tokens.componentName;
			firstNodeId = tokens.nodeId;
		}
		for (const prop of tokens.properties) {
			if (!allProperties.has(prop.name)) allProperties.set(prop.name, prop);
		}
	}

	if (!componentName) return null;

	return {
		componentName,
		nodeId: firstNodeId,
		properties: [...allProperties.values()],
	};
}

/**
 * Clean Figma property names.
 * Figma appends "#123:456" suffixes to disambiguate properties — strip them.
 */
function cleanPropertyName(name: string): string {
	return name.replace(/#[\d:]+$/, '').trim();
}

function mapFigmaType(figmaType: string): FigmaProperty['type'] {
	switch (figmaType) {
		case 'VARIANT':
			return 'VARIANT';
		case 'TEXT':
			return 'TEXT';
		case 'INSTANCE_SWAP':
			return 'INSTANCE_SWAP';
		case 'BOOLEAN':
			return 'BOOLEAN';
		default:
			return 'VARIANT';
	}
}
