import { Meta, StoryFn } from '@storybook/angular';

interface TimelinesAddBetweenVerticalStory {}

export default {
	title: 'Documentation/Listings/Timelines/Add Between Vertical',
	argTypes: {},
} as Meta;

function getTemplate(args: TimelinesAddBetweenVerticalStory): string {
	return `
	<ol class="timeline mod-vertical mod-number mod-addBetweenStep">
		<li class="timeline-step">
			<div class="timeline-step-title">
				First step
			</div>
			<div class="timeline-step-description">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
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
			<div class="timeline-step-description">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure porro atque, laboriosam at vitae expedita ab recusandae voluptas obcaecati commodi deleniti enim doloremque? Consequuntur quisquam natus obcaecati recusandae officia dicta.
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
			</div>
		</li>
	</ol>
	`;
}

const Template: StoryFn<TimelinesAddBetweenVerticalStory> = (args: TimelinesAddBetweenVerticalStory) => ({
	props: args,
	template: getTemplate(args),
});

export const AddBetweenVertical = Template.bind({});
AddBetweenVertical.args = {};
