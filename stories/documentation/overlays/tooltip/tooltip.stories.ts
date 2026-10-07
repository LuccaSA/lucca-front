import { OverlayModule } from '@angular/cdk/overlay';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipPanelComponent, LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { ButtonComponent } from '@lucca/prisme/button';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

import { generateInputs } from '../../../helpers/stories';

export default {
	title: 'Documentation/Overlays/Tooltip/Basic',
	argTypes: {
		luTooltipEnterDelay: {
			description: 'Délai d’apparition du tooltip (en ms). La valeur `0` (valeur par défaut de l’input) applique le délai par défaut de 300 ms : il n’est pas possible de supprimer ce délai.',
			control: { type: 'number' },
			table: {
				category: 'inputs',
				defaultValue: { summary: '300' },
			},
		},
		luTooltipLeaveDelay: {
			description:
				'Délai de disparition du tooltip après la fin du survol (en ms). La valeur `0` (valeur par défaut de l’input) applique le délai par défaut de 100 ms : il n’est pas possible de supprimer ce délai.',
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
			control: { type: 'boolean' },
			table: {
				category: 'inputs',
				defaultValue: { summary: 'false' },
			},
		},
		luTooltipAnchor: {
			description: 'Élément par rapport auquel le tooltip est positionné, à la place de l’élément déclencheur (voir l’exemple « Tooltip affiché avec un host séparé »).',
			control: false,
			table: {
				category: 'inputs',
				type: { summary: 'FlexibleConnectedPositionStrategyOrigin | LuTooltipAnchorRef | null' },
			},
		},
		luTooltipTriggerAnchor: {
			description: 'Élément dont le survol et le focus déclenchent le tooltip, à la place de l’élément portant la directive.',
			control: false,
			table: {
				category: 'inputs',
				type: { summary: 'ElementRef<HTMLElement> | HTMLElement | LuTooltipAnchorRef | null' },
			},
		},
		id: {
			description: 'Identifiant de l’élément déclencheur, utilisé pour construire l’identifiant du tooltip référencé par `aria-describedby`. Généré automatiquement par défaut.',
			control: false,
			table: {
				category: 'inputs',
				type: { summary: 'string' },
			},
		},
	},
	decorators: [
		applicationConfig({ providers: [provideAnimations()] }),
		moduleMetadata({
			imports: [LuTooltipTriggerDirective, OverlayModule, LuTooltipPanelComponent, IconComponent, ButtonComponent],
		}),
	],
	render: (args, { argTypes }) => {
		const filteredArgs = { ...args };
		if (filteredArgs['luTooltipEnterDelay'] === 300) {
			delete filteredArgs['luTooltipEnterDelay'];
		}
		if (filteredArgs['luTooltipLeaveDelay'] === 100) {
			delete filteredArgs['luTooltipLeaveDelay'];
		}
		const inputs = generateInputs(filteredArgs, argTypes);
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
>Tooltip au survol ou au focus</button>
<h3>Tooltip sur un texte</h3>
<span
  class="pr-u-focusVisible pr-u-borderRadiusSmall"
	luTooltip="👋 Hello"
	${inputs}
>Tooltip au survol ou au focus</span>
<h3>Tooltip et ellipse</h3>
<div
	data-testid="ellipsis-truncated"
	class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall"
	style="inline-size: 10rem;"
	tabindex="0"
	luTooltip="Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol ou au focus."
	${generateInputs(filteredArgs, argTypes)}
	[luTooltipWhenEllipsis]="true"
>Ce texte est trop long pour être affiché entièrement. Le tooltip apparait au survol ou au focus.</div>
<div
	data-testid="ellipsis-not-truncated"
	class="pr-u-ellipsis pr-u-focusVisible pr-u-borderRadiusSmall"
	luTooltip="Ce texte est affiché entièrement. Le tooltip n'apparait ni au survol ni au focus."
	${generateInputs(filteredArgs, argTypes)}
	[luTooltipWhenEllipsis]="true"
>Ce texte est affiché entièrement. Le tooltip n'apparait ni au survol, ni au focus.</div>
<h3>Tooltip et icône (avec alternative)</h3>
<lu-icon data-testid="icon-tooltip" icon="star" alt="Favoris" luTooltip="Favoris" ${inputs} luTooltipOnlyForDisplay="true" class="pr-u-focusVisible pr-u-borderRadiusSmall" />

<h3>Tooltip affiché avec un host séparé</h3>
<span class="pr-u-marginInlineEnd800 pr-u-focusVisible pr-u-borderRadiusSmall" luTooltip="… mais apparait là !" [luTooltipAnchor]="target">Tooltip déclenché ici…</span><span aria-hidden="true" #target class="lucca-icon icon-target"></span>
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
		luTooltipOnlyForDisplay: false,
	},
};
