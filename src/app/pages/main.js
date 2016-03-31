var config = require('./../../config.js').config;
var itemListComponent = require('./../components/item_list');
var feedShowcase = require('./../components/feed_showcase_new');
var updateUIColors = require('./../styles/theme').updateUIColors;
var getThemeStyle = require('./../styles/theme').getThemeStyle;
var aboutPage = require('./about.js');
var getIconSrc = require('./../helpers/icon').getIconSrc;
var imageSlider = require('./../components/image_slider');
var detailScreen = require('./../pages/item_details');


// Sizing helpers.
var sizing = require('./../helpers/sizing');
var isTablet = sizing.isTablet;
var imageWidth = Math.ceil( isTablet ? tabris.device.get("screenWidth") * config.imgShowcaseScreenWidthRatio.tablet : tabris.device.get("screenWidth") * config.imgShowcaseScreenWidthRatio.phone );
var imageHeightRatio = isTablet ? config.imgShowcaseSizeHeightToWidthRatio.tablet : config.imgShowcaseSizeHeightToWidthRatio.phone;
var imageHeight = Math.floor(imageHeightRatio * imageWidth);


function init() {
    // Ok we need a page to contain all the application UI
    var page = tabris.create("Page", { title: config.appName , topLevel : true}) ;

    //var Navigation = tabris.create('TabFolder', { left: 0, top: 0, right: 0, bottom:0 , elevation: 8 , tabBarLocation: "bottom", paging:  false,  textColor: "#ff8400",}).appendTo(page);
    //page.set("_navigation", Navigation);

    // Now we will create a tab per source and add to the container

    //var HomeTab = tabris.create( 'Tab', { title: "Home", background: 'white', image: getIconSrc('home'), _imgName: 'home' } ).appendTo(Navigation);
    ////tabris.create( 'Tab', { title: "Discover", background: 'white', image: getIconSrc('compass'), } ).appendTo(Navigation);
    //tabris.create( 'Tab', { title: "Search", background: 'white', image: getIconSrc('search'), _imgName: 'search'} ).appendTo(Navigation);
    //tabris.create( 'Tab', { title: "Favourites", background: 'white', image: getIconSrc('like'), _imgName: 'like' } ).appendTo(Navigation);
    //tabris.create( 'Tab', { title: "My account", background: 'white', image: getIconSrc('user'), _imgName: 'user' } ).appendTo(Navigation);
    //tabris.create( 'Tab', { title: "More", background: 'white', image: getIconSrc('info') , _imgName: 'info'} ).appendTo(Navigation);
    //
    //// When the user changes the tab, change the app visuals
    //Navigation.on("change:selection", function(widget, tab) {
    //    //colorUpdates (tab.get('_feed').color );
    //    console.log(tab.get('_imgName'));
    //    tab.set('image', getIconSrc(tab.get('_imgName') + '_full') )
    //    tab.trigger("appear",tab);
    //});
    //
    //var HometabContent = tabris.create('Composite', { left: 0, top: 0, right: 0, bottom:0}).appendTo(HomeTab);
    //var MainContent = HometabContent;

    var MainContent = page;

    if(config.mainPage === "tabs"){
        /**********************
         *   Tabs
         ******************/
        // So we need a Tab Container
        var TabFolder = tabris.create('TabFolder', { left: 0, top: 0, right: 0, bottom:0 , elevation: 8 , tabBarLocation: "top", paging: tabris.device.get("platform") === "iOS" ? false : true} ).appendTo(MainContent);
        page.set("_tabs", TabFolder);

        // Now we will create a tab per source and add to the container
        config.feeds.forEach(function( feed ){
            var tab = tabris.create( 'Tab', { title: feed.name, background: 'white', _feed: feed} ).appendTo(TabFolder);
            itemListComponent( feed , tab ).appendTo(tab);
        });

        // When the user changes the tab, change the app visuals
        TabFolder.on("change:selection", function(widget, tab) {
            colorUpdates (tab.get('_feed').color , TabFolder);
        });

        // Update the UI based on the theme and active tab.
        colorUpdates (config.feeds[0].color , TabFolder);
    }
    else if(config.mainPage === "showcase" || true){
        /**********************
         *   Showcase
         ******************/
        //var container = tabris.create("ScrollView", { left: 0, right: 0, top: 0, bottom: 0 , direction:"vertical"}).appendTo(MainContent);
        //
        //if (config.slider){
        //    imageSlider(config.slider).on("itemSelected",function(item){
        //       detailScreen.open(item.title, item);
        //    }).appendTo(container);
        //}
        //
        //// Now we will showcase per source and add to the container
        //config.feeds.forEach(function( feed ){
        //    feedShowcase( feed , container ).appendTo(container);
        //});
        //
        //container.on("scroll",function(widget, offset){
        //    var activeFeedIndex = Math.min (Math.max (Math.floor (offset.y / (imageHeight + 90)) , 0 ) , config.feeds.length-1);
        //    colorUpdates (config.feeds[activeFeedIndex].color);
        //});
        //
        //// Update the UI based on the theme and active tab.
        //colorUpdates (config.feeds[0].color);

        var PRELOAD_CELLS = 2;
        var items = config.feeds;
        if (config.slider) {
            items = [{_dummy: true, _banners: true}].concat(items);
        }
        for (var i =0 ; i< PRELOAD_CELLS ; i++){
            items= [{_dummy:true}].concat((items.concat({_dummy:true})));
        }

        //if (config.slider){
        //    imageSlider(config.slider).on("itemSelected",function(item){
        //        detailScreen.open(item.title, item);
        //    }).appendTo(MainContent);
        //}


        var container = tabris.create("CollectionView", { left: 0, right: 0, top: (-1)*PRELOAD_CELLS*feedShowcase.elemHeight, bottom: 0 ,
            cellType: function(feedConfig) {
                if(feedConfig._banners){
                    return 'banner';
                }
                else if(feedConfig._dummy){
                    return 'dummy';
                }
                return 'showcase';
            },
            itemHeight: function(feedConfig, type) {
                if(type === 'banner'){
                    return 152;
                }
                return feedShowcase.elemHeight;
            },
            items: items,

            bottom: (-1)*PRELOAD_CELLS*feedShowcase.elemHeight,

            initializeCell: function(cell, type){
                if(type === 'banner'){
                    imageSlider(config.slider).on("itemSelected",function(item){
                        detailScreen.open(item.title, item);
                    }).appendTo(cell);
                }

                cell.on("change:item", function(widget, feedConfig) {
                    if(feedConfig._banners){return;}
                    var elem = cell.get('_elem');
                    if(!elem){
                        if(feedConfig._dummy){return;}
                        elem = feedShowcase.init( feedConfig , cell ).appendTo(cell);
                        cell.set('_elem',elem);
                    } else {
                        feedShowcase.updateCell( elem, feedConfig );
                    }
                });
            }

        }).appendTo(MainContent);

        colorUpdates (config.feeds[0].color);


        //
        //// Now we will showcase per source and add to the container
        //config.feeds.forEach(function( feed ){
        //    feedShowcase( feed , container ).appendTo(container);
        //});
        //
        //container.on("scroll",function(widget, offset){
        //    var activeFeedIndex = Math.min (Math.max (Math.floor (offset.y / (imageHeight + 90)) , 0 ) , config.feeds.length-1);
        //    colorUpdates (config.feeds[activeFeedIndex].color);
        //});
        //
        //// Update the UI based on the theme and active tab.
        //colorUpdates (config.feeds[0].color);
    }


    /*************************
     * Add an action to the nav bar
     **************************/
    //page.on("appear", function(){
    //    addViewAction(page);
    //})
    //.on("disappear", function(){
    //    page.get('_openLinkAction').dispose();
    //});

    return page;
}

function open(){
    var p = init();
    return p.open();
}

module.exports = {
    init: init,
    open: open
};


function colorUpdates(color,  TabFolder){
    var styles = getThemeStyle(color);
    updateUIColors(color);
    if(TabFolder){
        TabFolder.set(styles.tabs);
    }
}

function addViewAction(page){
    var openLinkAction = tabris.create("Action", {
        placementPriority: "high",
        title: " ",
        image: getIconSrc("info")
    }).on("select", function() {
        aboutPage.open();
    });
    page.set('_openLinkAction',openLinkAction);
}
