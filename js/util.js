'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var random = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  window.utils = {
    random = random,
    ESC_KEYCODE = ESC_KEYCODE
  }
})();
