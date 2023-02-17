/* eslint-disable */
@Component({
	host: {
		'class.size-largest': true,
		'style.--spacings-smallest': true,
	},
})
export class MyComponent {
	@HostBinding('class.size-large') a = true;
	@HostBinding('style.--spacings-small') b = true;

	public addSubjects(): void {
		const modalRef = this._modal.open(
			PopulationNewModalComponent,
			{ campaign: this.campaign },
			{
				size: 'large',
				panelClass: ['lu-popup-panel', 'size-large', 'mod-populationPicker'],
			},
		);
	}
}
