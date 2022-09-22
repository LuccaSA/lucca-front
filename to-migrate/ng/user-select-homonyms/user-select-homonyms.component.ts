import { Component } from '@angular/core';
import { ILuUser } from '@lucca-front/ng/user';

@Component({
	selector: 'lu-user-select-homonyms',
	templateUrl: './user-select-homonyms.component.html',
})
export class UserSelectHomonymsComponent {
	item;
	bob: ILuUser = {
		id: 12,
		firstName: 'SpongeBob',
		lastName: 'SquarePants',
		pictureHref: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
		jobTitle: 'Cook @KrustyKrab',
	};
	patrick: ILuUser = {
		id: 13,
		firstName: 'Patrick',
		lastName: 'Starfish',
		picture: {
			href: 'https://nickelodeonuniverse.com/wp-content/uploads/Patrick.png',
		},
		jobTitle: 'Happiness Guru',
	};
	squidwards: ILuUser = {
		id: 14,
		firstName: 'Squidwards',
		lastName: 'Tentacles',
		jobTitle: 'Cashier @KrustyKrab',
	};
}
