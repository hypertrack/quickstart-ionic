cordova.define("cordova-plugin-hypertrack-v3.Serialization", function(require, exports, module) {
module.exports = {
    deserializeLocationResult: function(response) {
        if(response.type == "failure" && response.value.type == "errors") {
            const deserialized = JSON.parse(JSON.stringify(response))
            deserialized.value.value = this.deserializeHyperTrackErrors(deserialized.value.value)
            return deserialized
        } else {
            return response
        }
    },

    deserializeHyperTrackErrors: function(response) {
        const result = []
        for (let i = 0; i < response.length; i++) {
            result.push(response[i].value)
        } 
        return result
    },

    deserializeDeviceId: function(response) {
        return response.value
    },

    deserializeIsAvailable: function(response) {
        return response.value
    },

    deserializeIsTracking: function(response) {
        return response.value
    },

    serializeIsAvailable: function(value) {
        return {
            type: "isAvailable",
            value: value
        }
    },

    serializeDeviceName: function(value) {
        return {
            type: "deviceName",
            value: value
        }
    },

    serializeGeotag: function(data) {
        return {
            data: data,
        }
    },
};
});
