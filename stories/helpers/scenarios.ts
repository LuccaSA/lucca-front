// Scenario pages run with change detection based on zone.js, like most consuming applications.
import 'zone.js';

import { provideZoneChangeDetection } from '@angular/core';
import { SELECT_RESPONSIVE_DIALOG } from '@lucca-front/ng/core-select';
import { applicationConfig, type Args, type Meta, type StoryObj } from '@storybook/angular-vite';
import type { RequestHandler } from 'msw';
import { expect } from 'storybook/test';
import { worker } from '../../.storybook/msw/browser';
import { createTestStory } from './stories';

/** Product palettes a scenario page can be themed with, like an application compiling its `$product`. */
export type ProductPalette = 'cleemy' | 'timmi' | 'poplee' | 'coreHR' | 'pagga' | 'cc';

// The shades of `$palettesShades` (packages/scss/src/commons/config.scss)
const paletteShades = ['text', '0', '25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

/**
 * Points every `--palettes-product-*` shade to the given palette until the story is left. Both the
 * Storybook UI and the `scenarios` project compile every product palette, so a scenario looks the
 * same in both.
 */
function applyProductPalette(palette: ProductPalette): () => void {
	const root = document.documentElement;
	const rootStyle = getComputedStyle(root);
	const shades = paletteShades.filter((shade) => rootStyle.getPropertyValue(`--palettes-${palette}-${shade}`).trim() !== '');
	if (shades.length === 0) {
		throw new Error(`The "${palette}" palette isn't compiled: the stylesheet needs \`$palettesOtherProduct: 'all'\`.`);
	}
	shades.forEach((shade) => root.style.setProperty(`--palettes-product-${shade}`, `var(--palettes-${palette}-${shade})`));
	return () => shades.forEach((shade) => root.style.removeProperty(`--palettes-product-${shade}`));
}

/**
 * Meta shared by scenario pages (`stories/scenarios/`): product-like screens that combine several
 * components with realistic data, tested in the `scenarios` Vitest project (`stories/e2e/scenarios/`).
 *
 * They run the way consuming applications do by default, not the way Storybook demoes components:
 * zone.js change detection, the select responsive dialog left to its `false` default, and the
 * product palette of the page instead of the default `brand` one, which no application ships.
 * Any axe violation fails the story.
 *
 * Storybook reads tags without running the file, so it misses the ones a spread brings: each scenario
 * meta writes its own `tags: ['scenario', '!autodocs']`.
 */
export function scenarioMeta(palette: ProductPalette) {
	return {
		parameters: {
			layout: 'fullscreen',
			a11y: { test: 'error' },
		},
		decorators: [
			applicationConfig({
				providers: [provideZoneChangeDetection(), { provide: SELECT_RESPONSIVE_DIALOG, useValue: false }],
			}),
		],
		beforeEach: () => applyProductPalette(palette),
	} satisfies Partial<Meta>;
}

/**
 * `createTestStory` for the journeys of a scenario page (`stories/e2e/scenarios/`).
 *
 * A page without the system focus gets no focus or blur event, and overlays, selects, date fields or
 * tooltips rely on them. Opening a story from the sidebar leaves the focus in the Storybook UI, so the
 * journey first gives it to the preview. If the preview loses it on the way, to another window or to
 * the Storybook UI, a failure says so. The test run never loses it: Playwright emulates the focus.
 */
export function createScenarioTestStory<TArgs = Args>(story: StoryObj<TArgs>, test: NonNullable<StoryObj<TArgs>['play']>): StoryObj<TArgs> {
	const play = async (context: Parameters<typeof test>[0]) => {
		window.focus();
		let focusLost = !document.hasFocus();
		const onBlur = () => (focusLost = true);
		window.addEventListener('blur', onBlur);
		try {
			await test(context);
		} catch (error) {
			if (!focusLost) {
				throw error;
			}
			const message = error instanceof Error ? error.message : String(error);
			throw new Error(
				`The preview lost the focus during the journey, to another window or to the Storybook UI, so the components relying on focus events behaved differently: run it again with the browser window in front.\n\n${message}`,
				{ cause: error },
			);
		} finally {
			window.removeEventListener('blur', onBlur);
		}
	};
	// Storybook types `play` with a conditional type that stays unresolved for a generic `TArgs`
	return createTestStory(story, play as typeof test);
}

/**
 * Whether the page runs in the `scenarios` Vitest project, with the global stylesheet of a consuming
 * application. The Storybook UI loads the `main-all` one, which styles every component.
 */
export const withConsumerStylesheet = (): boolean => document.documentElement.hasAttribute('data-scenarios-stylesheet');

const registeredHandlers = new Set<readonly RequestHandler[]>();

/**
 * Story loader adding the API mocks of a scenario page to the shared MSW worker, so a scenario keeps
 * its endpoints next to its page instead of in the global handlers. They are added once, before the
 * first render, and stay registered: scenario endpoints live under their own `/scenarios/<page>/` path.
 */
export function scenarioHandlers(handlers: readonly RequestHandler[]): () => Promise<void> {
	return async () => {
		if (worker && !registeredHandlers.has(handlers)) {
			worker.use(...handlers);
			registeredHandlers.add(handlers);
		}
	};
}

/** A violation already reported on a component, tolerated until it is fixed: any other one still fails. */
export interface KnownAxeViolation {
	/** axe rule id */
	rule: string;
	/** CSS selector the offending element matches */
	selector: string;
	/** Why it happens, and where it is tracked */
	reason: string;
}

/**
 * Runs axe on part of the page in the middle of a journey. The a11y addon only audits the page the
 * story leaves behind, so a dialog or a panel closed by the end of the journey would never be audited.
 */
export async function expectNoAxeViolations(context: Element, knownViolations: readonly KnownAxeViolation[] = []): Promise<void> {
	const { default: axe } = await import('axe-core');
	const { violations } = await axe.run(context, { resultTypes: ['violations'] });
	const isKnown = (rule: string, target: string) => knownViolations.some((known) => known.rule === rule && document.querySelector(target)?.matches(known.selector));
	const unexpected = violations.flatMap((violation) =>
		violation.nodes
			.map((node) => String(node.target.at(-1)))
			.filter((target) => !isKnown(violation.id, target))
			.map((target) => `${violation.id}: ${target}`),
	);
	await expect(unexpected).toEqual([]);
}

/** Every `id` of the document is unique, so `aria-labelledby` and `aria-describedby` reach the right element. */
export async function expectUniqueIds(): Promise<void> {
	const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
	const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
	await expect(duplicates).toEqual([]);
}
