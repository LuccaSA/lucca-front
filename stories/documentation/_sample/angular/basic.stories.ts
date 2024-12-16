import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
// import { SampleComponent } from 'dist/ng/sample';

interface SampleBasicStory {
	content: string;
}

export default {
	title: 'Documentation/Sample/Angular/Basic',
	argTypes: {
		content: {
			control: {
				type: 'text',
			},
		},
	},
	decorators: [
		moduleMetadata({
			// imports: [SampleComponent],
		}),
	],
} as Meta;

function getTemplate(args: SampleBasicStory): string {
	return `<luSample>
	${args.content}
</luSample>
`;
}

const Template: StoryFn<SampleBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	content: 'sample',
};
