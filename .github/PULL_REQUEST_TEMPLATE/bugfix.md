## Description

What was broken, in one sentence. Published in the changelog.
Keep the `-----` separators, our bot parses them.

-----

Optional: root cause and where to start reading.

### How to test

1. Story to open in the Storybook preview
2. What to do, and what you should see

<!-- For a rendering fix, post before/after captures in a "Visual proof" comment. With Claude Code, the recette-pr-fix skill runs the checks below and posts it. -->

-----

### Contribution

- [ ] Root cause of the bug is identified and understood
- [ ] Fix is proven: a test fails without it, or a visual proof is posted for a rendering fix
- [ ] Targeted lint and tests pass locally (build and full suites run in CI)

### Functional review

- [ ] Bug is no longer reproducible on the Storybook preview
- [ ] Visual proof and UI diff (QA Webservice check) are OK
- [ ] All related impacted functionalities are manually tested and show no regression

-----
