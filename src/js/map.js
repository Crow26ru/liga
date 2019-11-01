'use strict';

(function () {
  var map = document.querySelector('#map');

  if (map) {
    ymaps.ready(function () {
      var myMap = new ymaps.Map(map, {
          center: [59.969175, 30.317293],
          zoom: 16
        }, {
          searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Офис Лиги',
          balloonContent: 'Большая Конюшенная 19/8, 6 этаж, БЦ «Гнездо»'
        }, {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#image',
          // Своё изображение иконки метки.
          iconImageHref: 'img/mini-logo.svg',
          // Размеры метки.
          iconImageSize: [21, 27],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-11, -22]
        });

      myMap.behaviors.disable('scrollZoom');

      myMap.geoObjects
        .add(myPlacemark);
    });
  }


})();
