'use strict';

const localStorageItemName = 's_lecc';

module.exports = function(settings, event) {
    var eventType = event.$type;
    var stateJSON = localStorage.getItem(localStorageItemName) || "{}";
    var state = JSON.parse(stateJSON);
    // provide defaults
    state.lastSeenTime = state.lastSeenTime || new Date();
    state.lastSeenTrackingCode = state.lastSeenTrackingCode || null;

    ////
    // calcualte new state
    var trackingCodeOnURLNow = false;
    var trackingCode;
    if (settings.trackingCodeRetrievalMethod === "dataElement") {
        trackingCode = _satellite.getVar(settings.trackingCodeDataElementName);
    } else if (settings.trackingCodeRetrievalMethod === "urlParameter") {
        var window = require('@adobe/reactor-window');
        var searches = window.location.search.split(/[\?&]/);
        if (searches.length > 1) {
            for (var i = searches.length; i > 0 ; --i) {
                var items = searches[i].split('=');
                if (settings.trackingCodeURLParameter === items[0] && 'undefined' !== typeof items[1] && items[1]) {
                    trackingCode = items[1];
                    break;
                }
            }
        }
    }
    if ('undefined' !== typeof trackingCode && trackingCode) {
        trackingCodeOnURLNow = true;
    }

    var stateAfterCheck = {};
    stateAfterCheck.lastSeenTime = new Date();
    stateAfterCheck.lastSeenTrackingCode = trackingCode || state.lastSeenTrackingCode;
    localStorage.setItem(localStorageItemName, JSON.stringify(stateAfterCheck));

    ////
    // start by checking all negative conditions

    // check whether onlyPageViewStartNewVisit && is it one?
    if (settings.onlyPageViewStartsNewVisit) {
        if (eventType !== "core.page-bottom" 
            && eventType !== "core.library-loaded" 
            && eventType !== "core.dom-ready" 
            && eventType !== "core.window-loaded") {
            return false;
        }
    }
    // check whether onlyNewTrackingCodeStartsNewVisit
    if (settings.trackingCodeStartsNewVisit && onlyNewTrackingCodeStartsNewVisit) {
        if (state.lastSeenTrackingCode === stateAfterCheck.lastSeenTrackingCode) {
            return false;
        }
    }

    ////
    // if we're still here, nothing has ruled out a new visit so far
    // check whether it really is one

    // check whether inactivityStartNewVisit & we had enough time
    if (settings.inactivityStartsNewVisit) {
        var now = Date();
        var then = state.lastSeenTime;
        var diffInMinutes = (then - now) / 1000 / 60;
        if (diffInMinutes > settings.inactivityIntervalInMinutes) {
            return true;
        }
    }
    // check whether trackingCodeStartsNewVisit & we have one
    if (settings.trackingCodeStartsNewVisit) {
        if (trackingCodeOnURLNow) {
            return true;
        }
    }

    ////
    // default by now must be false
    return false;
}