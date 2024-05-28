import { Meta, StoryFn } from '@storybook/angular';

interface TimelinesVerticalStory {
	number: boolean;
	size: string;
}

export default {
	title: 'Documentation/Listings/Timelines/Vertical',
	argTypes: {
		number: {
			control: {
				type: 'boolean',
			},
		},
		size: {
			options: ['', 'mod-S', 'mod-L'],
			control: {
				type: 'radio',
			},
		},
	},
} as Meta;

function getTemplate(args: TimelinesVerticalStory): string {
	const classes = [args.size].filter(Boolean).join(' ');
	const number = args.number ? `mod-number` : '';
	return `
		<ol class="timeline mod-vertical ${classes} ${number}">
			<li class="timeline-step">
				<div class="timeline-step-title">
					<a href="#" class="timeline-step-title-action">Previous step</a>
				</div>
				<div class="timeline-step-description">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
				</div>
			</li>
			<li class="timeline-step" aria-current="step">
				<div class="timeline-step-title">
					Current step
				</div>
				<div class="timeline-step-description">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure porro atque, laboriosam at vitae expedita ab recusandae voluptas obcaecati commodi deleniti enim doloremque? Consequuntur quisquam natus obcaecati recusandae officia dicta.
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
				</div>
			</li>
			<li class="timeline-step">
				<div class="timeline-step-title">
					Next step
				</div>
				<div class="timeline-step-description">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
				</div>
			</li>
			<li class="timeline-step">
				<div class="timeline-step-title">
					Last step
				</div>
				<div class="timeline-step-description">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi natus dolorem repudiandae.
				</div>
			</li>
		</ol>
	`;
}

const Template: StoryFn<TimelinesVerticalStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Vertical = Template.bind({});
Vertical.args = { number: false, size: '' };
