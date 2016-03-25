// Tabris.js RSS Reader
// This project was originally started by the awesome Tabris.js power user:
// @author: Carlos Ernesto López
// @contact: facebook.com/c.ernest.1990
//
// It was since modified in structure, and added extra functionality (like themes, custom image resolver, content sanitizers and more) by.
// Shai Alon
// https://github.com/shaialon

// Add applauncher
tabris.registerWidget("AppLauncher", {
	_type: "tabris.AppLauncher",
	openUrl: function(url) {
		this._nativeCall("openUrl", {url: url});
	}
});



// Init push notifications
document.addEventListener('deviceready', function () {
	// Enable to debug issues.
	// window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

	var notificationOpenedCallback = function(jsonData) {
		console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
	};

	window.plugins.OneSignal.init("3ce2625d-ebfc-423f-9479-cda9b5449a22",
		{googleProjectNumber: "996375133520"},
		notificationOpenedCallback);

	// Show an alert box if a notification comes in when the user is in your app.
	window.plugins.OneSignal.enableInAppAlertNotification(true);
}, false);


// Run the first page
require('./src/app/pages/main').open();
