import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
}

export default {
	title: 'Documentation/Forms/Option/HTML & CSS/Empty',
	argTypes: {},
	render: (args: OptionBasicStory) => {
		const modMultiple = args.multiple ? ` mod-multiple` : ``;
		return {
			template: cleanupTemplate(`
<ul role="listbox" class="optionWrapper${modMultiple}" aria-describedby="emptyMsgListbox1">
	<li class="option" aria-hidden="true" id="emptyMsgListbox1">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			 Aucun résultat pour votre recherche
		</div>
	</li>
</ul>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		multiple: false,
	},
};
