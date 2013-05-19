var _kendoApplication = new kendo.mobile.Application(document.body, { transition: "slide", layout: "mobile-tabstrip" });

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
	navigator.splashscreen.hide();
	
	databaseManager.initializeDatabase();
	//databaseManager.insertIntoDatabase("Tracking", ["test track", 58.756127, 17.014625, 25, 20, "2013-05-14T22:24:00.000Z"]);
    
	tracker.getLocation();
}

function closeParentPopover(e) {
	var popover = e.sender.element.closest('[data-role=popover]').data('kendoMobilePopOver');
	popover.close();
}