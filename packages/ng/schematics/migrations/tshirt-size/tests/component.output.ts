/* eslint-disable */
@Component({
	host: {
		'class.mod-XXL': true,
		'style.--spacings-XXS': true,
	},
})
export class MyComponent {
	@HostBinding('class.mod-L') a = true;
	@HostBinding('style.--spacings-S') b = true;

	public addSubjects(): void {
		const modalRef = this._modal.open(
			PopulationNewModalComponent,
			{ campaign: this.campaign },
			{
				size: 'large',
				panelClass: ['lu-popup-panel', 'mod-L', 'mod-populationPicker'],
			},
		);
	}
}
