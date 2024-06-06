import { ButtonComponent } from '@lucca-front/ng/button';
import { configureLuPopover, PopoverDirective } from '@lucca-front/ng/popover2';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';

export default {
	title: 'Documentation/Overlays/Popover2/Angular',
	decorators: [
		applicationConfig({
			providers: [configureLuPopover()],
		}),
		moduleMetadata({
			imports: [ButtonComponent, PopoverDirective],
		}),
	],
	render: () => {
		return {
			template: `<button luButton [luPopover2]="contentRef">Click me!</button>
<ng-template #contentRef>
<ul class="button-group mod-outlined u-flexDirectionColumn" style="width: 15rem">
    <li class="button-group-item"><button type="button" class="button mod-outlined">A</button></li>
    <li class="button-group-item"><button type="button" class="button mod-outlined">B</button></li>
    <li class="button-group-item"><button type="button" class="button mod-outlined">C</button></li>
	<li class="button-group-item"><button type="button" class="button mod-outlined">D</button></li>
	<li class="button-group-item"><button type="button" class="button mod-outlined">E</button></li>
</ul>
</ng-template>
`,
		};
	},
} as Meta;

export const Basic = {};
