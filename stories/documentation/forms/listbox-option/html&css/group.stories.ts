import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
	withScroll: boolean;
}

export default {
	title: 'Documentation/Forms/Listbox Option/HTML&CSS/Group',
	argTypes: {},
	render: (args: OptionBasicStory) => {
		const modMultiple = args.multiple ? ` mod-multiple` : ``;
		const withScrollElements = args.withScroll
			? `<li role="group" class="listboxOption" aria-labelledby="group3">
	<div class="listboxOption-content" id="group2">
		<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
			<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
			<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
		</span>
		Group 4
	</div>
	<ul role="presentation" class="listboxOptionWrapper">
		<li role="option" class="listboxOption">
			<div class="listboxOption-content">
				<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
					<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 4.1
			</div>
		</li>
		<li role="option" class="listboxOption">
			<div class="listboxOption-content">
				<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
					<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 4.2
			</div>
		</li>
		<li role="option" class="listboxOption">
			<div class="listboxOption-content">
				<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
					<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 4.3
			</div>
		</li>
		<li role="option" class="listboxOption">
			<div class="listboxOption-content">
				<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
					<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 4.4
			</div>
		</li>
		<li role="option" class="listboxOption">
			<div class="listboxOption-content">
				<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
					<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 4.5
			</div>
		</li>
		<li role="option" class="listboxOption">
			<div class="listboxOption-content">
				<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
					<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 4.6
			</div>
		</li>
		<li role="option" class="listboxOption">
			<div class="listboxOption-content">
				<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
					<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 4.7
			</div>
		</li>
		<li role="option" class="listboxOption">
			<div class="listboxOption-content">
				<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
					<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 4.8
			</div>
		</li>
		<li role="option" class="listboxOption">
			<div class="listboxOption-content">
				<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
					<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
					<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
				</span>
				option 4.9
			</div>
		</li>
	</ul>
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
			template: cleanupTemplate(`<ul role="listbox" class="listboxOptionWrapper${modMultiple}">
	<li role="group" class="listboxOption" aria-labelledby="group1">
		<div class="listboxOption-content" id="group1">
			<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
				<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			Group 1
			<div role="option" class="listboxOption mod-select">
				<div class="listboxOption-content">
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					Tout sélectionner
				</div>
			</div>
		</div>
		<ul role="presentation" class="listboxOptionWrapper">
			<li role="option" class="listboxOption">
				<div class="listboxOption-content">
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 1.1
				</div>
			</li>
			<li role="option" class="listboxOption">
				<div class="listboxOption-content">
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 1.2
				</div>
			</li>
		</ul>
	</li>
	<li role="group" class="listboxOption" aria-labelledby="group2">
		<div class="listboxOption-content" id="group2">
			<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
				<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			Group 2
			<div role="option" class="listboxOption mod-select">
				<div class="listboxOption-content">
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					Tout sélectionner
				</div>
			</div>
		</div>
		<ul role="presentation" class="listboxOptionWrapper">
			<li role="option" class="listboxOption">
				<div class="listboxOption-content">
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 2.1
				</div>
			</li>
			<li role="option" class="listboxOption">
				<div class="listboxOption-content">
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 2.2
				</div>
			</li>
		</ul>
	</li>
	<li role="group" class="listboxOption" aria-labelledby="group3">
		<div class="listboxOption-content" id="group3">
			<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
				<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			Group 3
			<div role="option" class="listboxOption mod-select">
				<div class="listboxOption-content">
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					Tout sélectionner
				</div>
			</div>
		</div>
		<ul role="presentation" class="listboxOptionWrapper">
			<li role="option" class="listboxOption">
				<div class="listboxOption-content">
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 3.1
				</div>
			</li>
			<li role="option" class="listboxOption">
				<div class="listboxOption-content">
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 3.2
				</div>
			</li>
		</ul>
	</li>
	${withScrollElements}
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
