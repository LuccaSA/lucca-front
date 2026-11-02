import { Meta, StoryObj } from '@storybook/angular-vite';

interface WrapperStory {}

export default {
	title: 'Documentation/Structure/Box/HTML&CSS/Wrapper',
	argTypes: {},
} as Meta;

function getTemplate(args: WrapperStory): string {
	return `<div class="boxWrapper" style="--components-boxWrapper-columns: 3">
	<div class="box">
		<div class="box-header">
			<div class="box-header-text">
				<div class="box-header-title">Title</div>
				<p class="box-header-subtitle">Subtitle</p>
			</div>
		</div>
		<div class="box-slot">Custom content</div>
	</div>
	<div class="box">
		<div class="box-header">
			<div class="box-header-text">
				<div class="box-header-title">Title</div>
				<p class="box-header-subtitle">Subtitle</p>
			</div>
		</div>
		<div class="box-slot">Jujubes topping oat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll.</div>
	</div>
	<div class="box">
		<div class="box-header">
			<div class="box-header-text">
				<div class="box-header-title">Title</div>
				<p class="box-header-subtitle">Subtitle</p>
			</div>
		</div>
		<div class="box-slot">Jujubes topping oat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread pastry.</div>
	</div>
	<div class="box">
		<div class="box-header">
			<div class="box-header-text">
				<div class="box-header-title">Title</div>
				<p class="box-header-subtitle">Subtitle</p>
			</div>
		</div>
		<div class="box-slot">Jujubes topping oat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread pastry.</div>
	</div>
	<div class="box">
		<div class="box-header">
			<div class="box-header-text">
				<div class="box-header-title">Title</div>
				<p class="box-header-subtitle">Subtitle</p>
			</div>
		</div>
		<div class="box-slot">Custom content</div>
	</div>
	<div class="box">
		<div class="box-header">
			<div class="box-header-text">
				<div class="box-header-title">Title</div>
				<p class="box-header-subtitle">Subtitle</p>
			</div>
		</div>
		<div class="box-slot">Jujubes topping oat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll.</div>
	</div>
</div>`;
}

const Template = (args: WrapperStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Wrapper: StoryObj<WrapperStory> = {
	args: {},
	render: Template,
};
