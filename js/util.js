'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms
  var lastTimeout;

  /**
   * Функция генерирующая случайное число от min до max.
   * @function
   * @param {number} min минимальное число;
   * @param {number} max максималььное число;
   * @return {number} случайное число от min до max.
   */
  var random = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.util = {
    random: random,
    ESC_KEYCODE: ESC_KEYCODE,
    debounce: debounce
  };
})();
