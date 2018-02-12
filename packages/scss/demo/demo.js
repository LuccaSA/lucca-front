/* TOGGLE */
function collapse(elem) {
	elem.parentElement.classList.toggle('is-open');
}


/* TOAST */

function toast() {
	var toastsBox = document.getElementById("toastsBox");
	var toast = document.createElement("div");
	var toastsValues = [
		'Oh yeah! Something good happened :)',
		'Oops, something looks wrong :(',
		'Marked as done',
		'Please check <a href="#">this thing</a>',
		'Here <u>is</u> <i>some</i> <b>HTML</b>'
	];
	var r = Math.floor(Math.random() * Math.floor(toastsValues.length));
	toast.className = "toasts-item";
	toast.innerHTML = toastsValues[r];
	var close = document.createElement('button');
	close.className = "toasts-item-kill";
	close.addEventListener('click', toastKill, false);
	toast.appendChild(close);
	toastsBox.appendChild(toast);
}

function toastKill() {
	this.parentElement.remove();
}

//document.getElementsByClassName('toasts-item-kill').addEventListener('click', function() { alert() }, false);


/* ANIMATIONS */
function reloadAnimation(elem) {
	var card = elem.getElementsByClassName('card')[0];
	var animationClass = card.classList[1];
	card.classList.remove(animationClass);
	setTimeout(function(){ card.classList.add(animationClass)},0);
}


/* TEXTFIELD INLINE VALIDATION */
function validationFocus(elem) {
	var textfield = elem.parentElement;
	textfield.classList.remove('is-valid');
	textfield.classList.add('is-loading');
	setTimeout(function(){
		textfield.classList.remove('is-loading');
		textfield.classList.add('is-valid');
	}, 1500);
}

function unvalidationFocus(elem) {
	var textfield = elem.parentElement;
	textfield.classList.remove('is-invalid');
	textfield.classList.add('is-loading');
	setTimeout(function(){
		textfield.classList.remove('is-loading');
		textfield.classList.add('is-invalid');
	}, 1500);
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

		'plus_bold',
		'plus_thin',
		'minus',
		'tick_thin',
		'tick',
		'tick_bold',

		'cross_thin',
		'cross',
		'cross_bold',

		'forbidden',
		'error',
		'warning',
		'help',
		'help_outline',
		'thumbs_up',
		'thumbs_down',
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
		'synchronization',
		'search',

		'watch',
		'unwatch',

		'user',
		'user_add',
		'user_group',
		'user_remove',
		'user_roles',
		'user_send_to',
		'face',

		'edit',
		'edit_frame',
		'edit_mini',

		'palette',
		'image',
		'gallery',
		'camera',
		'phone',
		'smartphone',
		'flash',

		'refresh',
		'history',
		'timer',
		'clock',
		'completion_pie',
		'calendar',

		'key',

		'pin',
		'location',
		'talk',

		'bookmark',
		'bookmark_add',
		'bookmark_remove',

		'move',
		'move_vertically',
		'move_horizontally',
		'drag',

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
		'restaurant',
		'pressing',

		'bus',
		'car_clean',
		'taxi',
		'truck',
		'subway',
		'train',
		'plane',
		'car',

		'euro',
		'dollar',

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
		'jumping_cc',
		'credit_debit',
		'home',
		'planning',
		'planning_edit',
		'planning_tool',
		'todolist',

		'format_link',
		'format_list',
		'format_list_numbers',
		'format_redo',
		'format_undo',
		'format_underlined',
		'format_bold',
		'format_italic',
		'format_clear',

		'hr_folder',
		'archive',

		'certif_ok',
		'certif_waiting',
		'certif_ko'
	]};

	w3.displayObject("icons-section", icons);
}
/* callback after includeHTML */
function afterIncludeHTML() {
	generateIconDemo();
}
