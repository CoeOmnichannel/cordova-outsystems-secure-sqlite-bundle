var userAgent = navigator.userAgent.toLowerCase();
var Android = userAgent.indexOf("android") > -1;

if(Android) {
		// Force dependency load
var SQLiteCipher = require('cordova-sqlcipher-adapter.SQLitePlugin');
var SecureStorage = require('cordova-plugin-secure-storage.SecureStorage');

var Logger = !!OutSystemsNative ? OutSystemsNative.Logger : undefined;
if (typeof(Logger) === "undefined") {
    throw new Error("Dependencies were not loaded correctly: OutSystemsNative.Logger is not defined.");
}
// Validate SQLite plugin API is properly set
if (typeof(window.sqlitePlugin) === "undefined") {
    throw new Error("Dependencies were not loaded correctly: window.sqlitePlugin is not defined.");
}

if (typeof(window.sqlitePlugin.openDatabase) !== "function") {
    throw new Error("Dependencies were not loaded correctly: window.sqlitePlugin does not provide an `openDatabase` function.");
}

var OUTSYSTEMS_KEYSTORE = "outsystems-key-store";
var LOCAL_STORAGE_KEY = "outsystems-local-storage-key";

var lskCache = "";


/**
 * Provides the currently stored Local Storage Key or generates a new one.
 *
 * @param {Function} successCallback    Called with a successfully acquired LSK.
 * @param {Function} errorCallback      Called when an error occurs acquiring the LSK.
 */


function removeKeys(successCallback, errorCallback) {
    // If the key is cached, use it
	var initFn = function() {
		var ss = new SecureStorage(
		function () { console.log('Database OK')},
		function (error) { console.log('Error ' + error); },
		OUTSYSTEMS_KEYSTORE);

		ss.clear(
		function () { console.log('Cleared'); },
		function (error) { console.log('Error, ' + error); });
	};
	initFn();
}

removeKeys(function () { console.log('Database OK')}, function (error) { console.log('Error ' + error); });

// Set the `isSQLCipherPlugin` feature flag to help ensure the right plugin was loaded
window.sqlitePlugin.sqliteFeatures["isSQLCipherPlugin"] = false;
// Override existing deleteDatabase to automatically delete the DB
var originalDeleteDatabase = window.sqlitePlugin.deleteDatabase;
window.sqlitePlugin.deleteDatabase = function(options, successCallback, errorCallback) {
    return removeKeys(
        function () {
            // Clone the options
            var newOptions = {};
            for (var prop in options) {
                if (options.hasOwnProperty(prop)) {
                    newOptions[prop] = options[prop];
                }
            }
            
            // Ensure `location` is set (it is mandatory now)
            if (newOptions.location === undefined) {
                newOptions.location = "default";
            }
            
            // Set the `key` to the one provided
            newOptions.key = '';

            // Validate the options and call the original openDatabase
            //validateDbOptions(newOptions);
            return originalDeleteDatabase.call(window.sqlitePlugin,{name: newOptions.name, location: newOptions.location} /* newOptions*/, successCallback, errorCallback);
        },
        errorCallback);
};
	location.reload();

}else{
	// Force dependency load
var SQLiteCipher = require('cordova-sqlcipher-adapter.SQLitePlugin');
var SecureStorage = require('cordova-plugin-secure-storage.SecureStorage');

var Logger = !!OutSystemsNative ? OutSystemsNative.Logger : undefined;
if (typeof(Logger) === "undefined") {
    throw new Error("Dependencies were not loaded correctly: OutSystemsNative.Logger is not defined.");
}
// Validate SQLite plugin API is properly set
if (typeof(window.sqlitePlugin) === "undefined") {
    throw new Error("Dependencies were not loaded correctly: window.sqlitePlugin is not defined.");
}

if (typeof(window.sqlitePlugin.openDatabase) !== "function") {
    throw new Error("Dependencies were not loaded correctly: window.sqlitePlugin does not provide an `openDatabase` function.");
}

var OUTSYSTEMS_KEYSTORE = "outsystems-key-store";
var LOCAL_STORAGE_KEY = "outsystems-local-storage-key";

var lskCache = "";


/**
 * Provides the currently stored Local Storage Key or generates a new one.
 *
 * @param {Function} successCallback    Called with a successfully acquired LSK.
 * @param {Function} errorCallback      Called when an error occurs acquiring the LSK.
 */
function removeKeys(successCallback, errorCallback) {
    // If the key is cached, use it
	var initFn = function() {
		var ss = new SecureStorage(
		function () { console.log('Database OK')},
		function (error) { console.log('Error ' + error); },
		OUTSYSTEMS_KEYSTORE);

		ss.clear(
		function () { console.log('Cleared'); },
		function (error) { console.log('Error, ' + error); });
	};
	initFn();
}

	
// Set the `isSQLCipherPlugin` feature flag to help ensure the right plugin was loaded
window.sqlitePlugin.sqliteFeatures["isSQLCipherPlugin"] = false;
// Override existing deleteDatabase to automatically delete the DB
var originalopenDatabase = window.sqlitePlugin.openDatabase;
window.sqlitePlugin.openDatabase = function(options, successCallback, errorCallback) {
    return removeKeys(
        function () {
            // Clone the options
            var newOptions = {};
            for (var prop in options) {
                if (options.hasOwnProperty(prop)) {
                    newOptions[prop] = options[prop];
                }
            }
            
            // Ensure `location` is set (it is mandatory now)
            if (newOptions.location === undefined) {
                newOptions.location = "default";
            }
            
            // Set the `key` to the one provided
            newOptions.key = '';

            // Validate the options and call the original openDatabase
            //validateDbOptions(newOptions);
            return originalopenDatabase.call(window.sqlitePlugin,{name: newOptions.name, location: newOptions.location} /* newOptions*/, successCallback, errorCallback);
        },
        errorCallback);
};
}
