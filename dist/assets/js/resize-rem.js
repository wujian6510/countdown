! function(window) {

    /* 设计图文档宽度 */
    var docWidth = 1920;

    var doc = window.document,
        docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var recalc = (function refreshRem() {
        var clientWidth = docEl.getBoundingClientRect().width;
        if(clientWidth==docWidth){
            docEl.style.fontSize = 100+'px';
        }else if(clientWidth>docWidth){
          var dbl = clientWidth/docWidth;
          docEl.style.fontSize = 100*dbl+'px';
        }else{
          var xbl = docWidth/clientWidth;
          docEl.style.fontSize = 100/xbl+'px';
        }
        return refreshRem;
    })();

    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);