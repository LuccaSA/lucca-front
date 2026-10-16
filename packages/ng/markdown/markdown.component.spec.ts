/**
 * DOMPurify relies on DOM APIs that happy-dom does not implement faithfully (it lets `<script>` through and drops
 * block-level elements), so these tests run on jsdom to exercise the real sanitization.
 *
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/angular';
import { MarkdownComponent } from './markdown.component';

describe(MarkdownComponent.name, () => {
	async function renderMarkdownComponent(content: string, headingLevel?: number): Promise<HTMLElement> {
		const { container } = await render(MarkdownComponent, {
			inputs: { content, ...(headingLevel === undefined ? {} : { headingLevel }) },
		});

		return container;
	}

	it('should render markdown inside a text flow', async () => {
		const container = await renderMarkdownComponent('A **bold** statement.');

		expect(container.querySelector('.textFlow')).toBeInTheDocument();
		expect(screen.getByText('bold').tagName).toBe('STRONG');
	});

	it('should render headings from the first level by default', async () => {
		await renderMarkdownComponent('# Title\n\n## Subtitle');

		expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toHaveClass('pr-u-h1');
		expect(screen.getByRole('heading', { level: 2, name: 'Subtitle' })).toHaveClass('pr-u-h2');
	});

	it('should shift heading levels while keeping their style', async () => {
		await renderMarkdownComponent('# Title\n\n## Subtitle', 3);

		expect(screen.getByRole('heading', { level: 3, name: 'Title' })).toHaveClass('pr-u-h1');
		expect(screen.getByRole('heading', { level: 4, name: 'Subtitle' })).toHaveClass('pr-u-h2');
	});

	it('should sanitize the rendered html', async () => {
		const container = await renderMarkdownComponent('<img src="x" onerror="alert(1)"><script>alert(1)</script>Safe');

		expect(container.querySelector('script')).toBeNull();
		expect(container.querySelector('img')).not.toHaveAttribute('onerror');
		expect(screen.getByText('Safe')).toBeInTheDocument();
	});
});
