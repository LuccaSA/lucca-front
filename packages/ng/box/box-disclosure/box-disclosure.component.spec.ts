import { render } from '@testing-library/angular';
import { BoxDisclosureComponent } from './box-disclosure.component';

describe(BoxDisclosureComponent.name, () => {
	it('should render several metadata items as a listing', async () => {
		const { container } = await render(BoxDisclosureComponent, { inputs: { heading: 'Title', metadata: ['First', 'Second'] } });

		expect(container.querySelectorAll('.boxDisclosure-summary-metadata lu-listing-item')).toHaveLength(2);
	});

	it('should render a single metadata item as plain text', async () => {
		const { container } = await render(BoxDisclosureComponent, { inputs: { heading: 'Title', metadata: ['Only'] } });

		expect(container.querySelector('.boxDisclosure-summary-metadata lu-listing')).toBeNull();
		expect(container.querySelector('.boxDisclosure-summary-metadata')).toHaveTextContent('Only');
	});

	it('should not render metadata for an empty array', async () => {
		const { container } = await render(BoxDisclosureComponent, { inputs: { heading: 'Title', metadata: [] } });

		expect(container.querySelector('.boxDisclosure-summary-metadata')).toBeNull();
	});
});
