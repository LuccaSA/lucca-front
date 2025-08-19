import { Meta, StoryFn } from '@storybook/angular';

interface IconBasicStory {}

export default {
	title: 'Documentation/Texts/Icons/HTML&CSS',
} as Meta;

function getTemplate(args: IconBasicStory): string {
	return `<span aria-hidden="true" class="lucca-icon icon-heart"></span>
<br />
<span class="icon" aria-hidden="true">
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
		<path d="M16 11.154c-0.873 0-1.691-0.427-2.189-1.144-0.855-1.229-2.249-2.010-3.811-2.010-2.547 0-4.667 2.099-4.667 4.757 0 5.26 4.472 9.485 9.229 11.955 0.391 0.203 0.776 0.39 1.151 0.56 0.184 0.083 0.39 0.083 0.573 0 0.375-0.17 0.76-0.357 1.151-0.56 4.757-2.47 9.229-6.695 9.229-11.955 0-2.658-2.12-4.757-4.667-4.757-1.562 0-2.956 0.781-3.811 2.010-0.499 0.717-1.316 1.144-2.189 1.144zM14.084 6.59c0.748 0.508 1.398 1.152 1.916 1.897 0.518-0.745 1.168-1.389 1.916-1.897 1.167-0.794 2.572-1.257 4.084-1.257 4.050 0 7.333 3.324 7.333 7.423 0 6.827-5.686 11.736-10.667 14.322-0.433 0.225-0.861 0.432-1.28 0.622-0.883 0.4-1.891 0.4-2.774 0-0.419-0.19-0.847-0.397-1.28-0.622-4.981-2.586-10.667-7.494-10.667-14.322 0-4.1 3.283-7.423 7.333-7.423 1.512 0 2.917 0.463 4.084 1.257z"></path>
	</svg>
</span>
	`;
}

const Template: StoryFn<IconBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
