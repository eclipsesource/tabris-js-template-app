//var appState = {
//	activePage: null
//};
exports.getListItemHeight = function() {
	return   Math.floor( (tabris.device.get("screenHeight") - 50) / 2.5) ;
	//return   Math.floor( tabris.device.get("screenWidth") * 0.5) ;
}

