var config = {
    /******************************************
     *  Here, are some common technology RSS feeds, with their respective:
     *
     *  appName  - The title of the tab and more...
     *  theme    - TRY THIS! Theme accepts 'normal', 'light', 'full' ... anything else will just stick to system defaults.
     **********************************/

     theme: 'normal',
    //theme: 'light',
    //theme: 'full',
    //theme: tabris.device.get("platform") === "iOS" ? 'light' : 'normal', // Define a certain theme for iOS and different for Android

    // RSS feeds
    appName: 'Tabris.js RSS Reader Example',
     dataService: require('./services/rss'),
     feeds: require('./services/rss/feeds'),

    // Shop feeds
    //appName: 'Tabris.js Ecommerce example',
    //dataService: require('./services/shop'),
    //feeds: require('./services/shop/feeds'),

    // Wordpress - pets
    //appName: 'Tabris.js Wordpress example',
    // dataService: require('./services/wordpress_pets'),
    // feeds: require('./services/wordpress_pets/feeds'),

    // Wordpress - Eclipsesource
    //appName: 'Tabris.js Wordpress example',
    // dataService: require('./services/wordpress_eclipsesource'),
    // feeds: require('./services/wordpress_eclipsesource/feeds'),


    // TODO: Youtube / Vimeo ?

}



exports.config = config;
