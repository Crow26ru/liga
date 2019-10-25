'use strict';

(
  function() {
    if (document.documentMode) {
      var ieStyle = document.createElement('link');

      ieStyle.rel= 'stylesheet';
      ieStyle.href = 'css/ie-fallback.min.css';

      document.head.appendChild(ieStyle);
    }
  }
)();
