import { provideAnimations } from '@angular/platform-browser/animations';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule, LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../helpers/stories';
import { ButtonComponent } from '../../../../packages/ng/button/button.component';

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
		luTooltipOnlyForDisplay: {
			description: '[v18.2]',
		},
	},
	decorators: [
		applicationConfig({ providers: [provideAnimations()] }),
		moduleMetadata({
			imports: [LuTooltipModule, IconComponent, ButtonComponent],
		}),
	],
	render: (args, { argTypes }) => {
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
	type="button"
	luButton
	luTooltip="👋 Hello"
	${generateInputs(args, argTypes)}
>Tooltip au survol</button>
<h3>Tooltip et ellipse</h3>
<div
	class="u-ellipsis"
	style="width: 10rem;"
	luTooltip="Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol."
	${generateInputs(args, argTypes)}
	luTooltipWhenEllipsis
>Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol.</div>
<div
	class="u-ellipsis"
	luTooltip="Ce texte est affiché entièrement. Le tooltip n'apparait pas au survol."
	${generateInputs(args, argTypes)}
	luTooltipWhenEllipsis
>Ce texte est affiché entièrement. Le tooltip n'apparait pas au survol.</div>
<h3>Tooltip et icône (avec alternative)</h3>
<lu-icon icon="star" alt="Favoris" luTooltip="Favoris" luTooltipOnlyForDisplay="true" />

<h3 #tooltipTarget>Tooltip affiché avec un host séparé</h3>
<p luTooltip="Tooltip déclenché depuis le paragraphe" [luTooltipAnchor]="tooltipTarget">Ce tooltip est déclenchée au hover de ce texte mais sa référence est le titre de cette section.</p>
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
		luTooltipWhenEllipsis: false,
	},
};
