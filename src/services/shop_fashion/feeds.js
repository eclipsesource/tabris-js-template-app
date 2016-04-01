/******************************************
*  Here, are some common technology RSS feeds, with their respective:
*
*  name             - The title of the tab
*  color            - The color identified with the feed. Play around with the theme and see how this affects the UI.
*  feed             - The url of the feed. If it is in XML use the rss2json function.
*
*************************************/
//var Layout = {
//	cellWidth: 150,
//	imgSizeHeightToWidthRatio: 1.4,
//	scaleMode: 'fit'
//};
//var PRICE_RANGE = 'p27:49';
//
//var exp = [
//	{
//		name: "Elite models",
//		color: '#523A35',//'#111', // #002366
//		layout: Layout,
//
//		config: {
//			cat:"mens-watches",
//			fl: ['p38:49']
//			//fts: "Rolex",
//		},
//	},
//	{
//		name: "Premium brands at 50% off",
//		color: '#523A35',//'#111', // #002366
//		layout: Layout,
//
//		config: {
//			cat: "mens-watches",
//			fl: [PRICE_RANGE, 'd3']
//			//fts: "Rolex",
//		}
//	}
//
//];
//
//var data = [{"id":"31806","name":"Rolex","urlIdentifier":"rolex","count":2133},{"id":"6778","name":"Invicta","urlIdentifier":"invicta","count":1418},{"id":"130","name":"Citizen","urlIdentifier":"citizen","count":553},{"id":"913","name":"Cartier","urlIdentifier":"cartier","count":551},{"id":"93","name":"Bulova","urlIdentifier":"bulova","count":549},{"id":"4053","name":"Nixon","urlIdentifier":"nixon","count":549},{"id":"516","name":"Seiko","urlIdentifier":"seiko","count":547},{"id":"1132","name":"Emporio Armani","urlIdentifier":"emporio-armani","count":489},{"id":"29616","name":"Breitling","urlIdentifier":"breitling","count":448},{"id":"5680","name":"Omega","urlIdentifier":"omega","count":424},{"id":"172","name":"Diesel","urlIdentifier":"diesel","count":360},{"id":"1242","name":"Gucci","urlIdentifier":"gucci","count":338},{"id":"403","name":"Movado","urlIdentifier":"movado","count":332},{"id":"19498","name":"Breed","urlIdentifier":"breed","count":307},{"id":"222","name":"Fossil","urlIdentifier":"fossil","count":289},{"id":"31961","name":"Shinola","urlIdentifier":"shinola","count":264},{"id":"391","name":"Michael Kors","urlIdentifier":"michael-kors","count":257},{"id":"568","name":"Tag Heuer","urlIdentifier":"tag-heuer","count":214},{"id":"19694","name":"G-Shock","urlIdentifier":"g-shock","count":203},{"id":"8026","name":"Tissot","urlIdentifier":"tissot","count":200},{"id":"532","name":"Skagen","urlIdentifier":"skagen","count":180},{"id":"22139","name":"IWC","urlIdentifier":"iwc","count":167},{"id":"1884","name":"Raymond Weil","urlIdentifier":"raymond-weil","count":159},{"id":"17341","name":"Ingersoll","urlIdentifier":"ingersoll","count":128},{"id":"1948","name":"Salvatore Ferragamo","urlIdentifier":"salvatore-ferragamo","count":123},{"id":"2331","name":"Armani Exchange","urlIdentifier":"armani-exchange","count":123},{"id":"17232","name":"Equipe","urlIdentifier":"equipe","count":121},{"id":"870","name":"Burberry","urlIdentifier":"burberry","count":120},{"id":"4330","name":"Patek Philippe","urlIdentifier":"patek-philippe","count":119},{"id":"566","name":"Swiss Army","urlIdentifier":"swiss-army","count":117},{"id":"21805","name":"Reign","urlIdentifier":"reign","count":117},{"id":"31894","name":"Audemars Piguet","urlIdentifier":"audemars-piguet","count":116},{"id":"4020","name":"Filson","urlIdentifier":"filson","count":108},{"id":"103","name":"Calvin Klein","urlIdentifier":"calvin-klein","count":107},{"id":"32416","name":"Oceanaut","urlIdentifier":"oceanaut","count":103},{"id":"2199","name":"Versace","urlIdentifier":"versace","count":100},{"id":"1244","name":"GUESS","urlIdentifier":"guess","count":97},{"id":"15773","name":"TW Steel","urlIdentifier":"tw-steel","count":95},{"id":"267","name":"HUGO BOSS","urlIdentifier":"hugo-boss","count":95},{"id":"31043","name":"Daniel Wellington","urlIdentifier":"daniel-wellington","count":92},{"id":"4326","name":"Panerai","urlIdentifier":"panerai","count":92},{"id":"15729","name":"Longines","urlIdentifier":"longines","count":92},{"id":"31925","name":"Hublot","urlIdentifier":"hublot","count":88},{"id":"15709","name":"Hamilton","urlIdentifier":"hamilton","count":84},{"id":"2825","name":"Croton","urlIdentifier":"croton","count":78},{"id":"4691","name":"Braun","urlIdentifier":"braun","count":72},{"id":"24706","name":"Brera","urlIdentifier":"brera","count":72},{"id":"29618","name":"Swiss Legend","urlIdentifier":"swiss-legend","count":72},{"id":"17647","name":"Redline","urlIdentifier":"redline","count":70},{"id":"6919","name":"Luminox","urlIdentifier":"luminox","count":70},{"id":"2982","name":"Jivago","urlIdentifier":"jivago","count":68},{"id":"29617","name":"Stuhrling Original","urlIdentifier":"stuhrling-original","count":64},{"id":"2096","name":"Technomarine","urlIdentifier":"technomarine","count":63},{"id":"866","name":"Bulgari","urlIdentifier":"bulgari","count":62},{"id":"3168","name":"Philip Stein Teslar","urlIdentifier":"philip-stein-teslar","count":60},{"id":"30986","name":"Baume & Mercier","urlIdentifier":"baume-mercier","count":60},{"id":"15733","name":"Maurice Lacroix","urlIdentifier":"maurice-lacroix","count":60},{"id":"15685","name":"Corum","urlIdentifier":"corum","count":58},{"id":"7556","name":"Casio","urlIdentifier":"casio","count":58},{"id":"585","name":"Tommy Hilfiger","urlIdentifier":"tommy-hilfiger","count":58},{"id":"32284","name":"JBW","urlIdentifier":"jbw","count":58},{"id":"32019","name":"Ulysse Nardin","urlIdentifier":"ulysse-nardin","count":57},{"id":"15745","name":"Oris","urlIdentifier":"oris","count":55},{"id":"31202","name":"Lucien Piccard","urlIdentifier":"lucien-piccard","count":54},{"id":"18430","name":"Tsovet","urlIdentifier":"tsovet","count":54},{"id":"25911","name":"Uniform Wares","urlIdentifier":"uniform-wares","count":53},{"id":"14888","name":"JCPenney","urlIdentifier":"jcpenney","count":53},{"id":"31065","name":"Elini Barokas","urlIdentifier":"elini-barokas","count":52},{"id":"15669","name":"Apple","urlIdentifier":"apple","count":50},{"id":"32588","name":"Wittnauer","urlIdentifier":"wittnauer","count":50},{"id":"21904","name":"Alpina","urlIdentifier":"alpina","count":49},{"id":"15702","name":"Frederique Constant","urlIdentifier":"frederique-constant","count":48},{"id":"8302","name":"Chopard","urlIdentifier":"chopard","count":48},{"id":"17762","name":"Suunto","urlIdentifier":"suunto","count":45},{"id":"32008","name":"Jaeger-LeCoultre","urlIdentifier":"jaeger-lecoultre","count":44},{"id":"18734","name":"Miansai","urlIdentifier":"miansai","count":43},{"id":"32278","name":"Jack Mason Brand","urlIdentifier":"jack-mason-brand","count":43},{"id":"22071","name":"Franck Muller","urlIdentifier":"franck-muller","count":43},{"id":"372","name":"MICHAEL Michael Kors","urlIdentifier":"michael-michael-kors","count":43},{"id":"31979","name":"Zenith","urlIdentifier":"zenith","count":43},{"id":"22550","name":"Triwa","urlIdentifier":"triwa","count":43},{"id":"3197","name":"Pulsar","urlIdentifier":"pulsar","count":42},{"id":"32496","name":"Seapro","urlIdentifier":"seapro","count":42},{"id":"31861","name":"Kenneth Cole New York","urlIdentifier":"kenneth-cole-new-york","count":42},{"id":"615","name":"Victorinox","urlIdentifier":"victorinox","count":42},{"id":"32119","name":"Breguet","urlIdentifier":"breguet","count":41},{"id":"5715","name":"Timex","urlIdentifier":"timex","count":41},{"id":"21249","name":"Mondaine","urlIdentifier":"mondaine","count":40},{"id":"31062","name":"Ebel","urlIdentifier":"ebel","count":40},{"id":"1685","name":"Montblanc","urlIdentifier":"montblanc","count":40},{"id":"22402","name":"Tudor","urlIdentifier":"tudor","count":38},{"id":"30991","name":"Bell & Ross","urlIdentifier":"bell-ross","count":36},{"id":"2098","name":"Ted Baker","urlIdentifier":"ted-baker","count":36},{"id":"15756","name":"Rado","urlIdentifier":"rado","count":35},{"id":"840","name":"BOSS ORANGE","urlIdentifier":"boss-orange","count":34},{"id":"32236","name":"Girard Perregaux","urlIdentifier":"girard-perregaux","count":34},{"id":"13063","name":"BOSS","urlIdentifier":"boss","count":33},{"id":"1795","name":"Paul Smith","urlIdentifier":"paul-smith","count":33},{"id":"17239","name":"Eterna","urlIdentifier":"eterna","count":32},{"id":"332","name":"Lacoste","urlIdentifier":"lacoste","count":32},{"id":"1274","name":"Hermes","urlIdentifier":"hermes","count":32},{"id":"17825","name":"Versus By Versace","urlIdentifier":"versus-by-versace","count":31},{"id":"235","name":"Garmin","urlIdentifier":"garmin","count":31},{"id":"32536","name":"Ted Baker London","urlIdentifier":"ted-baker-london","count":31},{"id":"3436","name":"Ferrari","urlIdentifier":"ferrari","count":30},{"id":"17160","name":"Concord","urlIdentifier":"concord","count":30},{"id":"616","name":"Vince Camuto","urlIdentifier":"vince-camuto","count":29},{"id":"3415","name":"Brooks Brothers","urlIdentifier":"brooks-brothers","count":29},{"id":"31805","name":"Piaget","urlIdentifier":"piaget","count":29},{"id":"5117","name":"Peugeot","urlIdentifier":"peugeot","count":28},{"id":"822","name":"Bloomingdale's","urlIdentifier":"bloomingdales","count":27},{"id":"1225","name":"Giorgio Armani","urlIdentifier":"giorgio-armani","count":27},{"id":"12302","name":"Edwin","urlIdentifier":"edwin","count":27},{"id":"29351","name":"Le Château","urlIdentifier":"le-chateau","count":27},{"id":"32391","name":"Mulco","urlIdentifier":"mulco","count":25},{"id":"32020","name":"Vacheron Constantin","urlIdentifier":"vacheron-constantin","count":25},{"id":"32475","name":"Roberto Bianci","urlIdentifier":"roberto-bianci","count":23},{"id":"8004","name":"Swatch","urlIdentifier":"swatch","count":22},{"id":"3366","name":"W.KLEINBERG","urlIdentifier":"w-kleinberg","count":22},{"id":"29615","name":"Akribos XXIV","urlIdentifier":"akribos-xxiv","count":21},{"id":"32251","name":"Heritor","urlIdentifier":"heritor","count":21},{"id":"7136","name":"Porsche Design","urlIdentifier":"porsche-design","count":20},{"id":"1044","name":"David Yurman","urlIdentifier":"david-yurman","count":20},{"id":"19704","name":"Jorg Gray","urlIdentifier":"jorg-gray","count":20},{"id":"379","name":"Marc by Marc Jacobs","urlIdentifier":"marc-by-marc-jacobs","count":19},{"id":"936","name":"Chanel","urlIdentifier":"chanel","count":19},{"id":"8324","name":"Forzieri","urlIdentifier":"forzieri","count":19},{"id":"321","name":"Kenneth Cole","urlIdentifier":"kenneth-cole","count":18},{"id":"2779","name":"BRM","urlIdentifier":"brm","count":18},{"id":"32028","name":"88 Rue du Rhone","urlIdentifier":"88-rue-du-rhone","count":17},{"id":"22378","name":"Tendence","urlIdentifier":"tendence","count":17},{"id":"21729","name":"Junghans","urlIdentifier":"junghans","count":16},{"id":"4409","name":"Tiffany & Co.","urlIdentifier":"tiffany-co","count":15},{"id":"17778","name":"Ted Lapidus","urlIdentifier":"ted-lapidus","count":15},{"id":"30905","name":"Briston","urlIdentifier":"briston","count":14},{"id":"1416","name":"Just Cavalli","urlIdentifier":"just-cavalli","count":14},{"id":"24770","name":"Cufflinks Inc.","urlIdentifier":"cufflinks-inc","count":14},{"id":"4266","name":"L.L. Bean","urlIdentifier":"l-l-bean","count":13},{"id":"21193","name":"Fortis","urlIdentifier":"fortis","count":13},{"id":"2473","name":"Issey Miyake","urlIdentifier":"issey-miyake","count":13},{"id":"15671","name":"Ball","urlIdentifier":"ball","count":13},{"id":"1430","name":"Karl Lagerfeld","urlIdentifier":"karl-lagerfeld","count":12},{"id":"21214","name":"Jacob & co","urlIdentifier":"jacob-co","count":12},{"id":"2880","name":"Electric Eyewear","urlIdentifier":"electric-eyewear","count":12},{"id":"1227","name":"Givenchy","urlIdentifier":"givenchy","count":12},{"id":"18708","name":"Blue & Cream","urlIdentifier":"blue-cream","count":12},{"id":"3733","name":"Vivienne Westwood","urlIdentifier":"vivienne-westwood","count":11},{"id":"981","name":"Coach","urlIdentifier":"coach","count":11},{"id":"2799","name":"Charriol","urlIdentifier":"charriol","count":11}];
//
////var chosen = ["A. Lange & Söhne", "Anonimo", "Armin Strom", "Audemars Piguet", "Baume & Mercier", "Bell & Ross", "Blancpain", "Bovet", "Breguet", "Bulgari", "Carl F. Bucherer", "Cartier", "Chanel", "Chaumet", "Chopard", "Christophe Claret", "Chronoswiss", "Claude Meylan", "Corum", "Cvstos", "Czapek", "de Grisogono", "DeWitt", "Dior", "Eberhard & Co.", "Emile Chouriet", "Ernest Borel", "Eterna", "Fabergé", "Frédérique Constant", "Girard-Perregaux", "Glashütte Original", "Graff", "Greubel Forsey", "Hamilton", "Harry Winston", "Hermès", "Hublot", "Hysek", "HYT", "IWC", "Jacob & Co.", "Jaeger-LeCoultre", "Jaquet Droz", "Jeanrichard", "julien Coudray 1518", "Kerbedanz", "Laurent Ferrier", "Lebeau-Courally", "Leroy", "Longines", "Louis Moinet", "Louis Vuitton", "MCT", "Montblanc", "Mouawad Genève", "Panerai", "Parmigiani", "Patek Philippe", "Perrelet", "Piaget", "Raymond Weil", "Reuge", "Richard Mille", "Roger Dubuis", "Romain Gauthier", "Seiko", "TAG Heuer", "Tiffany & Co.", "Ulysse Nardin", "Urban Jürgensen", "Vacheron Constantin", "Van Cleef & Arpels", "Zenith"];
////var selected = [];
////brands.brands.forEach(function(brand){
////	var name = brand.name.toLowerCase();
////	for(var i=0 ; i< chosen.length ; i++){
////		if(name.indexOf(chosen[i].toLowerCase()) >= 0 ){
////			selected.push( brand );
////		}
////	}
////});
////console.log(selected);
////console.log(JSON.stringify(selected));
//
//
//data.forEach(function(item){
//	exp.push({
//		name: item.name,
//		color: '#523A35',//'#111', // #002366
//		layout: Layout,
//
//		config: {
//			cat:"mens-watches",
//			fl: ['b'+item.id,PRICE_RANGE]
//			//fts: "Rolex",
//		},
//
//		//config: {
//		//	cat:"watches",
//		//	fl: 'b'+item.id,
//		//	fts: "Women's watch",
//		//},
//	});
//});
//
//
//exp.push({
//	name: "All Luxury Watches",
//	color: '#523A35',//'#111', // #002366
//	layout: Layout,
//
//	config: {
//		cat: "mens-watches",
//		fl: [PRICE_RANGE]
//		//fts: "Rolex",
//	}
//});
//
//
//
//module.exports = exp;

var Layout = {
	cellWidth: 110,
	imgSizeHeightToWidthRatio: 1.7,
	scaleMode: 'fit'
};


module.exports = function (config , categories){
	var exp = [{
		name: "All items",
		color: '#523A35',//'#111', // #002366
		layout: Layout,

		config: {
			cat:config.CATEGORY,
			fl: [config.PRICE_RANGE],
			sort: 'PriceLoHi'
			//fts: "Rolex",
		},
	}];
	categories.forEach(function(item){
		exp.push({
			name: item.name,
			color: '#523A35',//'#111', // #002366
			layout: Layout,

			config: {
				cat:config.CATEGORY,
				fl: ['b'+item.id, config.PRICE_RANGE],
				//sort: 'PriceLoHi'
				//fts: "Rolex",
			},
		});
	});
	return exp;
};
