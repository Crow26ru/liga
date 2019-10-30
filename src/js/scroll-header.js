'use strict';

(function() {
  var INDENT = 400;
  var header = document.querySelector('header');

  var definesHeaderScrollClassName = function() {
    header.classList[document.documentElement.scrollTop > INDENT ? 'add' : 'remove']('header--scroll');
  }

  var onWondowScroll = function() {
    definesHeaderScrollClassName();
  };

  window.addEventListener('scroll', onWondowScroll);
  definesHeaderScrollClassName();
})();
