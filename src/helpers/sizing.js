//var appState = {
//	activePage: null
//};
function isTablet(){
	return (tabris.device.get("screenWidth") >= 800 &&  tabris.device.get("screenHeight") >= 600) || (tabris.device.get("screenHeight") >= 800 &&  tabris.device.get("screenWidth") >= 600);
}

function isLanscape(){
	return tabris.device.get("orientation").indexOf('landscape')===0;
}

function isTabletLandscape(){
	return isLanscape() && isTablet();
}

exports.getListItemHeight = function() {
	return   Math.floor( (tabris.device.get("screenHeight") - 50) / 2.5) ;
}

exports.isTabletLandscape = isTabletLandscape;
exports.isTablet = isTablet;
