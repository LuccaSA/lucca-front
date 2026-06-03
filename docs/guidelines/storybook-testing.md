# Storybook Testing Guidelines

This document outlines the standard approach for adding tests to Storybook stories within the `lucca-front` repository.

## Overview

Tests in Storybook are implemented using the `play` function, which allows for automated interactions and assertions when a story is loaded. We use a helper function `createTestStory` to standardize these tests.

## Tools & Libraries

- **@storybook/angular**: Core Storybook Angular integration.
- **storybook/test**: Provides `expect`, `screen`, `userEvent`, and `within` (re-exports from Vitest and Testing Library).
- **stories/helpers/stories**: Contains `createTestStory`.
- **stories/helpers/test**: Contains `waitForAngular` and other interaction helpers.

## Standard Test Structure

A typical test is created by calling `createTestStory` on an existing story object.

```typescript
import { createTestStory } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

export const MyStoryTEST = createTestStory(MyStory, async ({ canvasElement, step }) => {
	// 1. Wait for Angular to stabilize
	await waitForAngular();

	const canvas = within(canvasElement);

	// 2. Use steps to organize interactions and assertions
	await step('Initial state check', async () => {
		const button = canvas.getByRole('button');
		await expect(button).toBeVisible();
	});

	await step('Interaction test', async () => {
		const button = canvas.getByRole('button');
		await userEvent.click(button);
		await waitForAngular(); // Wait after interactions if they trigger async changes
		// Add assertions here
	});
});
```

### Advanced: Reusing Play Functions
You can share test logic between stories by defining a base `play` function and reusing it.

```typescript
const basePlay = async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    // ... common test logic
};

export const BasicTEST = createTestStory(Basic, basePlay);
export const VariantTEST = createTestStory(Variant, async (context) => {
    await basePlay(context);
    // ... additional assertions for variant
});
```

## Guidelines

### 1. Naming Convention
- Name the test story by appending `TEST` to the original story name (e.g., `Basic` -> `BasicTEST`).

### 2. Initialization
- Always call `await waitForAngular()` at the beginning of the `play` function. This ensures that the Angular component is fully initialized and the first change detection cycle has run.

### 3. Using `step`
- Use the `step` function to wrap logical groups of interactions and assertions. This makes the Storybook "Interactions" panel much easier to read and debug.

### 4. Scoping Queries
- Use `within(canvasElement)` to scope your queries to the story's preview area.
- For elements that appear outside the canvas (like popovers, modals, or dropdowns that use `cdk-overlay`), use `screen` from `storybook/test`.

### 5. Waiting for Async Actions
- Call `await waitForAngular()` after any interaction (`userEvent.click`, `userEvent.keyboard`, etc.) that might trigger a change detection or an asynchronous update in Angular.

### 6. Assertions
- Use the matchers provided by `expect` from `storybook/test` (e.g., `toBeVisible()`, `toHaveClass()`, `toHaveAttribute()`, `toHaveTextContent()`).

### 7. Helper Functions
- Check `stories/helpers/test.ts` for existing helpers like `pickDay`, `expectNgModelDisplay`, or `clearInputs` before writing custom interaction logic.

## Common Patterns

### Testing Popovers/Modals
```typescript
await step('Open popover', async () => {
	await userEvent.click(canvas.getByRole('button'));
	await waitForAngular();
	const popover = screen.getByRole('dialog'); // Scoped to screen because it's an overlay
	await expect(popover).toBeVisible();
});
```

### Testing Keyboards
```typescript
await step('Escape key closes popover', async () => {
	await userEvent.keyboard('{Escape}');
	await waitForAngular();
	await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
```
