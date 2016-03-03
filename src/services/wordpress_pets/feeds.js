/******************************************
*  Here, are some common technology RSS feeds, with their respective:
*
*  name             - The title of the tab
*  color            - The color identified with the feed. Play around with the theme and see how this affects the UI.
*  feed             - The url of the feed.
*
*************************************/


module.exports = [
    {
        name: 'Dogs',
        color: '#60bbe2',
        feed: 'http://www.adoptapet.ie/wp-json/posts?type=dogs',
    },
    {
        name: 'Cats',
        color: '#E53F2C',
        feed: 'http://www.adoptapet.ie/wp-json/posts?type=cats', //TODO: & page=2
    },
    {
        name: 'News',
        color: '#333',
        feed: 'http://www.adoptapet.ie/wp-json/posts',
    },

];
