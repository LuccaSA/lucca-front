import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
	empty: boolean;
}

export default {
	title: 'Documentation/Forms/Option/Empty',
	argTypes: {},
	render: (args: OptionBasicStory) => {
		const modMultiple = args.multiple ? ` mod-multiple` : ``;
		const modEmpty = args.empty ? ` aria-hidden="true" id="emptyMsgListbox1"` : ``;
		const describedby = args.empty ? ` aria-describedby="emptyMsgListbox1"` : ``;
		return {
			template: cleanupTemplate(`
<ul role="listbox" class="optionWrapper${modMultiple}" ${describedby}>
	<li class="option"${modEmpty}>
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			No match found
		</div>
	</li>
</ul>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		multiple: false,
		empty: true,
	},
};
