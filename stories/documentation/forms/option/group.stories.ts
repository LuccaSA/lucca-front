import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
	withScroll: boolean;
}

export default {
	title: 'Documentation/Forms/Option/Group',
	argTypes: {},
	render: (args: OptionBasicStory) => {
		const modMultiple = args.multiple ? ` mod-multiple` : ``;
		const withScrollElements = args.withScroll
			? `<li role="group" class="option" aria-labelledby="group3">
	<div class="option-content" id="group2">
		<span class="option-content-checkboxField checkboxField" aria-hidden="true">
			<span class="option-content-checkboxField-input checkboxField-input"></span>
			<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
		</span>
		Group 3
	</div>
	<ul role="presentation" class="optionWrapper">
		<li role="option" class="option">
			<div class="option-content">
				<span class="option-content-checkboxField checkboxField" aria-hidden="true">
					<span class="option-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 3.1
			</div>
		</li>
		<li role="option" class="option">
			<div class="option-content">
				<span class="option-content-checkboxField checkboxField" aria-hidden="true">
					<span class="option-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 3.2
			</div>
		</li>
		<li role="option" class="option">
			<div class="option-content">
				<span class="option-content-checkboxField checkboxField" aria-hidden="true">
					<span class="option-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 3.3
			</div>
		</li>
		<li role="option" class="option">
			<div class="option-content">
				<span class="option-content-checkboxField checkboxField" aria-hidden="true">
					<span class="option-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 3.4
			</div>
		</li>
		<li role="option" class="option">
			<div class="option-content">
				<span class="option-content-checkboxField checkboxField" aria-hidden="true">
					<span class="option-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 3.5
			</div>
		</li>
		<li role="option" class="option">
			<div class="option-content">
				<span class="option-content-checkboxField checkboxField" aria-hidden="true">
					<span class="option-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 3.6
			</div>
		</li>
		<li role="option" class="option">
			<div class="option-content">
				<span class="option-content-checkboxField checkboxField" aria-hidden="true">
					<span class="option-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 3.7
			</div>
		</li>
		<li role="option" class="option">
			<div class="option-content">
				<span class="option-content-checkboxField checkboxField" aria-hidden="true">
					<span class="option-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 3.8
			</div>
		</li>
		<li role="option" class="option">
			<div class="option-content">
				<span class="option-content-checkboxField checkboxField" aria-hidden="true">
					<span class="option-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 3.9
			</div>
		</li>
	</ul>
</li>`
			: ``;
		const template = `<ul role="listbox" class="optionWrapper${modMultiple}">
	<li role="group" class="option" aria-labelledby="group1">
		<div class="option-content" id="group1">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			Group 1
			<div role="option" class="option mod-select">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					Select all
				</div>
			</div>
		</div>
		<ul role="presentation" class="optionWrapper">
			<li role="option" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 1.1
				</div>
			</li>
			<li role="option" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 1.2
				</div>
			</li>
		</ul>
	</li>
	<li role="group" class="option" aria-labelledby="group2">
		<div class="option-content" id="group2">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			Group 2
			<div role="option" class="option mod-select">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					Select all
				</div>
			</div>
		</div>
		<ul role="presentation" class="optionWrapper">
			<li role="option" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 2.1
				</div>
			</li>
			<li role="option" class="option" aria-checked="true">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 2.2
				</div>
			</li>
			<li role="option" class="option" aria-disabled="true">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 2.3
				</div>
			</li>
			<li role="option" class="option" aria-checked="true" aria-disabled="true">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 2.4
				</div>
			</li>
		</ul>
	</li>
	<li role="group" class="option" aria-labelledby="group3">
		<div class="option-content" id="group3">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			Group 3
			<div role="option" class="option mod-select">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					Select all
				</div>
			</div>
		</div>
		<ul role="presentation" class="optionWrapper">
			<li role="option" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 3.1
				</div>
			</li>
			<li role="option" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 3.2
				</div>
			</li>
		</ul>
	</li>
	${withScrollElements}
</ul>`;
		if (args.withScroll) {
			return {
				styles: [
					`
					.demo {
						overflow: auto;
						block-size: 15rem;
						border-radius: var(--commons-borderRadius-M);

						&:focus-visible {
							outline: 2px solid var(--palettes-product-700);
						}
					}
					`,
				],
				template: cleanupTemplate(`<div class="demo">${template}</div>`),
			};
		} else {
			return {
				template: cleanupTemplate(`${template}`),
			};
		}
	},
} as Meta;

export const Basic = {
	args: {
		multiple: false,
		withScroll: false,
	},
};
