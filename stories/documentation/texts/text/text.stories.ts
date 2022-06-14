import { Meta, Story } from '@storybook/angular';

interface TextBasicStory {
}

export default {
	title: 'Documentation/Texts/Text/Basic',
} as Meta;

function getTemplate(args: TextBasicStory): string {
	return `
		<h1 class="mod-headline">Headline</h1>
		<h1>Titre h1</h1>
		<h2>Titre h2</h2>
		<h3>Titre h3</h3>
		<h4>Titre h4</h4>
		<p class="mod-body1">Cotton candy shortbread fruitcake jelly candy pie jelly beans. Halvah chocolate bar cheesecake jelly-o chocolate cake macaroon cake bear claw lollipop. Tart candy pastry soufflé candy canes marzipan.</p>
		<p class="mod-body2">Cotton candy shortbread fruitcake jelly candy pie jelly beans. Halvah chocolate bar cheesecake jelly-o chocolate cake macaroon cake bear claw lollipop. Tart candy pastry soufflé candy canes marzipan.</p>
		<p class="mod-body3">Cotton candy shortbread fruitcake jelly candy pie jelly beans. Halvah chocolate bar cheesecake jelly-o chocolate cake macaroon cake bear claw lollipop. Tart candy pastry soufflé candy canes marzipan.</p>
		<p class="mod-caption">Cotton candy shortbread fruitcake jelly candy pie jelly beans. Halvah chocolate bar cheesecake jelly-o chocolate cake macaroon cake bear claw lollipop. Tart candy pastry soufflé candy canes marzipan.</p>
		<p><b>Cotton candy shortbread fruitcake jelly candy pie jelly beans. Halvah chocolate bar cheesecake jelly-o chocolate cake macaroon cake bear claw lollipop. Tart candy pastry soufflé candy canes marzipan.</b></p>
	`
}

const Template: Story<TextBasicStory> = (args: TextBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
