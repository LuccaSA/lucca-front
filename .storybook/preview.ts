import { SELECT_RESPONSIVE_DIALOG } from '@lucca-front/ng/core-select';
import { applicationConfig, type Preview } from '@storybook/angular-vite';
import DocumentationTemplate from './DocumentationTemplate.mdx';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import MswPlugin from './plugins/msw';
import LocaleId from './plugins/locale-id';

setCompodocJson(docJson);
MswPlugin.init();
LocaleId.init();

const preview: Preview = {
  decorators: [
    // The select's responsive dialog — button trigger and bottom sheet panel below the S breakpoint —
    // is behind a flag defaulting to false, so Storybook turns it on to keep demoing it.
    applicationConfig({
      providers: [{ provide: SELECT_RESPONSIVE_DIALOG, useValue: true }],
    }),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    docs: {
      // When stories are rendered inside an iframe, controls no longer affect displayed story
      inlineStories: true,
      page: DocumentationTemplate,
      canvas: {
        sourceState: 'shown',
      },
    },

    backgrounds: {
      default: 'Default',
      values: [
        {
          name: 'Raised',
          value: '#ffffff',
        },
        {
          name: 'Default',
          value: '#f3f6fc',
        },
        {
          name: 'Sunken',
          value: '#e7edf9',
        },
        {
          name: 'Inverted',
          value: '#0b1732',
        },
      ],
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  tags: ['autodocs'],
};

export default preview;
