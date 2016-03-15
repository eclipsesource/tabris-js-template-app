var platform = tabris.device.get("platform").toLowerCase();

function getIcon(name, size) {
	var path = 'images/icons/' + platform + '/';
	size = size || Math.floor( tabris.device.get("scaleFactor") );
	//console.log(path + name + '@' + size + 'x.png');
	return path + name + '@' + size + 'x.png';
};

function getIconSrc(name, size) {
	size = size || Math.min(Math.floor( tabris.device.get("scaleFactor") ) , 2);
	var uri = getIcon(name,size);
	return {src: uri, scale: size * 2}
};


 module.exports = {
	 getIcon : getIcon,
	 getIconSrc: getIconSrc
 }
