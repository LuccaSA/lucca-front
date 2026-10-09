import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MarkdownComponent } from '@lucca-front/ng/markdown';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'markdown-stories',
	templateUrl: './markdown.stories.html',
	imports: [MarkdownComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MarkdownStory {
	default = `# Lorem ipsum dolor sit amet

Consectetur adipiscing elit, sed do **eiusmod tempor** incididunt ut labore.

## Ut enim ad minim veniam

- Quis nostrud exercitation ullamco
- Laboris nisi ut aliquip ex ea commodo
`;

	headings = `# Lorem ipsum

## Dolor sit amet

### Consectetur adipiscing

#### Elit sed do

##### Eiusmod tempor

###### Incididunt ut labore
`;

	headingLevel = `# Lorem ipsum

## Dolor sit amet

### Consectetur adipiscing
`;

	inline = `Lorem ipsum dolor sit **amet**, consectetur *adipiscing* elit, sed do \`eiusmod\` tempor ~~incididunt~~ ut [labore](https://prisme.lucca.io).
`;

	lists = `- Lorem ipsum dolor
- Sit amet consectetur
  - Adipiscing elit

1. Sed do eiusmod
2. Tempor incididunt
`;

	blocks = `> Ut enim ad minim veniam, quis nostrud exercitation.

\`\`\`
const lorem = 'ipsum';
\`\`\`

---
`;

	table = `| Lorem | Ipsum |
| --- | --- |
| Dolor sit amet | 25 |
| Consectetur | 10 |
`;

	empty = '';

	unsafe = `# Lorem ipsum <script>alert('XSS')</script>

<img src="x" onerror="alert('XSS')" />

<a href="javascript:alert('XSS')">dolor sit amet</a>
`;
}

export default {
	title: 'QA/Markdown',
	component: MarkdownStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<MarkdownStory> = {
	args: {},
	render: template,
};
