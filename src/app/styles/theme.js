var config = require('./../../config').config;

/*************************
* refresh the ui styling based on the theme (and color passed).
**************************/

function updateUIColors(color){
	var style = getThemeStyle(color);
	if(style.ui){
		tabris.ui.set(style.ui);
	}
	// If the theme is other then just fall back to system defaults.
}


/*************************
 * How the rssItem cells look in each of the different themes.
 **************************/

function getThemeStyle(color){
	if (config.theme === 'light'){
		return {
			background: 'white',
			overlayBG: 'white',
			textColor: color,
			showcase: {
				background: 'white',
				textColor: color,
			},
			ui: {
				background: 'white',
				textColor: color
			},
			tabs: {
				background: 'white',
				textColor: color
			},
		};
	}
	else if (config.theme === 'normal'){
		return {
			background: 'white',
			overlayBG: color,
			textColor: 'white',
			showcase: {
				background: 'white',
				textColor: color,
			},
			ui: {
				background: color,
				textColor: 'white'
			},
			tabs: {
				background: 'white',
				textColor: color
			},
		};
	}
	else if (config.theme === 'full'){
		return {
			background: color,
			overlayBG: color,
			textColor: 'white',
			showcase: {
				background: color,
				textColor: 'white',
			},
			ui: {
				background: color,
				textColor: 'white'
			},
			tabs: {
				background: color,
				textColor: 'white'
			},
		};
	}
	return {};
}


module.exports = {
	updateUIColors: updateUIColors,
	getThemeStyle:getThemeStyle
};
