var getItemDetails = require('./../../config.js').config.dataService.getItemDetails;
var getIconSrc = require('./../helpers/icon').getIconSrc;

function init(pageTitle, feedItem){
	var page = tabris.create("Page", { title: "Loading...", topLevel: false, _feedItem: feedItem });
	addItemWebView(page,feedItem, pageTitle);

	registerPageActions(page, feedItem);

	return page;
}


/*************************
 * Add the webview with the feed content.
 **************************/

var handlers = {
	html : function(webView, itemDetails, container, titleOnLoad){
		webView.set("html", itemDetails.content );
		if(titleOnLoad){
			container.set({title:titleOnLoad});
		}
	},
	url : function(webView, itemDetails, container, titleOnLoad){
		webView.set("url", itemDetails.content );
		if(titleOnLoad){
			webView.on("load",function(){
				container.set({title:titleOnLoad});
			});
		}
	},
};

function addItemWebView(container, feedItem, titleOnLoad){
	var itemWebView = tabris.create('WebView',{ left: 0, right: 0, top: 0, bottom: 0}).appendTo(container);
	container.set('_itemWebView', itemWebView);

	var itemDetails = getItemDetails(feedItem);
	handlers[itemDetails.type] (itemWebView, itemDetails, container, titleOnLoad);
}

function open(pageTitle, feedItem) {
	var p = init(pageTitle, feedItem);
	return p.open();
}

function registerPageActions(page, feedItem){
	var callback = function(buttonIndex) {
		setTimeout(function() {
			// like other Cordova plugins (prompt, confirm) the buttonIndex is 1-based (first button is index 1)
			console.log("button index clicked: " + buttonIndex);
			window.plugins.toast.showShortCenter("button index clicked: " + buttonIndex);
		});
	};

	var openURLAction = tabris.create("Action", {
		placementPriority: "high",
		title: " ",
		image: getIconSrc("external_link")
	}).on("select", function() {
		var itemDetails = getItemDetails(feedItem);
		var appLauncher = tabris.create("AppLauncher");
		appLauncher.openUrl(itemDetails.link || itemDetails.content);
	});

	var openShareAction = tabris.create("Action", {
		placementPriority:  tabris.device.get("platform") === "iOS" ? "low": "high",
		title: " ",
		image: getIconSrc("share")
	}).on("select", function() {
		var itemDetails = getItemDetails(feedItem);
		window.plugins.socialsharing.share("Check out this awesome thing", feedItem.title,
			feedItem.image,
			itemDetails.link || itemDetails.content);
	});

	var openMoreAction = tabris.create("Action", {
		placementPriority:  tabris.device.get("platform") === "iOS" ? "normal": "high",
		title: " ",
		image: getIconSrc("more")
	}).on("select", function() {
		//var itemDetails = getItemDetails(feedItem);
		var options = {
			androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT,
			title: "What to do with this item",
			buttonLabels: ["Share", "Share via Facebook", "Share via Twitter", "Open in Safari", "Add to watchlist"],
			androidEnableCancelButton: true,
			winphoneEnableCancelButton: true,
			addCancelButtonWithLabel: "Cancel",
			addDestructiveButtonWithLabel: "Remove from watchlist"
		};
		window.plugins.actionsheet.show(options, callback);
	});


	page.on("disappear", function(){
		openMoreAction.dispose();
		openURLAction.dispose();
		openShareAction.dispose();
	});
}

module.exports  = {
	open: open,
	init: init,
	addItemWebView: addItemWebView,
};
