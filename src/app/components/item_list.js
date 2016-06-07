var _ = require('lodash');

var getThemeStyle = require('./../styles/theme').getThemeStyle;
var detailScreen = require('./../pages/item_details');
var resizeImageURLByWidth = require('./../../app/helpers/img_resize').resizeImageURLByWidth;
var sizing = require('./../helpers/sizing');


var config = require('./../../config.js').config;
var getItems = config.dataService.getItems;

var DEFAULTS = {
    CELLS_PER_ROW: 1,
};

module.exports = function( feedConfig , tab) {

    var CELLS_PER_ROW = calculateCellsPerRow(feedConfig);
    var CELL_SIZES = calculateCellSizes(feedConfig, CELLS_PER_ROW);

    var widget = tabris.create("CollectionView", {
        layoutData: {left: 0,  top: 0,  bottom: 0},
        elevation: 20,
        items: [],
        right: 0,
        itemHeight: CELL_SIZES.cellHeight,
        refreshEnabled: config.pullToRefresh,
        columnCount: CELLS_PER_ROW,
        _feed: feedConfig,
        _tab: tab,
        initializeCell: function(cell){
            var style = cellStyle(feedConfig);
            var elements = {};
                elements.container = tabris.create('Composite', style.container).appendTo(cell)
                elements.image   = tabris.create('ImageView', style.image).appendTo(elements.container);
                elements.overlay = tabris.create('Composite', style.overlay).appendTo(elements.container);
                elements.title   = tabris.create('TextView',  style.title).appendTo(elements.container);


            elements.image.on("load",function(imageView, event) {
                if (event.error) {
                    console.log("Error loading the image");
                }
                else {
                     //TODO: ANIMATION BUG ON IOS
                    if(elements.container.get("_feedItem").hasAnimated){
                        //No need to animate
                        if(elements.image.get('image') && elements.image.get('image').src){
                            //console.log("Loaded the image - fading in");
                            elements.image.set({opacity:1});
                        }
                        else {
                            //console.log("cleared the image");
                            elements.image.set({opacity:0});
                        }
                    }
                    else {
                        if(elements.image.get('image') && elements.image.get('image').src){
                            //console.log("Loaded the image - fading in");
                            elements.container.get("_feedItem").hasAnimated = true;
                            elements.image.animate({opacity:1}, {duration:400});
                        }
                        else {
                            //console.log("cleared the image");
                            elements.image.set({opacity:0});
                        }
                    }



                }
            });

            cell.on("change:item", function(widget, feedItem) {
                feedItem._elements = elements;
                updateCellItemElements(feedItem, elements, CELL_SIZES);
            });
        }
    })
    .on("scroll", function(widget, scroll) {
        if( widget.get('_loadingNext') || widget.get('_loadedAll') ) { return; }
        if (scroll.deltaY > 0) {
            var remaining = widget.get("items").length - widget.get("lastVisibleIndex");
            if (remaining < 8) {
                loadMoreItems(widget, CELLS_PER_ROW);
            }

        }
    })
    .on("select", function(widget, feedItem) {
        detailScreen.open(feedItem.title, feedItem);
    });
    if (config.pullToRefresh ){
      widget.on('refresh', function(widget){
          refreshItems( widget , true, CELLS_PER_ROW);
      });
    }
    refreshItems(widget, false, CELLS_PER_ROW);
    return widget;
};


/**************************
 * Size calculations to fit many displays
 *************************/

function calculateCellsPerRow(feedConfig){

    // Manually defined!
    if (feedConfig.layout && feedConfig.layout.cellWidth){
        return Math.max(1, Math.floor( tabris.device.get("screenWidth") / feedConfig.layout.cellWidth ));
    }

    // Default
    var cellsPerRow = DEFAULTS.CELLS_PER_ROW;
    var isTablet = sizing.isTablet;
    if(isTablet){
        cellsPerRow *= 3;
    }
    return cellsPerRow;
}


