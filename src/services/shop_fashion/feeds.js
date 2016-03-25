/******************************************
*  Here, are some common technology RSS feeds, with their respective:
*
*  name             - The title of the tab
*  color            - The color identified with the feed. Play around with the theme and see how this affects the UI.
*  feed             - The url of the feed. If it is in XML use the rss2json function.
*
*************************************/

module.exports = [
    {
		name: 'Jeans',
		color: '#111',
	    layout: {
		    cellWidth: 150,
		    imgSizeHeightToWidthRatio: 2.2,
	    },

		config: {
			fts: "Jeans",
		},
	},
	{
		name: 'Dresses',
		color: '#111',
		layout: {
			cellWidth: 150,
			imgSizeHeightToWidthRatio: 2.2,
		},
		config: {
			fts: "Dress",
		},
	},
	{
		name: 'Hats',
		color: '#111',
		layout: {
			cellWidth: 150,
			imgSizeHeightToWidthRatio: 1,
			scaleMode: 'fit'
		},

		config: {
			fts: "summer hat",
		},
	},
	{
		name: 'watches',
		color: '#111',
		layout: {
			cellWidth: 110,
			imgSizeHeightToWidthRatio: 1.4,
			scaleMode: 'fit'
		},
		config: {
			fts: "watch",
		},
	},
	{
		name: 'Bags',
		color: '#111',
		layout: {
			cellWidth: 150,
			imgSizeHeightToWidthRatio: 1,
			scaleMode: 'fit'
		},

		config: {
			fts: "bag",
		},
	},

	// Just watches
	 //{
	 //    name: 'G-shock',
	 //    color: '#333',
	 //    config: {
	 // 		  fts: "G-shock watch",
	 // 		},
	 //},
	 //{
	 //    name: 'Fossil',
	 //    color: '#333',
	 //    config: {
	 // 		  	fts: "Fossil Watch Men",
	 // 		},
	 //},
	//{
	//	name: 'Breitling',
	//	color: '#333',
	//	config: {
	//		fts: "Breitling watch",
	//	},
	//},
	//{
	//	name: 'Rolex',
	//	color: '#333',
	//	config: {
	//		fts: "Rolex Watch Men",
	//	},
	//},
	//{
	//	name: 'Pink',
	//	color: '#333',
	//	config: {
	//		fts: "Pink watch",
	//	},
	//},

	//{
	//	name: 'Earrings',
	//	color: '#333',
	//	config: {
	//		fts: "Earrings",
	//	},
	//},
	//{
	//	name: 'Necklaces',
	//	color: '#333',
	//	config: {
	//		fts: "Necklace",
	//	},
	//},
	//{
	//	name: 'Rings',
	//	color: '#333',
	//	config: {
	//		fts: "ring",
	//	},
	//},
	//{
	//	name: 'watches',
	//	color: '#333',
	//	config: {
	//		fts: "watch",
	//	},
	//},
	//{
	//	name: 'Bags',
	//	color: '#333',
	//	config: {
	//		fts: "bag",
	//	},
	//},

];
