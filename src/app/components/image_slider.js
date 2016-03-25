var _ = require('lodash');
var DOT_RADIUS = 6;
var DOT_COLOR = 'black';
var DOT_ROUND = true;
var DEFAULT_OPTIONS = {
	DOT_RADIUS : DOT_RADIUS,
	DOT_COLOR  : 'black',
	DOT_ROUND  : true,
	DOT_CENTER : true,
	IMAGE_HEIGHT: 152
};


module.exports = function( items , options) {

	var config = _.extend(DEFAULT_OPTIONS, options);
	config.DOT_RADIUS_HALF = Math.floor(config.DOT_RADIUS / 2);

	var container = tabris.create("Composite", {
		left: 0, top: "prev()", right: 0, height: config.IMAGE_HEIGHT,
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

	var dotContainer = createDotContainer(config).appendTo(container);

	tabFolder.on("change:selection", function(widget, tab) {
		updateDots(tab.get('_index'),dotContainer);
	});

	items.forEach(function(item, index){
		addImageTab(item, tabFolder, itemSelected, index, config);
		addDot(dotContainer , config);
	});

	updateDots(0,dotContainer);

	return container;
};

function addImageTab(item, tabFolder, itemSelected, index, config) {
	var tab = tabris.create("Tab",{_index:index}).on("tap",function(){
		itemSelected(item);
	}).appendTo(tabFolder);
	tabris.create("ImageView", {
		centerX: 0, centerY: 0,
		height: config.IMAGE_HEIGHT,
		background:'#ccc',
		scaleMode:'fit',
		image:{src:item.image}
	}).appendTo(tab);
}


function createDotContainer(config) {
	var composite = {
		height: config.DOT_RADIUS,
		bottom: config.DOT_RADIUS
	};
	if(config.DOT_CENTER) {
		composite.centerX = 0;
	}
	else {
		composite.left = config.DOT_RADIUS_HALF;
	}
	return tabris.create("Composite", composite);
}

function addDot(container , config) {
	tabris.create("Composite", {
		class: "itemDot",
		left: ["prev()", config.DOT_RADIUS_HALF],
		height: config.DOT_RADIUS, width: config.DOT_RADIUS,
		cornerRadius: config.DOT_RADIUS_HALF,
		background: config.DOT_COLOR,
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
