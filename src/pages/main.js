var config = require('./../config.js').config;
var newsWidgetComponent = require('./../components/item_list');
var updateUIColors = require('./../styles/general').updateUIColors;

function init() {
    // Ok we need a page to contain all the application UI
    var page = tabris.create("Page", { title: config.appName , topLevel : true}) ;

    // So we need a Tab Container
    var TabFolder = tabris.create('TabFolder', { left: 0, top: 0, right: 0, bottom:0 , elevation: 10 , tabBarLocation: "top", paging: true} ).appendTo(page);
    page.set("_tabs", TabFolder);

    // Now we will create a tab per source and add to the container
    config.feeds.forEach(function( feed ){
        var tab = tabris.create( 'Tab', { title: feed.name, background: 'white', _feed: feed} ).appendTo(TabFolder);
        newsWidgetComponent( feed , tab ).appendTo(tab);
    });

    // When the user change the tab we need to change the tab container background
    TabFolder.on("change:selection", function(widget, tab) {
        updateUIColors(page, tab.get('_feed').color);
    });

    // We update the UI based on the theme and active tab.
    updateUIColors(page, config.feeds[0].color);

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
