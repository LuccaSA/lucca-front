/**
 * The stories the harness tests run against.
 *
 * They live here rather than in the spec because the global setup loads every one of them before
 * the workers start: a dev Storybook compiles a story the first time it is asked for, and eight
 * workers racing that compilation all blow their timeout at once.
 */

/** A select inside a form field, starting on a value, with every option available. */
export const SIMPLE_SELECT_FIELD_STORY = 'documentation-forms-fields-simple-select-angular--basic';

/** A bare select, outside any form field, whose loading state is bound to a story arg. */
export const SIMPLE_SELECT_BARE_STORY = 'documentation-forms-simpleselect--basic';

/** A select whose last options refuse selection. */
export const SIMPLE_SELECT_DISABLED_OPTIONS_STORY = 'documentation-forms-simpleselect--with-disabled-options';

/** Every story above, compiled once by the global setup. */
export const ALL_STORIES = [SIMPLE_SELECT_FIELD_STORY, SIMPLE_SELECT_BARE_STORY, SIMPLE_SELECT_DISABLED_OPTIONS_STORY];
