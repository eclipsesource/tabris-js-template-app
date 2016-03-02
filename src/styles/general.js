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
	// var reset = "article,aside,details,figcaption,figure,footer,header,hgroup,hr,menu,nav,section{display:block}a,hr{padding:0}abbr,address,article,aside,audio,b,blockquote,body,canvas,caption,cite,code,dd,del,details,dfn,div,dl,dt,em,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,p,pre,q,samp,section,small,span,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,ul,var,video{margin:0;padding:0;border:0;outline:0;font-size:100%;vertical-align:baseline;background:0 0}ins,mark{background-color:#ff9;color:#000}body{line-height:1}nav ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}a{margin:0;font-size:100%;vertical-align:baseline;background:0 0}ins{text-decoration:none}mark{font-style:italic;font-weight:700}del{text-decoration:line-through}abbr[title],dfn[title]{border-bottom:1px dotted;cursor:help}table{border-collapse:collapse;border-spacing:0}hr{height:1px;border:0;border-top:1px solid #ccc;margin:1em 0}input,select{vertical-align:middle}";

	return ['<style>',
					// reset,
					'body{background:transparent; '+styles.font + styles.padding+'}',
					'html{ background: transparent; }',
					'img{ ' + styles.img + ' clear:both; } .pubDate{color:#5A5A5A}',
					'h2{font-size: 180%;}',
					'</style>'
					].join('');
}

var platformStylingWebView = {
	iOS : {
		font:"font-size: 290%; font-family:'Helvetica Neue';",
		padding: 'padding: 10px 30px 0px 30px;',
		img: 'width:100%;'

	},
	Android: {
		font: 'font-size: 140%; ',
		padding: 'padding: 30px 30px 30px 30px;',
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
