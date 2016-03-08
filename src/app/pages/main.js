var config = require('./../../config.js').config;
var newsWidgetComponent = require('./../components/item_list');
var feedShowcase = require('./../components/feed_showcase');
var updateUIColors = require('./../styles/theme').updateUIColors;

function init() {
    // Ok we need a page to contain all the application UI
    var page = tabris.create("Page", { title: config.appName , topLevel : true}) ;

    // So we need a Tab Container
    //var TabFolder = tabris.create('TabFolder', { left: 0, top: 0, right: 0, bottom:0 , elevation: 10 , tabBarLocation: "top", paging: true} ).appendTo(page);
    //page.set("_tabs", TabFolder);


    //var container = tabris.create("ScrollView", { left: 0, right: 0, top: 0, bottom: 0 , direction:"vertical"}).appendTo(page);
    //
    //// Now we will create a tab per source and add to the container
    //config.feeds.forEach(function( feed ){
    //    //var tab = tabris.create( 'Tab', { title: feed.name, background: 'white', _feed: feed} ).appendTo(TabFolder);
    //    //newsWidgetComponent( feed , page ).appendTo(page);
    //    feedShowcase( feed , container ).appendTo(container);
    //});

    // When the user changes the tab, change the app visuals
    //TabFolder.on("change:selection", function(widget, tab) {
    //    updateUIColors(page, tab.get('_feed').color);
    //});

    // Update the UI based on the theme and active tab.
    //updateUIColors(page, config.feeds[0].color);





    var SECTION_HEIGHT = 30;
    var ITEM_HEIGHT = 200;

    var scrollPosition = 0;
    var items = createItems(config.feeds);

    tabris.ui.set({
        background: config.feeds[0].color,
        textColor: "white"
    });

    tabris.ui.animate({
        opacity: 0.2,
    });

    var floatingSection = createSectionView("section").set("text", config.feeds[0].name);

    tabris.create("CollectionView", {
        layoutData: {left: 0, top: 0, right: 0, bottom: 0},
        background: config.feeds[0].color,
        items: items,
        cellType: function(item) {
            return item.type;
        },
        itemHeight: function(item, type) {
            return type === "section" ? SECTION_HEIGHT : ITEM_HEIGHT;
        },
        initializeCell: function(cell, type) {
            //var container = type === "section" ? createSectionView() : createItemView();
            //container.appendTo(cell);
            var element;
            if(type === "section"){
                element = createSectionView(cell);
            }
            else {
                element = createItemView(cell);
            }
            element.appendTo(cell);
            cell.on("change:item", function(widget, item) {
                if(type === "section"){
                    cell.set({background:item._feed.color});
                    element.set("text", item.name);
                }
                else {
                    cell.set({background:"white"});
                    //element.set("text", item.name);
                    element.children().dispose();
                    feedShowcase( item._feed , element ).appendTo(element);

                }
            });
        }
    }).on("scroll", function(collectionView, event) {
        scrollPosition += event.deltaY;
        var firstVisibleItem = collectionView.get("firstVisibleIndex");
        var currentSection = getCurrentSection(firstVisibleItem);
        floatingSection.set({
            text: currentSection.name,
            background: currentSection._feed.color,
            transform: {translationY: getSectionTranslationY(firstVisibleItem)}
        });
        tabris.ui.set({
            background: currentSection._feed.color,
            textColor: "white"
        });
    }).appendTo(page);

    floatingSection.appendTo(page);

    page.open();

    function getSectionTranslationY(firstVisibleItem) {
        if (scrollPosition < 0) {
            return -scrollPosition;
        }
        var nextSectionOffset = scrollPosition + SECTION_HEIGHT - getNextSection(firstVisibleItem).top;
        if (nextSectionOffset > 0) {
            return -nextSectionOffset;
        }
        return 0;
    }

    function getNextSection(firstVisibleItem) {
        for (var i = firstVisibleItem + 1; i < items.length; i++) {
            var item = items[i];
            if (item.type === "section") {
                return item;
            }
        }
        return null;
    }

    function getCurrentSection(firstVisibleItem) {
        for (var i = firstVisibleItem; i >= 0; i--) {
            var item = items[i];
            if (item.type === "section") {
                return item;
            }
        }
        return null;
    }

    function createSectionView() {
        var elem = tabris.create("TextView", {
            layoutData: {top: 0, height: SECTION_HEIGHT, left: 0, right: 0},
            textColor: "white",
            font: "18px",
            alignment: "center"
        });
        return elem;
    }

    function createItemView() {
        var elem= tabris.create("Composite", {
            layoutData: {top: 0, bottom: 0, left: 0, right: 0},
        });
        return elem;
    }

    function createItems(feeds) {
        var items = [];
        var top = 0;
        feeds.forEach(function(feed,index){
            items.push({name: feed.name, type: "section", top: top, _feed: feed});
            top += SECTION_HEIGHT;

            items.push({name: "Item " + feed.name, type: "item", top: top , _feed: feed});
            top += ITEM_HEIGHT;
        });



        //items.push({name: "Item " + feed.name, type: "item", top: top , _feed: feed});


        //var count = 1;
        //var items = [];
        //var top = 0;
        //for (var j = 1; j <= 10; j++) {
        //    items.push({name: "Section " + j, type: "section", top: top});
        //    top += SECTION_HEIGHT;
        //    for (var i = 0; i < 5; i++) {
        //        items.push({name: "Item " + count++, type: "item", top: top});
        //        top += ITEM_HEIGHT;
        //    }
        //}
        return items;
    }



























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
