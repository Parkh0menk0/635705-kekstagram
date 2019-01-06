'use strict';

(function () {
  var ESC_KEYCODE = 27;

  /**
   * Функция генерирующая случайное число от min до max.
   * @function
   * @param {number} min минимальное число;
   * @param {number} max максималььное число;
   * @returns {number} случайное число от min до max.
   */
  var random = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  window.util = {
    random: random,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();
