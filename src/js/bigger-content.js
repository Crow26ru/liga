'use strict';

(function() {
  var BIGGER_CONTAINER_CLASS_NAME = 'modes__bigger-content';
  var normalRocketContent = document.querySelector('.modes__normal-content');
  var reactiveRocketContent = document.querySelector('.modes__reactive-content');

  normalRocketContent.clientHeight > reactiveRocketContent.clientHeight
    ? normalRocketContent.classList.add(BIGGER_CONTAINER_CLASS_NAME)
    : reactiveRocketContent.classList.add(BIGGER_CONTAINER_CLASS_NAME);
})();
