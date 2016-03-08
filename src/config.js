var config = {
    /******************************************
     *  Here, are some common technology RSS feeds, with their respective:
     *
     *  appName  - The title of the tab and more...
     *  theme    - TRY THIS! Theme accepts 'normal', 'light', 'full' ... anything else will just stick to system defaults.
     **********************************/

     //theme: 'normal',
    //theme: 'light',
    //theme: 'full',
    theme: tabris.device.get("platform") === "iOS" ? 'light' : 'full', // Define a certain theme for iOS and different for Android

    imgResizeService: 'weserv', // can be 'weserv', 'google', or 'none'.
    imgSizeHeightToWidthRatio: {
        phone: 1,
        tablet: 1,
    },
    imgShowcaseSizeHeightToWidthRatio: {
        phone: 1.3,
        tablet: 1.1,
    },


    // RSS feeds
    //appName: 'Tabris.js RSS Reader Example',
    //dataService: require('./services/rss'),
    //feeds: require('./services/rss/feeds'),
    //pullToRefresh:true,

    // Shop feeds
    appName: 'Tabris.js Ecommerce example',
    dataService: require('./services/shop'),
    feeds: require('./services/shop/feeds'),
    pullToRefresh:false,


    // Wordpress - pets
    //appName: 'Tabris.js Wordpress example',
    // dataService: require('./services/wordpress_pets'),
    // feeds: require('./services/wordpress_pets/feeds'),
    //pullToRefresh:false,

    // Wordpress - Eclipsesource
    //appName: 'Tabris.js Wordpress example',
    // dataService: require('./services/wordpress_eclipsesource'),
    // feeds: require('./services/wordpress_eclipsesource/feeds'),
    //pullToRefresh:true,


    // TODO: Youtube / Vimeo ?

}



exports.config = config;
