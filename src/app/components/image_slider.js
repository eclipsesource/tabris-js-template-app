module.exports = function( items ) {
	var tabFolder = tabris.create("TabFolder", {
		left: 0, top: "prev()", right: 0, height: 150,
		paging: true,
		background:'#ccc',
		tabBarLocation: "hidden"
	});

	items.forEach(function(item){
		addImageTab(item, tabFolder);
	});

	return tabFolder;
};


function addImageTab(item, tabFolder) {
	var tab = tabris.create("Tab").on("tap",function(){
		tabFolder.trigger("itemClicked",item);
	}).appendTo(tabFolder);
	tabris.create("ImageView", {
		centerX: 0, centerY: 0,
		height: 150,
		background:'#ccc',
		scaleMode:'fit',
		image:{src:item.image}
	}).appendTo(tab);

}
