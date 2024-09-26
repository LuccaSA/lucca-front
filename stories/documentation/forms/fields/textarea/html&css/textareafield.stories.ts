import { Meta, StoryFn } from '@storybook/angular';

interface TextareaBasicStory {
	autoResize: boolean;
	scrollIntoViewOnAutoResizing: boolean;
}

export default {
	title: 'Documentation/Forms/Fields/TextAreaField/HTML&CSS',
	argTypes: {
		autoResize: {
			type: 'boolean',
		},
		scrollIntoViewOnAutoResizing: {
			type: 'boolean',
			if: { arg: 'autoResize', truthy: true },
		},
	},
} as Meta;

function getTemplate(args: TextareaBasicStory): string {
	const autoResize = args.autoResize ? 'mod-autoResize' : '';
	const clone = args.autoResize ? '<div class="textField-input-valueClone" aria-hidden="true"></div>' : '';
	let input = '';
	if (args.autoResize) {
		if (args.scrollIntoViewOnAutoResizing) {
			input = "onInput=\"this.previousElementSibling.dataset.contentBefore = this.value; this.parentNode.scrollIntoView({ behavior: 'instant', block: 'end' })\"";
		} else {
			input = 'onInput="this.previousElementSibling.dataset.contentBefore = this.value"';
		}
	}

	return `
	<div class="form-field">
		<label class="formLabel" id="IDlabel" for="ID">Label</label>
		<div class="textField ${autoResize}">
			<div class="textField-input">
				${clone}
				<textarea rows="3" id="ID" class="textField-input-value" aria-labelledby="IDlabel"
					aria-describedby="IDmessage" placeholder="Placeholder" aria-invalid="false"
					${input}></textarea>
			</div>
		</div>
		<div class="inlineMessage" id="IDmessage">
			<span aria-hidden="true" class="lucca-icon inlineMessage-statusIcon"></span>
			<p class="inlineMessage-content">
				Helper Text
			</p>
		</div>
	</div>`;
}

const Template: StoryFn<TextareaBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	autoResize: false,
	scrollIntoViewOnAutoResizing: false,
};
