'use strict';

module.exports = function(initDelay, triggerOnce, targetDepth, trigger) {
    var state = {
        'targetScrollDepthReached': false,
        'hasTriggered': false
    }
    
    setTimer( function() {
        var getPageHeight = turbine.getSharedModule('content-consumption-events', 'get-page-height');
        var heights = getPageHeight();

        if (heights.pageScrolls) {
            // calculate height of page
            var targetScrollDepthInPixels = (heights.pageHeight - heights.viewportHeight) * targetDepth;

            // attach scroll listener
            var window = require('@adobe/reactor-window');
            window.addEventListener('scroll', function(e) {
                try {
                    var document = require('@adobe/reactor-document');
                    var currentScrollDepthInPixels = document.documentElement.scrollTop;
                    if (currentScrollDepthInPixels >= targetScrollDepthInPixels) {
                        state.targetScrollDepthReached = true;
                        if (state.targetTimeSpentReached) {
                            if (state.hasTriggered === false || triggerOnce === false) {
                                state.hasTriggered = true;
                                trigger();
                            }
                        }
                    }
                } catch(e2) {
                    turbine.logger.warn('Caught exception: ', e2);
                }
            });
        }
    }, initDelay);
};