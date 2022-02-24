
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "./documentation.json";

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
    page: null,
    // When stories are rendered inside an iframe, controls no longer affect displayed story
    inlineStories: true,
    source: {
      state: "open",
    }
  },
}
