/***************************
* For the most part, services are independent of the platform the are running on.
* This means they could function similarly in a browser, or a node.js server.
*
****************************/

var feedHelpers = require('./feed_helpers');
var resizeImageURLByWidth = require('./../../helpers/img_resize').resizeImageURLByWidth;

function getItems(feedConfig){
	return new Promise(function(resolve, reject) {
		fetch( feedConfig.feed ).then(function( res ){
			return res.json();
		}).then(function( res ){
			var itemsProcessed = feedHelpers.sanitizeFeedItems (res.items , feedConfig.contentSanitizer);
			itemsProcessed.forEach(function(item){
				item.image = resizeImageURLByWidth ( feedHelpers.resolveImageForFeedItem(item ,feedConfig.imageResolver) );
			});
			resolve(itemsProcessed);
		}).catch(function (err){
			reject(err);
		});
	});
}



function getItemDetails(item) {
	return {
		type: 'html', // can be 'html', 'url', 'component'
		content: rssItemWebViewHTML(item)
	}
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

function rssItemWebViewHTML(feedItem){
	return [
		'<html>',
		'<head>'+ WebViewInternalCSS() +'</head>',
		'<body>',
		'<h2>'+ feedItem.title +'</h2>',
		'<h4 class="pubDate">'+ feedItem.pubDate +'</h4>',
		feedItem.cleanContent,
		'</body>',
		'</html>'
	].join('');
}

module.exports = {
	getItems: getItems,
	getItemDetails: getItemDetails
};
