var config = require('./../config.js').config;
var newsWidgetComponent = require('./../components/news_widget');
var updateUIColors = require('./../styles/general').updateUIColors;

function init() {
    // Ok we need a page to contain all the application UI
    var page = tabris.create("Page", { title: config.appName , topLevel : true}) ;

    // So we need a Tab Container
    var TabFolder = tabris.create('TabFolder', { left: 0, top: 0, right: 0, bottom:0 , elevation: 10 , tabBarLocation: "top", paging: true} ).appendTo(page);
    page.set("_tabs", TabFolder);

    // Now we will create a tab per source and add to the container
    config.rssFeeds.forEach(function( rssFeed ){
        var tab = tabris.create( 'Tab', { title: rssFeed.name, background: 'white', _rssFeed: rssFeed} ).appendTo(TabFolder);
        newsWidgetComponent( rssFeed , tab ).appendTo(tab);
    });

    // When the user change the tab we need to change the tab container background
    TabFolder.on("change:selection", function(widget, tab) {
        updateUIColors(page, tab.get('_rssFeed').color);
    });

    // We update the UI based on the theme and active tab.
    updateUIColors(page, config.rssFeeds[0].color);

    return page;
}

function open(){
    var p = init();
    return p.open();
}

module.exports = {
    init: init,
    open: open
}
