"use strict";

var PIZZA_SVG = (function() {
    var angle = 0;
    var animate = false;
    var callback;

    var x = [];
    x[0] = { R: 0, D: -120, I: 120 };
    x[120] = { R: -120, D: 120, I: 0 };
    x[240] = { R: 120, D: 0, I: -120 };

    var rotate = function(slice) {
        if (!animate) {
            animate = true;
            var angleMod = (angle % 360 + 360) % 360;
            var t = x[angleMod][slice];
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
                callback && callback(slice);
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
    };

    $(function() {
        $('#pizzasvg').svg({
            loadURL: 'images/rdipizza.svg',
            onLoad: function () {
                $('#slices, #captions, #outlines').attr('transform', 'rotate(0, 140, 140)');
                var di = 'data-index';
                $('#slice-research').attr(di, 'R').css({cursor: 'pointer'});
                $('#slice-development').attr(di, 'D').css({cursor: 'pointer'});
                $('#slice-innovation').attr(di, 'I').css({cursor: 'pointer'});
                $('#slice-research, #slice-development, #slice-innovation').click(function () {
                    var slice = $(this).attr(di);
                    rotate(slice);
                });
            }
        });
    });

    return {
        switchResearch: function() {
            rotate('R');
        },
        switchDevelopment: function() {
            rotate('D')
        },
        switchInnovation: function() {
            rotate('I');
        },
        setCallback: function(cb) {
            callback = cb;
        }
    }
})();
