
import { setCompodocJson } from "@storybook/addon-docs/angular";
import { componentWrapperDecorator } from '@storybook/angular';
import docJson from "./documentation.json";

const docToCleanup = [...docJson.components, ...docJson.directives, ...docJson.pipes];

for (const doc of docToCleanup) {
	doc.propertiesClass = [];
	doc.methodsClass = [];
}

setCompodocJson(docJson);

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		// When stories are rendered inside an iframe, controls no longer affect displayed story
		inlineStories: true,
		source: {
			state: "open",
		}
	},
}

export const decorators = [
	componentWrapperDecorator((story) => {
		const isZeroHeight = new URL(location.href).searchParams.get('zeroHeight');
		if (isZeroHeight === 'true') {
			document.body.classList.add('mod-zeroHeight');
		} else {
			document.body.classList.remove('mod-zeroHeight');
		}
		return story;
	}),
]
