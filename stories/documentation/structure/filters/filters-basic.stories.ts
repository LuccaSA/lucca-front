import { Meta, StoryFn } from '@storybook/angular';

interface FiltersBasicStory {
	sticky: boolean;
	navside: boolean;
}

export default {
	title: 'Documentation/Structure/Filters/Basic',
	argTypes: {
		sticky: {
			control: {
				type: 'boolean',
			},
		},
		navside: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: FiltersBasicStory): string {
	const sticky = args.sticky ? `mod-sticky` : '';
	if (args.navside) {
		return `
			<div class="navSide"></div>
			<div class="main-content">
				<div class="filters ${sticky}">
					<div class="filters-sectionLeft">
						<div class="filters-item">
							<label class="textfield mod-framed">
								<input class="textfield-input" type="text" value="Tous les collaborateurs" placeholder="placeholder" />
								<span class="textfield-label">Collaborateurs</span>
							</label>
						</div>
					</div>
					<div class="filters-sectionLeft">
						<label class="checkbox mod-inline">
							<input class="checkbox-input" type="checkbox">
							<span class="checkbox-label">Option</span>
						</label>
					</div>
					<div class="filters-sectionRight">
						<div class="filters-item">
							<label class="textfield mod-framed">
								<input class="textfield-input" type="text" value="Tous" placeholder="placeholder" />
								<span class="textfield-label">Entités légales</span>
							</label>
						</div>
					</div>
				</div>
			</div>
		`;
	} else {
		return `
			<div class="filters ${sticky}">
				<div class="filters-sectionLeft">
					<div class="filters-item">
						<label class="textfield mod-framed">
							<input class="textfield-input" type="text" value="Tous les collaborateurs" placeholder="placeholder" />
							<span class="textfield-label">Collaborateurs</span>
						</label>
					</div>
				</div>
				<div class="filters-sectionLeft">
					<label class="checkbox mod-inline">
						<input class="checkbox-input" type="checkbox">
						<span class="checkbox-label">Option</span>
					</label>
				</div>
				<div class="filters-sectionRight">
					<div class="filters-item">
						<label class="textfield mod-framed">
							<input class="textfield-input" type="text" value="Tous" placeholder="placeholder" />
							<span class="textfield-label">Entités légales</span>
						</label>
					</div>
				</div>
			</div>
		`;
	}
}

const Template: StoryFn<FiltersBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	sticky: false,
	navside: false,
};
