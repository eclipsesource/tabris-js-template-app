var config = require('./../config').config;

/*************************
* refresh the ui styling based on the theme (and color passed).
**************************/

function updateUIColors(page, color){
	var tabs = page.get('_tabs');
	if(config.theme === 'light'){
		tabris.ui.set({background: 'white', textColor: color });
		tabs.set({background: 'white', textColor: color});
	}
	else if (config.theme === 'full') {
		tabris.ui.set({background: color, textColor: 'white' });
		tabs.set({background: color, textColor: 'white'});
	}
	else if (config.theme === 'normal') {
		tabris.ui.set({background: color, textColor: 'white' });
		tabs.set({background: 'white',textColor: color});
	}
	// If the theme is other then just fall back to system defaults.
}



/*************************
 * An internal css configuration for webviews per platform
 **************************/

function WebViewInternalCSS(){
	var styles = platformStylingWebView[tabris.device.get("platform")];

	return '<style> body {background:transparent; '+styles.font + styles.padding+'} html{ background: transparent; } img{ ' + styles.img + ' } .pubDate{color:#5A5A5A}</style>';
}

var platformStylingWebView = {
	iOS : {
		font:"font-size: 290%; font-family:'Helvetica Neue';",
		padding: 'padding: 10px 30px 0px 30px;',
		img: 'width:100%;'

	},
	Android: {
		font: 'font-size: 100%; ',
		padding: 'padding: 10px 10px 0px 10px;',
		img: 'max-width: 100%;'
	}
};



/*************************
 * How the rssItem cells look in each of the different themes.
 **************************/

function getThemeRssItemStyle(color){
	if (config.theme === 'light'){
		return {
			background: 'white',
			overlayBG: 'white',
			textColor: color
		}
	}
	else if (config.theme === 'normal'){
		return {
			background: 'white',
			overlayBG: color,
			textColor: 'white'
		}
	}
	else if (config.theme === 'full'){
		return {
			background: color,
			overlayBG: color,
			textColor: 'white'
		}
	}
}

module.exports = {
	updateUIColors: updateUIColors,
	WebViewInternalCSS:WebViewInternalCSS,
	getThemeRssItemStyle:getThemeRssItemStyle
};
