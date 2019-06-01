/**
 *  给根节点设置font-size
 */
! function(win, doc) {
    var htmlDom = doc.getElementsByTagName("html")[0];
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var clientW = document.documentElement.clientWidth || document.body.clientWidth;
    var clientH = document.documentElement.clientHeight || document.body.clientHeight;

    var r = clientW / clientH;
    var originR = 750 / 1334;
    var width = 0;
    if (r >= originR) {
        width = clientH * originR
    } else {
        width = clientW
    }

    var recalc = function() {
        htmlDom.style.fontSize = width / 10 + 'px';
        document.body.style.width = width + "px";
    }

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}(window, document);