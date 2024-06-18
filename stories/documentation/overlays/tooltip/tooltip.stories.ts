import { provideAnimations } from '@angular/platform-browser/animations';
import { LuTooltipModule, LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../helpers/stories';

export default {
	title: 'Documentation/Overlays/Tooltip/Basic',
	argTypes: {
		luTooltipEnterDelay: {
			control: { type: 'number' },
			table: {
				defaultValue: { summary: '300' },
			},
		},
		luTooltipLeaveDelay: {
			control: { type: 'number' },
			table: {
				defaultValue: { summary: '100' },
			},
		},
		luTooltipDisabled: {
			control: { type: 'boolean' },
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		luTooltipPosition: {
			control: 'inline-radio',
			options: ['above', 'below', 'before', 'after'],
			table: {
				defaultValue: { summary: 'above' },
			},
		},
		luTooltipWhenEllipsis: {
			control: { type: 'boolean' },
			table: {
				defaultValue: { summary: 'false' },
			},
		},
	},
	decorators: [
		applicationConfig({ providers: [provideAnimations()] }),
		moduleMetadata({
			imports: [LuTooltipModule],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			styles: [
				`
					.ellipsis-padding {
						width: 228px;
						padding-inline: 14px;
					}

					.ellipsis-example {
						width: 100px;
					}
				`,
			],
			template: `
		<button
			type="button"
			class="button pr-u-marginBlock400"
			style="margin-inline: 100px"
			luTooltip="so you can see me"
			${generateInputs(args, argTypes)}
		>
			Come over here
		</button>
		<br />
		<b>Ellipsis enabled:</b>
		<div
			class="ellipsis-example u-ellipsis"
			luTooltip="In the Game Boy Pokémon games, Pokémon Red, Green, Blue, and Yellow, players were able to access a set of 105 glitch Pokémon."
			${generateInputs(args, argTypes)}
			luTooltipWhenEllipsis
		>
			In the Game Boy Pokémon games, Pokémon Red, Green, Blue, and Yellow, players were able to access a set of 105 glitch Pokémon.
		</div>
		<br />
		<b>Ellipsis from padding:</b>
		<div style="width: 228px">
			<div
				class="ellipsis-padding u-ellipsis"
				luTooltip="In the Game Boy Pokémon games."
				${generateInputs(args, argTypes)}
				luTooltipWhenEllipsis
			>
				In the Game Boy Pokémon games.
			</div>
		</div>
		<br />
		<b>Same code but text is not ellipsed:</b>
		<div
			luTooltip="In the Game Boy Pokémon games, Pokémon Red, Green, Blue, and Yellow, players were able to access a set of 105 glitch Pokémon."
			${generateInputs(args, argTypes)}
			luTooltipWhenEllipsis
		>
			In the Game Boy Pokémon games, Pokémon Red, Green, Blue, and Yellow, players were able to access a set of 105 glitch Pokémon.
		</div>`,
		};
	},
} as Meta;

export const Basic: StoryObj<LuTooltipTriggerDirective> = {
	args: {
		luTooltipEnterDelay: 300,
		luTooltipLeaveDelay: 100,
		luTooltipDisabled: false,
		luTooltipPosition: 'above',
		luTooltipWhenEllipsis: false,
	},
};
