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
	var itemWebView = appendItemWebViewToContainer(container);
	var itemDetails = getItemDetails(feedItem);

	handlers[itemDetails.type] (itemWebView, itemDetails, container, titleOnLoad);

	return itemWebView;
}

function appendItemWebViewToContainer(container){
	var itemWebView = tabris.create('WebView',{ left: 0, right: 0, top: 0, bottom: 0}).appendTo(container);
	container.set('_itemWebView', itemWebView);
	return itemWebView;
}


function open(pageTitle, feedItem) {
	var p = init(pageTitle, feedItem);
	return p.open();
}

function registerPageActions(page, feedItem){

	var openURLAction = tabris.create("Action", {
		placementPriority: "high",
		title: " ",
		image: getIconSrc("external_link")
	}).on("select", function() {
		openExternal(feedItem)
	});

	var openShareAction = tabris.create("Action", {
		placementPriority:  tabris.device.get("platform") === "iOS" ? "low": "high",
		title: " ",
		image: getIconSrc("share")
	}).on("select", function() {
		share(feedItem);
	});

	var openMoreAction = tabris.create("Action", {
		placementPriority:  tabris.device.get("platform") === "iOS" ? "normal": "high",
		title: " ",
		image: getIconSrc("more")
	}).on("select", function() {
		var itemDetails = getItemDetails(feedItem);
		var actions = ["Share", "Open in Browser"];
		var handlers = [share, openExternal];

		// Add another action when in url mode (RSS reader).
		if(itemDetails.type === "html" && !page.get("_isInURL")){
			actions.push("Read Full Article");
			handlers.push(function(){
				page.get('_itemWebView').dispose();
				appendItemWebViewToContainer(page).set("url", itemDetails.link );
				page.set("_isInURL",true);
			});
		}

		var options = {
			androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT,
			title: "What to do with this item",
			buttonLabels: actions,
			androidEnableCancelButton: true,
			winphoneEnableCancelButton: true,
			addCancelButtonWithLabel: "Cancel",
			//addDestructiveButtonWithLabel: "Remove from watchlist"
		};

		window.plugins.actionsheet.show(options,function(buttonIndex) {

			setTimeout(function() {
				// like other Cordova plugins (prompt, confirm) the buttonIndex is 1-based (first button is index 1)
				buttonIndex = buttonIndex - 1;
				if( handlers[buttonIndex] ){
					handlers[buttonIndex](feedItem);
				}
			});

		});
	});


	page.on("disappear", function(){
		openMoreAction.dispose();
		openURLAction.dispose();
		openShareAction.dispose();
	});
}


function openExternal(feedItem){
	var itemDetails = getItemDetails(feedItem);
	var appLauncher = tabris.create("AppLauncher");
	appLauncher.openUrl(itemDetails.link || itemDetails.content);
}

function share(feedItem){
	var itemDetails = getItemDetails(feedItem);
	window.plugins.socialsharing.share("Check out this awesome thing", feedItem.title,
		feedItem.image,
		itemDetails.link || itemDetails.content);
}


module.exports  = {
	open: open,
	init: init,
	addItemWebView: addItemWebView,
};
