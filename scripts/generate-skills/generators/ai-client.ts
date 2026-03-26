import { Config, GenerateTextFn } from '../types';

/**
 * Multi-provider AI abstraction.
 *
 * Supported providers:
 *  - "github-models" : GitHub Models (GitHub Copilot) — OpenAI-compatible API via native fetch.
 *                      endpoint https://models.inference.ai.azure.com
 *                      token = GitHub Personal Access Token with "models" permission.
 *  - "openai"        : OpenAI API directly via native fetch.
 *  - "anthropic"     : Anthropic API (@anthropic-ai/sdk — must be installed separately).
 *
 * Returns a generateText({ systemPrompt, userPrompt }) => Promise<string> function.
 */

const GITHUB_MODELS_ENDPOINT = 'https://models.inference.ai.azure.com';
const OPENAI_ENDPOINT = 'https://api.openai.com/v1';

const DEFAULT_MODELS: Record<string, string> = {
	anthropic: 'claude-sonnet-4-5',
	openai: 'gpt-4o',
	'github-models': 'gpt-4o',
};

export async function createAiClient(config: Config): Promise<GenerateTextFn> {
	const { provider, apiKey } = config.ai;
	const model = config.ai.model || DEFAULT_MODELS[provider];

	if (provider === 'github-models' || provider === 'openai') {
		const baseURL = provider === 'github-models' ? GITHUB_MODELS_ENDPOINT : OPENAI_ENDPOINT;

		return async function generateText({ systemPrompt, userPrompt }: { systemPrompt: string; userPrompt: string }): Promise<string> {
			const MAX_RETRIES = 5;

			for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
				const res = await fetch(`${baseURL}/chat/completions`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${apiKey}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						model,
						max_tokens: 3000,
						messages: [
							{ role: 'system', content: systemPrompt },
							{ role: 'user', content: userPrompt },
						],
					}),
				});

				if (res.status === 429) {
					const body = await res.text();
					// Extract wait time from the Retry-After header or the error message
					const retryAfterHeader = res.headers.get('retry-after');
					const waitFromMessage = body.match(/wait\s+(\d+)\s+second/i)?.[1];
					const waitSeconds = retryAfterHeader ? parseInt(retryAfterHeader, 10) : waitFromMessage ? parseInt(waitFromMessage, 10) : 60;

					const waitMs = (waitSeconds + 2) * 1000; // +2s buffer
					console.log(`  ⏳ Rate limit — waiting ${waitSeconds + 2}s (attempt ${attempt}/${MAX_RETRIES})...`);
					await new Promise((resolve) => setTimeout(resolve, waitMs));
					continue;
				}

				if (!res.ok) {
					const body = await res.text();
					throw new Error(`${res.status} ${body}`);
				}

				const data = await res.json();
				return data.choices?.[0]?.message?.content ?? '';
			}

			throw new Error(`Persistent rate limit after ${MAX_RETRIES} attempts`);
		};
	}

	if (provider === 'anthropic') {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		const AnthropicModule = require('@anthropic-ai/sdk');
		const Anthropic = AnthropicModule.default ?? AnthropicModule;
		const client = new Anthropic({ apiKey });

		return async function generateText({ systemPrompt, userPrompt }: { systemPrompt: string; userPrompt: string }): Promise<string> {
			const message = await client.messages.create({
				model,
				max_tokens: 3000,
				system: systemPrompt,
				messages: [{ role: 'user', content: userPrompt }],
			});
			const block = message.content.find((b: any) => b.type === 'text');
			return block?.text ?? '';
		};
	}

	throw new Error(`Unknown AI provider "${provider}". Accepted values: "anthropic", "openai", "github-models"`);
}
