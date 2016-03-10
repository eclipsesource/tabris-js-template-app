var LINK_COLOR = "#48a8f4";

exports.create = function(configuration) {
	configuration = JSON.parse(JSON.stringify(configuration));
	configuration.highlightOnTouch = true;
	var link = tabris.create("Composite",configuration);
	var textViewConfiguration = {
		left: 0, top: 0, right: 0,
		textColor: LINK_COLOR
	};
	maybeSetTextViewProperty(textViewConfiguration, configuration, "font");
	maybeSetTextViewProperty(textViewConfiguration, configuration, "text");
	maybeSetTextViewProperty(textViewConfiguration, configuration, "alignment");
	maybeSetTextViewProperty(textViewConfiguration, configuration, "height");
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
