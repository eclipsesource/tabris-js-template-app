/**
 * Created by shaialon on 16/02/2016.
 */

function extractFirstImageFromHtml(html) {
	var m,
		rex = /<img[^>]+src="?([^"\s]+)"?[^>]*\>/g;

	m = rex.exec( html );
	if(m && m[1]) { return m[1]; }
	return null;
}

function resolveImageForFeedItem(feedItem, customImageResolver) {
	var img = extractFirstImageFromHtml(feedItem.content.rendered);
	return img || '';
}

module.exports = {
	extractFirstImageFromHtml: extractFirstImageFromHtml,
	resolveImageForFeedItem: resolveImageForFeedItem
}
