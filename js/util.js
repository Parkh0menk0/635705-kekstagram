'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500; // ms

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

  /**
   * Функция действие которой откладывается на попозже, в случае если это действие еще не закончилось,
   * чтобы избежать лишних миганий интерфейса или уменьшить нагрузку на сервер.
   * @function
   * @param {requestCallback} cb функция, отложенная на потом;
   * @return {requestCallback} функция, отложенная на потом.
   */
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.util = {
    random: random,
    ESC_KEYCODE: ESC_KEYCODE,
    debounce: debounce
  };
})();
