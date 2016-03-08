var getThemeStyle = require('./../styles/theme').getThemeStyle;
var detailScreen = require('./../pages/item_details');
var itemListPage = require('./../pages/item_list');
var resizeImageURLByWidth = require('./../../app/helpers/img_resize').resizeImageURLByWidth;
var sizing = require('./../helpers/sizing');

var config = require('./../../config.js').config;
var getItems = config.dataService.getItems;


var isTablet = sizing.isTablet;
var imageWidth = Math.floor( isTablet ? tabris.device.get("screenWidth") * config.imgShowcaseScreenWidthRatio.tablet : tabris.device.get("screenWidth") * config.imgShowcaseScreenWidthRatio.phone );
var imageHeightRatio = isTablet ? config.imgShowcaseSizeHeightToWidthRatio.tablet : config.imgShowcaseSizeHeightToWidthRatio.phone;
var imageHeight = Math.floor(imageHeightRatio * imageWidth);



module.exports = function( feedConfig , tab) {
	var style = cellStyle(feedConfig);
	//console.log("imageWidth: "+imageWidth);
	//console.log("imageHeight: "+imageHeight);

	var container = tabris.create("Composite", { left: 0, right: 0, top: "prev()", height: ( 90 + imageHeight )}).appendTo(tab);

	// Showcase header
	var header = tabris.create("Composite", style.header ).appendTo(container);
	tabris.create('TextView',  style.headerText).appendTo(header);
	tabris.create('TextView',  style.headerSeeAll).appendTo(header);
	header.on('tap',function(){
		itemListPage.open(feedConfig.name,feedConfig);
	});

	// Showcase scroll
	var itemShowcase = tabris.create("ScrollView", style.itemShowcase).appendTo(container);
	tabris.create("Composite", style.itemShowcaseScrollHider).appendTo(container);
	refreshItems(itemShowcase);

	return container;
}


function cellStyle(feedConfig){
	var themeStyle = getThemeStyle(feedConfig.color);
	return {
		itemShowcaseScrollHider: { layoutData: {left: 0,  height:8,  bottom: 0, right: 0},  background: "white"},
		itemShowcase: { layoutData: {left: 0,  top:42,  bottom: 0, right: 0}, direction: "horizontal", _feed: feedConfig},
		header: {left: 0, right: 0, height: 30, top:0, background: themeStyle.showcase.background},
		headerText: { maxLines: 1, font: 'bold 16px', left: 10, right: 0, bottom: 5, top:5, text:feedConfig.name, textColor: themeStyle.showcase.textColor , alignment:'left' },
		headerSeeAll: { maxLines: 1, font: '12px', width: 100, right: 10, bottom: 5, top:5, text: "See all >", textColor: themeStyle.showcase.textColor , alignment:'right' }
	}
}


function refreshItems( widget ) {
	updateWidgetLoading ( widget, true);
	var feedConfig = widget.get('_feed');


	getItems( feedConfig ).then( function(results){
		var arr = [].concat(results.items);

		arr.forEach(function(feedItem, index){
			if(index< 15){
				appendItemBox(widget,feedItem);
			}
		});

		//if(results.state && results.state.count){
			appendSeeAllBox(widget);
		//}

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

function appendItemBox(widget , feedItem){
	var imageUrl = resizeImageURLByWidth(feedItem.image, imageWidth);
	if(imageUrl){
		var boxContainer = tabris.create('Composite', { left: ["prev()", 10], width: imageWidth, top: 0, bottom: 0}).appendTo(widget);
		tabris.create('ImageView', { image:imageUrl,left: 0, right: 0, top: 0, height: imageHeight, scaleMode: 'fill' , background: "rgb(220, 220, 220)"}).appendTo(boxContainer);
		if(feedItem.price){
			tabris.create('TextView', { text: '$'+Math.round(feedItem.price),left: 0, right: 0, bottom: 13, height: 30, textColor: "#aaa",  alignment:'center', maxLines:1}).appendTo(boxContainer);
		}
		else {
			tabris.create('TextView', { text: feedItem.title, left: 0, right: 0, bottom: 6, height: 40, textColor: "#aaa",  alignment:'left', maxLines:2}).appendTo(boxContainer);

		}
		boxContainer.on('tap',function(){
			detailScreen.open(feedItem.title, feedItem);
		});
	}
}


function appendSeeAllBox(widget){
	var feedConfig = widget.get('_feed');

	var boxContainer = tabris.create('Composite', { left: ["prev()", 10], width: imageWidth + 40, top: 0, bottom: 0 }).appendTo(widget);
	var seeAllBox = tabris.create('Composite', { left: 20, right: 20, top: 0, height: imageHeight, background: feedConfig.color}).appendTo(boxContainer);
	tabris.create('TextView', { text: ''+ '' + "See all<br/>'" +feedConfig.name +"'"  , maxLines: 2, font: '14px', left: 0, right: 20, bottom: 0, top: 0, textColor: "white",  alignment:'center', markupEnabled:true}).appendTo(seeAllBox);
	tabris.create('TextView', { text: '>'  , maxLines: 1, font: '20px', width: 14, right: 6, bottom: 0, top: 0, textColor: "white",  alignment:'center'}).appendTo(seeAllBox);

	seeAllBox.on('tap',function(){
		itemListPage.open(feedConfig.name,feedConfig);
	});
}
