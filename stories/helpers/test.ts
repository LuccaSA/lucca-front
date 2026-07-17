import { expect, screen, userEvent, within } from 'storybook/test';

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

/**
 * The vitest browser environment doesn't load the global component styles (packages/ng/styles),
 * so select panels have no max-height nor opening animation there. This re-creates the production
 * constraints (copied from packages/ng/styles/components/_picker.scss and
 * packages/scss/src/commons/utils/keyframe.scss) so scroll-related assertions are meaningful.
 */
export function ensurePickerPanelStyles(): void {
	if (document.getElementById('test-picker-panel-styles')) {
		return;
	}
	const style = document.createElement('style');
	style.id = 'test-picker-panel-styles';
	style.textContent = `
		/* Hold at scale(0) for the first half: production's scaleIn starts at scale(0) for a frame,
		   widening that window makes the "scroll during opening animation" regression deterministic */
		@keyframes testScaleIn { 0% { transform: scale(0); } 50% { transform: scale(0); } 100% { transform: scale(1); } }
		.lu-picker-content {
			max-block-size: 20rem;
			overflow-y: auto;
			display: block;
			animation: testScaleIn 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
		}
		/* Realistic option row height (production ~2.75rem), so long lists actually overflow */
		.lu-picker-content [role='option'] {
			display: block;
			min-block-size: 2.75rem;
		}
	`;
	document.head.appendChild(style);
}

/**
 * Returns the scrollable container of the currently open select panel
 * (walks up from the listbox element to the first scrollable ancestor).
 */
export function getPanelScrollContainer(): HTMLElement {
	let element: HTMLElement | null = screen.getByRole('listbox');
	while (element && element.scrollHeight <= element.clientHeight + 1) {
		element = element.parentElement;
	}
	return element ?? screen.getByRole('listbox');
}

/**
 * Whether the given option is fully visible inside the open select panel's scroll container.
 */
export function isFullyVisibleInPanel(option: HTMLElement): boolean {
	const containerRect = getPanelScrollContainer().getBoundingClientRect();
	const rect = option.getBoundingClientRect();
	// While the opening animation runs (scale(0)), rects are degenerate: not visible yet
	return rect.height > 0 && rect.top >= containerRect.top - 2 && rect.bottom <= containerRect.bottom + 2;
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

export async function pickDay(input: HTMLElement, targetDay: number, multipleGrid = false) {
	await userEvent.click(input);
	await waitForAngular();
	const table = multipleGrid ? screen.getAllByRole('grid')[0] : screen.getByRole('grid');
	const calendarComponent = table.parentElement?.parentElement;
	const calendar = within(calendarComponent);
	await userEvent.click(calendar.getByText(targetDay.toString()));
	await waitForAngular();
}
