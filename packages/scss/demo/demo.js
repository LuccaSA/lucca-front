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
		"north_thin_arrow", "east_thin_arrow", "south_thin_arrow", "west_thin_arrow",
		"thin_cross", "thin_plus",
		"completion_pie", "dirty_import", "pristine_import", "family_tree", "group",
		"synchronisation", "watch", "unwatch",
		"list", "mosaic", "palette", "image",
		"heart", "broken_heart", "rejected", "star",
		"flash", "simple_key", "key", "headphones",
		"import_cb",
		"help", "history",
		"birthday", "snack",
	]};

	w3.displayObject("icons-section", icons);
}
/* callback after includeHTML */
function afterIncludeHTML() {
	generateIconDemo();
}
