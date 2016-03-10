var Link = require('./../helpers/link.js');

function init(){
	var page = tabris.create("Page", { title: "Built with Tabris.js", topLevel: false});
	createTabrisJsAttribution().appendTo(page);

	return page;
}

function open(pageTitle, feedItem) {
	var p = init(pageTitle, feedItem);
	return p.open();
}

module.exports  = {
	open: open,
	init: init,
};



function createTabrisJsAttribution() {
	var tabrisJsAttribution = tabris.create("Composite", {left: 0, top: "28%", right: 0});
	var container = tabris.create("Composite", {centerX: 0, top: 0, height: 48}).appendTo(tabrisJsAttribution);
	tabris.create("ImageView", {
		left: 0, top: 0, width: 48, height: 48,
		image: {src: "images/tabrisjs_logo@"+Math.round(tabris.device.get("scaleFactor"))+"x.png"}
	}).appendTo(container);
	tabris.create("TextView", {
		left: "prev()", centerY: 0,
		textColor: "#222",
		text: "Built with "
	}).appendTo(container);
	Link.create({left: "prev()", centerY: 0, url: "http://www.tabrisjs.com", text: "Tabris.js"}).appendTo(container);
	return tabrisJsAttribution;
}
