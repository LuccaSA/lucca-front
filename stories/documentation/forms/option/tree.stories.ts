import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
	deepNesting: boolean;
}

export default {
	title: 'Documentation/Forms/Option/Tree',
	argTypes: {},
	render: (args: OptionBasicStory) => {
		const modMultiple = args.multiple ? ` mod-multiple` : ``;
		const deepNestingItem = args.deepNesting
			? `<ul class="optionWrapper" role="group" [attr.style]="'--components-optionWrapper-level: 3'">
	<li role="treeitem" class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 2.2.4.1
		</div>
		<ul class="optionWrapper" role="group" [attr.style]="'--components-optionWrapper-level: 4'">
			<li role="treeitem" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
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
			template: cleanupTemplate(`<ul role="tree" class="optionWrapper${modMultiple}">
	<li role="treeitem" class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 1
		</div>
	</li>
	<li role="treeitem" class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 2
		</div>
		<ul class="optionWrapper" role="group">
			<li role="treeitem" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 2.1
				</div>
			</li>
			<li role="treeitem" class="option" aria-checked="mixed">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option 2.2
				</div>
				<ul class="optionWrapper">
					<li role="treeitem" class="option">
						<div class="option-content">
							<span class="option-content-checkboxField checkboxField" aria-hidden="true">
								<span class="option-content-checkboxField-input checkboxField-input"></span>
								<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
							</span>
							option 2.2.1
						</div>
					</li>
					<li role="treeitem" class="option" aria-checked="true">
						<div class="option-content">
							<span class="option-content-checkboxField checkboxField" aria-hidden="true">
								<span class="option-content-checkboxField-input checkboxField-input"></span>
								<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
							</span>
							option 2.2.2
						</div>
					</li>
					<li role="treeitem" class="option" aria-disabled="true">
						<div class="option-content">
							<span class="option-content-checkboxField checkboxField" aria-hidden="true">
								<span class="option-content-checkboxField-input checkboxField-input"></span>
								<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
							</span>
							option 2.2.3
						</div>
					</li>
					<li role="treeitem" class="option" aria-checked="true" aria-disabled="true">
						<div class="option-content">
							<span class="option-content-checkboxField checkboxField" aria-hidden="true">
								<span class="option-content-checkboxField-input checkboxField-input"></span>
								<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
							</span>
							option 2.2.4
						</div>
						${deepNestingItem}
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
