import { Meta } from '@storybook/angular-vite';
import { cleanupTemplate } from '@/helpers/stories';

interface OptionCheckboxStory {
	checked: boolean;
}

export default {
	title: 'Documentation/Forms/Listbox Option/HTML&CSS/Checkbox',
	argTypes: {
		checked: {
			description: 'Sélectionne l’option (`aria-selected="true"`).',
		},
	},
	render: (args: OptionCheckboxStory) => {
		return {
			template: cleanupTemplate(`<ul role="listbox" class="listboxOptionWrapper">
	<li role="option" class="listboxOption mod-checkbox" aria-selected="${args.checked}">
		<div class="listboxOption-content">
			<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
				<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			Inclure les collaborateurs partis
		</div>
	</li>
	<li role="option" class="listboxOption">
		<div class="listboxOption-content">
			<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
				<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 1
		</div>
	</li>
	<li role="option" class="listboxOption">
		<div class="listboxOption-content">
			<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
				<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 2
		</div>
	</li>
</ul>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		checked: false,
	},
};
