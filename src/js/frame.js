'use strict';

(function () {
  var awards = document.querySelectorAll('.awards__item');

  if (awards) {
    for (var i = 0; i < awards.length; i++) {
      (function () {
        var award = awards[i];
        var frame = award.querySelector('.awards__frame');

        var repeatAnimation = function () {
          award.classList.remove('awards__item--sway');
          void award.offsetWidth;
          award.classList.add('awards__item--sway');
        };

        var stopAnimation = function () {
          award.classList.remove('awards__item--sway');
          frame.removeEventListener('animationend', stopAnimation);
          frame.removeEventListener('animationend', repeatAnimation);
        };

        if (window.innerWidth > 1023) {
          award.addEventListener('mouseover', function () {
            award.classList.add('awards__item--sway');
            frame.addEventListener('animationend', repeatAnimation);
          });

          award.addEventListener('mouseleave', function () {
            frame.addEventListener('animationend', stopAnimation);
          })
        } else if (window.innerWidth < 1024) {
          stopAnimation();
        }
      })();
    }
  }
})();
