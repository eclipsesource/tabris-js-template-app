/**
 * Created by shaialon on 16/02/2016.
 */
function sanitizeFeedItems(feedItems, customContentSanitizer){
	var results = [];
	feedItems.forEach(function(item){
		if(item.title && item.title.length>0){
			item.cleanContent = customContentSanitizer ? customContentSanitizer (item.content) : sanitizeHTMLfromFeedBloat(item.content);
			delete item.content;
			results.push(item);
		}
	});
	return results;
}

function sanitizeHTMLfromFeedBloat(html){
	var tmp = html.replace(/<a href="http:\/\/feeds.feedburner.com.*?<\/a>/ig,'') // remove feedburner crap
		.replace(/<img src="http:\/\/feeds.feedburner.com.*?>/ig,'') // remove feedburner crap
		.replace(/<img src="http:\/\/rss.buysellads.*?>/ig,'')// remove speckboy tracking pixels.
		.replace(/<table width="650".*?<\/table>/igm,'');   // ads in table (smashing magazine)
	return tmp;

}

function extractFirstImageFromHtml(html) {
	var m,
		rex = /<img[^>]+src="?([^"\s]+)"?[^>]*\>/g;

	m = rex.exec( html );
	if(m && m[1]) { return m[1]; }
	return null;
}

function resolveImageForFeedItem(feedItem, customImageResolver) {
	var enclosure = feedItem.enclosure || {};
	var img = enclosure.link;
	if(customImageResolver){
		// In case a custom resolver was set for a certain feed.
		img = customImageResolver(feedItem);
	}
	else if(!img){
		// Fallback, extract image from the content
		img = extractFirstImageFromHtml(feedItem.cleanContent);
	}
	return img || '';
}

module.exports = {
	sanitizeFeedItems: sanitizeFeedItems,
	sanitizeHTMLfromFeedBloat: sanitizeHTMLfromFeedBloat,
	extractFirstImageFromHtml: extractFirstImageFromHtml,
	resolveImageForFeedItem: resolveImageForFeedItem
};
