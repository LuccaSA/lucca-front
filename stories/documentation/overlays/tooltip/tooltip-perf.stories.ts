import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuTooltipModule, LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Overlays/Tooltip/Performance',
	decorators: [
		applicationConfig({ providers: [provideAnimations()] }),
		moduleMetadata({
			imports: [LuTooltipModule, ButtonComponent],
		}),
	],
	render: () => {
		return {
			props: {
				width: new Array(25),
				height: new Array(20),
				showTooltips: true,
			},
			styles: [
				`.button {
				margin: 1px;
			}`,
			],
			template: `
<h1>{{height.length * width.length}} tooltips</h1>
<button luButton (click)="showTooltips = !showTooltips">Toggle tooltips</button>
@if(showTooltips) {
	@for(x of height; track $index)  {
		<div>
			@for(y of width; track $index)  {
					<button
						luButton
						class="button"
						[luTooltip]="'Hello there'"
					>A</button>
			}
		</div>
	}
}
`,
		};
	},
} as Meta;

export const Basic: StoryObj<LuTooltipTriggerDirective> = {};