function calculateCellSizes(feedConfig, CELLS_PER_ROW){
    var cellWidth = Math.floor(tabris.device.get("screenWidth")/CELLS_PER_ROW);
    var cellHeightRatio = config.imgSizeHeightToWidthRatio;
    if(feedConfig.layout && feedConfig.layout.imgSizeHeightToWidthRatio){
        cellHeightRatio = feedConfig.layout.imgSizeHeightToWidthRatio;
    }
    var cellHeight = Math.floor(cellHeightRatio * cellWidth);
    return {
        cellWidth : cellWidth,
        cellHeight: cellHeight,
    }
}

/**************************
 * Cell Styling and updating
 *************************/

function cellStyle(feedConfig){
    var themeStyle = getThemeStyle(feedConfig.color);
    var scaleMode = 'fill';
    if(feedConfig.layout && feedConfig.layout.scaleMode){
        scaleMode = feedConfig.layout.scaleMode;
    }
    return {
        container : { left: 0,right:0, top: 0, bottom: 0 , background: themeStyle.background},
        image: { left: 0, right: 0, top: 1, bottom: 1, scaleMode: scaleMode , background: "white"},
        overlay: { left: 0, right: 0, height: 46, bottom: 1 ,background: themeStyle.overlayBG, opacity: 0.8},
        title: { maxLines: 2, font: '16px', left: 10, right: 10, bottom: 5, textColor: themeStyle.textColor }
    };
}

function updateWidgetLoading(widget,loading){
    widget.set({
        refreshIndicator: loading,
        refreshMessage: loading ? "loading feed..." : ""
    });
}


/**************************
 * Data fetching
 *************************/

function refreshItems( widget , forceFetch, CELLS_PER_ROW) {
    updateWidgetLoading ( widget, true);
    getItems( widget.get('_feed') , {forceFetch: forceFetch} ).then( function(results){
        var arr = [].concat(results.items);
        if (results.state && results.state.hasMore) {
            for (var i=0 ; i< CELLS_PER_ROW; i++){
                arr = arr.concat({loadingNext: true});
            }
            widget.set('_loadedAll', false);
        }
        else {
            widget.set('_loadedAll', true);
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


function loadMoreItems( widget , CELLS_PER_ROW) {
    widget.set('_loadingNext', true);
    var newPage = widget.get('_loadedPage')+1;
    console.log("DISPATCHING");
    getItems( widget.get('_feed') , {page: newPage } ).then( function(results){
        console.log("RECIEVED");
        var arr = results.items;
        widget.insert(arr, -( CELLS_PER_ROW ));
        widget.set('_loadedPage', newPage );
        widget.set('_loadingNext', false);

        if (results.state && results.state.hasMore) {
            widget.set('_loadedAll', false);
        }
        else {
            widget.set('_loadedAll', true);
            widget.remove(-CELLS_PER_ROW);
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




/**************************
 * CollectionView Cell updates
 *************************/

function updateCellItemElements(feedItem, elements , CELL_SIZES){
    elements.container.set("_feedItem",feedItem);
    if(!feedItem || !feedItem.title) {
        hideElements(elements);
        return;
    }
    elements.container.set({opacity:1});
    var imageUpdate = {};
    var imageUrl = resizeImageURLByWidth(feedItem.image, CELL_SIZES.cellWidth);

    // Image update
    if(!imageUrl || imageUrl.length === 0) {
        imageUpdate.opacity = 0;
    }
    else if(  !(elements.image.get('image') && elements.image.get('image').src === imageUrl)){
        // Image actually changed
        elements.image.set( {image: undefined , opacity:0 });
        imageUpdate.image =  {src: imageUrl};
    }
    setTimeout(function(){
        elements.image.set( imageUpdate );
    },1);

    // Title + Overlay update
    if(feedItem.price_display){
        elements.overlay.set({ top: undefined, height:23 });
        elements.title.set({ text: feedItem.price_display, maxLines: 1, bottom: 2, alignment:'center'});
    }
    else {
        elements.title.set({text: feedItem.title});
        if(!imageUrl || imageUrl.length === 0) {
            elements.overlay.set({ top: 1, height:undefined });
            elements.title.set({ maxLines: 5});
        } else {
            elements.overlay.set({ top: undefined, height:46 });
            elements.title.set({ maxLines: 2});
        }
    }

}

function hideElements(elements){
    elements.container.set({opacity:0});
}
