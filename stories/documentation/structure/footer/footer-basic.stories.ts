import { Meta, StoryFn } from '@storybook/angular';

interface FooterBasicStory {
	sticky: boolean;
	wrapper: boolean;
	responsive: string;
	container: boolean;
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
		wrapper: {
			type: 'boolean',
			description: '[v18.1]',
		},
		container: {
			type: 'boolean',
			description: '[v18.1]',
		},
		containerMax: {
			options: ['mod-maxXXXL', 'mod-maxXXL', 'mod-maxXL', 'mod-maxL', 'mod-maxM'],
			control: {
				type: 'select',
			},
			description: '[v18.1]',
		},
	},
} as Meta;

function getTemplate(args: FooterBasicStory): string {
	const sticky = args.sticky ? `mod-sticky` : '';
	const container = args.container;
	const wrapper = args.wrapper;
	const containerMax = args.containerMax;
	if (container && wrapper) {
		return `
	<div class="footerResponsiveWrapper">
		<footer class="footer ${sticky}">
			<div class="footer-containerOptional container ${containerMax}">
				<div class="footer-content">Content</div>
				<div class="footer-actions">
					<button type="button" class="button">Button</button>
					<button type="button" class="button mod-outlined">Button</button>
				</div>
			</div>
		</footer>
	</div>`;
	} else if (!container && wrapper) {
		return `
	<div class="footerResponsiveWrapper">
		<footer class="footer ${sticky}">
			<div class="footer-content">Content</div>
			<div class="footer-actions">
				<button type="button" class="button">Button</button>
				<button type="button" class="button mod-outlined">Button</button>
			</div>
		</footer>
	</div>`;
	} else if (container && !wrapper) {
		return `
		<footer class="footer ${sticky}">
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
		<footer class="footer ${sticky}">
			<div class="footer-content">Content</div>
			<div class="footer-actions">
				<button type="button" class="button">Button</button>
				<button type="button" class="button mod-outlined">Button</button>
			</div>
		</footer>
		`;
	}
}

const Template: StoryFn<FooterBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { sticky: false, wrapper: false, container: false, containerMax: 'mod-maxL' };
