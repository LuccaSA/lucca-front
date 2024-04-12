import { Meta, StoryFn } from '@storybook/angular';

interface FormLabelCounterStory {
}

export default {
	title: 'Documentation/Forms/Form Label Counter',
	argTypes: {
	},
} as Meta;

function getTemplate(args: FormLabelCounterStory): string {
	return `<label class="formLabel mod-counter" id="IDlabel" for="ID">
	Label<sup class="formLabel-required" aria-hidden="true">*</sup><span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
	<span class="formLabel-counter" id="IDcounter" aria-live="polite">
		<span aria-hidden="true">7/77</span>
		<span class="u-mask">
			Votre publication fait 7 caractères de long. 77 maximum sont autorisés.
		</span>
	</span>
</label>`;
}

const Template: StoryFn<FormLabelCounterStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Counter = Template.bind({});
Counter.args = {};
