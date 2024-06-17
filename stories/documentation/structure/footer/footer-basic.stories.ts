import { Meta, StoryFn } from '@storybook/angular';

interface FooterBasicStory {
	sticky: boolean;
	container: boolean;
	responsive: string;
	containerMax: string;
}

export default {
	title: 'Documentation/Structure/Footer/Basic',
	argTypes: {
		sticky: {
			control: {
				type: 'boolean',
			},
		},
		responsive: {
			options: ['', 'mod-narrow', 'mod-narrowAtMediaMaxM', 'mod-narrowAtMediaMaxS', 'mod-narrowAtMediaMaxXS'],
			control: {
				type: 'select',
			},
			description: 'Passing no class causes a default switch to XXS.',
		},
		container: {
			type: 'boolean',
		},
		containerMax: {
			options: ['mod-maxXXXL', 'mod-maxXXL', 'mod-maxXL', 'mod-maxL', 'mod-maxM'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: FooterBasicStory): string {
	const sticky = args.sticky ? `mod-sticky` : '';
	const responsive = args.responsive;
	const container = args.container;
	const containerMax = args.containerMax;
	if (container) {
		return `
	<footer class="footer ${sticky} ${responsive}">
		<div class="footer-containerOptional container ${containerMax}">
			<div class="footer-content">Content</div>
			<div class="footer-actions">
				<button type="button" class="button">Button</button>
				<button type="button" class="button mod-outlined">Button</button>
			</div>
		</div>
	</footer>`;
	} else {
		return `
	<footer class="footer ${sticky} ${responsive}">
		<div class="footer-content">Content</div>
		<div class="footer-actions">
			<button type="button" class="button">Button</button>
			<button type="button" class="button mod-outlined">Button</button>
		</div>
	</footer>`;
	}
}

const Template: StoryFn<FooterBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { sticky: false, responsive: '', container: false, containerMax: 'mod-maxL' };
