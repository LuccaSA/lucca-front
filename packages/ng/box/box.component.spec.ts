import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render, screen } from '@testing-library/angular';
import { BoxComponent } from './box.component';

describe(BoxComponent.name, () => {
	it('should render the heading with the provided aria level', async () => {
		await render(`<lu-box heading="Accepted documents" description="PDF, JPG and PNG up to 5 MB." hx="2">Content</lu-box>`, {
			imports: [BoxComponent],
		});

		expect(screen.getByRole('heading', { level: 2, name: 'Accepted documents' })).toBeInTheDocument();
		expect(screen.getByText('PDF, JPG and PNG up to 5 MB.')).toBeInTheDocument();
	});

	it('should keep the deprecated neutral input working', async () => {
		await render(`<lu-box neutral data-testid="box">Content</lu-box>`, { imports: [BoxComponent] });

		expect(screen.getByTestId('box')).toHaveClass('mod-neutral');
	});

	it('should display the bubble icon on default themes only', async () => {
		const { container, rerender } = await render(BoxComponent, {
			inputs: { heading: 'Title', icon: 'fileCopy', theme: 'neutral' },
		});

		expect(container.querySelector('lu-bubble-icon')).not.toBeNull();

		await rerender({ inputs: { heading: 'Title', icon: 'fileCopy', theme: 'fancyLight' }, partialUpdate: true });

		expect(container.querySelector('lu-bubble-icon')).toBeNull();
	});

	it('should display ornaments on fancy themes only', async () => {
		const { container, rerender } = await render(BoxComponent, {
			inputs: { theme: 'fancyLight', bubble: 1, illustration: 'calendar' },
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});

		expect(container.querySelector('.box-illustrations-front')).toHaveAttribute('src', 'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data/generic/calendar.svg');
		expect(container.querySelector('.box-illustrations-back')).not.toBeNull();

		await rerender({ inputs: { theme: 'white', bubble: 1, illustration: 'calendar' }, partialUpdate: true });

		expect(container.querySelector('.box-illustrations')).toBeNull();
	});
});
