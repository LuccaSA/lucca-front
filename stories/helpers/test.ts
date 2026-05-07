import { expect, userEvent, within } from 'storybook/test';

export async function sleep(ms: number) {
	await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * You might be wondering what the hell this is.
 * This is due to Storybook's play function not waiting for zone to be stable, effectively
 * running it before the component is fully initialized (ngOnInit and a couple of change detection cycles done).
 *
 * Eventually, we'll find a better global version for this to make sure zone is stable etc, but as it's a standalone function,
 * implementing it here will eb easy once we know how to do it and it'll be propagated to all stories using this function.
 */
export async function waitForAngular() {
	await sleep(10);
}

export async function expectNgModelDisplay(canvas: HTMLElement, expectedValue: string) {
	const canvasElement = within(canvas);
	const modelDisplay = canvasElement.getByTestId('pr-ng-model');
	await expect(modelDisplay).toHaveTextContent(expectedValue);
}

export async function clearInputs(inputs: HTMLElement[]) {
	for (const input of inputs) {
		await userEvent.clear(input);
	}
}

export async function repeatKeyboardUserEvent(key: string, count: number) {
	for (let i = 0; i < count; i++) {
		await userEvent.keyboard(key);
	}
}

export function mapInputs<T extends Record<string, number>>(inputs: HTMLElement[], mapping: T): Record<keyof T, HTMLElement> {
	const result: Record<string, HTMLElement> = {};
	for (const [key, index] of Object.entries(mapping)) {
		result[key] = inputs[index];
	}
	return result as Record<keyof T, HTMLElement>;
}
