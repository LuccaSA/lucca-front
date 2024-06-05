import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';
import { configureLuPopover, PopoverDirective } from '@lucca-front/ng/popover2';

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
			template: `<button luButton [luPopover2]="contentRef">Click me !</button>
<ng-template #contentRef>Content !</ng-template>
`,
		};
	},
} as Meta;

export const Basic = {};
