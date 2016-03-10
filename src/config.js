var apps = {
    rss: {
        appName: 'Tabris.js RSS Reader Example',
        dataService: require('./services/rss'),
        feeds: require('./services/rss/feeds').slice(0,3),
    },
    rss_showcase: {
        appName: 'Tabris.js RSS Reader Example',
        dataService: require('./services/rss'),
        feeds: require('./services/rss/feeds'),
        mainPage: "showcase",
    },
    shop: {
        appName: 'Tabris.js Ecommerce example',
        dataService: require('./services/shop'),
        feeds: require('./services/shop/feeds'),

        // Overrides...
        pullToRefresh:false,
        imgSizeHeightToWidthRatio: {
            phone: 0.8,
            tablet: 1,
        },
        imgShowcaseSizeHeightToWidthRatio: {
            phone: 1.3,
            tablet: 1.1,
        },
        imgShowcaseScreenWidthRatio: {
            phone: 0.25,
            tablet: 0.16,
        },
    },
    shop_showcase: {
        appName: 'Tabris.js Ecommerce example',
        dataService: require('./services/shop'),
        feeds: require('./services/shop/feeds'),
        mainPage: "showcase",
        // Overrides...
        pullToRefresh:false,
        imgSizeHeightToWidthRatio: {
            phone: 0.8,
            tablet: 1,
        },
        imgShowcaseSizeHeightToWidthRatio: {
            phone: 1.3,
            tablet: 1.1,
        },
        imgShowcaseScreenWidthRatio: {
            phone: 0.25,
            tablet: 0.16,
        },
    },
    wordpress_pets: {
        appName: 'Tabris.js Wordpress example',
        dataService: require('./services/wordpress_pets'),
        feeds: require('./services/wordpress_pets/feeds'),
        pullToRefresh:false,
    },
    wordpress_eclipsesource: {
        appName: 'Tabris.js Wordpress example',
        dataService: require('./services/wordpress_eclipsesource'),
        feeds: require('./services/wordpress_eclipsesource/feeds'),
    }
    // TODO: Youtube / Vimeo ?
};


var baseConfig = {
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

    mainPage: "tabs", // can be "showcase" or "tabs"
    //mainPage: "showcase", // can be "showcase" or "tabs"

    imgResizeService: 'weserv', // can be 'weserv', 'google', or 'none'.
    app: 'shop', // can be 'rss', 'shop', 'wordpress_pets', 'wordpress_eclipsesource'

    pullToRefresh:true,

    imgSizeHeightToWidthRatio: {
        phone: 0.7,
        tablet: 1,
    },

    imgShowcaseScreenWidthRatio: {
        phone: 0.6,
        tablet: 0.4,
    },

    imgShowcaseSizeHeightToWidthRatio: {
        phone: 0.4,
        tablet: 0.5,
    },
};

function buildConfig(){
    var config = JSON.parse(JSON.stringify(baseConfig));
    var app = apps[baseConfig.app];
    for (var prop in app){
        config[prop] = app[prop];
    }
    return config;
}

exports.config = buildConfig();
