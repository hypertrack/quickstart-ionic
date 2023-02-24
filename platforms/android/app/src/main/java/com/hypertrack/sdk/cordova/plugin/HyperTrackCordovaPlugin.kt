package com.hypertrack.sdk.cordova.plugin

import android.util.Log
import com.hypertrack.sdk.*
import com.hypertrack.sdk.cordova.plugin.common.*
import com.hypertrack.sdk.cordova.plugin.common.HyperTrackSdkWrapper.initializeSdk
import com.hypertrack.sdk.cordova.plugin.common.Result
import com.hypertrack.sdk.cordova.plugin.common.Serialization.serializeIsAvailable
import com.hypertrack.sdk.cordova.plugin.common.Serialization.serializeIsTracking
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.apache.cordova.PluginResult
import org.json.JSONArray
import org.json.JSONObject
import java.util.*

class HyperTrackCordovaPlugin: CordovaPlugin() {

    private var isTrackingEventStream: CallbackContext? = null
    private var isAvailableEventStream: CallbackContext? = null
    private var errorsEventStream: CallbackContext? = null

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        return invokeSdkMethod(action, args, callbackContext).sendAsCallbackResult(callbackContext)
    }

    private fun invokeSdkMethod(
        methodName: String,
        argsJson: JSONArray,
        callbackContext: CallbackContext
    ): Result<*> {
        return when(val method = SdkMethod.values().firstOrNull { it.name == methodName }) {
            SdkMethod.initialize -> {
                withArgs<Map<String, Any?>, Unit>(argsJson) { args ->
                    HyperTrackSdkWrapper.initializeSdk(args).mapSuccess {
                        initListeners(it)
                    }
                }
            }
            SdkMethod.getDeviceID -> {
                HyperTrackSdkWrapper.getDeviceId()
            }
            SdkMethod.isTracking -> {
                HyperTrackSdkWrapper.isTracking()
            }
            SdkMethod.isAvailable -> {
                HyperTrackSdkWrapper.isAvailable()
            }
            SdkMethod.setAvailability -> {
                withArgs<Map<String, Boolean>, Unit>(argsJson) { args ->
                    HyperTrackSdkWrapper.setAvailability(args)
                }
            }
            SdkMethod.getLocation -> {
                HyperTrackSdkWrapper.getLocation()
            }
            SdkMethod.startTracking -> {
                HyperTrackSdkWrapper.startTracking()
            }
            SdkMethod.stopTracking -> {
                HyperTrackSdkWrapper.stopTracking()
            }
            SdkMethod.addGeotag -> {
                withArgs<Map<String, Any?>, Map<String, Any?>>(argsJson) { args ->
                    HyperTrackSdkWrapper.addGeotag(args)
                }
            }
            SdkMethod.setName -> {
                withArgs<Map<String, Any?>, Unit>(argsJson) { args ->
                    HyperTrackSdkWrapper.setName(args)
                }
            }
            SdkMethod.setMetadata -> {
                withArgs<Map<String, Any?>, Unit>(argsJson) { args ->
                    HyperTrackSdkWrapper.setMetadata(args)
                }
            }
            SdkMethod.sync -> {
                HyperTrackSdkWrapper.sync()
            }
            else -> {
                when(
                    SubscriptionCall.values().firstOrNull {
                        it.name == methodName
                    }
                ) {
                    SubscriptionCall.subscribeToTracking -> {
                        isTrackingEventStream?.let { disposeCallback(it) }
                        isTrackingEventStream = callbackContext
                        HyperTrackSdkWrapper.isTracking().mapSuccess { 
                            sendEvent(callbackContext, it)
                            NoCallback
                        }
                    }
                    SubscriptionCall.subscribeToAvailability -> {
                        isAvailableEventStream?.let { disposeCallback(it) }
                        isAvailableEventStream = callbackContext
                        HyperTrackSdkWrapper.isAvailable().mapSuccess { 
                            sendEvent(callbackContext, it)
                            NoCallback
                        }
                    }
                    SubscriptionCall.subscribeToErrors -> {
                        errorsEventStream?.let { disposeCallback(it) }
                        errorsEventStream = callbackContext
                        sendEvent(callbackContext, HyperTrackSdkWrapper.getInitialErrors())
                        Success(NoCallback)
                    }
                    SubscriptionCall.unsubscribeFromTracking -> {
                        isTrackingEventStream?.let { disposeCallback(it) }
                        Success(Unit)
                    }
                    SubscriptionCall.unsubscribeFromAvailability -> {
                        isAvailableEventStream?.let { disposeCallback(it) }
                        Success(Unit)
                    }
                    SubscriptionCall.unsubscribeFromErrors -> {
                        errorsEventStream?.let { disposeCallback(it) }
                        Success(Unit)
                    }
                    else -> {
                        Failure(Exception("$method method is not implemented"))
                    }
                }
            }
        }
    }
    
    private fun sendEvent(callbackContext: CallbackContext, data: Any) {
        try {
            when (data) {
                is String -> {
                    PluginResult(PluginResult.Status.OK, data)
                }
                is Map<*, *> -> {
                    PluginResult(PluginResult.Status.OK, JSONObject(data))
                }
                is List<*> -> {
                    PluginResult(PluginResult.Status.OK, JSONArray(data))
                }
                else -> {
                    PluginResult(
                        PluginResult.Status.ERROR,
                        IllegalArgumentException("Invalid event data: $data").toString()
                    )
                }
            }
        } catch (e: Exception) {
            PluginResult(PluginResult.Status.ERROR, e.toString())
        }.let {
            it.keepCallback = true
            callbackContext.sendPluginResult(it)
        }
    }

    private fun disposeCallback(callbackContext: CallbackContext) {
        val result = PluginResult(PluginResult.Status.NO_RESULT, "").also {
            it.keepCallback = false
        }
        callbackContext.sendPluginResult(result)
    }

    private inline fun <reified T, N> withArgs(args: JSONArray, crossinline sdkMethodCall: (T) -> Result<N>): Result<N> {
        return when(T::class) {
            Map::class -> {
                try {
                    Success(args.getJSONObject(0))
                } catch (e: Exception) {
                    Failure(IllegalArgumentException(args.toString(), e))
                }.flatMapSuccess {
                    sdkMethodCall.invoke(it.toMap() as T)
                }
            }
            String::class -> {
                try {
                    Success(args.getString(0))
                } catch (e: Exception) {
                    Failure(IllegalArgumentException(args.toString(), e))
                }.flatMapSuccess {
                    sdkMethodCall.invoke(it as T)
                }
            }
            else -> {
                Failure(IllegalArgumentException(args.toString()))
            }
        }
    }

    private fun initListeners(sdk: HyperTrack) {
        sdk.addTrackingListener(object : TrackingStateObserver.OnTrackingStateChangeListener {
            override fun onTrackingStart() {
                isTrackingEventStream?.let {
                    sendEvent(it, serializeIsTracking(true))
                }
            }

            override fun onTrackingStop() {
                isTrackingEventStream?.let {
                    sendEvent(it, serializeIsTracking(false))
                }
            }

            override fun onError(error: TrackingError) {
                errorsEventStream?.let {
                    sendEvent(it, HyperTrackSdkWrapper.getErrors(error))
                }
            }
        })

        sdk.addAvailabilityListener(object : AvailabilityStateObserver.OnAvailabilityStateChangeListener {
            override fun onAvailable() {
                isAvailableEventStream?.let {
                    sendEvent(it, serializeIsAvailable(true))
                }
            }

            override fun onUnavailable() {
                isAvailableEventStream?.let {
                    sendEvent(it, serializeIsAvailable(false))
                }
            }

            override fun onError(error: AvailabilityError) {
                // ignored, errors are handled by errorEventChannel
            }
        })
    }
}

