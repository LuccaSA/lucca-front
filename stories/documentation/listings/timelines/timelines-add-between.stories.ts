import { Meta, StoryFn } from '@storybook/angular';

interface TimelinesAddBetweenStory {}

export default {
	title: 'Documentation/Listings/Timelines/Add Between',
	argTypes: {},
} as Meta;

function getTemplate(args: TimelinesAddBetweenStory): string {
	return `
	<ol class="timeline mod-number mod-addBetweenStep">
		<li class="timeline-step">
			<div class="timeline-step-title">
				First step
			</div>
		</li>
		<li class="timeline-step timeline-stepAddBetweenStep">
			<div class="timeline-step-title">
				<button type="button" class="timeline-stepAddBetweenStep-title">
					<span class="timeline-step-title-icon" aria-hidden="true"></span>
					<span class="u-mask">
						Ajouter une étape intermédiaire entre l’étape 1 et l’étape 2
					</span>
				</button>
			</div>
		</li>
		<li class="timeline-step">
			<div class="timeline-step-title">
				Second step
			</div>
		</li>
	</ol>
	`;
}

const Template: StoryFn<TimelinesAddBetweenStory> = (args: TimelinesAddBetweenStory) => ({
	props: args,
	template: getTemplate(args),
});

export const AddBetween = Template.bind({});
AddBetween.args = {};
