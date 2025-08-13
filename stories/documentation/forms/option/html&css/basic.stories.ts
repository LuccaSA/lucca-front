import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
}

export default {
	title: 'Documentation/Forms/Option/HTML & CSS/Basic',
	argTypes: {},
	render: (args: OptionBasicStory) => {
		const modMultiple = args.multiple ? ` mod-multiple` : ``;
		return {
			template: cleanupTemplate(`<ul role="listbox" class="optionWrapper${modMultiple}">
	<li role="option" class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 1
		</div>
	</li>
	<li role="option" class="option">
		<div class="option-content is-hovered">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 2
		</div>
	</li>
	<li role="option" class="option" aria-checked="true">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 3
		</div>
	</li>
	<li role="option" class="option" aria-checked="true">
		<div class="option-content is-hovered">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 4
		</div>
	</li>
	<li role="option" class="option" aria-disabled="true">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 5
		</div>
	</li>
	<li role="option" class="option" aria-checked="true" aria-disabled="true">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 6
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
