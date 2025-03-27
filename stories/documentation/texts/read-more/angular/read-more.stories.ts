import { DividerComponent } from '@lucca-front/ng/divider';
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
import { Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Texts/ReadMore/Angular/Basic',
	argTypes: {
		lineClamp: {
			control: {
				type: 'range',
				min: 2,
				max: 20,
				step: 1,
			},
		},
		surface: {
			options: [null, 'default', 'sunken', '#0b1732'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [ReadMoreComponent, DividerComponent],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			template: `
<lu-read-more ${generateInputs(args, argTypes)}>
	<p>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos ut maiores ullam facere voluptatum odio eum? Debitis natus nulla fugit
		<a href="#">deleniti</a>
		esse ipsum sint voluptatibus! Debitis voluptates impedit blanditiis natus.
	</p>
	<p>
		Vitae veritatis non aliquam obcaecati illum voluptatum, voluptas dignissimos perspiciatis velit odit, magnam
		<a href="#">aspernatur</a>
		culpa totam nemo, magni cum? Magni sapiente voluptatibus temporibus. Quas reprehenderit deleniti sit veniam, molestias obcaecati.
	</p>
	<p>
		Explicabo deleniti perspiciatis inventore odit ratione et illum temporibus, culpa facilis debitis porro delectus,
		<a href="#">accusamus</a>
		perferendis ducimus reiciendis. Voluptatem nam nemo quia sint quisquam! Possimus itaque quae eius labore neque it.
	</p>
</lu-read-more>
<lu-divider />
<lu-read-more ${generateInputs(args, argTypes)}>
	Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos ut maiores ullam facere voluptatum odio eum? Debitis natus nulla fugit
	esse ipsum sint voluptatibus! Debitis voluptates impedit blanditiis natus.
	Vitae veritatis non aliquam obcaecati illum voluptatum, voluptas dignissimos perspiciatis velit odit, magnam
	culpa totam nemo, magni cum? Magni sapiente voluptatibus temporibus. Quas reprehenderit deleniti sit veniam, molestias obcaecati.
	Explicabo deleniti perspiciatis inventore odit ratione et illum temporibus, culpa facilis debitis porro delectus,
	perferendis ducimus reiciendis. Voluptatem nam nemo quia sint quisquam! Possimus itaque quae eius labore neque it.
</lu-read-more>
			`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		lineClamp: 5,
		openOnly: false,
		surface: 'default',
		textFlow: false,
	},
};
