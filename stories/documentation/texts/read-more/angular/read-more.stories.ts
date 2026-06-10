import { READ_MORE_SURFACE, ReadMoreComponent } from '@lucca-front/ng/read-more';
import { Meta, moduleMetadata } from '@storybook/angular';
import { createTestStory, generateInputs, setStoryOptions } from 'stories/helpers/stories';
import { sleep, waitForAngular } from 'stories/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

const OTHER_SURFACE_OPTIONS = ['#0b1732'];

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
			description: 'Modifie le nombre de lignes affichées à l’état replié.',
		},
		surface: {
			options: setStoryOptions([...READ_MORE_SURFACE, ...OTHER_SURFACE_OPTIONS]),
			control: {
				type: 'select',
			},
			description: 'Modifie la couleur de fond sous le bouton "Lire plus / moins" ',
		},
		textFlow: {
			description: 'Applique les espacements du composant Text flow',
		},
		openOnly: {
			description: 'Empêche la fermeture du composant en masquant le bouton "Lire moins"',
		},
		innerContent: {
			description: 'Permet de passer le contenu via un innerHTML',
		},
		content: {
			table: { disable: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [ReadMoreComponent],
		}),
	],
	render: ({ innerContent, content, ...args }, { argTypes }) => {
		const innerContentParam = innerContent ? ` [innerContent]="'${content.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')}'"` : ``;
		if (innerContent) {
			return {
				template: `<lu-read-more${innerContentParam}${generateInputs(args, argTypes)} />`,
			};
		} else {
			return {
				template: `<lu-read-more${innerContentParam}${generateInputs(args, argTypes)}>
	${content}
</lu-read-more>`,
			};
		}
	},
} as Meta;

export const Basic = {
	args: {
		lineClamp: 3,
		openOnly: false,
		surface: 'default',
		textFlow: false,
		innerContent: false,
		content: `<p>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos ut maiores ullam facere voluptatum odio eum? Debitis natus nulla fugit
		<a href="#">deleniti</a>
		esse ipsum sint voluptatibus! Debitis voluptates impedit blanditiis natus.
	</p>
	<p>
		Vitae veritatis non aliquam obcaecati illum voluptatum, voluptas dignissimos perspiciatis velit odit, magnam
		<a href="#">aspernatur</a>
		culpa totam nemo, magni cum? Magni sapiente voluptatibus temporibus. Quas reprehenderit deleniti sit veniam, molestias obcaecati.
	</p>`,
	},
};

const extendedContent = `<p>
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
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos ut maiores ullam facere voluptatum odio eum? Debitis natus nulla fugit
		<a href="#">deleniti</a>
		esse ipsum sint voluptatibus! Debitis voluptates impedit blanditiis natus.
	</p>
	<p>
		Vitae veritatis non aliquam obcaecati illum voluptatum, voluptas dignissimos perspiciatis velit odit, magnam
		<a href="#">aspernatur</a>
		culpa totam nemo, magni cum? Magni sapiente voluptatibus temporibus. Quas reprehenderit deleniti sit veniam, molestias obcaecati.
	</p>`;

export const BasicTEST = createTestStory({ ...Basic, args: { ...Basic.args, content: extendedContent } }, async ({ canvasElement, step }) => {
	await sleep(200);
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial avec le bouton "Lire plus"', async () => {
		const readMoreButton = canvas.getByText(/lire plus/i);
		await expect(readMoreButton).toBeVisible();
	});

	await step('Clic sur "Lire plus" pour déplier le contenu', async () => {
		const readMoreButton = canvas.getByText(/lire plus/i);
		await userEvent.click(readMoreButton);
		await waitForAngular();
		const readLessButton = canvas.getByText(/lire moins/i);
		await expect(readLessButton).toBeVisible();
	});

	await step('Clic sur "Lire moins" pour replier le contenu', async () => {
		const readLessButton = canvas.getByText(/lire moins/i);
		await userEvent.click(readLessButton);
		await waitForAngular();
		const readMoreButton = canvas.getByText(/lire plus/i);
		await expect(readMoreButton).toBeVisible();
	});

	await step('Interaction clavier : ouverture et fermeture via le clavier', async () => {
		const readMoreButton = canvas.getByText(/lire plus/i);
		readMoreButton.focus();
		await expect(readMoreButton).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		const readLessButton = canvas.getByText(/lire moins/i);
		await expect(readLessButton).toBeVisible();
		readLessButton.focus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		const readMoreButtonAgain = canvas.getByText(/lire plus/i);
		await expect(readMoreButtonAgain).toBeVisible();
	});
});
