import { Component, Inject, Optional } from '@angular/core';
import { LuModal, LuPopup, LuSidepanel, LU_MODAL_DATA, LU_POPUP_DATA, LU_SIDEPANEL_DATA } from '@lucca-front/ng';
import { of } from 'rxjs';

@Component({
	selector: 'lu-fix-modal',
	templateUrl: './fix-modal.component.html'
})
export class FixModalComponent {
	constructor(
		private _popup: LuPopup,
		private _modal: LuModal,
		private _sidepanel: LuSidepanel,
	) {}
	openPopup(data?) {
		this._popup.open(BasicModalContent, data);
	}
	openModal(data?) {
		this._modal.open(BasicModalContent, data);
	}
	openSidepanel(data?) {
		this._sidepanel.open(BasicModalContent, data);
	}
}
@Component({
	selector: 'lu-modal-content',
	template: `Marzipan pudding powder tart powder donut. Tiramisu halvah cookie apple pie dessert soufflé halvah chocolate bar jelly-o. Brownie sesame snaps marzipan wafer bonbon. Sesame snaps muffin dragée liquorice bonbon. Toffee cotton candy jelly fruitcake jelly beans fruitcake cupcake caramels candy canes. Jelly biscuit oat cake dragée. Cookie jujubes cake cotton candy fruitcake. Danish cookie candy canes pie. Cake pudding cookie icing cookie cookie liquorice apple pie. Lemon drops pastry toffee pastry. Candy canes ice cream apple pie halvah tiramisu jelly-o. Tootsie roll tiramisu dragée tiramisu wafer.

	Marzipan pudding powder tart powder donut. Tiramisu halvah cookie apple pie dessert soufflé halvah chocolate bar jelly-o. Brownie sesame snaps marzipan wafer bonbon. Sesame snaps muffin dragée liquorice bonbon. Toffee cotton candy jelly fruitcake jelly beans fruitcake cupcake caramels candy canes. Jelly biscuit oat cake dragée. Cookie jujubes cake cotton candy fruitcake. Danish cookie candy canes pie. Cake pudding cookie icing cookie cookie liquorice apple pie. Lemon drops pastry toffee pastry. Candy canes ice cream apple pie halvah tiramisu jelly-o. Tootsie roll tiramisu dragée tiramisu wafer.

Gingerbread pudding croissant cupcake cookie jelly beans. Bonbon donut jujubes topping brownie chocolate bar. Bonbon lollipop sweet roll apple pie chocolate bar. Gummies apple pie topping chupa chups lemon drops cotton candy carrot cake. Sweet roll cake gummies sugar plum pastry dragée. Brownie soufflé cake cake gummies. Chupa chups danish cake biscuit pastry topping halvah brownie. Cupcake pastry pastry carrot cake. Toffee lemon drops dragée gummies. Lollipop caramels sesame snaps donut tootsie roll sesame snaps. Dragée candy sugar plum cake carrot cake. Apple pie ice cream lollipop. Powder cake oat cake toffee lollipop sesame snaps candy.

Cake oat cake liquorice marzipan liquorice. Sesame snaps cake toffee bear claw. Chupa chups chupa chups gummi bears macaroon lollipop muffin gingerbread chocolate. Chocolate cake tiramisu chocolate cake. Jujubes toffee candy caramels cupcake cotton candy halvah cotton candy. Chupa chups biscuit sesame snaps jelly apple pie bear claw chupa chups donut powder. Sweet bear claw fruitcake wafer apple pie. Marshmallow cheesecake cake. Tart pudding brownie chocolate cake macaroon jelly marshmallow danish. Donut biscuit brownie muffin apple pie sweet. Chupa chups lemon drops candy canes carrot cake. Halvah halvah cake. <br />
	popup data: {{popupData}}<br />
	modal data: {{modalData}}<br />
	sidepanel data: {{sidepanelData}}<br />
	`
})
export class BasicModalContent {
	title = 'title';
	submitAction = () => of(true);

	constructor(
		@Optional()@Inject(LU_POPUP_DATA) public popupData,
		@Optional()@Inject(LU_MODAL_DATA) public modalData,
		@Optional()@Inject(LU_SIDEPANEL_DATA) public sidepanelData,
	) {}
}
