import { Meta, StoryFn } from '@storybook/angular';

interface FooterBasicStory {
	sticky: boolean;
	container: boolean;
	responsive: string;
}

export default {
	title: 'Documentation/Structure/Footer/HTML&CSS/Basic',
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
			description: '[v18.1] Modifie le breakpoint. Default: XXS',
		},
		container: {
			type: 'boolean',
			description: '[v18.1]',
		},
	},
} as Meta;

function getTemplate(args: FooterBasicStory): string {
	const sticky = args.sticky ? `mod-sticky` : '';
	const responsive = args.responsive;
	const container = args.container;
	if (container) {
		return `
	<footer class="footer ${sticky} ${responsive}">
		<div class="footer-containerOptional">
			<div class="footer-content">Content</div>
			<div class="footer-actions">
				<button type="button" class="button">Button</button>
				<button type="button" class="button mod-outlined">Button</button>
			</div>
		</div>
	</footer>
`;
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
Basic.args = { sticky: false, responsive: '', container: false };
