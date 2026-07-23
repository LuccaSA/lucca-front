# Task 05 — Rich text input & multilanguage input

**Prerequisite reading**: `00-conventions.md` (provided alongside this file). Follow it.

## Scope

- `RichTextInputComponent` (`lu-rich-text-input`) in `packages/ng/forms` — including its
  toolbar plugins (bold/italic/lists/link — enumerate from the source)
- `MultilanguageInputComponent` (`lu-multilanguage-input`) in `packages/ng/forms`

These are the two heaviest form inputs; they get their own task so the agent can spend its
whole budget here.

## Before writing

1. Read the rich-text component source to identify the underlying editor engine (check
   imports — likely a contenteditable wrapper or a lib like Lexical/ProseMirror). **The
   editor engine's internals are out of scope** — test the component's contract: toolbar
   actions, FormControl value, keyboard shortcuts the component itself wires.
2. Read existing specs/stories: `packages/ng/forms/rich-text-input/**/*.spec.ts` (if any),
   `stories/documentation/forms/rich-text*/*.stories.ts` (play functions may exist).
3. jsdom warning: contenteditable support in jsdom is poor. Expect most rich-text
   interaction coverage to live in **Storybook play functions**, with Jest reserved for
   the CVA contract (writeValue renders HTML, disable works, value emitted on change).

## Behaviors to cover

Rich text — mouse (play functions):
- Clicking a toolbar button (bold, italic, list…) applies the format to the selection and
  the button reflects active state (`aria-pressed` or equivalent).
- Link plugin: selecting text and clicking the link button opens the link editor overlay;
  confirming inserts a link into the value; Escape cancels without modifying content.
- Disabled editor: toolbar inert, content not editable.

Rich text — keyboard (play functions):
- Typing text updates the FormControl value (assert the serialized format the CVA emits —
  read the source for HTML vs JSON).
- Standard shortcuts the component wires (Ctrl+B / Ctrl+I — verify in source which exist)
  toggle formatting.
- Tab behavior: whether Tab leaves the editor or indents (lists) — assert what the
  implementation does; focus must never be trapped with no keyboard exit.
- Toolbar is reachable by keyboard (Tab or arrow-key pattern — assert the actual pattern).

Rich text — Jest (CVA contract only):
- `writeValue` renders the given content; user edit → FormControl value; `disable()`;
  empty content → the empty value the component emits (`null` or `''` — assert the real one).

Multilanguage input:
- Renders one input per configured language/translation entry; typing in one language
  updates only that entry in the FormControl value (assert the value shape from source).
- Language switching UI (tabs? dropdown? — read the template): mouse click and keyboard
  activation both switch the visible language input.
- Required/invalid state when a mandatory translation is empty, if validators exist.
- Full CVA contract per conventions.

## Definition of done

Per `00-conventions.md`. Fast loop: `npx jest packages/ng/forms --isolatedModules=true`,
plus the Storybook test-runner flow since most rich-text coverage lands there.
