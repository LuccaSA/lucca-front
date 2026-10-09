import { within } from 'storybook/test';

/**
 * Item labels in their DOM order. Only the item's own text nodes are read: its handle holds a masked "Déplacer …" label.
 */
export function getItems(list: HTMLElement): string[] {
	return within(list)
		.queryAllByRole('listitem')
		.map((item) =>
			[...item.childNodes]
				.filter((node) => node.nodeType === Node.TEXT_NODE)
				.map((node) => node.textContent)
				.join('')
				.trim(),
		);
}

/**
 * The menu lives in the CDK overlay, outside the story canvas: the handle's `aria-controls` points at it while it is opened.
 */
export function getMenu(handle: HTMLElement): HTMLElement {
	const menuId = handle.getAttribute('aria-controls');
	const menu = menuId ? document.getElementById(menuId) : null;
	if (!menu) {
		throw new Error('Le menu de la poignée est fermé.');
	}
	return menu;
}

/**
 * Accessible name of an item's handle, with the `fr-FR` locale forced by `createTestStory`.
 */
export function handleName(item: string): string {
	return `Déplacer « ${item} »`;
}
