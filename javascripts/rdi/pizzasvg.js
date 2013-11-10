var PizzaSVG = (function() {

    return {
        switchResearch: function() {},
        switchInnovation: function() {},
        switchDevelopment: function() {}
    }
})();

$(function () {
    $('#pizzasvg').svg({
        loadURL: 'images/rdipizza.svg',
        onLoad: function (svg) {
            $('#slices, #captions, #outlines').attr('transform', 'rotate(0, 140, 140)');
            var angle = 0;
            var di = 'data-index';
            $('#slice-research').attr(di, 'R');
            $('#slice-development').attr(di, 'D');
            $('#slice-innovation').attr(di, 'I');
            var x = [];
            x[0] = { R: 0, D: -120, I: 120 };
            x[120] = { R: -120, D: 120, I: 0 };
            x[240] = { R: 120, D: 0, I: -120 };
            var animate = false;
            $('#slice-research, #slice-development, #slice-innovation').click(function () {
                if (!animate) {
                    animate = true;
                    var angleMod = (angle % 360 + 360) % 360;
                    var t = x[angleMod][$(this).attr(di)];
                    var d;
                    if (t == 0) {
                        d = 30;
                        $('#slices, #outlines, #captions')
                                .animate({
                                    svgTransform: 'rotate(' + (angle - 3) + ', 140, 140)'
                                }, d)
                                .animate({
                                    svgTransform: 'rotate(' + (angle + 3) + ', 140, 140)'
                                }, d * 2)
                                .animate({
                                    svgTransform: 'rotate(' + (angle - 3) + ', 140, 140)'
                                }, d * 2)
                                .animate({
                                    svgTransform: 'rotate(' + (angle + 3) + ', 140, 140)'
                                }, d * 2)
                                .animate({
                                    svgTransform: 'rotate(' + angle + ', 140, 140)'
                                }, d, function() { animate = false; });
                    }
                    else {
                        angle += t;
                        d = 400;
                        $('#slices').animate({
                            svgTransform: 'rotate(' + angle + ', 140, 140)'
                        }, d);
                        $('#outlines').delay(40).animate({
                            svgTransform: 'rotate(' + angle + ', 140, 140)'
                        }, d);
                        $('#captions').delay(80).animate({
                            svgTransform: 'rotate(' + angle + ', 140, 140)'
                        }, d, function () {
                            animate = false;
                        });
                    }
                }
            });
        }
    });
});
