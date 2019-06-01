/**
 *  给根节点设置font-size
 */
! function(win, doc) {
	var htmlDom = doc.getElementsByTagName("html")[0];
	var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	var recalc = function() {
		var htmlWidth = doc.documentElement.clientWidth || doc.body.clientWidth;
		htmlDom.style.fontSize = htmlWidth / 10 + 'px';
	}

	if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}(window, document);