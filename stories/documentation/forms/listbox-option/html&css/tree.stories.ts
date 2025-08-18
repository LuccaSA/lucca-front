import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
	deepNesting: boolean;
}

export default {
	title: 'Documentation/Forms/Listbox Option/HTML & CSS/Tree',
	argTypes: {},
	render: (args: OptionBasicStory) => {
		const modMultiple = args.multiple ? ` mod-multiple` : ``;
		const deepNestingItem = args.deepNesting
			? `
<ul class="listboxOptionWrapper" role="group" [attr.style]="'--components-optionWrapper-level: 3'">
	<li role="treeitem" class="listboxOption">
		<div class="listboxOption-content">
			<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
				<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 2.2.4.1
		</div>
		<ul class="listboxOptionWrapper" role="group" [attr.style]="'--components-optionWrapper-level: 4'">
			<li role="treeitem" class="listboxOption">
				<div class="listboxOption-content">
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 2.2.4.1.1
				</div>
			</li>
		</ul>
	</li>
</ul>`
			: ``;
		return {
			template: cleanupTemplate(`<ul role="tree" class="listboxOptionWrapper${modMultiple}">
	<li role="treeitem" class="listboxOption">
		<div class="listboxOption-content">
			<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
				<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 1
		</div>
	</li>
	<li role="treeitem" class="listboxOption">
		<div class="listboxOption-content">
			<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
				<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 2
		</div>
		<ul class="listboxOptionWrapper" role="group">
			<li role="treeitem" class="listboxOption">
				<div class="listboxOption-content">
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 2.1
				</div>
			</li>
			<li role="treeitem" class="listboxOption" aria-checked="mixed">
				<div class="listboxOption-content">
					<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
						<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 2.2
				</div>
				<ul class="listboxOptionWrapper" role="group">
					<li role="treeitem" class="listboxOption">
						<div class="listboxOption-content">
							<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
								<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
								<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
							</span>
							option 2.2.1
						</div>
					</li>
					<li role="treeitem" class="listboxOption">
						<div class="listboxOption-content">
							<span class="listboxOption-content-checkboxField checkboxField" aria-hidden="true">
								<span class="listboxOption-content-checkboxField-input checkboxField-input"></span>
								<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
							</span>
							option 2.2.2
						</div>${deepNestingItem}
					</li>
				</ul>
			</li>
		</ul>
	</li>
</ul>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		multiple: false,
		deepNesting: false,
	},
};
