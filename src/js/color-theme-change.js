'use strict';

(function() {
  var LIGHT_THEME_COLORS = [
    '--dark-color: #000000',
    '--white-color: #ffffff',
    '--light-color: #ffffff',
    '--dekor-color: #2c39f2',
    '--invers-dekor-color: #ff1553',
    '--intro-text-color: #2c39f2;',
    '--blue-color: #2c39f2',
    '--pink-color: #ff1553',
    '--pink-hover-color: #ff1553;',
    '--gray-light-color: #f2f2f2',
    '--gray-dark-color: #d3d3d3',
    '--blue-background-color: #2c39f2'
  ];
  var DARK_THEME_COLORS = [
    '--dark-color: #ffffff',
    '--white-color: #ffffff',
    '--light-color: #1f1f1f',
    '--dekor-color: #ff1553',
    '--invers-dekor-color: #2c39f2',
    '--intro-text-color: #ffffff;',
    '--blue-color: #2c39f2',
    '--pink-color: #ff1553',
    '--pink-hover-color: #ffffff;',
    '--gray-light-color: #f2f2f2',
    '--gray-dark-color: #d3d3d3',
    '--blue-background-color: #2c2929'
  ];
  var LIGHT_THEME_COLOR = '#ffffff';
  var DARK_THEME_COLOR = '#1f1f1f';
  var metaColorTheme = document.querySelector('meta[name="theme-color"]');
  var colorThemeCheckbox = document.getElementById('color-theme');
  var styleBlock = document.createElement('style');
  var colorThemeIdentifier = document.querySelector('.color-theme-identifier');
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  var isIE = !!document.documentMode;
  var isFireFox = navigator.userAgent.search("Firefox");

  if ((isChrome || isSafari || isFireFox) && !localStorage.getItem('--theme')) {
    /**
     * У нас есть элемент, которому мы через @ media (prefers-color-scheme: dark) навешиваем position: fixed
     * Следовательно, если у него фиксированное позиционирование, то у пользователя включена темная тема
     * И мы переключаем сайт на темную тему
     * Поддержка этого медизапроса работает только в хроме, сафари и firefox
     * https://developer.mozilla.org/ru/docs/Web/CSS/@media/prefers-color-scheme
     */
    if (window.getComputedStyle(colorThemeIdentifier).position === 'absolute') {
      document.documentElement.classList.remove('dark');
      colorThemeCheckbox.checked = false;

      if (metaColorTheme) {
        metaColorTheme.content = LIGHT_THEME_COLOR;
      }
    }
  }

  var onColorThemeCheckboxChange = function() {
    var isDark = colorThemeCheckbox.checked ? true : false;

    document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

    if (metaColorTheme) {
      metaColorTheme.content = isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
    }

    localStorage.setItem('--theme', isDark ? 'dark' : 'light');
  };

  var changeColorIE = function() {
    var isDark = colorThemeCheckbox.checked ? true : false;

    var optionsColorTheme = isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

    styleBlock.innerHTML = ':root{' + optionsColorTheme.join(';') + '}';
    document.head.appendChild(styleBlock);

    onColorThemeCheckboxChange();
  };

  var functionChangeColor = isIE ? changeColorIE : onColorThemeCheckboxChange;

  colorThemeCheckbox.addEventListener('change', functionChangeColor);

  // активируем цветовую схему, если в LocalStorage есть запись о последней, выбранной пользователем схеме
  if (localStorage.getItem('--theme')) {
    colorThemeCheckbox.checked = localStorage.getItem('--theme') === 'dark' ? true : false;
    functionChangeColor();
  }
})();
