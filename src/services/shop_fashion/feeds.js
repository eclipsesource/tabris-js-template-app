/******************************************
*  Here, are some common technology RSS feeds, with their respective:
*
*  name             - The title of the tab
*  color            - The color identified with the feed. Play around with the theme and see how this affects the UI.
*  feed             - The url of the feed. If it is in XML use the rss2json function.
*
*************************************/
var Layout = {
	cellWidth: 150,
	imgSizeHeightToWidthRatio: 1.4,
	scaleMode: 'fit'
};
var exp = [];
var data =[
	{name: 'Rolex', id:'31806'},
	{name: 'Seiko', id:'516'},
	{name: 'Burberry', id:'870'},
	//{name: 'Patek Philippe', id:'4330'},
	//{name: 'Louis Vuitton', id:'2311'},
	//{name: 'Citizen', id:'130'},
];

//var chosen = ["A. Lange & Söhne", "Anonimo", "Armin Strom", "Audemars Piguet", "Baume & Mercier", "Bell & Ross", "Blancpain", "Bovet", "Breguet", "Bulgari", "Carl F. Bucherer", "Cartier", "Chanel", "Chaumet", "Chopard", "Christophe Claret", "Chronoswiss", "Claude Meylan", "Corum", "Cvstos", "Czapek", "de Grisogono", "DeWitt", "Dior", "Eberhard & Co.", "Emile Chouriet", "Ernest Borel", "Eterna", "Fabergé", "Frédérique Constant", "Girard-Perregaux", "Glashütte Original", "Graff", "Greubel Forsey", "Hamilton", "Harry Winston", "Hermès", "Hublot", "Hysek", "HYT", "IWC", "Jacob & Co.", "Jaeger-LeCoultre", "Jaquet Droz", "Jeanrichard", "julien Coudray 1518", "Kerbedanz", "Laurent Ferrier", "Lebeau-Courally", "Leroy", "Longines", "Louis Moinet", "Louis Vuitton", "MCT", "Montblanc", "Mouawad Genève", "Panerai", "Parmigiani", "Patek Philippe", "Perrelet", "Piaget", "Raymond Weil", "Reuge", "Richard Mille", "Roger Dubuis", "Romain Gauthier", "Seiko", "TAG Heuer", "Tiffany & Co.", "Ulysse Nardin", "Urban Jürgensen", "Vacheron Constantin", "Van Cleef & Arpels", "Zenith"];
//var selected = [];
//brands.brands.forEach(function(brand){
//	var name = brand.name.toLowerCase();
//	for(var i=0 ; i< chosen.length ; i++){
//		if(name.indexOf(chosen[i].toLowerCase()) >= 0 ){
//			selected.push( brand );
//		}
//	}
//});
//console.log(selected);
//console.log(JSON.stringify(selected));

data = [{"id":"866","name":"Bulgari","synonyms":["Bvlgari Fragrance"]},{"id":"913","name":"Cartier","synonyms":["Cartier Fragrance"]},{"id":"936","name":"Chanel","synonyms":["小香","Chanel vintage"]},{"id":"957","name":"Christian Dior","synonyms":["Dior Black Tie","CD","Dior Beauty","Christian Dior Boutique","Dior Fragrance","Dior Homme","Baby Dior","Dior","ディオール","Christian Dior Perfumes","Dior Show","Christian Dior Vintage"]},{"id":"1685","name":"Montblanc","synonyms":[]},{"id":"1884","name":"Raymond Weil","synonyms":[]},{"id":"2311","name":"Louis Vuitton","synonyms":["LV"]},{"id":"4326","name":"Panerai","synonyms":[]},{"id":"4330","name":"Patek Philippe","synonyms":[]},{"id":"4409","name":"Tiffany & Co.","synonyms":["Tiffany","蒂凡尼"]},{"id":"6491","name":"Chaumet","synonyms":[]},{"id":"8302","name":"Chopard","synonyms":[]},{"id":"15685","name":"Corum","synonyms":[]},{"id":"15709","name":"Hamilton","synonyms":["ハミルトン"]},{"id":"15729","name":"Longines","synonyms":[]},{"id":"17239","name":"Eterna","synonyms":[]},{"id":"22139","name":"IWC","synonyms":["沙夫豪森IWC"]},{"id":"30986","name":"Baume & Mercier","synonyms":[]},{"id":"30991","name":"Bell & Ross","synonyms":[]},{"id":"31261","name":"Perrelet","synonyms":[]},{"id":"31805","name":"Piaget","synonyms":[]},{"id":"31894","name":"Audemars Piguet","synonyms":[]},{"id":"31925","name":"Hublot","synonyms":[]},{"id":"31979","name":"Zenith","synonyms":[]},{"id":"32002","name":"A. Lange & Söhne","synonyms":["A. Lange & Sohne"]},{"id":"32008","name":"Jaeger-LeCoultre","synonyms":[]},{"id":"32015","name":"Roger Dubuis","synonyms":[]},{"id":"32019","name":"Ulysse Nardin","synonyms":[]},{"id":"32020","name":"Vacheron Constantin","synonyms":[]},{"id":"32119","name":"Breguet","synonyms":[]},{"id":"32285","name":"JeanRichard","synonyms":[]},{name: 'Burberry', id:'870'},{name: 'Citizen', id:'130'},{"id":"516","name":"Seiko","synonyms":["Seiko Watches","セイコー プロスペックス","Seiko Brightz","Seiko Prospex","セイコー ブライツ"]},{"id":"568","name":"Tag Heuer","synonyms":["Heuer"]}];

data.forEach(function(item){
	exp.push({
		name: item.name,
		color: '#523A35',//'#111', // #002366
		layout: Layout,

		config: {
			cat:"mens-watches",
			fl: 'b'+item.id
			//fts: "Rolex",
		},

		//config: {
		//	cat:"watches",
		//	fl: 'b'+item.id,
		//	fts: "Women's watch",
		//},
	});
});
module.exports = exp;
