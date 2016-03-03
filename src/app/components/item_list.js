var getThemeRssItemStyle = require('./../styles/theme').getThemeRssItemStyle;
var detailScreen = require('./../pages/item_details');
var getItems = require('./../../config.js').config.dataService.getItems;
var sizing = require('./../helpers/sizing');
var isTablet = sizing.isTablet;

module.exports = function( feedConfig , tab) {
    var style = cellStyle(feedConfig);
    if(isTablet){
        // Create a left panel for tablets only.
        tabris.create("Composite", { left: 0, right: "75%", top: 0, bottom: 0 ,background: "white", elevation: 10}).appendTo(tab);
    }

    var widget = tabris.create("CollectionView", {
        layoutData: {left: 0,  top: 0,  bottom: 0},
        elevation: 20,
        items: [],
        right: isTablet? '75%' : 0,
        itemHeight: isTablet? Math.floor(sizing.getListItemHeight()*0.5) : sizing.getListItemHeight(), //220,
        refreshEnabled: true,
        _feed: feedConfig, // Save the rssConfig used by this widget so it can be used later.
        _tab: tab,
        initializeCell: function(cell){
            var container = tabris.create('Composite', style.container).appendTo(cell),
                icon      = tabris.create('ImageView', style.image).appendTo(container),
                overlay   = tabris.create('Composite', style.overlay).appendTo(container),
                title     = tabris.create('TextView',  style.title).appendTo(container);

            cell.on("change:item", function(widget, feedItem) {
                feedItem._elements = {
                  title: title,
                  icon: icon,
                  overlay: overlay,
                  container: container
                };
                updateCellItemElements(feedItem);
            });
        }
    }).on("select", function(target, feedItem) {
        feedItem.watched = true;
        updateCellItemElements(feedItem);

        if(sizing.isTablet){
            if(tab.get('_tabletHtmlContainer')){
                tab.get('_tabletHtmlContainer').get('_itemWebView').dispose();
            }
            else {
                var tabletHtmlContainer = tabris.create("Composite", { left: "25%", right: 0, top: 0, bottom: 0 ,background: "white", elevation: 0}).appendTo(tab);
                tab.set('_tabletHtmlContainer', tabletHtmlContainer);
                // For iOS ?
                // tabris.create("Composite", { left: 0, width: 1, top: 0, bottom: 0 ,background: style.overlay.background , opacity: 0.6}).appendTo(tabletHtmlContainer);
            }
            detailScreen.addItemWebView(tab.get('_tabletHtmlContainer'),feedItem);
        }
        else {
            detailScreen.open(feedItem.title, feedItem);
        }
    }).on('refresh', function(widget){
        refreshItems( widget );
    });

    refreshItems(widget);
    return widget;
}


function cellStyle(feedConfig){
    var themeStyle = getThemeRssItemStyle(feedConfig.color);
    return {
        container : { left: 0, right: 0, top: 0, bottom: 0 , background: themeStyle.background},
        image: { left: 0, right: 0, top: 1, bottom: 1, scaleMode: 'fill' , background: "rgb(220, 220, 220)"},
        overlay: { left: 0, right: 0, height: 46, bottom: 1 ,background: themeStyle.overlayBG, opacity: 0.8},
        title: { maxLines: 2, font: '16px', left: 10, right: 10, bottom: 5, textColor: themeStyle.textColor }
    }
}


function refreshItems( widget ) {
    updateWidgetLoading ( widget, true);
    getItems( widget.get('_feed') ).then( function(items){
        widget.set('items', items );
        updateWidgetLoading ( widget, false );
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

  // Image update
  if(!feedItem.image || feedItem.image.length === 0) {
    imageUpdate.opacity = 0;
  }
  else if(  !(elements.icon.get('image') && elements.icon.get('image').src === feedItem.image)){
    imageUpdate.image =  {src: feedItem.image};
  }
  elements.icon.set( imageUpdate );

  // Title + Overlay update
  elements.title.set({text: feedItem.title});
  elements.overlay.set({opacity: feedItem.watched ? 0.5 : 0.8} );
  if(!feedItem.image || feedItem.image.length === 0) {
    elements.overlay.set({ top: 1, height:undefined });
    elements.title.set({ maxLines: 5});
  } else {
    elements.overlay.set({ top: undefined, height:46 });
    elements.title.set({ maxLines: 2});
  }

}
