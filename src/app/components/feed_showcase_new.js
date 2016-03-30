var getThemeStyle = require('./../styles/theme').getThemeStyle;
var detailScreen = require('./../pages/item_details');
var itemListPage = require('./../pages/item_list');
var resizeImageURLByWidth = require('./../../app/helpers/img_resize').resizeImageURLByWidth;
var updateUIColors = require('./../styles/theme').updateUIColors;
var sizing = require('./../helpers/sizing');

var config = require('./../../config.js').config;
var getItems = config.dataService.getItems;

var _ = require("lodash");

var isTablet = sizing.isTablet;
var imageWidth = Math.floor( isTablet ? tabris.device.get("screenWidth") * config.imgShowcaseScreenWidthRatio.tablet : tabris.device.get("screenWidth") * config.imgShowcaseScreenWidthRatio.phone );
var imageHeightRatio = isTablet ? config.imgShowcaseSizeHeightToWidthRatio.tablet : config.imgShowcaseSizeHeightToWidthRatio.phone;
var imageHeight = Math.floor(imageHeightRatio * imageWidth);

var ITEMS_MARGIN = 16;
var SHOWCASE_ITEMS = 10;

function init( feedConfig , tab) {
	var style = cellStyle(feedConfig);
	var container = tabris.create("Composite", { left: 0, right: 0, top: "prev()", height: ( 103 + imageHeight )}).appendTo(tab);

	// Showcase header
	var header = tabris.create("Composite", style.header ).appendTo(container);
	var headerText =tabris.create('TextView',  style.headerText).appendTo(header);
	tabris.create('TextView',  style.headerSeeAll).appendTo(header);

	header.on('touchend',function(){
		var feed = container.get("_feed");
		itemListPage.open(feed.name,feed);
	});

	// Showcase scroll
	var itemShowcase = tabris.create("ScrollView", style.itemShowcase).appendTo(container);
	tabris.create("Composite", style.itemShowcaseScrollHider).appendTo(container);
	tabris.create("Composite", style.divider).appendTo(container);

	container.set({
		_headerText:headerText,
		_itemShowcase: itemShowcase,
	});
	buildItemPlaceholders(itemShowcase);
	updateCell(container,feedConfig);

	return container;
};



function updateCell(showcase, feedConfig){
	var newParams = {
		_feed: feedConfig,
		opacity: feedConfig._dummy ? 0 : 1
	};

	showcase.set(newParams);
	if(feedConfig._dummy) {return;}
	showcase.get("_headerText").set({text:feedConfig.name});
	showcase.get("_itemShowcase").set({_feed:feedConfig,_unScrolled:false});
	showcase.get("_itemShowcase").off("scroll").set({scrollX:0}).on("scroll",lazyLoadImages);
	refreshItems( showcase.get("_itemShowcase") );
}

module.exports = {
	init: init,
	updateCell: updateCell,
	elemHeight: ( 103 + imageHeight )
};


function cellStyle(feedConfig){
	var themeStyle = getThemeStyle(feedConfig.color);
	return {
		divider: { opacity: 0.1, background: themeStyle.showcase.textColor, layoutData: {left: ITEMS_MARGIN,  height:1,  bottom: 0, right: 0 }},
		itemShowcaseScrollHider: { layoutData: {left: 0,  height:8,  bottom: 0, right: 0},  background: "white"},
		itemShowcase: { layoutData: {left: 0,  top:46,  bottom: 0, right: 0}, background: "white", direction: "horizontal", _feed: feedConfig, _fetchIndexer:0},
		header: { class:"header", left: 0, right: 0, height: 46, top:0, background: themeStyle.showcase.background},
		headerText: { class:"headerText", maxLines: 1, font: '18px', left: ITEMS_MARGIN, right: 0, bottom: 10,  text:feedConfig.name, textColor: themeStyle.showcase.textColor , alignment:'left' },
		headerSeeAll: { maxLines: 1, font: 'bold 10px', width: 100, right: ITEMS_MARGIN, bottom: 10, opacity: 0.7, text: "See All >", textColor: themeStyle.showcase.textColor , alignment:'right' }
	};
}

