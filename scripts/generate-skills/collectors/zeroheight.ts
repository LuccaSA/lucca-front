import { Config, McpContext, McpTool } from '../types';

/**
 * Client MCP HTTP pour Zeroheight (Prisme — Design System Lucca).
 * Protocole : JSON-RPC 2.0 over HTTP (MCP 2024-11-05).
 * Fallback SSE si le serveur répond avec text/event-stream.
 */

let _sessionId: string | null = null;
let _availableTools: McpTool[] = [];

export async function initializeMcp(config: Config): Promise<McpContext> {
	const mcpUrl = config.zeroheight.mcpUrl;
	console.log('🎨 Initialisation du MCP Zeroheight...');

	// 1. initialize
	const initRes = await mcpPost(mcpUrl, {
		jsonrpc: '2.0',
		method: 'initialize',
		id: 1,
		params: {
			protocolVersion: '2024-11-05',
			capabilities: {},
			clientInfo: { name: 'lucca-skills-generator', version: '1.0.0' },
		},
	});

	if (initRes.error) {
		throw new Error(`MCP initialize error: ${JSON.stringify(initRes.error)}`);
	}

	// 2. notifications/initialized (notification — pas de réponse attendue)
	await mcpPost(mcpUrl, {
		jsonrpc: '2.0',
		method: 'notifications/initialized',
		params: {},
	}).catch(() => {});

	// 3. tools/list
	const toolsRes = await mcpPost(mcpUrl, {
		jsonrpc: '2.0',
		method: 'tools/list',
		id: 2,
		params: {},
	});

	_availableTools = toolsRes.result?.tools || [];
	const toolNames = _availableTools.map((t) => t.name);
	console.log(`  Outils MCP disponibles : ${toolNames.join(', ') || '(aucun)'}`);

	return { mcpUrl, availableTools: toolNames };
}

export async function fetchComponentGuidelines(mcpUrl: string, componentName: string): Promise<Record<string, string>> {
	const results: Record<string, string> = {};

	for (const tool of _availableTools) {
		try {
			const res = await mcpPost(mcpUrl, {
				jsonrpc: '2.0',
				method: 'tools/call',
				id: Math.floor(Math.random() * 100000),
				params: {
					name: tool.name,
					arguments: {
						query: componentName,
						component: componentName,
						// Certains outils Zeroheight prennent un argument "page" ou "styleguide"
						page: componentName,
					},
				},
			});

			if (res.result?.content) {
				const text: string = res.result.content
					.filter((c: any) => c.type === 'text')
					.map((c: any) => c.text)
					.join('\n')
					.trim();

				if (text) {
					results[tool.name] = text;
				}
			}
		} catch {
			// Cet outil n'a pas retourné de résultat pour ce composant — on continue
		}
	}

	return results;
}

async function mcpPost(url: string, body: object): Promise<any> {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		Accept: 'application/json, text/event-stream',
	};

	if (_sessionId) {
		headers['Mcp-Session-Id'] = _sessionId;
	}

	const res = await fetch(url, {
		method: 'POST',
		headers,
		body: JSON.stringify(body),
	});

	// Capture le session ID si présent
	const newSessionId = res.headers.get('Mcp-Session-Id');
	if (newSessionId) {
		_sessionId = newSessionId;
	}

	const contentType = res.headers.get('content-type') || '';

	// Réponse SSE (text/event-stream)
	if (contentType.includes('text/event-stream')) {
		const text = await res.text();
		for (const line of text.split('\n')) {
			if (line.startsWith('data: ')) {
				try {
					return JSON.parse(line.slice(6));
				} catch {
					// ligne SSE non-JSON, on continue
				}
			}
		}
		return {};
	}

	// notifications/initialized : le serveur peut répondre 202 sans corps
	if (!res.ok && (body as any).method !== 'notifications/initialized') {
		const text = await res.text();
		throw new Error(`MCP HTTP ${res.status}: ${text}`);
	}

	if (res.status === 200 || res.status === 201) {
		return res.json();
	}

	return {};
}
