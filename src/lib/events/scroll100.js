'use strict';

module.exports = function(settings, trigger) {
  var initDelay = settings.initDelay || 100; // in millis
  var triggerOnce = settings.triggerOnce || true;
  var targetDepth = 100 / 100; // 50% of scrollable distance

  var attachScrollListener = turbine.getSharedModule('content-consumption-events', 'attach-scroll-listener-if-necessary');
  attachScrollListener(initDelay, triggerOnce, targetDepth, trigger);
};
