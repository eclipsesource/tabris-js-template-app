var platform = tabris.device.get("platform").toLowerCase();

function getIcon(name, size) {
	var path = 'images/icons/' + platform + '/';
	size = size || Math.floor( tabris.device.get("scaleFactor") );
	//console.log();
	return path + name + '@' + size + 'x.png';
};

function getIconSrc(name, size) {
	var uri = getIcon(name,size);
	return {src: uri, scale:platform === 'ios'? 3 : 2}
};


 module.exports = {
	 getIcon : getIcon,
	 getIconSrc: getIconSrc
 }
