cordova.define("cordova-plugin-hypertrack-v3.HyperTrack", function(require, exports, module) {
const exec = require("cordova/exec");

const pluginName = "HyperTrackCordovaPlugin"

const HyperTrack = (function () {
  const staticMethods = {
    /**
     * Creates an SDK instance.
     * 
     * @param {string} publishableKey 
     * @param {Object} sdkInitParams { loggingEnabled?: boolean; allowMockLocations?: boolean; requireBackgroundTrackingPermission?: boolean; }
     * @returns HyperTrack instance
     */
    initialize: async function (publishableKey, sdkInitParams = {}) {
      return new Promise(function (resolve, reject) {
        const onSuccess = function () {
          resolve(pluginHandle)
        };
        const onError = function (err) {
          console.log(`HyperTrack init error ${err}`);
          throw Error(err)
        };
        exec(onSuccess, onError, pluginName, "initialize", [
          {
            publishableKey,
            loggingEnabled: sdkInitParams.loggingEnabled ?? false,
            allowMockLocations: sdkInitParams.allowMockLocations ?? false,
            requireBackgroundTrackingPermission: sdkInitParams.requireBackgroundTrackingPermission ?? false,
          }
        ]);
      });
    }
  }

  const pluginHandle = {};

  /**
   * Returns a string that is used to uniquely identify the device
   */
  pluginHandle.getDeviceId = async function () {
    return new Promise(function (resolve, reject) {
      exec(
        function (success) {
          resolve(Serialization.deserializeDeviceId(success))
        },
        function (failure) { reject(failure) },
        pluginName,
        "getDeviceID",
        []
      );
    });
  };

  /**
   * Sets the name for the device
   * @param {string} name
   */
  pluginHandle.setName = function (name) {
    exec(
      function (success) {
      },
      function (failure) { throw Error(failure) },
      pluginName,
      "setName",
      [Serialization.serializeDeviceName(name)]
    );
  };

  /**
   * Sets the metadata for the device
   * @param {Object} data - Metadata JSON
   */
  pluginHandle.setMetadata = function (metadata) {
    exec(
      function (success) {
      },
      function (failure) { throw Error(failure) },
      pluginName,
      "setMetadata",
      [metadata]
    );
  };

  /**
   * Adds a new geotag
   * @param {Object} data - Geotad data JSON
   * @returns current location if success or LocationError if failure
   */
  pluginHandle.addGeotag = async function (geotagData) {
    return new Promise(function (resolve, reject) {
      exec(
        function (success) {
          resolve(Serialization.deserializeLocationResult(success))
        },
        function (failure) { reject(failure) },
        pluginName,
        "addGeotag",
        [Serialization.serializeGeotag(geotagData)]
      );
    });
  };

  /**
   * Reflects the current location of the user or an outage reason
   */
  pluginHandle.getLocation = async function () {
    return new Promise(function (resolve, reject) {
      exec(
        function (success) {
          resolve(Serialization.deserializeLocationResult(success))
        },
        function (failure) { reject(failure) },
        pluginName,
        "getLocation",
        []
      );
    });
  };

  /**
   * Syncs the device state with the HyperTrack servers
   */
  pluginHandle.sync = function () {
    exec(
      function (success) {
      },
      function (failure) { throw Error(failure) },
      pluginName,
      "sync",
      []
    );
  };

  /**
   * Reflects the tracking intent for the device
   * 
   * @return {boolean} Whether the user's movement data is getting tracked or not.
   */
  pluginHandle.isTracking = async function () {
    return new Promise(function (resolve, reject) {
      exec(
        function (success) {
          resolve(Serialization.deserializeIsTracking(success))
        },
        function (failure) { reject(failure) },
        pluginName,
        "isTracking",
        []
      );
    });
  };

  /**
   * Reflects availability of the device for the Nearby search
   *
   * @returns {boolean} true when is available or false when unavailable
   */
  pluginHandle.isAvailable = async function () {
    return new Promise(function (resolve, reject) {
      exec(
        function (success) {
          resolve(Serialization.deserializeIsAvailable(success))
        },
        function (failure) { reject(failure) },
        pluginName,
        "isAvailable",
        []
      );
    });
  };

  /**
   * Sets the availability of the device for the Nearby search
   *
   * @param availability true when is available or false when unavailable
   */
  pluginHandle.setAvailability = function (isAvailable) {
    exec(
      function (success) {
      },
      function (failure) { throw Error(failure) },
      pluginName,
      "setAvailability",
      [Serialization.serializeIsAvailable(isAvailable)]
    );
  };

  /**
   * Expresses an intent to start location tracking for the device
   */
  pluginHandle.startTracking = function () {
    exec(
      function (success) {
      },
      function (failure) { throw Error(failure) },
      pluginName,
      "startTracking",
      []
    );
  };

  /**
   * Stops location tracking immediately
   */
  pluginHandle.stopTracking = function () {
    exec(
      function (success) {
      },
      function (failure) { throw Error(failure) },
      pluginName,
      "stopTracking",
      []
    );
  };

  /**
   * Subscribe to tracking intent changes
   *
   * @param listener (isTracking: boolean) => {}
   */
  pluginHandle.subscribeToTracking = function (callback) {
    exec(
      function (success) {
        callback(Serialization.deserializeIsTracking(success))
      },
      function (failure) { throw Error(failure) },
      pluginName,
      "subscribeToTracking",
      []
    );
  };

  /**
   * Unsubscribe from tracking intent updates
   */
  pluginHandle.unsubscribeFromTracking = function () {
    exec(
      function (success) {
      },
      function (failure) { throw Error(failure) },
      pluginName,
      "unsubscribeFromTracking",
      []
    );
  };

  /**
   * Subscribe to availability changes
   *
   * @param listener (isAvailable: boolean) => {}
   */
  pluginHandle.subscribeToAvailability = function (callback) {
    exec(
      function (success) {
        callback(Serialization.deserializeIsAvailable(success))
      },
      function (failure) { throw Error(failure) },
      pluginName,
      "subscribeToAvailability",
      []
    );
  };

  /**
   * Unsubscribe from availability updates
   */
  pluginHandle.unsubscribeFromAvailability = function () {
    exec(
      function (success) {
      },
      function (failure) { throw Error(failure) },
      pluginName,
      "unsubscribeFromAvailability",
      []
    );
  };

  /**
   * Subscribe to tracking errors
   *
   * @param listener HyperTrackError[] => {}
   */
  pluginHandle.subscribeToErrors = function (callback) {
    exec(
      function (success) {
        callback(Serialization.deserializeHyperTrackErrors(success))
      },
      function (failure) { throw Error(failure) },
      pluginName,
      "subscribeToErrors",
      []
    );
  };

  /**
   * Unsubscribe from errors updates
   */
  pluginHandle.unsubscribeFromErrors = function () {
    exec(
      function (success) {
      },
      function (failure) { throw Error(failure) },
      pluginName,
      "unsubscribeFromErrors",
      []
    );
  };

  return staticMethods;
})();

module.exports = HyperTrack;

});
