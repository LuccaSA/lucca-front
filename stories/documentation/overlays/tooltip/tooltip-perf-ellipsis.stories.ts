import { provideAnimations } from '@angular/platform-browser/animations';
import { LuTooltipModule, LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Overlays/Tooltip/Performance ellipsis',
	decorators: [
		applicationConfig({ providers: [provideAnimations()] }),
		moduleMetadata({
			imports: [LuTooltipModule],
		}),
	],
	render: () => {
		return {
			props: {
				rows: new Array(20),
				cols: new Array(25),
				showTooltips: true,
			},
			styles: [
				`.cell {
					inline-size: 120px;
					padding: 4px 8px;
					border: 1px solid;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.row {
					display: flex;
					gap: 1px;
				}`,
			],
			template: `
<h1>{{rows.length * cols.length}} ellipsis tooltips</h1>
<button (click)="showTooltips = !showTooltips">Toggle tooltips</button>
@if(showTooltips) {
	@for(x of rows; track $index)  {
		<div class="row">
			@for(y of cols; track $index)  {
					<div
						class="cell"
						luTooltip
						luTooltipWhenEllipsis
					>Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
			}
		</div>
	}
}
`,
		};
	},
} as Meta;

export const Basic: StoryObj<LuTooltipTriggerDirective> = {};
