var getThemeRssItemStyle = require('./../styles/general').getThemeRssItemStyle;
var detailScreen = require('./../pages/details');
var getRssFeedItems = require('./../services/rss_fetch').getRssFeedItems;
var sizing = require('./../helpers/sizing');

module.exports = function( feedConfig , tab) {
    var style = cellStyle(feedConfig);
    tabris.create("Composite", { left: 0, right: "75%", top: 0, bottom: 0 ,background: "white", elevation: 10}).appendTo(tab);
    //tabris.create("Composite", { left: 0, right: "75%", top: 0, bottom: 0 ,background: "white", elevation: 10}).appendTo(tab);

    var widget = tabris.create("CollectionView", {
        layoutData: {left: 0, top: 0, right: 0, bottom: 0},
        elevation: 20,
        items: [],
        itemHeight: sizing.getListItemHeight(), //220,
        refreshEnabled: true,
        _rssFeed: feedConfig, // Save the rssConfig used by this widget so it can be used later.
        _tab: tab,
        initializeCell: function(cell){
            var container = tabris.create('Composite', style.container).appendTo(cell),
                icon      = tabris.create('ImageView', style.image).appendTo(container),
                overlay   = tabris.create('Composite', style.overlay).appendTo(container),
                title     = tabris.create('TextView',  style.title).appendTo(container);

            cell.on("change:item", function(widget, item) {
                title.set({text: item.title});
                icon.set({image: item.image, opacity: selectedItem === item ? 1 : 1} );
                overlay.set({opacity: selectedItem === item? 0.8 : 0.8} );
            });
        }
    }).on("select", function(target, feedItem) {
        if(sizing.isTablet()){
            widget.set( {right:'75%',itemHeight:Math.floor(sizing.getListItemHeight()*0.7)} ).refresh();
            //widget.animate({opacity: 1});
            selectedItem = feedItem;
            if(tab.get('_tabletHtmlContainer')){
                tab.get('_tabletHtmlContainer').get('_rssItemWebView').set('html',detailScreen.rssItemWebViewHTML(feedItem));
            }
            else {
                var qq = tabris.create("Composite", { left: "25%", right: 0, top: 0, bottom: 0 ,background: "white", elevation: 0}).appendTo(tab);
                tab.set('_tabletHtmlContainer', qq);
                detailScreen.addRssItemWebView(qq,feedItem);
                // For iOS
                //tabris.create("Composite", { left: 0, width: 1, top: 0, bottom: 0 ,background: style.overlay.background , opacity: 0.6}).appendTo(qq);
            }
        }
        else {
            detailScreen.open(feedConfig.name, feedItem);
        }
    }).on('refresh', function(widget){
        refreshNewsWidget( widget );
    });

    //widget.on('scroll', function(widget){
    //    var op = widget.get('opacity');
    //    if( op < 1){
    //        op = Math.min(1, op+0.02);
    //        widget.set( {opacity: op} );
    //    }
    //});
    refreshNewsWidget(widget);
    return widget;
}


function cellStyle(feedConfig){
    var themeStyle = getThemeRssItemStyle(feedConfig.color);
    return {
        container : { left: 0, right: 0, top: 0, bottom: 0 , background: themeStyle.background},
        image: { left: 0, right: 0, top: 1, bottom: 1, scaleMode: 'fill' , background: "rgb(220, 220, 220)"},
        // image: { left: 0, top: 1, scaleMode: 'fill' , background: "rgb(220, 220, 220)", width: tabris.device.get("screenWidth") , height: Math.floor( (tabris.device.get("screenWidth")) * 0.4)},
        overlay: { left: 0, right: 0, height: 46, bottom: 1 ,background: themeStyle.overlayBG, opacity: 0.8},
        title: { maxLines: 2, font: '16px', left: 10, right: 10, bottom: 5, textColor: themeStyle.textColor }
    }
}


function refreshNewsWidget( widget ) {
    updateWidgetLoading ( widget, true);
    getRssFeedItems( widget.get('_rssFeed') ).then( function(items){
        widget.set('items', items );
        updateWidgetLoading ( widget, false );
    }).catch(function(err){
        console.log("Failed fetching rss items for: "+ widget.get('_rssFeed'));
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

var selectedItem;
