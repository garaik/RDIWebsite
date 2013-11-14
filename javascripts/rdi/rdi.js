"use strict";

var RDI_CONTENT = (function() {
    var rdi;
    var current = 'r';
    var delay = 400;

    function setHeightAndInit(x, p) {
        x.css({
            display: 'block',
            position: 'fixed',
            left: -8000,
            width: p.width()
        });
        x.attr('data-height', x.height());
        x.css({
            height: 0,
            opacity: 0,
            position: 'static',
            left: 0,
            overflow: 'hidden'
        });
    }

    $(function() {
        var g = $('.gear');
        var q = g.find('.quotation');
        var d = g.find('.division-content');
        var a = g.find('.division-aside');
        rdi = {
            r: {
                q: q.find('.research'),
                d: d.find('.research'),
                a: a.find('.research')
            },
            d: {
                q: q.find('.development'),
                d: d.find('.development'),
                a: a.find('.development')
            },
            i: {
                q: q.find('.innovation'),
                d: d.find('.innovation')
            }
        };

        [rdi.r.d, rdi.d.d, rdi.i.d].forEach(function(x) {
            setHeightAndInit(x, d);
        });

        setHeightAndInit(rdi.r.a, a);
        setHeightAndInit(rdi.d.a, a);

        show(current);
    });

    function show(w) {
        var rdiw = rdi[w];
        rdiw.q.css({
            display: 'block'
        }, delay);
        rdiw.d.animate({
            height: rdiw.d.attr('data-height'),
            opacity: 1
        }, delay);
        if (rdiw.a) {
            rdiw.a.animate({
                height: rdiw.a.attr('data-height'),
                opacity: 1
            }, delay);
        }
        current = w;
    }

    function hide() {
        var rdic = rdi[current];
        rdic.q.css({ display: 'none' }, delay);
        rdic.d.animate({ height: 0, opacity: 0 }, delay);
        if (rdic.a) {
            rdic.a.animate({ height: 0, opacity: 0 }, delay);
        }
    }

    return {
        switchResearch: function() { hide(); show('r'); },
        switchDevelopment: function() { hide(); show('d'); },
        switchInnovation: function() { hide(); show('i'); }
    }
})();

var REFERENCES = (function() {
    var refs = [];

//    $(function() {
//        var $refItemsUl = $('#reference-items').find('>ul:first-child');
//        console.log($refItemsUl.find('li'));
//        $refItemsUl.find('li').each(function() {
//            $(this).click(function() {
//                console.log('click');
//            });
//        });
//    });


    $(function() {
        var $refItemsUl = $('#reference-items').find('>ul:first-child');
        var refTitle = $('#references-title');
        var pos = 0;
        var scrolling = false;

        var refmod = function(n) {
            return ((n % refs.length) + refs.length) % refs.length;
        };
        var refMouseIn = function(e) {
            $(e.target).data('span').css({display: 'block'}).animate({ opacity: 1 });
        };
        var refMouseOut = function(e) {
            $(e.target).data('span').animate({ opacity: 0 }, function() {
                $(this).css({display: 'none'});
            });
        };
        var spanMouseIn = function(e) {
            var $e = $(e.target);
            console.log('in :' + $e);
            if ($e.is(':animated')) {
                $e.stop();
            }
        };
        var spanMouseOut = function(e) {
            var $e = $(e.target);
            console.log('out :' + $e);
            if ($e.is(':animated')) {
                $e.stop();
            }
        };

        $refItemsUl.find('li').each(function() {
            var $this = $(this);
            var span = $this.find('span');
            span.detach();
            refTitle.append(span);
            span.css({ display: 'none', opacity: 0 });
            span.hover(spanMouseIn, spanMouseOut);
            $this.data('span', span);
            refs.push($this);
            $this.detach();
        });
        for (var i = 0; i <= 6; ++i) {
            var c = refs[refmod(pos + i)].clone(true);
            $refItemsUl.append(c);
            c.css({
                left: 6 + i * 110
            });
            c.hover(refMouseIn, refMouseOut);
        }
        $('#references-arrow-right').click(function() {
            if (!scrolling) {
                scrolling = true;
                for (var i = 7; i <= 9; ++i) {
                    var c = refs[refmod(pos + i)].clone(true);
                    c.hover(refMouseIn, refMouseOut);
                    $refItemsUl.append(c);
                    c.css({
                        left: 6 + i * 110
                    });
                }
                $refItemsUl.find('li').each(function (i) {
                    $(this).delay(i * 50).animate({ left: '-=330' }, 500, 'swing', function () {
                        if (i < 3) {
                            $(this).remove();
                        }
                        else if (i == 9) {
                            scrolling = false;
                        }
                    });
                });
                pos += 3;
            }
            return false;
        });
        $('#references-arrow-left').click(function() {
            if (!scrolling) {
                scrolling = true;
                for (var i = -1; i >= -3; --i) {
                    var c = refs[refmod(pos + i)].clone(true);
                    c.hover(refMouseIn, refMouseOut);
                    $refItemsUl.prepend(c);
                    c.css({
                        left: 6 + i * 110
                    });
                }
                $refItemsUl.find('li').each(function (i) {
                    $(this).delay((9 - i) * 50).animate({ left: '+=330' }, 500, 'swing', function () {
                        if (i > 6) {
                            $(this).remove();
                        }
                        else if (i == 0) {
                            scrolling = false;
                        }
                    });
                });
                pos -= 3;
            }
            return false;
        });
    });
})();

