import {Component, Input} from '@angular/core';
import {User} from './user-tile.models';

/**
 * Displays user picture and name. User's role can be specified, and the footer is customizable.
 */
@Component({
	selector: 'lu-user-tile',
	templateUrl: './user-tile.component.html',
	styleUrls: ['./user-tile.component.scss']
})
export class LuUserTileComponent {

	/**
	 * User to display.
	 */
	@Input() user: User;

	/**
	 * User role to display
	 */
	@Input() role: string;

	hasUserPicture = () => !!this.user.picture && !!this.user.picture.url;

	getDefaultColorStyle = () => ({'background-color': 'rgb(215, 92, 112)'});  // TODO replace hardcoded color with algo

	getBackgroundImageStyle = () => ({'background-image': 'url(' + this.user.picture.url + '?width=100)'});

	getPictureTextPlaceholder = () => this.user.displayName.trim().toUpperCase().split(' ').map(str => str[0]).join('')
}
