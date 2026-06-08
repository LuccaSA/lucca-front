import { Meta } from '@storybook/angular-vite';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
}

export default {
	title: 'Documentation/Forms/Listbox Option/HTML&CSS/Empty',
	argTypes: {},
	render: (args: OptionBasicStory) => {
		const modMultiple = args.multiple ? ` mod-multiple` : ``;
		return {
			template: cleanupTemplate(`
<ul role="listbox" class="listboxOptionWrapper${modMultiple}" aria-describedby="emptyMsgListbox1">
	<li class="listboxOption" aria-hidden="true" id="emptyMsgListbox1">
		<div class="listboxOption-content">
			<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
				<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
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
