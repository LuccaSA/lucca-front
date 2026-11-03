import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { render } from '@testing-library/angular';
import { BoxComponent } from './box.component';

describe(BoxComponent.name, () => {
	it('should expose the title as a level 2 heading by default, and follow hx', async () => {
		const { container, rerender } = await render(BoxComponent, { inputs: { heading: 'Title' } });

		expect(container.querySelector('.box-header-text-heading')).toHaveAttribute('role', 'heading');
		expect(container.querySelector('.box-header-text-heading')).toHaveAttribute('aria-level', '2');

		await rerender({ inputs: { heading: 'Title', hx: 3 }, partialUpdate: true });

		expect(container.querySelector('.box-header-text-heading')).toHaveAttribute('aria-level', '3');
	});

	it('should display the bubble icon before the title', async () => {
		const { container } = await render(BoxComponent, {
			inputs: { heading: 'Title', bubbleIcon: 'fileCopy' },
		});

		expect(container.querySelector('.box-header > lu-bubble-icon + .box-header-text')).not.toBeNull();
	});

	it('should project custom content before the title', async () => {
		const { container } = await render(`<lu-box heading="Title"><span boxHeaderStartSlot>Start</span>Content</lu-box>`, {
			imports: [BoxComponent],
		});

		expect(container.querySelector('.box-header > [boxHeaderStartSlot]')).toHaveTextContent('Start');
		expect(container.querySelector('[boxHeaderStartSlot] + .box-header-text')).toHaveTextContent('Title');
		expect(container.querySelector('.box-slot')).toHaveTextContent('Content');
	});

	it('should display ornaments on fancy themes only', async () => {
		const { container, rerender } = await render(BoxComponent, {
			inputs: { theme: 'fancyLight', bubble: 1, illustration: 'calendar' },
			providers: [provideHttpClient(), provideHttpClientTesting()],
		});

		expect(container.querySelector('.box-illustrations .ornament-front')).toHaveAttribute('src', 'https://cdn.lucca.fr/transverse/prisme/visuals/ornament/generic/calendar.svg');
		expect(container.querySelector('.box-illustrations .ornament-back')).not.toBeNull();

		await rerender({ inputs: { theme: 'white', bubble: 1, illustration: 'calendar' }, partialUpdate: true });

		expect(container.querySelector('.box-illustrations')).toBeNull();
	});
});
