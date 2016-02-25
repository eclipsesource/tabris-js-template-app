//var appState = {
//	activePage: null
//};
function isTabletLandscape(){
	return (tabris.device.get("screenWidth") >= 800 &&  tabris.device.get("screenHeight") >= 600) || (tabris.device.get("screenHeight") >= 800 &&  tabris.device.get("screenWidth") >= 600);
}

exports.getListItemHeight = function() {
	return   Math.floor( (tabris.device.get("screenHeight") - 50) / 2.5) ;
}

exports.isTabletLandscape = isTabletLandscape();