var SLOGEN = (function() {
    var dur = 500;
    var defaultCss;
    var i = 1;

    $(function() {
        var st = $('#slogen-title-1');
        var sd = $('#slogen-description-1');
        defaultCss = {
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

        window.setInterval(function() {
            $('#slogen-title-' + i).animate({
                top: 0,
                opacity: 0
            }, {
                duration: dur,
                complete: function() {
                    $(this).css({ display: "none"})
                }
            });
            $('#slogen-description-' + i).animate({
                left: 200,
                opacity: 0
            }, {
                duration: dur,
                complete: function() {
                    $(this).css({ display: "none"})
                }
            });
            if (++i == 4) { i = 1; }
            $('#slogen-title-' + i).css(defaultCss.st).animate({ opacity: 1 }, dur);
            $('#slogen-description-' + i).css(defaultCss.sd).animate({ opacity: 1 }, dur);
        }, 7000);
    });
})();

var TOP_MENU = (function() {
    var pos;
    var current = 144;
    var target = 144;

    $(function() {
        $(window).scroll(function() {
            pos = $(this).scrollTop();
            target = pos > 84 ? 60 : 144 - pos;
        });

        window.setInterval(function() {
            if (current < target) {
                current += 10;
                if (current > target) {
                    current = target;
                }
            }
            else if (current > target) {
                current -= 10;
                if (current < target) {
                    current = target;
                }
            }
            $('#menubar').css({ height: current });
            $('#menu-logo').css({ maxHeight: current });
        }, 20);
    });
})();

var PRODUCTS = (function() {
    $(function() {
        $('.products').css({
            display: 'none'
        });
    });
})();

$(function() {

    $('#menu-research').click(function() {
        PIZZA_SVG.switchResearch();
        return false;
    });
    $('#menu-development').click(function() {
        PIZZA_SVG.switchDevelopment();
        return false;
    });
    $('#menu-innovation').click(function() {
        PIZZA_SVG.switchInnovation();
        return false;
    });
    PIZZA_SVG.setCallback(function(slice) {
        switch (slice) {
            case 'R':
                RDI_CONTENT.switchResearch(); break;
            case 'D':
                RDI_CONTENT.switchDevelopment(); break;
            case 'I':
                RDI_CONTENT.switchInnovation(); break;
        }
    });
});
