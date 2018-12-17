'use strict';

var DATA_COUNT = 25;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Артём',
  'Игорь',
  'Ефим',
  'Ульяна',
  'Таисия',
  'Виктория'
];
var SCALE_STEP = 25;
var MAX_SCALE_VALUE = 100;
var MIN_SCALE_VALUE = 25;
var ESC_KEYCODE = 27;

var data = [];
var similarListPictures = document.querySelector('.pictures');
var listComments = document.querySelector('.social__comments');
var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var commentTemplate = document.querySelector('.social__comment');
var bigPicture = document.querySelector('.big-picture');
var uploadFile = document.getElementById('upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scale = document.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview img');
var effects = document.querySelectorAll('.effects__radio');
var effectsPreview = document.querySelectorAll('.effects__preview');

var random = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

var getComments = function () {
  var comments = [];
  var num = random(1, 100);
  for (var i = 0; i < num; i++) {
    var comment = {
      avatar: 'img/avatar-' + random(1, 6) + '.svg',
      message: MESSAGES[random(0, 5)],
      name: NAMES[random(0, 5)]
    };
    comments.push(comment);
  }
  return comments;
};

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

var getPictureElement = function (description) {
  var pictureElement = similarPictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = description.url;
  pictureElement.querySelector('.picture__likes').textContent = description.likes;
  pictureElement.querySelector('.picture__comments').textContent = description.comments;

  pictureElement.addEventListener('click', function () {
    showBigPicture(description);
  });

  return pictureElement;
};

var getCommentElement = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
};

var showBigPicture = function (descriptions) {
  var pictureCancel = bigPicture.querySelector('.big-picture__cancel');
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').src = descriptions.url;
  bigPicture.querySelector('.likes-count').textContent = descriptions.likes;
  bigPicture.querySelector('.comments-count').textContent = descriptions.comments.length;

  pictureCancel.addEventListener('click', function () {
    closeBigPicture();
  });

  document.addEventListener('keydown', onBigPictureEscPress);

  renderComments(descriptions.comments);
};

var renderComments = function (comments) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(getCommentElement(comments[i]));
  }

  while (listComments.firstChild) {
    listComments.removeChild(listComments.firstChild);
  }

  listComments.appendChild(fragment);
};

var renderPictures = function (descriptions) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < descriptions.length; i++) {
    fragment.appendChild(getPictureElement(descriptions[i]));
  }

  similarListPictures.appendChild(fragment);
};

data = getData(DATA_COUNT);

renderPictures(data);

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

uploadFile.addEventListener('change', function () {
  openPopup();
});

imgUploadCancel.addEventListener('click', function () {
  closePopup();
});

var scaleble = function (scaleValue) {
  return 'scale(' + scaleValue.replace('%', '') / 100 + ')';
};

scale.value = 100;

scaleControlSmaller.addEventListener('click', function () {
  var value = Number(scale.value.replace('%', ''));
  if (value === MIN_SCALE_VALUE) {
    return;
  }
  scale.value = (value - SCALE_STEP) + '%';
  imgUploadPreview.style.transform = scaleble(scale.value);
});

scaleControlBigger.addEventListener('click', function () {
  var value = Number(scale.value.replace('%', ''));
  if (value === MAX_SCALE_VALUE) {
    return;
  }
  scale.value = (value + SCALE_STEP) + '%';
  imgUploadPreview.style.transform = scaleble(scale.value);
});

var addEffectClickHandler = function (effect, img, preview) {
  effect.addEventListener('click', function () {
    img.classList.add(preview.className.split(' ').pop());
  });
};

for (var i = 0; i < effects.length; i++) {
  addEffectClickHandler(effects[i], imgUploadPreview, effectsPreview[i]);
}

var hashtagInput = imgUploadOverlay.querySelector('.text__hashtags');
var hashtagsArr = hashtagInput.value.split(' ').join('');

var isSame = function (arr) {
  var same = false;
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j].toLowerCase().localeCompare(arr[j + 1].toLowerCase()) === 0) {
        same = true;
      }
    }
  }
  return same;
}

hashtagInput.addEventListener('invalid', function (evt) {
  if (hashtagInput.validity.tooShort) {
    hashtagInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
  } else if (hashtagInput.validity.tooLong) {
    hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
  } else if (hashtagInput.validity.valueMissing) {
    hashtagInput.setCustomValidity('Обязательное поле');
  } else {
    hashtagInput.setCustomValidity('');
  }
});

hashtagInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

// if (hashtagsArr.length > 5) {
//   hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
// } else if (isSame(hashtagsArr)) {
//   hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
// } else {
//     for (var i = 0; i < hashtagsArr.length; i++) {
//       if (hashtagsArr[i].charCodeAt(0) !== 35) {
//         hashtagInput.setCustomValidity('Хэш-тег не начинается с символа # (решётка)');
//       } else if (hashtagInput.validity.tooShort) {
//         hashtagInput.setCustomValidity('');
//       } else if (hashtagInput.validity.tooLong) {
//         hashtagInput.setCustomValidity('');
//       } else {
//           hashtagInput.setCustomValidity('');
//       }
//     }
// }
