import { Meta, Story } from '@storybook/angular';

interface SectionsBasicStory {
}

export default {
	title: 'Documentation/Structure/Sections/Basic',
} as Meta;

function getTemplate(args: SectionsBasicStory): string {
	return `
	<section class="titleSection">
		<h1>Titre H1</h1>
		<div class="titleSection-sub">Sous-titre</div>
	</section>
	<section class="contentSection">
		Marzipan cheesecake lemon drops. Lollipop marzipan sweet roll powder macaroon danish. Bonbon chocolate gingerbread pastry. Cake oat cake carrot cake donut wafer. Jelly beans oat cake sugar plum candy.
	</section>
	<section class="titleSection">
		<h2>Titre H2</h2>
		<div class="titleSection-sub">Sous-titre</div>
	</section>
	<section class="contentSection">
		Marzipan cheesecake lemon drops. Lollipop marzipan sweet roll powder macaroon danish. Bonbon chocolate gingerbread pastry. Cake oat cake carrot cake donut wafer. Jelly beans oat cake sugar plum candy.
	</section>
	<section class="titleSection">
		<h3>Titre H3</h3>
		<div class="titleSection-sub">Sous-titre</div>
	</section>
	<section class="contentSection">
		Marzipan cheesecake lemon drops. Lollipop marzipan sweet roll powder macaroon danish. Bonbon chocolate gingerbread pastry. Cake oat cake carrot cake donut wafer. Jelly beans oat cake sugar plum candy.
	</section>
	<section class="titleSection">
		<h4>Titre H4</h4>
		<div class="titleSection-sub">Sous-titre</div>
	</section>
	<section class="contentSection">
		Marzipan cheesecake lemon drops. Lollipop marzipan sweet roll powder macaroon danish. Bonbon chocolate gingerbread pastry. Cake oat cake carrot cake donut wafer. Jelly beans oat cake sugar plum candy.
	</section>
	`
}

const Template: Story<SectionsBasicStory> = (args: SectionsBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
