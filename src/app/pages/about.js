var Link = require('./../helpers/link.js');
var MARGIN_LARGE= 16;

function init(){
	var page = tabris.create("Page", { title: "Built with Tabris.js", topLevel: false});
	createTabrisJsAttribution().appendTo(page);
	createProjectAttribution().appendTo(page);
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

function createProjectAttribution() {
	var projectAttribution = tabris.create("Composite", {
		id: "projectAttribution",
		left: MARGIN_LARGE, top: ["prev()", MARGIN_LARGE*2], height: 50, right: MARGIN_LARGE,
	});
	var firstLine = tabris.create("TextView", {
		left: 0, top: 0, right: 0,
		alignment: "center",
		textColor: "#222",
		text: "This app is open source."
	}).appendTo(projectAttribution);
	var secondLine = tabris.create("Composite", {centerX: 0, top: firstLine}).appendTo(projectAttribution);
	var seeSourceText = tabris.create("TextView", {
		left: 0, top: 0,
		textColor: "#222",
		text: "Fork it on "
	}).appendTo(secondLine);
	Link.create({text: "GitHub", url: "https://github.com/eclipsesource/tabris-js-starter-apps", left: seeSourceText, top: 0}).appendTo(secondLine);
	return projectAttribution;
}
