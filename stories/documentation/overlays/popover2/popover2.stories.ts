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
		const action = args.luPopoverTrigger === 'click' ? 'Cliquez-moi' : 'Cliquez ou survolez-moi';
		let openDelay = '';
		if (args.luPopoverTrigger !== 'click') {
			openDelay = ' ' + args.luPopoverOpenDelay + 'ms';
		}
		return {
			template: cleanupTemplate(`<div class="demo">
	<button luButton [luPopover2]="contentRef" ${generateInputs(args, argTypes)}>${action}${openDelay} !</button>
	<ng-template #contentRef>
		<div class="popover-contentOptional">
			<div class="verticalNavigation mod-iconless">
				<ul class="verticalNavigation-list u-listReset">
					<li class="verticalNavigation-list-item"><a href="#" class="verticalNavigation-list-item-link">Item A</a></li>
					<li class="verticalNavigation-list-item"><a href="#" class="verticalNavigation-list-item-link">Item B</a></li>
					<li class="verticalNavigation-list-item"><a href="#" class="verticalNavigation-list-item-link">Item C</a></li>
				</ul>
			</div>
		</div>
	</ng-template>
</div>
`),
			styles: [
				`
	.demo {
		display: flex;
		min-height: 20rem;
		align-items: center;
		justify-content: center;
	}`,
			],
		};
	},
	args: {
		luPopoverTrigger: 'click',
		luPopoverCloseDelay: 300,
		luPopoverOpenDelay: 300,
		luPopoverDisabled: false,
		luPopoverPosition: 'above',
	},
};
