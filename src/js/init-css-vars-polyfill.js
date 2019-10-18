'use strict';

(function() {
  // Если браузер - IE, загружаем полифилл для css-переменных
  if (document.documentMode) {
    var cssVarsPolyfillScript = document.createElement('script');
    var cssVarsPolyfillIniterScript = document.createElement('script');

    cssVarsPolyfillScript.setAttribute('defer', 'defer');
    cssVarsPolyfillIniterScript.setAttribute('defer', 'defer');

    cssVarsPolyfillScript.src = 'libs/cssvars/css-vars-ponyfill.js';
    cssVarsPolyfillIniterScript.src = 'libs/cssvars/css-vars-initer.js';

    document.body.appendChild(cssVarsPolyfillIniterScript);
    document.body.appendChild(cssVarsPolyfillScript);
  }
})();
