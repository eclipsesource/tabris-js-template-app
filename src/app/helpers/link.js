var LINK_COLOR = "#48a8f4";
var _ = require("lodash");

exports.create = function(configuration) {
	var link = tabris.create("Composite", _.extend({highlightOnTouch: true}, configuration));
	var textViewConfiguration = {
		left: 0, top: 0, right: 0,
		textColor: LINK_COLOR
	};

	["font", "text", "alignment", "height"].forEach(function(prop){
		maybeSetTextViewProperty(textViewConfiguration, configuration, prop);
	});

	tabris.create("TextView", textViewConfiguration).appendTo(link);
	link.on("tap", function() {
		var appLauncher = tabris.create("AppLauncher");
		appLauncher.openUrl(link.get("url"));
	});
	return link;
};

function maybeSetTextViewProperty(textViewConfiguration, configuration, property) {
	if (configuration[property]) {
		textViewConfiguration[property] = configuration[property];
	}
}
