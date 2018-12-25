'use strict';

(function () {
  var DATA_COUNT = 25;

  var data = [];

  var getDataItem = function (index) {
    var temp = {
      url: 'photos/' + (index + 1) + '.jpg',
      likes: random(15, 200),
      comments: getComments()
    };
    return temp;
  };

  var getData = function (num) {
    var temp = [];
    for (var j = 0; j < num; j++) {
      temp.push(getDataItem(j));
    }
    return temp;
  };

  data = getData(DATA_COUNT);
})();
