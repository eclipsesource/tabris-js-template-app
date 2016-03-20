var _ = require('lodash');

var getThemeStyle = require('./../styles/theme').getThemeStyle;
var detailScreen = require('./../pages/item_details');
var resizeImageURLByWidth = require('./../../app/helpers/img_resize').resizeImageURLByWidth;
var sizing = require('./../helpers/sizing');


var config = require('./../../config.js').config;
var getItems = config.dataService.getItems;

var tabletWidthRatio = 0.3;
var tabletColumnLeft = ''+tabletWidthRatio*100+'%';
var tabletColumnRight = ''+ (100-tabletWidthRatio*100) +'%';


var isTablet = sizing.isTablet;
var imageWidth = tabris.device.get("screenWidth");
var imageHeightRatio = isTablet ? config.imgSizeHeightToWidthRatio.tablet : config.imgSizeHeightToWidthRatio.phone;
var imageHeight = Math.floor(imageHeightRatio * imageWidth);

var PRELOAD_CELLS = 4;
var CELLS_PER_ROW = 2;


module.exports = function( feedConfig , tab) {
    var style = cellStyle(feedConfig);
    var widget = tabris.create("CollectionView", {
        layoutData: {left: 0,  top: 0,  bottom: (-1)*PRELOAD_CELLS*imageHeight },
        elevation: 20,
        items: [],
        right: 0,
        itemHeight: imageHeight,
        refreshEnabled: config.pullToRefresh,
        _feed: feedConfig, // Save the feed config used by this widget so it can be used later.
        _tab: tab,
        initializeCell: function(cell){
            var masterContainer = tabris.create('Composite', style.masterContainer).appendTo(cell);
            var elementsList = [];
            for (var i=0; i<CELLS_PER_ROW; i++){
                elementsList.push({});
                elementsList[i].container = tabris.create('Composite', style.container).appendTo(masterContainer).on("touchend", function(target) {
                    var feedItem = target.get("_feedItem");
                    detailScreen.open(feedItem.title, feedItem);
                });
                elementsList[i].image   = tabris.create('ImageView', style.image).appendTo(elementsList[i].container);
                elementsList[i].overlay = tabris.create('Composite', style.overlay).appendTo(elementsList[i].container);
                elementsList[i].title   = tabris.create('TextView',  style.title).appendTo(elementsList[i].container);
            }

            cell.on("change:item", function(widget, feedItems) {
                feedItems._elementsList = elementsList;
                updateCellMultipleElements(feedItems, elementsList);
            });
        }
    })
    .on("scroll", function(widget, scroll) {
        if( widget.get('_loadingNext') || widget.get('_loadedAll') ) { return; }
        if (scroll.deltaY > 0) {
            var remaining = widget.get("items").length - widget.get("lastVisibleIndex");
            if (remaining < 8) {
                loadMoreItems(widget);
            }

        }
    });
    if (config.pullToRefresh ){
      widget.on('refresh', function(widget){
          refreshItems( widget , true);
      });
    }

    refreshItems(widget);
    return widget;
};


function cellStyle(feedConfig){
    var themeStyle = getThemeStyle(feedConfig.color);
    return {
        container : { left: "prev()", width: Math.floor(imageWidth / CELLS_PER_ROW), top: 0, bottom: 0 , background: themeStyle.background},
        masterContainer : { left: 0, right: 0, top: 0, bottom: 0 , background: themeStyle.background},
        image: { left: 0, right: 0, top: 1, bottom: 1, scaleMode: 'fill' , background: "white"},
        overlay: { left: 0, right: 0, height: 46, bottom: 1 ,background: themeStyle.overlayBG, opacity: 0.8},
        title: { maxLines: 2, font: '16px', left: 10, right: 10, bottom: 5, textColor: themeStyle.textColor }
    };
}


function refreshItems( widget , forceFetch) {
    updateWidgetLoading ( widget, true);
    getItems( widget.get('_feed') , {forceFetch: forceFetch} ).then( function(results){
        var arr = [].concat(results.items);
        if (results.state && results.state.hasMore) {
            arr = arr.concat({loadingNext: true});
            arr = _.chunk(arr,CELLS_PER_ROW);
            widget.set('_loadedAll', false);
        }
        else {
            widget.set('_loadedAll', true);
        }
        for (var i=0 ; i< PRELOAD_CELLS; i++){
            arr = arr.concat({_dummy: true});
        }
        widget.set('items', arr );
        widget.set('_loadedPage', 1);

        updateWidgetLoading ( widget, false );

    }).catch(function(err){
        console.log("Failed fetching items for: "+ widget.get('_feed').name);
        console.log(err);
        try {
            console.log(JSON.stringify(err));
        } catch (e){

        }
    });
}



function loadMoreItems( widget ) {
    widget.set('_loadingNext', true);
    var newPage = widget.get('_loadedPage')+1;
    getItems( widget.get('_feed') , {page: newPage } ).then( function(results){

        var arr = _.chunk(results.items,3);
        widget.insert(arr, -( 1 + PRELOAD_CELLS ));
        widget.set('_loadedPage', newPage );
        widget.set('_loadingNext', false);

        if (results.state && results.state.hasMore) {
            widget.set('_loadedAll', false);
        }
        else {
            widget.set('_loadedAll', true);
            widget.remove(-1); //TODO: remove the loading animation at the end of feed and handle preload cells
        }

    }).catch(function(err){
        console.log("Failed fetching items for: "+ widget.get('_feed').name);
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

function updateCellMultipleElements(feedItems, elementsList){
    // Dummy for preloading
    //if(feedItems._dummy){
    //    //elements.title.set({text:"THIS IS A DUMMY ITEM"});
    //
    //    return;
    //}

    elementsList.forEach(function( elements, index ) {
        elements.container.set("_feedItem",feedItems[index]);
        updateCellItemElements(feedItems[index], elements);
    })
}


function updateCellItemElements(feedItem, elements){
  if(!feedItem) {
      hideElements(elements);
      return;
  }
  elements.container.set({opacity:1});
  var imageUpdate = {opacity: 1};
  var imageUrl = resizeImageURLByWidth(feedItem.image, imageWidth);

  // Image update
  if(!imageUrl || imageUrl.length === 0) {
    imageUpdate.opacity = 0;
  }
  else if(  !(elements.image.get('image') && elements.image.get('image').src === imageUrl)){
      // Image actually changed
      elements.image.set( {image: undefined });
      imageUpdate.image =  {src: imageUrl};
  }
  setTimeout(function(){
    elements.image.set( imageUpdate );
  },1);



  // Title + Overlay update
  elements.title.set({text: feedItem.title});
  if(!imageUrl || imageUrl.length === 0) {
    elements.overlay.set({ top: 1, height:undefined });
    elements.title.set({ maxLines: 5});
  } else {
    elements.overlay.set({ top: undefined, height:46 });
    elements.title.set({ maxLines: 2});
  }

    // Loading next.
    //if(feedItem._loadingNext){
    //    elements.title.set({text: "Loading more items..."});
    //    //TODO: remove the loading animation at the end of feed.
    //}
}

function hideElements(elements){
    elements.container.set({opacity:0});
}
