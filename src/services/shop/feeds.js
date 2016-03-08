/******************************************
*  Here, are some common technology RSS feeds, with their respective:
*
*  name             - The title of the tab
*  color            - The color identified with the feed. Play around with the theme and see how this affects the UI.
*  feed             - The url of the feed. If it is in XML use the rss2json function.
*
*************************************/

module.exports = [
    // Watches


	//{
	//	name: 'G-shock',
	//	color: '#333',
	//	config: {
	//		catalog: "672oqm0oqpyrc4ullpfeclz66",
	//		account:"bbhntrjt16yvunll9iyayufn4",
	//		keyword: "JBW",
	//		category: 1,
	//		include_discounts: "true",
	//		results_per_page: 100,
	//	},
	//},

     {
         name: 'G-shock',
         color: '#333',
         config: {
      		  catalog: "672oqm0oqpyrc4ullpfeclz66",
      			account:"bbhntrjt16yvunll9iyayufn4",
        		keyword: "G-shock watch",
      			category: 1,
      			include_discounts: "true",
      			results_per_page: 50,
      		},
     },
     {
         name: 'Fossil',
         color: '#05A9D6',
         config: {
      		  catalog: "672oqm0oqpyrc4ullpfeclz66",
      			account:"bbhntrjt16yvunll9iyayufn4",
        		keyword: "Fossil Watch Men",
        		category: 1,
      			include_discounts: "true",
      			results_per_page: 50,
      		},
     },
     {
         name: 'Premium',
         color: '#8f0d10',
         config: {
      		  catalog: "672oqm0oqpyrc4ullpfeclz66",
      			account:"bbhntrjt16yvunll9iyayufn4",
        		keyword: "Men watch",
      			category: 1,
      			include_discounts: "true",
      			results_per_page: 50,
      			price_min: 1000
      		},
     },



	{
		name: 'Breitling',
		color: '#333',
		config: {
			catalog: "672oqm0oqpyrc4ullpfeclz66",
			account:"bbhntrjt16yvunll9iyayufn4",
			keyword: "Breitling watch",
			category: 1,
			include_discounts: "true",
			results_per_page: 50,
		},
	},
	{
		name: 'Rolex',
		color: '#05A9D6',
		config: {
			catalog: "672oqm0oqpyrc4ullpfeclz66",
			account:"bbhntrjt16yvunll9iyayufn4",
			keyword: "Rolex Watch Men",
			category: 1,
			include_discounts: "true",
			results_per_page: 50,
		},
	},
	{
		name: 'Pink',
		color: '#E05AE6',
		config: {
			catalog: "672oqm0oqpyrc4ullpfeclz66",
			account:"bbhntrjt16yvunll9iyayufn4",
			keyword: "Pink watch",
			category: 1,
			include_discounts: "true",
			results_per_page: 50,
		},
	},





    // Gifts
    //{
    //    name: 'Flowers',
    //    color: '#D088CA',
    //    config: {
    // 		  catalog: "0135pruepnxsbh6gw2ve714rv",
    // 			account:"bbhntrjt16yvunll9iyayufn4",
    //   		keyword: "Flowers",
    // 			category: 1,
    // 			include_discounts: "true",
    // 			results_per_page: 50,
    // 		},
    //},
    //{
    //    name: 'Chocolates',
    //    color: '#7B5252',
    //    config: {
    // 		  catalog: "0135pruepnxsbh6gw2ve714rv",
    // 			account:"bbhntrjt16yvunll9iyayufn4",
    //   		keyword: "Chocolates",
    //   		category: 1,
    // 			include_discounts: "true",
    // 			results_per_page: 50,
    // 		},
    //},
    //{
    //    name: 'Teddys',
    //    color: '#05A9D6',
    //    config: {
    // 		  catalog: "0135pruepnxsbh6gw2ve714rv",
    // 			account:"bbhntrjt16yvunll9iyayufn4",
    //   		keyword: "Teddy bear",
    // 			category: 1,
    // 			include_discounts: "true",
    // 			results_per_page: 50,
    // 		},
    //},
];