private fun <S> Result<S>.sendAsCallbackResult(callbackContext: CallbackContext): Boolean {
    return when(this) {
        is Success -> {
            when(val success = this.success) {
                is Map<*, *> -> {
                    callbackContext.success(JSONObject(success))
                    true
                }
                is String -> {
                    callbackContext.success(success)
                    true
                }
                is Unit -> {
                    callbackContext.success()
                    true
                }
                is NoCallback -> {
                    true
                }
                else -> {
                    callbackContext.failure(IllegalArgumentException("Invalid response ${this.success}"))
                    false
                }
            }
        }
        is Failure -> {
            callbackContext.failure(this.failure)
            false
        }
    }
}

private fun JSONObject.toMap(): Map<String, Any?> {
    return keys().asSequence().associateWith { key ->
        when(val value = this.get(key)) {
            is Boolean,
            is String,
            is Double,
            is Int -> {
                value
            }
            is JSONArray -> {
                value.toList()
            }
            is JSONObject -> {
                value.toMap()
            }
            else -> {
                null
            }
        }
    }
}

private fun JSONArray.toList(): List<Any> {
    return (0..length()).mapNotNull { index ->
        when (val value = this.get(index)) {
            is Boolean,
            is String,
            is Double,
            is Int -> {
                value
            }
            is JSONArray -> {
                value.toList()
            }
            is JSONObject -> {
                value.toMap()
            }
            else -> {
                null
            }
        }
    }
}

internal fun CallbackContext.failure(exception: Throwable) {
    this.error(exception.toString())
}
