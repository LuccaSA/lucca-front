# Contributing to Lucca Front

English is the main language used to debate, provide feedback and discuss features, please use it by default.

- [Naming](#naming)
- [Architecture](#architecture)
- [Developer eXperience](#dx)
- [Pull requests](#pull-requests)

## <a name="naming"></a> Naming

We're using Angular's standard for naming, which includes:

- Classes, interfaces, types and enums must use `PascalCase` for their name.
- Static constants must use `UPPER_CASE` for their name.
- Variables, functions and class fields must use `camelCase` for their name.
- Variable and fields must be named in a way that makes it easy to understand what they do, naming an important variable `a` is not accepted for instance.
- Component inputs must never collide with an existing native input on their host.

You can read a very detailed version of that here: https://google.github.io/styleguide/tsguide.html

## <a name="architecture"></a> Architecture

### Files organization:

When creating new components, they should be placed in the right folder, as each folder is its own library entrypoint, and thus bundle.

If you're not sure about where to put a given feature, don't hesitate to reach to the team to ask using an issue.

### Code architecture

It's hard to properly describe how things are organized but let's try.

Overall, you should always avoid heavily coupling business code from "dumb" design system components, a good example of that being simple-select and multi-select providing the base,
dumb version of what a select should be. Then, directives are here to provide them everything they need to connect to Lucca's APIs.

Keep things simple as much as possible and make sure everything is working fine when being used with a keyboard, because accessibility is a priority.

🖊️ WIP

## <a name="dx"></a> Developer eXperience

For a component to be used, it must be easy to use. Always prefer keeping the hard, complex part on our end so developers can enjoy using components.

This includes, but not only:

- Always use `luBooleanAttribute`/`luOptionalBooleanAttribute` transform when creating an input that should take boolean, to make it easier to use for everyone.
- Boolean inputs must default to `false`: name them after the behavior they enable, so that omitting the attribute gives the default behavior (`hiddenLabel`, not `showLabel` defaulting to `true`). A boolean attribute can't be turned off from a template without a binding (`<lu-x hiddenLabel>` works, `<lu-x [showLabel]="false">` is needed otherwise).
- Using meaningful input names, common names such as `config`, `param`, etc must be avoided and they're too generic, consumers need to know what your input does!
- Properly typings inputs, using union strings when necessary, to provide code completion, this can also be done with a trailing `| string` that will make it become a list of suggestions instead.
- Always use `luNumberAttribute`/`luOptionalNumberAttribute` transform when creating an input that should take numbers, to make it easier to use for everyone.

Overall, ask yourself: would I want to use this component, that input? Before deciding on it, because if you don't want to use it due to how it's exposed, neither will the consumers.

Finally, make sure you provide the right inputs and outputs for your component before releasing it, because once it's released, any change to its interface contract will result in a breaking change and nobody likes breaking changes.

## <a name="pull-requests"></a> Pull requests

Many contributions are now written with the help of AI agents. That is fine, but it changes what we need from you by the time the pull request reaches us.

- **Keep the description short.** It is read by humans: one sentence for a simple change, and no restating of the diff, reviewers have it in front of them. Read what your agent wrote before submitting. In the templates, the first block feeds the changelog and deeper context goes after the separator; the `-----` separators are parsed by our bot, keep them.
- **Ask us if you need to.** We are glad to help before you start: an agent goes straight to the point without knowing about wider concerns or ongoing discussions with other teams, and a bit of context in your prompt can save everyone a few review round-trips.
- **Understand what you are sending.** You should be able to explain every change in your pull request, and why it is there. Understanding the context you are working in often unlocks a better approach than the first one an agent finds.
- **Review your own diff first.** Read the "Files changed" tab and leave an inline comment wherever a reviewer would ask "why?". Two or three are enough, and they beat a paragraph in the description because they sit where the question arises. It is also the cheapest way to catch what an agent did on the side, and if you cannot annotate a passage you probably should not send it yet.
- **Check a fix before opening it.** Run `/recette-pr-fix` in Claude Code: in about 30 seconds it lints and tests what you changed, checks that your test fails without the fix, and lists what to watch. Once the PR is open, it posts before/after captures from the Storybook previews. Without Claude Code, the main checks run by hand: `node .claude/skills/recette-pr-fix/scripts/branch-context.mjs`, then `node .claude/skills/recette-pr-fix/scripts/regression-check.mjs --base origin/master` (or the base the first script reports). Then open the PR with the bugfix template, which holds the recette checklist: GitHub only applies it when you add `&template=bugfix.md` to the URL of the "Open a pull request" page (`…/compare/master...<branch>?expand=1`), or with `gh pr create --template bugfix.md`.
- **Label it.** Use `🤖 Produced by AI` when the pull request was mostly produced with AI, autocompleted code does not count. It tells us to be more careful on specific points.

### Branches, titles and commit messages

Name branches `type/kebab-case-description` (`fix/select-option-aria-disabled`), and write pull request titles as conventional commits in English, subject in the imperative: `fix(tooltip): do not reopen when a closing overlay refocuses the trigger`. Same types on both sides — `feat`, `fix`, `chore`, `docs`, `test`, `refactor` — and the scope is the entrypoint being touched. Pull requests are squash-merged, so the title becomes the commit message kept in the history.

Release pull requests, and those synchronizing `master` and `release/vX.X` (name those `chore/sync-21.4.1-to-22.0`), are merged with a merge commit, never squashed: squashing flattens the history shared by both branches, and the same changes come back on the next merge. Their title never becomes a commit message, so it is not bound to the convention above.
