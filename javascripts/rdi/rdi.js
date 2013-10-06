$(function() {
    var startSlogenAnim = function() {
        var dur = 400;
        var st = $('#slogen-title-1');
        var sd = $('#slogen-description-1');
        var defaultCss = {
            st: {
                left: st.css('left'),
                top: st.css('top'),
                opacity: 0,
                display: "block"
            },
            sd: {
                left: sd.css('left'),
                top: sd.css('top'),
                opacity: 0,
                display: "block"
            }
        };
        var i = 1;
        window.setInterval(function() {
            st = $('#slogen-title-' + i);
            sd = $('#slogen-description-' + i);
            st.animate({
                top: 0,
                opacity: 0
            }, {
                duration: dur,
                ease: 'ease-in',
                complete: function() {
                    $(this).css({ display: "none"})
                }
            });
            sd.animate({
                left: 200,
                opacity: 0
            }, {
                duration: dur,
                ease: 'ease-in',
                complete: function() {
                    $(this).css({ display: "none"})
                }
            });
            if (++i == 4) {
               i = 1;
            }
            st = $('#slogen-title-' + i);
            sd = $('#slogen-description-' + i);
            st.css(defaultCss.st);
            sd.css(defaultCss.sd);
            st.animate({
                opacity: 1
            }, dur, 'ease-in');
            sd.animate({
                opacity: 1
            }, dur, 'ease-in');
        }, 3000);
    };

    var startPizzaInteraction = function() {
        var pizzaSvg = document.getElementById('pizzasvg');
        pizzaSvg.addEventListener("load", function() {
            var svgDoc = pizzaSvg.contentDocument;
            var svgRoot = svgDoc.documentElement;
            $('#slice-research', svgRoot).click(function() {
                $(this).remove();
            });
            $('#slice-development', svgRoot).click(function() {
                $(this).remove();
            });
            $('#slice-innovation', svgRoot).click(function() {
                $(this).remove();
            });
        });
    };

//    startSlogenAnim();
    startPizzaInteraction();
});
