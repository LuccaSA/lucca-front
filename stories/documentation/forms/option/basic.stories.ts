import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {}

export default {
	title: 'Documentation/Forms/Option/Basic',
	argTypes: {},
	render: (args: OptionBasicStory) => {
		return {
			template: cleanupTemplate(`
<ul role="listbox" class="optionWrapper mod-multiple">
	<li role="option" class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option
		</div>
	</li>
	<li role="option" class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option
		</div>
	</li>
	<li role="presentation" class="option mod-groupBy" aria-labelledby="title">
		<div class="option-content" id="title">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			title
		</div>
		<ul role="group" class="optionWrapper">
			<li role="option" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option
				</div>
			</li>
			<li role="option" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option
				</div>
			</li>
			<li role="presentation" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option
				</div>
			</li>
		</ul>
	</li>
</ul>
<hr class="divider pr-u-marginBlock200" />
<ul role="tree" class="optionWrapper -mod-multiple">
	<li role="treeitem" class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option
		</div>
	</li>
	<li role="treeitem" class="option">

		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option
		</div>

		<ul class="optionWrapper" role="group">
			<li role="treeitem" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option
				</div>
			</li>
			<li role="treeitem" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="option-content-checkboxField-input checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option
				</div>
				<ul class="optionWrapper">
					<li role="treeitem" class="option">
						<div class="option-content">
							<span class="option-content-checkboxField checkboxField" aria-hidden="true">
								<span class="option-content-checkboxField-input checkboxField-input"></span>
								<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
							</span>
							option
						</div>
					</li>
					<li role="treeitem" class="option" aria-selected="true">
						<div class="option-content">
							<span class="option-content-checkboxField checkboxField" aria-hidden="true">
								<span class="option-content-checkboxField-input checkboxField-input"></span>
								<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
							</span>
							option
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</li>
	<li role="treeitem" class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option
		</div>
	</li>
	<li role="treeitem" class="option" aria-disabled="true">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option
		</div>
	</li>
	<li role="treeitem" class="option" aria-disabled="true" aria-selected="true">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option
		</div>
	</li>
</ul>`),
		};
	},
} as Meta;

export const Basic = {};
