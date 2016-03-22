var _ = require("lodash");
var apps = {
    rss: {
        appName: 'Tabris.js Open Source RSS Reader',
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
        appName: 'Tabris.js Open Source Ecommerce Shop',
        dataService: require('./services/shop'),
        feeds: require('./services/shop/feeds'),

        // Overrides...
        pullToRefresh:false,
        imgSizeHeightToWidthRatio : 0.8,

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
        appName: 'Tabris.js Open Source Ecommerce Shop',
        dataService: require('./services/shop'),
        feeds: require('./services/shop/feeds'),
        mainPage: "showcase",
        // Overrides...
        pullToRefresh:false,
        imgSizeHeightToWidthRatio: 0.8,
        imgShowcaseSizeHeightToWidthRatio: {
            phone: 1.3,
            tablet: 1.1,
        },
        imgShowcaseScreenWidthRatio: {
            phone: 0.25,
            tablet: 0.16,
        }
    },
    shop_fashion: {
        appName: 'Tabris.js Open Source Ecommerce Shop',
        dataService: require('./services/shop_fashion'),
        feeds: require('./services/shop_fashion/feeds'),
        mainPage: "showcase",
        theme: tabris.device.get("platform") === "iOS" ? 'light' : 'normal',
        // Overrides...
        pullToRefresh:false,
        imgSizeHeightToWidthRatio:  2.4,
        imgShowcaseSizeHeightToWidthRatio: {
            phone: 1.3,
            tablet: 1.1,
        },
        imgShowcaseScreenWidthRatio: {
            phone: 0.25,
            tablet: 0.16,
        },
        slider: [
            {title: 'great bag 1', image:'https://resources.shopstyle.com/pim/9d/c2/9dc260913e015b4f2d0b0d17822938b3_best.jpg',clickUrl: 'http://api.shopstyle.com/action/apiVisitRetailer?id=512695420&pid=uid4961-26577031-68'},
            {title: 'great bag 2', image:'https://resources.shopstyle.com/pim/d1/f1/d1f1fe6f59f2f5a17195f22aa1fceb99_best.jpg',clickUrl: 'http://api.shopstyle.com/action/apiVisitRetailer?id=505229452&pid=uid4961-26577031-68'},
            {title: 'great bag 3', image:'https://resources.shopstyle.com/pim/a3/e0/a3e06a910fc662efa055e372404530bc_best.jpg', clickUrl: 'http://api.shopstyle.com/action/apiVisitRetailer?id=512695420&pid=uid4961-26577031-68'}
        ]
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
     *  This project comes with 7 starter apps That show off different abilities and components:
     *
     *  rss,
     *  rss_showcase,
     *  shop,
     *  shop_showcase,
     *  shop_fashion,
     *  wordpress_pets,
     *  wordpress_eclipsesource,
     *
     **********************************/
    app: apps.rss , // can be apps.rss, apps.rss_showcase, apps.shop, apps.shop_showcase, apps.shop_fashion, apps.wordpress_pets, apps.wordpress_eclipsesource,



	/******************************************
     *  The default configuration is below...
     ***********************/
    //theme: 'normal',
    //theme: 'light',
    //theme: 'full',
    theme: tabris.device.get("platform") === "iOS" ? 'light' : 'full', // Define a certain theme for iOS and different for Android

    mainPage: "tabs", // can be "showcase" or "tabs"

    imgResizeService: 'weserv', // can be 'weserv', 'google', or 'none'.

    pullToRefresh:true,
    imgSizeHeightToWidthRatio :0.6,

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
    var config = _.cloneDeep(baseConfig);
    var app = baseConfig.app;
    for (var prop in app){
        config[prop] = app[prop];
    }
    return config;
}

exports.config = buildConfig();


