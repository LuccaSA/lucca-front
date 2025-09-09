import { ReadMoreComponent } from '@lucca-front/ng/read-more';
import { TagComponent } from '@lucca-front/ng/tag';
import { Meta, moduleMetadata } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/ReadMore/Angular/AI',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [ReadMoreComponent, TagComponent],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			template: `<div class="box">
	<h3 class="pr-u-h3 pr-u-marginBlockEnd150 pr-u-displayFlex pr-u-flexWrapWrap pr-u-columnGap100">
		Ce qu’il faut retenir
		<lu-tag AI label="Généré par IA" icon="weatherStars" />
	</h3>
	<lu-read-more textFlow lineClamp="2">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tincidunt ullamcorper blandit. Vestibulum neque nisi, gravida ac dictum in, finibus at lorem. Mauris fringilla viverra ornare. Proin bibendum, tortor sed fringilla ullamcorper, nulla purus mollis tellus, at facilisis sapien sem id orci. Fusce ac nibh convallis, fermentum orci in, lobortis arcu.</p>
		<p>Praesent id purus ac eros maximus ultricies. Nam vulputate, nisl vel porta mattis, elit eros ornare leo, ut faucibus leo ligula malesuada nulla. Ut imperdiet, mi sit amet ultrices vehicula, massa ligula mattis dolor, a vehicula libero ligula eget orci. Maecenas mi diam, facilisis id leo dictum, malesuada finibus mi. Quisque tempus at est eget euismod. Integer eget mattis magna, commodo vulputate erat.</p>
	</lu-read-more>
</div>`,
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
