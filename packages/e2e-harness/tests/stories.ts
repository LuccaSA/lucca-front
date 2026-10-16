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

/** A multi select inside a form field, starting empty, clearable, with every option available. */
export const MULTI_SELECT_FIELD_STORY = 'documentation-forms-fields-multi-select-angular--basic';

/** A bare multi select, outside any form field, whose `maxValuesShown` is bound to a story arg. */
export const MULTI_SELECT_BARE_STORY = 'documentation-forms-multiselect--basic';

/** A multi select starting on two values, half of whose options refuse selection. */
export const MULTI_SELECT_DISABLED_OPTIONS_STORY = 'documentation-forms-multiselect--with-disabled-options';

/** A select whose panel offers to make an option out of the search, whatever the search is. */
export const SIMPLE_SELECT_ADD_OPTION_STORY = 'documentation-forms-simpleselect--add-option';
export const MULTI_SELECT_ADD_OPTION_STORY = 'documentation-forms-multiselect--add-option';

/** A multi select whose panel offers to take every option at once, starting on none of them. */
export const MULTI_SELECT_SELECT_ALL_STORY = 'documentation-forms-multiselect--select-all';

/** A multi select whose options are nested, the panel taking the `tree` role. */
export const TREE_MULTI_SELECT_STORY = 'documentation-forms-multiselect--tree';

/** The same tree, held by a simple select: one value, and no parent/children shortcut. */
export const TREE_SIMPLE_SELECT_STORY = 'documentation-forms-simpleselect--tree';

/** Every story above, compiled once by the global setup. */
export const ALL_STORIES = [
	SIMPLE_SELECT_FIELD_STORY,
	SIMPLE_SELECT_BARE_STORY,
	SIMPLE_SELECT_DISABLED_OPTIONS_STORY,
	MULTI_SELECT_FIELD_STORY,
	MULTI_SELECT_BARE_STORY,
	MULTI_SELECT_DISABLED_OPTIONS_STORY,
	SIMPLE_SELECT_ADD_OPTION_STORY,
	MULTI_SELECT_ADD_OPTION_STORY,
	MULTI_SELECT_SELECT_ALL_STORY,
	TREE_MULTI_SELECT_STORY,
	TREE_SIMPLE_SELECT_STORY,
];
