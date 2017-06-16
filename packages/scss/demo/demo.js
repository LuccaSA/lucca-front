/* ANIMATIONS */
function reloadAnimation(elem) {
	var card = elem.getElementsByClassName('card')[0];
	var animationClass = card.classList[1];
	card.classList.remove(animationClass);
	setTimeout(function(){ card.classList.add(animationClass)},0);
}

/* ICONS */
function generateIconDemo() {
	var icons = {"icons": [
		'chevron_east',
		'chevron_north',
		'chevron_south',
		'chevron_west',

		'arrow_east',
		'arrow_north',
		'arrow_south',
		'arrow_west',

		'arrow_east_thin',
		'arrow_north_thin',
		'arrow_south_thin',
		'arrow_west_thin',

		'plus',
		'minus',
		'plus_thin',
		'tick',
		'tick_thin',

		'cross_thin',
		'cross',
		'close',

		'forbidden',
		'error',
		'warning',
		'help',
		'info',
		'rejected',
		'flag',

		'ellipsis',
		'list',
		'list_alternative',

		'mosaic',
		'tiles',
		'tiles_nine',
		'blocks',
		'org_tree',

		'branch',
		'filter',

		'fullscreen',
		'fullscreen_exit',
		'minimize',

		'lock',
		'unlock',

		'attachment',
		'files',
		'mail',
		'clipboard',
		'print',
		'notification',

		'import_dirty',
		'import_pristine',
		'download',
		'upload',
		'outside',
		'trash',
		'send',
		'synchronisation',
		'search',

		'watch',
		'unwatch',

		'user',
		'user_add',
		'user_group',
		'user_remove',
		'user_roles',
		'user_send_to',

		'edit',
		'edit_frame',
		'edit_mini',

		'palette',
		'image',
		'gallery',
		'camera',
		'phone',
		'flash',

		'refresh',
		'history',
		'timer',
		'clock',
		'completion_pie',
		'calendar',

		'key',
		'key_simple',

		'pin',
		'location',
		'talk',

		'checkbox',
		'checkbox_checked',
		'checkbox_filled_partial',
		'checkbox_filled',
		'checkbox_heavy_checked',
		'checkbox_partial',

		'radio',
		'radio_checked',

		'bookmark',
		'bookmark_add',
		'bookmark_remove',

		'move',
		'move_vertically',
		'move_horizontally',

		'menu',
		'menu_thin',

		'birthday',
		'breakfast',
		'meal',
		'lunch',
		'diner',
		'drink',
		'snack',
		'coffee',

		'bus',
		'car_clean',
		'taxi',
		'truck',
		'subway',
		'train',
		'plane',

		'euro',
		'quantity',
		'piggy_bank',

		'parking',
		'milestone',
		'mileage',
		'gasoline',
		'toll_euro',
		'toll_dollar',

		'journey',
		'luggage',
		'hotel',
		'stamp',

		'banking_card',
		'pricetag',
		'payment',
		'import_cb',

		'heart',
		'heart_broken',
		'star',

		'computer',
		'computer_mouse',
		'headphones',

		'settings',
		'sliders',
		'tools',
		'database',
		'analytics',

		'iron',
		'jumping_cc'
	]};

	w3.displayObject("icons-section", icons);
}
/* callback after includeHTML */
function afterIncludeHTML() {
	generateIconDemo();
}
