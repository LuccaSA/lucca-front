/* TOGGLE */
function collapse(elem) {
	elem.parentElement.classList.toggle('is-open');
}

/* TOAST */

function toast() {
	var toastsBox = document.getElementById('toastsBox');
	var toast = document.createElement('div');
	var toastsValues = [
		'Oh yeah! Something good happened :)',
		'Oops, something looks wrong :(',
		'Marked as done',
		'Please check <a href="#">this thing</a>',
		'Here <ins>is</ins> <em>some</em> <strong>HTML</strong>',
	];
	var r = Math.floor(Math.random() * Math.floor(toastsValues.length));
	toast.className = 'toasts-item';
	toast.innerHTML = toastsValues[r];
	var close = document.createElement('button');
	close.className = 'toasts-item-kill';
	close.addEventListener('click', toastKill, false);
	toast.appendChild(close);
	toastsBox.appendChild(toast);
}

function toastKill() {
	this.parentElement.remove();
}

//document.getElementsByClassName('toasts-item-kill').addEventListener('click', function() { alert() }, false);

/* TOAST COMM IN APP */

function toastCommInApp() {
	var toastsCommInAppBox = document.getElementById('toastsCommInAppBox');
	var toastCommInApp = document.createElement('div');
	var toastsCommInAppValues = [
		'<div class="toasts-visual"><svg class="toasts-blob" xmlns="http://www.w3.org/2000/svg">\
			<use href="../images/commInApp.svg#bannerBackground"></use>\
		</svg>\
		<svg class="toasts-illustration" xmlns="http://www.w3.org/2000/svg">\
			<use href="../images/commInApp.svg#comminapp-illu"></use>\
		</svg>\
		</div>\
		<div class="toasts-content"><div class="toasts-content-title"><strong>The module has a new look !</strong></div>\
		<p>Carentibus et vates arduos quam gloriae honeste ob primo.</p>\
		<button type="button" class="button mod-outline mod-white mod-smaller">Try now</button><button type="button" class="button mod-text mod-invert mod-smaller">Later</button></div>',
	];
	var r = Math.floor(Math.random() * Math.floor(toastsCommInAppValues.length));
	toastCommInApp.className = 'toasts-item';
	toastCommInApp.innerHTML = toastsCommInAppValues[r];
	var close = document.createElement('button');
	close.className = 'toasts-item-kill';
	close.addEventListener('click', toastKill, false);
	toastCommInApp.appendChild(close);
	toastsCommInAppBox.appendChild(toastCommInApp);
}

function toastKill() {
	this.parentElement.remove();
}

/* ANIMATIONS */
function reloadAnimation(elem) {
	var card = elem.getElementsByClassName('card')[0];
	var animationClass = card.classList[1];
	card.classList.remove(animationClass);
	setTimeout(function () {
		card.classList.add(animationClass);
	}, 0);
}

/* TEXTFIELD INLINE VALIDATION */
function validationFocus(elem) {
	var textfield = elem.parentElement;
	textfield.classList.remove('is-valid');
	textfield.classList.add('is-loading');
	setTimeout(function () {
		textfield.classList.remove('is-loading');
		textfield.classList.add('is-valid');
	}, 1500);
}

function unvalidationFocus(elem) {
	var textfield = elem.parentElement;
	textfield.classList.remove('is-invalid');
	textfield.classList.add('is-loading');
	setTimeout(function () {
		textfield.classList.remove('is-loading');
		textfield.classList.add('is-invalid');
	}, 1500);
}

/* ICONS */
function generateIconDemo() {
	var icons = {
		icons: [
			'moneybag',
			'save',
			'establishment',
			'completion',
			'share',
			'no_money',
			'euro',
			'palette',
			'puzzle',
			'partial',
			'minimize',
			'tick',
			'compass',
			'minus',
			'supplies',
			'alarm',
			'analytics',
			'apps',
			'archive',
			'backward',
			'forward',
			'arrow_full_east',
			'arrow_full_north',
			'arrow_full_south',
			'arrow_full_west',
			'arrow_east',
			'chevron_east',
			'arrow_north',
			'chevron_north',
			'arrow_south',
			'chevron_south',
			'arrow_west',
			'chevron_west',
			'attachment',
			'banking_card',
			'bill',
			'birthday',
			'book',
			'branch',
			'breakfast',
			'broken_heart',
			'bus',
			'calendar',
			'planning',
			'calendar_checked',
			'camera',
			'car',
			'certif_ok',
			'certif_ko',
			'certif_waiting',
			'dialog',
			'chrono_on',
			'clean_car',
			'clock',
			'close',
			'cross',
			'coffee',
			'collapse',
			'computer',
			'computer_mouse',
			'copy',
			'credit_debit',
			'dashboard',
			'database',
			'diner',
			'discount',
			'distribute',
			'dollar',
			'download',
			'drag',
			'drink',
			'edit',
			'edit_write',
			'error',
			'evolution',
			'evolution_down',
			'expand',
			'org_tree',
			'file',
			'file_export',
			'file_import',
			'filter',
			'filter_abstract',
			'flag',
			'folder',
			'forbidden',
			'format_bold',
			'format_clear',
			'format_italic',
			'format_link',
			'format_list_nb',
			'format_redo',
			'format_size',
			'format_underlined',
			'format_undo',
			'fullscreen',
			'fullscreen_exit',
			'gallery',
			'gasoline',
			'gift',
			'heart',
			'help',
			'history',
			'home',
			'hotel',
			'image',
			'import_cb',
			'info',
			'iron',
			'journey',
			'key',
			'laptop',
			'light_bulb',
			'list',
			'list_checked',
			'list_todo',
			'location',
			'lock',
			'lucca',
			'luggage',
			'lunch',
			'meal',
			'lunch_alternative',
			'mail',
			'mailbox',
			'stamp',
			'postage',
			'menu',
			'ellipsis',
			'mileage',
			'money',
			'notification',
			'outside',
			'overplanned',
			'parking',
			'paste',
			'piggy_bank',
			'pin',
			'plane',
			'planning_edit',
			'planning_manage',
			'plus',
			'pressing',
			'pricetag',
			'print',
			'refresh',
			'reply',
			'restaurant',
			'user_roles',
			'rotate',
			'rotate_right',
			'school',
			'search',
			'send',
			'settings',
			'sliders',
			'snack',
			'sort',
			'star',
			'subway',
			'success',
			'sync',
			'sync_disabled',
			'table',
			'target',
			'taxi',
			'telephone',
			'test',
			'timer',
			'toll',
			'tools',
			'train',
			'trash',
			'truck',
			'unlock',
			'unstared',
			'unwatch',
			'upload',
			'user',
			'face',
			'user_add',
			'user_file',
			'user_group',
			'user_remove',
			'wallet',
			'warning',
			'watch',
			'weather_cloudy',
			'weather_storm',
			'weather_sun',
			'weight',
		],
	};

	w3.displayObject('icons-section', icons);
}
/* callback after includeHTML */
function afterIncludeHTML() {
	generateIconDemo();
}
