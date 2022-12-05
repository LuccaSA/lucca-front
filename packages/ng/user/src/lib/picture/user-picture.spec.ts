/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Meta, { Basic } from '@/stories/users/picture/picture.stories';
import { composeStory, createMountableStoryComponent } from '@storybook/testing-angular';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';

const Primary = composeStory(Basic, Meta);

describe('User picture', () => {
	it('should display user display with default args', async () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { component, ngModule } = createMountableStoryComponent(Primary({}, {} as any));
		await render(component, {
			imports: [ngModule],
		});

		const userPictureStory = screen.getByTestId('lu-user-picture');
		expect(userPictureStory).toBeInTheDocument();
	});
});
