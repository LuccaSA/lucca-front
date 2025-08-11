import { LoadingComponent } from '@lucca-front/ng/loading';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface OptionBasicStory {
	multiple: boolean;
	loading: boolean;
}

export default {
	title: 'Documentation/Forms/Option/Loading',
	decorators: [
		moduleMetadata({
			imports: [LoadingComponent],
		}),
	],
	argTypes: {},
	render: (args: OptionBasicStory) => {
		const modMultiple = args.multiple ? ` mod-multiple` : ``;
		const modLoading = args.loading ? ` aria-busy="true"` : ``;
		return {
			template: cleanupTemplate(`
<ul role="listbox" class="optionWrapper${modMultiple}"${modLoading}>
	<li role="option" class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			<lu-loading class="option-content-loading">Loading…</lu-loading>
		</div>
	</li>
	<li role="option" class="option">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 1
		</div>
	</li>
	<li role="option" class="option" aria-checked="true">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 2
		</div>
	</li>
	<li role="option" class="option" aria-disabled="true">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 3
		</div>
	</li>
	<li role="option" class="option" aria-checked="true" aria-disabled="true">
		<div class="option-content">
			<span class="option-content-checkboxField checkboxField" aria-hidden="true">
				<span class="option-content-checkboxField-input checkboxField-input"></span>
				<span class="checkboxField-icon"><span class="checkboxField-icon-check"></span></span>
			</span>
			option 4
		</div>
	</li>
</ul>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		multiple: false,
		loading: true,
	},
};
