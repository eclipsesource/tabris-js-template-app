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
    //theme: tabris.device.get("platform") === "iOS" ? 'light' : 'full', // Define a certain theme for iOS and different for Android

    dataService: require('./services/rss'),
    // dataService: require('./services/shop'),
    
    feeds: require('./services/rss/feeds')
}



exports.config = config;
