'use strict';

(function() {
  var swiper = new Swiper('.projects__slider', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.projects__button--next',
      prevEl: '.projects__button--prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1.11,
      },
      600: {
        slidesPerView: 1,
      },
    }
  });
})();
