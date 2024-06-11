import { ButtonComponent } from '@lucca-front/ng/button';
import { configureLuPopover, PopoverDirective } from '@lucca-front/ng/popover2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from '../../../helpers/common-arg-types';
import { cleanupTemplate, generateInputs } from '../../../helpers/stories';

export default {
	title: 'Documentation/Overlays/Popover2/Angular',
	component: PopoverDirective,
	decorators: [
		applicationConfig({
			providers: [configureLuPopover()],
		}),
		moduleMetadata({
			imports: [ButtonComponent, PopoverDirective],
		}),
	],
	argTypes: {
		luPopover2: HiddenArgType,
		luPopoverTrigger: {
			control: 'select',
			options: ['click', 'click+hover'],
		},
	},
} as Meta;

export const Basic: StoryObj<PopoverDirective> = {
	render: (args, { argTypes }) => {
		return {
			template: cleanupTemplate(`<button luButton [luPopover2]="contentRef" ${generateInputs(args, argTypes)}>Click me!</button>
<ng-template #contentRef>
	<div class="popover-contentOptional">
		<ul class="button-group mod-outlined u-flexDirectionColumn" style="width: 15rem">
		    <li class="button-group-item"><button type="button" class="button mod-outlined">A</button></li>
		    <li class="button-group-item"><button type="button" class="button mod-outlined">B</button></li>
		    <li class="button-group-item"><button type="button" class="button mod-outlined">C</button></li>
				<li class="button-group-item"><button type="button" class="button mod-outlined">D</button></li>
				<li class="button-group-item"><button type="button" class="button mod-outlined">E</button></li>
		</ul>
	</div>
</ng-template>
`),
		};
	},
	args: {
		luPopoverTrigger: 'click',
		luPopoverCloseDelay: 100,
		luPopoverOpenDelay: 300,
		luPopoverDisabled: false,
		luPopoverPosition: 'above',
	},
};
