'use strict';

module.exports = function(settings, trigger) {
  var initDelay = settings.initDelay || 100;
  var triggerOnce = settings.triggerOnce || true;
  var targetDepth = settings.targetDepth || 50;

  var attachScrollListener = turbine.getSharedModule('content-consumption-events', 'attach-scroll-listener-if-necessary');
  attachScrollListener(initDelay, triggerOnce, targetDepth / 100, trigger);
};
