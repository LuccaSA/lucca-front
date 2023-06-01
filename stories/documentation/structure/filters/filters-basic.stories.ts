import { Meta, Story } from '@storybook/angular';

interface FiltersBasicStory {}

export default {
	title: 'Documentation/Structure/Filters/Basic',
} as Meta;

function getTemplate(args: FiltersBasicStory): string {
	return `
	<div class="filters">
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

const Template: Story<FiltersBasicStory> = (args: FiltersBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
