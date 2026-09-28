import DOMPurify from 'isomorphic-dompurify';
import { Marked, Renderer, Tokens } from 'marked';

/** Deepest heading level allowed by HTML. */
const maxHeadingLevel = 6;

/** Deepest heading utility class provided by Prisme (`pr-u-h5` and `pr-u-h6` are deprecated). */
const maxHeadingUtilityLevel = 4;

export interface RenderMarkdownOptions {
	/**
	 * Heading level used for the top-level markdown heading (`# Heading`), the following ones being nested from it.
	 * Set it to the level that keeps the document outline valid where the markdown is displayed: with `2`,
	 * `# Heading` renders a `<h2 class="pr-u-h1">`, keeping the heading semantics clean while preserving its style.
	 *
	 * @default 1
	 */
	headingLevel?: number;
}

export function renderMarkdown(content: string, { headingLevel = 1 }: RenderMarkdownOptions = {}): string {
	if (!content) {
		return '';
	}

	const renderer = new Renderer();

	renderer.heading = function (this: Renderer, { tokens, depth }: Tokens.Heading): string {
		const level = Math.min(depth + headingLevel - 1, maxHeadingLevel);
		const utilityClass = `pr-u-h${Math.min(depth, maxHeadingUtilityLevel)}`;

		return `<h${level} class="${utilityClass}">${this.parser.parseInline(tokens)}</h${level}>\n`;
	};

	return DOMPurify.sanitize(new Marked({ renderer }).parse(content, { async: false }));
}
