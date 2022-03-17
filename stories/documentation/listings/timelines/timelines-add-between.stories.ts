import { Meta, Story } from '@storybook/angular';

interface TimelinesAddBetweenStory {
}

export default {
	title: 'Documentation/Listings/Timelines/Add Between',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TimelinesAddBetweenStory): string {
	return `
	<ol class="timeline mod-vertical mod-number">
    <li class="timeline-step">
        <h2 class="timeline-step-title">
            First step
        </h2>
        <div class="gauge mod-vertical mod-thin">
            <div class="gauge-bar"></div>
        </div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
        <div class="timeline-step-addBetween">
            <button type="button" href="#" class="timeline-step-addBetween-action" >
                <span class="timeline-step-addBetween-action-icon">
                    <span class="lucca-icon icon-plus" aria-hidden="true"></span>
                </span>
                <span class="u-mask">
                    Ajouter une étape intermédiaire entre l’étape 1 et l’étape 2
                </span>
                <span class="hr u-displayBlock"></span>
            </button>
        </div>
    </li>
    <li class="timeline-step">
        <h2 class="timeline-step-title">
            Second step
        </h2>
        <div class="gauge mod-vertical mod-thin">
            <div class="gauge-bar"></div>
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure porro atque, laboriosam at vitae expedita ab recusandae voluptas obcaecati commodi deleniti enim doloremque? Consequuntur quisquam natus obcaecati recusandae officia dicta.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
    </li>
</ol>
	`
}

const Template: Story<TimelinesAddBetweenStory> = (args: TimelinesAddBetweenStory) => ({
	props: args,
	template: getTemplate(args),
});

export const AddBetween = Template.bind({});
AddBetween.args = {};
