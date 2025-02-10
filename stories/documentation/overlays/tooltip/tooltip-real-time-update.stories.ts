import { provideAnimations } from '@angular/platform-browser/animations';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule, LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../helpers/stories';
import { signal } from '@angular/core';
import { interval, timer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

export default {
	title: 'Documentation/Overlays/Tooltip/Real Time Update',
	decorators: [
		applicationConfig({ providers: [provideAnimations()] }),
		moduleMetadata({
			imports: [LuTooltipModule, AsyncPipe],
		}),
	],
	render: (args, { argTypes }) => {

		return {
			props: {
				txt$: timer(0, 1000).pipe(map((value) => value % 2 ? "✨Updated" : "👋 Hello")),
			},
			template: `
<button
	type="button"
	class="button"
	[luTooltip]="txt$ | async"
	${generateInputs(args, argTypes)}
>Tooltip au survol</button>
`,
		};
	},
} as Meta;

export const Basic: StoryObj<LuTooltipTriggerDirective> = {
};
