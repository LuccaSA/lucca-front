import { OverlayModule } from '@angular/cdk/overlay';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipPanelComponent, LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { ButtonComponent } from '@lucca/prisme/button';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory, generateInputs } from '../../../helpers/stories';
import { mapInputs, sleep, waitForAngular } from '../../../helpers/test';

export default {
	title: 'Documentation/Overlays/Tooltip/Basic',
	argTypes: {
		luTooltipEnterDelay: {
			description: 'Délai d’apparition du tooltip au survol (en ms).',
			control: { type: 'number' },
			table: {
				category: 'inputs',
				defaultValue: { summary: '300' },
			},
		},
		luTooltipLeaveDelay: {
			description: 'Délai de disparition du tooltip après la fin du survol (en ms).',
			control: { type: 'number' },
			table: {
				category: 'inputs',
				defaultValue: { summary: '100' },
			},
		},
		luTooltipDisabled: {
			description: 'Désactive le tooltip.',
			control: { type: 'boolean' },
			table: {
				category: 'inputs',
				defaultValue: { summary: 'false' },
			},
		},
		luTooltipPosition: {
			description: 'Position du tooltip par rapport à son élément déclencheur.',
			control: 'inline-radio',
			options: ['above', 'below', 'before', 'after'],
			table: {
				category: 'inputs',
				defaultValue: { summary: 'above' },
			},
		},
		luTooltipWhenEllipsis: {
			description: 'N’affiche le tooltip que lorsque le contenu de l’élément déclencheur est tronqué par une ellipse.',
			control: { type: 'boolean' },
			table: {
				category: 'inputs',
				defaultValue: { summary: 'false' },
			},
		},
		luTooltipOnlyForDisplay: {
			description: 'Affiche un tooltip non restituée par les lecteurs d’écran. À utiliser si la réstitution est déjà portée par l’élément déclencheur (ex. une icône avec attribut `alt`)',
		},
	},
	decorators: [
		applicationConfig({ providers: [provideAnimations()] }),
		moduleMetadata({
			imports: [LuTooltipTriggerDirective, OverlayModule, LuTooltipPanelComponent, IconComponent, ButtonComponent],
		}),
	],
	render: (args, { argTypes }) => {
		const inputs = generateInputs(args, argTypes);
		return {
			styles: [
				`
					h3 {
						margin-block: var(--pr-t-spacings-200) 0;
						margin-inline: 0;
					}
					.ellipsis-example {
						inline-size: 11rem;
					}
				`,
			],
			template: `<h3>Tooltip simple</h3>
<button
	id="random-story-id"
	type="button"
	luButton
	luTooltip="👋 Hello"
	${inputs}
>Tooltip au survol</button>
<h3>Tooltip sur un texte</h3>
<span

	luTooltip="👋 Hello"
	${inputs}
>Tooltip au survol</span>
<h3>Tooltip et ellipse</h3>
<div
	data-testid="ellipsis-truncated"
	class="pr-u-ellipsis"
	style="inline-size: 10rem;"
	luTooltip="Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol."
	${generateInputs(args, argTypes)}
	[luTooltipWhenEllipsis]="true"
>Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol.</div>
<div
	data-testid="ellipsis-not-truncated"
	class="pr-u-ellipsis"
	luTooltip="Ce texte est affiché entièrement. Le tooltip n'apparait pas au survol."
	${generateInputs(args, argTypes)}
	[luTooltipWhenEllipsis]="true"
>Ce texte est affiché entièrement. Le tooltip n'apparait pas au survol.</div>
<h3>Tooltip et icône (avec alternative)</h3>
<lu-icon data-testid="icon-tooltip" icon="star" alt="Favoris" luTooltip="Favoris" ${inputs} luTooltipOnlyForDisplay="true" />

<h3>Tooltip affiché avec un host séparé</h3>
<span class="pr-u-marginInlineEnd800" luTooltip="… mais apparait là !" [luTooltipAnchor]="target">Tooltip déclenché ici…</span><span aria-hidden="true" #target class="lucca-icon icon-target">
`,
		};
	},
} as Meta;

export const Basic: StoryObj<LuTooltipTriggerDirective> = {
	args: {
		luTooltipEnterDelay: 300,
		luTooltipLeaveDelay: 100,
		luTooltipDisabled: false,
		luTooltipPosition: 'above',
	},
};

export const BasicTEST = createTestStory(
	{
		...Basic,
		args: {
			...Basic.args,
			luTooltipEnterDelay: 0,
			luTooltipLeaveDelay: 0,
		},
	},
	async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const inputs = canvas.getAllByRole('button');

		// Map inputs to named references
		const { button, span } = mapInputs(inputs, {
			button: 0,
			span: 1,
		});

		await step('ButtonTooltip', async () => {
			await step('Focus', async () => {
				button.focus();
				await expect(button).toHaveFocus();
				await waitForAngular();
				await expect(screen.getByRole('tooltip')).toBeVisible();
				button.blur();
				await waitForAngular();
			});

			await step('Hover', async () => {
				await userEvent.hover(button);
				await waitForAngular();
				await expect(screen.getByRole('tooltip')).toBeVisible();
			});

			await step('Unhover', async () => {
				await userEvent.unhover(button);
				await waitForAngular();
				await expect(screen.queryByRole('tooltip')).toBeNull();
			});
		});

		await step('SpanTooltip', async () => {
			await step('Focus', async () => {
				span.focus();
				await expect(span).toHaveFocus();
				await waitForAngular();
				await expect(screen.getByRole('tooltip')).toBeVisible();
				span.blur();
				await waitForAngular();
			});
		});

		await step('EllipsisTooltip', async () => {
			const ellipsisWithTooltip = canvas.getByTestId('ellipsis-truncated');
			// Wait for the ellipsis detection debounce (150ms) to complete
			await sleep(200);
			await waitForAngular();

			await step('Focus', async () => {
				ellipsisWithTooltip.focus();
				await expect(ellipsisWithTooltip).toHaveFocus();
				await waitForAngular();
				await expect(screen.getByRole('tooltip')).toBeVisible();
				ellipsisWithTooltip.blur();
				await waitForAngular();
			});

			await step('Hover', async () => {
				await userEvent.hover(ellipsisWithTooltip);
				await waitForAngular();
				await expect(screen.getByRole('tooltip')).toBeVisible();
				await userEvent.unhover(ellipsisWithTooltip);
				await waitForAngular();
			});
		});

		await step('IconTooltip', async () => {
			const icon = canvas.getByTestId('icon-tooltip');

			await step('Hover', async () => {
				await userEvent.hover(icon);
				await waitForAngular();
				await expect(screen.getByRole('tooltip')).toBeVisible();
			});

			await step('Unhover', async () => {
				await userEvent.unhover(icon);
				await waitForAngular();
				await expect(screen.queryByRole('tooltip')).toBeNull();
			});
		});
	},
);
