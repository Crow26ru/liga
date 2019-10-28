'use strict';

(function() {

  var thanksSlider = document.querySelector('.thanks__slider');

  if (thanksSlider) {
    new Swiper(thanksSlider, {
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true,
      initialSlide: 1,
      autoHeight: true,
      pagination: {
        el: '.thanks__pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: 'thanks__pagination-bullet',
        bulletActiveClass: 'thanks__pagination-bullet--active',
        renderBullet: function (index, className) {
          return '<button type="button" class="reset-button ' + className + '">Вперед к слайду ' + (index + 1) + '</button>';
        },
      },
      breakpoints: {
        1200: {
          slidesPerView: 'auto',
          spaceBetween: 43,
        },
      }
    });
  }
})();
