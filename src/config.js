var config = {
    /******************************************
     *  Here, are some common technology RSS feeds, with their respective:
     *
     *  appName  - The title of the tab and more...
     *  theme    - TRY THIS! Theme accepts 'normal', 'light', 'full' ... anything else will just stick to system defaults.
     **********************************/

    appName: 'Tabris.js RSS Reader Example',
     theme: 'normal',
    //theme: 'light',
    //theme: 'full',
    //theme: tabris.device.get("platform") === "iOS" ? 'light' : 'normal', // Define a certain theme for iOS and different for Android

    // RSS feeds
    // dataService: require('./services/rss'),
    // feeds: require('./services/rss/feeds'),

    // Shop feeds
    // dataService: require('./services/shop'),
    // feeds: require('./services/shop/feeds')

    // Wordpress - pets
    // dataService: require('./services/wordpress_pets'),
    // feeds: require('./services/wordpress_pets/feeds'),

    // Wordpress - Eclipsesource
     dataService: require('./services/wordpress_eclipsesource'),
     feeds: require('./services/wordpress_eclipsesource/feeds'),

}



exports.config = config;
