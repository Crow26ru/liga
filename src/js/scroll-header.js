'use strict';

(function() {
  var INDENT = 400;
  var header = document.querySelector('header');

  var definesHeaderScrollClassName = function() {
    if (document.documentElement.classList.contains('header-open')) return;

    header.classList[window.pageYOffset > INDENT ? 'add' : 'remove']('header--scroll');
  }

  var onWondowScroll = function() {
    definesHeaderScrollClassName();
  };

  window.addEventListener('scroll', onWondowScroll);
  definesHeaderScrollClassName();
})();
