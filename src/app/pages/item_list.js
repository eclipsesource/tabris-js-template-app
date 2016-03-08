var itemListComponent = require('./../components/item_list');

function init(pageTitle, feedConfig){
	var page = tabris.create("Page", { title: pageTitle, topLevel: false, _feed: feedConfig });
	itemListComponent( feedConfig , page ).appendTo(page);
	return page;
}

function open(pageTitle, feedItem) {
	var p = init(pageTitle, feedItem)
	return p.open();
}

module.exports  = {
	open: open,
	init: init,
}
