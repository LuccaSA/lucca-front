import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {}

export default {
	title: 'Documentation/Forms/Option/Basic',
	argTypes: {},
	render: (args: OptionBasicStory) => {
		return {
			template: cleanupTemplate(`<ul class="optionWrapper">
	<li role="option" class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option
		</div>
	</li>
	<li role="option" class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option
		</div>
		<ul class="optionWrapper">
			<li role="option" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option
				</div>
			</li>
			<li role="option" class="option">
				<div class="option-content">
					<span class="option-content-checkboxField checkboxField" aria-hidden="true">
						<span class="checkboxField-input"></span>
						<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
					</span>
					option
				</div>
				<ul class="optionWrapper">
					<li role="option" class="option">
						<div class="option-content">
							<span class="option-content-checkboxField checkboxField" aria-hidden="true">
								<span class="checkboxField-input"></span>
								<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
							</span>
							option
						</div>
					</li>
					<li role="option" class="option" aria-selected="true">
						<div class="option-content">
							<span class="option-content-checkboxField checkboxField" aria-hidden="true">
								<span class="checkboxField-input"></span>
								<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
							</span>
							option
						</div>
					</li>
				</ul>
			</li>
		</ul>
	</li>
	<li role="option"  class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option
		</div>
	</li>
	<li role="option" class="option" aria-disabled="true">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option
		</div>
	</li>
	<li role="option" class="option" aria-disabled="true" aria-selected="true">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="checkboxField-input"></span>
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
