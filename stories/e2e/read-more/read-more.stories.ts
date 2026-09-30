import { createTestStory } from '@/helpers/stories';
import { sleep, waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/texts/read-more/angular/read-more.stories';

export default {
	...meta,
	title: 'E2E/ReadMore',
	tags: ['!autodocs'],
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
