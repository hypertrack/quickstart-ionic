package com.hypertrack.sdk.cordova.plugin

/**
 * Method calls that init event subscriptions
 * Enum naming convention is ignored to make datatype sync across platforms easier
 */
@Suppress("EnumEntryName")
enum class SubscriptionCall {
    subscribeToTracking,
    unsubscribeFromTracking,
    subscribeToAvailability,
    unsubscribeFromAvailability,
    subscribeToErrors,
    unsubscribeFromErrors,
}