function buildItemPlaceholders (widget){
	for(var i=0; i< SHOWCASE_ITEMS; i++){
		buildItemBox(widget);
	}
}

function buildItemBox(widget){
	var imgCell;
	var boxContainer = tabris.create('Composite', { class:"boxContainer", left: ["prev()", ITEMS_MARGIN], width: imageWidth, top: 0, bottom: 0}).appendTo(widget);
	boxContainer.on('tap',function(){
		var feedItem = boxContainer.get("_feedItem");
		if(feedItem){
			detailScreen.open(feedItem.title, feedItem);
		}
	});
	imgCell = { class:"imgCell", left: 0, right: 0, top: 0, height: imageHeight, scaleMode: 'fill' , background: "rgb(220, 220, 220)"};
	var imgView = tabris.create('ImageView', imgCell).appendTo(boxContainer);

	tabris.create('TextView', { class:"itemCaption",left: 0, right: 0, bottom: 13, height: 30, textColor: "#aaa",  alignment:'center', maxLines:1}).appendTo(boxContainer);
	//boxContainer.on('tap',function(){
	//
	//	detailScreen.open(feedItem.title, feedItem);
	//
	//});
}

function updateItemBox(boxContainer , feedItem, delayed){
	if(feedItem){
		boxContainer.set({visible:true, width:imageWidth, _feedItem: feedItem});
		var imageUrl = resizeImageURLByWidth(feedItem.image, imageWidth);
		if(imageUrl){
			var imgCell;
			var imgView = boxContainer.children(".imgCell")[0];
			//imgView.set( {image: undefined });

			if(delayed) {
				imgView.set({_future_image:imageUrl});
			}
			else{
				setTimeout(function(){
					imgView.set({image:imageUrl});
				},1);
			}
			boxContainer.children(".itemCaption")[0].set({text:feedItem.price_display});
		}
	}
	else {
		boxContainer.set({visible:false, width:0  });
	}
}

function lazyLoadImages(widget, offset){
	if(!widget.get("_unScrolled")){return;}
	var img;
	widget.set("_unScrolled",false);
	var itemBoxes =widget.children(".boxContainer");
	for(var i=0; i< SHOWCASE_ITEMS; i++){
		img = itemBoxes[i].children(".imgCell")[0]
		if( img.get("_future_image") ){
			img.set({image: img.get("_future_image") });
		}
	}
}


function cleanCell(boxContainer){
	boxContainer.children(".imgCell")[0].set({image:undefined, _future_image:undefined});
	boxContainer.children(".itemCaption")[0].set({text:''});
}

function refreshItems( widget ) {
	var feedConfig = widget.get('_feed');
	var itemBoxes =widget.children(".boxContainer");
	for(var i=0; i< SHOWCASE_ITEMS; i++){
		cleanCell(itemBoxes[i]);
	}
	var fetchIndexer = widget.get('_fetchIndexer')+1;
	widget.set('_fetchIndexer',fetchIndexer);
	if(feedConfig){
		getItems( feedConfig ).then( function(results){
			if(fetchIndexer !== widget.get('_fetchIndexer')){
				return; // the cell has already changed.
			}

			setTimeout(function(){
				if(fetchIndexer !== widget.get('_fetchIndexer')){
					return; // the cell has already changed.
				}
				widget.set("_unScrolled",true);
			},100);

			for(var i=0; i< SHOWCASE_ITEMS; i++){
				updateItemBox(itemBoxes[i],results.items[i], tabris.device.get("screenWidth") < ((i) * (imageWidth + ITEMS_MARGIN)));
			}

		}).catch(function(err){
			console.log("Failed fetching items for: "+ widget.get('_feed'));
			console.log(err);
			try {
				console.log(JSON.stringify(err));
			} catch (e){

			}
		});
	} else {
		console.log("SHIT");
	}

}

function updateWidgetLoading(widget,loading){
	widget.set({
		refreshIndicator: loading,
		refreshMessage: loading ? "loading feed..." : ""
	});
}

