import { OverlayModule } from '@angular/cdk/overlay';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipPanelComponent, LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../helpers/stories';

export default {
	title: 'Documentation/Overlays/Tooltip/Basic',
	argTypes: {
		luTooltipEnterDelay: {
			control: { type: 'number' },
			table: {
				category: 'inputs',
				defaultValue: { summary: '300' },
			},
		},
		luTooltipLeaveDelay: {
			control: { type: 'number' },
			table: {
				category: 'inputs',
				defaultValue: { summary: '100' },
			},
		},
		luTooltipDisabled: {
			control: { type: 'boolean' },
			table: {
				category: 'inputs',
				defaultValue: { summary: 'false' },
			},
		},
		luTooltipPosition: {
			control: 'inline-radio',
			options: ['above', 'below', 'before', 'after'],
			table: {
				category: 'inputs',
				defaultValue: { summary: 'above' },
			},
		},
		luTooltipWhenEllipsis: {
			control: { type: 'boolean' },
			table: {
				category: 'inputs',
				defaultValue: { summary: 'false' },
			},
		},
		luTooltipOnlyForDisplay: {
			description: '[v18.2]',
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
	class="pr-u-ellipsis"
	style="width: 10rem;"
	luTooltip="Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol."
	${generateInputs(args, argTypes)}
	[luTooltipWhenEllipsis]="true"
>Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol.</div>
<div
	class="pr-u-ellipsis"
	luTooltip="Ce texte est affiché entièrement. Le tooltip n'apparait pas au survol."
	${generateInputs(args, argTypes)}
	[luTooltipWhenEllipsis]="true"
>Ce texte est affiché entièrement. Le tooltip n'apparait pas au survol.</div>
<h3>Tooltip et icône (avec alternative)</h3>
<lu-icon icon="star" alt="Favoris" luTooltip="Favoris" luTooltipOnlyForDisplay="true" />

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
