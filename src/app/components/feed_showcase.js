var getThemeListItemStyle = require('./../styles/theme').getThemeListItemStyle;
var detailScreen = require('./../pages/item_details');
var resizeImageURLByWidth = require('./../../app/helpers/img_resize').resizeImageURLByWidth;
var sizing = require('./../helpers/sizing');


var config = require('./../../config.js').config;
var getItems = config.dataService.getItems;

var tabletWidthRatio = 0.3;
var tabletColumnLeft = ''+tabletWidthRatio*100+'%';
var tabletColumnRight = ''+ (100-tabletWidthRatio*100) +'%';


var isTablet = sizing.isTablet;
var imageWidth = isTablet ? tabris.device.get("screenWidth") * tabletWidthRatio : tabris.device.get("screenWidth");
var imageHeightRatio = isTablet ? config.imgSizeHeightToWidthRatio.tablet : config.imgSizeHeightToWidthRatio.phone;
var imageHeight = Math.floor(imageHeightRatio * imageWidth);





module.exports = function( feedConfig , tab) {
	var style = cellStyle(feedConfig);

	var container = tabris.create("Composite", { left: 0, right: 0, top: "prev()", height: 200}).appendTo(tab);
	var header = tabris.create("Composite", style.header ).appendTo(container);

	tabris.create('TextView',  style.headerText).appendTo(header);
	var itemShowcase = tabris.create("ScrollView", style.itemShowcase).appendTo(container);
	tabris.create("Composite", style.itemShowcaseScrollHider).appendTo(container);

	refreshItems(itemShowcase);
	return container;
}


function cellStyle(feedConfig){
	var themeStyle = getThemeListItemStyle(feedConfig.color);
	return {
		itemShowcaseScrollHider: { layoutData: {left: 0,  height:8,  bottom: 0, right: 0},  background: "white"},
		itemShowcase: { layoutData: {left: 0,  top:42,  bottom: 0, right: 0}, direction: "horizontal", _feed: feedConfig},
		header: {left: 0, right: 0, height: 30, top:0, background: themeStyle.showcase.background},
		headerText: { maxLines: 1, font: 'bold 16px', left: 10, right: 0, bottom: 5, top:5, text:feedConfig.name, textColor: themeStyle.showcase.textColor , alignment:'left' }
	}
}


function refreshItems( widget ) {
	updateWidgetLoading ( widget, true);
	var feedConfig = widget.get('_feed');



	getItems( feedConfig ).then( function(results){
		var arr = [].concat(results.items);

		arr.forEach(function(feedItem, index){
			if(index< 15){
				var imageUrl = resizeImageURLByWidth(feedItem.image, 120);
				if(imageUrl){
					var comp = tabris.create('Composite', { left: ["prev()", 10], width: 90, top: 0, bottom: 0}).appendTo(widget);
					tabris.create('ImageView', { image:imageUrl,left: 0, right: 0, top: 0, height: 120, scaleMode: 'fill' , background: "rgb(220, 220, 220)"}).appendTo(comp);
					if(feedItem.price){
						tabris.create('TextView', { text: '$'+Math.round(feedItem.price),left: 0, right: 0, bottom: 3, height: 30, textColor: "#aaa",  alignment:'center'}).appendTo(comp);
					}

					comp.on('tap',function(){
						detailScreen.open(feedItem.title, feedItem);
					});
				}

			}

		});


		if(results.state && results.state.count){
			var comp = tabris.create('Composite', { left: ["prev()", 10], width: 160, top: 0, bottom: 0 }).appendTo(widget);
			var comp2 = tabris.create('Composite', { left: 20, right: 20, top: 20, bottom: 30, background: feedConfig.color}).appendTo(comp);
			tabris.create('TextView', { text: ''+ '' + "See more<br/>'" +feedConfig.name +"'"  , maxLines: 2, font: '16px', left: 0, right: 20, bottom: 0, top: 0, textColor: "white",  alignment:'center', markupEnabled:true}).appendTo(comp2);
			tabris.create('TextView', { text: '>'  , maxLines: 1, font: '20px', width: 14, right: 6, bottom: 0, top: 0, textColor: "white",  alignment:'center'}).appendTo(comp2);
		}

	}).catch(function(err){
		console.log("Failed fetching items for: "+ widget.get('_feed'));
		console.log(err);
		try {
			console.log(JSON.stringify(err));
		} catch (e){

		}
	});
}

function updateWidgetLoading(widget,loading){
	widget.set({
		refreshIndicator: loading,
		refreshMessage: loading ? "loading feed..." : ""
	});
}

function updateCellItemElements(feedItem){
	var elements = feedItem._elements;
	var imageUpdate = {opacity: feedItem.watched ? 0.5 : 1};
	var imageUrl = resizeImageURLByWidth(feedItem.image, imageWidth);

	// Image update
	if(!imageUrl || imageUrl.length === 0) {
		imageUpdate.opacity = 0;
	}
	else if(  !(elements.icon.get('image') && elements.icon.get('image').src === imageUrl)){
		imageUpdate.image =  {src: imageUrl};
	}
	elements.icon.set( imageUpdate );

	// Title + Overlay update
	elements.title.set({text: feedItem.title});
	elements.overlay.set({opacity: feedItem.watched ? 0.5 : 0.8} );
	if(!imageUrl || imageUrl.length === 0) {
		elements.overlay.set({ top: 1, height:undefined });
		elements.title.set({ maxLines: 5});
	} else {
		elements.overlay.set({ top: undefined, height:46 });
		elements.title.set({ maxLines: 2});
	}

	// Loading next.
	if(feedItem.loadingNext){
		elements.title.set({text: "Loading more items..."});
		//TODO: remove the loading animation at the end of feed.
	}

}
