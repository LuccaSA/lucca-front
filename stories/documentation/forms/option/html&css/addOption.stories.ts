import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
	withScroll: boolean;
}

export default {
	title: 'Documentation/Forms/Option/HTML & CSS/Add option',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	render: (args: OptionBasicStory) => {
		const modMultiple = args.multiple ? ` mod-multiple` : ``;
		const withScrollElements = args.withScroll
			? `
<li role="option" class="option">
	<div class="option-content">
		<span class="option-content-checkboxField checkboxField" aria-hidden="true">
			<span class="option-content-checkboxField-input checkboxField-input"></span>
			<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
		</span>
		option 3
	</div>
</li>
<li role="option" class="option">
	<div class="option-content">
		<span class="option-content-checkboxField checkboxField" aria-hidden="true">
			<span class="option-content-checkboxField-input checkboxField-input"></span>
			<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
		</span>
		option 4
	</div>
</li>
<li role="option" class="option">
	<div class="option-content">
		<span class="option-content-checkboxField checkboxField" aria-hidden="true">
			<span class="option-content-checkboxField-input checkboxField-input"></span>
			<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
		</span>
		option 5
	</div>
</li>
<li role="option" class="option">
	<div class="option-content">
		<span class="option-content-checkboxField checkboxField" aria-hidden="true">
			<span class="option-content-checkboxField-input checkboxField-input"></span>
			<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
		</span>
		option 6
	</div>
</li>
<li role="option" class="option">
	<div class="option-content">
		<span class="option-content-checkboxField checkboxField" aria-hidden="true">
			<span class="option-content-checkboxField-input checkboxField-input"></span>
			<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
		</span>
		option 7
	</div>
</li>
<li role="option" class="option">
	<div class="option-content">
		<span class="option-content-checkboxField checkboxField" aria-hidden="true">
			<span class="option-content-checkboxField-input checkboxField-input"></span>
			<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
		</span>
		option 8
	</div>
</li>
<li role="option" class="option">
	<div class="option-content">
		<span class="option-content-checkboxField checkboxField" aria-hidden="true">
			<span class="option-content-checkboxField-input checkboxField-input"></span>
			<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
		</span>
		option 9
	</div>
</li>`
			: ``;
		return {
			styles: [
				args.withScroll
					? `
				[role="listbox"] {
					block-size: 15rem;
				}
			`
					: ``,
			],
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
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 2
		</div>
	</li>${withScrollElements}
	<li role="option" class="option mod-add">
		<div class="option-content">
			<lu-icon icon="mathsPlus" />
			Ajouter une option
		</div>
	</li>
</ul>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		multiple: false,
		withScroll: false,
	},
};
