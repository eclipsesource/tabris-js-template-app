var Link = require('./../helpers/link.js');
var MARGIN_LARGE= 16;

function init(){
	var page = tabris.create("Page", { title: "Built with Tabris.js", topLevel: false});
	createTabrisJsAttribution().appendTo(page);
	createProjectAttribution().appendTo(page);

	createAttributionsList([
		{
			subject: "Icons ",
			author: {name: "Icons8", url: "https://icons8.com/"},
			information: {label: "LICENSE", url: "https://creativecommons.org/licenses/by-nd/3.0/"}
		}
	]).appendTo(page);

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








function createAttributionsList(attributions) {
	var attributionsList = tabris.create("Composite", {
		id: "attributionsList",
		left: 16, bottom: 8, right: 16
	});
	attributions.forEach(function(attribution) {
		createAttributionRow(attribution).appendTo(attributionsList);
		if (attributions.indexOf(attribution) !== attributions.length - 1) {
			createAttributionListSeparator().appendTo(attributionsList);
		}
	});
	return attributionsList;
}

function createAttributionRow(attribution) {
	var row = tabris.create("Composite", {left: 0, top: "prev()", right: 0, height: 24});
	tabris.create("TextView", {
		left: 0, centerY: 0,
		textColor: "rgba(0, 0, 0, 0.54)",
		text: attribution.subject + " by "
	}).appendTo(row);
	Link.create({
		left: "prev()", centerY: 0, text: attribution.author.name, url: attribution.author.url,
	}).appendTo(row);
	Link.create({
		right: 0, centerY: 0,
		text: attribution.information.label,
		page: attribution.information.page,
		url: attribution.information.url,
	}).appendTo(row);
	return row;
}
function createAttributionListSeparator() {
	return tabris.create("Composite", {
		left: 0, top: "prev()", right: 0, height: 1,
		background: "#d9d9d9"
	});
}
