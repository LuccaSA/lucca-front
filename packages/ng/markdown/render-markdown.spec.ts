/**
 * DOMPurify relies on DOM APIs that happy-dom does not implement faithfully (it lets `<script>` through and drops
 * block-level elements), so these tests run on jsdom to exercise the real sanitization.
 *
 * @vitest-environment jsdom
 */
import { renderMarkdown } from './render-markdown';

describe(renderMarkdown.name, () => {
	it('should return an empty string for an empty content', () => {
		expect(renderMarkdown('')).toBe('');
	});

	it('should render inline markdown', () => {
		expect(renderMarkdown('A **bold** [link](https://lucca.fr).')).toBe('<p>A <strong>bold</strong> <a href="https://lucca.fr">link</a>.</p>\n');
	});

	it('should render headings from the first level by default', () => {
		expect(renderMarkdown('# Title\n\n## Subtitle')).toBe('<h1 class="pr-u-h1">Title</h1>\n<h2 class="pr-u-h2">Subtitle</h2>\n');
	});

	it('should shift heading levels while keeping their style', () => {
		expect(renderMarkdown('# Title\n\n## Subtitle', { headingLevel: 3 })).toBe('<h3 class="pr-u-h1">Title</h3>\n<h4 class="pr-u-h2">Subtitle</h4>\n');
	});

	it('should clamp heading levels to h6 and utility classes to pr-u-h4', () => {
		expect(renderMarkdown('##### Deep\n\n###### Deeper', { headingLevel: 5 })).toBe('<h6 class="pr-u-h4">Deep</h6>\n<h6 class="pr-u-h4">Deeper</h6>\n');
	});

	it('should sanitize the rendered html', () => {
		expect(renderMarkdown('<img src="x" onerror="alert(1)"><script>alert(1)</script>Safe')).toBe('<p><img src="x">Safe</p>\n');
	});
});
