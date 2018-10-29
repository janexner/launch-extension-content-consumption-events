'use strict';

module.exports = function() {
    var result = {
        'pageHeight': -1,
        'viewportHeight': -1,
        'pageScrolls': false
    }

    try {
        turbine.logger.log('Determining page and viewport height...');
        var document = require('@adobe/reactor-document');
        var h1 = 0, h2 = 0;
        if ('undefined' !== typeof document.documentElement && document.documentElement) {
          h1 = Math.max(
            document.documentElement["clientHeight"],
            document.documentElement["scrollHeight"],
            document.documentElement["offsetHeight"]
          );
        }
        if ('undefined' !== typeof document.body && document.body) {
          h2 = Math.max(
            document.body["scrollHeight"],
            document.body["offsetHeight"]
          );
        }
        var pageHeightInPixels = Math.max(h1, h2);
        result.pageHeight = pageHeightInPixels;

        var window = require('@adobe/reactor-window');
        var viewportHeightInPixels = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        result.viewportHeight = viewportHeightInPixels;

        result.pageScrolls = (pageHeightInPixels > viewportHeightInPixels);
        turbine.logger.log('Determined page and viewport height ', result);
    } catch(e) {
        turbine.logger.warn('Failed to calculate page and viewport heights ', e);
        result = {};
    }

    return result;
  };
