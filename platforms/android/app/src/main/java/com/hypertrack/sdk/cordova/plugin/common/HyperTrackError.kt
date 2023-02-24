package com.hypertrack.sdk.cordova.plugin.common

/**
 * Check HyperTrack SDK docs for HyperTrackError.
 * Enum naming convention is ignored to make datatype sync across platforms easier.
 * Using Swift naming convention.
 */
@Suppress("EnumEntryName")
internal enum class HyperTrackError {
    gpsSignalLost,
    locationMocked,
    locationPermissionsDenied,
    locationPermissionsInsufficientForBackground,
    locationPermissionsNotDetermined,
    locationPermissionsReducedAccuracy,
    locationPermissionsProvisional,
    locationPermissionsRestricted,
    locationServicesDisabled,
    locationServicesUnavailable,
    motionActivityPermissionsNotDetermined,
    motionActivityPermissionsDenied,
    motionActivityServicesDisabled,
    motionActivityServicesUnavailable,
    motionActivityPermissionsRestricted,
    networkConnectionUnavailable,
    invalidPublishableKey,
    blockedFromRunning
}