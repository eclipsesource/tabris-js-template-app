var config = require('./../../config').config;

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
	getThemeRssItemStyle:getThemeRssItemStyle
};
