var DOT_RADIUS = 6;
var DOT_RADIUS_HALF = DOT_RADIUS / 2;

module.exports = function( items ) {
	var container = tabris.create("Composite", {
		left: 0, top: "prev()", right: 0, height: 150,
	});
	function itemSelected(item){
		container.trigger("itemSelected",item);
	}

	var tabFolder = tabris.create("TabFolder", {
		left: 0, top: "prev()", right: 0, bottom: 0,
		paging: true,
		background:'#ccc',
		tabBarLocation: "hidden"
	}).appendTo(container);

	var dotContainer = createDotContainer().appendTo(container);

	tabFolder.on("change:selection", function(widget, tab) {
		updateDots(tab.get('_index'),dotContainer);
	});

	items.forEach(function(item, index){
		addImageTab(item, tabFolder, itemSelected, index);
		addDot(dotContainer);
	});

	updateDots(0,dotContainer);

	return container;
};

function addImageTab(item, tabFolder, itemSelected, index) {
	var tab = tabris.create("Tab",{_index:index}).on("tap",function(){
		itemSelected(item);
	}).appendTo(tabFolder);
	tabris.create("ImageView", {
		centerX: 0, centerY: 0,
		height: 150,
		background:'#ccc',
		scaleMode:'fit',
		image:{src:item.image}
	}).appendTo(tab);
}


function createDotContainer() {
	return tabris.create("Composite", {
		height: DOT_RADIUS,
		bottom: DOT_RADIUS,
		//left: DOT_RADIUS_HALF
		centerX:0
	});
}

function addDot(container) {
	tabris.create("Composite", {
		class: "itemDot",
		left: ["prev()",DOT_RADIUS_HALF],
		height: DOT_RADIUS, width: DOT_RADIUS,
		cornerRadius: DOT_RADIUS_HALF,
		background:'black',
	}).appendTo(container);
}

function updateDots(activeIndex, container) {
	container.children(".itemDot").forEach(function(dot,index){
		if(index === activeIndex){
			dot.set('opacity',1);
		}
		else {
			dot.set('opacity',0.3);
		}
	});
}
