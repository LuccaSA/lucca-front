import { Config, McpContext, McpTool } from '../types';

/**
 * HTTP MCP client for Zeroheight (Prisme — Lucca Design System).
 * Protocol: JSON-RPC 2.0 over HTTP (MCP 2024-11-05).
 * SSE fallback if the server responds with text/event-stream.
 */

let _sessionId: string | null = null;
let _availableTools: McpTool[] = [];

export async function initializeMcp(config: Config): Promise<McpContext> {
	const mcpUrl = config.zeroheight.mcpUrl;
	console.log('🎨 Initializing Zeroheight MCP...');

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

	// 2. notifications/initialized (fire-and-forget, no response expected)
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
	console.log(`  Available MCP tools: ${toolNames.join(', ') || '(none)'}`);

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
						// Some Zeroheight tools accept a "page" or "styleguide" argument
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
			// This tool returned no result for this component — continue
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

	// Capture session ID if present
	const newSessionId = res.headers.get('Mcp-Session-Id');
	if (newSessionId) {
		_sessionId = newSessionId;
	}

	const contentType = res.headers.get('content-type') || '';

	// SSE response (text/event-stream)
	if (contentType.includes('text/event-stream')) {
		const text = await res.text();
		for (const line of text.split('\n')) {
			if (line.startsWith('data: ')) {
				try {
					return JSON.parse(line.slice(6));
				} catch {
					// non-JSON SSE line, continue
				}
			}
		}
		return {};
	}

	// notifications/initialized: the server may return 202 with no body
	if (!res.ok && (body as any).method !== 'notifications/initialized') {
		const text = await res.text();
		throw new Error(`MCP HTTP ${res.status}: ${text}`);
	}

	if (res.status === 200 || res.status === 201) {
		return res.json();
	}

	return {};
}
